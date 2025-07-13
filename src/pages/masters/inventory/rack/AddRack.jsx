import { useState, useEffect } from "react";
import { useAddRackMutation } from "../../../../services/rackApi";
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import { useForm } from "react-hook-form";
import { TextField } from "../../../../componets/common/Fields";

export default function AddRack({
  isOpen = true,
  onClose = () => {},
  initialData = null,
  onSave,
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addRack, { isLoading }] = useAddRackMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      storename: "",
      rackname: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ storename: "", rackname: "" });
    }
  }, [initialData, isOpen, reset]);

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    try {
      if (onSave) {
        await onSave(data);
        setSuccess("Rack saved successfully!");
        reset();
        onClose();
      } else {
        await addRack(data).unwrap();
        setSuccess("Rack created successfully!");
        reset();
        onClose();
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to save rack");
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Rack">
      <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
        <TextField
          noHeight={true}
          label="Store Name"
          name="storename"
          register={register}
          errors={errors}
          required
          noStyle={true}
        />
        <TextField
          noHeight={true}
          label="Rack Name"
          name="rackname"
          register={register}
          errors={errors}
          required
          noStyle={true}
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}
        <div className="flex gap-2 mt-6">
          <Button type="submit" variant="primary" disabled={isLoading}>
            Save
          </Button>
          <Button type="button" variant="danger" onClick={onClose}>
            Close
          </Button>
        </div>
      </form>
    </Modal>
  );
}
