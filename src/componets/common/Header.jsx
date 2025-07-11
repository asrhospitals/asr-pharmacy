// import { Menu, Bell, HelpCircle, Settings, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout as logoutAction } from "../../services/userSlice";
import { useNavigation } from "../../hooks/useNavigation";
import { User, LogOut, HelpCircle, Menu, Bell, Settings } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import Card from "./Card";

export default function DefaultHeader({ title, onMenuClick }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const { navigateTo } = useNavigation();
  const [cardOpen, setCardOpen] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setCardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    dispatch(logoutAction());
    setCardOpen(false);
  };

  return (
    <header className="bg-white p-4 border-b border-l border-gray-200 flex items-center justify-between">
      {/* Left: Logo, Hamburger, Company Name */}
      <div className="flex items-center gap-3">
        <button className="rounded-md hover:bg-gray-100" onClick={onMenuClick}>
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
      <div className="flex-1 flex justify-center items-center"></div>
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
        <div className="relative" ref={cardRef}>
          <div
            className="bg-gray-300 p-1 rounded-full flex items-center justify-center cursor-pointer border-2 border-white shadow hover:text-blue-600 hover:border-blue-600"
            onClick={() => setCardOpen((prev) => !prev)}
          >
            <User className="w-5 h-5 text-white" />
          </div>
          {cardOpen && (
            <Card className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-2xl z-50 border border-gray-100 p-0 animate-fade-in">
              <div className="flex flex-col items-center p-6 pb-4 border-b border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-200 to-purple-200 rounded-full flex items-center justify-center mb-2">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <div className="text-gray-800 font-semibold text-lg mb-1">
                  User Name: {user?.username || "-"}
                </div>
                <div className="text-xs text-gray-500 mb-2">Demo Licence</div>
                <div className="text-center font-bold text-lg text-gray-800 mb-1">
                  Chemist Demo Pvt Ltd
                </div>
                <div className="text-xs text-gray-500 mb-1">
                  F.Y.: 01-04-2025 to 31-03-2026
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  CDPL.
                  <br />
                  AA-299, Shaheed Udham Singh Marg, AA Block,
                  <br />
                  Poorbi Shalimar
                  <br />
                  Shalimar Bagh
                  <br />
                  New Delhi
                  <br />
                  110088
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
