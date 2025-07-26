import React from "react";
import InventoryPageLayout from "../../../../componets/layout/InventoryPageLayout";
import Button from "../../../../componets/common/Button";
import { Plus, ChevronDown, ChevronRight } from "lucide-react";
import { useGroupManagement } from "./hooks/useGroupManagement";
import CreateGroupModal from "./components/CreateGroupModal";
import EditGroupModal from "./components/EditGroupModal";
import GroupTable from "./components/GroupTable";

const Group = () => {
  const {
    groups,
    expandedGroups,
    selectedGroup,
    isLoading,
    
    showCreateModal,
    showEditModal,
    createFormData,
    editFormData,
    availableParents,
    parentsLoading,
    
    creatingGroup,
    updatingGroup,
    deletingGroup,
    
    toggleExpanded,
    handleRowClick,
    handleEdit,
    handleDelete,
    handleCreateGroup,
    handleUpdateGroup,
    resetCreateForm,
    closeCreateModal,
    closeEditModal,
    openCreateModal,
    setEditFormData,
    setCreateFormData,
  } = useGroupManagement();

  const transformGroupsForTable = (groups, level = 0) => {
    const transformed = [];
    
    groups.forEach((group) => {
      transformed.push({
        ...group,
        displayName: group.groupName,
        level,
        hasChildren: group.children && group.children.length > 0,
        isExpanded: expandedGroups.has(group.id),
        isDefault: group.isDefault,
      });
      
      if (
        group.children &&
        group.children.length > 0 &&
        expandedGroups.has(group.id)
      ) {
        transformed.push(...transformGroupsForTable(group.children, level + 1));
      }
    });
    
    return transformed;
  };

  const tableData = transformGroupsForTable(groups);

  const columns = [
    {
      key: "displayName",
      title: "Group Name",
      render: (value, row) => (
        <div className="flex items-center">
          {row.hasChildren && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleExpanded(row.id);
              }}
              className=" hover:bg-gray-100 rounded transition-colors"
              title={row.isExpanded ? "Collapse" : "Expand"}
            >
              {row.isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          
          <div className="flex items-center flex-1">
            <div
              className="flex items-center"
              style={{ paddingLeft: `${row.level * 20}px` }}
            >
              {row.level > 0 && (
                <div className="flex items-center mr-2">
                  {Array.from({ length: row.level }, (_, i) => (
                    <div
                      key={i}
                      className="w-px h-4 bg-gray-300 mr-2"
                      style={{
                        marginLeft: i === 0 ? "0" : "8px",
                        backgroundColor:
                          i === row.level - 1 ? "#6b7280" : "#e5e7eb",
                      }}
                    />
                  ))}
                </div>
              )}
              
              <span
                className={`${
                  row.isDefault
                    ? "font-semibold text-gray-900"
                    : "text-gray-700"
                } ${row.level > 0 ? "" : "ml-2"}`}
              >
                {row.groupName}
              </span>
              
              {row.isDefault && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-100 text-yellow-800 rounded-full border border-yellow-200">
                  Default
                </span>
              )}
            </div>
          </div>
          
          {row.groupType && (
            <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded border border-blue-200 font-medium">
              {row.groupType}
            </span>
          )}
        </div>
      ),
    },
  ];

  const handleRowSelect = (row) => {
    handleRowClick(row);
  };

  const handleEditRow = (row) => {
    handleEdit(row, { stopPropagation: () => {} });
  };

  const handleDeleteRow = (row) => {
    handleDelete(row, { stopPropagation: () => {} });
  };

  return (
    <>
      <InventoryPageLayout
        title="Group Management"
        subtitle="Manage your accounting groups"
        actions={[
          <Button
            key="add"
            onClick={openCreateModal}
            startIcon={<Plus className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            Add Group
          </Button>,
        ]}
        tableData={tableData}
        columns={columns}
        isLoading={isLoading}
        selectedRow={selectedGroup}
        onRowSelect={handleRowSelect}
        onAdd={openCreateModal}
        onEdit={handleEditRow}
        onDelete={handleDeleteRow}
      />

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={closeCreateModal}
        formData={createFormData}
        onFormChange={setCreateFormData}
        onSubmit={handleCreateGroup}
        availableParents={availableParents}
        parentsLoading={parentsLoading}
        creatingGroup={creatingGroup}
      />

      <EditGroupModal
        isOpen={showEditModal}
        onClose={closeEditModal}
        formData={editFormData}
        onFormChange={setEditFormData}
        onSubmit={handleUpdateGroup}
        updatingGroup={updatingGroup}
      />
    </>
  );
};

export default Group;
