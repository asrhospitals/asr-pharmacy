import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import CreateItemModal from "./AddItem";
import { useState, useEffect } from "react";
import { Plus,RefreshCw } from "lucide-react";
import axios from "axios";

const ItemsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");

  const columns = [
    { key: "productname", title: "Item Name" },
    { key: "packing", title: "Packing" },
    { key: "company", title: "Company" },
    { key: "stock", title: "Stock" },
    { key: "unit1", title: "Unit" },
    { key: "price", title: "M.R.P" },   
  ];

  const handleAddItem = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLoadItem = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(
        "http://localhost:3000/pharmacy/master/inventory/item/v1/get-item"
      );
      if (response.status === 200) {
        const itemData = response.data || [];
        setItems(itemData);
      }
    } catch (error) {
      setError(error.response.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    handleLoadItem();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Items Management"
        subtitle="Manage your inventory items"
        actions={[
          <button
            key="add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
            onClick={handleAddItem}
          >
            <Plus className="w-4 h-4" /> Add Item
          </button>,
        ]}
      />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error}</div>
            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-600 text-lg font-bold ml-4"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="p-6">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <RefreshCw
                className="animate-spin mx-auto mb-4 text-gray-400"
                size={32}
              />
              <p className="text-gray-500">Loading items...</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">No Items available.</div>
            <button
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first Item
            </button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={items}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
          />
        )}
      </div>

      {/* Modal */}
      <CreateItemModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ItemsPage;
