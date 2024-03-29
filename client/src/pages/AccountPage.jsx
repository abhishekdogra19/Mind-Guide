import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/mindGuideSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AccountPage = () => {
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  const dispatch = useDispatch();

  // If user information is not available, return null or a loading spinner
  if (!userInfo) {
    return null; // You might want to display a loading spinner here
  }

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
    <div className="flex flex-col items-center justify-center h-full">
      <div className="max-w-lg mx-auto text-center">
        <img src={userInfo.pic} alt="" className="h-60 mb-4 rounded-lg" />
        <p className="text-lg font-semibold mb-2">
          Logged in as {userInfo.name} ({userInfo.email})
        </p>
        <div className="flex items-center gap-2">
          <Link to="./roadmap" className="text-blue-600 hover:underline mb-4">
            My Roadmap
          </Link>
          <button
            onClick={handleLogout}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
