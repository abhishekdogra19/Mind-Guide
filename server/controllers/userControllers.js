const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    pic,
    password,
  });
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Failed to create the user!!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
  // Check Password
  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    throw new Error("Invalid Credentials");
  }
  return res
    .status(200)
    .json({ _id: user._id, name: user.name, email: user.email, pic: user.pic });
});

module.exports = {
  registerUser,
  authUser,
};
