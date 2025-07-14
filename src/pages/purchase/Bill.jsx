import React, { useState } from "react";
import DataTable from "../../componets/common/DataTable";
import PageHeader from "../../componets/common/PageHeader";
import { Plus,RefreshCw } from "lucide-react";
import AddBill from './AddBill';
import { useGetBillsQuery } from '../../services/billApi';
import Button from '../../componets/common/Button';
import Modal from '../../componets/common/Modal';
import Loader from '../../componets/common/Loader';

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: hsn, error, isLoading, refetch } = useGetBillsQuery();

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

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bill Management"
        subtitle="Manage your Bill"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4" />Create Bill
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error?.data?.message || 'Failed to load bills'}</div>
            <Button onClick={() => {}} className="text-red-400 hover:text-red-600 text-lg font-bold ml-4">
              ×
            </Button>
          </div>
        </div>
      )}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (!hsn || hsn.length === 0) ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No bill available
            </div>
            <Button
              onClick={handleAddItem}
            >
              Add your first bill
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={hsn}
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
        <AddBill />
      </Modal>
    </div>
  );
}

export default BillPage;