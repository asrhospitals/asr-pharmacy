import React, { useState } from "react";
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import { PhoneIcon } from "lucide-react";

const specializationOptions = [
  { value: "", label: "---Blank---" },
  { value: "cardiology", label: "Cardiology" },
  { value: "dermatology", label: "Dermatology" },
  { value: "neurology", label: "Neurology" },
  // Add more as needed
];

const CreateDoctorModal = ({ open, onClose, onSave }) => {
  const [form, setForm] = useState({
    mobileNo: "",
    id: "",
    regNo: "",
    name: "",
    hospital: "",
    specialization: "",
    commission: "0.00",
    locationCode: "",
    address: "",
    pin: "",
    phone: "",
    email: "",
    whatsapp: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) onSave(form);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create Doctor"
      className="max-w-4xl"
    >
      <div className="flex flex-col md:flex-row gap-4">
        {/* Doctor List Section */}
        <div className="flex-1 border border-gray-300 rounded p-3">
          <div className="font-bold mb-2">Doctor List</div>
          <Input
            label="Mobile No."
            name="mobileNo"
            prefix="+91"
            startIcon={<PhoneIcon className="w-4" />}
            value={form.mobileNo}
            onChange={handleChange}
          />
          <Input label="ID" name="id" value={form.id} onChange={handleChange} />
          <Input
            label="Registration No"
            name="regNo"
            value={form.regNo}
            onChange={handleChange}
            className="mb-2"
          />
          <Input
            label="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="mb-2"
          />
          <Input
            label="Hospital Name"
            name="hospital"
            value={form.hospital}
            onChange={handleChange}
            className="mb-2"
          />
          <Select
            label="Specialization"
            name="specialization"
            value={form.specialization}
            options={specializationOptions}
            onChange={(e) =>
              handleSelectChange("specialization", e.target.value)
            }
            className="mb-2 bg-yellow-200"
          />
          <Input
            label="Commission %"
            name="commission"
            value={form.commission}
            onChange={handleChange}
            className="mb-2"
          />
          <Input
            label="Location Code"
            name="locationCode"
            value={form.locationCode}
            onChange={handleChange}
            className="mb-2"
          />
        </div>
        {/* Contact Details Section */}
        <div className="flex-1">
          <div className="flex-1 border border-gray-300 rounded p-3">
            <div className="font-bold mb-2">Contact Details</div>
            <Input
              label="Address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              label="Pin No"
              name="pin"
              value={form.pin}
              onChange={handleChange}
              className="w-1/2"
            />
            <Input
              label="Phone No"
              name="phone"
              startIcon={<PhoneIcon className="w-4" />}
              value={form.phone}
              onChange={handleChange}
              className="w-1/2"
            />
            <Input
              label="Email ID"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="mb-2"
            />
            <Input
              label="WhatsApp No."
              name="whatsapp"
              prefix="+91"
              value={form.whatsapp}
              onChange={handleChange}
              className="mb-2"
            />
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button buttonType="save" onClick={handleSave} type="button">
              Save
            </Button>
            <Button
              buttonType="close"
              onClick={onClose}
              type="button"
              variant="secondary"
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CreateDoctorModal;
