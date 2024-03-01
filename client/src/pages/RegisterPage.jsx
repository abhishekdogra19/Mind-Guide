// src/components/Register.js
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [pic, setPic] = useState();
  const navigate = useNavigate();
  const handlePicUpload = async (e) => {
    const pics = e.target.files[0];
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image!",
        variant: "destructive",
      });
      return;
    }
    if (
      pics.type === "image/jpeg" ||
      pics.type === "image/jpg" ||
      pics.type === "image/png"
    ) {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "Mind-Guide");
      data.append("cloud_name", "abhiMiet");
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/abhiMiet/image/upload",
          data,
          {
            withCredentials: false,
          }
        );
        toast.success("Image successfully uploaded");
        setPic(response.data.url.toString());
        console.log(response.data.url);
      } catch (error) {
        console.log("Error While uploading image: ", error.response.data);
      }
    } else {
      toast.error("Please select a valid image!");
    }
    setLoading(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (!name || !email || !password || !confirmPassword) return;
    if (password != confirmPassword) return;
    try {
      setLoading(true);
      // Send a POST request to the server
      await axios.post("/api/v1/user/", {
        name,
        email,
        password,
        pic,
      });
      toast.success("Registered Successfully");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center ">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>

        {/* Name field */}
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Name
          </label>
          <input
            required
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Your Name"
          />
        </div>

        {/* Email field */}
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Email"
          />
        </div>

        {/* Password field */}
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
          />
        </div>

        {/* Confirm Password field */}
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Confirm Password
          </label>
          <input
            required
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Confirm Password"
          />
        </div>

        {/* Profile Picture field */}
        <div className="mb-4">
          <label
            htmlFor="profilePic"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Profile Picture URL
          </label>
          <input
            type="file"
            id="profilePic"
            name="profilePic"
            accept="image/*"
            className="border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Profile Picture URL"
            onChange={(e) => handlePicUpload(e)}
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            <span>{loading ? "Please Wait" : "Register"}</span>
          </button>
        </div>
        <div className="mt-4 text-center">
          <p>
            Already a customer?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
