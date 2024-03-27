const jwt = require("jsonwebtoken");
const UserModel = require("../model/User");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await UserModel.findById(decoded._id).select("-password");
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, No token");
  }
});
const protectCookie = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.token;
  if (!token) {
    res.status(401);
    throw new Error("Not Authenticated");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await UserModel.findById(decoded._id).select("-password");
    next();
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});
module.exports = { protect, protectCookie };
