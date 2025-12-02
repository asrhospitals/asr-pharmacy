import React, { useState, useEffect } from "react";
import { SelectField, TextField } from "../../../../../componets/common/Fields";
import { validatePricing, calculateProfitMetrics, getPricingSummary } from "../../../../../utils/pricingValidation";

const RightColumn = ({ errors, register, watch }) => {
  const [pricingValidation, setPricingValidation] = useState({
    isValid: true,
    errors: {},
    warnings: {},
    calculations: {}
  });
  const [pricingSummary, setPricingSummary] = useState({});

  // Watch pricing fields for validation
  const mrp = watch?.("price");
  const cp = watch?.("purchasePrice");
  const cost = watch?.("cost");
  const sp = watch?.("salerate");

  // Validate pricing relationships
  useEffect(() => {
    const validation = validatePricing({
      mrp: parseFloat(mrp) || 0,
      cp: parseFloat(cp) || 0,
      cost: parseFloat(cost) || 0,
      sp: parseFloat(sp) || 0
    });

    setPricingValidation(validation);

    // Update pricing summary
    const summary = getPricingSummary({
      mrp: parseFloat(mrp) || 0,
      cp: parseFloat(cp) || 0,
      cost: parseFloat(cost) || 0,
      sp: parseFloat(sp) || 0
    });

    setPricingSummary(summary);
  }, [mrp, cp, cost, sp, watch]);

  return (
    <div className="space-y-3">
      {/* MRP Field */}
      <div>
        <TextField
          register={register}
          errors={errors}
          label="M.R.P (Maximum Retail Price)"
          name="price"
          type="number"
          step="0.01"
          min="0"
          validation={{
            min: { value: 0, message: "MRP must be greater than 0" },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "MRP must be a valid price"
            }
          }}
        />
        {pricingValidation.warnings.mrp && (
          <p className="text-yellow-600 text-xs mt-1">⚠️ {pricingValidation.warnings.mrp}</p>
        )}
      </div>

      {/* Purchase Price Field */}
      <div>
        <TextField
          register={register}
          errors={errors}
          label="Purchase Rate (Cost Price)"
          name="purchasePrice"
          type="number"
          step="0.01"
          min="0"
          validation={{
            min: { value: 0, message: "Purchase Price must be greater than 0" },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Purchase Price must be a valid price"
            }
          }}
        />
        {pricingValidation.errors.cp && (
          <p className="text-red-600 text-xs mt-1">❌ {pricingValidation.errors.cp}</p>
        )}
      </div>

      {/* Cost Field */}
      <div>
        <TextField
          register={register}
          errors={errors}
          label="Cost"
          name="cost"
          type="number"
          step="0.01"
          min="0"
          validation={{
            min: { value: 0, message: "Cost must be greater than 0" },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Cost must be a valid price"
            }
          }}
        />
        {pricingValidation.errors.cost && (
          <p className="text-red-600 text-xs mt-1">❌ {pricingValidation.errors.cost}</p>
        )}
      </div>

      {/* Selling Price Field */}
      <div>
        <TextField
          register={register}
          errors={errors}
          label="S.Rate (Selling Price)"
          name="salerate"
          type="number"
          step="0.01"
          min="0"
          validation={{
            min: { value: 0, message: "Selling Price must be greater than 0" },
            pattern: {
              value: /^\d+(\.\d{1,2})?$/,
              message: "Selling Price must be a valid price"
            }
          }}
        />
        {pricingValidation.errors.sp && (
          <p className="text-red-600 text-xs mt-1">❌ {pricingValidation.errors.sp}</p>
        )}
      </div>

      {/* Pricing Summary Card */}
      {(mrp || cp || cost || sp) && (
        <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
          <h4 className="font-semibold text-xs text-blue-900 mb-2">Pricing Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-700">MRP:</span>
              <span className="font-semibold">₹{pricingSummary.mrp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">CP:</span>
              <span className="font-semibold">₹{pricingSummary.cp}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Cost:</span>
              <span className="font-semibold">₹{pricingSummary.cost}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">SP:</span>
              <span className="font-semibold">₹{pricingSummary.sp}</span>
            </div>
            {pricingSummary.profitPerUnit && (
              <>
                <div className="flex justify-between col-span-2 border-t pt-2">
                  <span className="text-gray-700">Profit/Unit:</span>
                  <span className={`font-semibold ${parseFloat(pricingSummary.profitPerUnit) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{pricingSummary.profitPerUnit}
                  </span>
                </div>
                <div className="flex justify-between col-span-2">
                  <span className="text-gray-700">Margin:</span>
                  <span className={`font-semibold ${parseFloat(pricingSummary.margin) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {pricingSummary.margin}%
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Warnings */}
      {Object.keys(pricingValidation.warnings).length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <h4 className="font-semibold text-xs text-yellow-900 mb-2">⚠️ Pricing Warnings</h4>
          {Object.entries(pricingValidation.warnings).map(([key, message]) => (
            <p key={key} className="text-yellow-700 text-xs mb-1">• {message}</p>
          ))}
        </div>
      )}

      {/* Errors */}
      {Object.keys(pricingValidation.errors).length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded p-3">
          <h4 className="font-semibold text-xs text-red-900 mb-2">❌ Pricing Errors</h4>
          {Object.entries(pricingValidation.errors).map(([key, message]) => (
            <p key={key} className="text-red-700 text-xs mb-1">• {message}</p>
          ))}
        </div>
      )}
      <SelectField
        register={register}
        errors={errors}
        label="Narcotics"
        name="narcotic"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Schedule H"
        name="scheduleH"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Schedule H1"
        name="scheduleH1"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Schedule Drug"
        name="scheduledrug"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Presc. Required"
        name="prescription"
        options={["No", "Yes"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Storage Type"
        name="storagetype"
        options={["Normal", "Cold"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Status"
        name="status"
        options={["Continue", "Discontinued"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="Color Type"
        name="colortype"
        options={["---Blank---"]}
      />
      <SelectField
        register={register}
        errors={errors}
        label="TB Item"
        name="tbitem"
        options={["Normal", "Special"]}
      />
    </div>
  );
};

export default RightColumn;
