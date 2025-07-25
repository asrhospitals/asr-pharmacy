import { useState, useEffect } from "react";
import {
  useAddSaltMutation,
  useEditSaltMutation,
  useGetSaltsQuery,
} from "../../../../services/saltApi";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import InputFields from "./components/InputFields";
import SaltVariTable from "./components/SaltVariTable";
import { Eraser, Loader, SaveIcon, X } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { showToast } from "../../../../componets/common/Toast";

export default function SaltForm({
  isEditMode = false,
  initialData = null,
  onSave,
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showMoreOptions, setShowMoreOptions] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [variants, setVariants] = useState([
    {
      strength: "",
      dosageForm: "",
      brandName: "",
      packSize: "",
      mrp: "",
      dpco_applicable: false,
      dpco_mrp: "",
    },
  ]);
  const [addSalt, { isLoading }] = useAddSaltMutation();
  const [editSalt, { isLoading: isEditing }] = useEditSaltMutation();
  const { data: salts } = useGetSaltsQuery();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialData || {
      saltname: "",
      indication: "",
      dosage: "",
      sideeffects: "",
      specialprecautions: "",
      druginteractions: "",
      note: "",
      tbitem: "Normal",
      status: "Continue",
      prohabit: "No",
      narcotic: "No",
      scheduleh: "No",
      scheduleh1: "No",
      contraindications: "",
      relativeContraindications: "",
    },
  });

  // Keep form value in sync with showMoreOptions state
  useEffect(() => {
    setValue && setValue("showMoreOptions", showMoreOptions);
  }, [showMoreOptions, setValue]);

  useEffect(() => {
    if (isEditMode && id && salts) {
      const salt = salts.find((c) => parseInt(c.id) === parseInt(id));
      if (salt) {
        reset(salt);
        if (
          Array.isArray(salt.saltvariations) &&
          salt.saltvariations.length > 0
        ) {
          setVariants(
            salt.saltvariations.map((v) => ({
              strength: v.str || "",
              dosageForm: v.dosage || "",
              brandName: v.brandname || "",
              packSize: v.packsize || "",
              mrp: v.mrp || "",
              dpco_applicable: v.dpco === "Yes" || v.dpco === true,
              dpco_mrp: v.dpcomrp || "",
            }))
          );
        }
        const moreInfoFields = [
          "saltcode",
          "salttype",
          "saltgroup",
          "saltsubgroup",
          "saltsubsubgroup",
          "tbitem",
          "narcotic",
          "scheduleh2",
          "scheduleh3",
          "nowstatus",
          "prohibited",
        ];
        if (
          moreInfoFields.some(
            (field) => salt[field] && String(salt[field]).trim() !== ""
          )
        ) {
          setShowMoreOptions(true);
        }
      }
    } else if (initialData) {
      reset(initialData);
    }
  }, [isEditMode, id, salts, initialData, reset]);

  const handleSave = async (data) => {
    setError("");
    setSuccess("");
    try {
      // Check if all variants are empty
      const allEmpty = variants.every(
        v =>
          !v.strength &&
          !v.dosageForm &&
          !v.brandName &&
          !v.packSize &&
          !v.mrp &&
          !v.dpco_applicable &&
          !v.dpco_mrp
      );
      const payload = {
        saltData: { ...data },
        variationData: allEmpty ? [] : variants,
      };
      if (isEditMode) {
        await editSalt({ id, ...payload }).unwrap();
        setSuccess("Salt updated successfully!");
        showToast("Salt updated successfully!", { type: "success" });
      } else if (onSave) {
        await onSave(payload);
        setSuccess("Salt saved successfully!");
        showToast("Salt saved successfully!", { type: "success" });
      } else {
        await addSalt(payload).unwrap();
        setSuccess("Salt created successfully!");
        showToast("Salt created successfully!", { type: "success" });
      }
      reset();
      setVariants([]); // Set to empty array after save
      navigate("/master/inventory/salts");
      console.log(payload);
    } catch (err) {
      setError(
        err?.data?.message ||
          (isEditMode ? "Failed to update salt" : "Failed to save salt")
      );
      showToast(
        err?.data?.message ||
          (isEditMode ? "Failed to update salt" : "Failed to save salt"),
        { type: "error" }
      );
    }
  };

  const handleClear = () => {
    reset();
    setVariants([]); // Set to empty array after clear
  };

  const handleBack = () => navigate("/master/inventory/salts");
  const handleClose = () => navigate("/master/inventory/salts");

  const addVariant = () =>
    setVariants([
      ...variants,
      {
        strength: "",
        dosageForm: "",
        brandName: "",
        packSize: "",
        mrp: "",
        dpco_applicable: false,
        dpco_mrp: "",
      },
    ]);
  const removeVariant = (idx) => {
    if (variants.length > 1) {
      setVariants(variants.filter((_, i) => i !== idx));
    }
  };
  const handleVariantChange = (idx, field, value) => {
    const updated = [...variants];
    updated[idx][field] = value;
    setVariants(updated);
  };

  return (
    <div className="flex flex-col overflow-auto no-scrollbar">
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex-1 flex flex-col relative"
      >
        <div className="bg-white rounded shadow p-4 transition-all duration-500">
          <div className="flex items-center justify-between sticky top-0 z-10">
            <h1 className="text-xl font-bold">
              {isEditMode ? "Edit Salt" : "Add Salt"}
            </h1>
            <Button type="button" variant="secondary" onClick={handleBack}>
              &#8592; Back
            </Button>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Salt Name <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              {...register("saltname", { required: "Salt Name is required" })}
              className="h-8 text-xs w-full"
            />
            {errors.saltname && (
              <p className="text-red-500 text-xs mt-1">
                {errors.saltname.message}
              </p>
            )}
            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
              Contraindications
            </label>
            <Input
              type="text"
              {...register("contraindications")}
              className="h-8 text-xs w-full"
            />
            <label className="block text-sm font-medium text-gray-700 mb-2 mt-4">
              Relative Contraindications
            </label>
            <Input
              type="text"
              {...register("relativeContraindications")}
              className="h-8 text-xs w-full"
            />
          </div>
          <div className="w-fit">
            <label className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
              <Input
                width="w-4"
                type="checkbox"
                checked={showMoreOptions}
                onChange={(e) => setShowMoreOptions(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="font-semibold text-sm min-w-fit">More info</span>
            </label>
          </div>
          {showMoreOptions && (
            <InputFields register={register} errors={errors} />
          )}
          {/* Salt Variants Section */}
          <SaltVariTable
            variants={variants}
            handleVariantChange={handleVariantChange}
            removeVariant={removeVariant}
            addVariant={addVariant}
          />

          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex gap-2 mt-6 justify-end">
            <Button
              type="submit"
              variant="primary"
              disabled={isLoading || isEditing}
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
