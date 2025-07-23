import React, { useState } from "react";
import Modal from "../../../../componets/common/Modal";
import DataTable from "../../../../componets/common/DataTable";
import StatusBadge from "../../../../componets/common/StatusBadge";
import { useDebounce } from "../../../../utils/useDebounce";
import Pagination from "../../../../componets/common/Pagination";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import { useGetDoctorsQuery } from "../../../../services/doctorApi.js";

const DoctorListModal = ({ open, onClose, onSelectDoctor }) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const debouncedSearch = useDebounce(search, 300);

  const { data, isLoading } = useGetDoctorsQuery({
    page,
    limit: 10,
    search: debouncedSearch,
  });

  const columns = [
    { key: "phone", title: "Mobile No" },
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "regNo", title: "Reg. No." },
    { key: "gender", title: "Gender" },
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
      title="Doctor List"
    >
      <div className="mb-2 flex gap-2 items-center">
        <Input
          fullWidth={true}
          placeholder="Search here.."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Select options={[{ value: "all", label: "All" }, ...columns.map(c => ({ label: c.title, value: c.key }))]} />
      </div>
      <DataTable
        columns={columns}
        data={data?.data || []}
        onRowSelect={(row) => {
          onSelectDoctor(row);
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

export default DoctorListModal; 