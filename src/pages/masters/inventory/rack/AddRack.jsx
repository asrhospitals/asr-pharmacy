import axios from "axios";
import { useState } from "react";
import DefaultFooter from "../../../../componets/common/Footer";

export default function AddRack({ isOpen = true, onClose = () => {} }) {
  const [formData, setFormData] = useState({
    storename: "",
    rackname: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        "http://localhost:3000/pharmacy/master/inventory/rack/v1/add-rack",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201)
        return setSuccess("Rack created successfully!");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-grey  backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-gray-200 px-6 py-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Create Rack</h2>
        </div>

        {/* Modal Content - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex">
            {/* Main Form */}
            <div className="col-span-2 mb-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Store Name
              </label>
              <div className="flex gap-3">
                <input
                  type="text"
                  name="storename"
                  value={formData.storename}
                  onChange={handleChange}
                  className="flex-1 px-2 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-yellow-50 transition-colors duration-200"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rack Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="rackname"
                  value={formData.rackname}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                  required
                />
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            {success && <div className="text-green-500 mb-4">{success}</div>}
          </div>
        </div>

        {/* Footer */}
        <DefaultFooter onSave={handleSubmit} onClose={onClose} />
      </div>
    </div>
  );
}
