import { useState } from 'react';
import { useAddStoreMutation } from '../../../../services/storeApi';
import Input from '../../../../componets/common/Input';
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';

export default function AddStore({ isOpen = true, onClose = () => {} }) {
  const [formData, setFormData] = useState({
    storecode: "",
    storename: "",
    address1: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addStore, { isLoading }] = useAddStoreMutation();

  if (!isOpen) return null;

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
      const response = await addStore(formData).unwrap();
      setSuccess("Store created successfully!");
      setFormData({ storecode: "", storename: "", address1: "" });
    } catch (err) {
      setError(err?.data?.message || 'Failed to create store');
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Store">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Store Code"
          name="storecode"
          value={formData.storecode}
          onChange={handleChange}
          required
        />
        <Input
          label="Store Name"
          name="storename"
          value={formData.storename}
          onChange={handleChange}
          required
        />
        <Input
          label="Address"
          name="address1"
          value={formData.address1}
          onChange={handleChange}
          required
        />
        <div className="flex gap-2 justify-end mt-6">
          <Button type="submit" variant="primary" disabled={isLoading}>Save</Button>
          <Button type="button" variant="secondary" onClick={() => setFormData({ storecode: '', storename: '', address1: '' })}>Clear</Button>
          <Button type="button" variant="danger" onClick={onClose}>Close</Button>
        </div>
      </form>
    </Modal>
  );
}