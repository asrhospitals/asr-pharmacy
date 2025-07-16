import React, { useState, useEffect } from "react";
import { useAddUnitMutation } from "../../../../services/unitApi";
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import { useForm } from "react-hook-form";
import { TextField } from "../../../../componets/common/Fields";

export default function CreateUnitForm({
  isOpen = true,
  onClose = () => {},
  initialData = null,
  onSave,
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addUnit, { isLoading }] = useAddUnitMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      unitName: "",
      uqc: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ unitName: "", uqc: "" });
    }
  }, [initialData, isOpen, reset]);

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    try {
      if (onSave) {
        await onSave(data);
        setSuccess("Unit saved successfully!");
        reset();
        onClose();
      } else {
        await addUnit(data).unwrap();
        setSuccess("Unit created successfully!");
        reset();
        onClose();
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to save unit");
    }
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Unit">
      <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
        <TextField
          name="unitName"
          label="Unit Name"
          type="text"
          register={register}
          errors={error}
          required
          noHeight={true}
          noStyle={true}
        />
        <TextField
          name="uqc"
          label="UQC"
          type="text"
          register={register}
          errors={error}
          required
          noHeight={true}
          noStyle={true}
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="flex gap-2 mt-6">
          <Button
            buttonType={"save"}
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            buttonType={"clear"}
            type="button"
            variant="secondary"
            onClick={handleClear}
          >
            Clear
          </Button>
          <Button
            buttonType={"close"}
            type="button"
            variant="danger"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
