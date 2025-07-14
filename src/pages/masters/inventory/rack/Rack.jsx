import React, { useState, useEffect } from "react";
import AddRack from "./AddRack";
import Button from '../../../../componets/common/Button';
import { Plus } from "lucide-react";
import { useDeleteRackMutation, useEditRackMutation, useGetRacksQuery } from '../../../../services/rackApi';
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";

const RackPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editRackData, setEditRackData] = useState(null);
  const { data: racksData, error, isLoading, refetch } = useGetRacksQuery();
  const [editRack] = useEditRackMutation();
  const [deleteRack] = useDeleteRackMutation();
  const [selectedRow, setSelectedRow] = useState(null);

  const racks = racksData?.data || [];

  useEffect(() => {
    if (racks && racks.length > 0) {
      setSelectedRow((prev) => {
        if (!prev || !racks.find((r) => r.id === prev.id)) {
          return racks[0];
        }
        return prev;
      });
    }
  }, [racks]);

  const columns = [
    { key: "rackname", title: "Rack Name" },
    { key: "storename", title: "Store Name" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleDelete = async (id) => {
    await deleteRack(id);
  };
  const handleEdit = (row) => {
    setEditRackData(row);
    setEditModalOpen(true);
  };

  const handleEditSave = async (formData) => {
    await editRack({ id: editRackData.id, ...formData });
    setEditModalOpen(false);
    setEditRackData(null);
    refetch();
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleKeyDown = (e) => {
    if (!racks || racks.length === 0) return;
    if (!selectedRow) return;
    const idx = racks.findIndex((r) => r.id === selectedRow.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < racks.length - 1 ? idx + 1 : 0;
      setSelectedRow(racks[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : racks.length - 1;
      setSelectedRow(racks[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <>
      <InventoryPageLayout
        title="Rack Management"
        subtitle="Manage your Rack"
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" /> Add Rack
          </Button>,
        ]}
        tableData={racks}
        columns={columns}
        isLoading={isLoading}
        selectedRow={selectedRow}
        onRowSelect={handleRowSelect}
        onAdd={handleAddItem}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
        onArrowNavigation={handleKeyDown}
        rowInfoPanel={
          selectedRow && (
            <div className="flex flex-col gap-1 text-sm">
              <div><b>Rack Name:</b> {selectedRow.rackname}</div>
              <div><b>Store Name:</b> {selectedRow.storename}</div>
            </div>
          )
        }
      />
      <AddRack isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddRack
        initialData={editRackData}
        onSave={handleEditSave}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditRackData(null);
        }}
      />
    </>
  );
};

export default RackPage;