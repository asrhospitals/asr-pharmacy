import React, { useState, useEffect } from "react";
import AddHSN from "./AddHSN";
import Button from "../../../../componets/common/Button";
import { Plus } from "lucide-react";
import { useDeleteHSNMutation, useEditHSNMutation, useGetHSNsQuery } from "../../../../services/hsnApi";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";

const HSNPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editHSNData, setEditHSNData] = useState(null);
  const { data: hsn = [], error, isLoading, refetch } = useGetHSNsQuery();
  const [editHSN] = useEditHSNMutation();
  const [deleteHSN] = useDeleteHSNMutation();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (hsn && hsn.length > 0) {
      setSelectedRow((prev) => {
        if (!prev || !hsn.find((h) => h.id === prev.id)) {
          return hsn[0];
        }
        return prev;
      });
    }
  }, [hsn]);

  const columns = [
    { key: "hsnsacname", title: "Name" },
    { key: "hsnSacCode", title: "HSN Code" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleEdit = (row) => {
    setEditHSNData(row);
    setEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    await deleteHSN(id);
  };

  const handleEditSave = async (formData) => {
    await editHSN({ id: editHSNData.id, ...formData });
    setEditModalOpen(false);
    setEditHSNData(null);
    refetch();
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleKeyDown = (e) => {
    if (!hsn || hsn.length === 0) return;
    if (!selectedRow) return;
    const idx = hsn.findIndex((h) => h.id === selectedRow.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < hsn.length - 1 ? idx + 1 : 0;
      setSelectedRow(hsn[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : hsn.length - 1;
      setSelectedRow(hsn[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <>
      <InventoryPageLayout
        title="HSN Management"
        subtitle="Manage your HSN/SAC"
        actions={[
          <Button key="add" onClick={handleAddItem} className="w-full sm:w-auto">
            <Plus className="w-4 h-4" /> Create HSN/SAC
          </Button>,
        ]}
        tableData={hsn}
        columns={columns}
        isLoading={isLoading}
        selectedRow={selectedRow}
        onRowSelect={handleRowSelect}
        onAdd={handleAddItem}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
        onArrowNavigation={handleKeyDown}
      />
      <AddHSN isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddHSN
        initialData={editHSNData}
        onSave={handleEditSave}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditHSNData(null);
        }}
      />
    </>
  );
};

export default HSNPage;
