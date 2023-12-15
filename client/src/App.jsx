import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import ChatApp from "./pages/ChatApp";
import Tools from "./pages/Tools";
import Counselors from "./pages/Counselors";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="counselors" element={<Counselors />} />
          {/* Add a dynamic route to capture the counselor type */}
          <Route path="counselors/chat/:type" element={<ChatApp />} />
          <Route path="tools" element={<Tools />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
