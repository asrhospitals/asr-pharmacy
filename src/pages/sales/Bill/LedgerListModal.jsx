import React, { useState } from "react";
import Modal from "../../../componets/common/Modal.jsx";
import DataTable from "../../../componets/common/DataTable.jsx";
import StatusBadge from "../../../componets/common/StatusBadge.jsx";
import { useGetLedgersQuery } from "../../../services/ledgerApi.js";
import { useDebounce } from "../../../utils/useDebounce.js";
import Pagination from "../../../componets/common/Pagination.jsx";
import Input from "../../../componets/common/Input.jsx";
import Select from "../../../componets/common/Select.jsx";

const LedgerListModal = ({ open, onClose, onSelectLedger }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  // Sales Accounts group ID - this should match the backend group ID for "Sales Accounts"
  const SALES_GROUP_ID = "42"; // Based on defaultGroups.js

  const { data, isLoading } = useGetLedgersQuery({
    page,
    limit: 10,
    search: debouncedSearch,
    groupId: SALES_GROUP_ID,
    isActive: true,
  });

  const columns = [
    { key: "ledgerName", title: "Ledger Name" },
    // { key: "id", title: "ID" },
    // { key: "address", title: "Address" },
    {key : "station", title: "Station"},
    { key: "balance", title: "Balance" },
    {
      key: "status",
      title: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      className="max-w-full md:max-w-[50vw]"
      title="Select Party (Ledger)"
    >
      <div className="mb-2 flex gap-2 items-center justify-between">
        <div className="flex gap-2 items-center flex-1">
          <Input
            fullWidth={true}
            placeholder="Search ledger..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Select options={[{ value: "all", label: "All" }, ...columns.map(c => ({ label: c.title, value: c.key }))]} />
        </div>
      </div>
      <DataTable
        title="Ledger"
        columns={columns}
        data={data?.data || []}
        onRowSelect={(row) => {
          onSelectLedger(row);
          onClose();
        }}
        isLoading={isLoading}
      />
      <div className="mt-2">
        <Pagination
          page={page}
          totalPages={data?.totalPages || 1}
          onPageChange={setPage}
        />
      </div>
    </Modal>
  );
};

export default LedgerListModal;
