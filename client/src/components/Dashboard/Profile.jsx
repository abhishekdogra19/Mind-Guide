import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/mindGuideSlice";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import badge from "../../assets/badge.png";
import tick from "../../assets/tick.png";
const Profile = () => {
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  const dispatch = useDispatch();

  // If user information is not available, return null or a loading spinner
  if (!userInfo) {
    return null; // You might want to display a loading spinner here
  }
  const skills = userInfo.skills;
  const TechSkills = [];
  const nonTechSkills = [];
  skills.forEach((skill) => {
    if (skill.type === "technical") {
      TechSkills.push(skill.skill);
    } else {
      nonTechSkills.push(skill.skill);
    }
  });

  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/user/logout");
      dispatch(removeUser());
      toast.success("Logged out successfully");
    } catch (error) {
      console.error("Error in logging out", error);
    }
  };
  const createdAtDate = new Date(userInfo.createdAt);

  // Format the date according to your preference
  const formattedCreatedAt =
    createdAtDate.getDate() +
    " " +
    createdAtDate.toLocaleString("default", { month: "long" }) +
    " " +
    createdAtDate.getFullYear();
  console.log("userInfo", userInfo);
  return (
    <div className=" h-full border-2 rounded-lg">
      <div className="bg-blue-200 px-10 py-2 rounded-lg flex gap-2">
        <img src={userInfo.pic} alt="" className="h-60 mb-4 rounded-lg" />
        <div className="text-xl flex flex-col gap-6 mb-10 p-10">
          <h1>
            Name:{" "}
            <span className="font-semibold capitalize">{userInfo.name}</span>
          </h1>
          <h1>
            Email: <span className="font-semibold">{userInfo.email}</span>
          </h1>
          <h1>
            Account Created:{" "}
            <span className="font-semibold">{formattedCreatedAt}</span>
          </h1>
        </div>
      </div>
      <div className="flex flex-col gap-6 p-10">
        <div>
          <h1 className="text-xl font-semibold">Skills</h1>
          <ul className="grid grid-cols-2 md:grid-cols-4">
            {TechSkills.map((skill, index) => (
              <li key={index} className="flex items-center ">
                <img src={badge} alt="" className="h-14 w-14" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-semibold">Non Technical Skills</h1>
          <ul className="grid grid-cols-2 md:grid-cols-4">
            {nonTechSkills.map((skill, index) => (
              <li key={index} className="flex items-center ">
                <img src={tick} alt="" className="h-14 w-14" />
                {skill}
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={handleLogout}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
