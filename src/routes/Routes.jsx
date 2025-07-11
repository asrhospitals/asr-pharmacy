import React from "react";
import Dashboard from "../pages/Dashboard";
import GenericPage from "../pages/GenericPage";
import { useNavigation } from "../hooks/useNavigation";
import ItemsPage from "../pages/masters/inventory/Item/Item";
import StorePage from "../pages/masters/inventory/store/Store";
import RackPage from "../pages/masters/inventory/rack/Rack";
import Company from "../pages/masters/inventory/company/Company";
import SaltPage from "../pages/masters/inventory/salt/Salt";
import UnitPage from "../pages/masters/inventory/unit/Unit";
import HSNPage from "../pages/masters/inventory/hsn/HSN";
import MFRPage from "../pages/masters/inventory/menufcurer/MFR";
import BillPage from "../pages/purchase/Bill";
import Viewledger from "../pages/masters/account/Ledger/Viewledger";
import { useSelector } from "react-redux";
import { hasPermission } from '../data/permissions';

const Unauthorized = () => (
  <div className="flex flex-col items-center justify-center h-full p-8">
    <h1 className="text-2xl font-bold text-red-600 mb-4">Unauthorized</h1>
    <p className="text-gray-700">
      You do not have permission to access this page.
    </p>
  </div>
);

const routePermissions = {
  '/dashboard': 'dashboard',
  '/master/accounts/ledger': 'reports',
  '/master/accounts/group': 'reports',
  '/master/accounts/sale': 'gst_billing',
  '/master/accounts/purchase': 'purchase_orders',
  '/master/inventory/items': 'inventory',
  '/master/inventory/stores': 'inventory',
  '/master/inventory/units': 'inventory',
  '/master/inventory/racks': 'inventory',
  '/master/inventory/companys': 'inventory',
  '/master/inventory/salts': 'inventory',
  '/master/inventory/sacs': 'inventory',
  '/master/inventory/manufacturers': 'inventory',
  '/sales/orders': 'gst_billing',
  '/sales/bill': 'gst_billing',
  '/sales/countersale': 'gst_billing',
  '/sales/stockissue': 'inventory',
  '/sales/quotations': 'gst_billing',
  '/purchase/order': 'purchase_orders',
  '/purchase/bill': 'gst_billing',
  '/purchase/stockreceive': 'inventory',
  '/purchase/return': 'return_expiry',
  '/purchase/brkexp': 'return_expiry',
  '/master/rates/pricelist': 'inventory',
  '/discount/agency': 'gst_billing',
  '/discount/itemwise': 'gst_billing',
  '/other/patient': 'inventory',
  '/other/prescription': 'view_prescription',
  '/other/station': 'inventory',
  '/opening/ledger': 'inventory',
  '/opening/stock': 'inventory',
  '/tds': 'financial_reports',
  '/currency/multicurrency': 'inventory',
  '/currency/exchangerate': 'inventory',
  '/accounting/receipt': 'financial_reports',
  '/accounting/payment': 'financial_reports',
  '/accounting/debitnote': 'financial_reports',
  '/accounting/creditnote': 'financial_reports',
  '/accounting/contra': 'financial_reports',
  '/accounting/journal': 'financial_reports',
  '/accounting/bankreconciliation': 'financial_reports',
  '/stock/transfer': 'inventory',
  '/stock/physical': 'inventory',
  '/cashbook/openclose': 'financial_reports',
  '/cashbook/deposits': 'financial_reports',
  '/cashbook/approvals': 'financial_reports',
  '/cashbook/transfer': 'financial_reports',
  '/banking/onlinepayment': 'financial_reports',
  '/banking/onlinestatement': 'financial_reports',
  '/banking/chequemanagement': 'financial_reports',
  '/report': 'reports',
  '/otherproducts': 'inventory',
  '/utilities': 'settings',
  '/onlinestore': 'inventory',
  '/crm/homedelivery': 'inventory',
  '/crm/prescriptionreminder': 'inventory',
};

const Router = () => {
  const { currentPath } = useNavigation();
  const userRole = useSelector((state) => state.user.user?.role);

  const routes = {
    "/dashboard": {
      component: Dashboard,
      title: "Dashboard",
      allowedRoles: ["admin", "manager", "user"],
    },

    ///-----------Account--------------------
    "/master/accounts/ledger": {
      component: Viewledger,
      title: "Ledger",
      props: { title: "Ledger", path: "/master/accounts/ledger" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/master/accounts/group": {
      component: GenericPage,
      title: "Group",
      props: { title: "Group", path: "/master/accounts/group" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/master/accounts/sale": {
      component: GenericPage,
      title: "Sale",
      props: { title: "Sale", path: "/master/accounts/sale" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/master/accounts/purchase": {
      component: GenericPage,
      title: "Purchase",
      props: { title: "Purchase", path: "/master/accounts/purchase" },
      allowedRoles: ["admin", "manager", "user"],
    },

    //////--------Inventory--------------------//////////////
    "/master/inventory/items": {
      component: ItemsPage,
      title: "Items",
      props: { title: "Items", path: "/master/inventory/items" },
      allowedRoles: ["admin", "manager"],
    },
    "/master/inventory/stores": {
      component: StorePage,
      title: "Store",
      props: { title: "Store", path: "/master/inventory/stores" },
      allowedRoles: ["admin", "manager"],
    },
    "/master/inventory/units": {
      component: UnitPage,
      title: "Units",
      props: { title: "Units", path: "/master/inventory/units" },
      allowedRoles: ["admin", "manager"],
    },
    "/master/inventory/racks": {
      component: RackPage,
      title: "Racks",
      props: { title: "Racks", path: "/master/inventory/racks" },
      allowedRoles: ["admin"],
    },
    "/master/inventory/companys": {
      component: Company,
      title: "Company",
      props: { title: "Company", path: "/master/inventory/companys" },
      allowedRoles: ["admin"],
    },
    "/master/inventory/salts": {
      component: SaltPage,
      title: "Salt",
      props: { title: "Salt", path: "/master/inventory/salts" },
      allowedRoles: ["admin", "manager"],
    },
    "/master/inventory/sacs": {
      component: HSNPage,
      title: "HSN/SAC",
      props: { title: "HSN/SAC", path: "/master/inventory/sacs" },
      allowedRoles: ["admin", "manager"],
    },
    "/master/inventory/manufacturers": {
      component: MFRPage,
      title: "Manufacturer",
      props: { title: "Manufacturer", path: "/master/inventory/manufacturers" },
      allowedRoles: ["admin"],
    },

    //////------------Sale----------------///////////
    "/sales/orders": {
      component: GenericPage,
      title: "Orders",
      props: { title: "Orders", path: "/sales/orders" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/sales/bill": {
      component: GenericPage,
      title: "Bill",
      props: { title: "Bill", path: "/sales/bill" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/sales/countersale": {
      component: GenericPage,
      title: "Counter Sale",
      props: { title: "Counter Sale", path: "/sales/countersale" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/sales/stockissue": {
      component: GenericPage,
      title: "Stock Issue",
      props: { title: "Stock Issue", path: "/sales/stockissue" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/sales/quotations": {
      component: GenericPage,
      title: "Quotations",
      props: { title: "Quotations", path: "/sales/quotations" },
      allowedRoles: ["admin", "manager", "user"],
    },

    ////////-----------Purchase-------------//////////////////

    "/purchase/order": {
      component: GenericPage,
      title: "Order",
      props: { title: "Order", path: "/purchase/order" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/purchase/bill": {
      component: BillPage,
      title: "Bill",
      props: { title: "Bill", path: "/purchase/bill" },
      allowedRoles: ["admin", "manager"],
    },
    "/purchase/stockreceive": {
      component: GenericPage,
      title: "Stock Receive",
      props: { title: "Stock Receive", path: "/purchase/stockreceive" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/purchase/return": {
      component: GenericPage,
      title: "Return",
      props: { title: "Return", path: "/purchase/return" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/purchase/brkexp": {
      component: GenericPage,
      title: "Brk/Exp Issue",
      props: { title: "Brk/Exp Issue", path: "/purchase/brkexp" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/master/rates/pricelist": {
      component: GenericPage,
      title: "Price List",
      props: { title: "Price List", path: "/master/rates/pricelist" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/discount/agency": {
      component: GenericPage,
      title: "Agency General Discount",
      props: { title: "Agency General Discount", path: "/discount/agency" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/discount/itemwise": {
      component: GenericPage,
      title: "Item wise Discount",
      props: { title: "Item wise Discount", path: "/discount/itemwise" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/other/patient": {
      component: GenericPage,
      title: "Patient",
      props: { title: "Patient", path: "/other/patient" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/other/prescription": {
      component: GenericPage,
      title: "Prescription",
      props: { title: "Prescription", path: "/other/prescription" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/other/station": {
      component: GenericPage,
      title: "Station",
      props: { title: "Station", path: "/other/station" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/opening/ledger": {
      component: GenericPage,
      title: "Ledger (Opening)",
      props: { title: "Ledger (Opening)", path: "/opening/ledger" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/opening/stock": {
      component: GenericPage,
      title: "Stock (Opening)",
      props: { title: "Stock (Opening)", path: "/opening/stock" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/tds": {
      component: GenericPage,
      title: "TDS",
      props: { title: "TDS", path: "/tds" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/currency/multicurrency": {
      component: GenericPage,
      title: "Multi Currency",
      props: { title: "Multi Currency", path: "/currency/multicurrency" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/currency/exchangerate": {
      component: GenericPage,
      title: "Exchange Rate",
      props: { title: "Exchange Rate", path: "/currency/exchangerate" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/accounting/receipt": {
      component: GenericPage,
      title: "Receipt",
      props: { title: "Receipt", path: "/accounting/receipt" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/accounting/payment": {
      component: GenericPage,
      title: "Payment",
      props: { title: "Payment", path: "/accounting/payment" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/accounting/debitnote": {
      component: GenericPage,
      title: "Debit Note",
      props: { title: "Debit Note", path: "/accounting/debitnote" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/accounting/creditnote": {
      component: GenericPage,
      title: "Credit Note",
      props: { title: "Credit Note", path: "/accounting/creditnote" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/accounting/contra": {
      component: GenericPage,
      title: "Contra",
      props: { title: "Contra", path: "/accounting/contra" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/accounting/journal": {
      component: GenericPage,
      title: "Journal",
      props: { title: "Journal", path: "/accounting/journal" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/accounting/bankreconciliation": {
      component: GenericPage,
      title: "Bank Reconciliation",
      props: {
        title: "Bank Reconciliation",
        path: "/accounting/bankreconciliation",
      },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/stock/transfer": {
      component: GenericPage,
      title: "Stock Transfer",
      props: { title: "Stock Transfer", path: "/stock/transfer" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/stock/physical": {
      component: GenericPage,
      title: "Physical Stock",
      props: { title: "Physical Stock", path: "/stock/physical" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/cashbook/openclose": {
      component: GenericPage,
      title: "Open/Close Cashday",
      props: { title: "Open/Close Cashday", path: "/cashbook/openclose" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/cashbook/deposits": {
      component: GenericPage,
      title: "Cash Deposits",
      props: { title: "Cash Deposits", path: "/cashbook/deposits" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/cashbook/approvals": {
      component: GenericPage,
      title: "Manage Approvals",
      props: { title: "Manage Approvals", path: "/cashbook/approvals" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/cashbook/transfer": {
      component: GenericPage,
      title: "Cash Transfer",
      props: { title: "Cash Transfer", path: "/cashbook/transfer" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/banking/onlinepayment": {
      component: GenericPage,
      title: "Online Payment",
      props: { title: "Online Payment", path: "/banking/onlinepayment" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/banking/onlinestatement": {
      component: GenericPage,
      title: "Online Statement",
      props: { title: "Online Statement", path: "/banking/onlinestatement" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/banking/chequemanagement": {
      component: GenericPage,
      title: "Cheque Management",
      props: { title: "Cheque Management", path: "/banking/chequemanagement" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/report": {
      component: GenericPage,
      title: "Report",
      props: { title: "Report", path: "/report" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/otherproducts": {
      component: GenericPage,
      title: "Other Products",
      props: { title: "Other Products", path: "/otherproducts" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/utilities": {
      component: GenericPage,
      title: "Utilities & Tools",
      props: { title: "Utilities & Tools", path: "/utilities" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/onlinestore": {
      component: GenericPage,
      title: "Online Store",
      props: { title: "Online Store", path: "/onlinestore" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/crm/homedelivery": {
      component: GenericPage,
      title: "Home Delivery",
      props: { title: "Home Delivery", path: "/crm/homedelivery" },
      allowedRoles: ["admin", "manager", "user"],
    },
    "/crm/prescriptionreminder": {
      component: GenericPage,
      title: "Prescription Reminder",
      props: {
        title: "Prescription Reminder",
        path: "/crm/prescriptionreminder",
      },
      allowedRoles: ["admin", "manager", "user"],
    },
  };

  const route = routes[currentPath] || routes["/dashboard"];
  const Component = route.component;
  const permissionKey = routePermissions[currentPath] || 'dashboard';

  // RBAC check using new matrix
  if (!hasPermission(userRole, permissionKey, 'V')) {
    return <Unauthorized />;
  }

  return <Component {...(route.props || {})} />;
};

export default Router;
