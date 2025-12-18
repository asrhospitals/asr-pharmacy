import React from "react";
import Input from "../../../../componets/common/Input";

const SupplierTaxSection = ({
  form,
  setForm,
  onShowLedgerDialog,
  onShowPurchaseMasterDialog,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4 pb-6 border-b border-gray-200">
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Supplier Ledger *
        </label>
        <Input
          type="text"
          value={form.supplierName}
          onClick={onShowLedgerDialog}
          readOnly
          placeholder="Click to select supplier"
          className="bg-gray-50 cursor-pointer"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Purchase Master (Tax Category) *
        </label>
        <Input
          type="text"
          value={form.purchaseMasterName}
          onClick={onShowPurchaseMasterDialog}
          readOnly
          placeholder="Click to select tax category"
          className="bg-gray-50 cursor-pointer"
          required
        />
      </div>
    </div>
  );
};

export default SupplierTaxSection;
