import React, { useState } from "react";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";
import Button from "../../../../componets/common/Button";
import { Plus } from "lucide-react";
import { useGetPatientsQuery } from "../../../../services/patientApi";
import { useDebounce } from "../../../../utils/useDebounce";

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
  const handleAddItem = () => {
    console.log("Add Item");
  };
  return (
    <>
      <InventoryPageLayout
        title={"Patient"}
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" /> Add Store
          </Button>,
        ]}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        tableData={[]}
      />
    </>
  );
};

export default Patient;
