import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import AddSalt from "../salt/AddSalt";
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';
import { Plus,RefreshCw } from "lucide-react";
import { useGetSaltsQuery } from '../../../../services/saltApi';
import Loader from '../../../../componets/common/Loader';

const SaltPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: salt, error, isLoading, refetch } = useGetSaltsQuery();

  const columns = [
    { key: "saltname", title: "Header" },
    { key: "status", title: "Status" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch(); // Refetch salts after closing modal (in case a new salt was added)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Salt Management"
        subtitle="Manage your Salt"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4 mr-2" />Create Salt
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error?.data?.message || 'Failed to load salt'}</div>
            <Button onClick={() => {}} className="text-red-400 hover:text-red-600 text-lg font-bold ml-4">
              ×
            </Button>
          </div>
        </div>
      )}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (!salt || salt.length === 0) ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No Salt available.
            </div>
            <Button
              onClick={handleAddItem}
            >
              Add your first Salt
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={salt}
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
        <AddSalt />
      </Modal>
    </div>
  );
}

export default SaltPage;