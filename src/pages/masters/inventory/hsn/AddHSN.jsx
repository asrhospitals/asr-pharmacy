import React, { useState, useEffect } from "react";
import { useAddHSNMutation } from "../../../../services/hsnApi";
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import { TextField } from "../../../../componets/common/Fields"
import { useForm } from "react-hook-form";

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
        reset();
        onClose();
      } else {
        await addHSN(data).unwrap();
        setSuccess("HSN created successfully!");
        reset();
        onClose();
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to save HSN");
    }
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create HSN/SAC">
      <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
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
          <Input type="text" {...register("hsnsacname")} />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="flex gap-2 mt-6">
          <Button type="submit" variant="primary" disabled={isLoading}>
            Save
          </Button>
          <Button type="button" variant="secondary" onClick={handleClear}>
            Clear
          </Button>
          <Button type="button" variant="danger" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
