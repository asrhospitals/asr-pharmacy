import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import AddRack from "./AddRack";
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';
import { Plus,RefreshCw  } from "lucide-react";
import { useGetRacksQuery } from '../../../../services/rackApi';
import Loader from '../../../../componets/common/Loader';

const RackPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: racks, error, isLoading, refetch } = useGetRacksQuery();

  const columns = [
    {key: "rackname", title: "Rack Name" },
    { key: "storename", title: "Store Name" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch(); // Refetch racks after closing modal (in case a new rack was added)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Rack Management"
        subtitle="Manage your Rack"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4" />Add Rack
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error?.data?.message || 'Failed to load racks'}</div>
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
        ) : (!racks || racks.length === 0) ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No racks available.
            </div>
            <Button
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first rack
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={racks?.data}
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
        <AddRack />
      </Modal>
    </div>
  );
}

export default RackPage;