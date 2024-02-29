const express = require("express");
const { getChat, handleSendChat } = require("../controllers/chatControllers");

const router = express.Router();

router.get("/:counselorType", getChat);
router.post("/", handleSendChat);

module.exports = router;
