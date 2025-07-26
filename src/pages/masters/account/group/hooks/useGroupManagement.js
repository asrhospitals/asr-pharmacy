import { useState } from 'react';
import {
  useGetGroupHierarchyQuery,
  useDeleteGroupMutation,
  useUpdateGroupMutation,
  useCreateGroupMutation,
  useGetAvailableParentsQuery,
} from '../../../../../services/groupApi';
import { showToast } from '../../../../../componets/common/Toast';

export const useGroupManagement = () => {
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editFormData, setEditFormData] = useState({});
  const [createFormData, setCreateFormData] = useState({});

  const { 
    data: groups = [], 
    isLoading, 
    error 
  } = useGetGroupHierarchyQuery();

  const { 
    data: availableParents = [], 
    isLoading: parentsLoading 
  } = useGetAvailableParentsQuery();

  const [deleteGroup, { isLoading: deletingGroup }] = useDeleteGroupMutation();
  const [updateGroup, { isLoading: updatingGroup }] = useUpdateGroupMutation();
  const [createGroup, { isLoading: creatingGroup }] = useCreateGroupMutation();

  const toggleExpanded = (groupId) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const handleRowClick = (group) => {
    setSelectedGroup(group);
  };

  const handleEdit = (group, e) => {
    e.stopPropagation();
    
    if (group.isDefault) {
      showToast('You cannot edit predefined/default groups');
      return;
    }
    
    setSelectedGroup(group);
    setEditFormData({
      groupName: group.groupName,
      groupType: group.groupType,
      description: group.description || '',
      undergroup: group.undergroup || ''
    });
    setShowEditModal(true);
  };

  const handleDelete = async (group, e) => {
    e.stopPropagation();
    
    if (group.isDefault) {
      showToast('You cannot delete predefined/default groups');
      return;
    }
    
    if (!window.confirm(`Are you sure you want to delete "${group.groupName}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await deleteGroup(group.id).unwrap();
      showToast('Group deleted successfully');
      if (selectedGroup?.id === group.id) {
        setSelectedGroup(null);
      }
    } catch (error) {
      const message = error?.data?.message || 'Failed to delete group';
      showToast(message);
    }
  };

  const handleUpdateGroup = async () => {
    try {
      await updateGroup({ id: selectedGroup.id, ...editFormData }).unwrap();
      showToast('Group updated successfully');
      setShowEditModal(false);
      setSelectedGroup(null);
    } catch (error) {
      const message = error?.data?.message || 'Failed to update group';
      showToast(message);
    }
  };

  const handleCreateGroup = async () => {
    try {
      await createGroup(createFormData).unwrap();
      showToast('Group created successfully');
      setShowCreateModal(false);
      resetCreateForm();
    } catch (error) {
      const message = error?.data?.message || 'Failed to create group';
      showToast(message, { type: 'error' });
    }
  };

  const resetCreateForm = () => {
    setCreateFormData({
      groupName: '',
      groupType: '',
      description: '',
      parentGroupId: null,
      parentGroupName: '',
      undergroup: ''
    });
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedGroup(null);
  };

  const closeCreateModal = () => {
    setShowCreateModal(false);
    resetCreateForm();
  };

  const openCreateModal = () => {
    setShowCreateModal(true);
  };

  return {
    groups,
    isLoading,
    error,
    availableParents,
    parentsLoading,
    expandedGroups,
    selectedGroup,
    showEditModal,
    showCreateModal,
    editFormData,
    createFormData,
    deletingGroup,
    updatingGroup,
    creatingGroup,

    toggleExpanded,
    handleRowClick,
    handleEdit,
    handleDelete,
    handleUpdateGroup,
    handleCreateGroup,
    setEditFormData,
    setCreateFormData,
    closeEditModal,
    closeCreateModal,
    openCreateModal,
  };
}; 