const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
  handleLogout,
  handleGetRoadmap,
} = require("../controllers/userControllers");
const { protect, protectCookie } = require("../middleware/authMiddleware");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/getUserProfile").get(getUserProfile);
router.route("/logout").post(handleLogout);
router.route("/getRoadmap").get(protectCookie, handleGetRoadmap);
module.exports = router;
