import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import AddSalt from "../salt/AddSalt";
import Button from "../../../../componets/common/Button";
import Modal from "../../../../componets/common/Modal";
import { Plus, RefreshCw } from "lucide-react";
import { useGetSaltsQuery } from "../../../../services/saltApi";
import Loader from "../../../../componets/common/Loader";
import { useNavigate } from "react-router-dom";

const SaltPage = () => {
  const { data: salt, error, isLoading, refetch } = useGetSaltsQuery();
  const navigate = useNavigate();

  const columns = [
    { key: "saltname", title: "Header" },
    { key: "status", title: "Status" },
  ];

  const handleAddItem = () => {
    navigate("/master/inventory/salt/create");
    
  };

  const handleEdit = (row) => {
    navigate(`/master/inventory/salt/edit/${row.id}`);
  };


  return (
    <div className="space-y-6">
      <PageHeader
        title="Salt Management"
        subtitle="Manage your Salt"
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4 mr-2" />
            Create Salt
          </Button>,
        ]}
      />
      {/* Error Message */}
      {/* {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error?.data?.message || 'Failed to load salt'}</div>
            <Button onClick={() => {}} className="text-red-400 hover:text-red-600 text-lg font-bold ml-4">
              ×
            </Button>
          </div>
        </div>
      )} */}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            title={"Salt"}
            columns={columns}
            data={salt}
            onEdit={handleEdit}
            onDelete={(row) => console.log("Delete:", row)}
            handleAddItem={handleAddItem}
          />
        )}
      </div>
      {/* Remove Modal and AddSalt */}
    </div>
  );
};

export default SaltPage;
