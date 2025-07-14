import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import AddStore from "./AddStore";
import Button from "../../../../componets/common/Button";
import Modal from "../../../../componets/common/Modal";
import { Plus, RefreshCw } from "lucide-react";
import { useGetStoresQuery } from "../../../../services/storeApi";
import Loader from "../../../../componets/common/Loader";
import {
  useEditStoreMutation,
  useDeleteStoreMutation,
} from "../../../../services/storeApi";

const StorePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStoreData, setEditStoreData] = useState(null);
  const { data: stores, error, isLoading, refetch } = useGetStoresQuery();
  const [editStore, { isLoading: isEditing }] = useEditStoreMutation();
  const [deleteStore] = useDeleteStoreMutation();

  const columns = [{ key: "storename", title: "Store Name" }];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleEdit = (row) => {
    setEditStoreData(row);
    setEditModalOpen(true);
  };

  const handleEditSave = async (formData) => {
    await editStore({ id: editStoreData.id, ...formData });
    setEditModalOpen(false);
    setEditStoreData(null);
    refetch();
  };

  const handleDelete = async (row) => {
    if (window.confirm("Are you sure you want to delete this store?")) {
      await deleteStore(row.id);
      refetch();
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Store Management"
        subtitle="Manage your Store"
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" />
            Add Store
          </Button>,
        ]}
      />
      {/* Error Message */}
      {/* {error && (
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
      )} */}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            title={"Store"}
            columns={columns}
            data={stores}
            handleAddItem={handleAddItem}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      {/* Modal */}
      <AddStore isOpen={isModalOpen} onClose={handleCloseModal} />
      
      {/* Edit Modal */}
      <AddStore
        initialData={editStoreData}
        onSave={handleEditSave}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditStoreData(null);
        }}
      />
    </div>
  );
};

export default StorePage;
