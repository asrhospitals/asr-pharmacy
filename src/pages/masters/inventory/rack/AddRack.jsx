import { useState } from "react";
import { useAddRackMutation } from '../../../../services/rackApi';
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";

export default function AddRack({ isOpen = true, onClose = () => {} }) {
  const [formData, setFormData] = useState({
    storename: "",
    rackname: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addRack, { isLoading }] = useAddRackMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await addRack(formData).unwrap();
      setSuccess("Rack created successfully!");
      setFormData({ storename: "", rackname: "" });
    } catch (err) {
      setError(err?.data?.message || 'Failed to create rack');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Rack">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Store Name</label>
          <Input
            type="text"
            name="storename"
            value={formData.storename}
            onChange={handleChange}
            className="bg-yellow-50"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Rack Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            name="rackname"
            value={formData.rackname}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="flex gap-2 mt-6">
          <Button type="submit" variant="primary" disabled={isLoading}>Save</Button>
          <Button type="button" variant="danger" onClick={onClose}>Close</Button>
        </div>
      </form>
    </Modal>
  );
}
