import React from "react";
import {
  Users,
  Package,
  ShoppingCart,
  BarChart,
  FileText,
  TrendingUp,
  CreditCard,
} from "lucide-react";
import Button from '../common/Button';
import Card from '../common/Card';
import Loader from '../common/Loader';

const DashboardMain = () => {
  return (
    <div className="flex-1 p-4 bg-gray-100 rounded-lg shadow-md h-full overflow-y-auto no-scrollbar">
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-2">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <div className="text-xs text-gray-500 mt-1">
            Last Sync : 11-07-2025 | 12:34 PM
          </div>
        </div>
        <div className="flex flex-wrap gap-2 items-center">
          <select className="border rounded px-2 py-1 text-sm w-full sm:w-auto max-w-full truncate">
            <option>Delivery : 1</option>
          </select>
          <select className="border rounded px-2 py-1 text-sm w-full sm:w-auto max-w-full truncate">
            <option>Last 30 Days</option>
          </select>
          <Button variant="outline" className="w-full sm:w-auto"> 
            Customize
          </Button>
          <div className="w-full sm:w-auto max-w-full overflow-x-auto">
            <select className="border rounded px-2 py-1 text-sm w-full max-w-full truncate">
              <option className="truncate">Financial Year: 01-04-2025 - 31-03-2026</option>
            </select>
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <Card className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <BarChart className="w-8 h-8 text-blue-500 mb-2" />
          <div className="text-xs text-gray-500">₹ 0.00</div>
          <div className="font-semibold">Total Sale</div>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <ShoppingCart className="w-8 h-8 text-green-500 mb-2" />
          <div className="text-xs text-gray-500">₹ 0.00</div>
          <div className="font-semibold">Total Purchase</div>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <TrendingUp className="w-8 h-8 text-orange-500 mb-2" />
          <div className="text-xs text-gray-500">₹ 0.00</div>
          <div className="font-semibold">Total Income</div>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
          <FileText className="w-8 h-8 text-red-500 mb-2" />
          <div className="text-xs text-gray-500">₹ 0.00</div>
          <div className="font-semibold">Total Expenses</div>
        </Card>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">Net Sale</div>
          <div className="h-24 flex items-center justify-center text-gray-400">
            [Chart]
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">Net Purchase</div>
          <div className="h-24 flex items-center justify-center text-gray-400">
            [Chart]
          </div>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">Flow Chart</div>
          <div className="h-24 flex items-center justify-center text-gray-400">
            [Chart]
          </div>
        </Card>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 mb-4">
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">Fund Summary</div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>Bank Balance: ₹ 0.00</li>
            <li>Cash Balance: ₹ 0.00</li>
            <li>Cash Deposited: ₹ 0.00</li>
            <li>Withdrawal: ₹ 0.00</li>
            <li>Cheque For Deposit: ₹ 0.00</li>
          </ul>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">Outstanding</div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>Current Receivable: ₹ 0.00</li>
            <li>Overdue Receivable: ₹ 0.00</li>
            <li>Current Payable: ₹ 0.00</li>
            <li>Overdue Payable: ₹ 0.00</li>
          </ul>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">Business</div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>CGST Payable: ₹ 0.00</li>
            <li>SGST Payable: ₹ 0.00</li>
            <li>IGST Payable: ₹ 0.00</li>
          </ul>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">New Added</div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>Items: 0.00</li>
            <li>Agency: 0.00</li>
            <li>Customer: 0.00</li>
            <li>Category: 0.00</li>
            <li>Supplier: 0.00</li>
          </ul>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">Stock</div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>Expired: 0.00</li>
            <li>Near Expired: 0.00</li>
            <li>Reorder: 0.00</li>
            <li>Dump Stock: 0.00</li>
            <li>Minimum Stock: 0.00</li>
          </ul>
        </Card>
        <Card className="bg-white rounded-lg shadow p-4">
          <div className="font-semibold mb-2">Pending</div>
          <ul className="text-xs text-gray-600 space-y-1">
            <li>Sales Challan: 0.00</li>
            <li>Sales Order: 0.00</li>
            <li>Purchase Order: 0.00</li>
            <li>Purchase Challan: 0.00</li>
            <li>Prescription: 0.00</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default DashboardMain;
