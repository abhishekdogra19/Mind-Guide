const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
  handleLogout,
  handleGetRoadmap,
  handleGetUserData,
  handleReportUpload,
  handleGetAllReports,
  handleGetSkills,
  handleGetAllUserData,
} = require("../controllers/userControllers");
const multer = require("multer");
const { protectCookie } = require("../middleware/authMiddleware");
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // Adjust based on your needs
});
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/getUserProfile").get(getUserProfile);
router.route("/logout").post(handleLogout);
router.route("/roadmap").get(protectCookie, handleGetRoadmap);
router.route("/userDashboard").get(protectCookie, handleGetUserData);
router.route("/getAllUserData").get(protectCookie, handleGetAllUserData);
router.route("/allReports").get(protectCookie, handleGetAllReports);
router.post(
  "/uploadpdf/:counsellorType",
  protectCookie,
  upload.single("file"),
  handleReportUpload
);
router.route("/getSkills").get(protectCookie, handleGetSkills);
module.exports = router;
