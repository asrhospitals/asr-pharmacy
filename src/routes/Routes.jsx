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

const Router = () => {
  const { currentPath } = useNavigation();

  const routes = {
    "/dashboard": { component: Dashboard, title: "Dashboard" },

    ///-----------Account--------------------
    "/master/accounts/ledger": {
      component: Viewledger,
      title: "Ledger",
      props: { title: "Ledger", path: "/master/accounts/ledger" },
    },
    "/master/accounts/group": {
      component: GenericPage,
      title: "Group",
      props: { title: "Group", path: "/master/accounts/group" },
    },
    "/master/accounts/sale": {
      component: GenericPage,
      title: "Sale",
      props: { title: "Sale", path: "/master/accounts/sale" },
    },
    "/master/accounts/purchase": {
      component: GenericPage,
      title: "Purchase",
      props: { title: "Purchase", path: "/master/accounts/purchase" },
    },

    //////--------Inventory--------------------//////////////
    "/master/inventory/items": {
      component: ItemsPage,
      title: "Items",
      props: { title: "Items", path: "/master/inventory/items" },
    },
    "/master/inventory/stores": {
      component: StorePage,
      title: "Store",
      props: { title: "Store", path: "/master/inventory/stores" },
    },
    "/master/inventory/units": {
      component: UnitPage,
      title: "Units",
      props: { title: "Units", path: "/master/inventory/units" },
    },
    "/master/inventory/racks": {
      component: RackPage,
      title: "Racks",
      props: { title: "Racks", path: "/master/inventory/racks" },
    },
    "/master/inventory/companys": {
      component: Company,
      title: "Company",
      props: { title: "Company", path: "/master/inventory/companys" },
    },
    "/master/inventory/salts": {
      component: SaltPage,
      title: "Salt",
      props: { title: "Salt", path: "/master/inventory/salts" },
    },
    "/master/inventory/sacs": {
      component: HSNPage,
      title: "HSN/SAC",
      props: { title: "HSN/SAC", path: "/master/inventory/sacs" },
    },
    "/master/inventory/manufacturers": {
      component: MFRPage,
      title: "Manufacturer",
      props: { title: "Manufacturer", path: "/master/inventory/manufacturers" },
    },

    //////------------Sale----------------///////////
    "/sales/orders": {
      component: GenericPage,
      title: "Orders",
      props: { title: "Orders", path: "/sales/orders" },
    },
    "/sales/bill": {
      component: GenericPage,
      title: "Bill",
      props: { title: "Bill", path: "/sales/bill" },
    },
    "/sales/countersale": {
      component: GenericPage,
      title: "Counter Sale",
      props: { title: "Counter Sale", path: "/sales/countersale" },
    },
    "/sales/stockissue": {
      component: GenericPage,
      title: "Stock Issue",
      props: { title: "Stock Issue", path: "/sales/stockissue" },
    },
    "/sales/quotations": {
      component: GenericPage,
      title: "Quotations",
      props: { title: "Quotations", path: "/sales/quotations" },
    },

    ////////-----------Purchase-------------//////////////////

    "/purchase/order": {
      component: GenericPage,
      title: "Order",
      props: { title: "Order", path: "/purchase/order" },
    },
    "/purchase/bill": {
      component: BillPage,
      title: "Bill",
      props: { title: "Bill", path: "/purchase/bill" },
    },
    "/purchase/stockreceive": {
      component: GenericPage,
      title: "Stock Receive",
      props: { title: "Stock Receive", path: "/purchase/stockreceive" },
    },
    "/purchase/return": {
      component: GenericPage,
      title: "Return",
      props: { title: "Return", path: "/purchase/return" },
    },
    "/purchase/brkexp": {
      component: GenericPage,
      title: "Brk/Exp Issue",
      props: { title: "Brk/Exp Issue", path: "/purchase/brkexp" },
    },
    "/master/rates/pricelist": {
      component: GenericPage,
      title: "Price List",
      props: { title: "Price List", path: "/master/rates/pricelist" },
    },
    "/discount/agency": {
      component: GenericPage,
      title: "Agency General Discount",
      props: { title: "Agency General Discount", path: "/discount/agency" },
    },
    "/discount/itemwise": {
      component: GenericPage,
      title: "Item wise Discount",
      props: { title: "Item wise Discount", path: "/discount/itemwise" },
    },
    "/other/patient": {
      component: GenericPage,
      title: "Patient",
      props: { title: "Patient", path: "/other/patient" },
    },
    "/other/prescription": {
      component: GenericPage,
      title: "Prescription",
      props: { title: "Prescription", path: "/other/prescription" },
    },
    "/other/station": {
      component: GenericPage,
      title: "Station",
      props: { title: "Station", path: "/other/station" },
    },
    "/opening/ledger": {
      component: GenericPage,
      title: "Ledger (Opening)",
      props: { title: "Ledger (Opening)", path: "/opening/ledger" },
    },
    "/opening/stock": {
      component: GenericPage,
      title: "Stock (Opening)",
      props: { title: "Stock (Opening)", path: "/opening/stock" },
    },
    "/tds": {
      component: GenericPage,
      title: "TDS",
      props: { title: "TDS", path: "/tds" },
    },
    "/currency/multicurrency": {
      component: GenericPage,
      title: "Multi Currency",
      props: { title: "Multi Currency", path: "/currency/multicurrency" },
    },
    "/currency/exchangerate": {
      component: GenericPage,
      title: "Exchange Rate",
      props: { title: "Exchange Rate", path: "/currency/exchangerate" },
    },
    "/accounting/receipt": {
      component: GenericPage,
      title: "Receipt",
      props: { title: "Receipt", path: "/accounting/receipt" },
    },
    "/accounting/payment": {
      component: GenericPage,
      title: "Payment",
      props: { title: "Payment", path: "/accounting/payment" },
    },
    "/accounting/debitnote": {
      component: GenericPage,
      title: "Debit Note",
      props: { title: "Debit Note", path: "/accounting/debitnote" },
    },
    "/accounting/creditnote": {
      component: GenericPage,
      title: "Credit Note",
      props: { title: "Credit Note", path: "/accounting/creditnote" },
    },
    "/accounting/contra": {
      component: GenericPage,
      title: "Contra",
      props: { title: "Contra", path: "/accounting/contra" },
    },
    "/accounting/journal": {
      component: GenericPage,
      title: "Journal",
      props: { title: "Journal", path: "/accounting/journal" },
    },
    "/accounting/bankreconciliation": {
      component: GenericPage,
      title: "Bank Reconciliation",
      props: { title: "Bank Reconciliation", path: "/accounting/bankreconciliation" },
    },
    "/stock/transfer": {
      component: GenericPage,
      title: "Stock Transfer",
      props: { title: "Stock Transfer", path: "/stock/transfer" },
    },
    "/stock/physical": {
      component: GenericPage,
      title: "Physical Stock",
      props: { title: "Physical Stock", path: "/stock/physical" },
    },
    "/cashbook/openclose": {
      component: GenericPage,
      title: "Open/Close Cashday",
      props: { title: "Open/Close Cashday", path: "/cashbook/openclose" },
    },
    "/cashbook/deposits": {
      component: GenericPage,
      title: "Cash Deposits",
      props: { title: "Cash Deposits", path: "/cashbook/deposits" },
    },
    "/cashbook/approvals": {
      component: GenericPage,
      title: "Manage Approvals",
      props: { title: "Manage Approvals", path: "/cashbook/approvals" },
    },
    "/cashbook/transfer": {
      component: GenericPage,
      title: "Cash Transfer",
      props: { title: "Cash Transfer", path: "/cashbook/transfer" },
    },
    "/banking/onlinepayment": {
      component: GenericPage,
      title: "Online Payment",
      props: { title: "Online Payment", path: "/banking/onlinepayment" },
    },
    "/banking/onlinestatement": {
      component: GenericPage,
      title: "Online Statement",
      props: { title: "Online Statement", path: "/banking/onlinestatement" },
    },
    "/banking/chequemanagement": {
      component: GenericPage,
      title: "Cheque Management",
      props: { title: "Cheque Management", path: "/banking/chequemanagement" },
    },
    "/report": {
      component: GenericPage,
      title: "Report",
      props: { title: "Report", path: "/report" },
    },
    "/otherproducts": {
      component: GenericPage,
      title: "Other Products",
      props: { title: "Other Products", path: "/otherproducts" },
    },
    "/utilities": {
      component: GenericPage,
      title: "Utilities & Tools",
      props: { title: "Utilities & Tools", path: "/utilities" },
    },
    "/onlinestore": {
      component: GenericPage,
      title: "Online Store",
      props: { title: "Online Store", path: "/onlinestore" },
    },
    "/crm/homedelivery": {
      component: GenericPage,
      title: "Home Delivery",
      props: { title: "Home Delivery", path: "/crm/homedelivery" },
    },
    "/crm/prescriptionreminder": {
      component: GenericPage,
      title: "Prescription Reminder",
      props: { title: "Prescription Reminder", path: "/crm/prescriptionreminder" },
    },
  };

  const route = routes[currentPath] || routes["/dashboard"];
  const Component = route.component;

  return <Component {...(route.props || {})} />;
};

export default Router;
