import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import BillPage from "../pages/purchase/Bill";
import Viewledger from "../pages/masters/account/Ledger/Viewledger";
import ProtectedRoute from "./ProtectedRoute";
import Unauthorized from "../pages/Unauthorized";
import CreateCompanyPage from "../pages/masters/inventory/company/CreateCompanyPage";
import CreateItemPage from "../pages/masters/inventory/Item/CreateItemPage";
import CreateSaltPage from "../pages/masters/inventory/salt/AddSalt";

const AppRoutes = () => (
  <Routes>
    <Route
      path="/dashboard"
      element={
        <ProtectedRoute module="dashboard" action="V">
          <Dashboard />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/accounts/ledger"
      element={
        <ProtectedRoute module="audit_logs" action="V">
          <Viewledger />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/accounts/group"
      element={
        <ProtectedRoute module="audit_logs" action="V">
          <GenericPage title="Group" />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/accounts/sale"
      element={
        <ProtectedRoute module="gst_billing" action="V">
          <GenericPage title="Sale" />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/accounts/purchase"
      element={
        <ProtectedRoute module="purchase_orders" action="V">
          <GenericPage title="Purchase" />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/items"
      element={
        <ProtectedRoute module="inventory" action="V">
          <ItemsPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/items/:id"
      element={
        <ProtectedRoute module="inventory" action="V">
          <ItemDetails />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/items/create"
      element={
        <ProtectedRoute module="inventory" action="C">
          <CreateItemPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/stores"
      element={
        <ProtectedRoute module="inventory" action="V">
          <StorePage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/units"
      element={
        <ProtectedRoute module="inventory" action="V">
          <UnitPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/racks"
      element={
        <ProtectedRoute module="inventory" action="V">
          <RackPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/companys"
      element={
        <ProtectedRoute module="inventory" action="V">
          <Company />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/company/create"
      element={
        <ProtectedRoute module="inventory" action="C">
          <CreateCompanyPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/salts"
      element={
        <ProtectedRoute module="inventory" action="V">
          <SaltPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/salt/create"
      element={
        <ProtectedRoute module="inventory" action="C">
          <CreateSaltPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/sacs"
      element={
        <ProtectedRoute module="inventory" action="V">
          <HSNPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/master/inventory/manufacturers"
      element={
        <ProtectedRoute module="inventory" action="V">
          <MFRPage />
        </ProtectedRoute>
      }
    />
    {/* fallback for other inventory types */}
    <Route
      path="/master/inventory/:type"
      element={
        <ProtectedRoute module="inventory" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    {/* ...add other routes as needed, using :param for dynamic segments */}
    <Route
      path="/sales/:type"
      element={
        <ProtectedRoute module="gst_billing" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/purchase/:type"
      element={
        <ProtectedRoute module="purchase_orders" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/other/:type"
      element={
        <ProtectedRoute module="inventory" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/opening/:type"
      element={
        <ProtectedRoute module="inventory" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/accounting/:type"
      element={
        <ProtectedRoute module="financial_reports" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/stock/:type"
      element={
        <ProtectedRoute module="inventory" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/cashbook/:type"
      element={
        <ProtectedRoute module="financial_reports" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/banking/:type"
      element={
        <ProtectedRoute module="financial_reports" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/discount/:type"
      element={
        <ProtectedRoute module="gst_billing" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/crm/:type"
      element={
        <ProtectedRoute module="inventory" action="V">
          <GenericPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/report"
      element={
        <ProtectedRoute module="dashboard" action="V">
          <GenericPage title="Report" />
        </ProtectedRoute>
      }
    />
    <Route
      path="/otherproducts"
      element={
        <ProtectedRoute module="inventory" action="V">
          <GenericPage title="Other Products" />
        </ProtectedRoute>
      }
    />
    <Route
      path="/utilities"
      element={
        <ProtectedRoute module="settings" action="V">
          <GenericPage title="Utilities & Tools" />
        </ProtectedRoute>
      }
    />
    <Route
      path="/onlinestore"
      element={
        <ProtectedRoute module="inventory" action="V">
          <GenericPage title="Online Store" />
        </ProtectedRoute>
      }
    />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<Navigate to="/dashboard" replace />} />
  </Routes>
);

export default AppRoutes;
