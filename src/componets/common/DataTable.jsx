import React, { useRef, useEffect } from "react";
import { Edit, Trash2, Eye, Plus } from "lucide-react";
import Button from "./Button";
import IconButton from "./IconButton";
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
  fullHeight = false,
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
        className="no-scrollbar"
        style={{ maxHeight: fullHeight ? 'calc(100vh - 200px)' : 'calc(100vh - 300px)', overflowY: 'auto' }}
      >
        <table
          className="min-w-full divide-y divide-gray-200 text-xs sm:text-sm"
          style={{ tableLayout: 'fixed', width: '100%' }}
        >
          <thead className="bg-blue-400 sticky top-0 z-10">
            <tr>
              {columns.map((column, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider bg-blue-400 sticky top-0 z-10 ${
                    idx === 0 ? 'w-3/4' : 'w-1/4'
                  }`}
                >
                  {column.title}
                </th>
              ))}
              {(onView || onEdit || onDelete) && (
                <th className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider bg-blue-400 sticky top-0 z-10 w-24">
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
                  ref={(el) => (rowRefs.current[index] = el)}
                  className={`hover:bg-blue-50 cursor-pointer transition-colors ${
                    selectedRow && selectedRow.id === row.id
                      ? 'bg-blue-100'
                      : ''
                  }`}
                  onClick={() => onRowSelect && onRowSelect(row)}
                >
                  {columns.map((column, idx) => (
                    <td
                      key={idx}
                      className={`px-4 py-3 whitespace-nowrap text-sm text-gray-900 ${
                        idx === 0 ? 'w-3/4' : 'w-1/4'
                      }`}
                    >
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key] ?? "-"}
                    </td>
                  ))}
                  {(onView || onEdit || onDelete) && (
                    <td className="px-4 py-3 whitespace-nowrap text-center text-sm font-medium w-24">
                      <div className="flex justify-center gap-2">
                        {onView && (
                          <IconButton
                            icon={Eye}
                            onClick={(e) => {
                              e.stopPropagation();
                              onView(row);
                            }}
                            variant="outline"
                            size="sm"
                            title="View"
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 hover:border-blue-300"
                          />
                        )}
                        {onEdit && (
                          <IconButton
                            icon={Edit}
                            disabled={row.isDefault}
                            onClick={(e) => {
                              e.stopPropagation();
                              onEdit(row);
                            }}
                            variant="outline"
                            size="sm"
                            title="Edit"
                            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 hover:border-indigo-300"
                          />
                        )}
                        {onDelete && (
                          <IconButton
                            icon={Trash2}
                            disabled={row.isDefault}
                            onClick={(e) => {
                              e.stopPropagation();
                              onDelete(row);
                            }}
                            variant="outline"
                            size="sm"
                            title="Delete"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 hover:border-red-300"
                          />
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
                  className="px-4 py-8 text-center text-sm text-gray-500"
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
