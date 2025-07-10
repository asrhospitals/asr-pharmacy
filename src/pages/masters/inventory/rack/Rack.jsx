import React, { useState,useEffect } from "react";
import DataTable from "../../../../componets/common/DataTable";
import PageHeader from "../../../../componets/common/PageHeader";
import AddRack from "./AddRack"; 
import { Plus,RefreshCw  } from "lucide-react";
import axios from "axios";


const RackPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [racks, setRacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const columns = [
    {key: "rackname", title: "Rack Name" },
    { key: "storename", title: "Store Name" },
    ];

    const handleLoadStore=async()=>{
      setIsLoading(true);
      setError('');

      try {

        const response = await axios.get('http://localhost:3000/pharmacy/master/inventory/rack/v1/get-rack');
        if(response.status===200) {
        const racksData = response.data.racks || response.data || [];
        setRacks(racksData);
        // console.log(racksData)

       
        }
        
      } catch (error) {
        setError(error.response?.data?.message || 'Failed to load racks');
      } finally{
        setIsLoading(false);
      }
    }

    useEffect(() => {
      handleLoadStore();
    }, []);
  
    const handleAddItem = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };
  
    return (
      <div className="space-y-6">
        <PageHeader
          title="Rack Management"
          subtitle="Manage your Rack"
          actions={[
            <button
              key="add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              onClick={handleAddItem}
            >
              <Plus className="w-4 h-4" />Add Rack
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
              <p className="text-gray-500">Loading racks...</p>
            </div>
          </div>
        ) : racks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No racks available.
            </div>
            <button
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first rack
            </button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={racks?.data}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
          />
        )}
      </div>

      
        
        {/* Modal */}
        <AddRack 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    );
  
}

export default RackPage;