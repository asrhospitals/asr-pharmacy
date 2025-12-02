/**
 * Pricing Validation Utilities
 * Validates relationships between MRP, CP (Cost Price), Cost, and SP (Selling Price)
 */

export const PRICING_RULES = {
  MRP: "Maximum Retail Price",
  CP: "Cost Price / Purchase Rate",
  COST: "Cost",
  SP: "Selling Price"
};

/**
 * Validate pricing relationships
 * @param {Object} prices - Object containing mrp, cp, cost, sp
 * @returns {Object} - Object containing warnings and errors
 */
export const validatePricing = (prices) => {
  const { mrp = 0, cp = 0, cost = 0, sp = 0 } = prices;

  const mrpVal = parseFloat(mrp) || 0;
  const cpVal = parseFloat(cp) || 0;
  const costVal = parseFloat(cost) || 0;
  const spVal = parseFloat(sp) || 0;

  const warnings = {};
  const errors = {};

  // Rule 1: CP should not exceed MRP
  if (mrpVal > 0 && cpVal > 0 && cpVal > mrpVal) {
    errors.cp = "Purchase Price should not exceed MRP";
  }

  // Rule 2: SP should not exceed MRP
  if (mrpVal > 0 && spVal > 0 && spVal > mrpVal) {
    errors.sp = "Selling Price should not exceed MRP";
  }

  // Rule 3: Cost should not exceed CP
  if (cpVal > 0 && costVal > 0 && costVal > cpVal) {
    errors.cost = "Cost should not exceed Purchase Price";
  }

  // Rule 4: SP should be >= CP (no loss on purchase)
  if (cpVal > 0 && spVal > 0 && spVal < cpVal) {
    errors.sp = "Selling Price should be greater than or equal to Purchase Price";
  }

  // Rule 5: SP should be >= Cost
  if (costVal > 0 && spVal > 0 && spVal < costVal) {
    errors.sp = "Selling Price should be greater than Cost";
  }

  // Rule 6: Cost should not exceed SP
  if (costVal > 0 && spVal > 0 && costVal > spVal) {
    errors.cost = "Cost should not exceed Selling Price";
  }

  // Warning: Low margin
  if (cpVal > 0 && spVal > 0) {
    const margin = ((spVal - cpVal) / cpVal) * 100;
    if (margin < 0) {
      warnings.margin = "Negative margin detected - selling at loss";
    } else if (margin < 5) {
      warnings.margin = `Low margin: ${margin.toFixed(2)}% (Consider increasing selling price)`;
    }
  }

  // Warning: High margin
  if (cpVal > 0 && spVal > 0) {
    const margin = ((spVal - cpVal) / cpVal) * 100;
    if (margin > 100) {
      warnings.margin = `High margin: ${margin.toFixed(2)}% (Consider reviewing pricing)`;
    }
  }

  // Warning: All prices should be positive
  if (mrpVal < 0 || cpVal < 0 || costVal < 0 || spVal < 0) {
    errors.general = "All prices must be positive values";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    warnings,
    calculations: {
      margin: cpVal > 0 && spVal > 0 ? ((spVal - cpVal) / cpVal) * 100 : 0,
      markup: cpVal > 0 && spVal > 0 ? ((spVal - cpVal) / spVal) * 100 : 0,
      profitPerUnit: spVal - cpVal,
      profitPercentage: cpVal > 0 ? ((spVal - cpVal) / cpVal) * 100 : 0
    }
  };
};

/**
 * Get pricing validation message
 * @param {string} field - Field name (mrp, cp, cost, sp)
 * @param {Object} validationResult - Result from validatePricing
 * @returns {string} - Error or warning message
 */
export const getPricingMessage = (field, validationResult) => {
  if (validationResult.errors[field]) {
    return {
      type: "error",
      message: validationResult.errors[field]
    };
  }
  if (validationResult.warnings[field]) {
    return {
      type: "warning",
      message: validationResult.warnings[field]
    };
  }
  return null;
};

/**
 * Calculate profit metrics
 * @param {number} cp - Cost Price
 * @param {number} sp - Selling Price
 * @returns {Object} - Profit metrics
 */
export const calculateProfitMetrics = (cp, sp) => {
  const cpVal = parseFloat(cp) || 0;
  const spVal = parseFloat(sp) || 0;

  if (cpVal === 0) {
    return {
      profitPerUnit: 0,
      profitPercentage: 0,
      margin: 0,
      markup: 0
    };
  }

  const profitPerUnit = spVal - cpVal;
  const profitPercentage = (profitPerUnit / cpVal) * 100;
  const margin = profitPercentage;
  const markup = (profitPerUnit / spVal) * 100;

  return {
    profitPerUnit: parseFloat(profitPerUnit.toFixed(2)),
    profitPercentage: parseFloat(profitPercentage.toFixed(2)),
    margin: parseFloat(margin.toFixed(2)),
    markup: parseFloat(markup.toFixed(2))
  };
};

/**
 * Suggest selling price based on cost and desired margin
 * @param {number} cp - Cost Price
 * @param {number} desiredMarginPercent - Desired margin percentage
 * @returns {number} - Suggested selling price
 */
export const suggestSellingPrice = (cp, desiredMarginPercent = 20) => {
  const cpVal = parseFloat(cp) || 0;
  const marginPercent = parseFloat(desiredMarginPercent) || 20;

  if (cpVal === 0) return 0;

  const suggestedSP = cpVal * (1 + marginPercent / 100);
  return parseFloat(suggestedSP.toFixed(2));
};

/**
 * Validate if price is within acceptable range
 * @param {number} price - Price to validate
 * @param {number} minPrice - Minimum acceptable price
 * @param {number} maxPrice - Maximum acceptable price
 * @returns {Object} - Validation result
 */
export const validatePriceRange = (price, minPrice = 0, maxPrice = 999999) => {
  const priceVal = parseFloat(price) || 0;
  const minVal = parseFloat(minPrice) || 0;
  const maxVal = parseFloat(maxPrice) || 999999;

  const isValid = priceVal >= minVal && priceVal <= maxVal;
  const message = !isValid 
    ? `Price must be between ${minVal} and ${maxVal}`
    : null;

  return {
    isValid,
    message
  };
};

/**
 * Format price for display
 * @param {number} price - Price to format
 * @returns {string} - Formatted price
 */
export const formatPrice = (price) => {
  const priceVal = parseFloat(price) || 0;
  return priceVal.toFixed(2);
};

/**
 * Get pricing summary
 * @param {Object} prices - Object containing mrp, cp, cost, sp
 * @returns {Object} - Pricing summary
 */
export const getPricingSummary = (prices) => {
  const { mrp = 0, cp = 0, cost = 0, sp = 0 } = prices;

  const mrpVal = parseFloat(mrp) || 0;
  const cpVal = parseFloat(cp) || 0;
  const costVal = parseFloat(cost) || 0;
  const spVal = parseFloat(sp) || 0;

  const profitMetrics = calculateProfitMetrics(cpVal, spVal);

  return {
    mrp: formatPrice(mrpVal),
    cp: formatPrice(cpVal),
    cost: formatPrice(costVal),
    sp: formatPrice(spVal),
    profitPerUnit: formatPrice(profitMetrics.profitPerUnit),
    profitPercentage: profitMetrics.profitPercentage.toFixed(2),
    margin: profitMetrics.margin.toFixed(2),
    markup: profitMetrics.markup.toFixed(2),
    discount: mrpVal > 0 && spVal > 0 ? formatPrice(mrpVal - spVal) : "0.00",
    discountPercent: mrpVal > 0 && spVal > 0 ? (((mrpVal - spVal) / mrpVal) * 100).toFixed(2) : "0.00"
  };
};
