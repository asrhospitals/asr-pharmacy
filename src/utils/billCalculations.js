/**
 * Bill Calculation Utilities for Frontend
 */

export const calculateItemAmount = (quantity, rate) => {
  return parseFloat((quantity * rate).toFixed(2));
};

export const calculateDiscountAmount = (amount, discountPercent) => {
  return parseFloat((amount * (discountPercent / 100)).toFixed(2));
};

export const calculateTaxAmount = (amount, taxPercent) => {
  return parseFloat((amount * (taxPercent / 100)).toFixed(2));
};

export const processBillItem = (item, billLevelTaxes = {}) => {
  const quantity = parseFloat(item.quantity) || 1;
  const rate = parseFloat(item.rate) || 0;
  const mrp = parseFloat(item.mrp) || rate;
  const discountPercent = parseFloat(item.discountPercent) || 0;
  
  // Use item-level taxes if provided, otherwise use bill-level taxes
  const igstPercent = item.igstPercent !== undefined && item.igstPercent !== null ? parseFloat(item.igstPercent) : (billLevelTaxes.igstPercent || 0);
  const cgstPercent = item.cgstPercent !== undefined && item.cgstPercent !== null ? parseFloat(item.cgstPercent) : (billLevelTaxes.cgstPercent || 0);
  const sgstPercent = item.sgstPercent !== undefined && item.sgstPercent !== null ? parseFloat(item.sgstPercent) : (billLevelTaxes.sgstPercent || 0);
  const cessPercent = item.cessPercent !== undefined && item.cessPercent !== null ? parseFloat(item.cessPercent) : (billLevelTaxes.cessPercent || 0);

  // Calculate base amount
  const baseAmount = calculateItemAmount(quantity, rate);

  // Calculate discount
  const discountAmount = calculateDiscountAmount(baseAmount, discountPercent);
  const amountAfterDiscount = baseAmount - discountAmount;

  // Calculate taxes
  const igstAmount = calculateTaxAmount(amountAfterDiscount, igstPercent);
  const cgstAmount = calculateTaxAmount(amountAfterDiscount, cgstPercent);
  const sgstAmount = calculateTaxAmount(amountAfterDiscount, sgstPercent);
  const cessAmount = calculateTaxAmount(amountAfterDiscount, cessPercent);

  // Final amount
  const finalAmount = amountAfterDiscount + igstAmount + cgstAmount + sgstAmount + cessAmount;

  return {
    ...item,
    quantity,
    rate,
    mrp,
    discountPercent,
    discountAmount,
    igstPercent,
    igstAmount,
    cgstPercent,
    cgstAmount,
    sgstPercent,
    sgstAmount,
    cessPercent,
    cessAmount,
    amount: parseFloat(finalAmount.toFixed(2)),
  };
};

export const calculateBillTotals = (items, billDiscountPercent = 0, taxes = {}) => {
  const billLevelTaxes = {
    igstPercent: parseFloat(taxes.igstPercent) || 0,
    cgstPercent: parseFloat(taxes.cgstPercent) || 0,
    sgstPercent: parseFloat(taxes.sgstPercent) || 0,
    cessPercent: parseFloat(taxes.cessPercent) || 0,
  };

  // Process all items
  const processedItems = items.map(item => processBillItem(item, billLevelTaxes));

  // Calculate subtotal from item amounts (which already include item-level taxes)
  const subtotalBeforeBillDiscount = processedItems.reduce((sum, item) => sum + (item.amount || 0), 0);

  // Calculate item-level discounts
  const itemDiscount = processedItems.reduce((sum, item) => sum + (item.discountAmount || 0), 0);

  // Calculate bill-level discount
  const billDiscountAmount = calculateDiscountAmount(subtotalBeforeBillDiscount, billDiscountPercent);

  // Amount after all discounts
  const amountAfterDiscount = subtotalBeforeBillDiscount - billDiscountAmount;

  // Calculate bill-level taxes
  const billIgstAmount = calculateTaxAmount(amountAfterDiscount, billLevelTaxes.igstPercent);
  const billCgstAmount = calculateTaxAmount(amountAfterDiscount, billLevelTaxes.cgstPercent);
  const billSgstAmount = calculateTaxAmount(amountAfterDiscount, billLevelTaxes.sgstPercent);
  const billCessAmount = calculateTaxAmount(amountAfterDiscount, billLevelTaxes.cessPercent);

  // Total amount
  const totalTaxAmount = billIgstAmount + billCgstAmount + billSgstAmount + billCessAmount;
  const totalAmount = amountAfterDiscount + totalTaxAmount;

  return {
    items: processedItems,
    subtotal: parseFloat(subtotalBeforeBillDiscount.toFixed(2)),
    itemDiscount: parseFloat(itemDiscount.toFixed(2)),
    billDiscountPercent,
    billDiscountAmount: parseFloat(billDiscountAmount.toFixed(2)),
    igstPercent: billLevelTaxes.igstPercent,
    igstAmount: parseFloat(billIgstAmount.toFixed(2)),
    cgstPercent: billLevelTaxes.cgstPercent,
    cgstAmount: parseFloat(billCgstAmount.toFixed(2)),
    sgstPercent: billLevelTaxes.sgstPercent,
    sgstAmount: parseFloat(billSgstAmount.toFixed(2)),
    cessPercent: billLevelTaxes.cessPercent,
    cessAmount: parseFloat(billCessAmount.toFixed(2)),
    totalTaxAmount: parseFloat(totalTaxAmount.toFixed(2)),
    totalAmount: parseFloat(totalAmount.toFixed(2)),
    paidAmount: 0,
    dueAmount: parseFloat(totalAmount.toFixed(2)),
  };
};

export const getPaymentStatus = (totalAmount, paidAmount) => {
  if (paidAmount >= totalAmount) return 'Paid';
  if (paidAmount > 0) return 'Partial';
  return 'Unpaid';
};

export const formatCurrency = (value) => {
  return parseFloat(value || 0).toFixed(2);
};
