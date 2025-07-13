import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { useGetItemsQuery } from "../../../../services/itemApi";
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';
import Loader from '../../../../componets/common/Loader';
import { useNavigate } from "react-router-dom";

const ItemsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: items, error, isLoading, refetch } = useGetItemsQuery();
  const [selectedRow, setSelectedRow] = useState(null);

  console.log(error);
  
  const navigate = useNavigate();

  const columns = [
    { key: "productname", title: "Item Name" },
    { key: "packing", title: "Packing" },
    { key: "company", title: "Company" },
    { key: "stock", title: "Stock" },
    { key: "unit1", title: "Unit" },
    { key: "price", title: "M.R.P" },
  ];

  const handleAddItem = () => {
    navigate("/master/inventory/items/create");
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    refetch();
  };

  const handleRowClick = (row) => {
    if (row && row.id) {
      navigate(`/master/inventory/items/${row.id}`);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6 px-2 sm:px-4 md:px-8 max-w-full">
      <PageHeader
        title="Items Management"
        subtitle="Manage your inventory items"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
            className="w-full sm:w-auto"
          >
            <Plus className="w-4 h-4" /> Add Item
          </Button>,
        ]}
      />
      {/* Error Message */}
      {/* {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">
              {error?.data?.message || "Failed to load items"}
            </div>
            <Button
              onClick={() => {}}
              className="text-red-400 hover:text-red-600 text-lg font-bold ml-4"
            >
              ×
            </Button>
          </div>
        </div>
      )} */}
      <div className="p-2 sm:p-4 md:p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={items}
            title={"Item"}
            handleAddItem={handleAddItem}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
            selectedRow={selectedRow}
            onRowSelect={setSelectedRow}
          />
        )}
      </div>
      {/* Details Section */}
      {selectedRow && (
        <div className="bg-white rounded-lg shadow-md p-2 sm:p-4 mt-4">
          <h2 className="text-base sm:text-lg font-bold mb-2">Selected Item Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
            <div><strong>Name:</strong> {selectedRow.productname}</div>
            <div><strong>Packing:</strong> {selectedRow.packing}</div>
            <div><strong>Company:</strong> {selectedRow.company}</div>
            <div><strong>Stock:</strong> {selectedRow.stock}</div>
            <div><strong>Unit:</strong> {selectedRow.unit1}</div>
            <div><strong>M.R.P:</strong> {selectedRow.price}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsPage;
