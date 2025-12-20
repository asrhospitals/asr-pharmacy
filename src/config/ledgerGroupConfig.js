/**
 * Ledger Group Configuration
 * Defines form fields and display settings for each account group
 * Similar to Tally's group-based field configuration
 */

export const GROUP_FORM_CONFIG = {
  // Asset Groups
  'Bank Accounts': {
    groupType: 'Asset',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      address: { required: false, label: 'Bank Address', type: 'textarea' },
      description: { required: false, label: 'Description', type: 'textarea' },
      bankName: { required: false, label: 'Bank Name', type: 'text' },
      accountNumber: { required: false, label: 'Account Number', type: 'text' },
      ifscCode: { required: false, label: 'IFSC Code', type: 'text' },
    },
    showFields: {
      openingBalance: true,
      address: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Cash-in-Hand': {
    groupType: 'Asset',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Sundry Debtors': {
    groupType: 'Asset',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      address: { required: false, label: 'Address', type: 'textarea' },
      description: { required: false, label: 'Description', type: 'textarea' },
      creditDays: { required: false, label: 'Credit Days', type: 'number' },
      contactPerson: { required: false, label: 'Contact Person', type: 'text' },
      mobileNumber: { required: false, label: 'Mobile Number', type: 'text' },
    },
    showFields: {
      openingBalance: true,
      address: true,
      description: true,
      creditDays: true,
      contactPerson: true,
      mobileNumber: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Stock-in-Hand': {
    groupType: 'Asset',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Loans & Advances (Asset)': {
    groupType: 'Asset',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      address: { required: false, label: 'Address', type: 'textarea' },
      description: { required: false, label: 'Description', type: 'textarea' },
      loanAmount: { required: false, label: 'Loan Amount', type: 'number' },
      interestRate: { required: false, label: 'Interest Rate (%)', type: 'number' },
    },
    showFields: {
      openingBalance: true,
      address: true,
      description: true,
      loanAmount: true,
      interestRate: true,
      balanceType: true,
      isActive: true,
    }
  },

  // Liability Groups
  'Sundry Creditors': {
    groupType: 'Liability',
    balanceType: 'Credit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      address: { required: false, label: 'Address', type: 'textarea' },
      description: { required: false, label: 'Description', type: 'textarea' },
      creditDays: { required: false, label: 'Credit Days', type: 'number' },
      contactPerson: { required: false, label: 'Contact Person', type: 'text' },
      mobileNumber: { required: false, label: 'Mobile Number', type: 'text' },
    },
    showFields: {
      openingBalance: true,
      address: true,
      description: true,
      creditDays: true,
      contactPerson: true,
      mobileNumber: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Duties & Taxes': {
    groupType: 'Liability',
    balanceType: 'Credit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
      taxType: { required: false, label: 'Tax Type', type: 'select', options: ['GST', 'VAT', 'TDS', 'Other'] },
    },
    showFields: {
      openingBalance: true,
      description: true,
      taxType: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Loans (Liability)': {
    groupType: 'Liability',
    balanceType: 'Credit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
      loanAmount: { required: false, label: 'Loan Amount', type: 'number' },
      interestRate: { required: false, label: 'Interest Rate (%)', type: 'number' },
      loanTerm: { required: false, label: 'Loan Term (Months)', type: 'number' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      loanAmount: true,
      interestRate: true,
      loanTerm: true,
      balanceType: true,
      isActive: true,
    }
  },

  // Capital Groups
  'Capital Account': {
    groupType: 'Capital',
    balanceType: 'Credit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  // Income Groups
  'Sales Accounts': {
    groupType: 'Income',
    balanceType: 'Credit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Direct Income': {
    groupType: 'Income',
    balanceType: 'Credit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Indirect Income': {
    groupType: 'Income',
    balanceType: 'Credit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  // Expense Groups
  'Purchase Accounts': {
    groupType: 'Expense',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Direct Expenses': {
    groupType: 'Expense',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },

  'Indirect Expense': {
    groupType: 'Expense',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  },
};

/**
 * Get configuration for a specific group
 */
export const getGroupConfig = (groupName) => {
  return GROUP_FORM_CONFIG[groupName] || {
    groupType: 'Asset',
    balanceType: 'Debit',
    fields: {
      openingBalance: { required: true, label: 'Opening Balance', type: 'number' },
      description: { required: false, label: 'Description', type: 'textarea' },
    },
    showFields: {
      openingBalance: true,
      description: true,
      balanceType: true,
      isActive: true,
    }
  };
};

/**
 * Get default balance type for a group
 */
export const getDefaultBalanceType = (groupName) => {
  const config = getGroupConfig(groupName);
  return config.balanceType || 'Debit';
};

/**
 * Get editable fields for a group
 */
export const getEditableFields = (groupName) => {
  const config = getGroupConfig(groupName);
  return Object.keys(config.fields || {});
};

/**
 * Validate ledger data based on group configuration
 */
export const validateLedgerData = (groupName, data) => {
  const config = getGroupConfig(groupName);
  const errors = {};

  Object.entries(config.fields || {}).forEach(([fieldName, fieldConfig]) => {
    if (fieldConfig.required && !data[fieldName]) {
      errors[fieldName] = `${fieldConfig.label} is required`;
    }
  });

  return errors;
};

/**
 * Get visible fields for a group
 */
export const getVisibleFields = (groupName) => {
  const config = getGroupConfig(groupName);
  return config.showFields || {};
};
