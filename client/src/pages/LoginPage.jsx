import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { addUser } from "../redux/mindGuideSlice";
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

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
    const fetchUserProfile = async () => {
      const response = await axios.get("/api/v1/user/getUserProfile");
      dispatch(addUser(response.data));
    };
    fetchUserProfile();
  }, [dispatch]);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  return (
    <div className="flex  h-full items-center justify-center py-10">
      <form
        className="flex w-full max-w-xl flex-col gap-4 bg-white shadow-md rounded px-8 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>

        {/* Email field */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Your email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password field */}
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Your password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Remember me checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Loading..." : "Login"}
        </Button>

        {/* Link to Register Page */}
        <div className="mt-4 text-center">
          <p>
            Don&apos;t have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
