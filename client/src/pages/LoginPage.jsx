import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/mindGuideSlice";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import TextField from "@mui/material/TextField";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.mindGuide.userInfo);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/v1/user/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      dispatch(addUser(response.data));
      toast.success("Login Successfully");
    } catch (err) {
      toast.error(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="h-full px-2  py-20">
      <form
        className="flex w-full max-w-2xl mx-auto flex-col gap-4 py-20 bg-white shadow-md rounded px-8  "
        style={{
          boxShadow: "0 6px 10px rgba(0,0,0,0.3)",
          borderRadius: "15px",
        }}
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-primaryColor text-center">
          Login
        </h2>

        {/* Email field */}
        <div className="flex flex-col gap-7">
          <TextField
            className="focus:border-2 border-primaryColor active:bg-primaryColor"
            id="standard-basic"
            label="Email"
            variant="standard"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* Password field */}
          <TextField
            className="active:border-0"
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-primaryColor hover:brightness-105 py-3 rounded-lg text-white "
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </button>

        {/* Link to Register Page */}
        <div className="mt-4 text-center">
          <div>
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-primaryColor font-semibold hover:underline"
            >
              Register here
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
