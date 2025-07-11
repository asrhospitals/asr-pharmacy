import { Menu, Bell, HelpCircle, Settings, User } from "lucide-react";

export default function DefaultHeader({ title, onMenuClick }) {
  return (
    <header className="bg-white p-4 border-b border-l border-gray-200 flex items-center justify-between">
      {/* Left: Logo, Hamburger, Company Name */}
      <div className="flex items-center gap-3">
        <button
          className="rounded-md hover:bg-gray-100"
          onClick={onMenuClick}
        >
          <Menu className="w-6 h-6 text-blue-600" />
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-sm">ASR</span>
        </div>
        <div className="font-bold text-lg text-blue-700">
          Chemist Demo Pvt Ltd (CDPL)
        </div>
        <div className="ml-2 text-xs text-gray-500 hidden md:block">
          Books From 01.04.2024 to 31.03.2026
        </div>
        <div className="ml-2 text-xs text-gray-400 hidden md:block">
          v 4.1.80.b
        </div>
      </div>
      {/* Center: (optional) */}
      <div className="flex-1 flex justify-center items-center">
        {/* You can add more center content here if needed */}
      </div>
      {/* Right: User, Icons */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm text-gray-700 bg-blue-50 px-2 py-1 rounded">
          <span>Financial Year:</span>
          <span className="font-semibold text-blue-700">
            01-04-2025 - 31-03-2026
          </span>
        </div>
        <HelpCircle className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />
        <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600" />
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <span className="hidden md:block font-medium text-gray-800">
            User Name
          </span>
        </div>
      </div>
    </header>
  );
}
