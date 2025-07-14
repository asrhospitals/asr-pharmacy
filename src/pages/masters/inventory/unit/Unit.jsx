import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import { Plus, RefreshCw } from "lucide-react";
import AddUnit from "../unit/AddUnit";
import { useEditUnitMutation, useGetUnitsQuery } from "../../../../services/unitApi";
import Button from "../../../../componets/common/Button";
import Modal from "../../../../componets/common/Modal";
import Loader from "../../../../componets/common/Loader";

const UnitPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editUnitData, setEditUnitData] = useState(null);
  const { data: unit, error, isLoading, refetch } = useGetUnitsQuery();
  const [editUnit, { isLoading: isEditing }] = useEditUnitMutation();

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Unit Management"
        subtitle="Manage your Unit"
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" />
            Create Unit
          </Button>,
        ]}
      />
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">
              {error?.data?.message || "Failed to load Unit"}
            </div>
            <Button
              onClick={() => {}}
              className="text-red-400 hover:text-red-600 text-lg font-bold ml-4"
            >
              ×
            </Button>
          </div>
        </div>
      )}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            title={"Unit"}
            columns={columns}
            data={unit}
            onEdit={handleEdit}
            onDelete={(row) => console.log("Delete:", row)}
            handleAddItem={handleAddItem}
          />
        )}
      </div>
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
    </div>
  );
};

export default UnitPage;
