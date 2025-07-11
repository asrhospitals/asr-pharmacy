import { 
    Edit,
    Trash2,
    Eye,
  } from "lucide-react";
import Button from './Button';
import Loader from './Loader';


  const DataTable = ({ columns = [], data = [], onEdit, onDelete, onView }) => {
    return (
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column, idx) => (
                  <th key={idx} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {column.title}
                  </th>
                ))}
                {(onView || onEdit || onDelete) && (
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((row, index) => (
                  <tr key={row.id || index} className="hover:bg-gray-50">
                    {columns.map((column, idx) => (
                      <td key={idx} className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {column.render ? column.render(row[column.key], row) : (row[column.key] ?? '-')}
                      </td>
                    ))}
                    {(onView || onEdit || onDelete) && (
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          {onView && (
                            <Button 
                              onClick={() => onView(row)} 
                              className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors"
                              title="View"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          )}
                          {onEdit && (
                            <Button 
                              onClick={() => onEdit(row)} 
                              className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                          {onDelete && (
                            <Button 
                              onClick={() => onDelete(row)} 
                              className="text-red-600 hover:text-red-900 p-1 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td 
                    colSpan={columns.length + (onView || onEdit || onDelete ? 1 : 0)} 
                    className="px-6 py-8 text-center text-sm text-gray-500"
                  >
                    No data available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  export default DataTable;