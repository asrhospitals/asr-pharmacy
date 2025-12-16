import React from "react";

const SaleTotalSection = ({ calculations, formatCurrency }) => {
  return (
    <div className="flex justify-end">
      <div className="p-6 w-96 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-2 border-blue-200">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal:</span>
            <span className="font-semibold text-gray-900">
              ₹{formatCurrency(calculations.subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Total Discount:</span>
            <span className="font-semibold text-gray-900">
              -₹
              {formatCurrency(
                calculations.itemDiscount + calculations.billDiscountAmount
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Total Tax:</span>
            <span className="font-semibold text-gray-900">
              ₹
              {formatCurrency(
                calculations.cgstAmount + calculations.sgstAmount
              )}
            </span>
          </div>
          <div className="border-t border-blue-300 pt-3 flex justify-between text-lg font-bold text-blue-700">
            <span>Invoice Value:</span>
            <span>₹{formatCurrency(calculations.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleTotalSection;
