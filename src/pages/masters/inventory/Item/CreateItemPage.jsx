import { useForm } from "react-hook-form";
import { useAddItemMutation } from "../../../../services/itemApi";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";

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
      // Advance Info
      discountType: "Applicable",
      itemDisc1: "",
      maxDisc: "",
      // ...add more as needed
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
        <div className="flex flex-row gap-4 p-1">
          <div
            className={`${
              showAdvance ? "w-3/4" : "w-full"
            } bg-white rounded shadow p-4 transition-all duration-500`}
          >
            <div className=" flex items-center justify-between sticky top-0 z-10">
              <h1 className="text-xl font-bold">Create Item</h1>
              <Button type="button" variant="secondary" onClick={handleBack}>
                &#8592; Back
              </Button>
            </div>
            <div className="flex mb-2 pb-2  border-b justify-between align-center">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-base border-b-2 border-black pb-1">
                  Basic Info
                </span>
                <div className="flex items-center">
                  <Input
                    type="checkbox"
                    width="w-4"
                    checked={showAdvance}
                    onChange={(e) => setShowAdvance(e.target.checked)}
                    className="h-4 w-4 mr-2"
                  />
                  <span className="font-semibold text-sm">Advance Info</span>
                </div>
              </div>
            </div>

            {/* Main Grid: 4 columns, compact */}
            <div className="grid grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block font-medium mb-1">Product *</label>
                <Input
                  className="h-8 text-xs"
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
              <div>
                <label className="block font-medium mb-1">Goods</label>
                <Select className="h-8 p-1 text-xs" {...register("goods")}>
                  {" "}
                  <option value="Goods">Goods</option>{" "}
                  <option value="Services">Services</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">Packing</label>
                <Input className="h-8 text-xs" {...register("packing")} />
              </div>
              <div>
                <label className="block font-medium mb-1">M.R.P</label>
                <Input
                  className="h-8 text-xs"
                  type="number"
                  {...register("price")}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Unit 1st *</label>
                <Input
                  className="h-8 text-xs"
                  {...register("unit1", { required: "Unit 1st is required" })}
                />
                {errors.unit1 && (
                  <span className="text-xs text-red-500">
                    {errors.unit1.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Purchase Rate</label>
                <Input
                  className="h-8 text-xs"
                  type="number"
                  {...register("purchasePrice")}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Unit-2</label>
                <Input className="h-8 text-xs" {...register("unit2")} />
              </div>
              <div>
                <label className="block font-medium mb-1">Cost</label>
                <Input
                  className="h-8 text-xs"
                  type="number"
                  {...register("cost")}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Conversion *</label>
                <Input
                  className="h-8 text-xs"
                  {...register("conversion", {
                    required: "Conversion is required",
                  })}
                />
                {errors.conversion && (
                  <span className="text-xs text-red-500">
                    {errors.conversion.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">S.Rate</label>
                <Input
                  className="h-8 text-xs"
                  type="number"
                  {...register("salerate")}
                />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Unit in Decimal
                </label>
                <Select className="h-8 text-xs" {...register("unitindecimal")}>
                  {" "}
                  <option value="No">No</option>{" "}
                  <option value="Yes">Yes</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">Narcotics</label>
                <Select className="h-8 text-xs" {...register("narcotic")}>
                  {" "}
                  <option value="No">No</option>{" "}
                  <option value="Yes">Yes</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">HSN/SAC*</label>
                <Input
                  className="h-8 text-xs"
                  {...register("hsnsac", { required: "HSN/SAC is required" })}
                />
                {errors.hsnsac && (
                  <span className="text-xs text-red-500">
                    {errors.hsnsac.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Schedule H</label>
                <Select className="h-8 text-xs" {...register("scheduleH")}>
                  {" "}
                  <option value="No">No</option>{" "}
                  <option value="Yes">Yes</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">Tax Category*</label>
                <Input
                  className="h-8 text-xs"
                  {...register("taxcategory", {
                    required: "Tax Category is required",
                  })}
                />
                {errors.taxcategory && (
                  <span className="text-xs text-red-500">
                    {errors.taxcategory.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Schedule H1</label>
                <Select className="h-8 text-xs" {...register("scheduleH1")}>
                  {" "}
                  <option value="No">No</option>{" "}
                  <option value="Yes">Yes</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">Company *</label>
                <Input
                  className="h-8 text-xs"
                  {...register("company", { required: "Company is required" })}
                />
                {errors.company && (
                  <span className="text-xs text-red-500">
                    {errors.company.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block font-medium mb-1">Schedule Drug</label>
                <Select className="h-8 text-xs" {...register("scheduledrug")}>
                  {" "}
                  <option value="No">No</option>{" "}
                  <option value="Yes">Yes</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">Salt</label>
                <Input className="h-8 text-xs" {...register("salt")} />
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Presc. Required
                </label>
                <Select className="h-8 text-xs" {...register("prescription")}>
                  {" "}
                  <option value="No">No</option>{" "}
                  <option value="Yes">Yes</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">Rack</label>
                <Input className="h-8 text-xs" {...register("rack")} />
              </div>
              <div>
                <label className="block font-medium mb-1">Storage Type</label>
                <Select className="h-8 text-xs" {...register("storagetype")}>
                  {" "}
                  <option value="Normal">Normal</option>{" "}
                  <option value="Cold">Cold</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">Color Type</label>
                <Input className="h-8 text-xs" {...register("colortype")} />
              </div>
              <div>
                <label className="block font-medium mb-1">Status</label>
                <Select className="h-8 text-xs" {...register("status")}>
                  {" "}
                  <option value="Continue">Continue</option>{" "}
                  <option value="Discontinued">Discontinued</option>{" "}
                </Select>
              </div>
              <div>
                <label className="block font-medium mb-1">TB Item</label>
                <Select className="h-8 text-xs" {...register("tbitem")}>
                  {" "}
                  <option value="Normal">Normal</option>{" "}
                  <option value="Special">Special</option>{" "}
                </Select>
              </div>
            </div>
            {/* Advance Info Section */}
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
          <div
            className={`flex-1 transition-all duration-500 ${
              showAdvance ? "w-1/4" : "w-0"
            }`}
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
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <label className="block font-medium mb-1">Discount</label>
                      <Select
                        className="h-8 text-xs"
                        {...register("discountType")}
                      >
                        {" "}
                        <option value="Applicable">Applicable</option>{" "}
                        <option value="Not Applicable">Not Applicable</option>{" "}
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
