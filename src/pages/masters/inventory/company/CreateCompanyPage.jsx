import { useState, useEffect } from "react";
import {
  useAddCompanyMutation,
  useEditCompanyMutation,
  useGetCompaniesQuery,
} from "../../../../services/companyApi";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { Save, Eraser, X } from "lucide-react";
import EmailWebsiteModal from "./EmailWebsiteModal";

export default function CompanyForm({
  isEditMode = false,
  initialData = null,
}) {
  const { id } = useParams();
  console.log("id", id);
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
  const [addCompany, { isLoading: isCreating }] = useAddCompanyMutation();
  const [editCompany, { isLoading: isEditing }] = useEditCompanyMutation();
  const { data: companies } = useGetCompaniesQuery();

  console.log("companies", companies);
  
  const navigate = useNavigate();

  console.log("companies", companies);

  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [emailWebsite, setEmailWebsite] = useState({
    main: "",
    cc: "",
    bcc: "",
    url: "",
  });

  console.log(isEditMode);

  useEffect(() => {
    if (isEditMode && id && companies) {
      const company = companies?.data?.find(
        (company) => parseInt(company.id) === parseInt(id)
      );
      if (company) setFormData(company);
    } else if (initialData) {
      setFormData(initialData);
    }
  }, [isEditMode, id, companies, initialData]);

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
      if (isEditMode) {
        await editCompany({ id, ...formData, ...emailWebsite }).unwrap();
        setSuccess("Company updated successfully!");
      } else {
        await addCompany({ ...formData, ...emailWebsite }).unwrap();
        setSuccess("Company created successfully!");
      }
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
      setEmailWebsite({ main: "", cc: "", bcc: "", url: "" });
      navigate("/master/inventory/companies");
    } catch (err) {
      setError(
        err?.data?.message ||
          (isEditMode ? "Failed to update company" : "Failed to create company")
      );
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
    setEmailWebsite({ main: "", cc: "", bcc: "", url: "" });
  };

  const handleBack = () => {
    navigate("/master/inventory/companies");
  };

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-100px)] bg-gray-100 py-2">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">
            {isEditMode ? "Edit Company" : "Create Company"}
          </h1>
          <Button type="button" variant="secondary" onClick={handleBack}>
            &#8592; Back
          </Button>
        </div>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              name="companyname"
              value={formData.companyname}
              onChange={handleChange}
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="mb-2 w-fit">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Input
                width="w-4"
                type="checkbox"
                name="showMoreOptions"
                checked={showMoreOptions}
                onChange={(e) => setShowMoreOptions(e.target.checked)}
                className="h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="font-semibold text-sm min-w-fit">
                More Option
              </span>
            </label>
          </div>
          <div
            className={`transition-all duration-500 overflow-hidden ${
              showMoreOptions
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            {showMoreOptions && (
              <>
                <hr className="my-4" />
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Print Remark
                  </label>
                  <Input
                    type="text"
                    name="printremark"
                    value={formData.printremark}
                    onChange={handleChange}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Status
                    </label>
                    <Select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                    >
                      <option value="Continue">Continue</option>
                      <option value="Discontinued">Discontinued</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Reorder Preferences
                    </label>
                    <Input
                      type="number"
                      name="recorderprefrence"
                      value={formData.recorderprefrence}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Store Room No.
                    </label>
                    <Input
                      type="number"
                      name="storeroom"
                      value={formData.storeroom}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Prohibit
                    </label>
                    <Select
                      name="prohibited"
                      value={formData.prohibited}
                      onChange={handleChange}
                    >
                      <option value="No">No</option>
                      <option value="Yes">Yes</option>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Invoice Printing Index
                    </label>
                    <Input
                      type="number"
                      name="invoiceprintindex"
                      value={formData.invoiceprintindex}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Expiry Receive Upto
                    </label>
                    <Input
                      type="number"
                      name="expiredays"
                      value={formData.expiredays}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Dump Days
                    </label>
                    <Input
                      type="number"
                      name="dumpdays"
                      value={formData.dumpdays}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Reorder Formula
                    </label>
                    <Input
                      type="number"
                      name="recorderformula"
                      value={formData.recorderformula}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Minimum Margin
                    </label>
                    <Input
                      type="number"
                      name="minimummargin"
                      value={formData.minimummargin}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => setDetailsModalOpen(true)}
                  >
                    + Add Details
                  </Button>
                  <EmailWebsiteModal
                    open={detailsModalOpen}
                    onClose={() => setDetailsModalOpen(false)}
                    onSave={setEmailWebsite}
                    initialData={emailWebsite}
                  />
                </div>
              </>
            )}
          </div>
          
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-500 mb-2">{success}</div>}
          <div className="flex gap-2 mt-2 justify-end">
            <Button
              type="submit"
              variant="primary"
              buttonType={"save"}
              disabled={isCreating || isEditing}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              buttonType={"clear"}
              disabled={isCreating || isEditing}
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="danger"
              buttonType={"close"}
              disabled={isCreating || isEditing}
              onClick={handleBack}
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
