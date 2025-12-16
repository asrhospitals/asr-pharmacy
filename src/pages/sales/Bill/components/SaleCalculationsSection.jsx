import React from "react";
import Input from "../../../../componets/common/Input";

const SaleCalculationsSection = ({
  form,
  setForm,
  calculations,
  formatCurrency,
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
        <div className="text-xs text-gray-600 font-semibold mb-2">
          Discount Info
        </div>
        <div className="text-sm font-semibold text-gray-900">
          Item Disc: ₹{formatCurrency(calculations.itemDiscount)}
        </div>
      </div>
      <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
        <div className="text-xs text-gray-600 font-semibold mb-2">Tax Info</div>
        <div className="text-xs space-y-1 text-gray-700">
          <div>
            CGST: {form.cgstPercent}% = ₹{formatCurrency(calculations.cgstAmount)}
          </div>
          <div>
            SGST: {form.sgstPercent}% = ₹{formatCurrency(calculations.sgstAmount)}
          </div>
        </div>
      </div>
      <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
        <label className="text-xs text-gray-600 font-semibold mb-2 block">
          Bill Discount %
        </label>
        <Input
          type="number"
          value={form.billDiscountPercent}
          onChange={(e) =>
            setForm({
              ...form,
              billDiscountPercent: parseFloat(e.target.value) || 0,
            })
          }
          step="0.01"
        />
      </div>
      <div className="p-4 bg-gray-25 rounded-lg border border-gray-200">
        <label className="text-xs text-gray-600 font-semibold mb-2 block">
          Tax %
        </label>
        <div className="flex gap-2">
          <Input
            type="number"
            value={form.cgstPercent}
            onChange={(e) =>
              setForm({ ...form, cgstPercent: parseFloat(e.target.value) || 0 })
            }
            placeholder="CGST"
            className="flex-1 text-xs"
            step="0.01"
          />
          <Input
            type="number"
            value={form.sgstPercent}
            onChange={(e) =>
              setForm({ ...form, sgstPercent: parseFloat(e.target.value) || 0 })
            }
            placeholder="SGST"
            className="flex-1 text-xs"
            step="0.01"
          />
        </div>
      </div>
    </div>
  );
};

export default SaleCalculationsSection;
