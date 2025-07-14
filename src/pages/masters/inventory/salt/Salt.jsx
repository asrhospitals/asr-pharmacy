import React, { useState, useEffect } from "react";
import Button from "../../../../componets/common/Button";
import { Plus } from "lucide-react";
import { useDeleteSaltMutation, useGetSaltsQuery } from "../../../../services/saltApi";
import { useNavigate } from "react-router-dom";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";

const SaltPage = () => {
  const { data: salts = [], error, isLoading, refetch } = useGetSaltsQuery();
  const [deleteSalt] = useDeleteSaltMutation();
  const navigate = useNavigate();
  const [selectedRow, setSelectedRow] = useState(null);

  useEffect(() => {
    if (salts && salts.length > 0) {
      setSelectedRow((prev) => {
        if (!prev || !salts.find((s) => s.id === prev.id)) {
          return salts[0];
        }
        return prev;
      });
    }
  }, [salts]);

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

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleDelete = async (id) => {
    await deleteSalt(id);
  };

  const handleKeyDown = (e) => {
    if (!salts || salts.length === 0) return;
    if (!selectedRow) return;
    const idx = salts.findIndex((s) => s.id === selectedRow.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < salts.length - 1 ? idx + 1 : 0;
      setSelectedRow(salts[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : salts.length - 1;
      setSelectedRow(salts[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <InventoryPageLayout
      title="Salt Management"
      subtitle="Manage your Salt"
      actions={[
        <Button key="add" onClick={handleAddItem}>
          <Plus className="w-4 h-4 mr-2" /> Create Salt
        </Button>,
      ]}
      tableData={salts}
      columns={columns}
      isLoading={isLoading}
      selectedRow={selectedRow}
      onRowSelect={handleRowSelect}
      onAdd={handleAddItem}
      onEdit={handleEdit}
      onDelete={(row) => handleDelete(row.id)}
      onArrowNavigation={handleKeyDown}
      rowInfoPanel={
        selectedRow && (
          <div className="flex flex-col gap-1 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="border border-gray-300 rounded-lg p-1 bg-gray-50">
                <div className="font-semibold mb-0.5">Indications</div>
                <div>{selectedRow.indication || "-"}</div>
                <div className="font-semibold mb-0.5 mt-1">Dosage</div>
                <div>{selectedRow.dosage || "-"}</div>
                <div className="font-semibold mb-0.5 mt-1">Special Precautions</div>
                <div>{selectedRow.specialprecautions || "-"}</div>
              </div>
              <div className="border border-gray-300 rounded-lg p-1 bg-gray-50">
                <div className="font-semibold mb-0.5">Drug Interactions</div>
                <div>{selectedRow.druginteractions || "-"}</div>
                <div className="font-semibold mb-0.5 mt-1">Side Effects</div>
                <div>{selectedRow.sideeffects || "-"}</div>
                <div className="font-semibold mb-0.5 mt-1">Note</div>
                <div>{selectedRow.note || "-"}</div>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-1 bg-gray-100 rounded p-1 mt-1 text-xs">
              <div><b>Narcotic :</b> {selectedRow.narcotic || "-"}</div>
              <div><b>Sch-H :</b> {selectedRow.scheduleh || "-"}</div>
              <div><b>Sch-H1 :</b> {selectedRow.scheduleh1 || "-"}</div>
              <div><b>Prohibited :</b> {selectedRow.prohibited || "-"}</div>
            </div>
          </div>
        )
      }
    />
  );
};

export default SaltPage;
