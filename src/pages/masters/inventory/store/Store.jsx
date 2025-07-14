import React, { useState, useEffect, useRef } from "react";
import AddStore from "./AddStore";
import Button from "../../../../componets/common/Button";
import { Plus } from "lucide-react";
import { useGetStoresQuery } from "../../../../services/storeApi";
import Loader from "../../../../componets/common/Loader";
import {
  useEditStoreMutation,
  useDeleteStoreMutation,
} from "../../../../services/storeApi";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";

const StorePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editStoreData, setEditStoreData] = useState(null);
  const { data: stores, error, isLoading, refetch } = useGetStoresQuery();
  const [editStore] = useEditStoreMutation();
  const [deleteStore] = useDeleteStoreMutation();
  const [selectedStore, setSelectedStore] = useState(null);

  useEffect(() => {
    if (stores && stores.length > 0) {
      setSelectedStore((prev) => {
        if (!prev || !stores.find((s) => s.id === prev.id)) {
          return stores[0];
        }
        return prev;
      });
    }
  }, [stores]);

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

  const handleRowSelect = (row) => {
    setSelectedStore(row);
  };

  const handleKeyDown = (e) => {
    if (!stores || stores.length === 0) return;
    if (!selectedStore) return;
    const idx = stores.findIndex((s) => s.id === selectedStore.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < stores.length - 1 ? idx + 1 : 0;
      setSelectedStore(stores[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : stores.length - 1;
      setSelectedStore(stores[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <>
      <InventoryPageLayout
        title="Store Management"
        subtitle="Manage your Store"
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" /> Add Store
          </Button>,
        ]}
        tableData={stores || []}
        columns={columns}
        isLoading={isLoading}
        selectedRow={selectedStore}
        onRowSelect={handleRowSelect}
        onAdd={handleAddItem}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onArrowNavigation={handleKeyDown}
        rowInfoPanel={
          <>
            <b>Address</b>
            <div className="mt-1 text-gray-700 text-sm">
              {selectedStore?.address1 || (
                <span className="text-gray-400">No address available</span>
              )}
            </div>
          </>
        }
      />
      <AddStore isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddStore
        initialData={editStoreData}
        onSave={handleEditSave}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditStoreData(null);
        }}
      />
    </>
  );
};

export default StorePage;
