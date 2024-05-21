import { Link, Outlet, useLocation } from "react-router-dom";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

const Dashboard = () => {
  const location = useLocation();
  const currentTab = location.pathname.split("/")[3];
  console.log(currentTab);
  return (
    <div className="flex h-screen   w-full">
      <ResponsiveDrawer />
      <div className="w-full  overflow-y-scroll ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
