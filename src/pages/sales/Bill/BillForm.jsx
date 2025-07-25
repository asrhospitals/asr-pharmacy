import React, { useState, useEffect } from "react";
import Input from "../../../componets/common/Input";
import Button from "../../../componets/common/Button";
import Card from "../../../componets/common/Card";
import GlobalEditableTable from "../../../componets/common/GlobalEditableTable";
import {
  useCreateBillMutation,
  useUpdateBillMutation,
  useGetBillQuery,
} from "../../../services/salesBillApi";
import PatientListModal from "../../masters/other/prescription/PatientListModal";
import DoctorListModal from "../../masters/other/doctor/DoctorListModal";

const emptyItem = {
  product: "",
  packing: "",
  batch: "",
  expDate: "",
  unit1: "",
  unit2: "",
  rate: "",
  discount: "",
  amount: "",
};

const itemColumns = [
  { key: "product", label: "Product", type: "text" },
  { key: "packing", label: "Packing", type: "text" },
  { key: "batch", label: "Batch", type: "text" },
  { key: "expDate", label: "Exp. Date", type: "date" },
  { key: "unit2", label: "Unit-2", type: "text" },
  { key: "unit1", label: "Unit-1", type: "text" },
  { key: "mrp", label: "MRP", type: "number" },
  { key: "amount", label: "₹ Amount", type: "number" },
];

const BillForm = ({ billId, onSuccess, onCancel }) => {
  const isEdit = !!billId;
  const { data: billData } = useGetBillQuery(billId, { skip: !isEdit });
  const [createBill] = useCreateBillMutation();
  const [updateBill] = useUpdateBillMutation();

  const [form, setForm] = useState({
    billNo: "",
    date: "",
    partyName: "",
    patientId: "",
    patientName: "",
    doctorId: "",
    doctorName: "",
    address: "",
    status: "Paid",
    amount: 0,
    items: [{ ...emptyItem }],
  });

  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showDoctorModal, setShowDoctorModal] = useState(false);

  useEffect(() => {
    if (billData?.data) {
      setForm({
        ...billData.data,
        items: billData.data.items.length
          ? billData.data.items
          : [{ ...emptyItem }],
      });
    }
  }, [billData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const addItem = () =>
    setForm((prev) => ({ ...prev, items: [...prev.items, { ...emptyItem }] }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      amount: form.items.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      ),
    };
    if (isEdit) {
      await updateBill({ id: billId, ...payload });
    } else {
      await createBill(payload);
    }
    if (onSuccess) onSuccess();
  };

  const totalDiscount = form.items.reduce(
    (sum, item) => sum + Number(item.discount || 0),
    0
  );
  const totalAmount = form.items.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  // When patient is selected from modal
  const handlePatientSelect = (patient) => {
    setForm((prev) => ({
      ...prev,
      patientId: patient.id,
      patientName: patient.name,
      address: patient.address,
    }));
    setShowPatientModal(false);
    // Optionally: setShowDoctorModal(true); // Uncomment if you want to prompt doctor selection immediately
  };

  // When doctor is selected from modal
  const handleDoctorSelect = (doctor) => {
    setForm((prev) => ({
      ...prev,
      doctorId: doctor.id,
      doctorName: doctor.name,
    }));
    setShowDoctorModal(false);
  };

  return (
    <div className="flex flex-col p-2">
      <PatientListModal
        open={showPatientModal}
        onClose={() => setShowPatientModal(false)}
        onSelectPatient={handlePatientSelect}
      />
      <DoctorListModal
        open={showDoctorModal}
        onClose={() => setShowDoctorModal(false)}
        onSelectDoctor={handleDoctorSelect}
      />
      <div className="bg-white rounded-lg shadow-md p-4 w-full mx-auto">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-bold">Sale Bill 1</h1>
          <div className="flex gap-4">
            <span className="font-semibold">Balance : ₹</span>
            <span className="font-semibold">Due Amount ₹</span>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 gap-4 mb-4">
            {/* Row 1 */}
            <div className="col-span-2">
              <Input
                label="Party Name"
                name="partyName"
                value={form.partyName}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <Input
                label="Bill No."
                name="billNo"
                value={form.billNo}
                onChange={handleChange}
                className="w-full"
              />
            </div>
            <div>
              <Input
                label="Date"
                name="date"
                type="date"
                value={form.date}
                onChange={handleChange}
                placeholder="dd-mm-yyyy"
                className="w-full"
              />
            </div>

            {/* Row 2 */}
            <div>
              <Input
                label="Patient Mob./ID"
                name="patientId"
                value={form.patientId}
                onFocus={() => setShowPatientModal(true)}
                readOnly
                className="w-full cursor-pointer bg-gray-100"
              />
            </div>
            <div>
              <Input
                label="Patient Name"
                name="patientName"
                value={form.patientName}
                readOnly
                className="w-full bg-gray-100"
              />
            </div>
            <div className="col-span-2">
              <Input
                label="Address"
                name="address"
                value={form.address}
                readOnly
                className="w-full bg-gray-100"
              />
            </div>

            {/* Row 3 */}
            <div>
              <Input
                label="Doctor Mob./ID"
                name="doctorId"
                value={form.doctorId}
                onFocus={() => setShowDoctorModal(true)}
                readOnly
                className="w-full cursor-pointer bg-gray-100"
              />
            </div>
            <div>
              <Input
                label="Doctor Name"
                name="doctorName"
                value={form.doctorName}
                readOnly
                className="w-full bg-gray-100"
              />
            </div>
            <div></div>
            <div></div>
          </div>
          <div className="mb-2">
            <GlobalEditableTable
              columns={itemColumns}
              rows={form.items}
              setRows={(items) => setForm((prev) => ({ ...prev, items }))}
              minRows={1}
            />
            <Button
              variant="secondary"
              onClick={addItem}
              type="button"
              className="mt-2"
            >
              + Add Item
            </Button>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-2">
            <Card className="col-span-1 p-2">
              <div className="font-semibold mb-1">Discount Info</div>
              <div className="flex flex-col text-xs">
                <div>Total Item Disc. : {totalDiscount.toFixed(2)}</div>
                <div>Item Disc. 1 : </div>
                <div>Item Disc. 2 : </div>
              </div>
            </Card>
            <Card className="col-span-1 p-2">
              <div className="font-semibold mb-1">Tax Info</div>
              <div className="flex flex-col text-xs">
                <div>CGST 0.00% : 0.00</div>
                <div>SGST 0.00% : 0.00</div>
              </div>
            </Card>
            <Card className="col-span-2 p-2">
              <div className="flex flex-col gap-1">
                <div className="flex gap-2 items-center">
                  <span>Bill Disc.</span>
                  <Input
                    name="billDiscPercent"
                    value={form.billDiscPercent || "0.00"}
                    className="w-16"
                  />
                  <span>%</span>
                  <Input
                    name="billDiscAmount"
                    value={form.billDiscAmount || "0.00"}
                    className="w-16"
                  />
                  <span>/-</span>
                  <span>Total Disc. : 0.00</span>
                </div>
                <div className="font-semibold mt-2">Additional Details</div>
                <div className="flex gap-4 text-xs">
                  <div>CGST Output</div>
                  <div>%</div>
                  <div>₹ Amount</div>
                </div>
                <div className="flex gap-4 text-xs">
                  <div>SGST Output</div>
                  <div>%</div>
                  <div>₹ Amount</div>
                </div>
              </div>
            </Card>
          </div>

          <div className="flex justify-end items-center mb-2">
            <span className="font-bold text-lg">
              Invoice Value : {totalAmount.toFixed(2)}
            </span>
          </div>

          <div className="flex gap-2 justify-end mt-2">
            <Button type="submit" variant="primary" buttonType="save">
              Save
            </Button>
            <Button type="button" variant="secondary">
              Save As Draft
            </Button>
            <Button
              type="button"
              variant="danger"
              buttonType="close"
              onClick={onCancel}
            >
              Close
            </Button>
            <Button type="button" variant="secondary">
              Last Deal
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BillForm;
