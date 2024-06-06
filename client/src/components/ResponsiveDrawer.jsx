import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";

const ResponsiveDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navLinks = [
    {
      title: "Dashboard",
      icon: "fas fa-tachometer-alt",
      link: "",
    },
    {
      title: "Reports",
      icon: "fas fa-tachometer-alt",
      link: "./reports",
    },
    {
      title: "Roadmap",
      icon: "fas fa-calendar-alt",
      link: "./getRoadmap",
    },
    {
      title: "Profile",
      icon: "fas fa-user-circle",
      link: "./profile",
    },
  ];
  const location = useLocation();
  const currentTab = location.pathname.split("/")[3];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/user/logout");
      dispatch(removeUser());
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in logging out", error);
    }
  };
  return (
    <div className=" md:bg-white">
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } sm:relative sm:translate-x-0 sm:bg-transparent sm:flex sm:flex-col w-72 duration-500`}
      >
        <div className="flex flex-col gap-3 w-full max-w-sm px-2 py-10 font-semibold bg-white sm:bg-transparent">
          {navLinks.map((link) => (
            <Link
              to={link.link}
              key={link.title}
              className={`p-6 text-sm sm:text-lg hover:bg-primaryColor hover:text-white rounded-lg  duration-300 
              ${
                currentTab === link.link.split("/")[1]
                  ? "bg-primaryColor text-white"
                  : ""
              }`}
              onClick={toggleSidebar}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDrawer;
