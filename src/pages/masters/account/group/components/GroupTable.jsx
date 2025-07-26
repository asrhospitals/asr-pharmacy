import React from 'react';
import { ChevronDown, ChevronRight, Edit, Trash2 } from 'lucide-react';
import Button from '../../../../../componets/common/Button';
import Toast from '../../../../../componets/common/Toast';

const GroupTable = ({ 
  groups, 
  expandedGroups, 
  selectedGroup, 
  onToggleExpanded, 
  onRowClick, 
  onEdit, 
  onDelete,
  updatingGroup,
  deletingGroup 
}) => {
  const handleEditClick = (group, e) => {
    if (group.isDefault) {
      e.preventDefault();
      e.stopPropagation();
      Toast.error('You cannot edit predefined/default groups');
      return;
    }
    onEdit(group, e);
  };

  const handleDeleteClick = (group, e) => {
    if (group.isDefault) {
      e.preventDefault();
      e.stopPropagation();
      Toast.error('You cannot delete predefined/default groups');
      return;
    }
    onDelete(group, e);
  };

  const renderGroupRow = (group, level = 0) => {
    const isExpanded = expandedGroups.has(group.id);
    const hasChildren = group.children && group.children.length > 0;
    const isDefault = group.isDefault;
    const isSelected = selectedGroup?.id === group.id;

    return (
      <React.Fragment key={group.id}>
        <tr 
          className={`group-row ${isDefault ? 'default-group' : 'custom-group'} ${isSelected ? 'selected' : ''}`}
          onClick={() => onRowClick(group)}
        >
          <td className="name-cell">
            <div className="flex items-center" style={{ paddingLeft: `${level * 24}px` }}>
              {hasChildren ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleExpanded(group.id);
                  }}
                  className="expand-button mr-2 p-1 hover:bg-gray-100 rounded"
                >
                  {isExpanded ? (
                    <ChevronDown size={16} className="text-gray-600" />
                  ) : (
                    <ChevronRight size={16} className="text-gray-600" />
                  )}
                </button>
              ) : (
                <div className="w-6 mr-2" />
              )}
              
              <span className={`group-name ${isDefault ? 'font-semibold' : ''}`}>
                {group.groupName}
              </span>
              
              {group.groupType && (
                <span className="group-type-badge">
                  {group.groupType}
                </span>
              )}
            </div>
          </td>
          <td className="action-cell">
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleEditClick(group, e)}
                className="p-1 hover:bg-blue-50 text-blue-600"
                disabled={updatingGroup || isDefault}
                title={isDefault ? "Default groups cannot be edited" : "Edit group"}
              >
                <Edit size={16} />
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => handleDeleteClick(group, e)}
                className="p-1 hover:bg-red-50 text-red-600"
                disabled={deletingGroup || isDefault}
                title={isDefault ? "Default groups cannot be deleted" : "Delete group"}
              >
                <Trash2 size={16} />
              </Button>
            </div>
          </td>
        </tr>
        
        {/* Render child groups as separate rows with proper indentation */}
        {hasChildren && isExpanded && group.children.map(child => renderGroupRow(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groups.length > 0 ? (
              groups.map(group => renderGroupRow(group))
            ) : (
              <tr>
                <td colSpan="2" className="empty-state">
                  <p>No groups found. Create your first group to get started.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GroupTable; 