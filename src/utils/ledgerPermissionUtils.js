import { hasPermission, hasGroupPermission } from '../data/permissions';

export const canPerformLedgerAction = (userRole, groupName, groupType, action) => {
  const rolePermissions = {
    create: hasPermission(userRole, 'accounting_ledgers', 'C'),
    edit: hasPermission(userRole, 'accounting_ledgers', 'E'),
    delete: hasPermission(userRole, 'accounting_ledgers', 'D'),
    view: hasPermission(userRole, 'accounting_ledgers', 'V'),
    modifyBalance: hasPermission(userRole, 'opening_balance', 'E'),
    setOpeningBalance: hasPermission(userRole, 'opening_balance', 'C'),
  };

  const groupPerms = hasGroupPermission(groupName, groupType);
  
  const permissions = {
    ...rolePermissions,
    ...groupPerms
  };

  const specialPermissions = applySpecialGroupRules(permissions, groupName, groupType);
  
  return specialPermissions[action] || false;
};

const applySpecialGroupRules = (permissions, groupName, groupType) => {
  const modifiedPermissions = { ...permissions };
  const groupNameLower = groupName.toLowerCase();
  const groupTypeLower = groupType.toLowerCase();

  if (groupNameLower.includes('cash-in-hand') || groupNameLower.includes('cash in hand')) {
    modifiedPermissions.delete = false;
    modifiedPermissions.modifyBalance = false;
    modifiedPermissions.setOpeningBalance = false;
  }

  if (groupNameLower.includes('capital') || groupTypeLower === 'capital') {
    modifiedPermissions.delete = false;
    modifiedPermissions.modifyBalance = false;
  }

  if (groupNameLower.includes('sales') || groupTypeLower === 'income') {
    modifiedPermissions.delete = false;
  }

  if (groupNameLower.includes('purchase') || groupNameLower.includes('expense')) {
    modifiedPermissions.delete = false;
  }

  if (groupNameLower.includes('bank') || groupNameLower.includes('account')) {
    modifiedPermissions.delete = false;
  }

  if (groupNameLower.includes('fixed') || groupNameLower.includes('asset')) {
    modifiedPermissions.delete = false;
    modifiedPermissions.modifyBalance = false;
  }

  return modifiedPermissions;
};


export const getGroupPermissions = (userRole, groupName, groupType) => {
  const actions = ['create', 'edit', 'delete', 'view', 'modifyBalance', 'setOpeningBalance'];
  const permissions = {};

  actions.forEach(action => {
    permissions[action] = canPerformLedgerAction(userRole, groupName, groupType, action);
  });

  return permissions;
};


export const isGroupReadOnly = (userRole, groupName, groupType) => {
  const canEdit = canPerformLedgerAction(userRole, groupName, groupType, 'edit');
  const canCreate = canPerformLedgerAction(userRole, groupName, groupType, 'create');
  
  return !canEdit && !canCreate;
};


export const canModifyGroupBalance = (userRole, groupName, groupType) => {
  const canModifyBalance = canPerformLedgerAction(userRole, groupName, groupType, 'modifyBalance');
  const canSetOpeningBalance = canPerformLedgerAction(userRole, groupName, groupType, 'setOpeningBalance');
  
  return canModifyBalance && canSetOpeningBalance;
};

export const getGroupPermissionDescription = (userRole, groupName, groupType) => {
  const permissions = getGroupPermissions(userRole, groupName, groupType);
  
  if (permissions.create && permissions.edit && permissions.delete) {
    return 'Full access';
  } else if (permissions.create && permissions.edit) {
    return 'Create and edit access';
  } else if (permissions.edit) {
    return 'Edit access only';
  } else if (permissions.view) {
    return 'Read-only access';
  } else {
    return 'No access';
  }
};

export const getGroupUIState = (userRole, groupName, groupType) => {
  const permissions = getGroupPermissions(userRole, groupName, groupType);
  
  return {
    showCreateButton: permissions.create,
    showEditButton: permissions.edit,
    showDeleteButton: permissions.delete,
    showViewButton: permissions.view,
    isReadOnly: isGroupReadOnly(userRole, groupName, groupType),
    isBalanceEditable: canModifyGroupBalance(userRole, groupName, groupType),
    permissionDescription: getGroupPermissionDescription(userRole, groupName, groupType)
  };
};

export const validateLedgerAccess = (userRole, groupName, groupType, operation) => {
  const canPerform = canPerformLedgerAction(userRole, groupName, groupType, operation);
  
  return {
    allowed: canPerform,
    message: canPerform ? 'Access granted' : `Access denied for ${operation} operation on ${groupName}`,
    groupName,
    groupType,
    operation
  };
};

export default {
  canPerformLedgerAction,
  getGroupPermissions,
  isGroupReadOnly,
  canModifyGroupBalance,
  getGroupPermissionDescription,
  getGroupUIState,
  validateLedgerAccess
}; 