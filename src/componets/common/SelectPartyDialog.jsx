import React, { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import { useGetLedgersQuery } from "../../services/ledgerApi";

const SelectPartyDialog = ({ open, onClose, onSelectParty }) => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const { data: ledgersData, isLoading } = useGetLedgersQuery({ limit: 100 });

  const filteredLedgers = useMemo(() => {
    if (!ledgersData?.data) return [];
    
    let filtered = ledgersData.data.filter(ledger =>
      ledger.name?.toLowerCase().includes(search.toLowerCase()) ||
      ledger.address?.toLowerCase().includes(search.toLowerCase())
    );

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "balance") {
      filtered.sort((a, b) => (b.balance || 0) - (a.balance || 0));
    }

    return filtered;
  }, [ledgersData, search, sortBy]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-5xl max-h-[85vh] flex flex-col bg-white rounded-lg shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <h2 className="text-lg font-bold">Select Party</h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-blue-800 rounded transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search and Filter */}
        <div className="p-4 border-b bg-gray-25 flex gap-4 items-center flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search Party..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="balance">Sort by Balance</option>
          </select>
          <div className="text-sm text-gray-600 font-medium">
            Total: {filteredLedgers.length}
          </div>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center h-32">
              <div className="loader"></div>
            </div>
          ) : (
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-blue-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 min-w-[300px]">Ledger Name</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700 min-w-[120px]">Status</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700 min-w-[120px]">Balance</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-700 min-w-[100px]">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredLedgers.length > 0 ? (
                  filteredLedgers.map((ledger, idx) => (
                    <tr
                      key={ledger.id}
                      className={`border-b hover:bg-blue-50 cursor-pointer transition ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-25"
                      }`}
                    >
                      <td className="px-4 py-3 min-w-[300px]">
                        <div className="font-medium text-gray-900 truncate">{ledger.name}</div>
                        <div className="text-xs text-gray-500 truncate">{ledger.address}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs font-medium">
                          {ledger.status || "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-gray-900">
                        ₹{parseFloat(ledger.balance || 0).toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => {
                            onSelectParty(ledger);
                            onClose();
                          }}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs font-medium transition"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-4 py-8 text-center text-gray-500">
                      No parties found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelectPartyDialog;
