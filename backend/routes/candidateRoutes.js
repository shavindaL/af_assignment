// Import the express module
const express = require('express');

// Create router object
const router = express.Router();

/**
 * Import all the methods in politicalPartyController
 */

const {
    
    getAllCandidates,
    addCandidate,
    getCandidate,
    getCandidatesForAParty,

} = require('../controller/candidateController');


// Handle GET request at root
router.get("/", getAllCandidates);

//
router.post("/",addCandidate)

// Handle GET request at "/:id" URI
router.get("/:id", getCandidate);


//
router.get("/party/:id",getCandidatesForAParty)

module.exports = router;