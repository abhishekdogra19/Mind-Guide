import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom"; // Import NavLink
import { useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import headIcon from "../assets/headerIcon.png";
import { HashLink, NavHashLink } from "react-router-hash-link";
import { FaCircleInfo } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import LoginIcon from "@mui/icons-material/Login";
import { AiFillTool } from "react-icons/ai";
import { IoDocumentTextSharp } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { RiRoadMapFill } from "react-icons/ri";
const Header = () => {
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();
  const isDashboard = location.pathname.split("/")[2] === "dashboard";
  const dashboardLinks = [
    {
      title: "Dashboard",
      icon: MdDashboard,
      link: "/account/dashboard",
    },
    {
      title: "Reports",
      icon: IoDocumentTextSharp,
      link: `/account/dashboard/reports`,
    },
    {
      title: "Roadmap",
      icon: RiRoadMapFill,
      link: `/account/dashboard/getRoadmap`,
    },
  ];
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  console.log(userInfo);
  const drawer = (
    <Box
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
      className="h-full overflow-hidden pb-10"
    >
      <div className="py-2">
        <HashLink
          to="/#top"
          className="font-bold flex items-center justify-center px-2"
        >
          <img src={headIcon} alt="Header Icon" className="h-8 mr-2 " />
          Mind Guide
        </HashLink>
      </div>
      <Divider />
      <List className="flex flex-col h-full gap-2 ">
        <div className={`${isDashboard ? " flex-1 flex-grow " : " hidden "}`}>
          {userInfo &&
            isDashboard &&
            dashboardLinks.map((link) => (
              <ListItem
                component={NavLink}
                to={link.link}
                className="hover:bg-primaryColor hover:text-white"
              >
                <span className="flex items-center gap-2">
                  <link.icon /> {link.title}
                </span>
              </ListItem>
            ))}
        </div>
        {isDashboard && <hr className="border border-gray-300" />}
        <div
          className={`${
            !isDashboard && " flex-1 flex-grow "
          } overflow-y-scroll`}
        >
          <ListItem
            component={HashLink}
            to="/#counselors"
            className="hover:bg-primaryColor hover:text-white"
          >
            <span className="flex items-center gap-2">
              <IoPerson size={16} /> Counsellor
            </span>
          </ListItem>
          <ListItem
            component={HashLink}
            to="/#tools"
            className="hover:bg-primaryColor hover:text-white"
          >
            <span className="flex items-center gap-2">
              <AiFillTool size={16} /> Tools
            </span>
          </ListItem>
          <ListItem
            component={NavLink} // Use NavLink instead of Link
            to="https://github.com/abhishekdogra19/Mind-Guide"
            className="hover:bg-primaryColor hover:text-white"
          >
            <span className="flex items-center gap-2">
              <FaCircleInfo size={16} /> About us
            </span>
          </ListItem>
          {!userInfo && (
            <ListItem
              component={NavLink}
              to="/login"
              className="hover:bg-primaryColor hover:text-white"
            >
              <span className="fkex items-center gap-2">
                <LoginIcon /> Login
              </span>
            </ListItem>
          )}
        </div>
        {!isDashboard && <hr className="border border-gray-300" />}
        <div className=" flex flex-col gap-2">
          {userInfo && (
            <span className="flex items-center px-4 text-sm hover:bg-gray-300 py-2 gap-2">
              <IoLogOut onClick={handleLogout} size={16} className="rotate-180" />
              Logout
            </span>
          )}
          {userInfo && (
            <ListItem
              className="flex gap-2  bg-primaryColor text-white p-2 "
              component={NavLink}
              to="/account/dashboard/profile"
            >
              <div className="overflow-hidden rounded-full w-8 h-8  ">
                <img
                  alt="User Logo"
                  src={userInfo.pic}
                  className="w-full h-full"
                />
              </div>
              <div>
                <h1 className="text-sm font-bold">{userInfo.name}</h1>
                <p className="text-xs text-gray-300">{userInfo.email}</p>
              </div>
            </ListItem>
          )}
        </div>
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ boxShadow: "none", backgroundColor: "#325342" }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <HashLink
            to="#"
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img src={headIcon} alt="Header Icon" className="h-8 mr-2 invert" />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <HashLink to="/#top" className="font-bold">
                Mind Guide
              </HashLink>
            </Typography>
          </HashLink>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button
              className="hover:brightness-75  text-xs"
              component={Link}
              to="/about"
              sx={{ color: "#fff", fontSize: "0.75rem", lineHeight: "1.5" }}
            >
              About Us
            </Button>
            <Button
              className="hover:brightness-75 "
              component={NavHashLink}
              to="./#counselors"
              sx={{ color: "#fff", fontSize: "0.75rem", lineHeight: "1.5" }}
            >
              Counselors
            </Button>
            <Button
              className="hover:brightness-75 "
              component={NavHashLink}
              to="./#tools"
              sx={{ color: "#fff", fontSize: "0.75rem", lineHeight: "1.5" }}
            >
              Tools
            </Button>
          </Box>
          <Box
            sx={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            {userInfo ? (
              <Link
                to="/account/dashboard/profile"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                  textDecoration: "none",
                }}
                className="flex items-center gap-2 hover:scale-105 transition duration-300 "
              >
                <Avatar alt="User Logo" src={userInfo.pic} />
                <h1 className="text-xs lg:text-xl ">{userInfo.name}</h1>
              </Link>
            ) : (
              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#fff",
                  border: "1px solid",
                  borderRadius: 20,
                  padding: "5px 20px",
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Header;
