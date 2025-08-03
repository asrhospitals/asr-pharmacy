import React, { useState, useEffect } from "react";
import Button from "../../../componets/common/Button";
import { Plus } from "lucide-react";
import { useGetBillsQuery, useDeleteBillMutation } from "../../../services/salesBillApi";
import InventoryPageLayout from "../../../componets/layout/InventoryPageLayout";
import Pagination from '../../../componets/common/Pagination';
import { useDebounce } from '../../../utils/useDebounce';
import { useNavigate } from "react-router-dom";

const BillList = ({ onCreate, onEdit }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { data, isLoading } = useGetBillsQuery({ page, limit, search: debouncedSearch });
  const [deleteBill] = useDeleteBillMutation();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (data?.data && data.data.length > 0) {
      setSelectedRow((prev) => {
        if (!prev || !data.data.find((s) => s.id === prev.id)) {
          return data.data[0];
        }
        return prev;
      });
    }
  }, [data]);

  const columns = [
    { key: "billNo", title: "Bill No." },
    { key: "date", title: "Date" },
    { key: "patientName", title: "Patient Name" },
    { key: "partyName", title: "Party" },
    { key: "status", title: "Status" },
    { key: "amount", title: "₹ Amount" },
  ];

  const handleAddItem = () => {
    navigate("/sales/bill/create");
    if (onCreate) onCreate();
  };

  const handleEdit = (row) => {
    if (onEdit) onEdit(row.id);
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleDelete = async (id) => {
    await deleteBill(id);
  };

  const handleKeyDown = (e) => {
    if (!data?.data || data.data.length === 0) return;
    if (!selectedRow) return;
    const idx = data.data.findIndex((s) => s.id === selectedRow.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < data.data.length - 1 ? idx + 1 : 0;
      setSelectedRow(data.data[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : data.data.length - 1;
      setSelectedRow(data.data[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <InventoryPageLayout
      title="GST Invoice List"
      actions={[
        <Button key="add" onClick={handleAddItem}>
          <Plus className="w-4 h-4 mr-2" /> Create Bill
        </Button>,
      ]}
      search={search}
      onSearchChange={e => { setSearch(e.target.value); setPage(1); }}
      tableData={data?.data || []}
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

export default BillList; 