import axios from "axios";
import { useState } from "react";
import Footer from "../../../../componets/common/Footer";
import Header from "../../../../componets/common/Header"

export default function CreateCompanyModal({
  isOpen = true,
  onClose = () => {},
}) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    companyname: "",
    printremark: "Sample remark for printing",
    status: "Continue",
    prohibited: "No",
    invoiceprintindex: 1,
    recorderformula: 0.0,
    recorderprefrence: 1,
    expiredays: 90,
    dumpdays: 60,
    minimummargin: 0.0,
    storeroom: 1,
  });

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
        "http://localhost:3000/pharmacy/master/inventory/company/v1/add-company",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201)
        return setSuccess("Company created successfully!");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const handleClear = () => {
    setFormData({
      companyname: "",
      printremark: "Sample remark for printing",
      status: "Continue",
      prohibited: "No",
      invoiceprintindex: 1,
      recorderformula: 0.0,
      recorderprefrence: 1,
      expiredays: 90,
      dumpdays: 60,
      minimummargin: 0.0,
      storeroom: 1,
    });
  };

  return (
    <div className="fixed inset-0 bg-grey  backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <Header
        title="Create Company"
        />


        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Company Name - Always visible */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyname"
              value={formData.companyname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-yellow-100"
              placeholder="Enter company name"
              required
            />
          </div>

          {/* More Option Checkbox */}
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showMoreOptions}
                onChange={(e) => setShowMoreOptions(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              More Option
            </label>
          </div>

          {/* Additional Fields - Only visible when More Option is checked */}
          {showMoreOptions && (
            <>
              <hr className="mb-6" />

              {/* Print Remark */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Print Remark
                </label>
                <input
                  type="text"
                  value={formData.printremark}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* First Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Continue">Continue</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reorder Preferences
                  </label>
                  <input
                    type="number"
                    value={formData.recorderprefrence}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Store Room No.
                  </label>
                  <input
                    type="number"
                    value={formData.storeroom}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prohibit
                  </label>
                  <select
                    value={formData.prohibited}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Receive Upto
                  </label>
                  <input
                    type="number"
                    value={formData.expiredays}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dump Days
                  </label>
                  <input
                    type="number"
                    value={formData.dumpdays}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Third Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Invoice Printing Index
                  </label>
                  <input
                    type="number"
                    value={formData.invoiceprintindex}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Margin
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                      ₹
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.minimummargin}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Fourth Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reorder Formula
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                      ₹
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.recorderformula}
                      onChange={handleChange}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {/* Footer */}
        <Footer onClear={handleClear} onSave={handleSave} onClose={onClose} />
      </div>
    </div>
  );
}
