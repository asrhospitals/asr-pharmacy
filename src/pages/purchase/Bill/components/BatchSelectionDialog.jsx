import React, { useState } from "react";
import { X, Search, Plus } from "lucide-react";
import { useGetBatchesByItemQuery, useCreateBatchMutation } from "../../../../services/batchApi";
import toast from "react-hot-toast";

const BatchSelectionDialog = ({ open, onClose, onSelectBatch, itemId, itemName }) => {
  const [search, setSearch] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newBatchNumber, setNewBatchNumber] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const { data: batchesData, isLoading, refetch } = useGetBatchesByItemQuery(itemId, {
    skip: !open || !itemId,
  });
  const [createBatch] = useCreateBatchMutation();

  const batches = batchesData?.data || [];

  const filteredBatches = batches.filter((batch) =>
    batch.batchNumber.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectBatch = (batch) => {
    onSelectBatch(batch);
    setSearch("");
  };

  const handleCreateBatch = async () => {
    if (!newBatchNumber.trim()) {
      toast.error("Please enter a batch number");
      return;
    }

    setIsCreating(true);
    try {
      const result = await createBatch({
        itemId,
        batchNumber: newBatchNumber,
        quantity: 0,
      }).unwrap();

      toast.success("Batch created successfully");
      setNewBatchNumber("");
      setShowCreateForm(false);
      refetch();
    } catch (error) {
      toast.error(error?.data?.message || "Error creating batch");
    } finally {
      setIsCreating(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-96 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-800">
            {showCreateForm ? "Create New Batch" : "Select Batch"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {showCreateForm ? (
          // Create Batch Form
          <div className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Item: {itemName}
              </label>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Batch Number *
              </label>
              <input
                type="text"
                value={newBatchNumber}
                onChange={(e) => setNewBatchNumber(e.target.value)}
                placeholder="e.g., B1, BATCH001"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => {
                  setShowCreateForm(false);
                  setNewBatchNumber("");
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold text-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateBatch}
                disabled={isCreating}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold disabled:opacity-50"
              >
                {isCreating ? "Creating..." : "Create Batch"}
              </button>
            </div>
          </div>
        ) : (
          <>
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
                <div className="p-4 text-center">
                  {batches.length === 0 ? (
                    <div className="space-y-3">
                      <p className="text-gray-500">No batches available for this item</p>
                      <button
                        onClick={() => setShowCreateForm(true)}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold"
                      >
                        <Plus size={18} /> Create New Batch
                      </button>
                    </div>
                  ) : (
                    <p className="text-gray-500">No batches match your search</p>
                  )}
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {filteredBatches.map((batch) => (
                    <button
                      key={batch.id}
                      onClick={() => handleSelectBatch(batch)}
                      className="w-full text-left p-4 hover:bg-green-50 transition-colors cursor-pointer"
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
          </>
        )}
      </div>
    </div>
  );
};

export default BatchSelectionDialog;
