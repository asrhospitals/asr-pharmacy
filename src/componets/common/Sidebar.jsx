import { useState } from "react";
import { ChevronDown, ChevronRight, Menu, X, Search, HelpCircle, LogOut, Bell } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigation } from "../../hooks/useNavigation";
import { menuConfig } from "../../data/menuData";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState(['Dashboard']);
  const { user, logout } = useAuth();
  const { currentPath, navigateTo } = useNavigation();

  const menuItems = menuConfig[user.role] || [];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleExpanded = (title) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const handleItemClick = (title, path) => {
    if (path) {
      navigateTo(path, title);
    }
  };

  // Helper function to check if an item or its children are active
  const isItemActive = (item) => {
    if (item.path === currentPath) return true;
    if (item.children) {
      return item.children.some(child => isItemActive(child));
    }
    return false;
  };

  const renderMenuItem = (item, level = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.includes(item.title);
    const isActive = isItemActive(item);
    const isDirectActive = currentPath === item.path;

    const indentClass = level === 0 ? '' : level === 1 ? 'ml-4' : level === 2 ? 'ml-8' : 'ml-12';
    
    return (
      <div key={`${item.title}-${level}`} className="mb-1">
        <div
          className={`flex items-center justify-between px-3 py-2.5 rounded-lg cursor-pointer transition-all duration-200 group ${indentClass} ${
            isDirectActive
              ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
              : isActive && !isDirectActive
              ? 'bg-blue-25 text-blue-500'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
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
                  isDirectActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                }`}
              />
            )}
            
            {level > 0 && !Icon && (
              <div className={`w-2 h-2 rounded-full transition-colors ${
                isDirectActive ? 'bg-blue-600' : 'bg-gray-300'
              }`}></div>
            )}
            
            {Icon && level > 0 && (
              <Icon
                className={`w-4 h-4 transition-colors ${
                  isDirectActive ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                }`}
              />
            )}

            {!isCollapsed && (
              <span className={`font-medium transition-colors text-sm`}>
                {item.title}
              </span>
            )}
          </div>

          {!isCollapsed && hasChildren && (
            <div className="flex items-center">
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
            </div>
          )}
        </div>

        {!isCollapsed && hasChildren && isExpanded && (
          <div className="mt-1 space-y-1">
            {item.children.map((child) => 
              renderMenuItem(child, level + 1)
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">ASR</span>
              </div>
              <span className="font-bold text-gray-800 text-lg">ASR Pharmacy</span>
            </div>
          )}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isCollapsed ? <Menu className="w-5 h-5" /> : <X className="w-5 h-5" />}
          </button>
        </div>

        {/* User Role Badge */}
        {!isCollapsed && (
          <div className="px-4 py-2">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-lg">
              <span className="text-xs font-medium text-blue-700 uppercase tracking-wide">
                {user.role.replace('_', ' ')}
              </span>
            </div>
          </div>
        )}

        {/* Search */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
        )}

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-2 overflow-y-auto">
          <div className="space-y-1">
            {menuItems.map((item) => renderMenuItem(item))}
          </div>
        </nav>

        {/* User Profile and Actions */}
        <div className="border-t border-gray-200 p-4">
          {!isCollapsed ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xs">{user.avatar}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">
                  <HelpCircle className="w-4 h-4" />
                  Help
                </button>
                <button
                  onClick={logout}
                  className="flex-1 flex items-center justify-center gap-2 py-2 px-3 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full flex items-center justify-center mx-auto">
                <span className="text-white font-bold text-xs">{user.avatar}</span>
              </div>
              <button
                onClick={logout}
                className="p-2 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
  export default Sidebar;