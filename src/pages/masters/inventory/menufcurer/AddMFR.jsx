import { useState } from "react";
import Header from "../../../../componets/common/Header";
import Footer from "../../../../componets/common/Footer";
import { useAddManufacturerMutation } from '../../../../services/mfrApi';
import Input from '../../../../componets/common/Input';
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';

export default function CreateMFRModal({ isOpen = true, onClose = () => {} }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    mfrname: "",
    country: "",
    state: "",
    address: "",
    email: "",
    phone: "",
    status: "Continue",
    prohabited: "No",
  });
  const [addManufacturer, { isLoading }] = useAddManufacturerMutation();

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await addManufacturer(formData).unwrap();
      setSuccess("Manufacturer created successfully!");
      setFormData({
        mfrname: "",
        country: "",
        state: "",
        address: "",
        email: "",
        phone: "",
        status: "Continue",
        prohabited: "No",
      });
    } catch (err) {
      setError(err?.data?.message || 'Failed to create manufacturer');
    }
  };

  const handleClear = () => {
    setFormData({
      mfrname: "",
      country: "",
      state: "",
      address: "",
      email: "",
      phone: "",
      status: "Continue",
      prohabited: "No",
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Manufacturer">
      <form onSubmit={handleSave} className="space-y-4">
        <Input label="Manufacturer Name" name="mfrname" value={formData.mfrname} onChange={handleChange} required />
        <Input label="Short Name" name="shortname" value={formData.shortname} onChange={handleChange} required />
        <Input label="Address" name="address" value={formData.address} onChange={handleChange} />
        <Input label="Contact Person" name="contactperson" value={formData.contactperson} onChange={handleChange} />
        <Input label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
        <Input label="Email" name="email" value={formData.email} onChange={handleChange} />
        <div className="flex gap-2 justify-end mt-6">
          <Button type="submit" variant="primary" disabled={isLoading}>Save</Button>
          <Button type="button" variant="secondary" onClick={handleClear}>Clear</Button>
          <Button type="button" variant="danger" onClick={onClose}>Close</Button>
        </div>
      </form>
    </Modal>
  );
}
