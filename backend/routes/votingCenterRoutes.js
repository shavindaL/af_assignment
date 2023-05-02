const express = require('express');
const router = express.Router();

const getAllVotingCenters = require('../controller/votingCenterController');


router.get("/", getAllVotingCenters)

module.exports = router;