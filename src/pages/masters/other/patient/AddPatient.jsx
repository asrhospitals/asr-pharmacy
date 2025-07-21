import { useForm } from "react-hook-form";
import { useAddPatientMutation, useEditPatientMutation, useGetPatientsQuery } from "../../../../services/patientApi";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TextField, SelectField } from "../../../../componets/common/Fields";
import { showToast } from "../../../../componets/common/Toast";

const GENDER_OPTIONS = [
  { label: "Male", value: "Male" },
  { label: "Female", value: "Female" },
  { label: "Other", value: "Other" },
];
const PATIENT_TYPE_OPTIONS = [
  { label: "Regular", value: "Regular" },
  { label: "BPL Holder", value: "BPL_Holder" },
  { label: "Pensioner", value: "Pensioner" },
  { label: "One Time", value: "One_Time" },
];
const DISEASE_OPTIONS = [
  { label: "---Blank--", value: "" },
  { label: "Diabetes", value: "Diabetes" },
  { label: "Hypertension", value: "Hypertension" },
  { label: "Other", value: "Other" },
];

export default function AddPatient({ isEditMode = false }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [addPatient, { isLoading: isCreating }] = useAddPatientMutation();
  const [editPatient, { isLoading: isEditing }] = useEditPatientMutation();
  const { data: patients } = useGetPatientsQuery({}, { skip: !isEditMode });
  const [showMoreOptions, setShowMoreOptions] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: "",
      code: "",
      name: "",
      gender: "Male",
      age: "",
      ledger: "",
      address: "",
      pin: "",
      phone2: "",
      email: "",
      whatsapp: "",
      dob: "",
      patientType: "Regular",
      disease: "",
      govId: "",
      billDiscount: "0.00",
    },
  });

  useEffect(() => {
    if (isEditMode && id && patients?.data) {
      const patient = patients.data.find((p) => String(p.id) === String(id));
      if (patient) {
        Object.entries(patient).forEach(([key, value]) => {
          setValue(key, value == null ? "" : value);
        });
      }
    }
  }, [isEditMode, id, patients, setValue]);

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    if (!data.dob || data.dob === "Invalid date" || isNaN(new Date(data.dob).getTime())) {
      data.dob = null;
    }
    try {
      if (isEditMode && id) {
        await editPatient({ id, ...data }).unwrap();
        showToast("Patient updated successfully!", { type: "success" });
      } else {
        await addPatient(data).unwrap();
        showToast("Patient created successfully!", { type: "success" });
      }
      reset();
      navigate("/master/other/patient");
    } catch (err) {
      showToast(err?.data?.message || "Failed to save patient", { type: "error" });
    }
  };

  const handleClear = () => {
    reset();
  };

  const handleBack = () => {
    navigate("/master/other/patient");
  };

  return (
    <div className="flex justify-center items-start min-h-[calc(100vh-100px)] bg-gray-100 py-2">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold">{isEditMode ? "Edit Patient" : "Create Patient"}</h1>
          <Button type="button" variant="secondary" onClick={handleBack}>
            &#8592; Back
          </Button>
        </div>
        <form onSubmit={handleSubmit(handleSave)}>
          {/* Patient Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile No. <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2 items-center">
                <span className="bg-gray-100 border border-gray-300 rounded px-2 py-1">+91</span>
                <Input
                  type="text"
                  {...register("phone", { required: "Mobile No. is required" })}
                  placeholder="Enter mobile number"
                />
                <span className="ml-2">ID</span>
                <Input
                  type="text"
                  className="w-20"
                  {...register("code")}
                  placeholder="ID"
                  disabled
                />
              </div>
              {errors.phone && <span className="text-xs text-red-500">{errors.phone.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <Input type="text" {...register("address")} placeholder="Enter address" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <Input type="text" {...register("name", { required: "Name is required" })} placeholder="Enter name" />
              {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Pin No.</label>
                <Input type="text" {...register("pin")} placeholder="Pin No." />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone No.</label>
                <div className="flex gap-1 items-center">
                  <span className="bg-gray-100 border border-gray-300 rounded px-2 py-1">+91</span>
                  <Input type="text" {...register("phone2")} placeholder="Phone No." />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <Select
                  {...register("gender")}
                  options={GENDER_OPTIONS}
                  defaultValue="Male"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <Input type="number" {...register("age", { required: "Age is required" })} placeholder="Age" />
                {errors.age && <span className="text-xs text-red-500">{errors.age.message}</span>}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ledger <span className="text-red-500">*</span></label>
              {/* TODO: Replace with SearchableSelect and fetch ledgers from API */}
              <Select
                {...register("ledger", { required: "Ledger is required" })}
                options={[
                  { label: "Cash Account", value: "cash" },
                  { label: "Other Account", value: "other" },
                ]}
                defaultValue="cash"
              />
              {errors.ledger && <span className="text-xs text-red-500">{errors.ledger.message}</span>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
              <Input type="email" {...register("email")} placeholder="Email ID" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp No.</label>
              <div className="flex gap-1 items-center">
                <span className="bg-gray-100 border border-gray-300 rounded px-2 py-1">+91</span>
                <Input type="text" {...register("whatsapp")} placeholder="WhatsApp No." />
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Input
                width="w-4"
                type="checkbox"
                className="h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                checked={showMoreOptions}
                onChange={() => setShowMoreOptions((v) => !v)}
              />
              <span className="font-semibold text-sm min-w-fit">More Option</span>
            </div>
          </div>

          {/* Other Details (collapsible) */}
          <div
            className={`transition-all duration-500 overflow-hidden px-1 ${
              showMoreOptions ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {showMoreOptions && (
              <>
                <hr className="my-4" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <Input type="date" {...register("dob")} placeholder="DD-MM-YYYY" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Type</label>
                    <Select {...register("patientType")} options={PATIENT_TYPE_OPTIONS} defaultValue="Regular" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Disease</label>
                    <Select {...register("disease")} options={DISEASE_OPTIONS} defaultValue="" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Government Id</label>
                    <Input type="text" {...register("govId")} placeholder="Government Id" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bill Discount</label>
                    <div className="flex items-center">
                      <span className="bg-gray-100 border border-gray-300 rounded px-2 py-1">₹</span>
                      <Input type="number" step="0.01" {...register("billDiscount")} placeholder="0.00" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Error, Success, and Buttons */}
          {error && <div className="text-red-500 mb-2">{error}</div>}
          {success && <div className="text-green-500 mb-2">{success}</div>}
          <div className="flex gap-2 mt-2 justify-end">
            <Button
              type="submit"
              variant="primary"
              buttonType={isEditMode ? "save" : "save"}
              disabled={isCreating || isEditing}
            >
              {isEditMode ? "Update" : "Save"}
            </Button>
            <Button
              type="button"
              variant="secondary"
              buttonType={"clear"}
              disabled={isCreating || isEditing}
              onClick={handleClear}
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="danger"
              buttonType={"close"}
              disabled={isCreating || isEditing}
              onClick={handleBack}
            >
              Close
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
