import React, { useState, useEffect } from "react";
import AddMFR from "./AddMFR";
import Button from "../../../../componets/common/Button";
import { Plus } from "lucide-react";
import {
  useDeleteManufacturerMutation,
  useEditManufacturerMutation,
  useGetManufacturersQuery,
} from "../../../../services/mfrApi";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";
import { useNavigate } from "react-router-dom";

const MFRPage = () => {
  const [editMFRData, setEditMFRData] = useState(null);
  const {
    data: mfr = [],
    error,
    isLoading,
    refetch,
  } = useGetManufacturersQuery();
  const [editManufacturer] = useEditManufacturerMutation();
  const [deleteManufacturer] = useDeleteManufacturerMutation();
  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (mfr && mfr.length > 0) {
      setSelectedRow((prev) => {
        if (!prev || !mfr.find((r) => r.id === prev.id)) {
          return mfr[0];
        }
        return prev;
      });
    }
  }, [mfr]);

  const columns = [
    { key: "mfrname", title: "Name" },
    { key: "mobile", title: "Mobile No." },
  ];

  const handleAddItem = () => {
    navigate("/master/inventory/manufacturers/create");
  };

  const handleDelete = async (id) => {
    await deleteManufacturer(id);
  };

  const handleEdit = (row) => {
    setEditMFRData(row);
  };

  const handleEditSave = async (formData) => {
    await editManufacturer({ id: editMFRData.id, ...formData });
    setEditMFRData(null);
    refetch();
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleKeyDown = (e) => {
    if (!mfr || mfr.length === 0) return;
    if (!selectedRow) return;
    const idx = mfr.findIndex((r) => r.id === selectedRow.id);
    if (e.key === "ArrowDown") {
      const nextIdx = idx < mfr.length - 1 ? idx + 1 : 0;
      setSelectedRow(mfr[nextIdx]);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      const prevIdx = idx > 0 ? idx - 1 : mfr.length - 1;
      setSelectedRow(mfr[prevIdx]);
      e.preventDefault();
    }
  };

  return (
    <>
      <InventoryPageLayout
        title="Manufacturer Management"
        subtitle="Manage your Manufacturer"
        actions={[
          <Button key="add" onClick={handleAddItem}>
            <Plus className="w-4 h-4" /> Add Manufacturer
          </Button>,
        ]}
        tableData={mfr}
        columns={columns}
        isLoading={isLoading}
        selectedRow={selectedRow}
        onRowSelect={handleRowSelect}
        onAdd={handleAddItem}
        onEdit={handleEdit}
        onDelete={(row) => handleDelete(row.id)}
        // onEditSave={handleEditSave}
        onArrowNavigation={handleKeyDown}
        rowInfoPanel={
          selectedRow && (
            <div className="flex flex-col gap-1 text-xs">
              <div>
                <b>Name:</b> {selectedRow.mfrname}
              </div>
              <div>
                <b>Mobile No.:</b> {selectedRow.mobile}
              </div>
            </div>
          )
        }
      />
    </>
  );
};

export default MFRPage;
