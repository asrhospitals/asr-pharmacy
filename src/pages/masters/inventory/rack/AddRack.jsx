import { useState, useEffect } from "react";
import { useAddRackMutation } from "../../../../services/rackApi";
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import { useForm } from "react-hook-form";
import { TextField } from "../../../../componets/common/Fields";
import { useGetStoresQuery } from "../../../../services/storeApi";
import SearchableSelect from "../../../../componets/common/SearchableSelect";
import AddStore from "../store/AddStore";

export default function AddRack({
  isOpen = true,
  onClose = () => {},
  initialData = null,
  onSave,
}) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [addRack, { isLoading }] = useAddRackMutation();
  const [isStoreModalOpen, setIsStoreModalOpen] = useState(false);
  const [shouldReopenRack, setShouldReopenRack] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: initialData || {
      storeid: "",
      rackname: "",
    },
  });

  useEffect(() => {
    if (errors && errors.storeid) {
      console.warn("Validation error:", errors.storeid);
    }
  }, [errors]);

  const { data: stores = [] } = useGetStoresQuery();
  const selectedStoreId = watch("storeid");
  const selectedStore = stores?.data?.find((s) => s.id === selectedStoreId);

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    } else {
      reset({ storeid: "", rackname: "" });
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
        console.log("in on save");
      } else {
        console.log("in else on save", data);
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
    <>
      <AddStore
        isOpen={isStoreModalOpen}
        onClose={() => {
          setIsStoreModalOpen(false);
          // Optionally re-open AddRack if it was closed for store creation
          if (shouldReopenRack) {
            setTimeout(() => {
              setShouldReopenRack(false);
              onClose(false); // Do not close parent if reopening
            }, 0);
          }
        }}
      />
      <Modal open={isOpen && !isStoreModalOpen} onClose={onClose} title="Create Rack">
        <form onSubmit={handleSubmit(handleSave)} className="space-y-6">
          <input type="hidden" {...register("storeid", { required: true })} />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Store Name *
            </label>
            <SearchableSelect
              options={stores?.data?.map((s) => ({ label: s.storename, value: s.id }))}
              value={selectedStoreId}
              allowCreate={true}
              onChange={(opt) => {
                if (opt.isNew) {
                  setShouldReopenRack(true);
                  setIsStoreModalOpen(true);
                  onClose();
                  return;
                }
                setValue("storeid", opt.value, { shouldValidate: true });
              }}
              placeholder="Select Store"
            />
            {errors.storeid && (
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
          {/* Removed in-UI error and success messages, use toasts only */}
          <div className="flex gap-2 mt-6">
            <Button
              type="submit"
              buttonType={"save"}
              variant="primary"
              disabled={isLoading}
            >
              Save
            </Button>
            <Button
              type="button"
              buttonType={"close"}
              variant="danger"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}
