import React, { useState } from "react";
import { X, ChevronRight, Calendar } from "lucide-react";
import Footer from "../../componets/common/Footer";
import Header from "../../componets/common/Header";
import TableView from "../../componets/common/Table";
import TableHead from "../../componets/common/TableHead";
import { useAddBillMutation } from "../../services/billApi";
import Input from "../../componets/common/Input";
import Button from "../../componets/common/Button";
import Modal from "../../componets/common/Modal";
import Loader from "../../componets/common/Loader";

export default function AddBillForm({ isOpen = true, onClose = () => {} }) {
  const [formData, setFormData] = useState({
    hsnSacCode: "",
    hsnsacname: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addBill, { isLoading }] = useAddBillMutation();

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
      await addBill(formData).unwrap();
      setSuccess("Bill created successfully!");
      setFormData({ hsnSacCode: "", hsnsacname: "" });
    } catch (err) {
      setError(err?.data?.message || "Failed to create bill");
    }
  };

  const handleClear = () => {
    setFormData({
      hsnSacCode: "",
      hsnsacname: "",
    });
  };
  return (
    // Modal Overlay
    <Modal open={isOpen} onClose={onClose} title="Add Bill">
      <form onSubmit={handleSave} className="space-y-4">
        <Input
          label="Bill Number"
          name="billNumber"
          value={formData.billNumber}
          onChange={handleChange}
          required
        />
        <Input
          label="Supplier"
          name="supplier"
          value={formData.supplier}
          onChange={handleChange}
          required
        />
        <Input
          label="Date"
          name="date"
          type="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <Input
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <div className="flex gap-2 justify-end mt-6">
          <Button
            buttonType={"save"}
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            buttonType={"clear"}
            type="button"
            variant="secondary"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            buttonType={"close"}
            type="button"
            variant="danger"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
