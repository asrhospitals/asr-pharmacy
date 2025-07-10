import React, { useState,useEffect } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import AddStore from "./AddStore";
import { Plus,RefreshCw } from "lucide-react";
import axios from "axios"


const StorePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const columns = [
    { key: "storename", title: "Store Name" },
   
    ];
  
    const handleAddItem = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleLoadStore=async()=>{
      setIsLoading(true);
      setError('');

      try {

        const response = await axios.get('http://localhost:3000/pharmacy/master/inventory/store/v1/get-store');
        if(response.status===200) {
        const storeData =  response.data || [];
        setStores(storeData);
        // console.log(racksData)

       
        }
        
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load Stores');
      } finally{
        setIsLoading(false);
      }
    }

    useEffect(() => {
      handleLoadStore();
    }, []);
  
    return (
      <div className="space-y-6">
        <PageHeader
          title="Store Management"
          subtitle="Manage your Store"
          actions={[
            <button
              key="add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              onClick={handleAddItem}
            >
              <Plus className="w-4 h-4" />Add Store
            </button>,
          ]}
        />
        
   {/* Error Message */}
   {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="text-red-600 text-sm">{error}</div>
            <button
              onClick={() => setError('')}
              className="text-red-400 hover:text-red-600 text-lg font-bold"
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
              <RefreshCw className="animate-spin mx-auto mb-4 text-gray-400" size={32} />
              <p className="text-gray-500">Loading stores...</p>
            </div>
          </div>
        ) : stores.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No Store available.
            </div>
            <button
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first store
            </button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={stores?.data}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
          />
        )}
      </div>

      
        
        {/* Modal */}
        <AddStore
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    );
  
}

export default StorePage;