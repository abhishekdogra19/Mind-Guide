/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectRoute = ({ userInfo }) => {
  const navigate = useNavigate();

  console.log("UserInfo", userInfo);
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
      return;
    }
  });
  return <Outlet />;
};

export default ProtectRoute;
