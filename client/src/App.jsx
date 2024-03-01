import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import ChatApp from "./pages/ChatApp";
import Tools from "./pages/Tools";
import Counselors from "./pages/Counselors";
import ScrollToTop from "./components/ScrollToTop";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import ProtectRoute from "./components/ProtectRoute";
import AccountPage from "./pages/AccountPage";

axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.withCredentials = true;
function App() {
  const userInfo = useSelector((state) => state.mindGuide.userInfo);

  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<ProtectRoute userInfo={userInfo} />}>
              <Route index element={<Home />} />
              <Route path="counselors" element={<Counselors />} />
              {/* Add a dynamic route to capture the counselor type */}
              <Route path="counselors/chat/:type" element={<ChatApp />} />
              <Route path="tools" element={<Tools />} />
              <Route path="logout" element={<AccountPage />} />
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
