import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, Plus, Save, X } from "lucide-react";
import {
  useCreateBillMutation,
  useUpdateBillMutation,
  useGetBillByIdQuery,
} from "../../../services/purchaseBillApi";
import { useGetItemsQuery } from "../../../services/itemApi";
import SelectItemDialog from "../../../componets/common/SelectItemDialog";
import LedgerListModal from "../../sales/Bill/LedgerListModal";
import PurchaseMasterListModal from "./PurchaseMasterListModal";
import BatchSelectionDialog from "./BatchSelectionDialog";
import toast from "react-hot-toast";

import { calculateBillTotals } from "../../../utils/billCalculations";

const PurchaseBillForm = () => {
  const navigate = useNavigate();
  const { id: billId } = useParams();
  const isEdit = !!billId;

  const { data: billData } = useGetBillByIdQuery(billId, { skip: !isEdit });
  const { data: itemsData } = useGetItemsQuery();

  const [createBill] = useCreateBillMutation();
  const [updateBill] = useUpdateBillMutation();

  const [form, setForm] = useState({
    billNo: "",
    billDate: new Date().toISOString().split("T")[0],
    supplierLedgerId: "",
    supplierName: "",
    supplierInvoiceNo: "",
    supplierInvoiceDate: "",
    purchaseMasterId: "",
    purchaseMasterName: "",
    billDiscountPercent: 0,
    notes: "",
    referenceNumber: "",
    items: [],
  });

  const [calculations, setCalculations] = useState({
    subtotal: 0,
    itemDiscount: 0,
    billDiscountAmount: 0,
    igstAmount: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    cessAmount: 0,
    totalTaxAmount: 0,
    totalAmount: 0,
    dueAmount: 0,
  });

  const [showItemDialog, setShowItemDialog] = useState(false);
  const [showLedgerDialog, setShowLedgerDialog] = useState(false);
  const [showPurchaseMasterDialog, setShowPurchaseMasterDialog] = useState(false);
  const [showBatchDialog, setShowBatchDialog] = useState(false);
  const [selectedItemRowIndex, setSelectedItemRowIndex] = useState(null);
  const [selectedBatchRowIndex, setSelectedBatchRowIndex] = useState(null);
  const [selectedItemIdForBatch, setSelectedItemIdForBatch] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMode, setPaymentMode] = useState("cash");
  const [cashDenominations, setCashDenominations] = useState({
    "2000": 0,
    "500": 0,
    "200": 0,
    "100": 0,
    "50": 0,
    "20": 0,
    "10": 0,
    "5": 0,
    "2": 0,
    "1": 0,
  });

  useEffect(() => {
    if (billData?.data) {
      setForm({
        ...billData.data,
        items: billData.data.billItems || [],
      });
    }
  }, [billData]);

  // Store purchase master data in form for calculations
  const [purchaseMasterData, setPurchaseMasterData] = useState(null);

  useEffect(() => {
    if (form.purchaseMasterId && purchaseMasterData) {
      const taxRates = {
        igstPercent: purchaseMasterData.igstPercentage || 0,
        cgstPercent: purchaseMasterData.cgstPercentage || 0,
        sgstPercent: purchaseMasterData.sgstPercentage || 0,
        cessPercent: purchaseMasterData.cessPercentage || 0,
      };
      const calcs = calculateBillTotals(
        form.items,
        form.billDiscountPercent,
        taxRates
      );
      setCalculations(calcs);
    }
  }, [form.items, form.billDiscountPercent, form.purchaseMasterId, purchaseMasterData]);

  const handleItemSelect = (item) => {
    console.log("Item selected:", item);
    console.log("Selected row index:", selectedItemRowIndex);
    
    if (selectedItemRowIndex !== null) {
      const newItems = [...form.items];
      const updatedItem = {
        ...newItems[selectedItemRowIndex],
        itemId: item.id,
        product: item.name || item.itemName || "",
        mrp: item.mrp || item.price || 0,
        rate: item.purchasePrice || item.purchaseRate || item.mrp || item.price || 0,
        packing: item.packing || "",
        batchId: "", // Reset batch when item changes
        batch: "",
      };
      console.log("Updated item:", updatedItem);
      newItems[selectedItemRowIndex] = updatedItem;
      setForm((prev) => ({ ...prev, items: newItems }));
      setSelectedItemRowIndex(null);
      setShowItemDialog(false);
    }
  };

  const handleBatchSelect = (batch) => {
    if (selectedBatchRowIndex !== null) {
      const newItems = [...form.items];
      newItems[selectedBatchRowIndex] = {
        ...newItems[selectedBatchRowIndex],
        batchId: batch.id,
        batch: batch.batchNumber,
        expiryDate: batch.expiryDate || "",
        mrp: batch.mrp || newItems[selectedBatchRowIndex].mrp,
        rate: batch.purchaseRate || newItems[selectedBatchRowIndex].rate,
      };
      setForm((prev) => ({ ...prev, items: newItems }));
      setSelectedBatchRowIndex(null);
      setSelectedItemIdForBatch(null);
    }
    setShowBatchDialog(false);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...form.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setForm((prev) => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          itemId: "",
          product: "",
          packing: "",
          batchId: "",
          batch: "",
          expDate: "",
          unit1: "",
          unit2: "",
          mrp: 0,
          rate: 0,
          quantity: 1,
          discountPercent: 0,
          amount: 0,
        },
      ],
    }));
  };

  const removeItem = (index) => {
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.supplierLedgerId) {
      toast.error("Please select a supplier");
      return;
    }

    if (!form.purchaseMasterId) {
      toast.error("Please select a purchase master (tax category)");
      return;
    }

    if (form.items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        ...form,
        items: calculations.items,
        ...calculations,
      };

      if (isEdit) {
        await updateBill({ id: billId, ...payload }).unwrap();
        toast.success("Purchase bill updated successfully");
      } else {
        await createBill(payload).unwrap();
        toast.success("Purchase bill created successfully");
      }

      navigate("/purchase/bill");
    } catch (error) {
      toast.error(error?.data?.message || "Error saving bill");
    } finally {
      setIsLoading(false);
    }
  };

  const formatCurrency = (value) => {
    return parseFloat(value || 0).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-25 p-4">
      <SelectItemDialog
        open={showItemDialog}
        onClose={() => setShowItemDialog(false)}
        onSelectItem={handleItemSelect}
      />
      <LedgerListModal
        open={showLedgerDialog}
        onClose={() => setShowLedgerDialog(false)}
        onSelectLedger={(ledger) => {
          setForm((prev) => ({
            ...prev,
            supplierLedgerId: ledger.id,
            supplierName: ledger.ledgerName,
          }));
          setShowLedgerDialog(false);
        }}
      />
      <PurchaseMasterListModal
        open={showPurchaseMasterDialog}
        onClose={() => setShowPurchaseMasterDialog(false)}
        onSelectPurchaseMaster={(master) => {
          setForm((prev) => ({
            ...prev,
            purchaseMasterId: master.id,
            purchaseMasterName: master.purchaseType,
          }));
          setPurchaseMasterData(master);
          setShowPurchaseMasterDialog(false);
        }}
      />
      <BatchSelectionDialog
        open={showBatchDialog}
        onClose={() => {
          setShowBatchDialog(false);
          setSelectedBatchRowIndex(null);
          setSelectedItemIdForBatch(null);
        }}
        onSelectBatch={handleBatchSelect}
        itemId={selectedItemIdForBatch}
        itemName={
          selectedBatchRowIndex !== null
            ? form.items[selectedBatchRowIndex]?.product || "Unknown Item"
            : "Unknown Item"
        }
      />

      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Purchase Bill</h1>
            <p className="text-green-100 text-sm mt-1">
              {isEdit ? "Edit Purchase Bill" : "Create New Purchase Bill"}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-green-100">Total Due</div>
            <div className="text-4xl font-bold">
              ₹{formatCurrency(calculations.totalAmount)}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Bill Header Section */}
          <div className="grid grid-cols-4 gap-4 pb-6 border-b border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bill No.
              </label>
              <input
                type="text"
                value={form.billNo}
                onChange={(e) => setForm({ ...form, billNo: e.target.value })}
                placeholder="Auto-generated"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Bill Date
              </label>
              <input
                type="date"
                value={form.billDate}
                onChange={(e) => setForm({ ...form, billDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Supplier Invoice No.
              </label>
              <input
                type="text"
                value={form.supplierInvoiceNo}
                onChange={(e) => setForm({ ...form, supplierInvoiceNo: e.target.value })}
                placeholder="Supplier invoice number"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Supplier Invoice Date
              </label>
              <input
                type="date"
                value={form.supplierInvoiceDate}
                onChange={(e) => setForm({ ...form, supplierInvoiceDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>

          {/* Supplier & Tax Section */}
          <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Supplier Ledger *
              </label>
              <input
                type="text"
                value={form.supplierName}
                onClick={() => setShowLedgerDialog(true)}
                readOnly
                placeholder="Click to select supplier"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Purchase Master (Tax Category) *
              </label>
              <input
                type="text"
                value={form.purchaseMasterName}
                onClick={() => setShowPurchaseMasterDialog(true)}
                readOnly
                placeholder="Click to select tax category"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          </div>

          {/* Items Table */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Products</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-green-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">Product</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">Packing</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">Batch</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">Exp. Date</th>
                    <th className="px-3 py-3 text-right font-semibold text-gray-700">Rate</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700">Qty</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700">Disc %</th>
                    <th className="px-3 py-3 text-right font-semibold text-gray-700">Amount</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {form.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-green-50">
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.product || ""}
                          onFocus={() => {
                            setSelectedItemRowIndex(idx);
                            setShowItemDialog(true);
                          }}
                          readOnly
                          placeholder="Click to select"
                          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-50 cursor-pointer text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.packing}
                          onChange={(e) => handleItemChange(idx, "packing", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.batch}
                          onFocus={() => {
                            if (item.itemId) {
                              setSelectedBatchRowIndex(idx);
                              setSelectedItemIdForBatch(item.itemId);
                              setShowBatchDialog(true);
                            } else {
                              toast.error("Please select an item first");
                            }
                          }}
                          readOnly
                          placeholder="Click to select batch"
                          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-50 cursor-pointer text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="date"
                          value={item.expDate}
                          onChange={(e) => handleItemChange(idx, "expDate", e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) => handleItemChange(idx, "rate", parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-right focus:outline-none focus:ring-2 focus:ring-green-500"
                          step="0.01"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, "quantity", parseFloat(e.target.value) || 1)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                          step="0.01"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.discountPercent}
                          onChange={(e) => handleItemChange(idx, "discountPercent", parseFloat(e.target.value) || 0)}
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                          step="0.01"
                        />
                      </td>
                      <td className="px-3 py-2 text-right font-semibold text-xs text-gray-900">
                        ₹{formatCurrency(calculations.items?.[idx]?.amount || 0)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button
              type="button"
              onClick={addItem}
              className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-semibold"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>

          {/* Calculations Section */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
              <label className="text-xs text-gray-600 font-semibold mb-2 block">Bill Discount %</label>
              <input
                type="number"
                value={form.billDiscountPercent}
                onChange={(e) => setForm({ ...form, billDiscountPercent: parseFloat(e.target.value) || 0 })}
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                step="0.01"
              />
            </div>
            <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-600 font-semibold mb-2">Tax Breakdown</div>
              <div className="text-xs space-y-1 text-gray-700">
                <div>IGST: {calculations.igstPercent}% = ₹{formatCurrency(calculations.igstAmount)}</div>
                <div>CGST: {calculations.cgstPercent}% = ₹{formatCurrency(calculations.cgstAmount)}</div>
                <div>SGST: {calculations.sgstPercent}% = ₹{formatCurrency(calculations.sgstAmount)}</div>
                <div>CESS: {calculations.cessPercent}% = ₹{formatCurrency(calculations.cessAmount)}</div>
              </div>
            </div>
          </div>

          {/* Total Section */}
          <div className="flex justify-end">
            <div className="p-6 w-96 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold">₹{formatCurrency(calculations.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Discount:</span>
                  <span className="font-semibold">-₹{formatCurrency(calculations.itemDiscount + calculations.billDiscountAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Tax:</span>
                  <span className="font-semibold">₹{formatCurrency(calculations.totalTaxAmount)}</span>
                </div>
                <div className="border-t border-green-300 pt-3 flex justify-between text-lg font-bold text-green-700">
                  <span>Total Amount:</span>
                  <span>₹{formatCurrency(calculations.totalAmount)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notes Section */}
          <div className="pb-6 border-b border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Notes
            </label>
            <textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Additional notes..."
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Payment Mode Section */}
          <div className="pb-6 border-b border-gray-200">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Details</h3>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Payment Mode
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMode === "cash"}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Cash</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="online"
                    checked={paymentMode === "online"}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Online</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="cheque"
                    checked={paymentMode === "cheque"}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Cheque</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="credit"
                    checked={paymentMode === "credit"}
                    onChange={(e) => setPaymentMode(e.target.value)}
                    className="mr-2"
                  />
                  <span className="text-gray-700">Credit</span>
                </label>
              </div>
            </div>

            {paymentMode === "cash" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Cash Denominations
                </label>
                <div className="grid grid-cols-5 gap-3">
                  {Object.keys(cashDenominations).map((denomination) => (
                    <div key={denomination}>
                      <label className="block text-xs text-gray-600 mb-1">
                        ₹{denomination}
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={cashDenominations[denomination]}
                        onChange={(e) =>
                          setCashDenominations({
                            ...cashDenominations,
                            [denomination]: parseInt(e.target.value) || 0,
                          })
                        }
                        className="w-full px-2 py-1 border border-gray-300 rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="0"
                      />
                      <div className="text-xs text-gray-600 mt-1 text-center">
                        = ₹{(denomination * cashDenominations[denomination]).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <div className="text-sm font-semibold text-gray-800">
                    Total Cash: ₹
                    {Object.keys(cashDenominations)
                      .reduce((sum, denom) => sum + denom * cashDenominations[denom], 0)
                      .toFixed(2)}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate("/purchase/bill")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700 flex items-center gap-2"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} /> {isLoading ? "Saving..." : isEdit ? "Update Bill" : "Create Bill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PurchaseBillForm;
