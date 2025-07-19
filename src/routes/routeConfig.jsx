import Dashboard from "../pages/Dashboard";
import GenericPage from "../pages/GenericPage";
import ItemsPage from "../pages/masters/inventory/Item/Item";
import ItemDetails from "../pages/masters/inventory/Item/ItemDetails";
import StorePage from "../pages/masters/inventory/store/Store";
import RackPage from "../pages/masters/inventory/rack/Rack";
import Company from "../pages/masters/inventory/company/Company";
import SaltPage from "../pages/masters/inventory/salt/Salt";
import UnitPage from "../pages/masters/inventory/unit/Unit";
import HSNPage from "../pages/masters/inventory/hsn/HSN";
import MFRPage from "../pages/masters/inventory/menufcurer/MFR";
import Price from "../pages/masters/rate/Price";
// import BillPage from "../pages/purchase/Bill";
import Viewledger from "../pages/masters/account/Ledger/Viewledger";
import CreateCompanyPage from "../pages/masters/inventory/company/CreateCompanyPage";
import CreateItemPage from "../pages/masters/inventory/Item/CreateItemPage";
import CreateSaltPage from "../pages/masters/inventory/salt/AddSalt";
import CompanyForm from "../pages/masters/inventory/company/CreateCompanyPage";
import ItemForm from "../pages/masters/inventory/Item/CreateItemPage";
import SaltForm from "../pages/masters/inventory/salt/AddSalt";
import CreateManufacturerPage from "../pages/masters/inventory/menufcurer/AddMFR";

const routeConfig = [
  { path: "/dashboard", module: "dashboard", action: "V", element: <Dashboard /> },
  { path: "/master/accounts/ledger", module: "audit_logs", action: "V", element: <Viewledger /> },
  { path: "/master/accounts/group", module: "audit_logs", action: "V", element: <GenericPage title="Group" /> },
  { path: "/master/accounts/sale", module: "gst_billing", action: "V", element: <GenericPage title="Sale" /> },
  { path: "/master/accounts/purchase", module: "purchase_orders", action: "V", element: <GenericPage title="Purchase" /> },

  { path: "/master/inventory/items", module: "inventory", action: "V", element: <ItemsPage /> },
  { path: "/master/inventory/items/:id", module: "inventory", action: "V", element: <ItemDetails /> },
  { path: "/master/inventory/items/create", module: "inventory", action: "C", element: <CreateItemPage /> },
  { path: "/master/inventory/items/edit/:id", module: "inventory", action: "E", element: <ItemForm isEditMode={true} /> },

  { path: "/master/inventory/stores", module: "inventory", action: "V", element: <StorePage /> },
  { path: "/master/inventory/units", module: "inventory", action: "V", element: <UnitPage /> },
  { path: "/master/inventory/racks", module: "inventory", action: "V", element: <RackPage /> },
  { path: "/master/inventory/companies", module: "inventory", action: "V", element: <Company /> },
  { path: "/master/inventory/company/create", module: "inventory", action: "C", element: <CreateCompanyPage /> },
  { path: "/master/inventory/companies/edit/:id", module: "inventory", action: "E", element: <CompanyForm isEditMode={true} /> },

  { path: "/master/inventory/salts", module: "inventory", action: "V", element: <SaltPage /> },
  { path: "/master/inventory/salt/create", module: "inventory", action: "C", element: <CreateSaltPage /> },
  { path: "/master/inventory/salt/edit/:id", module: "inventory", action: "E", element: <SaltForm isEditMode={true} /> },

  { path: "/master/inventory/sacs", module: "inventory", action: "V", element: <HSNPage /> },
  { path: "/master/inventory/manufacturers", module: "inventory", action: "V", element: <MFRPage /> },
  { path: "/master/inventory/manufacturers/create", module: "inventory", action: "C", element: <CreateManufacturerPage /> },
  { path: "/master/rates/pricelist", module: "rate_master", action: "V", element: <Price /> },

  { path: "/master/inventory/:type", module: "inventory", action: "V", element: <GenericPage /> },
  { path: "/sales/:type", module: "gst_billing", action: "V", element: <GenericPage /> },
  { path: "/purchase/:type", module: "purchase_orders", action: "V", element: <GenericPage /> },
  { path: "/other/:type", module: "inventory", action: "V", element: <GenericPage /> },
  { path: "/opening/:type", module: "inventory", action: "V", element: <GenericPage /> },
  { path: "/accounting/:type", module: "financial_reports", action: "V", element: <GenericPage /> },
  { path: "/stock/:type", module: "inventory", action: "V", element: <GenericPage /> },
  { path: "/cashbook/:type", module: "financial_reports", action: "V", element: <GenericPage /> },
  { path: "/banking/:type", module: "financial_reports", action: "V", element: <GenericPage /> },
  { path: "/discount/:type", module: "gst_billing", action: "V", element: <GenericPage /> },
  { path: "/crm/:type", module: "inventory", action: "V", element: <GenericPage /> },

  { path: "/report", module: "dashboard", action: "V", element: <GenericPage title="Report" /> },
  { path: "/otherproducts", module: "inventory", action: "V", element: <GenericPage title="Other Products" /> },
  { path: "/utilities", module: "settings", action: "V", element: <GenericPage title="Utilities & Tools" /> },
  { path: "/onlinestore", module: "inventory", action: "V", element: <GenericPage title="Online Store" /> },
];

export default routeConfig;
