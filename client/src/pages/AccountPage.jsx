import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/mindGuideSlice";
import axios from "axios";
import { toast } from "react-toastify";
const AccountPage = () => {
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  console.log(userInfo);
  const dispatch = useDispatch();
  if (!userInfo) {
    return null;
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
    <div className="flex items-center justify-center h-full">
      <div className="text-center max-w-lg mx-auto flex flex-col items-center">
        <img src={userInfo.pic} alt="" className="h-60 mb-2 rounded-lg" />
        Logged in as {userInfo.name} ({userInfo.email}) <br />
        <button
          onClick={handleLogout}
          className="bg-slate-900 px-4 py-2 text-white rounded-lg mt-2"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AccountPage;
