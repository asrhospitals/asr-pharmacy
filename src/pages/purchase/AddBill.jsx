import React, { useState } from "react";
import { X, ChevronRight, Calendar } from "lucide-react";
import axios from "axios";
import Footer from "../../componets/common/Footer";
import Header from "../../componets/common/Header";
import TableView from "../../componets/common/Table";
import TableHead from "../../componets/common/TableHead";

export default function AddBillForm({ isOpen = true, onClose = () => {} }) {
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
    // Modal Overlay
    <div className="fixed inset-0 bg-grey  backdrop-blur-xs z-50 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-8xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <Header title="Purchase Bill" />
  
        <div className="flex-1 overflow-y-auto">
          {/* Bill Details */}
          <div className="p-4 border-b">
            <div className="space-y-2">
              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-1 text-sm font-medium text-gray-700">
                  Party Name
                </label>
                <input
                  type="text"
                  name="partyName"
                  value={formData.partyName}
                  onChange={handleChange}
                  className="col-span-6  border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <label className="col-span-1 text-sm font-medium text-gray-700 text-right">
                  Entry Date
                </label>
                <input
                  type="date"
                  name="entryDate"
                  value={
                    formData.entryDate || new Date().toISOString().split("T")[0]
                  }
                  onChange={handleChange}
                  className="col-span-2 px-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
  
              <div className="grid grid-cols-12 gap-4 items-center">
                <label className="col-span-1 text-sm font-medium text-gray-700">
                  Invoice No.
                </label>
                <input
                  type="text"
                  name="invoiceNo"
                  value={formData.invoiceNo}
                  onChange={handleChange}
                  className="col-span-3  border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
                <label className="col-span-1 text-sm font-medium text-gray-700 text-right">
                  Invoice Date
                </label>
                <input
                  type="date"
                  name="invoiceDate"
                  value={
                    formData.invoiceDate ||
                    new Date().toISOString().split("T")[0]
                  }
                  onChange={handleChange}
                  className="col-span-2 px-1 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
              </div>
            </div>
          </div>
  
          {/* Products Table */}
          <div className="flex-1 overflow-x-auto min-h-0">
            <table className="w-full">
              <TableHead />
              <TableView />
              <TableView />
              <TableView />
              <TableView />
              <TableView />
              <TableView />
            </table>
          </div>
  
          {/* Total Products Row */}
          <div className="bg-teal-100 px-4 py-1 border-b">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Total :</span>
              <span className="text-sm font-medium text-gray-700">
                Goods Value: ₹{}
              </span>
            </div>
          </div>
  
          {/* Bottom Section */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              {/* Discount Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 bg-gray-100 px-3 py-2 rounded-t">Discount Info</h3>
                <div className="border border-gray-200 rounded-b p-1 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Item Disc.</span>
                    <span className="text-sm">:</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Item Disc. 1</span>
                    <span className="text-sm">:</span>
                    <span className="text-sm">{}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Item Disc. 2</span>
                    <span className="text-sm">:</span>
                    <span className="text-sm">{}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Scheme Disc. %</span>
                    <span className="text-sm">:</span>
                    <span className="text-sm">{}</span>
                  </div>
                </div>
              </div>
  
              {/* Tax Info */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3 bg-gray-100 px-3 py-2 rounded-t">
                  Tax Info
                </h3>
                <div className="border border-gray-200 rounded-b p-3 h-32">
                  <div className="text-sm text-gray-500">
                    Tax calculations will be displayed here
                  </div>
                </div>
              </div>
  
              {/* Bill Summary */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Bill Disc.</span>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      name="billDisc"
                      value={formData.billDisc}
                      onChange={handleChange}
                      className="w-16 px-2 py-1 text-sm border border-gray-300 rounded focus:ring-1 focus:ring-blue-500 focus:border-transparent outline-none text-center"
                      placeholder="0"
                    />
                    <span className="text-sm">%</span>
                  </div>
                </div>
  
                {/* Final Values */}
                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Gross Amount
                    </span>
                    <span className="text-sm font-medium">₹{}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">
                      Total Discount
                    </span>
                    <span className="text-sm font-medium">₹{}</span>
                  </div>
                  <div className="flex justify-between items-center text-lg font-bold border-t pt-2">
                    <span className="text-gray-800">Invoice Value :</span>
                    <span className="text-gray-800">₹{}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        {/* Error/Success Messages */}
        {error && (
          <div className="mx-6 mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mx-6 mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {success}
          </div>
        )}
  
        {/* Footer */}
        <Footer onSave={handleSave} onClear={handleClear} onClose={onClose} />
      </div>
    </div>
  );
}
