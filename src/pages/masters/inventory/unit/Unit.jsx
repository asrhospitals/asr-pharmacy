import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import { Plus,RefreshCw } from "lucide-react";
import AddUnit from "../unit/AddUnit"
import { useGetUnitsQuery } from '../../../../services/unitApi';
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';
import Loader from '../../../../componets/common/Loader';

const UnitPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: unit, error, isLoading, refetch } = useGetUnitsQuery();

  const columns = [
    { key: "unitName", title: "Unit Name" },
    { key: "uqc", title: "UQC" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch(); // Refetch units after closing modal (in case a new unit was added)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Unit Management"
        subtitle="Manage your Unit"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4" />Create Unit
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error?.data?.message || 'Failed to load Unit'}</div>
            <Button onClick={() => {}} className="text-red-400 hover:text-red-600 text-lg font-bold ml-4">
              ×
            </Button>
          </div>
        </div>
      )}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (!unit || unit.length === 0) ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No unit available.
            </div>
            <Button
              onClick={handleAddItem}
            >
              Add your first Unit
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={unit}
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
        <AddUnit />
      </Modal>
    </div>
  );
}

export default UnitPage;