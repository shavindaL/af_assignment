// Import all the methods from adminController
const {
    getAllAdmins,
    getAdmins,
    addAdmin,
    getAdmin,
    updateAdmin,
    deleteAdmin
} = require('../controller/adminController');

// Import the express module
const express = require("express");

// Create new router object
const router = express.Router();

// Handle GET request at root
router.get("/", getAllAdmins);

// Handle GET request at "/admins" URI
router.get("/admins", getAdmins);

// Handle POST request at "addAdmin" URI
router.post("/addAdmin", addAdmin);

// Handle GET request at "admins/:id" URI
router.get("/admins/:id", getAdmin);

// Handle PUT request at "admins/:id" URI
router.put("/admins/:id", updateAdmin);

// Handle DELETE request at "admins/:id" URI
router.delete("/admins/:id", deleteAdmin);

// Export the router object
module.exports = router;
