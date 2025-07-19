import { useNavigate } from "react-router-dom";
import { useGetItemsQuery } from "../../../../services/itemApi";
import { useGetStoresQuery } from "../../../../services/storeApi";
import { useState } from "react";
import Button from "../../../../componets/common/Button";
import { Plus } from "lucide-react";
import Input from "../../../../componets/common/Input";
import Select from "../../../../componets/common/Select";
import Loader from "../../../../componets/common/Loader";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";
import Pagination from '../../../../componets/common/Pagination';
import { useDebounce } from '../../../../utils/useDebounce';

const ItemsPage = () => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);
  const [searchField, setSearchField] = useState("Description");
  const [selectedStore, setSelectedStore] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const navigate = useNavigate();

  const { data, isLoading } = useGetItemsQuery({ page, limit, search: debouncedSearch, filters: selectedStore ? { storeid: selectedStore } : {} });
  const { data: stores = [] } = useGetStoresQuery();  
  // const [deleteItem] = useDeleteItemMutation();

  const handleAddItem = () => navigate("/master/inventory/items/create");

  const columns = [
    { key: "productname", title: "Item Name" },
    { key: "packing", title: "Packing" },
    { key: "company", title: "Company" },
    { key: "stock", title: "Stock" },
    { key: "unit1", title: "Unit" },
    { key: "price", title: "M.R.P" },
  ];

  return (
    <InventoryPageLayout
      title="Items Management"
      actions={[
        <Button key="add" onClick={handleAddItem}>
          <Plus className="w-4 h-4" /> Add Item
        </Button>,
      ]}
      search={search}
      onSearchChange={(e) => { setSearch(e.target.value); setPage(1); }}
      searchOptions={[{ value: "description", label: "Description" }]}
      selectedSearchField={searchField}
      onSearchFieldChange={(e) => setSearchField(e.target.value)}
      extraFilters={
        <Select
          className="w-full sm:w-40"
          value={selectedStore}
          onChange={(e) => { setSelectedStore(e.target.value); setPage(1); }}
        >
          <option value="">All Stores</option>
          {stores?.data?.map((store) => (
            <option key={store.id} value={store.id}>
              {store.storename}
            </option>
          ))}
        </Select>
      }
      tableData={data?.data || []}
      columns={columns}
      isLoading={isLoading}
      selectedRow={selectedRow}
      onRowSelect={setSelectedRow}
      onAdd={handleAddItem}
      onEdit={(row) => console.log("Edit:", row)}
      onDelete={(row) => console.log("Delete:", row)}
      rowInfoPanel={
        selectedRow && (
          <div className="w-full grid grid-cols-1 md:grid-cols-4 gap-2 text-xs sm:text-sm">
            <div className="border rounded bg-white p-2">
              <div className="font-semibold border-b mb-1">Purchase Info</div>
              <div>M.R.P : <b>₹ {selectedRow.price}</b></div>
              <div>Pur. Rate : <b>₹ {selectedRow.purchasePrice || "-"}</b></div>
              <div>Cost : <b>₹ {selectedRow.cost || "-"}</b></div>
              <div>Cost+Tax : <b>₹ {selectedRow.costWithTax || "-"}</b></div>
              <div>Pur. Disc : <b>{selectedRow.purchaseDiscount || "-"}</b></div>
            </div>
            <div className="border rounded bg-white p-2">
              <div className="font-semibold border-b mb-1">Sale Info</div>
              <div>Rate : <b>₹ {selectedRow.salerate || selectedRow.price || "-"}</b></div>
              <div>Margin % : <b>{selectedRow.margin || "-"}</b></div>
              <div>Deal Free : <b>{selectedRow.dealFree || "-"}</b></div>
              <div>W/o Deal : <b>{selectedRow.withoutDeal || "-"}</b></div>
            </div>
            <div className="border rounded bg-white p-2">
              <div className="font-semibold border-b mb-1">Tax Info</div>
              <div>HSN/SAC : <b>{selectedRow.hsnsac || "-"}</b></div>
              <div>IGST % : <b>{selectedRow.igst || "-"}</b></div>
              <div>CGST % : <b>{selectedRow.cgst || "-"}</b></div>
              <div>SGST % : <b>{selectedRow.sgst || "-"}</b></div>
            </div>
            <div className="border rounded bg-white p-2">
              <div className="font-semibold border-b mb-1">Other Info</div>
              <div>Company : <b>{selectedRow.company || "-"}</b></div>
              <div>Mfr. : <b>{selectedRow.mfr || "-"}</b></div>
              <div>Conv. : <b>{selectedRow.conversion || "-"}</b></div>
              <div>Salt : <b>{selectedRow.salt || "-"}</b></div>
              <div>Rack No. : <b>{selectedRow.rack || "-"}</b></div>
            </div>
          </div>
        )
      }
    >
      <Pagination
        page={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </InventoryPageLayout>
  );
};

export default ItemsPage;
