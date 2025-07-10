import axios from "axios";
import { useState } from "react";
import Header from "../../../../componets/common/Header";
import Footer from "../../../../componets/common/Footer";

export default function CreateSaltModal({ isOpen = true, onClose = () => {} }) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    saltname: "",
    indication: "",
    dosage: "",
    sideeffects: "",
    specialprecautions: "",
    druginteractions: "",
    note: "",
    tbitem: "Normal",
    status: "Continue",
    prohabit: "No",
    narcotic: "No",
    scheduleh: "No",
    scheduleh1: "No",
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
        "http://localhost:3000/pharmacy/master/inventory/salt/v1/add-salt",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201)
        return setSuccess("Salt created successfully!");
    } catch (err) {
      setError(err.response?.data?.message);
    }
  };

  const handleClear = () => {
    setFormData({
      saltname: "",
      indication: "",
      dosage: "",
      sideeffects: "",
      specialprecautions: "",
      druginteractions: "",
      note: "",
      tbitem: "Normal",
      status: "Continue",
      prohabit: "No",
      narcotic: "No",
      scheduleh: "No",
      scheduleh1: "No",
    });
  };

  return (
    <div className="fixed inset-0 bg-grey backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[95vh] flex flex-col">
        {/* Header */}
        <Header title="Create Salt" />

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {/* Salt Name - Always visible */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salt Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="saltname"
              value={formData.saltname}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-yellow-100"
              required
            />
          </div>

          {/* More Option Checkbox */}
          <div className="lg:col-span-2 space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <input
                type="checkbox"
                checked={showMoreOptions}
                onChange={(e) => setShowMoreOptions(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              More info
            </label>
          </div>

          {/* Additional Fields - Only visible when More Option is checked */}
          {showMoreOptions && (
            <>
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Left Column */}
                  <div className="lg:col-span-2 space-y-4">
                    {/* Print Remark */}

                    {/* Type of Drug Need To add*/}
                    {/* <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Indication
                      </label>
                      <input
                        type="text"
                        name="indication"
                        value={formData.indication}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div> */}




                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Indication
                      </label>
                      <input
                        type="text"
                        name="indication"
                        value={formData.indication}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {/*Dosage*/}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dosage
                      </label>
                      <input
                        type="text"
                        name="dosage"
                        value={formData.dosage}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {/*Side Effects*/}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Side Effects
                      </label>
                      <input
                        type="text"
                        name="sideeffects"
                        value={formData.sideeffects}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {/*Special Precautions*/}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Precautions
                      </label>
                      <input
                        type="text"
                        name="specialprecautions"
                        value={formData.specialprecautions}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {/*Drug Inteactions*/}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Drug Interactions
                      </label>
                      <input
                        type="text"
                        name="druginteractions"
                        value={formData.druginteractions}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                      {/*Contra indication need to be add and require master for the same*/}
{/* 
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Indication
                      </label>
                      <input
                        type="text"
                        name="indication"
                        value={formData.indication}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div> */}






                    {/*Note*/}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Note
                      </label>
                      <input
                        type="text"
                        name="note"
                        value={formData.note}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {/*TB Item*/}
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tb Item
                      </label>
                      <select
                        value={formData.tbitem}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Normal">Normal</option>
                        <option value="Tb">Tb</option>
                        <option value="Tramadol">Tramadol</option>
                      </select>
                    </div>
                  </div>
                  {/*Right*/}
                  <div className="space-y-5">
                    {/* Narcotic Details */}
                    <div className="border border-gray-300 rounded-lg p-2">
                      <h3 className="text-sm font-medium text-gray-700 mb-4">
                        Narcotic Details
                      </h3>

                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-gray-700 w-20">
                            Narcotic
                          </label>
                          <select
                            value={formData.narcotic}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-gray-700 w-20">
                            Schedule H
                          </label>
                          <select
                            value={formData.scheduleh}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                        <div className="flex items-center gap-3">
                          <label className="text-sm font-medium text-gray-700 w-20">
                            Schedule H1
                          </label>
                          <select
                            value={formData.scheduleh1}
                            onChange={handleChange}
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Status */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Status
                      </label>
                      <select
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="Continue">Continue</option>
                        <option value="Discontinue">Discontinue</option>
                        <option value="Pending">Pending</option>
                      </select>
                    </div>

                    {/* Prohibited */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Prohibited
                      </label>
                      <select
                        value={formData.prohabit}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        {/* Footer */}
        <Footer onSave={handleSave} onClear={handleClear} onClose={onClose} />
      </div>
    </div>
  );
}
