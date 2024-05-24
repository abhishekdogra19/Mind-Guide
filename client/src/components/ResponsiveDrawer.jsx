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

  return (
    <div className="border-x md:bg-white">
      <button
        className="block lg:hidden p-1 ml-4 absolute text-white bg-cyan-400"
        onClick={toggleSidebar}
      >
        {!isOpen && <FaChevronRight size={20} />}
      </button>
      <div
        className={`fixed inset-0 bg-white z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:bg-transparent lg:flex lg:flex-col w-72 duration-500`}
      >
        <div className="flex flex-col gap-3 w-full max-w-xs px-2 py-10 font-semibold bg-white lg:bg-transparent">
          {navLinks.map((link) => (
            <Link
              to={link.link}
              key={link.title}
              className={`p-6 text-sm lg:text-lg hover:bg-blue-400 rounded-lg  duration-300 
              ${
                currentTab === link.link.split("/")[1]
                  ? "bg-blue-400 text-white"
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
