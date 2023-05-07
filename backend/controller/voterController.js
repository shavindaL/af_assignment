const Voter = require('../models/voter')

const getAllVoters = (req, res) => {
    res.status(200).json({ success: "success" })
}


// Method to get all existing voters
const getVoters = async (req, res) => {
    try {
        // Get all existing documents from voters collection
        const voters = await Voter.find();

        if (voters) {

            // Respond with status code 200 (OK) if successful
            res.status(200).send(voters);

        } else {
            // Respond with status code 400 (Bad Request) if unsuccessful
            res.status(400).send("Failed to get voters");

        }
    } catch (err) {
        // Print error message
        console.log(err.message);
    }
};

// Method to add new voter
const addVoter = async (req, res) => {

    // Create new document
    const voter = new Voter({
        voterNIC: req.body.voterNIC,
        voterName: req.body.voterName,
        voterContactNo: req.body.voterContactNo,
        gender: req.body.gender,
        age: req.body.age,
        dob: req.body.dob,
        voterAddress: req.body.voterAddress

    });

    try {

        // Insert the new document
        await voter.save();

        // Respond with status code 201 (Created) if successful
        res.status(201).send("Voter added successfully");

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful
        res.status(400).send("Failed to add the voter");

        // Print the error message
        console.log(err.message);
    }

};

// Method to get details of a particular voter
const getVoter = async (req, res) => {

    try {
        // Find the particular document
        const voter = await Voter.findOne({ voterNIC: req.params.id });
        
        // Respond with status code 200 (OK) if successful
        if (voter) {
            res.status(200).json(voter);
        }
        else {
            res.status(404).json("Failed to find voter");
        }

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful
        res.status(400).send("Failed to find voter");

        // Print the error message
        console.log(err.message);
    }

};


// Method to update details of a particular voter
const updateVoter = async (req, res) => {

    try {

        // Update the particular document with the new data
        await Voter.findOneAndUpdate(
            {
                voterNIC:
                    req.params.id
            },
            {
                $set:
                {
                    voterName: req.body.voterName,
                    voterContactNo: req.body.voterContactNo,
                    gender: req.body.gender,
                    age: req.body.age,
                    dob: req.body.dob,
                    voterAddress: req.body.voterAddress

                }
            }
        );

        // Respond with status code 200 (OK) if successful
        res.status(200).send("Voter updated successfully");

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful
        res.status(400).send("Failed to update voter");

        // Print the error message
        console.log(err.message);
    }
};


// Method to delete a particular voter
const deleteVoter = async (req, res) => {

    try {

        await Voter.findOneAndDelete({ voterNIC: req.params.id })

        // Respond with status code 200 (OK) if successful
        res.status(200).send("Voter deleted successfully");

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful      
        res.status(400).send("Failed to delete voter");

        // Print the error message
        console.log(err.message);

    }
};

//* export all the functions
module.exports = {
    getAllVoters,
    getVoters,
    addVoter,
    getVoter,
    updateVoter,
    deleteVoter
}