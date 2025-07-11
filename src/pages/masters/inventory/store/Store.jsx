import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import AddStore from "./AddStore";
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';
import { Plus,RefreshCw } from "lucide-react";
import { useGetStoresQuery } from '../../../../services/storeApi';
import Loader from '../../../../componets/common/Loader';

const StorePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: stores, error, isLoading, refetch } = useGetStoresQuery();

  const columns = [
    { key: "storename", title: "Store Name" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch(); // Refetch stores after closing modal (in case a new store was added)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Store Management"
        subtitle="Manage your Store"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4" />Add Store
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error?.data?.message || 'Failed to load Stores'}</div>
            <Button
              onClick={() => {}}
              className="text-red-400 hover:text-red-600 text-lg font-bold"
            >
              ×
            </Button>
          </div>
        </div>
      )}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (stores?.data?.length === 0 || !stores?.data) ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No Store available.
            </div>
            <Button
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first store
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={stores?.data}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
          />
        )}
      </div>
      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      >
        <AddStore />
      </Modal>
    </div>
  );
};

export default StorePage;