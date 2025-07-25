import { useEffect, useRef } from "react";
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
  const rowRefs = useRef([]);
  const tableContainerRef = useRef(null);

  useEffect(() => {
    if (selectedRow && rowRefs.current) {
      const idx = data.findIndex((row) => row.id === selectedRow.id);
      if (idx !== -1 && rowRefs.current[idx]) {
        rowRefs.current[idx].scrollIntoView({
          block: "nearest",
          behavior: "smooth",
        });
      }
    }
  }, [selectedRow, data]);

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
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <div
        ref={tableContainerRef}
        style={{ maxHeight: 400, overflowY: "auto" }}
      >
        <table
          className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm"
          style={{ tableLayout: "fixed", width: "100%" }}
        >
          <thead className="bg-blue-400 sticky top-0 z-10">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`px-2 py-2 text-center text-[10px] sm:text-xs font-medium text-white uppercase tracking-wider bg-blue-400 sticky top-0 z-10 ${
                    "border-r border-gray-400" 
                  }`}
                >
                  {column.title}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-2 py-2 text-center text-[10px] sm:text-xs font-medium text-white uppercase tracking-wider bg-blue-400 sticky top-0 z-10">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-400">
            {Array.isArray(data) && data.length > 0 ? (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  ref={(el) => (rowRefs.current[index] = el)}
                  className={`hover:bg-blue-200 cursor-pointer ${
                    selectedRow && selectedRow.id === row.id
                      ? "bg-blue-100"
                      : ""
                  }`}
                  onClick={() => onRowSelect && onRowSelect(row)}
                >
                  {columns.map((column, idx) => (
                    <td
                      key={idx}
                      className={`px-2 py-2 whitespace-nowrap text-xs sm:text-sm text-gray-900 ${"border-r border-gray-400"
                      }`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key] ?? "-"}
                    </td>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-2 py-2 whitespace-nowrap text-center text-xs sm:text-sm font-medium">
                      <div className="flex justify-center gap-1 sm:gap-2">
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
                            className="text-indigo-600 hover:text-indigo-900 hover:bg-gray-100 p-1 rounded transition-colors min-w-0"
                            title="Edit"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                        {onDelete && (
                          <Button
                            onClick={() => onDelete(row)}
                            className="text-red-600 hover:text-red-900 hover:bg-gray-100 p-1 rounded transition-colors min-w-0"
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
                  className="px-2 py-6 text-center text-xs sm:text-sm text-gray-500"
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
