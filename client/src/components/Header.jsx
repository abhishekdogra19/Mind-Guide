import { Link } from "react-router-dom";
import headIcon from "../assets/headerIcon.png";
import { useSelector } from "react-redux";

const Header = () => {
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  return (
    <div className="bg-gray-800 text-white px-5 py-3 sticky top-0 z-20">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src={headIcon} alt="Header Icon" className="h-12 mr-2" />
          <h1 className="text-3xl font-semibold">
            <Link to="/" className="hover:text-red-700">
              Mind Guide
            </Link>
          </h1>
        </div>
        <nav>
          <ul className="flex space-x-6 text-xl ">
            <li className="hover:scale-110 duration-300">
              <Link
                to="https://github.com/abhishekdogra19/Mind-Guide"
                className="hover:text-red-700"
              >
                About Us
              </Link>
            </li>
            <li className="hover:scale-110 duration-300">
              <Link to="counselors" className="hover:text-red-700">
                Counselors
              </Link>
            </li>
            <li className="hover:scale-110 duration-300">
              <Link to={"tools"} className="hover:text-red-700">
                Tools
              </Link>
            </li>
          </ul>
        </nav>
        <Link to={"/login"}>
          <div className="flex items-center gap-2 hover:text-lime-200 hover:scale-110 duration-200">
            <img
              src={
                userInfo
                  ? userInfo.image
                  : "data:image/png;base64,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"
              }
              alt="userLogo"
              className="w-10 h-10 rounded-full object-cover "
            />
            {userInfo && (
              <p className="text-base font-titleFont font-semibold underline underline-offset-2">
                {userInfo.name}
              </p>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
