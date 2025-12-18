import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Save, X } from "lucide-react";
import {
  useCreateBillMutation,
  useUpdateBillMutation,
  useGetBillQuery,
} from "../../../services/salesBillApi";
import PatientListModal from "../../masters/other/prescription/PatientListModal";
import DoctorListModal from "../../masters/other/doctor/DoctorListModal";
import LedgerListModal from "../Bill/components/LedgerListModal";
import SelectItemDialog from "../../../componets/common/SelectItemDialog";
import Button from "../../../componets/common/Button";
import { calculateBillTotals, formatCurrency } from "../../../utils/billCalculations";
import toast from "react-hot-toast";

import SaleBillHeaderSection from "../Bill/components/SaleBillHeaderSection";
import PartyDetailsSection from "../Bill/components/PartyDetailsSection";
import SaleItemsTableSection from "../Bill/components/SaleItemsTableSection";
import SaleCalculationsSection from "../Bill/components/SaleCalculationsSection";
import SaleTotalSection from "../Bill/components/SaleTotalSection";

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
          <SaleBillHeaderSection
            form={form}
            setForm={setForm}
            onShowLedgerDialog={() => setShowLedgerDialog(true)}
          />

          <PartyDetailsSection
            form={form}
            setForm={setForm}
            onShowPatientDialog={() => setShowPatientDialog(true)}
            onShowDoctorDialog={() => setShowDoctorDialog(true)}
          />

          <SaleItemsTableSection
            items={form.items}
            onItemChange={handleItemChange}
            onAddItem={addItem}
            onRemoveItem={removeItem}
            onSelectItem={(idx) => {
              setSelectedItemRowIndex(idx);
              setShowItemDialog(true);
            }}
            formatCurrency={formatCurrency}
          />

          <SaleCalculationsSection
            form={form}
            setForm={setForm}
            calculations={calculations}
            formatCurrency={formatCurrency}
          />

          <SaleTotalSection
            calculations={calculations}
            formatCurrency={formatCurrency}
          />

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
            <Button
              type="button"
              onClick={() => navigate("/sales/bill")}
              variant="outline"
              className="flex items-center gap-2"
            >
              <X size={18} /> Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2 disabled:opacity-50"
            >
              <Save size={18} /> {isLoading ? "Saving..." : isEdit ? "Update Bill" : "Create Bill"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillForm;
