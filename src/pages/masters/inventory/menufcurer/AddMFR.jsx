import { useState, useEffect } from "react";
import Header from "../../../../componets/common/Header";
import Footer from "../../../../componets/common/Footer";
import { useAddManufacturerMutation } from "../../../../services/mfrApi";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import Modal from "../../../../componets/common/Modal";
import { useForm } from "react-hook-form";
import { TextField } from "../../../../componets/common/Fields";

export default function CreateMFRModal({
  isOpen = true,
  onClose = () => {},
  initialData = null,
  onSave,
}) {
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addManufacturer, { isLoading }] = useAddManufacturerMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      mfrname: "",
      shortname: "",
      country: "",
      state: "",
      address: "",
      email: "",
      phone: "",
      contactperson: "",
      status: "Continue",
      prohabited: "No",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({
        mfrname: "",
        shortname: "",
        country: "",
        state: "",
        address: "",
        email: "",
        phone: "",
        contactperson: "",
        status: "Continue",
        prohabited: "No",
      });
    }
  }, [initialData, isOpen, reset]);

  if (!isOpen) return null;

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    try {
      if (onSave) {
        await onSave(data);
        setSuccess("Manufacturer saved successfully!");
        reset();
        onClose();
      } else {
        await addManufacturer(data).unwrap();
        setSuccess("Manufacturer created successfully!");
        reset();
        onClose();
      }
    } catch (err) {
      setError(err?.data?.message || "Failed to save manufacturer");
    }
  };

  const handleClear = () => {
    reset();
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Manufacturer">
      <form onSubmit={handleSubmit(handleSave)} className="space-y-2">
        <TextField
          label="Manufacturer Name"
          name={"mfrname"}
          required
          message="Manufacturer Name is required"
          register={register}
          errors={errors}
        />
        <TextField
          label="Short Name"
          name={"shortname"}
          required
          message="Short Name is required"
          register={register}
          errors={errors}
        />
        <TextField
          label="Country"
          name={"country"}
          // required
          // message="Country is required"
          register={register}
          errors={errors}
        />
        <TextField
          label="State"
          name={"state"}
          // required
          // message="State is required"
          register={register}
          errors={errors}
        />
        <TextField
          label="Address"
          name={"address"}
          // required
          // message="Address is required"
          register={register}
          errors={errors}
        />
        <TextField
          label="Contact Person"
          name={"contactperson"}
          // required
          // message="Contact Person is required"
          register={register}
          errors={errors}
        />
        <TextField
          label="Phone"
          name={"phone"}
          // required
          // message="Phone is required"
          register={register}
          errors={errors}
        />
        <TextField
          label="Email"
          name={"email"}
          // required
          // message="Email is required"
          register={register}
          errors={errors}
        />
        <div className="flex gap-2 justify-end mt-6">
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
