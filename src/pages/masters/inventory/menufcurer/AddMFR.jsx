import { useState } from "react";
import { useAddManufacturerMutation } from "../../../../services/mfrApi";
import Input from "../../../../componets/common/Input";
import Button from "../../../../componets/common/Button";
import { useForm } from "react-hook-form";
import { SelectField, TextField } from "../../../../componets/common/Fields";
import { useNavigate } from "react-router-dom";
import { Eraser, SaveIcon, X } from "lucide-react";

export default function CreateManufacturerPage() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [addManufacturer, { isLoading }] = useAddManufacturerMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      mfrname: "",
      shortname: "",
      country: "India",
      state: "",
      address: "",
      email: "",
      phone: "",
      mobile: "",
      contactperson: "",
      status: "Continue",
      prohibited: "No",
    },
  });

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    try {
      await addManufacturer(data).unwrap();
      setSuccess("Manufacturer created successfully!");
      reset();
      navigate("/master/inventory/manufacturers");
    } catch (err) {
      setError(err?.data?.message || "Failed to save manufacturer");
    }
  };

  const handleClear = () => {
    reset();
  };

  const handleClose = () => {
    navigate("/master/inventory/manufacturers");
  };

  return (
    <div className="flex flex-col overflow-hidden no-scrollbar">
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex-1 flex flex-col relative"
      >
        <div className="bg-white rounded shadow p-4 transition-all duration-500">
          <div className="flex items-center justify-between sticky top-0 z-10">
            <h1 className="text-xl font-bold">Create Manufacturer</h1>
            <Button type="button" variant="secondary" onClick={handleClose}>
              &#8592; Back
            </Button>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              {...register("mfrname", { required: "Name is required" })}
              className="h-8 text-xs w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
            )}
          </div>

          <div className="w-fit mb-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Input
                width="w-4"
                type="checkbox"
                {...register("showMoreOptions")}
                onChange={(e) => setShowMore(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="font-semibold text-sm">More info</span>
            </label>
          </div>

          {showMore && (
            <div className="space-y-4 border border-gray-300 rounded p-3 bg-gray-50 mb-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <TextField
                  label="Phone"
                  name="phone"
                  register={register}
                  errors={errors}
                />
                <TextField
                  label="Mobile No."
                  name="mobile"
                  register={register}
                  errors={errors}
                />
                <TextField
                  label="Country"
                  name="country"
                  register={register}
                  errors={errors}
                />
                <TextField
                  label="State"
                  name="state"
                  register={register}
                  errors={errors}
                />
              </div>
              <TextField
                label="Address"
                name="address"
                register={register}
                errors={errors}
              />
              <TextField
                label="Contact Person"
                name="contactperson"
                register={register}
                errors={errors}
              />
              <TextField
                label="Email"
                name="email"
                register={register}
                errors={errors}
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <SelectField
                    label="Status"
                    options={["Continue", "Discontinue"]}
                    name="status"
                    register={register}
                  />
                </div>
                <div>
                  <SelectField
                    label="Prohibited"
                    options={["Yes", "No"]}
                    name="prohibited"
                    register={register}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {error && <div className="text-red-500 mb-4 text-xs">{error}</div>}
          {success && (
            <div className="text-green-500 mb-4 text-xs">{success}</div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 mt-4 justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading}
              buttonType={"save"}
            >
              Save
            </Button>
            <Button
              type="button"
              variant="secondary"
              onClick={handleClear}
              buttonType={"clear"}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="danger"
              onClick={handleClose}
              buttonType={"close"}
            >
              Close
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
