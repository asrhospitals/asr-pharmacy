import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import { Plus, RefreshCw } from "lucide-react";
import AddMFR from "./AddMFR";
import { useGetManufacturersQuery } from "../../../../services/mfrApi";
import Button from "../../../../componets/common/Button";
import Modal from "../../../../componets/common/Modal";
import Loader from "../../../../componets/common/Loader";

const MFRPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: mfr, error, isLoading, refetch } = useGetManufacturersQuery();

  const columns = [{ key: "mfrname", title: "Company Name" }];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch(); // Refetch manufacturers after closing modal (in case a new manufacturer was added)
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Manufacturer Management"
        subtitle="Manage your Manufacturer"
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" />
            Add Manufacturer
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">
              {error?.data?.message || "Failed to load manufacturers"}
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
            title={"Manufacturer"}
            columns={columns}
            data={mfr}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
            handleAddItem={handleAddItem}
          />
        )}
      </div>
      {/* Modal */}
      <AddMFR isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default MFRPage;
