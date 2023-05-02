// Import the PoliticalParty model
const PoliticalParty = require('../models/politicalParty');

// Method to get all available political parties
const getAllPoliticalParties = async (req, res) => {
    try {
        // Get all existing documents
        const politicalParties = await PoliticalParty.find();

        if (politicalParties) {
            // Respond with status code 200 (OK) if sucessful
            res.status(200).send(politicalParties);
        } else {
            // Repond with status code 400 (Bad Request) if unsucessful
            res.status(400).send("Failed to get political parties")
        }
    } catch (err) {
        // Print error message
        console.log(err.message);
    }
};


module.exports = {
    getAllPoliticalParties,
};