import { useState } from "react";
import { useAddSaltMutation } from '../../../../services/saltApi';
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";

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
  const [addSalt, { isLoading }] = useAddSaltMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await addSalt(formData).unwrap();
      setSuccess("Salt created successfully!");
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
    } catch (err) {
      setError(err?.data?.message || 'Failed to create salt');
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
    <Modal open={isOpen} onClose={onClose} title="Create Salt">
      <form onSubmit={handleSave}>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salt Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="saltname"
              value={formData.saltname}
              onChange={handleChange}
              className="bg-yellow-100"
              required
            />
          </div>
          <div className="lg:col-span-2 space-y-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Input
                type="checkbox"
                name="showMoreOptions"
                checked={showMoreOptions}
                onChange={e => setShowMoreOptions(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              More info
            </label>
          </div>
          {showMoreOptions && (
            <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-4">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Indication</label>
                  <Input type="text" name="indication" value={formData.indication} onChange={handleChange} />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dosage</label>
                  <Input type="text" name="dosage" value={formData.dosage} onChange={handleChange} />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Side Effects</label>
                  <Input type="text" name="sideeffects" value={formData.sideeffects} onChange={handleChange} />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Precautions</label>
                  <Input type="text" name="specialprecautions" value={formData.specialprecautions} onChange={handleChange} />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Drug Interactions</label>
                  <Input type="text" name="druginteractions" value={formData.druginteractions} onChange={handleChange} />
                </div>
              </div>
              <div className="space-y-4">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Note</label>
                  <Input type="text" name="note" value={formData.note} onChange={handleChange} />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">TB Item</label>
                  <Select name="tbitem" value={formData.tbitem} onChange={handleChange}>
                    <option value="Normal">Normal</option>
                    <option value="Special">Special</option>
                  </Select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <Select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Continue">Continue</option>
                    <option value="Discontinue">Discontinue</option>
                  </Select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prohabit</label>
                  <Select name="prohabit" value={formData.prohabit} onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Narcotic</label>
                  <Select name="narcotic" value={formData.narcotic} onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule H</label>
                  <Select name="scheduleh" value={formData.scheduleh} onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Select>
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Schedule H1</label>
                  <Select name="scheduleh1" value={formData.scheduleh1} onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Select>
                </div>
              </div>
            </div>
          )}
          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}
          <div className="flex gap-2 mt-6">
            <Button type="submit" variant="primary" disabled={isLoading}>Save</Button>
            <Button type="button" variant="secondary" onClick={handleClear}>Clear</Button>
            <Button type="button" variant="danger" onClick={onClose}>Close</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
