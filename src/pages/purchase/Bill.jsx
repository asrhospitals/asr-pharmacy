import React, { useState,useEffect } from "react";
import DataTable from "../../componets/common/DataTable";
import PageHeader from "../../componets/common/PageHeader";
import { Plus,RefreshCw } from "lucide-react";
import axios from "axios";
import AddBill from './AddBill'

const BillPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hsn, setHSN] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");


  const columns = [
    { key: "hsnsacname", title: "Name" },
    { key: "hsnSacCode", title: "HSN Code" },
   
    ];
  
    const handleAddItem = () => {
      setIsModalOpen(true);
    };
  
    const handleCloseModal = () => {
      setIsModalOpen(false);
    };

    const handleLoadUnit=async()=>{
      setIsLoading(true);
      setError('');

      try {

        const response = await axios.get('http://localhost:3000/pharmacy/master/inventory/hsn/v1/get-hsn');
        if(response.status===200) {
        const billData =  response.data || [];
        setHSN(billData);    
        }
      } catch (error) {
        setError(error.response || 'Failed to load bills');
      } finally{
        setIsLoading(false);
      }
    }

    useEffect(() => {
      handleLoadUnit();
    }, []);
  
    return (
      <div className="space-y-6">
        <PageHeader
          title="Bill Management"
          subtitle="Manage your Bill"
          actions={[
            <button
              key="add"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
              onClick={handleAddItem}
            >
              <Plus className="w-4 h-4" />Create Bill
            </button>,
          ]}
        />
        
{/* Error Message */}
{error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
    <div className="flex items-center justify-between">
      <div className="text-red-600 text-sm">{error}</div>
      <button onClick={() => setError('')} className="text-red-400 hover:text-red-600 text-lg font-bold ml-4">
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
              <p className="text-gray-500">Loading bills.....</p>
            </div>
          </div>
        ) : hsn.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-gray-400 mb-4">
              No bill available
            </div>
            <button
              onClick={handleAddItem}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Add your first bill
            </button>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={hsn}
            onEdit={(row) => console.log("Edit:", row)}
            onDelete={(row) => console.log("Delete:", row)}
          />
        )}
      </div>

      
        
        {/* Modal */}
        <AddBill
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
        />
      </div>
    );
  
}

export default BillPage;