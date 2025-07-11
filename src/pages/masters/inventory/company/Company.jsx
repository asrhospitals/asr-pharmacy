import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import AddCompany from "../company/AddCompany";
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';
import { Plus,RefreshCw } from "lucide-react";
import { useGetCompaniesQuery } from '../../../../services/companyApi';
import Loader from '../../../../componets/common/Loader';

const CompanyPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: company, error, isLoading, refetch } = useGetCompaniesQuery();

  const columns = [
    { key: "companyname", title: "Company Name" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch(); // Refetch companies after closing modal (in case a new company was added)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Company Management"
        subtitle="Manage your Comapany"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4" />Add Company
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error?.data?.message || 'Failed to load company'}</div>
            <Button onClick={() => {}} className="text-red-400 hover:text-red-600 text-lg font-bold ml-4">
              ×
            </Button>
          </div>
        </div>
      )}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (!company || company.length === 0) ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No Company available.
            </div>
            <Button
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first company
            </Button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={company}
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
        <AddCompany />
      </Modal>
    </div>
  );
}

export default CompanyPage;