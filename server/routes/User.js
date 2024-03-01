const express = require("express");
const {
  registerUser,
  authUser,
  getUserProfile,
  handleLogout,
} = require("../controllers/userControllers");
const router = express.Router();

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/getUserProfile").get(getUserProfile);
router.route("/logout").post(handleLogout);
module.exports = router;
