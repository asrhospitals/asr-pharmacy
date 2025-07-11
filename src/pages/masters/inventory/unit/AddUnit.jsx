import React, { useState } from "react";
import { useAddUnitMutation } from '../../../../services/unitApi';
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";

export default function CreateUnitForm({ isOpen = true, onClose = () => {} }) {
  const [formData, setFormData] = useState({
    unitName: "",
    uqc: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addUnit, { isLoading }] = useAddUnitMutation();

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
      await addUnit(formData).unwrap();
      setSuccess("Unit created successfully!");
      setFormData({ unitName: "", uqc: "" });
    } catch (err) {
      setError(err?.data?.message || 'Failed to create unit');
    }
  };

  const handleClear = () => {
    setFormData({ unitName: "", uqc: "" });
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Unit">
      <form onSubmit={handleSave} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Unit Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="unitName"
            value={formData.unitName}
            onChange={handleChange}
            className="bg-yellow-100 border-yellow-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">UQC</label>
          <Input
            type="text"
            name="uqc"
            value={formData.uqc}
            onChange={handleChange}
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="flex gap-2 mt-6">
          <Button type="submit" variant="primary" disabled={isLoading}>Save</Button>
          <Button type="button" variant="secondary" onClick={handleClear}>Clear</Button>
          <Button type="button" variant="danger" onClick={onClose}>Close</Button>
        </div>
      </form>
    </Modal>
  );
}
