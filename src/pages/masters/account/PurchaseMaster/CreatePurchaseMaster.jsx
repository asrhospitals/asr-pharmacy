import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCreatePurchaseMasterMutation, useUpdatePurchaseMasterMutation, useGetPurchaseMasterByIdQuery } from "../../../../services/purchaseMasterApi";
import { useGetLedgersQuery } from "../../../../services/ledgerApi";
import {showToast} from "../../../../componets/common/Toast";
import { ArrowLeft, Save, RefreshCw, X } from "lucide-react";
import Button from "../../../../componets/common/Button";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Card from "../../../../componets/common/Card";
import SearchableSelect from "../../../../componets/common/SearchableSelect";

const CreatePurchaseMaster = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    purchaseType: "",
    localPurchaseLedgerId: "",
    centralPurchaseLedgerId: "",
    igstPercentage: "0.00",
    cgstPercentage: "0.00",
    sgstPercentage: "0.00",
    cessPercentage: "0.00",
    natureOfTransaction: "Purchase",
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

  const [createPurchaseMaster] = useCreatePurchaseMasterMutation();
  const [updatePurchaseMaster] = useUpdatePurchaseMasterMutation();

  const { data: purchaseMasterData, isLoading: isLoadingPurchaseMaster } = useGetPurchaseMasterByIdQuery(id, {
    skip: !isEditMode
  });

  const { data: ledgersData, isLoading: isLoadingLedgers } = useGetLedgersQuery({ 
    limit: 100,
    isActive: true 
  });

  useEffect(() => {
    if (isEditMode && purchaseMasterData) {
      setFormData({
        purchaseType: purchaseMasterData.purchaseType || "",
        localPurchaseLedgerId: purchaseMasterData.localPurchaseLedgerId || "",
        centralPurchaseLedgerId: purchaseMasterData.centralPurchaseLedgerId || "",
        igstPercentage: purchaseMasterData.igstPercentage?.toString() || "0.00",
        cgstPercentage: purchaseMasterData.cgstPercentage?.toString() || "0.00",
        sgstPercentage: purchaseMasterData.sgstPercentage?.toString() || "0.00",
        cessPercentage: purchaseMasterData.cessPercentage?.toString() || "0.00",
        natureOfTransaction: purchaseMasterData.natureOfTransaction || "Purchase",
        taxability: purchaseMasterData.taxability || "Taxable",
        igstLedgerId: purchaseMasterData.igstLedgerId || "",
        cgstLedgerId: purchaseMasterData.cgstLedgerId || "",
        sgstLedgerId: purchaseMasterData.sgstLedgerId || "",
        cessLedgerId: purchaseMasterData.cessLedgerId || "",
        description: purchaseMasterData.description || "",
        sortOrder: purchaseMasterData.sortOrder?.toString() || "0",
        isActive: purchaseMasterData.isActive ?? true,
        status: purchaseMasterData.status || "Active"
      });
    }
  }, [isEditMode, purchaseMasterData]);

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
        localPurchaseLedgerId: parseInt(formData.localPurchaseLedgerId),
        centralPurchaseLedgerId: parseInt(formData.centralPurchaseLedgerId),
        igstLedgerId: parseInt(formData.igstLedgerId),
        cgstLedgerId: parseInt(formData.cgstLedgerId),
        sgstLedgerId: parseInt(formData.sgstLedgerId),
        cessLedgerId: parseInt(formData.cessLedgerId)
      };

      if (isEditMode) {
        await updatePurchaseMaster({ id, ...submitData }).unwrap();
        showToast("Purchase master updated successfully");
      } else {
        await createPurchaseMaster(submitData).unwrap();
        showToast("Purchase master created successfully");
      }
      
      navigate("/master/accounts/purchase");
    } catch (error) {
      Toast.error(error?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} purchase master`);
    }
  };

  const handleClear = () => {
    setFormData({
      purchaseType: "",
      localPurchaseLedgerId: "",
      centralPurchaseLedgerId: "",
      igstPercentage: "0.00",
      cgstPercentage: "0.00",
      sgstPercentage: "0.00",
      cessPercentage: "0.00",
      natureOfTransaction: "Purchase",
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
    navigate("/master/accounts/purchase");
  };

  const ledgerOptions = ledgersData?.data?.map(ledger => ({
    value: ledger.id,
    label: ledger.ledgerName
  })) || [];

  if (isLoadingPurchaseMaster) {
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
                {isEditMode ? "Edit Purchase Master" : "Create Purchase Master"}
              </h1>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Purchase Type */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Purchase Type</h3>
              <Input
                label="Purchase Type *"
                value={formData.purchaseType}
                onChange={(e) => handleInputChange("purchaseType", e.target.value)}
                placeholder="Enter purchase type (e.g., GST Purchase - 12%)"
                required
              />
            </div>
          </Card>

          {/* Purchase Ledger */}
          <Card>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Purchase Ledger</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SearchableSelect
                  label="Local *"
                  value={formData.localPurchaseLedgerId}
                  onChange={(value) => handleInputChange("localPurchaseLedgerId", value)}
                  options={ledgerOptions}
                  placeholder="Select local purchase ledger"
                  isLoading={isLoadingLedgers}
                  required
                />
                <SearchableSelect
                  label="Central *"
                  value={formData.centralPurchaseLedgerId}
                  onChange={(value) => handleInputChange("centralPurchaseLedgerId", value)}
                  options={ledgerOptions}
                  placeholder="Select central purchase ledger"
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

export default CreatePurchaseMaster; 