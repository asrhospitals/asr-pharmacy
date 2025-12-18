import React from "react";

const TotalSection = ({ calculations, formatCurrency }) => {
  return (
    <div className="flex justify-end">
      <div className="p-6 w-96 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-2 border-green-200">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-700">Subtotal:</span>
            <span className="font-semibold">
              ₹{formatCurrency(calculations.subtotal)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Total Discount:</span>
            <span className="font-semibold">
              -₹
              {formatCurrency(
                calculations.itemDiscount + calculations.billDiscountAmount
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-700">Total Tax:</span>
            <span className="font-semibold">
              ₹{formatCurrency(calculations.totalTaxAmount)}
            </span>
          </div>
          <div className="border-t border-green-300 pt-3 flex justify-between text-lg font-bold text-green-700">
            <span>Total Amount:</span>
            <span>₹{formatCurrency(calculations.totalAmount)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalSection;
