import React, { useState } from "react";
import Header from "../../../../componets/common/Header";
import Footer from "../../../../componets/common/Footer";
import axios from "axios";

export default function CreateHsnSacForm({
  isOpen = true,
  onClose = () => {},
}) {
  const [formData, setFormData] = useState({
    hsnSacCode: "",
    hsnsacname: "",
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
        "http://localhost:3000/pharmacy/master/inventory/hsn/v1/add-hsn",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201)
        return setSuccess("HSN created successfully!");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const handleClear = () => {
    setFormData({
    hsnSacCode: "",
    hsnsacname: "",
    });
  };

  return (
    <div className="fixed inset-0 bg-grey backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[50vh] flex flex-col">
        {/* Header */}
        <Header title="Create HSN/SAC" />

        {/* Form Content */}
        <div className="p-6 space-y-4">
          {/* HSN/SAC Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HSN/SAC Code <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="hsnSacCode"
              value={formData.hsnSacCode}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-yellow-100 border border-yellow-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            />
          </div>

          {/* HSN Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              HSN/SAC name
            </label>
            <input
              type="text"
              name="hsnsacname"
              value={formData.hsnsacname}
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
