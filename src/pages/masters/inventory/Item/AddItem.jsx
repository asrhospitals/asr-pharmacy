import Header from "../../../../componets/common/Header";
import Footer from "../../../../componets/common/Footer";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useAddItemMutation } from '../../../../services/itemApi';
import Modal from "../../../../componets/common/Modal";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";

export default function CreateItemModal({ isOpen = true, onClose = () => {} }) {
  const {
    register,
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      productname: "",
      goods: "GOODS",
      packing: "",
      unit1: "",
      unit2: "",
      conversion: "",
      unitindecimal: "",
      hsnsac: "",
      taxcategory: "",
      company: "",
      salt: "",
      rack: "",
      price: "",
      purchasePrice: "",
      cost: "",
      salerate: "",
      narcotic: "",
      scheduleH: "",
      scheduleH1: "",
      scheduledrug: "",
      prescription: "",
      storagetype: "",
      colortype: "",
      status: "Continue",
    },
  });
  const [addItem, { isLoading }] = useAddItemMutation();

  const handleSave = async (data) => {
    try {
      await addItem(data).unwrap();
      toast.success("Data saved successfully");
      reset();
    } catch (error) {
      toast.error(error?.data?.message || 'Failed to save item');
    }
  };

  const handleClear = () => {
    toast.success("All Fields Cleared");
    reset();
  };

  return (
    <Modal open={isOpen} onClose={onClose} title="Create Item">
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="p-2 space-y-5">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-1">
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Product *
              </label>
            </div>
            <div className="col-span-8 px-9">
              <Input
                type="text"
                {...register("productname", { required: "Product Name is required" })}
              />
            </div>
            <div className="col-span-2">
              <Select {...register("goods")}>
                <option value="Goods">Goods</option>
                <option value="Services">Services</option>
              </Select>
            </div>
          </div>
          <div className="col-span-0 flex justify-center">
            <div className="h-px bg-gray-400 w-full"></div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6 space-y-4">
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Packing</label>
                </div>
                <div className="col-span-2">
                  <Input type="text" {...register("packing")} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Unit 1st *</label>
                </div>
                <div className="col-span-2">
                  <Input type="text" {...register("unit1", { required: "Unit 1st is required" })} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Unit-2</label>
                </div>
                <div className="col-span-2">
                  <Input type="text" {...register("unit2")} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Conversion *</label>
                </div>
                <div className="col-span-2">
                  <Input type="text" {...register("conversion", { required: "Conversion is required" })} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Unit in Decimal</label>
                </div>
                <div className="col-span-2">
                  <Select {...register("unitindecimal")}> <option value="No">No</option> <option value="Yes">Yes</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">HSN/SAC*</label>
                </div>
                <div className="col-span-2">
                  <Input type="text" {...register("hsnsac", { required: "HSN/SAC is required" })} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Tax Category*</label>
                </div>
                <div className="col-span-3">
                  <Input type="text" {...register("taxcategory", { required: "Tax Category is required" })} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company *</label>
                </div>
                <div className="col-span-3">
                  <Input type="text" {...register("company", { required: "Company is required" })} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Salt</label>
                </div>
                <div className="col-span-3">
                  <Input type="text" {...register("salt")} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Rack</label>
                </div>
                <div className="col-span-2">
                  <Input type="text" {...register("rack")} />
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-px bg-gray-400 h-auto"></div>
            </div>
            <div className="col-span-5 space-y-4">
              <div className="grid grid-cols-4 gap-3 items-end">
                <label className="col-span-1 text-xs font-medium text-gray-700 mb-1">M.R.P</label>
                <div className="col-span-3 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-100 text-gray-900 text-sm">
                    ₹
                  </span>
                  <Input type="number" {...register("price")} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <label className="col-span-1 text-xs font-medium text-gray-700 mb-1">Purchase Rate</label>
                <div className="col-span-3 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-100 text-gray-900 text-sm">
                    ₹
                  </span>
                  <Input type="number" {...register("purchasePrice")} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <label className="col-span-1 text-xs font-medium text-gray-700 mb-1">Cost</label>
                <div className="col-span-3 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-100 text-gray-900 text-sm">
                    ₹
                  </span>
                  <Input type="number" {...register("cost")} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <label className="col-span-1 text-xs font-medium text-gray-700 mb-1">S.Rate</label>
                <div className="col-span-3 flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-100 text-gray-900 text-sm">
                    ₹
                  </span>
                  <Input type="number" {...register("salerate")} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Narcotics</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("narcotic")}> <option value="No">No</option> <option value="Yes">Yes</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Schedule H</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("scheduleH")}> <option value="No">No</option> <option value="Yes">Yes</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Schedule H1</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("scheduleH1")}> <option value="No">No</option> <option value="Yes">Yes</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Schedule Drug</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("scheduledrug")}> <option value="No">No</option> <option value="Yes">Yes</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Presc. Required</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("prescription")}> <option value="No">No</option> <option value="Yes">Yes</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Storage Type</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("storagetype")}> <option value="Normal">Normal</option> <option value="Costly">Costly</option> <option value="8° Storage">8° Storage</option> <option value="24° Storage">24° Storage</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Status</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("status")}> <option value="Continue">Continue</option> <option value="Discontinue">Discontinue</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Color Type</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("colortype")}> <option value="—Blank—">—Blank—</option> <option style={{ backgroundColor: "#ef4444", color: "white" }} value="Red">Red</option> <option style={{ backgroundColor: "#3b82f6", color: "white" }} value="Blue">Blue</option> <option style={{ backgroundColor: "#10b981", color: "white" }} value="Green">Green</option> <option style={{ backgroundColor: "#8b5cf6", color: "white" }} value="Purple">Purple</option> </Select>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-3 items-end">
                <div className="col-span-1">
                  <label className="block text-xs font-medium text-gray-700 mb-1">TB Item</label>
                </div>
                <div className="col-span-3">
                  <Select {...register("tbitem")}> <option value="Normal">Normal</option> <option value="TB">TB</option> <option value="Tramadol">Tramadol</option> </Select>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-6">
            <Button type="submit" variant="primary" disabled={isLoading}>Save</Button>
            <Button type="button" variant="secondary" onClick={handleClear}>Clear</Button>
            <Button type="button" variant="danger" onClick={onClose}>Close</Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}
