import { Edit, Trash2, Eye, Plus } from "lucide-react";
import Button from "./Button";
import Loader from "./Loader";

const DataTable = ({
  title,
  columns = [],
  data = [],
  onEdit,
  onDelete,
  onView,
  handleAddItem,
  selectedRow,
  onRowSelect,
}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
        <div className="text-gray-400 mb-4">No {title} available.</div>
        <Button
          key="add"
          onClick={handleAddItem}
          startIcon={<Plus className="w-4 h-4" />}
        >
          Add your first {title}
        </Button>
      </div>
    );
  }
  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm">
          <thead className="bg-gray-50">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-left text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {column.title}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-2 sm:px-4 md:px-6 py-2 sm:py-3 text-right text-[10px] sm:text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`hover:bg-gray-50 cursor-pointer ${selectedRow && (selectedRow.id === row.id) ? 'bg-yellow-100' : ''}`}
                  onClick={() => onRowSelect && onRowSelect(row)}
                >
                  {columns.map((column, idx) => (
                    <td
                      key={idx}
                      className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-900"
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key] ?? "-"}
                    </td>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-2 sm:px-4 md:px-6 py-2 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                      <div className="flex justify-end gap-1 sm:gap-2">
                        {onView && (
                          <Button
                            onClick={() => onView(row)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded transition-colors min-w-0"
                            title="View"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        {onEdit && (
                          <Button
                            onClick={() => onEdit(row)}
                            className="text-indigo-600 hover:text-indigo-900 p-1 rounded transition-colors min-w-0"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            onClick={() => onDelete(row)}
                            className="text-red-600 hover:text-red-900 p-1 rounded transition-colors min-w-0"
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
                  colSpan={
                    columns.length + (onView || onEdit || onDelete ? 1 : 0)
                  }
                  className="px-2 sm:px-6 py-6 sm:py-8 text-center text-xs sm:text-sm text-gray-500"
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
