import React, { useState, useEffect } from "react";
import Button from "../../../../componets/common/Button";
import { Plus } from "lucide-react";
import {
  useDeleteCompanyMutation,
  useGetCompaniesQuery,
} from "../../../../services/companyApi";
import { useNavigate } from "react-router-dom";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";

const CompanyPage = () => {
  const { data: companies = [], error, isLoading, refetch } = useGetCompaniesQuery();
  const [deleteCompany] = useDeleteCompanyMutation();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (companies && companies.length > 0) {
      setSelectedRow((prev) => {
        if (!prev || !companies.find((c) => c.id === prev.id)) {
          return companies[0];
        }
        return prev;
      });
    }
  }, [companies]);

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

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleKeyDown = (e) => {
    if (!companies || companies.length === 0) return;
    if (!selectedRow) return;
    const idx = companies.findIndex((c) => c.id === selectedRow.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < companies.length - 1 ? idx + 1 : 0;
      setSelectedRow(companies[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : companies.length - 1;
      setSelectedRow(companies[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <InventoryPageLayout
      title="Company Management"
      subtitle="Manage your Company"
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
      tableData={companies}
      columns={columns}
      isLoading={isLoading}
      selectedRow={selectedRow}
      onRowSelect={handleRowSelect}
      onAdd={handleAddItem}
      onEdit={handleEdit}
      onDelete={(row) => handleDelete(row.id)}
      onArrowNavigation={handleKeyDown}
    />
  );
};

export default CompanyPage;
