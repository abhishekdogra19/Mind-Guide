import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../../redux/mindGuideSlice";
import axios from "axios";
import { toast } from "react-toastify";
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
  skills?.forEach((skill) => {
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
    <div className=" h-full rounded-lg px-2 lg:px-6">
      <div className="bg-primaryColor text-white px-10 py-4 rounded-lg flex flex-col lg:flex-row gap-2">
        <div className="h-32 lg:h-72 overflow-hidden">
          <img
            src={userInfo.pic}
            alt=""
            className="h-full w-full object-cover rounded-lg"
          />
        </div>
        <div className="text-sm lg:text-xl flex flex-col gap-6 mb-10 lg:p-10">
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
          <button
            onClick={handleLogout}
            className="bg-white py-3 hover:brightness-110 max-w-4xl mt-2 mx-auto w-full text-primaryColor font-bold  rounded-lg text-xs lg:text-sm"
          >
            Logout
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 py-10 px-4">
        <div>
          <h1 className="text-sm kg:text-xl font-semibold">Technical Skills</h1>
          {
            // Display the technical skills only if the user has any
            TechSkills?.length > 0 ? (
              <ul className="grid grid-cols-2 md:grid-cols-4  pt-6">
                {TechSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center text-xs lg:text-sm gap-2 "
                  >
                    <img
                      src={badge}
                      alt=""
                      className="h-10 w-10 lg:h-14 lg:w-14"
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs lg:text-lg mt-2">
                You have not added any technical skills yet.
              </p>
            )
          }
        </div>
        <div>
          <h1 className="text-sm kg:text-xl font-semibold">
            Non Technical Skills
          </h1>
          {
            // Display the non-technical skills only if the user has any
            nonTechSkills?.length > 0 ? (
              <ul className="grid grid-cols-2 md:grid-cols-4 pt-6">
                {nonTechSkills.map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center text-xs lg:text-sm gap-2 "
                  >
                    <img
                      src={tick}
                      alt=""
                      className="h-10 w-10 lg:h-14 lg:w-14"
                    />
                    {skill}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs lg:text-lg mt-2">
                You have not added any non-technical skills yet.
              </p>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Profile;
