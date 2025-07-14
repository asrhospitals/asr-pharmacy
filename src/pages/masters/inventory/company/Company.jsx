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

  const handleEdit = (row) => {
    navigate(`/master/inventory/companys/edit/${row.id}`);
  };

  const handleDelete = async (id) => {
    await deleteCompany(id);
    refetch();
  };

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full">
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
      <div className="p-2 sm:p-4 md:p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            title="Company"
            columns={columns}
            handleAddItem={handleAddItem}
            data={company}
            onEdit={handleEdit}
            onDelete={(row) => handleDelete(row.id)}
          />
        )}
      </div>
    </div>
  );
};

export default CompanyPage;
