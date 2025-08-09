import React, { useEffect, useMemo, useState } from "react";
import CommonPageLayout from "../../../../componets/layout/CommonPageLayout";
import Button from "../../../../componets/common/Button";
import { Plus } from "lucide-react";
import {
  useAddPatientMutation,
  useDeletePatientMutation,
  useEditPatientMutation,
  useGetPatientsQuery,
} from "../../../../services/patientApi";
import Pagination from "../../../../componets/common/Pagination";
import { useDebounce } from "../../../../utils/useDebounce";
import { useNavigate } from "react-router-dom";
import StatusBadge from "../../../../componets/common/StatusBadge";

const Patient = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const { data: patients, isLoading } = useGetPatientsQuery({
    page,
    limit,
    search: debouncedSearch,
  });
  const [deletePatient] = useDeletePatientMutation();
  const [editPatient] = useEditPatientMutation();

  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  const tableData = useMemo(() => patients?.data || [], [patients]);

  const columns = [
    { key: "phone", title: "Mobile No" },
    { key: "id", title: "ID" },
    { key: "name", title: "Name" },
    { key: "gender", title: "Gender" },
    { key: "age", title: "Age" },
    {
      key: "status",
      title: "Status",
      render: (value) => <StatusBadge status={value} />,
    },
  ];
  
  useEffect(() => {
    if (tableData && tableData.length > 0) {
      setSelectedPatient((prev) => {
        if (!prev || !tableData.find((r) => r.id === prev.id)) {
          return tableData[0];
        }
        return prev;
      });
    }
  }, [tableData]);

  const handleAddItem = () => {
    navigate("/master/other/patient/create");
  };

  const handleDelete = async (row) => {
    try {
      await deletePatient(row.id);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (row) => {
    navigate(`/master/other/patient/edit/${row.id}`);
  };
  const handleKeyDown = (e) => {
    if (!tableData || tableData.length === 0) return;
    if (!selectedPatient) return;
    const idx = tableData.findIndex((s) => s.id === selectedPatient.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < tableData.length - 1 ? idx + 1 : 0;
      setSelectedPatient(tableData[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : tableData.length - 1;
      setSelectedPatient(tableData[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <>
      <CommonPageLayout
        title={"Patient"}
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" /> Add patient
          </Button>,
        ]}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        tableData={tableData}
        columns={columns}
        onAdd={handleAddItem}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onArrowNavigation={handleKeyDown}
      >
        <Pagination
          page={page}
          totalPages={patients?.totalPages || 1}
          onPageChange={setPage}
        />
      </CommonPageLayout>
    </>
  );
};

export default Patient;
