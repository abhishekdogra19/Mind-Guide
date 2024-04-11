const express = require("express");
const {
  getChat,
  handleSendChat,
  handleCreateReport,
  handleCreateRoadmap,
  handleRoadmapUpdation,
  handleTaskUpdate,
} = require("../controllers/chatControllers");
const { protect, protectCookie } = require("../middleware/authMiddleware");
const { handleGetRoadmap } = require("../controllers/userControllers");

const router = express.Router();

router.get("/:counselorType", getChat);
router.post("/", handleSendChat);
router.post("/report", handleCreateReport);
router
  .route("/roadmap")
  .post(protectCookie, handleCreateRoadmap)
  .put(protectCookie, handleTaskUpdate);
router.post("/updateroadmap", handleRoadmapUpdation);

module.exports = router;
