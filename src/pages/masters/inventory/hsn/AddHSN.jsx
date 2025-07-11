import React, { useState } from "react";
import { useAddHSNMutation } from '../../../../services/hsnApi';
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";

export default function CreateHsnSacForm({ isOpen = true, onClose = () => {} }) {
  const [formData, setFormData] = useState({
    hsnSacCode: "",
    hsnsacname: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addHSN, { isLoading }] = useAddHSNMutation();

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
      await addHSN(formData).unwrap();
      setSuccess("HSN created successfully!");
      setFormData({ hsnSacCode: "", hsnsacname: "" });
    } catch (err) {
      setError(err?.data?.message || 'Failed to create HSN');
    }
  };

  const handleClear = () => {
    setFormData({
      hsnSacCode: "",
      hsnsacname: "",
    });
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create HSN/SAC">
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HSN/SAC Code <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="hsnSacCode"
            value={formData.hsnSacCode}
            onChange={handleChange}
            className="bg-yellow-100 border-yellow-300"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">HSN/SAC name</label>
          <Input
            type="text"
            name="hsnsacname"
            value={formData.hsnsacname}
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
