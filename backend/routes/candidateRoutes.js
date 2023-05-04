// Import the express module
const express = require('express');

// Create router object
const router = express.Router();

/**
 * Import all the methods in politicalPartyController
 */

const {
    
    getAllCandidates,
    addCandidate

} = require('../controller/candidateController');


// Handle GET request at root
router.get("/", getAllCandidates);

//
router.post("/",addCandidate)

module.exports = router;