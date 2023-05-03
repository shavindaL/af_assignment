const express = require('express');
const router = express.Router();

const { getAllVotingCenters, signup, login, getAVotingCenter } = require('../controller/votingCenterController');
const { requireAuth } = require('../middleware/votingCenterAuthMiddleware');

router.get("/", getAllVotingCenters);
router.get("/:id", getAVotingCenter)
router.post("/signup", signup);
router.post("/login", login);

module.exports = router;