import { Outlet, useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <div className="flex-1 flex-grow">
        <Outlet />
      </div>
      {!path.includes("counselors/chat/") && <Footer />}
    </div>
  );
};

export default Layout;
