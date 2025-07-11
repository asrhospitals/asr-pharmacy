import { useState } from "react";
import { useAddCompanyMutation } from '../../../../services/companyApi';
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";

export default function CreateCompanyModal({ isOpen = true, onClose = () => {} }) {
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
  const [addCompany, { isLoading }] = useAddCompanyMutation();

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
      await addCompany(formData).unwrap();
      setSuccess("Company created successfully!");
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
    } catch (err) {
      setError(err?.data?.message || 'Failed to create company');
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
    <Modal open={isOpen} onClose={onClose} title="Create Company">
      <form onSubmit={handleSave}>
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Company Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="companyname"
              value={formData.companyname}
              onChange={handleChange}
              className="bg-yellow-100"
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="mb-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Input
                type="checkbox"
                name="showMoreOptions"
                checked={showMoreOptions}
                onChange={e => setShowMoreOptions(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              More Option
            </label>
          </div>
          {showMoreOptions && (
            <>
              <hr className="mb-6" />
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Print Remark</label>
                <Input type="text" name="printremark" value={formData.printremark} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <Select name="status" value={formData.status} onChange={handleChange}>
                    <option value="Continue">Continue</option>
                    <option value="Discontinued">Discontinued</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Reorder Preferences</label>
                  <Input type="number" name="recorderprefrence" value={formData.recorderprefrence} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Store Room No.</label>
                  <Input type="number" name="storeroom" value={formData.storeroom} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Prohibit</label>
                  <Select name="prohibited" value={formData.prohibited} onChange={handleChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Receive Upto</label>
                  <Input type="number" name="expiredays" value={formData.expiredays} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Dump Days</label>
                  <Input type="number" name="dumpdays" value={formData.dumpdays} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Margin</label>
                  <Input type="number" name="minimummargin" value={formData.minimummargin} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Print Index</label>
                  <Input type="number" name="invoiceprintindex" value={formData.invoiceprintindex} onChange={handleChange} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Recorder Formula</label>
                  <Input type="number" name="recorderformula" value={formData.recorderformula} onChange={handleChange} />
                </div>
              </div>
            </>
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
