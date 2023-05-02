// Import all the methods from voterController
const {
    getAllVoters,
    getVoters,
    addVoter,
    getVoter,
    updateVoter,
    deleteVoter
} = require('../controller/voterController');

// Import the express module
const express = require("express");

// Create new router object
const router = express.Router();

// Handle GET request at root
router.get("/", getAllVoters);

// Handle GET request at "/voters" URI
router.get("/voters", getVoters);

// Handle POST request at "addVoter" URI
router.post("/addVoter", addVoter);

// Handle GET request at "voters/:id" URI
router.get("/voters/:id", getVoter);

// Handle PUT request at "voters/:id" URI
router.put("/voters/:id", updateVoter);

// Handle DELETE request at "voters/:id" URI
router.delete("/voters/:id", deleteVoter);

// Export the router object
module.exports = router;
