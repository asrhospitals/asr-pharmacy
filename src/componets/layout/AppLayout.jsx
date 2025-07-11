import Sidebar from "../common/Sidebar";
import AppRoutes from "../../routes/Routes";
import Header from "../common/Header";
import { useState } from "react";

const AppLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div className="flex h-full">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <main className="flex-1 overflow-y-auto">
        <Header isCollapsed={isCollapsed} onMenuClick={() => setIsCollapsed(!isCollapsed)} />
        <AppRoutes />
      </main>
    </div>
  );
};

export default AppLayout;
