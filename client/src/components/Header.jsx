import React from "react";
import { NavLink, Link } from "react-router-dom"; // Import NavLink
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
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import headIcon from "../assets/headerIcon.png";

const Header = () => {
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{}}>
        Mind Guide
      </Typography>
      <Divider />
      <List>
        <ListItem
          component={NavLink} // Use NavLink instead of Link
          to="https://github.com/abhishekdogra19/Mind-Guide"
        >
          <ListItemText primary="About Us" />
        </ListItem>
        <ListItem component={NavLink} to="/counselors">
          <ListItemText primary="Counselors" />
        </ListItem>
        <ListItem component={NavLink} to="/tools">
          <ListItemText primary="Tools" />
        </ListItem>
        {userInfo ? (
          <ListItem component={NavLink} to="/account/dashboard">
            <Avatar
              alt="User Logo"
              src={userInfo.pic}
              sx={{ marginRight: 2 }}
            />
            <ListItemText primary={userInfo.name} />
          </ListItem>
        ) : (
          <ListItem component={NavLink} to="/login">
            <ListItemText primary="Login" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: "#1E1E1E" }}>
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
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <img
              src={headIcon}
              alt="Header Icon"
              style={{ height: 48, marginRight: 8 }}
            />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Mind Guide
            </Typography>
          </Link>
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              flexGrow: 1,
              justifyContent: "center",
              gap: 2,
            }}
          >
            <Button component={Link} to="/about" sx={{ color: "#fff" }}>
              About Us
            </Button>
            <Button component={Link} to="/counselors" sx={{ color: "#fff" }}>
              Counselors
            </Button>
            <Button component={Link} to="/tools" sx={{ color: "#fff" }}>
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
                to="/account/dashboard"
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <Avatar alt="User Logo" src={userInfo.pic} />
                <h1 className="text-xs lg:text-xl ">{userInfo.name}</h1>
              </Link>
            ) : (
              <Button component={Link} to="/login" sx={{ color: "#fff" }}>
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
