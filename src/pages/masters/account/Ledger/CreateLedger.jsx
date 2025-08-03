import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../componets/common/Button";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../componets/common/Toast";
import { useGetGroupsQuery } from "../../../../services/groupApi";
import {
  useGetLedgerByIdQuery,
  useCreateLedgerMutation,
  useUpdateLedgerMutation,
  useGetLedgersQuery,
} from "../../../../services/ledgerApi";
import { flattenGroups } from "../../../../utils/groupUtils";


import GeneralInfoForm from "./components/GeneralInfoForm";
import SimpleGeneralInfoForm from "./components/SimpleGeneralInfoForm";
import BalanceForm from "./components/BalanceForm";
import TabbedFormSection from "./components/TabbedFormSection";
import { getFormComponents, getVisibleTabs } from "./components/FormFactory";
import Input from "../../../../componets/common/Input";
import SearchableSelect from "../../../../componets/common/SearchableSelect";
import { useLedgerPermissions } from "../../../../hooks/useLedgerPermissions";
import { useDefaultLedgerPermissions } from "../../../../hooks/useDefaultLedgerPermissions";
import DefaultLedgerIndicator from "../../../../componets/common/DefaultLedgerIndicator";
import FieldPermissionWarning from "../../../../componets/common/FieldPermissionWarning";

const CreateLedger = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEditMode = !!id;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
    control,
  } = useForm({
    defaultValues: {
      partyName: "",
      acgroup: "",
      parentLedger: "",
      balanceType: "Debit",
      openingBalance: 0,
      description: "",
      isActive: true,

      accountNo: "",
      rtgsNo: "",
      ifscCode: "",
      branch: "",
      micrNo: "",
      phoneNo: "",

      mailTo: "",
      address: "",
      country: "India",
      pincode: "",
      state: "Delhi",
      city: "",
      currency: "",

      ledgerType: "Unregistered",
      panNo: "",

      contactPerson: "",
      email: "",
      mobile: "",

      upiId: "",

      licenseNo: "",
      licenseType: "",
      expiryDate: "",

      cashType: "",
      cashLocation: "",
      cashierName: "",
      maxLimit: "",

      creditLimit: "",
      paymentTerms: "",
      partyType: "",
      tdsApplicable: "no",
      tdsRate: "",
      gstRegistrationType: "unregistered",

      assetType: "",
      purchaseDate: "",
      depreciationRate: "",

      investmentType: "",
      investmentDate: "",
      maturityDate: "",
      interestRate: "",

      loanType: "",
      lenderName: "",
      loanAmount: "",
      loanStartDate: "",
      loanEndDate: "",

      expenseCategory: "",
      expenseType: "",
      budgetAmount: "",
      expenseFrequency: "",

      incomeCategory: "",
      incomeType: "",
      expectedAmount: "",
      incomeFrequency: "",
      taxApplicable: "no",
    },
  });

  const watchedGroup = watch("acgroup");

  const [selectedGroup, setSelectedGroup] = useState("");

  const { data: hierarchicalGroups = [], isLoading: groupsLoading } =
    useGetGroupsQuery({ limit: 100 });

  const flattenedGroups = flattenGroups(hierarchicalGroups);

  const groupOptions = flattenedGroups.map((group) => ({
    label: group.originalGroupName,
    value: group.id,
  }));

  const { data: ledgerData, isLoading: ledgerLoading } = useGetLedgerByIdQuery(
    id,
    {
      skip: !isEditMode,
    }
  );


  const defaultLedgerPermissions = useDefaultLedgerPermissions(ledgerData);
  const { data: parentLedgersData = [], isLoading: parentLedgersLoading } =
    useGetLedgersQuery(
      { groupId: watchedGroup, limit: 100 },
      { skip: !watchedGroup }
    );
  const [createLedger, { isLoading: createLoading }] =
    useCreateLedgerMutation();
  const [updateLedger, { isLoading: updateLoading }] =
    useUpdateLedgerMutation();

  useEffect(() => {
    if (ledgerData && isEditMode) {
      reset({
        partyName: ledgerData.partyName || "",
        acgroup: ledgerData.acgroup || "",
        parentLedger: ledgerData.parentLedger || "",
        balanceType: ledgerData.balanceType || "Debit",
        openingBalance: ledgerData.openingBalance || 0,
        description: ledgerData.description || "",
        isActive: ledgerData.isActive !== false,

        accountNo: ledgerData.accountNo || "",
        rtgsNo: ledgerData.rtgsNo || "",
        ifscCode: ledgerData.ifscCode || "",
        branch: ledgerData.branch || "",
        micrNo: ledgerData.micrNo || "",
        phoneNo: ledgerData.phoneNo || "",

        mailTo: ledgerData.mailTo || "",
        address: ledgerData.address || "",
        country: ledgerData.country || "India",
        pincode: ledgerData.pincode || "",
        state: ledgerData.state || "Delhi",
        city: ledgerData.city || "",
        currency: ledgerData.currency || "",

        ledgerType: ledgerData.ledgerType || "Unregistered",
        panNo: ledgerData.panNo || "",

        contactPerson: ledgerData.contactPerson || "",
        email: ledgerData.email || "",
        mobile: ledgerData.mobile || "",

        upiId: ledgerData.upiId || "",

        licenseNo: ledgerData.licenseNo || "",
        licenseType: ledgerData.licenseType || "",
        expiryDate: ledgerData.expiryDate || "",

        cashType: ledgerData.cashType || "",
        cashLocation: ledgerData.cashLocation || "",
        cashierName: ledgerData.cashierName || "",
        maxLimit: ledgerData.maxLimit || "",

        creditLimit: ledgerData.creditLimit || "",
        paymentTerms: ledgerData.paymentTerms || "",
        partyType: ledgerData.partyType || "",
        tdsApplicable: ledgerData.tdsApplicable || "no",
        tdsRate: ledgerData.tdsRate || "",
        gstRegistrationType: ledgerData.gstRegistrationType || "unregistered",

        assetType: ledgerData.assetType || "",
        purchaseDate: ledgerData.purchaseDate || "",
        depreciationRate: ledgerData.depreciationRate || "",

        investmentType: ledgerData.investmentType || "",
        investmentDate: ledgerData.investmentDate || "",
        maturityDate: ledgerData.maturityDate || "",
        interestRate: ledgerData.interestRate || "",

        loanType: ledgerData.loanType || "",
        lenderName: ledgerData.lenderName || "",
        loanAmount: ledgerData.loanAmount || "",
        loanStartDate: ledgerData.loanStartDate || "",
        loanEndDate: ledgerData.loanEndDate || "",

        expenseCategory: ledgerData.expenseCategory || "",
        expenseType: ledgerData.expenseType || "",
        budgetAmount: ledgerData.budgetAmount || "",
        expenseFrequency: ledgerData.expenseFrequency || "",

        incomeCategory: ledgerData.incomeCategory || "",
        incomeType: ledgerData.incomeType || "",
        expectedAmount: ledgerData.expectedAmount || "",
        incomeFrequency: ledgerData.incomeFrequency || "",
        taxApplicable: ledgerData.taxApplicable || "no",
      });

      const selectedGroupData = flattenedGroups.find(
        (group) => group.id === ledgerData.acgroup
      );
      if (selectedGroupData) {
        console.log(selectedGroupData);
        setSelectedGroup(selectedGroupData);
      }
    }
  }, [ledgerData, isEditMode, reset, flattenedGroups]);

  const onSubmit = async (data) => {
    try {
      if (isEditMode) {
        await updateLedger({ id, ...data }).unwrap();
        showToast("Ledger updated successfully", "success");
      } else {
        await createLedger(data).unwrap();
        showToast("Ledger created successfully", "success");
      }
      navigate("/master/account/ledger");
    } catch (error) {
      const errorMessage =
        error?.data?.message ||
        (isEditMode ? "Failed to update ledger" : "Failed to create ledger");
      showToast(errorMessage, "error");
      console.error("Form submission error:", error);
    }
  };

  const handleClear = () => {
    reset({
      partyName: "",
      acgroup: "",
      parentLedger: "",
      balanceType: "Debit",
      openingBalance: 0,
      description: "",
      isActive: true,

      accountNo: "",
      rtgsNo: "",
      ifscCode: "",
      branch: "",
      micrNo: "",
      phoneNo: "",

      mailTo: "",
      address: "",
      country: "India",
      pincode: "",
      state: "Delhi",
      city: "",
      currency: "",

      ledgerType: "Unregistered",
      panNo: "",

      contactPerson: "",
      email: "",
      mobile: "",

      upiId: "",

      licenseNo: "",
      licenseType: "",
      expiryDate: "",

      cashType: "",
      cashLocation: "",
      cashierName: "",
      maxLimit: "",

      creditLimit: "",
      paymentTerms: "",
      partyType: "",
      tdsApplicable: "no",
      tdsRate: "",
      gstRegistrationType: "unregistered",

      assetType: "",
      purchaseDate: "",
      depreciationRate: "",

      investmentType: "",
      investmentDate: "",
      maturityDate: "",
      interestRate: "",

      loanType: "",
      lenderName: "",
      loanAmount: "",
      loanStartDate: "",
      loanEndDate: "",

      expenseCategory: "",
      expenseType: "",
      budgetAmount: "",
      expenseFrequency: "",

      incomeCategory: "",
      incomeType: "",
      expectedAmount: "",
      incomeFrequency: "",
      taxApplicable: "no",
    });
    setSelectedGroup("");
  };

  const handleBack = () => {
    navigate("/master/account/ledger");
  };

  const isLoading =
    groupsLoading ||
    ledgerLoading ||
    parentLedgersLoading ||
    createLoading ||
    updateLoading;

  const { rightColumnForms } = getFormComponents(selectedGroup);
  const visibleTabs = getVisibleTabs(selectedGroup);
  

  const { 
    canCreate, 
    canEdit, 
    isReadOnly, 
    showCreateButton, 
    showEditButton,
    groupName 
  } = useLedgerPermissions(selectedGroup);

  return (
    <div className="flex w-full justify-start items-start min-h-[calc(100vh-100px)] bg-gray-100 p-2">
      <div className="bg-white rounded-lg shadow-md p-6 w-full max-w-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">
              {isEditMode ? "Edit Ledger" : "Create Ledger"}
            </h1>
            {isEditMode && defaultLedgerPermissions.isDefaultLedger && (
              <DefaultLedgerIndicator ledger={ledgerData} />
            )}
          </div>
          <Button type="button" variant="secondary" onClick={handleBack}>
            ← Back
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {!selectedGroup || !selectedGroup.value ? (

            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 mb-4">General Info</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Party Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="text"
                      className={`w-full ${
                        errors.partyName ? "border-red-500" : ""
                      }`}
                      placeholder="Enter party name"
                      {...register("partyName", {
                        required: "Party name is required",
                        minLength: {
                          value: 2,
                          message: "Party name must be at least 2 characters",
                        },
                      })}
                    />
                    {errors.partyName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.partyName.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Account Group <span className="text-red-500">*</span>
                    </label>
                    <SearchableSelect
                      options={groupOptions}
                      value={selectedGroup?.value}
                      onChange={(opt) => {
                        setSelectedGroup(opt);
                        setValue("acgroup", opt?.value || "", { shouldValidate: true });
                      }}
                      placeholder="Search here.."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Parent Ledger
                    </label>
                    <SearchableSelect
                      options={parentLedgersData.map((ledger) => ({
                        label: ledger.ledgerName,
                        value: ledger.id,
                      }))}
                      value={watch("parentLedger")}
                      onChange={(opt) => setValue("parentLedger", opt?.value || "")}
                      placeholder="Search here.."
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              <div className="space-y-6">
                
                {selectedGroup.label?.toLowerCase().includes("cash-in-hand") || 
                 selectedGroup.label?.toLowerCase().includes("cash in hand") ? (
                  <SimpleGeneralInfoForm
                    register={register}
                    errors={errors}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    setValue={setValue}
                    watch={watch}
                    groupOptions={groupOptions}
                    parentLedgersData={parentLedgersData}
                  />
                ) : (
                  <GeneralInfoForm
                    register={register}
                    errors={errors}
                    selectedGroup={selectedGroup}
                    setSelectedGroup={setSelectedGroup}
                    setValue={setValue}
                    watch={watch}
                    groupOptions={groupOptions}
                    parentLedgersData={parentLedgersData}
                  />
                )}

                
                {!selectedGroup.label?.toLowerCase().includes("cash-in-hand") && 
                 !selectedGroup.label?.toLowerCase().includes("cash in hand") && (
                  <TabbedFormSection
                    register={register}
                    selectedGroup={selectedGroup}
                    visibleTabs={visibleTabs}
                  />
                )}
              </div>

              <div className="space-y-6">
                <BalanceForm register={register} errors={errors} selectedGroup={selectedGroup} ledgerData={ledgerData} />

                {rightColumnForms.map((formComponent, index) => (
                  <div key={index}>
                    {React.cloneElement(formComponent, {
                      register,
                      errors,
                      selectedGroup,
                    })}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-3">
              {selectedGroup && selectedGroup.value && 
               !selectedGroup.label?.toLowerCase().includes("cash-in-hand") && 
               !selectedGroup.label?.toLowerCase().includes("cash in hand") && (
                <Button
                  type="button"
                  variant="success"
                  onClick={() => {

                    showToast("GST verification feature coming soon", "info");
                  }}
                >
                  GST Verification
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleClear}
                disabled={isLoading}
              >
                F9 Clear
              </Button>
              <Button 
                type="submit" 
                loading={isLoading} 
                disabled={isLoading || isReadOnly()}
              >
                F10 Save
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                disabled={isLoading}
              >
                Esc Close
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLedger;
