import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Label, TextInput, FileInput } from "flowbite-react";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const navigate = useNavigate();

  const handlePicUpload = async (e) => {
    const pics = e.target.files[0];
    setLoading(true);
    if (!pics) {
      toast.error("Please select an image!");
      setLoading(false);
      return;
    }
    if (["image/jpeg", "image/jpg", "image/png"].includes(pics.type)) {
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
      } catch (error) {
        toast.error("Error while uploading image!");
      }
    } else {
      toast.error("Please select a valid image!");
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
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
    <div className="flex items-center justify-center h-full py-10">
      <form
        className="flex w-full max-w-xl flex-col gap-4 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-8 text-center">Register</h2>

        {/* Name field */}
        <div>
          <Label htmlFor="name" value="Name" />
          <TextInput
            required
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        {/* Email field */}
        <div>
          <Label htmlFor="email" value="Email" />
          <TextInput
            required
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password field */}
        <div>
          <Label htmlFor="password" value="Password" />
          <TextInput
            required
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Confirm Password field */}
        <div>
          <Label htmlFor="confirmPassword" value="Confirm Password" />
          <TextInput
            required
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        {/* Profile Picture field */}
        <div>
          <Label htmlFor="profilePic" value="Profile Picture" />
          <FileInput
            id="profilePic"
            accept="image/*"
            onChange={handlePicUpload}
          />
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={loading}>
          {loading ? "Please Wait" : "Register"}
        </Button>

        {/* Link to Login Page */}
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
