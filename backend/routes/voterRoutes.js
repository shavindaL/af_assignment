const express = require('express');
const router = express.Router();

const getAllVoters = require('../controller/voterController');


router.get("/voter", getAllVoters)

module.exports = router;