import axios from "axios";
import { useState } from "react";
import Header from "../../../../componets/common/Header";
import Footer from "../../../../componets/common/Footer";

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
        "http://localhost:3000/pharmacy/master/inventory/manu/v1/add-manufacturer",
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
      setError(err.response?.message);
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
    <div className="fixed inset-0 bg-grey  backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        {/* Header */}
       <Header title="Create Manufacturer"/>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* MFR Name - Always visible */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              M.F.R Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="mfrname"
              value={formData.mfrname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-yellow-100"
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
              {/* First Row */}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-yellow-100"
                    required
                  />
                </div>

                {/* State */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Address */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Email Id */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email ID
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Second Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                {/*Prohibit*/}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Prohibit
                  </label>
                  <select
                    value={formData.prohabited}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {/*Status*/}
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
                    <option value="Discontinue">Discontinue</option>
                  </select>
                </div>

                {/*Mobile*/}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-r-0 border-gray-300 rounded-l">
                      +91
                    </span>
                    <input
                      type="number"
                      maxLength={10}
                      name="phone"
                      value={formData.phone}
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
        <Footer onSave={handleSave} onClear={handleClear} onClose={onClose}/>

      </div>
    </div>
  );
}
