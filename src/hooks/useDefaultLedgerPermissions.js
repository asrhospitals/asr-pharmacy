import { useSelector } from 'react-redux';
import { useGetGroupsQuery } from '../services/groupApi';

export const useDefaultLedgerPermissions = (ledger = null) => {
  const user = useSelector((state) => state.user.user);
  const { data: groups = [] } = useGetGroupsQuery();

  const getGroupDetails = () => {
    if (!ledger?.acgroup) return null;
    return groups.find(group => group.id === ledger.acgroup);
  };

  const groupDetails = getGroupDetails();
  const groupName = groupDetails?.groupName?.toLowerCase();
  const groupType = groupDetails?.groupType?.toLowerCase();


  const isDefaultLedger = () => {
    return ledger?.isDefault || false;
  };


  const canDelete = () => {
    if (!ledger) return false;
    return ledger.canDelete !== false;
  };


  const canEdit = () => {
    if (!ledger) return false;
    return ledger.isEditable !== false;
  };


  const isFieldEditable = (fieldName) => {
    if (!ledger) return true;
    if (!isDefaultLedger()) return true; // Non-default ledgers are fully editable
    
    return ledger.editableFields?.includes(fieldName) || false;
  };


  const getEditableFields = () => {
    if (!ledger) return [];
    if (!isDefaultLedger()) {

      return [
        'ledgerName', 'acgroup', 'openingBalance', 'balanceType', 
        'description', 'address', 'isActive', 'status', 'station'
      ];
    }
    
    return ledger.editableFields || [];
  };


  const canEditLedgerName = () => {
    return isFieldEditable('ledgerName');
  };


  const canEditAccountGroup = () => {
    return isFieldEditable('acgroup');
  };


  const canEditOpeningBalance = () => {
    return isFieldEditable('openingBalance');
  };


  const canEditBalanceType = () => {
    return isFieldEditable('balanceType');
  };


  const canEditDescription = () => {
    return isFieldEditable('description');
  };


  const canEditAddress = () => {
    return isFieldEditable('address');
  };


  const canEditStatus = () => {
    return isFieldEditable('status');
  };


  const canEditStation = () => {
    return isFieldEditable('station');
  };


  const getDefaultLedgerIndicator = () => {
    if (!isDefaultLedger()) return null;
    
    return {
      type: 'default',
      label: 'Default Ledger',
      color: 'blue',
      icon: 'shield-check'
    };
  };


  const getFieldWarning = (fieldName) => {
    if (!isDefaultLedger()) return null;
    if (isFieldEditable(fieldName)) return null;
    
    return `This field cannot be modified for default ledgers`;
  };


  const canCreate = () => {

    return true; // For now, assume all users can create
  };


  const canView = () => {

    return true; // For now, assume all users can view
  };

  return {

    canCreate: canCreate(),
    canEdit: canEdit(),
    canDelete: canDelete(),
    canView: canView(),
    

    isDefaultLedger: isDefaultLedger(),
    getDefaultLedgerIndicator: getDefaultLedgerIndicator(),
    

    isFieldEditable,
    getEditableFields: getEditableFields(),
    canEditLedgerName: canEditLedgerName(),
    canEditAccountGroup: canEditAccountGroup(),
    canEditOpeningBalance: canEditOpeningBalance(),
    canEditBalanceType: canEditBalanceType(),
    canEditDescription: canEditDescription(),
    canEditAddress: canEditAddress(),
    canEditStatus: canEditStatus(),
    canEditStation: canEditStation(),
    

    getFieldWarning,
    

    groupDetails,
    groupName,
    groupType
  };
};

export default useDefaultLedgerPermissions; 