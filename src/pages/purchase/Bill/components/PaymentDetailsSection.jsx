import React from "react";
import Input from "../../../../componets/common/Input";

const PaymentDetailsSection = ({
  paymentMode,
  setPaymentMode,
  cashDenominations,
  setCashDenominations,
}) => {
  const calculateTotalCash = () => {
    return Object.keys(cashDenominations).reduce(
      (sum, denom) => sum + denom * cashDenominations[denom],
      0
    );
  };

  return (
    <div className="pb-6 border-b border-gray-200">
      <h3 className="text-lg font-bold text-gray-800 mb-4">Payment Details</h3>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Payment Mode
        </label>
        <div className="flex gap-4">
          {["cash", "online", "cheque", "credit"].map((mode) => (
            <label key={mode} className="flex items-center">
              <input
                type="radio"
                value={mode}
                checked={paymentMode === mode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="mr-2"
              />
              <span className="text-gray-700 capitalize">{mode}</span>
            </label>
          ))}
        </div>
      </div>

      {paymentMode === "cash" && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Cash Denominations
          </label>
          <div className="grid grid-cols-5 gap-3">
            {Object.keys(cashDenominations).map((denomination) => (
              <div key={denomination}>
                <label className="block text-xs text-gray-600 mb-1">
                  ₹{denomination}
                </label>
                <Input
                  type="number"
                  min="0"
                  value={cashDenominations[denomination]}
                  onChange={(e) =>
                    setCashDenominations({
                      ...cashDenominations,
                      [denomination]: parseInt(e.target.value) || 0,
                    })
                  }
                  placeholder="0"
                  className="text-center text-sm"
                />
                <div className="text-xs text-gray-600 mt-1 text-center">
                  = ₹{(denomination * cashDenominations[denomination]).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm font-semibold text-gray-800">
              Total Cash: ₹{calculateTotalCash().toFixed(2)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentDetailsSection;
