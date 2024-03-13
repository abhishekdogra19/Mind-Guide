const express = require("express");
const {
  getChat,
  handleSendChat,
  handleCreateReport,
  handleCreateRoadmap,
} = require("../controllers/chatControllers");

const router = express.Router();

router.get("/:counselorType", getChat);
router.post("/", handleSendChat);
router.post("/report", handleCreateReport);
router.post("/roadmap", handleCreateRoadmap);

module.exports = router;
