import { Users, Package, ShoppingCart} from "lucide-react";
import ErrorBoundary from '../componets/common/ErrorBoundary';



const Dashboard = () => (
  <div className="p-6">
    <h1 className="text-3xl font-bold text-gray-900 mb-4">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Total Sales</h3>
        <p className="text-3xl font-bold text-blue-600">₹12,54,300</p>
        <p className="text-sm text-green-600 mt-2">↑ 12.5% from last month</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Orders</h3>
        <p className="text-3xl font-bold text-green-600">1,245</p>
        <p className="text-sm text-green-600 mt-2">↑ 8.2% from last month</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Customers</h3>
        <p className="text-3xl font-bold text-purple-600">856</p>
        <p className="text-sm text-green-600 mt-2">↑ 15.3% from last month</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Revenue</h3>
        <p className="text-3xl font-bold text-orange-600">₹8,92,400</p>
        <p className="text-sm text-green-600 mt-2">↑ 6.8% from last month</p>
      </div>
    </div>
    
    {/* Recent Activity */}
    <div className="mt-8 bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New order #12345 received</p>
              <p className="text-sm text-gray-500">2 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">New customer registered</p>
              <p className="text-sm text-gray-500">15 minutes ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <Package className="w-5 h-5 text-orange-600" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Inventory updated for Medicine XYZ</p>
              <p className="text-sm text-gray-500">1 hour ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
export default Dashboard;