import Header from "../../../../componets/common/Header";
import Footer from "../../../../componets/common/Footer";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";

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


  if (!isOpen) return null;



  const handleSave = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/pharmacy/master/inventory/item/v1/add-item",data,
        
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201)
        return toast.success("Data save Successfully");
    } catch (error) {
      toast.error(error.error);
    }
  };

  const handleClear = () => {
    toast.success("All Fields Clear");
    reset();
   
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      {/* Main Container */}
      <div className="bg-white shadow-xl w-full flex flex-col max-h-screen max-w-6xl">
        <div className="flex flex-1 overflow-hidden border border-gray-300 rounded-lg p-4">
          {/* Left Column - Basic Info */}
          <div className="flex-1 bg-white overflow-y-auto">
            {/* Header */}
            <Header title="Create Item" />

            {/* Form Content */}
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="p-6 space-y-5">
                {/* Top Row - Product Name and Type (Full Width) */}
                <div className="grid grid-cols-12 gap-4 items-end">
                  <div className="col-span-1">
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Product *
                    </label>
                  </div>
                  <div className="col-span-8 px-9">
                    <input
                      type="text"
                      {...register("productname", {
                        required: "Product Name is required",
                      })}
                      className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                   
                        
                     
                  </div>
                  <div className="col-span-2">
                    <select
                      {...register("goods")}
                      className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                    >
                      <option value="Goods">Goods</option>
                      <option value="Services">Services</option>
                      
                    </select>
                  </div>
                </div>

                <div className="col-span-0 flex justify-center">
                  <div className="h-px bg-gray-400 w-full"></div>
                </div>

                {/* Main Content with Vertical Divider */}
                <div className="grid grid-cols-12 gap-6">
                  {/* Left Side Fields */}
                  <div className="col-span-6 space-y-4">
                    {/* Packing */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Packing
                        </label>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          {...register("packing")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Unit 1st */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Unit 1st *
                        </label>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          {...register("unit1", {
                            required: "Unit 1st is required",
                          })}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Unit-2 */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Unit-2
                        </label>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          {...register("unit2")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Conversion */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Conversion *
                        </label>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          {...register("conversion", {
                            required: "Conversion is required",
                          })}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Unit in Decimal */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Unit in Decimal
                        </label>
                      </div>
                      <div className="col-span-2">
                        <select
                          {...register("unitindecimal")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    {/* HSN/SAC */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          HSN/SAC*
                        </label>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          {...register("hsnsac", {
                            required: "HSN/SAC is required",
                          })}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                       
                      </div>
                    </div>

                    {/* Tax Category */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Tax Category*
                        </label>
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          {...register("taxcategory", {
                            required: "Tax Category is required",
                          })}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Company */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Company *
                        </label>
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          {...register("company", {
                            required: "Company is required",
                          })}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                     
                      </div>
                    </div>

                    {/* Salt */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Salt
                        </label>
                      </div>
                      <div className="col-span-3">
                        <input
                          type="text"
                          {...register("salt")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Rack */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Rack
                        </label>
                      </div>
                      <div className="col-span-2">
                        <input
                          type="text"
                          {...register("rack")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vertical Divider */}
                  <div className="flex justify-center">
                    <div className="w-px bg-gray-400 h-auto"></div>
                  </div>

                  {/* Right Side Fields */}
                  <div className="col-span-5 space-y-4">
                    {/* M.R.P */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <label className="col-span-1 text-xs font-medium text-gray-700 mb-1">
                        M.R.P
                      </label>
                      <div className="col-span-3 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-100 text-gray-900 text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          {...register("price")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Purchase Rate */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <label className="col-span-1 text-xs font-medium text-gray-700 mb-1">
                        Purchase Rate
                      </label>
                      <div className="col-span-3 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-100 text-gray-900 text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          {...register("purchasePrice")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Cost */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <label className="col-span-1 text-xs font-medium text-gray-700 mb-1">
                        Cost
                      </label>
                      <div className="col-span-3 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-100 text-gray-900 text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          {...register("cost")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* S.Rate */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <label className="col-span-1 text-xs font-medium text-gray-700 mb-1">
                        S.Rate
                      </label>
                      <div className="col-span-3 flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-gray-300 bg-gray-100 text-gray-900 text-sm">
                          ₹
                        </span>
                        <input
                          type="number"
                          {...register("salerate")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Narcotics */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Narcotics
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("narcotic")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    {/* Schedule H */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Schedule H
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("scheduleH")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    {/* Schedule H1 */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Schedule H1
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("scheduleH1")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    {/* Schedule Drug */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Schedule Drug
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("scheduledrug")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    {/* Presc. Required */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Presc. Required
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("prescription")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    {/* Storage Type */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Storage Type
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("storagetype")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="Normal">Normal</option>
                          <option value="Costly">Costly</option>
                          <option value="8° Storage">8° Storage</option>
                          <option value="24° Storage">24° Storage</option>
                        </select>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Status
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("status")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="Continue">Continue</option>
                          <option value="Discontinue">Discontinue</option>
                        </select>
                      </div>
                    </div>

                    {/* Color Type */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          Color Type
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("colortype")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="—Blank—">—Blank—</option>
                          <option
                            style={{
                              backgroundColor: "#ef4444",
                              color: "white",
                            }}
                            value="Red"
                          >
                            Red
                          </option>
                          <option
                            style={{
                              backgroundColor: "#3b82f6",
                              color: "white",
                            }}
                            value="Blue"
                          >
                            Blue
                          </option>
                          <option
                            style={{
                              backgroundColor: "#10b981",
                              color: "white",
                            }}
                            value="Green"
                          >
                            Green
                          </option>
                          <option
                            style={{
                              backgroundColor: "#8b5cf6",
                              color: "white",
                            }}
                            value="Purple"
                          >
                            Purple
                          </option>
                        </select>
                      </div>
                    </div>

                    {/* TB Item */}
                    <div className="grid grid-cols-4 gap-3 items-end">
                      <div className="col-span-1">
                        <label className="block text-xs font-medium text-gray-700 mb-1">
                          TB Item
                        </label>
                      </div>
                      <div className="col-span-3">
                        <select
                          {...register("tbitem")}
                          className="w-full px-1 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 bg-white"
                        >
                          <option value="Normal">Normal</option>
                          <option value="TB">TB</option>
                          <option value="Tramadol">Tramadol</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
             
            </form>
            <Footer
                onSave={handleSubmit(handleSave)}
                onClear={handleClear}
                onClose={handleClose}
              />
          </div>
        </div>
      </div>
    </div>
  );
}
