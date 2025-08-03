import { useSelector } from 'react-redux';
import { useGetGroupsQuery } from '../services/groupApi';
import { hasPermission, hasGroupPermission } from '../data/permissions';

export const useLedgerPermissions = (selectedGroup = null) => {
  const user = useSelector((state) => state.user.user);
  const { data: groups = [] } = useGetGroupsQuery();

  const getGroupDetails = () => {
    if (!selectedGroup) return null;
    
    if (typeof selectedGroup === 'string') {
      return groups.find(group => group.id === selectedGroup);
    }
    
    if (selectedGroup.value) {
      return groups.find(group => group.id === selectedGroup.value);
    }
    
    return selectedGroup;
  };

  const groupDetails = getGroupDetails();
  const groupName = groupDetails?.groupName || groupDetails?.label || '';
  const groupType = groupDetails?.groupType || '';

  const rolePermissions = {
    canCreateLedger: hasPermission(user?.role, 'accounting_ledgers', 'C'),
    canEditLedger: hasPermission(user?.role, 'accounting_ledgers', 'E'),
    canDeleteLedger: hasPermission(user?.role, 'accounting_ledgers', 'D'),
    canViewLedger: hasPermission(user?.role, 'accounting_ledgers', 'V'),
    canCreateTransaction: hasPermission(user?.role, 'accounting_transactions', 'C'),
    canEditTransaction: hasPermission(user?.role, 'accounting_transactions', 'E'),
    canDeleteTransaction: hasPermission(user?.role, 'accounting_transactions', 'D'),
    canViewTransaction: hasPermission(user?.role, 'accounting_transactions', 'V'),
    canViewReport: hasPermission(user?.role, 'accounting_reports', 'V'),
    canExportReport: hasPermission(user?.role, 'accounting_reports', 'E'),
    canViewBalance: hasPermission(user?.role, 'opening_balance', 'V'),
    canModifyBalance: hasPermission(user?.role, 'opening_balance', 'E'),
    canSetOpeningBalance: hasPermission(user?.role, 'opening_balance', 'C'),
  };

  const getGroupPermissions = () => {
    if (!groupName) return rolePermissions;

    const groupPerms = hasGroupPermission(groupName, groupType);
    if (!groupPerms) return rolePermissions;

    return {
      ...rolePermissions,
      ...groupPerms
    };
  };

  const groupPermissions = getGroupPermissions();

  const getSpecialPermissions = () => {
    const permissions = { ...groupPermissions };

    if (groupName.toLowerCase().includes('cash-in-hand') || 
        groupName.toLowerCase().includes('cash in hand')) {
      permissions.canDeleteLedger = false;
      permissions.canDeleteTransaction = false;
      permissions.canModifyBalance = false;
      permissions.canSetOpeningBalance = false;
    }

    if (groupName.toLowerCase().includes('capital') || 
        groupType.toLowerCase() === 'capital') {
      permissions.canDeleteLedger = false;
      permissions.canDeleteTransaction = false;
      permissions.canModifyBalance = false;
    }

    if (groupName.toLowerCase().includes('sales') || 
        groupType.toLowerCase() === 'income') {
      permissions.canDeleteLedger = false;
      permissions.canDeleteTransaction = false;
    }

    if (groupName.toLowerCase().includes('purchase') || 
        groupName.toLowerCase().includes('expense')) {
      permissions.canDeleteLedger = false;
      permissions.canDeleteTransaction = false;
    }

    if (groupName.toLowerCase().includes('bank') || 
        groupName.toLowerCase().includes('account')) {
      permissions.canDeleteLedger = false;
      permissions.canDeleteTransaction = false;
    }

    return permissions;
  };

  const permissions = getSpecialPermissions();

  const canPerformAction = (action) => {
    return permissions[action] || false;
  };

  const canCreate = () => canPerformAction('canCreateLedger');
  const canEdit = () => canPerformAction('canEditLedger');
  const canDelete = () => canPerformAction('canDeleteLedger');
  const canView = () => canPerformAction('canViewLedger');
  const canModifyBalance = () => canPerformAction('canModifyBalance');
  const canSetOpeningBalance = () => canPerformAction('canSetOpeningBalance');

  const isReadOnly = () => {
    return !canEdit() && !canCreate();
  };

  const isBalanceEditable = () => {
    return canModifyBalance() && canSetOpeningBalance();
  };

  const showDeleteButton = () => {
    return canDelete();
  };

  const showEditButton = () => {
    return canEdit();
  };

  const showCreateButton = () => {
    return canCreate();
  };

  return {
    permissions,
    canPerformAction,
    canCreate,
    canEdit,
    canDelete,
    canView,


    canModifyBalance,
    canSetOpeningBalance,
    
    isReadOnly,
    isBalanceEditable,
    showDeleteButton,
    showEditButton,
    showCreateButton,
    
    groupDetails,
    groupName,
    groupType,
    
    user,
    userRole: user?.role
  };
};

export default useLedgerPermissions; 