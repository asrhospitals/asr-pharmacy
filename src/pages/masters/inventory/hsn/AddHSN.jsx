import React, { useState, useEffect } from "react";
import { useAddHSNMutation } from "../../../../services/hsnApi";
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import { TextField } from "../../../../componets/common/Fields";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../componets/common/Toast";

export default function CreateHsnSacForm({
  isOpen = true,
  onClose = () => {},
  initialData = null,
  onSave,
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addHSN, { isLoading }] = useAddHSNMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      hsnSacCode: "",
      hsnsacname: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ hsnSacCode: "", hsnsacname: "" });
    }
  }, [initialData, isOpen, reset]);

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    try {
      if (onSave) {
        await onSave(data);
        setSuccess("HSN saved successfully!");
        showToast("HSN saved successfully!", { type: "success" });
        reset();
        onClose();
      } else {
        await addHSN(data).unwrap();
        setSuccess("HSN created successfully!");
        showToast("HSN created successfully!", { type: "success" });
        reset();
        onClose();
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to save HSN");
      showToast(err?.data?.message || "Failed to save HSN", { type: "error" });
    }
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create HSN/SAC">
      <form
        onSubmit={handleSubmit(handleSave)}
        className="space-y-3 sm:space-y-4 px-1 sm:px-2"
      >
        <TextField
          label="HSN/SAC Code"
          name="hsnSacCode"
          register={register}
          errors={errors}
          required
          message="HSN/SAC Code is required"
          noStyle={true}
          noHeight={true}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            HSN/SAC name
          </label>
          <Input type="text" {...register("hsnsacname")} className="w-full" />
        </div>
        {error && (
          <div className="text-red-500 mb-4 text-xs sm:text-sm">{error}</div>
        )}
        {success && (
          <div className="text-green-500 mb-4 text-xs sm:text-sm">
            {success}
          </div>
        )}
        <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-6">
          <Button
            type="submit"
            variant="primary"
            buttonType={"save"}
            disabled={isLoading}
            className="w-full sm:w-auto"
          >
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            buttonType={"clear"}
            onClick={handleClear}
            className="w-full sm:w-auto"
          >
            Clear
          </Button>
          <Button
            type="button"
            variant="danger"
            buttonType={"close"}
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
