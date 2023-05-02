// Import the express module
const express = require('express');

// Create router object
const router = express.Router();

/**
 * Import all the methods in politicalPartyController
 */

const {
    getAllPoliticalParties,

} = require('../controller/politicalPartyController');


// Handle GET request at root
router.get("/", getAllPoliticalParties);

module.exports = router;