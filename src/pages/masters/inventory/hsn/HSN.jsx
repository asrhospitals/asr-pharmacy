import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import { Plus, RefreshCw } from "lucide-react";
import AddHSN from "./AddHSN";
import { useGetHSNsQuery } from "../../../../services/hsnApi";
import Button from "../../../../componets/common/Button";
import Modal from "../../../../componets/common/Modal";
import Loader from "../../../../componets/common/Loader";

const HSNPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: hsn, error, isLoading, refetch } = useGetHSNsQuery();

  const columns = [
    { key: "hsnsacname", title: "Name" },
    { key: "hsnSacCode", title: "HSN Code" },
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch(); // Refetch HSNs after closing modal (in case a new HSN was added)
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-8 max-w-full">
      <PageHeader
        title="HSN Management"
        subtitle="Manage your HSN/SAC"
        actions={[
          <Button key="add" onClick={handleAddItem} className="w-full sm:w-auto">
            <Plus className="w-4 h-4" />
            Create HSN/SAC
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-2 sm:p-4 max-w-full sm:max-w-md mx-auto text-xs sm:text-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="text-red-600">
              {error?.data?.message || "Failed to load hsn code"}
            </div>
            <Button
              onClick={() => {}}
              className="text-red-400 hover:text-red-600 text-lg font-bold ml-0 sm:ml-4"
            >
              ×
            </Button>
          </div>
        </div>
      )}
      <div className="p-2 sm:p-4 md:p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            title={"HSN"}
            columns={columns}
            data={hsn}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
            handleAddItem={handleAddItem}
          />
        )}
      </div>
      {/* Modal */}
      <AddHSN isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default HSNPage;
