// sessionCache.js
const NodeCache = require("node-cache");
const sessionCache = new NodeCache({ stdTTL: 3600, checkperiod: 600 }); // TTL of 1 hour
module.exports = sessionCache;
