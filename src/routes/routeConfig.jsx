import React from "react";
import HierarchicalGroupManager from "../pages/masters/account/group/HierarchicalGroupManager";
import Group from "../pages/masters/account/group/Group";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const GenericPage = React.lazy(() => import("../pages/GenericPage"));
const ItemsPage = React.lazy(() =>
  import("../pages/masters/inventory/Item/Item")
);
const ItemDetails = React.lazy(() =>
  import("../pages/masters/inventory/Item/ItemDetails")
);
const StorePage = React.lazy(() =>
  import("../pages/masters/inventory/store/Store")
);
const RackPage = React.lazy(() =>
  import("../pages/masters/inventory/rack/Rack")
);
const Company = React.lazy(() =>
  import("../pages/masters/inventory/company/Company")
);
const SaltPage = React.lazy(() =>
  import("../pages/masters/inventory/salt/Salt")
);
const UnitPage = React.lazy(() =>
  import("../pages/masters/inventory/unit/Unit")
);
const HSNPage = React.lazy(() => import("../pages/masters/inventory/hsn/HSN"));
const MFRPage = React.lazy(() =>
  import("../pages/masters/inventory/menufcurer/MFR")
);
const Price = React.lazy(() => import("../pages/masters/rate/Price"));
const Viewledger = React.lazy(() =>
  import("../pages/masters/account/Ledger/Viewledger")
);
const CreateLedger = React.lazy(() =>
  import("../pages/masters/account/Ledger/CreateLedger")
);
const LedgerDetails = React.lazy(() =>
  import("../pages/masters/account/Ledger/LedgerDetails")
);
const TransactionList = React.lazy(() =>
  import("../pages/masters/account/Transaction/TransactionList")
);
const CreateTransaction = React.lazy(() =>
  import("../pages/masters/account/Transaction/CreateTransaction")
);
const CreateCompanyPage = React.lazy(() =>
  import("../pages/masters/inventory/company/CreateCompanyPage")
);
const CreateItemPage = React.lazy(() =>
  import("../pages/masters/inventory/Item/CreateItemPage")
);
const CreateSaltPage = React.lazy(() =>
  import("../pages/masters/inventory/salt/AddSalt")
);
const CompanyForm = React.lazy(() =>
  import("../pages/masters/inventory/company/CreateCompanyPage")
);
const ItemForm = React.lazy(() =>
  import("../pages/masters/inventory/Item/CreateItemPage")
);
const SaltForm = React.lazy(() =>
  import("../pages/masters/inventory/salt/AddSalt")
);
const CreateManufacturerPage = React.lazy(() =>
  import("../pages/masters/inventory/menufcurer/AddMFR")
);
const Patient = React.lazy(() =>
  import("../pages/masters/other/patient/Patient")
);
const AddPatient = React.lazy(() => import("../pages/masters/other/patient/AddPatient"));
const PatientForm = React.lazy(() => import("../pages/masters/other/patient/AddPatient"));
const PrescriptionList = React.lazy(() => import("../pages/masters/other/prescription/Prescription"));
const CreatePrescriptionPage = React.lazy(() => import("../pages/masters/other/prescription/CreatePrescriptionPage"));
const BillList = React.lazy(() => import("../pages/sales/Bill/BillList"));
const BillForm = React.lazy(() => import("../pages/sales/Bill/BillForm"));

export const routeConfig = [
  {
    path: "/dashboard",
    module: "dashboard",
    action: "V",
    element: <Dashboard />,
  },
  {
    path: "/master/account/ledger",
    module: "accounting_ledgers",
    action: "V",
    element: <Viewledger />,
  },
  {
    path: "/master/account/ledger/create",
    module: "accounting_ledgers",
    action: "C",
    element: <CreateLedger />,
  },
  {
    path: "/master/account/ledger/edit/:id",
    module: "accounting_ledgers",
    action: "E",
    element: <CreateLedger />,
  },
  {
    path: "/master/account/ledger/details/:id",
    module: "accounting_ledgers",
    action: "V",
    element: <LedgerDetails />,
  },
  {
    path: "/master/account/transaction",
    module: "accounting_transactions",
    action: "V",
    element: <TransactionList />,
  },
  {
    path: "/master/account/transaction/create",
    module: "accounting_transactions",
    action: "C",
    element: <CreateTransaction />,
  },
  {
    path: "/master/account/transaction/edit/:id",
    module: "accounting_transactions",
    action: "E",
    element: <CreateTransaction />,
  },
  {
    path: "/master/accounts/group",
    module: "accounting_groups",
    action: "V",
    element: <Group />,
  },
  {
    path: "/master/accounts/group/hierarchical",
    module: "accounting_groups",
    action: "V",
    element: <HierarchicalGroupManager />,
  },
  {
    path: "/master/accounts/sale",
    module: "gst_billing",
    action: "V",
    element: <GenericPage title="Sale" />,
  },
  {
    path: "/master/accounts/purchase",
    module: "purchase_orders",
    action: "V",
    element: <GenericPage title="Purchase" />,
  },

  {
    path: "/master/inventory/items",
    module: "inventory",
    action: "V",
    element: <ItemsPage />,
  },
  {
    path: "/master/inventory/items/:id",
    module: "inventory",
    action: "V",
    element: <ItemDetails />,
  },
  {
    path: "/master/inventory/items/create",
    module: "inventory",
    action: "C",
    element: <CreateItemPage />,
  },
  {
    path: "/master/inventory/items/edit/:id",
    module: "inventory",
    action: "E",
    element: <ItemForm isEditMode={true} />,
  },

  {
    path: "/master/inventory/stores",
    module: "inventory",
    action: "V",
    element: <StorePage />,
  },
  {
    path: "/master/inventory/units",
    module: "inventory",
    action: "V",
    element: <UnitPage />,
  },
  {
    path: "/master/inventory/racks",
    module: "inventory",
    action: "V",
    element: <RackPage />,
  },
  {
    path: "/master/inventory/companies",
    module: "inventory",
    action: "V",
    element: <Company />,
  },
  {
    path: "/master/inventory/company/create",
    module: "inventory",
    action: "C",
    element: <CreateCompanyPage />,
  },
  {
    path: "/master/inventory/companies/edit/:id",
    module: "inventory",
    action: "E",
    element: <CompanyForm isEditMode={true} />,
  },

  {
    path: "/master/inventory/salts",
    module: "inventory",
    action: "V",
    element: <SaltPage />,
  },
  {
    path: "/master/inventory/salt/create",
    module: "inventory",
    action: "C",
    element: <CreateSaltPage />,
  },
  {
    path: "/master/inventory/salt/edit/:id",
    module: "inventory",
    action: "E",
    element: <SaltForm isEditMode={true} />,
  },

  {
    path: "/master/inventory/sacs",
    module: "inventory",
    action: "V",
    element: <HSNPage />,
  },
  {
    path: "/master/inventory/manufacturers",
    module: "inventory",
    action: "V",
    element: <MFRPage />,
  },
  {
    path: "/master/inventory/manufacturers/create",
    module: "inventory",
    action: "C",
    element: <CreateManufacturerPage />,
  },
  {
    path: "/master/rates/pricelist",
    module: "rate_master",
    action: "V",
    element: <Price />,
  },

  {
    path: "/master/inventory/:type",
    module: "inventory",
    action: "V",
    element: <GenericPage />,
  },
  {
    path: "/sales/bill",
    module: "gst_billing",
    action: "V",
    element: <BillList />,
  },
  {
    path: "/sales/bill/create",
    module: "gst_billing",
    action: "C",
    element: <BillForm />,
  },
  {
    path: "/purchase/:type",
    module: "purchase_orders",
    action: "V",
    element: <GenericPage />,
  },
  {
    path: "/master/other/patient",
    module: "other",
    action: "V",
    element: <Patient />,
  },
  {
    path: "/master/other/patient/create",
    module: "other",
    action: "C",
    element: <AddPatient />,
  },
  {
    path: "/master/other/patient/edit/:id",
    module: "other",
    action: "E",
    element: <PatientForm isEditMode={true} />,
  },
  {
    path: "/master/other/prescription",
    module: "other",
    action: "V",
    element: <PrescriptionList />,
  },
  {
    path: "/masters/other/prescription/create",
    module: "other",
    action: "C",
    element: <CreatePrescriptionPage />,
  },






  {
    path: "/opening/:type",
    module: "inventory",
    action: "V",
    element: <GenericPage />,
  },
  {
    path: "/accounting/:type",
    module: "financial_reports",
    action: "V",
    element: <GenericPage />,
  },
  {
    path: "/stock/:type",
    module: "inventory",
    action: "V",
    element: <GenericPage />,
  },
  {
    path: "/cashbook/:type",
    module: "financial_reports",
    action: "V",
    element: <GenericPage />,
  },
  {
    path: "/banking/:type",
    module: "financial_reports",
    action: "V",
    element: <GenericPage />,
  },
  {
    path: "/discount/:type",
    module: "gst_billing",
    action: "V",
    element: <GenericPage />,
  },
  {
    path: "/crm/:type",
    module: "inventory",
    action: "V",
    element: <GenericPage />,
  },

  {
    path: "/report",
    module: "dashboard",
    action: "V",
    element: <GenericPage title="Report" />,
  },
  {
    path: "/otherproducts",
    module: "inventory",
    action: "V",
    element: <GenericPage title="Other Products" />,
  },
  {
    path: "/utilities",
    module: "settings",
    action: "V",
    element: <GenericPage title="Utilities & Tools" />,
  },
  {
    path: "/onlinestore",
    module: "inventory",
    action: "V",
    element: <GenericPage title="Online Store" />,
  },
];

export default routeConfig;
