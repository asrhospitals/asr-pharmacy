import React, { useState } from "react";
import Header from "../../../../componets/common/Header";
import axios from "axios";
import Footer from "../../../../componets/common/Footer";

export default function CreateUnitForm({ isOpen = true, onClose = () => {} }) {
  const [formData, setFormData] = useState({
    unitName: "",
    uqc: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
      const response = await axios.post(
        "http://localhost:3000/pharmacy/master/inventory/unit/v1/add-unit",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201)
        return setSuccess("Store created successfully!");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const handleClear = () => {
    setFormData({
      unitName: "",
      uqc: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-grey backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        <Header title="Create Unit" />

        {/* Form Content */}
        <div className="p-8 space-y-6">
          {/* Unit Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Unit Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="unitName"
              value={formData.unitName}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-yellow-100 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>

          {/* UQC */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              UQC
            </label>
            <input
              type="text"
              name="uqc"
              value={formData.uqc}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {/* Footer */}
        <Footer onSave={handleSave} onClear={handleClear} onClose={onClose} />
      </div>
    </div>
  );
}
