import { Link, Outlet, useLocation } from "react-router-dom";

const Dashboard = () => {
  const options = [
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
  console.log(currentTab);
  return (
    <div className="flex h-screen p-2 w-full">
      <div className="flex flex-col gap-4 w-1/4 p-4 h-screen">
        {options.map((option, i) => (
          <Link
            key={i}
            to={option.link}
            className={`  p-4 rounded-lg duration-300
              ${
                (!currentTab && option.link === "") ||
                `./${currentTab}` === option.link
                  ? "text-white bg-blue-950 "
                  : " bg-gray-500 "
              }
            `}
          >
            {option.title}
          </Link>
        ))}
      </div>
      <div className="w-3/4 overflow-x-hidden overflow-y-scroll d">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
