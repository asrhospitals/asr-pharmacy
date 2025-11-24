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

export const processBillItem = (item) => {
  const quantity = parseFloat(item.quantity) || 1;
  const rate = parseFloat(item.rate) || 0;
  const mrp = parseFloat(item.mrp) || rate;
  const discountPercent = parseFloat(item.discountPercent) || 0;
  const cgstPercent = parseFloat(item.cgstPercent) || 0;
  const sgstPercent = parseFloat(item.sgstPercent) || 0;

  // Calculate base amount
  const baseAmount = calculateItemAmount(quantity, rate);

  // Calculate discount
  const discountAmount = calculateDiscountAmount(baseAmount, discountPercent);
  const amountAfterDiscount = baseAmount - discountAmount;

  // Calculate taxes
  const cgstAmount = calculateTaxAmount(amountAfterDiscount, cgstPercent);
  const sgstAmount = calculateTaxAmount(amountAfterDiscount, sgstPercent);

  // Final amount
  const finalAmount = amountAfterDiscount + cgstAmount + sgstAmount;

  return {
    ...item,
    quantity,
    rate,
    mrp,
    discountPercent,
    discountAmount,
    cgstPercent,
    cgstAmount,
    sgstPercent,
    sgstAmount,
    amount: parseFloat(finalAmount.toFixed(2)),
  };
};

export const calculateBillTotals = (items, billDiscountPercent = 0, cgstPercent = 0, sgstPercent = 0) => {
  // Process all items
  const processedItems = items.map(item => processBillItem(item));

  // Calculate subtotal
  const subtotal = processedItems.reduce((sum, item) => sum + (item.amount || 0), 0);

  // Calculate item-level discounts
  const itemDiscount = processedItems.reduce((sum, item) => sum + (item.discountAmount || 0), 0);

  // Calculate bill-level discount
  const billDiscountAmount = calculateDiscountAmount(subtotal, billDiscountPercent);

  // Amount after all discounts
  const amountAfterDiscount = subtotal - billDiscountAmount;

  // Calculate bill-level taxes
  const billCgstAmount = calculateTaxAmount(amountAfterDiscount, cgstPercent);
  const billSgstAmount = calculateTaxAmount(amountAfterDiscount, sgstPercent);

  // Total amount
  const totalAmount = amountAfterDiscount + billCgstAmount + billSgstAmount;

  return {
    items: processedItems,
    subtotal: parseFloat(subtotal.toFixed(2)),
    itemDiscount: parseFloat(itemDiscount.toFixed(2)),
    billDiscountPercent,
    billDiscountAmount: parseFloat(billDiscountAmount.toFixed(2)),
    cgstPercent,
    cgstAmount: parseFloat(billCgstAmount.toFixed(2)),
    sgstPercent,
    sgstAmount: parseFloat(billSgstAmount.toFixed(2)),
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
