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
        <Link to={userInfo ? "/account/dashboard" : "/login"}>
          <div className="flex items-center gap-2 hover:text-lime-200 hover:scale-110 duration-200">
            {userInfo ? (
              <>
                <img
                  src={userInfo.pic}
                  alt="userLogo"
                  className="w-10 h-10 rounded-full object-cover "
                />

                <p className="text-base font-titleFont font-semibold underline underline-offset-2">
                  {userInfo.name}
                </p>
              </>
            ) : (
              <span className="flex items-center gap-1 s">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <p>Login</p>
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
