const express = require("express");
const {
  getChat,
  handleSendChat,
  handleCreateReport,
} = require("../controllers/chatControllers");

const router = express.Router();

router.get("/:counselorType", getChat);
router.post("/", handleSendChat);
router.post("/report", handleCreateReport);

module.exports = router;
