import React from "react";
import Input from "../../../../../componets/common/Input";
import Select from "../../../../../componets/common/Select";
import { Plus, X } from "lucide-react";
import Button from "../../../../../componets/common/Button";

const SaltVariTable = ({
  variants,
  handleVariantChange,
  removeVariant,
  addVariant,
}) => {
  return (
    <div className="mt-8">
      <h3 className="font-semibold mb-2">Salt Variations</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg text-xs mb-2 bg-white shadow-sm">
          <thead className="border-0">
            <tr className="bg-gray-100">
              <th className="px-3 py-2">Strength</th>
              <th className="px-3 py-2">Dosage Form</th>
              <th className="px-3 py-2">Brand Name</th>
              <th className="px-3 py-2">Pack Size</th>
              <th className="px-3 py-2">MRP</th>
              <th className="px-3 py-2">DPCO Applicable</th>
              <th className="px-3 py-2">DPCO MRP</th>
              <th className="px-3 py-2"></th>
            </tr>
          </thead>
          <tbody className="border-0">
            {variants.map((variant, idx) => (
              <tr key={idx} className="">
                <td className="px-3 py-2">
                  <Input
                    className="w-24 text-xs"
                    value={variant.strength}
                    onChange={(e) =>
                      handleVariantChange(idx, "strength", e.target.value)
                    }
                    placeholder="e.g. 500mg"
                  />
                </td>
                <td className="px-3 py-2">
                  <Select
                    className="w-28 text-xs"
                    value={variant.dosageForm}
                    onChange={(e) =>
                      handleVariantChange(idx, "dosageForm", e.target.value)
                    }
                  >
                    <option disabled value="">
                      Select
                    </option>
                    <option value="Tablet">Tablet</option>
                    <option value="Syrup">Syrup</option>
                    <option value="Injection">Injection</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Other">Other</option>
                  </Select>
                </td>
                <td className="px-3 py-2">
                  <Input
                    className="w-28 text-xs"
                    value={variant.brandName}
                    onChange={(e) =>
                      handleVariantChange(idx, "brandName", e.target.value)
                    }
                    placeholder="Brand Name"
                  />
                </td>
                <td className="px-3 py-2">
                  <Input
                    className="w-20 text-xs"
                    value={variant.packSize}
                    onChange={(e) =>
                      handleVariantChange(idx, "packSize", e.target.value)
                    }
                    placeholder="Pack Size"
                  />
                </td>
                <td className="px-3 py-2">
                  <Input
                    className="w-20 text-xs"
                    type="number"
                    value={variant.mrp}
                    onChange={(e) =>
                      handleVariantChange(idx, "mrp", e.target.value)
                    }
                    placeholder="MRP"
                  />
                </td>
                <td className="px-3 py-2">
                  <Select
                    className="w-20 text-xs"
                    value={variant.dpco_applicable}
                    onChange={(e) =>
                      handleVariantChange(
                        idx,
                        "dpco_applicable",
                        e.target.value === "true"
                      )
                    }
                  >
                    <option value={false}>No</option>
                    <option value={true}>Yes</option>
                  </Select>
                </td>
                <td className="px-3 py-2">
                  <Input
                    className="w-20 text-xs"
                    type="number"
                    value={variant.dpco_mrp}
                    onChange={(e) =>
                      handleVariantChange(idx, "dpco_mrp", e.target.value)
                    }
                    placeholder="DPCO MRP"
                  />
                </td>
                <td className="px-3 py-2 text-center">
                  <button
                    type="button"
                    className="text-red-500 hover:text-red-700 font-bold px-2 py-1 rounded"
                    onClick={() => removeVariant(idx)}
                    title="Remove Variant"
                  >
                    <X className="w-4 h-4 cursor-pointer" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Button
        onClick={addVariant}
        className="mt-4"
        variant="primary"
        size="sm"
        startIcon={<Plus className="w-4 h-4" />}
      >
        Add Variant
      </Button>
    </div>
  );
};

export default SaltVariTable;
