import { useState, useEffect } from "react";
import axios from "axios";
import PageHeader from "../../../../componets/common/PageHeader";
import { Plus, RefreshCw } from "lucide-react";
import DataTable from "../../../../componets/common/DataTable";
import Input from '../../../../componets/common/Input';
import Select from '../../../../componets/common/Select';
import Button from '../../../../componets/common/Button';
import Modal from '../../../../componets/common/Modal';
import Loader from '../../../../componets/common/Loader';

const Viewledger = () => {
  const [ledger, setLedger] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const columns = [
    { key: "companyname", title: "Ledger Name" },
    { key: "companyname", title: "Station" },
    { key: "companyname", title: "Balance" },
  ];

  const handleLoadLedger = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/inventory/company/v1/get-companies`
      );
      if (response.status === 200) {
        const ledgerData = response.data || [];
        console.log(ledgerData);
        setLedger(ledgerData);
      }
    } catch (error) {
      setError(error.response?.data?.message || "Failed to load company");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleLoadLedger();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ledger Management"
        subtitle="Manage your Ledger"
        actions={[
          <Button
            key="add"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Ledger
          </Button>,
        ]}
      />

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
          <Loader />
        ) : ledger.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">No Party available.</div>
            <button
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first party
            </button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={ledger}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
          />
        )}
      </div>
    </div>
  );
};

export default Viewledger;
