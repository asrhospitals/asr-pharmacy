import React, { useRef } from "react";
import PageHeader from "../common/PageHeader";
import Input from "../common/Input";
import Select from "../common/Select";
import DataTable from "../common/DataTable";
import Loader from "../common/Loader";
import Button from "../common/Button";

const CommonPageLayout = ({
  title,
  subtitle,
  actions,
  search,
  onSearchChange,
  searchOptions = [],
  selectedSearchField,
  onSearchFieldChange,
  extraFilters = null,
  tableData = [],
  columns,
  isLoading,
  selectedRow,
  onRowSelect,
  onAdd,
  onEdit,
  onDelete,
  rowInfoPanel = null,
  onArrowNavigation = null,
  fullTableHeight = false,
  pagination = null,
  page = 1,
  setPage = null,
  loadMore = null,
  handleLoadMore = () => {},
  isMoreLoading = false,
  maxDataLoaded = false,
  justifyBetween = false
}) => {
  const tableRef = useRef();

  return (
    <div className="flex space-y-2 flex-col h-[calc(100vh-120px)]">
      <PageHeader title={title} subtitle={subtitle} actions={actions} />

      <div
        className={`flex flex-wrap gap-2 px-6 items-center ${
          justifyBetween ? "justify-between" : "justify-start"
        }`}
      >
        <Input
          type="text"
          className="w-full sm:w-64"
          placeholder="Search..."
          value={search}
          onChange={onSearchChange}
        />
        {searchOptions.length > 0 && (
          <Select
            className="w-full sm:w-40"
            value={selectedSearchField}
            onChange={onSearchFieldChange}
          >
            {searchOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </Select>
        )}
        {extraFilters}

        {loadMore && (
          <div className="flex justify-end items-center mt-2">
            {isMoreLoading ? (
              <Loader />
            ) : (
              <Button
                disabled={maxDataLoaded}
                variant="secondary"
                onClick={handleLoadMore}
                className={maxDataLoaded ? "opacity-50" : ""}
              >
                {maxDataLoaded ? "No more data" : "Load More"}
              </Button>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col px-6 min-h-fit">
        {isLoading ? (
          <Loader />
        ) : (
          <DataTable
            title={title}
            columns={columns}
            data={tableData}
            handleAddItem={onAdd}
            onEdit={onEdit}
            onDelete={onDelete}
            selectedRow={selectedRow}
            onRowSelect={onRowSelect}
            fullHeight={fullTableHeight}
          />
        )}

        {rowInfoPanel && (
          <div className="border border-gray-300 rounded-lg bg-white p-3 mt-2 min-h-[60px]">
            {rowInfoPanel}
          </div>
        )}
        {pagination?.totalPages > 1 && (
          <div className="flex justify-center mt-4">
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => setPage(Math.max(1, page - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <span className="px-3 py-2 text-sm">
                Page {page} of {pagination.totalPages}
              </span>
              <Button
                variant="secondary"
                onClick={() =>
                  setPage(Math.min(pagination.totalPages, page + 1))
                }
                disabled={page === pagination.totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommonPageLayout;
