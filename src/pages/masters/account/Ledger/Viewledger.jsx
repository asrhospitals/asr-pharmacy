import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, RefreshCw } from "lucide-react";
import DataTable from "../../../../componets/common/DataTable";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Button from "../../../../componets/common/Button";
import Loader from "../../../../componets/common/Loader";
import { showToast } from "../../../../componets/common/Toast";
import {
  useGetLedgersQuery,
  useDeleteLedgerMutation,
} from "../../../../services/ledgerApi";
import CommonPageLayout from "../../../../componets/layout/CommonPageLayout";

const Viewledger = () => {
  const [search, setSearch] = useState("");
  const [selectedSearchField, setSelectedSearchField] = useState("ledgerName");
  const [selectedRow, setSelectedRow] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const searchOptions = [
    { value: "ledgerName", label: "Ledger Name" },
    { value: "groupName", label: "Group Name" },
    { value: "balanceType", label: "Balance Type" },
  ];

  const columns = [
    {
      key: "ledgerName",
      title: "Ledger Name",
      render: (value, row) => (
        <div className="font-medium text-gray-900">{value}</div>
      ),
    },
    {
      key: "groupName",
      title: "Group",
      render: (value, row) => row.Group?.groupName || "-",
    },
    {
      key: "balanceType",
      title: "Balance Type",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === "Debit"
              ? "bg-blue-100 text-blue-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "openingBalance",
      title: "Opening Balance",
      render: (value) => {
        const formattedAmount = new Intl.NumberFormat("en-IN", {
          style: "currency",
          currency: "INR",
          minimumFractionDigits: 2,
        }).format(value || 0);
        return (
          <div className="font-medium text-gray-900">{formattedAmount}</div>
        );
      },
    },
    {
      key: "isActive",
      title: "Status",
      render: (value) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            value ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {value ? "Active" : "Inactive"}
        </span>
      ),
    },
  ];

  const {
    data: ledgerData,
    isLoading,
    isFetching,
    error,
    refetch,
  } = useGetLedgersQuery({
    search,
    page,
    limit: limit,
  });

  useEffect(() => {
    if (ledgerData?.data) {
      setData(ledgerData?.data);
    }
  }, [ledgerData]);

  const pagination = ledgerData?.pagination;

  const [deleteLedger] = useDeleteLedgerMutation();

  useEffect(() => {
    if (data?.data && data.data.length > 0 && !selectedRow) {
      setSelectedRow(data.data[0]);
    }
  }, [data, selectedRow]);

  const handleAddLedger = () => {
    navigate("/master/account/ledger/create");
  };

  const handleEdit = (row) => {
    navigate(`/master/account/ledger/edit/${row.id}`);
  };

  const handleDelete = async (row) => {
    if (
      window.confirm(
        `Are you sure you want to delete ledger "${row.ledgerName}"?`
      )
    ) {
      try {
        await deleteLedger(row.id).unwrap();
        showToast("Ledger deleted successfully", "success");
      } catch (error) {
        showToast(error?.data?.message || "Failed to delete ledger", "error");
      }
    }
  };

  const handleViewDetails = (row) => {
    navigate(`/master/account/ledger/details/${row.id}`);
  };

  const handleRowSelect = (row) => {
    setSelectedRow(row);
  };

  const handleKeyDown = (e) => {
    if (!data?.data || data.data.length === 0) return;
    if (!selectedRow) return;
    const idx = data.data.findIndex((l) => l.id === selectedRow.id);
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

  const handleLoadMore = () => {
    if (pagination?.totalItems > limit) {
      setLimit(limit + 10);
    }
  };

  return (
    <CommonPageLayout
      title="Ledger Management"
      actions={[
        <Button key="add" onClick={handleAddLedger}>
          <Plus className="w-4 h-4 mr-2" /> Create Ledger
        </Button>,
      ]}
      justifyBetween={true}
      search={search}
      onSearchChange={(e) => {
        setSearch(e.target.value);
        setPage(1);
      }}
      tableData={data || []}
      columns={columns}
      isLoading={isLoading}
      selectedRow={selectedRow}
      onRowSelect={handleRowSelect}
      onAdd={handleAddLedger}
      onEdit={handleEdit}
      onDelete={(row) => handleDelete(row)}
      onView={handleViewDetails}
      onArrowNavigation={handleKeyDown}
      // rowInfoPanel={
      //   // selectedRow && (
      //     <div className="flex flex-col gap-1 text-xs">
      //       <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
      //         <div className="border border-gray-300 rounded-lg p-1 bg-gray-50">
      //           <div className="font-semibold mb-0.5">Ledger Name</div>
      //           <div>{selectedRow?.ledgerName || "-"}</div>
      //           <div className="font-semibold mb-0.5 mt-1">Group</div>
      //           <div>{selectedRow?.Group?.groupName || "-"}</div>
      //           <div className="font-semibold mb-0.5 mt-1">Balance Type</div>
      //           <div>{selectedRow?.balanceType || "-"}</div>
      //         </div>
      //         <div className="border border-gray-300 rounded-lg p-1 bg-gray-50">
      //           <div className="font-semibold mb-0.5">Opening Balance</div>
      //           <div>
      //             ₹
      //             {new Intl.NumberFormat("en-IN").format(
      //               selectedRow?.openingBalance || 0
      //             )}
      //           </div>
      //           <div className="font-semibold mb-0.5 mt-1">Status</div>
      //           <div>{selectedRow?.isActive ? "Active" : "Inactive"}</div>
      //           <div className="font-semibold mb-0.5 mt-1">Description</div>
      //           <div>{selectedRow?.description || "-"}</div>
      //         </div>
      //       </div>
      //       <div className="grid grid-cols-2 gap-1 bg-gray-100 rounded p-1 mt-1 text-xs">
      //         <div>
      //           <b>Parent Ledger:</b> {selectedRow?.parentLedger || "-"}
      //         </div>
      //         <div>
      //           <b>Created:</b>{" "}
      //           {selectedRow?.createdAt
      //             ? new Date(selectedRow?.createdAt).toLocaleDateString("en-IN")
      //             : "-"}
      //         </div>
      //       </div>
      //     </div>
      //   // )
      // }
      loadMore={true}
      handleLoadMore={handleLoadMore}
      isMoreLoading={isFetching}
      maxDataLoaded={pagination?.totalItems <= limit}
    />
  );
};

export default Viewledger;
