import { Outlet } from "react-router-dom";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen lg:h-screen pt-20  w-full">
      <div className="hidden sm:block h-full border-r-2">
        <ResponsiveDrawer />
      </div>
      <div className="w-full lg:h-full  lg:overflow-y-scroll ">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
