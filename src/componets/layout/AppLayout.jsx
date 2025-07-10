import Sidebar from "../common/Sidebar";
import AppRoutes from "../../routes/Routes";
import PageHeader from "../common/PageHeader"

const AppLayout=()=>{

  return(
    <div className="flex h-full">
      <Sidebar/>
     
      <main className="flex-1 overflow-y-auto">
        <AppRoutes/>
      </main>
    </div>
  );
}

export default AppLayout;


