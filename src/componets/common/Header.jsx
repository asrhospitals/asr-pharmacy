// import { Menu, Bell, HelpCircle, Settings, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../services/userSlice";
import { useNavigate } from "react-router-dom";
import { User, LogOut, HelpCircle, Menu, Bell, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import Card from "./Card";

export default function DefaultHeader({ title, onMenuClick }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cardOpen, setCardOpen] = useState(false);
  const cardRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setCardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleClickOutsideSettings = (event) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutsideSettings);
    return () => document.removeEventListener("mousedown", handleClickOutsideSettings);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAction());
    setCardOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white px-2 py-2 md:px-4 border-b border-l border-gray-200 flex items-center justify-between w-full min-h-[56px]">
      {/* Left: Logo, Hamburger, Company Name */}
      <div className="flex items-center gap-2 md:gap-3 min-w-0">
        <button
          className="rounded-md hover:bg-gray-100 flex-shrink-0"
          onClick={onMenuClick}
          aria-label="Toggle sidebar"
        >
          <Menu className="w-6 h-6 text-blue-600" />
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
          <span className="text-white font-bold text-sm">ASR</span>
        </div>
        <div className="font-bold text-base md:text-lg text-blue-700 truncate max-w-[120px] sm:max-w-[200px] md:max-w-[300px] lg:max-w-none">
          <span className="truncate block">
            Chemist Demo Pvt Ltd (CDPL)
          </span>
        </div>
        <div className="ml-2 text-xs text-gray-500 hidden lg:block truncate max-w-[180px]">
          Books From 01.04.2024 to 31.03.2026
        </div>
        <div className="ml-2 text-xs text-gray-400 hidden xl:block">
          v 4.1.80.b
        </div>
      </div>
      {/* Center: (optional) */}
      <div className="flex-1 flex justify-center items-center min-w-0"></div>
      {/* Right: User, Settings, Dropdowns */}
      <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
        <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm text-gray-700 bg-blue-50 px-2 py-1 rounded truncate max-w-[120px] md:max-w-none">
          <span className="hidden sm:inline">Financial Year:</span>
          <span className="font-semibold text-blue-700 truncate">
            01-04-2025 - 31-03-2026
          </span>
        </div>
        {/* Settings Dropdown Icon */}
        <div className="relative md:hidden" ref={settingsRef}>
          <div
            className="bg-gray-300 p-1 rounded-full flex items-center justify-center cursor-pointer border-2 border-white shadow hover:text-blue-600 hover:border-blue-600"
            onClick={() => setSettingsOpen((prev) => !prev)}
            tabIndex={0}
            aria-label="Open settings menu"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setSettingsOpen(prev => !prev); }}
          >
            <Settings className="w-5 h-5 text-white" />
          </div>
          {settingsOpen && (
            <div className="absolute right-0 mt-3 w-44 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 p-2 animate-fade-in flex flex-col gap-2">
              <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition text-gray-700" tabIndex={0}>
                <HelpCircle className="w-5 h-5 text-blue-500" /> Help
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition text-gray-700" tabIndex={0}>
                <Settings className="w-5 h-5 text-blue-500" /> Settings
              </button>
              <button className="flex items-center gap-2 px-3 py-2 rounded hover:bg-blue-50 transition text-gray-700" tabIndex={0}>
                <Bell className="w-5 h-5 text-blue-500" /> Notifications
              </button>
            </div>
          )}
        </div>
        {/* Hide these icons inline on small screens, show only in dropdown */}
        <HelpCircle className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600 hidden md:inline" />
        <Settings className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600 hidden md:inline" />
        <Bell className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-600 hidden md:inline" />
        {/* User Dropdown */}
        <div className="relative" ref={cardRef}>
          <div
            className="bg-gray-300 p-1 rounded-full flex items-center justify-center cursor-pointer border-2 border-white shadow hover:text-blue-600 hover:border-blue-600"
            onClick={() => setCardOpen((prev) => !prev)}
            tabIndex={0}
            aria-label="User menu"
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setCardOpen(prev => !prev); }}
          >
            <User className="w-5 h-5 text-white" />
          </div>
          {cardOpen && (
            <Card className="absolute right-0 mt-3 w-72 md:w-80 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 p-0 animate-fade-in">
              <div className="flex flex-col items-center p-6 pb-4 border-b border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full flex items-center justify-center mb-2">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <div className="text-gray-800 font-semibold text-lg mb-1 truncate w-full text-center">
                  User Name: {user?.username || "-"}
                </div>
                <div className="text-xs text-gray-500 mb-2">Demo Licence</div>
                <div className="text-center font-bold text-lg text-gray-800 mb-1 truncate w-full">
                  Chemist Demo Pvt Ltd
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  F.Y.: 01-04-2025 to 31-03-2026
                </div>
                <div className="text-xs text-gray-500 mb-2 truncate w-full">
                  CDPL. AA-299, Shaheed Udham Singh Marg, AA Block, Poorbi Shalimar, Shalimar Bagh, New Delhi, 110088
                </div>
                <Button className="mt-2 mb-2 px-6 py-2 bg-teal-600 text-white rounded shadow hover:bg-teal-700 transition cursor-pointer">
                  Switch
                </Button>
              </div>
              <div className="flex flex-col items-center p-4">
                <Button
                  variant="danger"
                  className="flex items-center gap-2 font-semibold px-4 py-2 rounded cursor-pointer"
                  onClick={handleLogout}
                >
                  <LogOut className="w-5 h-5" /> Logout
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>
    </header>
  );
}
