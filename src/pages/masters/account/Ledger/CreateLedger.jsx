import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../../componets/common/Button";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../componets/common/Toast";
import { useGetGroupsQuery } from "../../../../services/groupApi";
import { 
  useGetLedgerByIdQuery, 
  useCreateLedgerMutation, 
  useUpdateLedgerMutation, 
  useGetLedgersQuery
} from "../../../../services/ledgerApi";

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
  } = useForm({
    defaultValues: {
      ledgerName: "",
      acgroup: "",
      parentLedger: "",
      balanceType: "Debit",
      openingBalance: 0,
      description: "",
      isActive: true,
    },
  });

  const watchedGroup = watch("acgroup");

  // RTK Query hooks
  const { data: groups = [], isLoading: groupsLoading } = useGetGroupsQuery({ limit: 100 });
  const { data: ledgerData, isLoading: ledgerLoading } = useGetLedgerByIdQuery(id, {
    skip: !isEditMode,
  });
  const { data: parentLedgersData = [], isLoading: parentLedgersLoading } = useGetLedgersQuery(
    { groupId: watchedGroup, limit: 100 },
    { skip: !watchedGroup }
  );
  const [createLedger, { isLoading: createLoading }] = useCreateLedgerMutation();
  const [updateLedger, { isLoading: updateLoading }] = useUpdateLedgerMutation();

  // Load ledger data for editing
  useEffect(() => {
    if (ledgerData && isEditMode) {
      reset({
        ledgerName: ledgerData.ledgerName || "",
        acgroup: ledgerData.acgroup || "",
        parentLedger: ledgerData.parentLedger || "",
        balanceType: ledgerData.balanceType || "Debit",
        openingBalance: ledgerData.openingBalance || 0,
        description: ledgerData.description || "",
        isActive: ledgerData.isActive !== false,
      });
    }
  }, [ledgerData, isEditMode, reset]);

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
      ledgerName: "",
      acgroup: "",
      parentLedger: "",
      balanceType: "Debit",
      openingBalance: 0,
      description: "",
      isActive: true,
    });
  };

  const handleBack = () => {
    navigate("/master/account/ledger");
  };

  const isLoading = groupsLoading || ledgerLoading || parentLedgersLoading || createLoading || updateLoading;

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-100px)] bg-gray-100 py-2">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">
            {isEditMode ? "Edit Ledger" : "Create Ledger"}
          </h1>
          <Button type="button" variant="secondary" onClick={handleBack}>
            ← Back
          </Button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ledger Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ledger Name <span className="text-red-500">*</span>
                </label>
                <Input
                  type="text"
                  className={`w-full ${errors.ledgerName ? "border-red-500" : ""}`}
                  placeholder="Enter ledger name"
                  {...register("ledgerName", {
                    required: "Ledger name is required",
                    minLength: {
                      value: 2,
                      message: "Ledger name must be at least 2 characters",
                    },
                  })}
                />
                {errors.ledgerName && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.ledgerName.message}
                  </p>
                )}
              </div>

              {/* Account Group */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Group <span className="text-red-500">*</span>
                </label>
                <Select
                  className={`w-full ${errors.acgroup ? "border-red-500" : ""}`}
                  {...register("acgroup", {
                    required: "Account group is required",
                  })}
                >
                  <option value="">Select account group</option>
                  {groups.map((group) => (
                    <option key={group.id} value={group.id}>
                      {group.groupName}
                    </option>
                  ))}
                </Select>
                {errors.acgroup && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.acgroup.message}
                  </p>
                )}
              </div>

              {/* Parent Ledger */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Parent Ledger
                </label>
                <Select className="w-full" {...register("parentLedger")}>
                  <option value="">Select parent ledger (optional)</option>
                  {parentLedgersData.map((ledger) => (
                    <option key={ledger.id} value={ledger.id}>
                      {ledger.ledgerName}
                    </option>
                  ))}
                </Select>
              </div>

              {/* Balance Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Balance Type <span className="text-red-500">*</span>
                </label>
                <Select
                  className={`w-full ${errors.balanceType ? "border-red-500" : ""}`}
                  {...register("balanceType", {
                    required: "Balance type is required",
                  })}
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </Select>
                {errors.balanceType && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.balanceType.message}
                  </p>
                )}
              </div>

              {/* Opening Balance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Opening Balance
                </label>
                <Input
                  type="number"
                  step="0.01"
                  className="w-full"
                  placeholder="0.00"
                  {...register("openingBalance", {
                    min: {
                      value: 0,
                      message: "Opening balance cannot be negative",
                    },
                  })}
                />
                {errors.openingBalance && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.openingBalance.message}
                  </p>
                )}
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status
                </label>
                <Select className="w-full" {...register("isActive")}>
                  <option value={true}>Active</option>
                  <option value={false}>Inactive</option>
                </Select>
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows="3"
                placeholder="Enter description (optional)"
                {...register("description")}
              />
            </div>
          </div>

          {/* Footer Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={handleClear}
              disabled={isLoading}
            >
              Clear
            </Button>
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isEditMode ? "Update" : "Create"} Ledger
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateLedger;
