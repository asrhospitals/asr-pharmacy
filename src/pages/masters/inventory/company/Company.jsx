import React, { useState } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import Button from "../../../../componets/common/Button";
import { Plus, RefreshCw } from "lucide-react";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
} from "../../../../services/companyApi";
import Loader from "../../../../componets/common/Loader";
import { useNavigate } from "react-router-dom";

const CompanyPage = () => {
  const { data: company, error, isLoading, refetch } = useGetCompaniesQuery();
  const [deleteCompany] = useDeleteCompanyMutation();
  const navigate = useNavigate();
  const columns = [{ key: "companyname", title: "Company Name" }];

  const handleAddItem = () => {
    navigate("/master/inventory/company/create");
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    refetch();
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-8 max-w-full">
      <PageHeader
        title="Company Management"
        subtitle="Manage your Comapany"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
            startIcon={<Plus className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Add Company
          </Button>,
        ]}
      />
      {/* Error Message */}
      {/* {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">
              {error?.data?.message || "Failed to load company"}
            </div>
            <Button
              onClick={() => {}}
              className="text-red-400 hover:text-red-600 text-lg font-bold ml-4"
            >
              ×
            </Button>
          </div>
        </div>
      )} */}
      <div className="p-2 sm:p-4 md:p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            title="Company"
            columns={columns}
            handleAddItem={handleAddItem}
            data={company}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => handleDelete(row.id)}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyPage;
