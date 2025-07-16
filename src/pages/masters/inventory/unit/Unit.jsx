import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import AddUnit from "../unit/AddUnit";
import { useDeleteUnitMutation, useEditUnitMutation, useGetUnitsQuery } from "../../../../services/unitApi";
import Button from "../../../../componets/common/Button";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";

const UnitPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUnitData, setEditUnitData] = useState(null);
  const { data: units = [], error, isLoading, refetch } = useGetUnitsQuery();
  const [editUnit] = useEditUnitMutation();
  const [deleteUnit] = useDeleteUnitMutation();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (units && units.length > 0) {
      setSelectedRow((prev) => {
        if (!prev || !units.find((u) => u.id === prev.id)) {
          return units[0];
        }
        return prev;
      });
    }
  }, [units]);

  const columns = [
    { key: "unitName", title: "Unit Name" },
    { key: "uqc", title: "UQC" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleDelete = async (row) => {
    await deleteUnit(row.id);
  };
  const handleEdit = (row) => {
    setEditUnitData(row);
    setEditModalOpen(true);
  };

  const handleEditSave = async (formData) => {
    await editUnit({ id: editUnitData.id, ...formData });
    setEditModalOpen(false);
    setEditUnitData(null);
    refetch();
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleKeyDown = (e) => {
    if (!units || units.length === 0) return;
    if (!selectedRow) return;
    const idx = units.findIndex((u) => u.id === selectedRow.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < units.length - 1 ? idx + 1 : 0;
      setSelectedRow(units[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : units.length - 1;
      setSelectedRow(units[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <>
      <InventoryPageLayout
        title="Unit Management"
        subtitle="Manage your Unit"
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" /> Create Unit
          </Button>,
        ]}
        tableData={units}
        columns={columns}
        isLoading={isLoading}
        selectedRow={selectedRow}
        onRowSelect={handleRowSelect}
        onAdd={handleAddItem}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
        onArrowNavigation={handleKeyDown}
      />
      <AddUnit isOpen={isModalOpen} onClose={handleCloseModal} />
      <AddUnit
        initialData={editUnitData}
        onSave={handleEditSave}
        isOpen={editModalOpen}
        onClose={() => {
          setEditModalOpen(false);
          setEditUnitData(null);
        }}
      />
    </>
  );
};

export default UnitPage;
