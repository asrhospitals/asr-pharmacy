import { useState, useEffect } from "react";
import { useAddRackMutation } from "../../../../services/rackApi";
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import { useForm } from "react-hook-form";
import { TextField } from "../../../../componets/common/Fields";
import { useGetStoresQuery } from "../../../../services/storeApi";
import SearchableSelect from "../../../../componets/common/SearchableSelect";

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
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      storeId: "",
      rackname: "",
    },
  });

  useEffect(() => {
    if (errors && errors.storeId) {
      console.warn('Validation error:', errors.storeId);
    }
  }, [errors]);

  const { data: stores = [] } = useGetStoresQuery();
  const selectedStoreId = watch("storeId");
  const selectedStore = stores.find((s) => s.id === selectedStoreId);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ storeId: "", rackname: "" });
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
        <input type="hidden" {...register("storeId", { required: true })} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Store Name *</label>
          <SearchableSelect
            options={stores.map(s => ({ label: s.storename, value: s.id }))}
            value={selectedStoreId}
            onChange={(opt) => setValue("storeId", opt.value, { shouldValidate: true })}
            placeholder="Select Store"
          />
          {errors.storeId && (
            <div className="text-red-600 font-semibold text-sm mt-1">
              Please select a store.
            </div>
          )}
        </div>
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
