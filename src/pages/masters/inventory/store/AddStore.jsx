import { useState, useEffect } from "react";
import { useAddStoreMutation } from "../../../../services/storeApi";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import Modal from "../../../../componets/common/Modal";
import { useForm } from "react-hook-form";
import { showToast } from "../../../../componets/common/Toast";

export default function AddStore({
  isOpen = true,
  onClose = () => {},
  initialData = null,
  onSave,
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addStore, { isLoading }] = useAddStoreMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      storecode: "",
      storename: "",
      address1: "",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ storecode: "", storename: "", address1: "" });
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    try {
      if (onSave) {
        await onSave(data);
        showToast("Store saved successfully!", { type: "success" });
        reset();
        onClose();
      } else {
        await addStore(data);
        showToast("Store created successfully!", { type: "success" });
        reset();
        onClose();
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to save store");
      showToast(err?.data?.message || "Failed to save store", {
        type: "error",
      });
    }
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Store">
      <form onSubmit={handleSubmit(handleSave)} className="space-y-4">
        <Input
          label="Store Code"
          {...register("storecode", { required: "Store Code is required" })}
          required
        />
        {errors.storecode && (
          <p className="text-red-500 text-xs mt-1">
            {errors.storecode.message}
          </p>
        )}
        <Input
          label="Store Name"
          {...register("storename", { required: "Store Name is required" })}
          required
        />
        {errors.storename && (
          <p className="text-red-500 text-xs mt-1">
            {errors.storename.message}
          </p>
        )}
        <Input
          label="Address"
          {...register("address1", { required: "Address is required" })}
          required
        />
        {errors.address1 && (
          <p className="text-red-500 text-xs mt-1">{errors.address1.message}</p>
        )}
        <div className="flex gap-2 justify-end mt-6">
          <Button
            buttonType={"save"}
            type="submit"
            variant="primary"
            disabled={isLoading}
          >
            Save
          </Button>
          <Button
            type="button"
            variant="secondary"
            buttonType={"clear"}
            onClick={() => reset()}
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
