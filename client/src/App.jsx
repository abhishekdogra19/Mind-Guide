import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ChatApp from "./pages/ChatApp";
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ProtectRoute from "./components/ProtectRoute";
import Dashboard from "./pages/Dashboard.jsx";
import GetAllReports from "./components/Dashboard/GetAllReports.jsx";
import GetRoadmap from "./components/Dashboard/GetRoadmap.jsx";
import Profile from "./components/Dashboard/Profile.jsx";
import HeroDashBoard from "./components/Dashboard/HeroDashBoard.jsx";
import { useEffect } from "react";
import { addUser } from "./redux/mindGuideSlice.js";

axios.defaults.baseURL = import.meta.env.VITE_HOST_URL;
axios.defaults.withCredentials = true;
function App() {
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  console.log("userInfo ", userInfo);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchUserProfile = async () => {
      const response = await axios.get("/api/v1/user/getUserProfile");
      console.log(response);
      dispatch(addUser(response.data));
      return;
    };
    fetchUserProfile();
  }, [dispatch]);
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route element={<ProtectRoute userInfo={userInfo} />}>
              {/* Add a dynamic route to capture the counselor type */}
              <Route path="counselors/chat/:type" element={<ChatApp />} />
              <Route path="account/dashboard" element={<Dashboard />}>
                <Route index element={<HeroDashBoard />} />
                <Route path="reports" element={<GetAllReports />} />
                <Route path="getRoadmap" element={<GetRoadmap />} />
                <Route path="profile" element={<Profile />} />
              </Route>
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
