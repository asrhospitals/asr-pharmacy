import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Trash2, Plus, Save, X } from "lucide-react";
import {
  useCreateBillMutation,
  useUpdateBillMutation,
  useGetBillQuery,
} from "../../../services/salesBillApi";
import PatientListModal from "../../masters/other/prescription/PatientListModal";
import DoctorListModal from "../../masters/other/doctor/DoctorListModal";
import LedgerListModal from "./LedgerListModal";
import SelectItemDialog from "../../../componets/common/SelectItemDialog";
import { calculateBillTotals, formatCurrency } from "../../../utils/billCalculations";
import toast from "react-hot-toast";

const BillForm = () => {
  const navigate = useNavigate();
  const { id: billId } = useParams();
  const isEdit = !!billId;
  const { data: billData } = useGetBillQuery(billId, { skip: !isEdit });
  const [createBill] = useCreateBillMutation();
  const [updateBill] = useUpdateBillMutation();

  const [form, setForm] = useState({
    billNo: "",
    date: new Date().toISOString().split("T")[0],
    partyName: "",
    partyId: "",
    patientName: "",
    patientId: "",
    doctorName: "",
    doctorId: "",
    address: "",
    notes: "",
    items: [],
    billDiscountPercent: 0,
    cgstPercent: 0,
    sgstPercent: 0,
  });

  const [calculations, setCalculations] = useState({
    subtotal: 0,
    itemDiscount: 0,
    billDiscountAmount: 0,
    cgstAmount: 0,
    sgstAmount: 0,
    totalAmount: 0,
    dueAmount: 0,
  });

  const [showPatientDialog, setShowPatientDialog] = useState(false);
  const [showDoctorDialog, setShowDoctorDialog] = useState(false);
  const [showLedgerDialog, setShowLedgerDialog] = useState(false);
  const [showItemDialog, setShowItemDialog] = useState(false);
  const [selectedItemRowIndex, setSelectedItemRowIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (billData?.data) {
      setForm({
        ...billData.data,
        items: billData.data.billItems || [],
      });
    }
  }, [billData]);

  useEffect(() => {
    const calcs = calculateBillTotals(
      form.items,
      form.billDiscountPercent,
      {
        igstPercent: 0,
        cgstPercent: form.cgstPercent,
        sgstPercent: form.sgstPercent,
        cessPercent: 0,
      }
    );
    setCalculations(calcs);
  }, [form.items, form.billDiscountPercent, form.cgstPercent, form.sgstPercent]);

  const handleItemSelect = (item) => {
    if (selectedItemRowIndex !== null) {
      const newItems = [...form.items];
      newItems[selectedItemRowIndex] = {
        ...newItems[selectedItemRowIndex],
        itemId: item.id,
        product: item.name,
        mrp: item.mrp || 0,
        rate: item.mrp || 0,
        packing: item.packing || "",
      };
      setForm((prev) => ({ ...prev, items: newItems }));
      setSelectedItemRowIndex(null);
    }
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
          product: "",
          packing: "",
          batch: "",
          expDate: "",
          unit1: "",
          unit2: "",
          mrp: 0,
          rate: 0,
          quantity: 1,
          discountPercent: 0,
          cgstPercent: 0,
          sgstPercent: 0,
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
        toast.success("Bill updated successfully");
      } else {
        await createBill(payload).unwrap();
        toast.success("Bill created successfully");
      }

      navigate("/sales/bill");
    } catch (error) {
      toast.error(error?.data?.message || "Error saving bill");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-25 p-4">
      <PatientListModal
        open={showPatientDialog}
        onClose={() => setShowPatientDialog(false)}
        onSelectPatient={(patient) => {
          setForm((prev) => ({
            ...prev,
            patientId: patient.id,
            patientName: patient.name,
            address: patient.address || "",
          }));
          setShowPatientDialog(false);
        }}
      />
      <DoctorListModal
        open={showDoctorDialog}
        onClose={() => setShowDoctorDialog(false)}
        onSelectDoctor={(doctor) => {
          setForm((prev) => ({
            ...prev,
            doctorId: doctor.id,
            doctorName: doctor.name,
          }));
          setShowDoctorDialog(false);
        }}
      />
      <LedgerListModal
        open={showLedgerDialog}
        onClose={() => setShowLedgerDialog(false)}
        onSelectLedger={(ledger) => {
          setForm((prev) => ({
            ...prev,
            partyId: ledger.id,
            partyName: ledger.ledgerName,
            address: ledger.address || "",
          }));
          setShowLedgerDialog(false);
        }}
      />
      <SelectItemDialog
        open={showItemDialog}
        onClose={() => setShowItemDialog(false)}
        onSelectItem={handleItemSelect}
      />

      <div className="max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Sale Bill</h1>
            <p className="text-blue-100 text-sm mt-1">
              {isEdit ? "Edit Bill" : "Create New Bill"}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-blue-100">Balance</div>
            <div className="text-4xl font-bold">
              ₹{formatCurrency(calculations.dueAmount)}
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
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Party Name
              </label>
              <input
                type="text"
                value={form.partyName}
                onClick={() => setShowLedgerDialog(true)}
                readOnly
                placeholder="Click to select party"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Patient & Doctor Section */}
          <div className="grid grid-cols-4 gap-4 pb-6 border-b border-gray-200">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Patient Mob./ID
              </label>
              <input
                type="text"
                value={form.patientId}
                onClick={() => setShowPatientDialog(true)}
                readOnly
                placeholder="Click to select patient"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Patient Name
              </label>
              <input
                type="text"
                value={form.patientName}
                onClick={() => setShowPatientDialog(true)}
                readOnly
                placeholder="Click to select patient"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Doctor Mob./ID
              </label>
              <input
                type="text"
                value={form.doctorId}
                placeholder="Doctor ID"
                onFocus={() => setShowDoctorDialog(true)}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Doctor Name
              </label>
              <input
                type="text"
                value={form.doctorName}
                placeholder="Doctor Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onChange={(e) => setForm({ ...form, doctorName: e.target.value })}
              />
            </div>
          </div>

          {/* Address Section */}
          <div className="pb-6 border-b border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={form.address}
              placeholder="Address"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>

          {/* Items Table */}
          <div>
            <h2 className="text-lg font-bold text-gray-800 mb-4">Products</h2>
            <div className="overflow-x-auto border border-gray-200 rounded-lg">
              <table className="w-full text-sm">
                <thead className="bg-blue-50 border-b border-gray-200">
                  <tr>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">Product</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">Packing</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">Batch</th>
                    <th className="px-3 py-3 text-left font-semibold text-gray-700">Exp. Date</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700">Unit-2</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700">Unit-1</th>
                    <th className="px-3 py-3 text-right font-semibold text-gray-700">Rate</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700">Qty</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700">Disc %</th>
                    <th className="px-3 py-3 text-right font-semibold text-gray-700">Amount</th>
                    <th className="px-3 py-3 text-center font-semibold text-gray-700">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {form.items.map((item, idx) => (
                    <tr key={idx} className="border-b border-gray-200 hover:bg-blue-50 transition">
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.product}
                          onFocus={() => {
                            setSelectedItemRowIndex(idx);
                            setShowItemDialog(true);
                          }}
                          readOnly
                          placeholder="Click to select"
                          className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-50 cursor-pointer text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.packing}
                          onChange={(e) =>
                            handleItemChange(idx, "packing", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.batch}
                          onChange={(e) =>
                            handleItemChange(idx, "batch", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="date"
                          value={item.expDate}
                          onChange={(e) =>
                            handleItemChange(idx, "expDate", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.unit2}
                          onChange={(e) =>
                            handleItemChange(idx, "unit2", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={item.unit1}
                          onChange={(e) =>
                            handleItemChange(idx, "unit1", e.target.value)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            handleItemChange(idx, "rate", parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-right focus:outline-none focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(idx, "quantity", parseFloat(e.target.value) || 1)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          value={item.discountPercent}
                          onChange={(e) =>
                            handleItemChange(idx, "discountPercent", parseFloat(e.target.value) || 0)
                          }
                          className="w-full px-2 py-1 border border-gray-300 rounded text-xs text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                          step="0.01"
                        />
                      </td>
                      <td className="px-3 py-2 text-right font-semibold text-xs text-gray-900">
                        ₹{formatCurrency(item.amount || 0)}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <button
                          type="button"
                          onClick={() => removeItem(idx)}
                          className="text-red-600 hover:text-red-800 transition"
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
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-semibold transition"
            >
              <Plus size={16} /> Add Product
            </button>
          </div>

          {/* Calculations Section */}
          <div className="grid grid-cols-4 gap-4">
            <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-600 font-semibold mb-2">Discount Info</div>
              <div className="text-sm font-semibold text-gray-900">
                Item Disc: ₹{formatCurrency(calculations.itemDiscount)}
              </div>
            </div>
            <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
              <div className="text-xs text-gray-600 font-semibold mb-2">Tax Info</div>
              <div className="text-xs space-y-1 text-gray-700">
                <div>CGST: {form.cgstPercent}% = ₹{formatCurrency(calculations.cgstAmount)}</div>
                <div>SGST: {form.sgstPercent}% = ₹{formatCurrency(calculations.sgstAmount)}</div>
              </div>
            </div>
            <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
              <label className="text-xs text-gray-600 font-semibold mb-2 block">Bill Discount %</label>
              <input
                type="number"
                value={form.billDiscountPercent}
                onChange={(e) =>
                  setForm({ ...form, billDiscountPercent: parseFloat(e.target.value) || 0 })
                }
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                step="0.01"
              />
            </div>
            <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
              <label className="text-xs text-gray-600 font-semibold mb-2 block">Tax %</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={form.cgstPercent}
                  onChange={(e) =>
                    setForm({ ...form, cgstPercent: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="CGST"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
                <input
                  type="number"
                  value={form.sgstPercent}
                  onChange={(e) =>
                    setForm({ ...form, sgstPercent: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="SGST"
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                  step="0.01"
                />
              </div>
            </div>
          </div>

          {/* Total Section */}
          <div className="flex justify-end">
            <div className="p-6 w-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-gray-900">₹{formatCurrency(calculations.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Discount:</span>
                  <span className="font-semibold text-gray-900">
                    -₹{formatCurrency(calculations.itemDiscount + calculations.billDiscountAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Total Tax:</span>
                  <span className="font-semibold text-gray-900">
                    ₹{formatCurrency(calculations.cgstAmount + calculations.sgstAmount)}
                  </span>
                </div>
                <div className="border-t border-blue-300 pt-3 flex justify-between text-lg font-bold text-blue-700">
                  <span>Invoice Value:</span>
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
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <button
              type="button"
              onClick={() => navigate("/sales/bill")}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700 flex items-center gap-2 transition"
            >
              <X size={18} /> Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold flex items-center gap-2 disabled:opacity-50 transition"
            >
              <Save size={18} /> {isLoading ? "Saving..." : isEdit ? "Update Bill" : "Create Bill"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillForm;
