
import { Package } from "lucide-react";
const GenericPage = ({ title, description, path }) => (
    <div className="p-6">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-sm text-gray-500 mt-1">Path: {path}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Page Content</h2>
        </div>
        <div className="p-6">
          <p className="text-gray-600 mb-4">
            {description || `This is the ${title} page. Content will be implemented here based on your business requirements.`}
          </p>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <div className="text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Content Area</h3>
              <p className="text-gray-500">
                This section will contain the main functionality for {title.toLowerCase()}.
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Primary Action
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Secondary Action
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  export default GenericPage;