import { useForm } from "react-hook-form";
import { useAddItemMutation } from "../../../../services/itemApi";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { SelectField, TextField } from "../../../../componets/common/Fields";
import LeftColumn from "./components/LeftColumn";
import RightColumn from "./components/RightColumn";

const ADVANCE_TABS = ["Discount", "Quantity", "Other Info"];

export default function CreateItemPage() {
  const navigate = useNavigate();
  const [addItem, { isLoading }] = useAddItemMutation();
  const [showAdvance, setShowAdvance] = useState(false);
  const [activeTab, setActiveTab] = useState("Discount");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    },
  });

  const handleSave = async (data) => {
    try {
      await addItem(data).unwrap();
      toast.success("Data saved successfully");
      reset();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to save item");
    }
  };

  const handleClear = () => {
    toast.success("All Fields Cleared");
    reset();
  };

  const handleBack = () => navigate("/master/inventory/items");
  const handleClose = () => navigate("/master/inventory/items");

  return (
    <div className="flex flex-col overflow-hidden no-scrollbar">
      <form
        onSubmit={handleSubmit(handleSave)}
        className="flex-1 flex flex-col relative"
      >
        <div className="flex flex-col lg:flex-row gap-4 p-1">
          {/* Left Panel (Main Form) */}
          <div
            className={`
          bg-white rounded shadow p-4 transition-all duration-500
          ${showAdvance ? "lg:w-3/4" : "lg:w-full"} w-full
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
            <div className="space-y-4 text-xs">
              {/* Product and Goods */}
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <label className="block font-medium mb-1">Product *</label>
                  <Input
                    className="h-8 w-full text-xs"
                    {...register("productname", {
                      required: "Product Name is required",
                    })}
                  />
                  {errors.productname && (
                    <span className="text-xs text-red-500">
                      {errors.productname.message}
                    </span>
                  )}
                </div>
                <div className="sm:w-40 w-full">
                  <label className="block font-medium mb-1">Goods</label>
                  <Select
                    noPadding
                    className="h-8 w-full text-xs"
                    {...register("goods")}
                  >
                    <option value="Goods">Goods</option>
                    <option value="Services">Services</option>
                  </Select>
                </div>
              </div>

              {/* Columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <LeftColumn register={register} errors={errors} />
                <RightColumn register={register} errors={errors} />
              </div>
            </div>

            {/* Bottom Sticky Buttons */}
            <div className="bg-white h-10 py-2 flex items-center gap-2 justify-end z-10 sticky bottom-0 text-xs">
              <Button type="button" variant="secondary" onClick={handleBack}>
                F4 Switch Tab
              </Button>
              <Button type="submit" variant="primary" disabled={isLoading}>
                F10 Save
              </Button>
              <Button type="button" variant="secondary" onClick={handleClear}>
                F9 Clear
              </Button>
              <Button type="button" variant="danger" onClick={handleClose}>
                Esc Close
              </Button>
            </div>
          </div>

          {/* Right Panel (Advance Tabs) */}
          <div
            className={`
          transition-all duration-500
          ${showAdvance ? "lg:w-1/4 w-full" : "lg:w-0 w-0"}
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
                      className={`px-3 py-1 text-xs font-medium border-b-2 ${
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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="block font-medium mb-1">Discount</label>
                      <Select
                        noPadding
                        className="h-8 text-xs"
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
                        className="h-8 text-xs"
                        type="number"
                        {...register("itemDisc1")}
                      />
                    </div>
                    <div>
                      <label className="block font-medium mb-1">
                        Max Disc%
                      </label>
                      <Input
                        className="h-8 text-xs"
                        type="number"
                        {...register("maxDisc")}
                      />
                    </div>
                  </div>
                )}
                {activeTab === "Quantity" && (
                  <div className="text-xs">Quantity (Coming soon)</div>
                )}
                {activeTab === "Other Info" && (
                  <div className="text-xs">Other Info (Coming soon)</div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
