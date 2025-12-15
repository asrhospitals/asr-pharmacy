import React, { useState, useEffect } from "react";
import { X, Search } from "lucide-react";
import { useGetBatchesByItemQuery } from "../../../services/batchApi";
import toast from "react-hot-toast";

const BatchSelectionDialog = ({ open, onClose, onSelectBatch, itemId }) => {
  const [search, setSearch] = useState("");
  const { data: batchesData, isLoading } = useGetBatchesByItemQuery(itemId, {
    skip: !open || !itemId,
  });

  const batches = batchesData?.data || [];

  const filteredBatches = batches.filter((batch) =>
    batch.batchNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBatch = (batch) => {
    if (parseFloat(batch.quantity) <= 0) {
      toast.error("This batch has no available quantity");
      return;
    }
    onSelectBatch(batch);
    setSearch("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">Select Batch</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search batch number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Batches List */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">Loading batches...</div>
          ) : filteredBatches.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              {batches.length === 0
                ? "No batches available for this item"
                : "No batches match your search"}
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredBatches.map((batch) => (
                <button
                  key={batch.id}
                  onClick={() => handleSelectBatch(batch)}
                  disabled={parseFloat(batch.quantity) <= 0}
                  className={`w-full text-left p-4 hover:bg-green-50 transition-colors ${
                    parseFloat(batch.quantity) <= 0
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-semibold text-gray-800">
                        {batch.batchNumber}
                      </div>
                      <div className="text-sm text-gray-600 mt-1">
                        {batch.expiryDate && (
                          <span>
                            Expiry: {new Date(batch.expiryDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-800">
                        Qty: {parseFloat(batch.quantity).toFixed(2)}
                      </div>
                      {batch.mrp && (
                        <div className="text-sm text-gray-600">
                          MRP: ₹{parseFloat(batch.mrp).toFixed(2)}
                        </div>
                      )}
                      {batch.purchaseRate && (
                        <div className="text-sm text-gray-600">
                          Rate: ₹{parseFloat(batch.purchaseRate).toFixed(2)}
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchSelectionDialog;
