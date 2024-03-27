const express = require("express");
const {
  getChat,
  handleSendChat,
  handleCreateReport,
  handleCreateRoadmap,
  handleRoadmapUpdation,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/:counselorType", getChat);
router.post("/", handleSendChat);
router.post("/report", handleCreateReport);
router.post("/roadmap", protect, handleCreateRoadmap);
router.post("/updateroadmap", handleRoadmapUpdation);

module.exports = router;
