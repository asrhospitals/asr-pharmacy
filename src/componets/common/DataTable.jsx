import React, { useRef, useEffect, useState } from "react";
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
  onLoadMore,
  hasMore = false,
  loading = false,
  enableInfiniteScroll = true,
}) => {
  const rowRefs = useRef([]);
  const tableContainerRef = useRef(null);
  const loadMoreRef = useRef(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const prevDataLengthRef = useRef(0);

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
  
  useEffect(() => {
    if (!enableInfiniteScroll || !onLoadMore || !hasMore || !loadMoreRef.current) return;

    const container = tableContainerRef.current;
    if (!container) return;

    let timeoutId;
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        
        // Only trigger if:
        // 1. Element is visible
        // 2. Not already loading
        // 3. Data has stabilized (prevent initial double-load)
        if (target.isIntersecting && !isLoadingMore && data.length > 0) {
          // Add a small delay to prevent rapid-fire calls
          clearTimeout(timeoutId);
          timeoutId = setTimeout(() => {
            setIsLoadingMore(true);
            onLoadMore();
          }, 100);
        }
      },
      {
        root: container,
        rootMargin: "200px", // Load earlier to make it smoother
        threshold: 0,
      }
    );

    observer.observe(loadMoreRef.current);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [enableInfiniteScroll, onLoadMore, hasMore, isLoadingMore, data.length]);

  // Reset loading state when data length changes (new data loaded)
  useEffect(() => {
    if (data.length > prevDataLengthRef.current) {
      setIsLoadingMore(false);
    }
    prevDataLengthRef.current = data.length;
  }, [data.length]);

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col items-center">
        <div className="text-gray-400 mb-4">No {title} available.</div>
        {handleAddItem && (
          <Button
            key="add"
            onClick={handleAddItem}
            startIcon={<Plus className="w-4 h-4" />}
          >
            Add your first {title}
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-lg overflow-hidden">
      <div
        ref={tableContainerRef}
        className="no-scrollbar"
        style={{
          maxHeight: fullHeight ? "calc(100vh - 200px)" : "calc(100vh - 300px)",
          overflowY: "auto",
        }}
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
                  className={`px-4 py-3 text-left text-xs font-medium text-white uppercase tracking-wider ${
                    idx === 0 ? "w-3/4" : "w-1/4"
                  } bg-blue-400 sticky top-0 z-10`}
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
            {data.map((row, index) => (
              <tr
                key={row.id || index}
                ref={(el) => (rowRefs.current[index] = el)}
                className={`hover:bg-blue-50 cursor-pointer transition-colors ${
                  selectedRow?.id === row.id ? "bg-blue-100" : ""
                }`}
                onClick={() => onRowSelect && onRowSelect(row)}
              >
                {columns.map((column, idx) => (
                  <td
                    key={idx}
                    className={`px-4 py-3 whitespace-nowrap text-sm text-gray-900 ${
                      idx === 0 ? "w-3/4" : "w-1/4"
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
            ))}
          </tbody>
        </table>

        {onLoadMore && (
          <div ref={loadMoreRef} className="py-4 flex justify-center min-h-[60px]">
            {isLoadingMore && hasMore && (
              <div className="flex items-center gap-2">
                <Loader />
                <span className="text-gray-500 text-sm">Loading more...</span>
              </div>
            )}
            {!isLoadingMore && !hasMore && data.length > 0 && (
              <span className="text-gray-400 text-sm">No more data</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DataTable;