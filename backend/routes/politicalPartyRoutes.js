// Import the express module
const express = require('express');

// Create router object
const router = express.Router();

/**
 * Import all the methods in politicalPartyController
 */

const {
    getAllPoliticalParties,
    getPoliticalParty,
    addPoliticalParty,
    updatePoliticalParty,
    updateVoteResults,
    deletePoliticalParty,
    updatePhoto

} = require('../controller/politicalPartyController');


// Handle GET request at root
router.get("/", getAllPoliticalParties);

// Handle GET request at "/:id" URI
router.get("/:id", getPoliticalParty);

// Handle POST request at root
router.post("/", addPoliticalParty);

// Handle PUT request at "/:id" URI
router.put("/:id", updatePoliticalParty);

// Handle PATCH request at "/:id" URI
router.patch("/:id", updateVoteResults);

// Handle DELETE request at "/:id" URI
router.delete("/:id", deletePoliticalParty);

// Handle POST request at "/:id" URI
router.post("/logo/:id", updatePhoto);

module.exports = router;