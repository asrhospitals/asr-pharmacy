import React from "react";
import PrescriptionList from "../pages/masters/other/prescription/Prescription";
import CreatePrescriptionPage from "../pages/masters/other/prescription/CreatePrescriptionPage";

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

const routeConfig = [
  {
    path: "/dashboard",
    module: "dashboard",
    action: "V",
    element: <Dashboard />,
  },
  {
    path: "/master/accounts/ledger",
    module: "audit_logs",
    action: "V",
    element: <Viewledger />,
  },
  {
    path: "/master/accounts/group",
    module: "audit_logs",
    action: "V",
    element: <GenericPage title="Group" />,
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
    path: "/sales/:type",
    module: "gst_billing",
    action: "V",
    element: <GenericPage />,
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
  // {
  //   path: "/master/other/prescription/edit/:id",
  //   module: "other",
  //   action: "E",
  //   element: <PatientForm isEditMode={true} />,
  // },
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
