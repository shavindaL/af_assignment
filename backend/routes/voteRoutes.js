const { processVote } = require("../controller/voteController");

const express = require("express");

// Create new router object
const router = express.Router();

// Handle GET request at root
router.post("/", processVote);

module.exports = router;
