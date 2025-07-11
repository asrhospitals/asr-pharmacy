// Pharmacy Software Role-Permission Matrix
// V = View, C = Create, E = Edit, D = Delete
// VCED = Full Access

export const PERMISSIONS = {
  admin: {
    user_management: 'VCED',
    dashboard: 'VCED',
    reports: 'VCED',
    prescription_entry: 'V',
    view_prescription: 'V',
    dispensing: 'V',
    inventory: 'VCED',
    purchase_orders: 'VCED',
    supplier_management: 'VCED',
    gst_billing: 'VCED',
    return_expiry: 'VCED',
    scheme_billing: 'VCED',
    financial_reports: 'VCED',
    audit_logs: 'VCED',
    backup: 'VCED',
    settings: 'VCED',
  },
  pharmacist: {
    dashboard: 'V',
    prescription_entry: 'C',
    view_prescription: 'V',
    dispensing: 'VCED',
    inventory: 'V',
    gst_billing: 'V',
    return_expiry: 'C',
    scheme_billing: 'V',
  },
  assistant: {
    view_prescription: 'V',
    dispensing: 'VC',
    gst_billing: 'VC',
    scheme_billing: 'V',
  },
  store_manager: {
    dashboard: 'V',
    inventory: 'VCED',
    purchase_orders: 'VCED',
    supplier_management: 'VCED',
    return_expiry: 'VCED',
    scheme_billing: 'V',
    financial_reports: 'V',
  },
  accounts_officer: {
    dashboard: 'V',
    gst_billing: 'VCED',
    scheme_billing: 'VCED',
    financial_reports: 'VCED',
    audit_logs: 'V',
  },
  doctor: {
    prescription_entry: 'C',
    view_prescription: 'V',
  },
  auditor: {
    dashboard: 'V',
    reports: 'V',
    view_prescription: 'V',
    dispensing: 'V',
    inventory: 'V',
    purchase_orders: 'V',
    gst_billing: 'V',
    scheme_billing: 'V',
    financial_reports: 'V',
    audit_logs: 'V',
  },
  scheme_desk: {
    dashboard: 'V',
    view_prescription: 'V',
    dispensing: 'V',
    inventory: 'V',
    scheme_billing: 'VCED',
    financial_reports: 'V',
  },
};

// Helper: check if a role has a specific permission for a module/feature
export function hasPermission(role, module, action) {
  const perms = PERMISSIONS[role];
  if (!perms) return false;
  const allowed = perms[module];
  if (!allowed) return false;
  return allowed.includes(action);
} 