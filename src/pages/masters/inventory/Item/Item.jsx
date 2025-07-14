import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import { useState } from "react";
import { Plus, RefreshCw } from "lucide-react";
import { useGetItemsQuery } from "../../../../services/itemApi";
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';
import Loader from '../../../../componets/common/Loader';
import { useNavigate } from "react-router-dom";
import SearchableSelect from '../../../../componets/common/SearchableSelect';
import { useGetStoresQuery } from '../../../../services/storeApi';
import Input from '../../../../componets/common/Input';
import Select from '../../../../componets/common/Select';

const ItemsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: items, error, isLoading, refetch } = useGetItemsQuery();
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState("");
  const [searchField, setSearchField] = useState("Description");
  const [selectedStore, setSelectedStore] = useState("");
  const { data: stores = [] } = useGetStoresQuery();

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

  const handleEdit = (row) => {
    navigate(`/master/inventory/items/edit/${row.id}`);
  };

  // Filter items by search and store
  const filteredItems = (items || []).filter((item) => {
    const matchesSearch =
      !search ||
      (item[searchField.toLowerCase()] || "")
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase());
    const matchesStore = !selectedStore || item.storeId === selectedStore;
    return matchesSearch && matchesStore;
  });

  return (
    <div className="space-y-4 sm:space-y-6 max-w-full">
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
      {/* Top Bar (below header) */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 justify-between px-6">
        <div className="flex flex-col sm:flex-row gap-2 flex-1">
          <Input
            type="text"
            className="w-full sm:w-64"
            placeholder="Search here.."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <Select
            className="w-full sm:w-40"
            value={searchField}
            onChange={e => setSearchField(e.target.value)}
          >
            <option value="Description">Description</option>
            {/* Add more fields if needed */}
          </Select>
          <Select
            className="w-full sm:w-40"
            value={selectedStore}
            onChange={e => setSelectedStore(e.target.value)}
          >
            <option value="" disabled>Select Store</option>
            {stores.map(s => (
              <option key={s.id} value={s.id}>{s.storename}</option>
            ))}
          </Select>
        </div>
        <div className="text-right text-xs sm:text-sm text-gray-600 flex-shrink-0">
          Total no of items: <span className="font-semibold">{filteredItems.length}</span>
        </div>
      </div>
      <div className="p-2 sm:p-4 md:p-6">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            columns={columns}
            data={filteredItems}
            title={"Item"}
            handleAddItem={handleAddItem}
            onEdit={handleEdit}
            onDelete={(row) => console.log("Delete:", row)}
            selectedRow={selectedRow}
            onRowSelect={setSelectedRow}
          />
        )}
      </div>
      {/* Bottom Info Section */}
      {selectedRow && (
        <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2 mt-2 text-xs sm:text-sm">
          {/* Purchase Info */}
          <div className="border rounded bg-white p-2 flex flex-col min-h-[90px]">
            <div className="font-semibold border-b mb-1">Purchase Info</div>
            <div>M.R.P : <b>₹ {selectedRow.price}</b></div>
            <div>Pur. Rate : <b>₹ {selectedRow.purchasePrice || "-"}</b></div>
            <div>Cost : <b>₹ {selectedRow.cost || "-"}</b></div>
            <div>Cost+Tax : <b>₹ {selectedRow.costWithTax || "-"}</b></div>
            <div>Pur. Disc : <b>{selectedRow.purchaseDiscount || "-"}</b></div>
          </div>
          {/* Sale Info */}
          <div className="border rounded bg-white p-2 flex flex-col min-h-[90px]">
            <div className="font-semibold border-b mb-1">Sale Info</div>
            <div>Rate : <b>₹ {selectedRow.salerate || selectedRow.price || "-"}</b></div>
            <div>Margin % : <b>{selectedRow.margin || "-"}</b></div>
            <div>Deal Free : <b>{selectedRow.dealFree || "-"}</b></div>
            <div>W/o Deal : <b>{selectedRow.withoutDeal || "-"}</b></div>
          </div>
          {/* Tax Info */}
          <div className="border rounded bg-white p-2 flex flex-col min-h-[90px]">
            <div className="font-semibold border-b mb-1">Tax Info</div>
            <div>HSN/SAC : <b>{selectedRow.hsnsac || "-"}</b></div>
            <div>IGST % : <b>{selectedRow.igst || "-"}</b></div>
            <div>CGST % : <b>{selectedRow.cgst || "-"}</b></div>
            <div>SGST % : <b>{selectedRow.sgst || "-"}</b></div>
          </div>
          {/* Other Info */}
          <div className="border rounded bg-white p-2 flex flex-col min-h-[90px]">
            <div className="font-semibold border-b mb-1">Other Info</div>
            <div>Company : <b>{selectedRow.company || "-"}</b></div>
            <div>Mfr. : <b>{selectedRow.mfr || "-"}</b></div>
            <div>Conv. : <b>{selectedRow.conversion || "-"}</b></div>
            <div>Salt : <b>{selectedRow.salt || "-"}</b></div>
            <div>Rack No. : <b>{selectedRow.rack || "-"}</b></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemsPage;
