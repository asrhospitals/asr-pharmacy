import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import CreateItemModal from "./AddItem";
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
    <div className="space-y-6">
      <PageHeader
        title="Items Management"
        subtitle="Manage your inventory items"
        actions={[
          <Button
            key="add"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4" /> Add Item
          </Button>,
        ]}
      />
      {/* Error Message */}
      {error && (
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
      )}
      <div className="p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={items}
            title={"Item"}
            handleAddItem={handleAddItem}
            onRowClick={handleRowClick}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
          />
        )}
      </div>
      {/* Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <CreateItemModal />
      </Modal>
    </div>
  );
};

export default ItemsPage;
