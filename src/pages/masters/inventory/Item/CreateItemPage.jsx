import { useForm } from "react-hook-form";
import { useAddItemMutation } from "../../../../services/itemApi";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { showToast } from "../../../../componets/common/Toast";
import { SelectField, TextField } from "../../../../componets/common/Fields";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";
import { useGetRacksQuery } from "../../../../services/rackApi";
import { useGetCompaniesQuery } from "../../../../services/companyApi";
import { useGetSaltsQuery } from "../../../../services/saltApi";
import { useGetUnitsQuery } from "../../../../services/unitApi";
import { useGetHSNsQuery } from "../../../../services/hsnApi";
import CreateUnitForm from "../unit/AddUnit";
import CreateHsnSacForm from "../hsn/AddHSN";
import AddRack from "../rack/AddRack";

const ADVANCE_TABS = ["Discount", "Quantity", "Other Info"];

export default function CreateItemPage() {
  const navigate = useNavigate();
  const [addItem, { isLoading }] = useAddItemMutation();
  const [showAdvance, setShowAdvance] = useState(false);
  const [activeTab, setActiveTab] = useState("Discount");
  const [selectedRack, setSelectedRack] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedSalt, setSelectedSalt] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedHSN, setSelectedHSN] = useState(null);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isHSNModalOpen, setIsHSNModalOpen] = useState(false);
  const [isRackModalOpen, setIsRackModalOpen] = useState(false);

  const { data: rackData } = useGetRacksQuery();
  const { data: companyData } = useGetCompaniesQuery();
  const { data: saltData } = useGetSaltsQuery();
  const { data: unitData } = useGetUnitsQuery();
  const { data: hsnData } = useGetHSNsQuery();

  console.log(
    "rackData, companyData, saltData, unitData, hsnData",
    rackData,
    companyData,
    saltData,
    unitData,
    hsnData
  );

  const allData = {
    rackData,
    companyData,
    saltData,
    unitData,
    hsnData,
  };

  const allSetters = {
    setSelectedRack,
    setSelectedCompany,
    setSelectedSalt,
    setSelectedUnit,
    setSelectedHSN,
  };

  const allStates = {
    selectedRack,
    selectedCompany,
    selectedSalt,
    selectedUnit,
    selectedHSN,
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      productname: "",
      goods: "Goods",
      packing: "",
      unit1: "",
      unit2: "",
      conversion: "",
      unitindecimal: "No",
      hsnsac: "",
      taxcategory: "",
      company: "",
      salt: "",
      rack: "",
      price: "",
      purchasePrice: "",
      cost: "",
      salerate: "",
      narcotic: "No",
      scheduleH: "No",
      scheduleH1: "No",
      scheduledrug: "No",
      prescription: "No",
      storagetype: "Normal",
      colortype: "",
      status: "Continue",
      tbitem: "Normal",
      discountType: "Applicable",
      itemDisc1: "",
      maxDisc: "",
      contraindications: "",
      relativeContraindications: "",
    },
  });

  const handleSave = async (data) => {
    try {
      await addItem(data).unwrap();
      showToast("Data saved successfully", { type: "success" });
      reset();
    } catch (error) {
      showToast(error?.data?.message || "Failed to save item", { type: "error" });
    }
  };

  const handleClear = () => {
    showToast("All Fields Cleared", { type: "success" });
    reset();
  };

  const handleBack = () => navigate("/master/inventory/items");
  const handleClose = () => navigate("/master/inventory/items");

  return (
    <div className="flex flex-col overflow-hidden no-scrollbar">
      {/* Modals for creation */}
      <AddRack isOpen={isRackModalOpen} onClose={() => setIsRackModalOpen(false)} />
      <CreateUnitForm isOpen={isUnitModalOpen} onClose={() => setIsUnitModalOpen(false)} />
      <CreateHsnSacForm isOpen={isHSNModalOpen} onClose={() => setIsHSNModalOpen(false)} />
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex-1 flex flex-col relative"
      >
        <div className="flex flex-col lg:flex-row gap-4 p-1">
          {/* Left Panel (Main Form) */}
          <div
            className={`
          bg-white rounded shadow p-4 transition-all duration-500
          ${showAdvance ? "lg:w-3/5" : "lg:w-full"} w-full
        `}
          >
            {/* Header */}
            <div className="flex items-center justify-between sticky top-0 z-10 bg-white">
              <h1 className="text-xl font-bold">Create Item</h1>
              <Button type="button" variant="secondary" onClick={handleBack}>
                &#8592; Back
              </Button>
            </div>

            {/* Basic Info Header */}
            <div className="flex mb-2 pb-2 border-b justify-between items-center">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-base border-b-2 border-black pb-1">
                  Basic Info
                </span>
                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    {...register("advance")}
                    onChange={(e) => setShowAdvance(e.target.checked)}
                    className="mr-1"
                  />
                  <span className="font-semibold text-sm min-w-fit">
                    Advance Info
                  </span>
                </div>
              </div>
            </div>

            {/* Main Grid */}
            <div className="space-y-4 text-m">
              {/* Product and Goods */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Product *</label>
                  <Input
                    className="h-8 w-full text-m"
                    {...register("productname", {
                      required: "Product Name is required",
                    })}
                  />
                  {errors.productname && (
                    <span className="text-m text-red-500">
                      {errors.productname.message}
                    </span>
                  )}
                </div>
                <div className="sm:w-40 w-full">
                  <label className="block font-medium mb-1">Goods</label>
                  <Select
                    noPadding
                    className="h-8 w-full text-m"
                    {...register("goods")}
                  >
                    <option value="Goods">Goods</option>
                    <option value="Services">Services</option>
                  </Select>
                </div>
              </div>

              {/* Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LeftColumn
                  allData={allData}
                  setters={allSetters}
                  states={allStates}
                  register={register}
                  errors={errors}
                  setValue={setValue}
                  onCreateRack={() => setIsRackModalOpen(true)}
                  onCreateUnit={() => setIsUnitModalOpen(true)}
                  onCreateHSN={() => setIsHSNModalOpen(true)}
                  onCreateCompany={() => navigate("/master/inventory/company/create")}
                  onCreateSalt={() => navigate("/master/inventory/salt/create")}
                />
                <RightColumn register={register} errors={errors} />
              </div>
            </div>

            {/* Bottom Sticky Buttons */}
            <div className="bg-white h-10 py-2 flex items-center gap-2 justify-end z-10 sticky bottom-0 text-m">
              <Button type="button" variant="secondary" onClick={handleBack}>
                F4 Switch Tab
              </Button>
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
                buttonType={"clear"}
                variant="secondary"
                onClick={handleClear}
              >
                Clear
              </Button>
              <Button
                type="button"
                buttonType={"close"}
                variant="danger"
                onClick={handleClose}
              >
                Close
              </Button>
            </div>
          </div>

          {/* Right Panel (Advance Tabs) */}
          <div
            className={`
          transition-all duration-500
          ${showAdvance ? "lg:w-2/5 w-full" : "lg:w-0 w-0"}
          overflow-hidden
        `}
          >
            {showAdvance && (
              <div className="w-full bg-white rounded border border-gray-300 p-2">
                <div className="flex gap-2 border-b mb-2">
                  {ADVANCE_TABS.map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      className={`px-3 py-1 text-m font-medium border-b-2 ${
                        activeTab === tab
                          ? "border-blue-600 text-blue-700"
                          : "border-transparent text-gray-500"
                      }`}
                      onClick={() => setActiveTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === "Discount" && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-m">
                    <div>
                      <label className="block font-medium mb-1">Discount</label>
                      <Select
                        noPadding
                        className="h-8 text-m"
                        {...register("discountType")}
                      >
                        <option value="Applicable">Applicable</option>
                        <option value="Not Applicable">Not Applicable</option>
                      </Select>
                    </div>
                    <div>
                      <label className="block font-medium mb-1">
                        Item Disc 1 %
                      </label>
                      <Input
                        className="h-8 text-m"
                        type="number"
                        {...register("itemDisc1")}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">
                        Max Disc%
                      </label>
                      <Input
                        className="h-8 text-m"
                        type="number"
                        {...register("maxDisc")}
                      />
                    </div>
                  </div>
                )}
                {activeTab === "Quantity" && (
                  <div className="text-m">Quantity (Coming soon)</div>
                )}
                {activeTab === "Other Info" && (
                  <div className="text-m">Other Info (Coming soon)</div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
