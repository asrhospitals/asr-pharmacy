import { useEffect, useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Search,
  HelpCircle,
  LogOut,
  Bell,
  ChevronLeft,
} from "lucide-react";
// import { useAuth } from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import { menuConfig } from "../../data/menuData";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../services/userSlice";
import Input from "./Input";
import { hasPermission } from "../../data/permissions";

// Map menu item paths to permission keys (should match routePermissions in Routes.jsx)
const pathToPermission = {
  "/dashboard": "dashboard",
  "/master/accounts/ledger": "reports",
  "/master/accounts/group": "reports",
  "/master/accounts/sale": "gst_billing",
  "/master/accounts/purchase": "purchase_orders",
  "/master/inventory/items": "inventory",
  "/master/inventory/stores": "inventory",
  "/master/inventory/units": "inventory",
  "/master/inventory/racks": "inventory",
  "/master/inventory/companys": "inventory",
  "/master/inventory/salts": "inventory",
  "/master/inventory/sacs": "inventory",
  "/master/inventory/manufacturers": "inventory",
  "/sales/orders": "gst_billing",
  "/sales/bill": "gst_billing",
  "/sales/quotation": "gst_billing",
  "/sales/countersale": "gst_billing",
  "/sales/stockissue": "inventory",
  "/purchase/order": "purchase_orders",
  "/purchase/bill": "gst_billing",
  "/purchase/stockreceive": "inventory",
  "/purchase/return": "return_expiry",
  "/purchase/brkexp": "return_expiry",
  "/master/rates/pricelist": "inventory",
  "/discount/agency": "gst_billing",
  "/discount/itemwise": "gst_billing",
  "/other/patient": "inventory",
  "/other/prescription": "view_prescription",
  "/other/station": "inventory",
  "/opening/ledger": "inventory",
  "/opening/stock": "inventory",
  "/tds": "financial_reports",
  "/currency/multicurrency": "inventory",
  "/currency/exchangerate": "inventory",
  "/accounting/receipt": "financial_reports",
  "/accounting/payment": "financial_reports",
  "/accounting/debitnote": "financial_reports",
  "/accounting/creditnote": "financial_reports",
  "/accounting/contra": "financial_reports",
  "/accounting/journal": "financial_reports",
  "/accounting/bankreconciliation": "financial_reports",
  "/stock/transfer": "inventory",
  "/stock/physical": "inventory",
  "/cashbook/openclose": "financial_reports",
  "/cashbook/deposits": "financial_reports",
  "/cashbook/approvals": "financial_reports",
  "/cashbook/transfer": "financial_reports",
  "/banking/onlinepayment": "financial_reports",
  "/banking/onlinestatement": "financial_reports",
  "/banking/chequemanagement": "financial_reports",
  "/report": "reports",
  "/otherproducts": "inventory",
  "/utilities": "settings",
  "/onlinestore": "inventory",
  "/crm/homedelivery": "inventory",
  "/crm/prescriptionreminder": "inventory",
};

// Recursively filter menu items based on RBAC
function filterMenuByPermission(items, role) {
  return items
    .map((item) => {
      if (item.children) {
        const filteredChildren = filterMenuByPermission(item.children, role);
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return null;
      }
      if (item.path) {
        const permKey = pathToPermission[item.path] || "dashboard";
        if (hasPermission(role, permKey, "V")) {
          return item;
        }
        return null;
      }
      return item;
    })
    .filter(Boolean);
}

const useIsLargeScreen = () => {
  const [isLarge, setIsLarge] = useState(() => window.innerWidth >= 1024);
  useEffect(() => {
    const handler = () => setIsLarge(window.innerWidth >= 1024);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return isLarge;
};

const Sidebar = ({
  isCollapsed,
  setIsCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const [expandedItems, setExpandedItems] = useState(["Dashboard"]);
  const [isHovered, setIsHovered] = useState(false);
  const isLargeScreen = useIsLargeScreen();
  // Sidebar is expanded if: (mobile and drawer open) OR (large screen and expanded or hovered)
  const isSidebarExpanded = (!isLargeScreen && mobileOpen) || (isLargeScreen && (!isCollapsed || isHovered));
  const user = useSelector((state) => state.user.user);
  console.log(user);

  const dispatch = useDispatch();
  const logout = () => dispatch(logoutAction());
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = filterMenuByPermission(
    menuConfig[user?.role] || [],
    user?.role
  );

  const toggleExpanded = (title) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  const handleItemClick = (title, path) => {
    if (path) {
      navigate(path, { state: { title } });
    }
  };

  const isItemActive = (item) => {
    if (item.path === location.pathname) return true;
    if (item.children) {
      return item.children.some((child) => isItemActive(child));
    }
    return false;
  };

  const renderMenuItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const isActive = isItemActive(item);
    const isDirectActive = location.pathname === item.path;

    const indentClass =
      level === 0 ? "" : level === 1 ? "ml-4" : level === 2 ? "ml-8" : "ml-12";

    return (
      <div key={`${item.title}-${level}`} className="mb-1">
        <div
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${indentClass} ${
            isDirectActive
              ? "bg-blue-50 text-blue-600 border-r-2 border-blue-600"
              : isActive && !isDirectActive
              ? "bg-blue-25 text-blue-500"
              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
          }`}
          onClick={() => {
            if (hasChildren && !isCollapsed) {
              toggleExpanded(item.title);
            } else if (item.path) {
              handleItemClick(item.title, item.path);
            }
          }}
        >
          <div className="flex items-center gap-3">
            {Icon && level === 0 && (
              <Icon
                className={`w-5 h-5 transition-colors ${
                  isDirectActive
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
            )}

            {level > 0 && !Icon && (
              <div
                className={`w-2 h-2 rounded-full transition-colors ${
                  isDirectActive ? "bg-blue-600" : "bg-gray-300"
                }`}
              ></div>
            )}

            {Icon && level > 0 && (
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isDirectActive
                    ? "text-blue-600"
                    : "text-gray-500 group-hover:text-gray-700"
                }`}
              />
            )}

            {isSidebarExpanded && (
              <span className={`font-medium transition-colors text-sm`}>
                {item.title}
              </span>
            )}
          </div>

          {isSidebarExpanded && hasChildren && (
            <div className="flex items-center">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          )}
        </div>

        {isSidebarExpanded && hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children.map((child) => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  // Overlay and drawer logic for mobile
  return (
    <>
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black/30 z-50 transition-opacity duration-300 lg:hidden ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
      {/* Sidebar Drawer / Static Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-60 bg-white shadow-lg border-r border-gray-200 transition-all duration-300 lg:static lg:z-0 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${isLargeScreen ? (isCollapsed ? "w-16 hover:w-64" : "w-64") : "w-64"} overflow-x-hidden`}
        style={{ maxWidth: "100vw" }}
        onMouseEnter={() => isLargeScreen && isCollapsed && setIsHovered(true)}
        onMouseLeave={() => isLargeScreen && isCollapsed && setIsHovered(false)}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-2 p-4 border-b border-gray-200">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">ASR</span>
            </div>
            {isSidebarExpanded && (
              <span className="font-bold text-gray-800 text-lg">
                ASR Pharmacy
              </span>
            )}
            {/* Mobile close button */}
            <button
              className="lg:hidden ml-auto p-2 rounded hover:bg-gray-100 focus:outline-none"
              onClick={() => setMobileOpen(false)}
              aria-label="Close sidebar"
            >
              <X className="w-6 h-6 text-gray-700" />
            </button>
          </div>
          {/* User Role Badge */}
          {isSidebarExpanded && (
            <div className="px-4 py-2">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg">
                <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
                  {user?.role?.replace("_", " ")}
                </span>
              </div>
            </div>
          )}
          {/* Search */}
          {isSidebarExpanded && (
            <div className="p-4">
              <div className="relative">
                <Input
                  label="Search"
                  type="text"
                  startIcon={<Search className="w-4 h-4 text-gray-400" />}
                  className="w-full"
                />
              </div>
            </div>
          )}
          {/* Navigation Menu */}
          <nav className="flex-1 px-2 pt-2 pb-10 overflow-y-auto">
            <div className="space-y-1">
              {menuItems.map((item) => renderMenuItem(item))}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};
export default Sidebar;
