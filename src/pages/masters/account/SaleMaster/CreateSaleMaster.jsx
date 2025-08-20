import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreateSaleMasterMutation, useUpdateSaleMasterMutation, useGetSaleMasterByIdQuery } from "../../../../services/saleMasterApi";
import { useGetLedgersQuery } from "../../../../services/ledgerApi";
import {showToast} from "../../../../componets/common/Toast";
import { ArrowLeft, Save, RefreshCw, X } from "lucide-react";
import Button from "../../../../componets/common/Button";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Card from "../../../../componets/common/Card";
import SearchableSelect from "../../../../componets/common/SearchableSelect";

const CreateSaleMaster = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    salesType: "",
    localSalesLedgerId: "",
    centralSalesLedgerId: "",
    igstPercentage: "0.00",
    cgstPercentage: "0.00",
    sgstPercentage: "0.00",
    cessPercentage: "0.00",
    natureOfTransaction: "Sales",
    taxability: "Taxable",
    igstLedgerId: "",
    cgstLedgerId: "",
    sgstLedgerId: "",
    cessLedgerId: "",
    description: "",
    sortOrder: "0",
    isActive: true,
    status: "Active"
  });

  const [createSaleMaster] = useCreateSaleMasterMutation();
  const [updateSaleMaster] = useUpdateSaleMasterMutation();

  const { data: saleMasterData, isLoading: isLoadingSaleMaster } = useGetSaleMasterByIdQuery(id, {
    skip: !isEditMode
  });

  const { data: ledgersData, isLoading: isLoadingLedgers } = useGetLedgersQuery({ 
    limit: 100,
    isActive: true 
  });

  useEffect(() => {
    if (isEditMode && saleMasterData) {
      setFormData({
        salesType: saleMasterData.salesType || "",
        localSalesLedgerId: saleMasterData.localSalesLedgerId || "",
        centralSalesLedgerId: saleMasterData.centralSalesLedgerId || "",
        igstPercentage: saleMasterData.igstPercentage?.toString() || "0.00",
        cgstPercentage: saleMasterData.cgstPercentage?.toString() || "0.00",
        sgstPercentage: saleMasterData.sgstPercentage?.toString() || "0.00",
        cessPercentage: saleMasterData.cessPercentage?.toString() || "0.00",
        natureOfTransaction: saleMasterData.natureOfTransaction || "Sales",
        taxability: saleMasterData.taxability || "Taxable",
        igstLedgerId: saleMasterData.igstLedgerId || "",
        cgstLedgerId: saleMasterData.cgstLedgerId || "",
        sgstLedgerId: saleMasterData.sgstLedgerId || "",
        cessLedgerId: saleMasterData.cessLedgerId || "",
        description: saleMasterData.description || "",
        sortOrder: saleMasterData.sortOrder?.toString() || "0",
        isActive: saleMasterData.isActive ?? true,
        status: saleMasterData.status || "Active"
      });
    }
  }, [isEditMode, saleMasterData]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const submitData = {
        ...formData,
        igstPercentage: parseFloat(formData.igstPercentage),
        cgstPercentage: parseFloat(formData.cgstPercentage),
        sgstPercentage: parseFloat(formData.sgstPercentage),
        cessPercentage: parseFloat(formData.cessPercentage),
        sortOrder: parseInt(formData.sortOrder),
        localSalesLedgerId: parseInt(formData.localSalesLedgerId),
        centralSalesLedgerId: parseInt(formData.centralSalesLedgerId),
        igstLedgerId: parseInt(formData.igstLedgerId),
        cgstLedgerId: parseInt(formData.cgstLedgerId),
        sgstLedgerId: parseInt(formData.sgstLedgerId),
        cessLedgerId: parseInt(formData.cessLedgerId)
      };

      if (isEditMode) {
        await updateSaleMaster({ id, ...submitData }).unwrap();
        showToast("Sale master updated successfully");
      } else {
        await createSaleMaster(submitData).unwrap();
        showToast("Sale master created successfully");
      }
      
      navigate("/master/accounts/sale");
    } catch (error) {
      Toast.error(error?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} sale master`);
    }
  };

  const handleClear = () => {
    setFormData({
      salesType: "",
      localSalesLedgerId: "",
      centralSalesLedgerId: "",
      igstPercentage: "0.00",
      cgstPercentage: "0.00",
      sgstPercentage: "0.00",
      cessPercentage: "0.00",
      natureOfTransaction: "Sales",
      taxability: "Taxable",
      igstLedgerId: "",
      cgstLedgerId: "",
      sgstLedgerId: "",
      cessLedgerId: "",
      description: "",
      sortOrder: "0",
      isActive: true,
      status: "Active"
    });
  };

  const handleClose = () => {
    navigate("/master/accounts/sale");
  };

  const ledgerOptions = ledgersData?.data?.map(ledger => ({
    value: ledger.id,
    label: ledger.ledgerName
  })) || [];

  if (isLoadingSaleMaster) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <Button
              variant="secondary"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {isEditMode ? "Edit Sale Master" : "Create Sale Master"}
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sales Type */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Sales Type</h3>
              <Input
                label="Sales Type *"
                value={formData.salesType}
                onChange={(e) => handleInputChange("salesType", e.target.value)}
                placeholder="Enter sales type (e.g., GST Sale - 12%)"
                required
              />
            </div>
          </Card>

          {/* Sales Ledger */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Sales Ledger</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchableSelect
                  label="Local *"
                  value={formData.localSalesLedgerId}
                  onChange={(value) => handleInputChange("localSalesLedgerId", value)}
                  options={ledgerOptions}
                  placeholder="Select local sales ledger"
                  isLoading={isLoadingLedgers}
                  required
                />
                <SearchableSelect
                  label="Central *"
                  value={formData.centralSalesLedgerId}
                  onChange={(value) => handleInputChange("centralSalesLedgerId", value)}
                  options={ledgerOptions}
                  placeholder="Select central sales ledger"
                  isLoading={isLoadingLedgers}
                  required
                />
              </div>
            </div>
          </Card>

          {/* Tax Type */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Tax Type</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Input
                  label="IGST % *"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.igstPercentage}
                  onChange={(e) => handleInputChange("igstPercentage", e.target.value)}
                  required
                />
                <Input
                  label="CGST % *"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.cgstPercentage}
                  onChange={(e) => handleInputChange("cgstPercentage", e.target.value)}
                  required
                />
                <Input
                  label="SGST % *"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.sgstPercentage}
                  onChange={(e) => handleInputChange("sgstPercentage", e.target.value)}
                  required
                />
                <Input
                  label="CESS % *"
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  value={formData.cessPercentage}
                  onChange={(e) => handleInputChange("cessPercentage", e.target.value)}
                  required
                />
              </div>
            </div>
          </Card>



          {/* Taxability */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Taxability *</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="taxability"
                    value="Taxable"
                    checked={formData.taxability === "Taxable"}
                    onChange={(e) => handleInputChange("taxability", e.target.value)}
                    className="text-blue-600"
                  />
                  <span>Taxable</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="taxability"
                    value="Exempted"
                    checked={formData.taxability === "Exempted"}
                    onChange={(e) => handleInputChange("taxability", e.target.value)}
                    className="text-blue-600"
                  />
                  <span>Exempted</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="taxability"
                    value="Nil Rated"
                    checked={formData.taxability === "Nil Rated"}
                    onChange={(e) => handleInputChange("taxability", e.target.value)}
                    className="text-blue-600"
                  />
                  <span>Nil Rated</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="taxability"
                    value="Zero Rated"
                    checked={formData.taxability === "Zero Rated"}
                    onChange={(e) => handleInputChange("taxability", e.target.value)}
                    className="text-blue-600"
                  />
                  <span>Zero Rated</span>
                </label>
              </div>
            </div>
          </Card>


          {/* Additional Fields */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Enter description"
                />
                <Input
                  label="Sort Order"
                  type="number"
                  value={formData.sortOrder}
                  onChange={(e) => handleInputChange("sortOrder", e.target.value)}
                  placeholder="Enter sort order"
                />
              </div>
            </div>
          </Card>

          {/* Footer Buttons */}
          <div className="flex justify-end gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClear}
              className="flex items-center gap-2"
            >
              <RefreshCw size={16} />
              F9 Clear
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClose}
              className="flex items-center gap-2"
            >
              <X size={16} />
              Esc Close
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="flex items-center gap-2"
            >
              <Save size={16} />
              F10 Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateSaleMaster; 