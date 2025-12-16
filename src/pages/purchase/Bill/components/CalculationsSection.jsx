import React from "react";
import Input from "../../../../componets/common/Input";

const CalculationsSection = ({ form, setForm, calculations, formatCurrency }) => {
  return (
    <div className="grid grid-cols-2 gap-4">
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
        <div className="text-xs text-gray-600 font-semibold mb-2">
          Tax Breakdown
        </div>
        <div className="text-xs space-y-1 text-gray-700">
          <div>
            IGST: {calculations.igstPercent}% = ₹
            {formatCurrency(calculations.igstAmount)}
          </div>
          <div>
            CGST: {calculations.cgstPercent}% = ₹
            {formatCurrency(calculations.cgstAmount)}
          </div>
          <div>
            SGST: {calculations.sgstPercent}% = ₹
            {formatCurrency(calculations.sgstAmount)}
          </div>
          <div>
            CESS: {calculations.cessPercent}% = ₹
            {formatCurrency(calculations.cessAmount)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationsSection;
