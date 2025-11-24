import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CommonPageLayout from "../../../../componets/layout/CommonPageLayout";
import { useGetPurchaseMastersQuery, useDeletePurchaseMasterMutation } from "../../../../services/purchaseMasterApi";
import { useGetLedgersQuery } from "../../../../services/ledgerApi";
import { showToast } from "../../../../componets/common/Toast";
import { Edit, Trash2, Plus } from "lucide-react";
import Button from "../../../../componets/common/Button";
import ConfirmationModal from "../../../../componets/common/ConfirmationModal";
import useConfirmation from "../../../../hooks/useConfirmation";

const PurchaseMaster = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [data, setData] = useState([]);
  const prevDataRef = useRef([]);

  const { 
    data: purchaseMastersData, 
    isLoading, 
    isFetching,
    refetch 
  } = useGetPurchaseMastersQuery({
    page,
    limit,
    search,
  });

  const { data: ledgersData } = useGetLedgersQuery({ limit: 100 });
  const [deletePurchaseMaster] = useDeletePurchaseMasterMutation();

  const { 
    confirmationState, 
    showConfirmation, 
    hideConfirmation, 
    setDeleting, 
    handleConfirm, 
    handleCancel 
  } = useConfirmation();

  // Reset to page 1 when search changes
  useEffect(() => {
    setPage(1);
    setData([]);
    prevDataRef.current = [];
  }, [search]);

  // Append new data when page changes - with duplicate prevention
  useEffect(() => {
    if (purchaseMastersData?.data && purchaseMastersData.data.length > 0) {
      // First, remove duplicates within the incoming data itself
      const uniqueIncomingData = Array.from(
        new Map(purchaseMastersData.data.map(item => [item.id, item])).values()
      );

      if (page === 1) {
        setData(uniqueIncomingData);
        prevDataRef.current = uniqueIncomingData;
      } else {
        // Get existing IDs as a Set for faster lookup
        const existingIds = new Set(prevDataRef.current.map(item => item.id));
        
        // Filter out items that already exist
        const uniqueNewData = uniqueIncomingData.filter(
          item => !existingIds.has(item.id)
        );
        
        // Only update if we have new data
        if (uniqueNewData.length > 0) {
          const updatedData = [...prevDataRef.current, ...uniqueNewData];
          setData(updatedData);
          prevDataRef.current = updatedData;
        }
      }
    }
  }, [purchaseMastersData, page]);

  const pagination = purchaseMastersData?.pagination;
  const hasMore = pagination ? page < pagination.totalPages : false;

  useEffect(() => {
    if (data && data.length > 0 && !selectedRow) {
      setSelectedRow(data[0]);
    }
  }, [data, selectedRow]);

  const handleAdd = () => {
    navigate("/master/accounts/purchase/create");
  };

  const handleEdit = (row) => {
    navigate(`/master/accounts/purchase/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    try {
      await deletePurchaseMaster(row.id).unwrap();
      showToast("Purchase master deleted successfully", "success");
      // Reset pagination after delete
      setPage(1);
      setData([]);
      prevDataRef.current = [];
      refetch();
    } catch (error) {
      showToast(error?.data?.message || "Failed to delete purchase master", "error");
    }
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const loadMore = () => {
    if (pagination && page < pagination.totalPages && !isFetching) {
      setPage(prev => prev + 1);
    }
  };

  const columns = [
    {
      key: "purchaseType",
      title: "Name",
      render: (value, row) => (
        <div className="font-medium text-gray-900 flex items-center gap-2">
          {value}
          {row.isDefault && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Default
            </span>
          )}
        </div>
      ),
    },
    {
      key: "igstPercentage",
      title: "IGST %",
      render: (value, row) => (
        <div className="text-gray-600">{value}%</div>
      ),
    },
    {
      key: "cgstPercentage",
      title: "CGST %",
      render: (value, row) => (
        <div className="text-gray-600">{value}%</div>
      ),
    },
    {
      key: "sgstPercentage",
      title: "SGST %",
      render: (value, row) => (
        <div className="text-gray-600">{value}%</div>
      ),
    },
    {
      key: "cessPercentage",
      title: "Cess %",
      render: (value, row) => (
        <div className="text-gray-600">{value}%</div>
      ),
    },
    {
      key: "taxability",
      title: "Taxability",
      render: (value, row) => (
        <div className="text-gray-600">{value}</div>
      ),
    },
    {
      key: "status",
      title: "Status",
      render: (value, row) => (
        <span
          className={`px-2 py-1 text-xs font-medium rounded-full ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
  ];

  const actions = [
    <Button key="add" onClick={handleAdd} variant="primary">
      <Plus size={16} /> Create
    </Button>,
  ];

  const rowInfoPanel = selectedRow && (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
      <div>
        <span className="font-medium text-gray-700">Purchase Type:</span>
        <p className="text-gray-900 flex items-center gap-2">
          {selectedRow.purchaseType}
          {selectedRow.isDefault && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Default
            </span>
          )}
        </p>
      </div>
      <div>
        <span className="font-medium text-gray-700">Local Purchase Ledger:</span>
        <p className="text-gray-900">{selectedRow.localPurchaseLedger?.ledgerName}</p>
      </div>
      <div>
        <span className="font-medium text-gray-700">Central Purchase Ledger:</span>
        <p className="text-gray-900">{selectedRow.centralPurchaseLedger?.ledgerName}</p>
      </div>

      <div>
        <span className="font-medium text-gray-700">IGST Ledger:</span>
        <p className="text-gray-900">{selectedRow.igstLedger?.ledgerName}</p>
      </div>
      <div>
        <span className="font-medium text-gray-700">CGST Ledger:</span>
        <p className="text-gray-900">{selectedRow.cgstLedger?.ledgerName}</p>
      </div>
      <div>
        <span className="font-medium text-gray-700">SGST Ledger:</span>
        <p className="text-gray-900">{selectedRow.sgstLedger?.ledgerName}</p>
      </div>
      <div>
        <span className="font-medium text-gray-700">CESS Ledger:</span>
        <p className="text-gray-900">{selectedRow.cessLedger?.ledgerName}</p>
      </div>
      {selectedRow.description && (
        <div className="col-span-2 md:col-span-4">
          <span className="font-medium text-gray-700">Description:</span>
          <p className="text-gray-900">{selectedRow.description}</p>
        </div>
      )}
    </div>
  );

  return (
    <>
      <CommonPageLayout
        title="Purchase Master (Purchase Only)"
        actions={actions}
        search={search}
        onSearchChange={(e) => setSearch(e.target.value)}
        tableData={data || []}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        selectedRow={selectedRow}
        onRowSelect={handleRowSelect}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={(row) => showConfirmation(() => handleDelete(row))}
        rowInfoPanel={rowInfoPanel}
        hasMore={hasMore}
        onLoadMore={loadMore}
      />

      <ConfirmationModal
        isOpen={confirmationState.isOpen}
        onClose={hideConfirmation}
        onConfirm={handleConfirm}
        title="Delete Purchase Master"
        message="Are you sure you want to delete this purchase master? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        type="danger"
      />
    </>
  );
};

export default PurchaseMaster;