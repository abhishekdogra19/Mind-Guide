// middleware/sessionHandler.js
const sessionCache = require("../sessionCache.js");

function loadUserSession(req, res, next) {
  const userId = req.user._id.toString();
  let session = sessionCache.get(userId);

  if (!session) {
    session = {
      messages: [],
    };
    sessionCache.set(userId, session);
  }

  req.sessionData = session;
  next();
}

function saveUserSession(req, res, next) {
  const userId = req.user._id.toString();
  const session = req.sessionData;

  sessionCache.set(userId, session);
  next();
}

module.exports = { loadUserSession, saveUserSession };
