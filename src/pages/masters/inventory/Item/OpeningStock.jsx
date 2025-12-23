import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Trash2, Plus, Save } from "lucide-react";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import { showToast } from "../../../../componets/common/Toast";
import { useCreateBatchMutation } from "../../../../services/batchApi";
import { useGetStoresQuery } from "../../../../services/storeApi";

const OpeningStock = ({ open, itemId, itemName, onSuccess, onCancle }) => {
  const [createBatch, { isLoading: isSaving }] = useCreateBatchMutation();
  const { data: storeData } = useGetStoresQuery();
  const stores = storeData?.data || [];
  const [isProcessing, setIsProccessing] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      stocks: [
        {
          batchNumber: "",
          expiryDate: "",
          mrp: "",
          purchaseRate: "",
          saleRate: "",
          storeId: "",
          quantity: "",
          freeQuantity: "0",
          conversion: "1",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "stocks",
  });

  const onSubmit = async (data) => {
    setIsProccessing(true);
    let successCount = 0;
    let failCount = 0;

    for (const row of data.stocks) {
      try {
        if (!row.batchNumber || !row.quantity) {
        showToast("Batch No and Quantity are required", "error");
        return;
      }
        //this is for maping UI fields to backend and also if want store more fields in notes as JSON
        // const notesData = {
        //   storeId: row.storeId,
        //   saleRate: row.saleRate,
        //   freeQty: row.freeQuantity,
        //   conversion: row.conversion,
        // };

        const payload = {
          itemId,
          batchNumber: row.batchNumber,
          quantity: Number(row.quantity),
          expiryDate: row.expiryDate || null,
          mrp: Number(row.mrp || 0),
          purchaseRate: Number(row.purchaseRate),
          notes: JSON.stringify({
              storeId: row.storeId,
              saleRate: row.saleRate || 0,
              freeQty: row.freeQuantity || 0,
              conversion: row.conversion || 1,
          }),
        };

        console.log(payload)
        await createBatch(payload).unwrap();
        successCount++;
      } catch (error) {
        console.log("Batch Error", row.batchNumber, error);
        failCount++;
      }
    }
    setIsProccessing(false);
    if (failCount === 0 && successCount > 0) {
      showToast("Opening Stock Added Successfully", "success");
      // if (onSuccess) onSuccess();
    } else if (failCount > 0) {
      showToast(`Saved ${successCount} batches. ${failCount} failed.`, "error");
      if (onSuccess) onSuccess();
    } else {
      showToast("No valid stock data to save", "error");
    }
  };

  if(!open) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-black/30 z-50 flex items-center justify-center">
      <div className="bg-white w-[95%] max-w-6xl rounded-xl shadow-xl p-3">
        {/* Header part */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-lg font-bold text-blue-700">
            Add Opening Stock: <span className="text-gray-700">{itemName}</span>
          </h2>
          <Button
            variant="secondary"
            onClick={onCancle}
            className="text-lg font-bold bg-red-500 hover:bg-red-600"
          >
            Skip/Close
          </Button>
        </div>
        {/* Form part */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="overflow-x-auto border rounded-lg mb-4">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-xs">
                <tr>
                  <th className="p-2 min-w-[120px]">Batch No *</th>
                  <th className="p-2 min-w-[110px]">Expiry</th>
                  <th className="p-2 min-w-[80px]">MRP</th>
                  <th className="p-2 min-w-[80px]">P.Rate</th>
                  <th className="p-2 min-w-[80px]">S.Rate</th>
                  <th className="p-2 min-w-[150px]">Store</th>
                  <th className="p-2 min-w-[80px]">Qty *</th>
                  <th className="p-2 min-w-[70px]">Free Qty</th>
                  <th className="p-2 min-w-[60px]">Conv</th>
                  {/* <th className="p-2 text-center w-10"></th> */}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fields.map((field, index) => (
                  <tr
                    key={field.id}
                    className="hover:bg-blue-50 transition-colors"
                  >
                    <td className="p-2">
                      <Input
                        {...register(`stocks.${index}.batchNumber`, {
                          required: "Required",
                        })}
                        placeholder="Batch"
                        className={`text-xs h-8 ${
                          errors?.stocks?.[index]?.batchNumber
                            ? "border-red-500"
                            : ""
                        }`}
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="date"
                        {...register(`stocks.${index}.expiryDate`)}
                        className="h-8 text-xs"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`stocks.${index}.mrp`)}
                        className="h-8 text-xs"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`stocks.${index}.purchaseRate`)}
                        className="h-8 text-xs"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        step="0.01"
                        {...register(`stocks.${index}.saleRate`)}
                        className="h-8 text-xs"
                        placeholder="0.00"
                      />
                    </td>
                    <td className="p-2">
                      <Select
                        {...register(`stocks.${index}.storeId`)}
                        noPadding
                        className="h-8 text-xs"
                      >
                        <option value=""> Select Store</option>
                        {stores.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.storename}
                          </option>
                        ))}
                      </Select>
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        {...register(`stocks.${index}.quantity`, {
                          required: true,
                        })}
                        className="h-8 text-xs font-bold text-blue-700"
                        placeholder="0"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        {...register(`stocks.${index}.freeQuantity`)}
                        className="h-8 text-xs"
                        placeholder="0"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        {...register(`stocks.${index}.conversion`)}
                        className="h-8 text-xs"
                        placeholder="1"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <Trash2 size={20} />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-between items-center bg-gray-50 p-3 rounded border border-dashed border-gray-300">
            <Button
              type="button"
              variant="secondary"
              onClick={() =>
                append({
                  batchNumber: "",
                  expiryDate: "",
                  mrp: "",
                  purchaseRate: "",
                  saleRate: "",
                  quantity: "",
                  freeQuantity: "",
                  conversion: "",
                  storeId: "",
                })
              }
              startIcon={<Plus size={14} />}
              className="text-ms"
            >
              Add Batch
            </Button>
            <Button
              variant="secondary"
              type="submit"
              loading={isSaving || isProcessing}
              startIcon={<Save size={14} />}
              className="text-lg hover:bg-green-500 duration-300"
            >
              Save
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OpeningStock;
