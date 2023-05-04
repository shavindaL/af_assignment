const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const VotingCenter = require('../models/votingCenter');



/*
   @desc Generate JWT Token
*/
const createToken = (votingCenterId, votingCenterLocation) => {
    return jwt.sign({ votingCenterId, votingCenterLocation }, process.env.VOTING_CENTER_JWT, { expiresIn: '1d' })
}


/* 
    @desc Get all voting center data
    @route GET /api/v1/voting-centers/
    @access 
*/
const getAllVotingCenters = async (req, res) => {
    await VotingCenter
        .find()
        .sort("votingCenterId")
        .then(votingCenters => {
            if (votingCenters.length !== 0)
                res.status(200).json({ votingCenters });
            else
                res.status(200).json({ error: "Voting Centers not found" });
        })
        .catch(err => {
            res.status(400).json({ error: err.message })
        });

}

/* 
    @desc Get a specific voting center data
    @route GET /api/v1/voting-centers/:id
    @access 
*/
const getAVotingCenter = async (req, res) => {
    const { id } = req.params;
    await VotingCenter
        .findOne({ votingCenterId: id })
        .sort("votingCenterId")
        .then(votingCenters => {
            if (votingCenters !== null)
                res.status(200).json({ votingCenters });
            else
                res.status(200).json({ error: "No such voting center" });
        })
        .catch(err => {
            res.status(400).json({ error: err.message })
        });
}



/* 
    @desc Signup a Voting Center
    @route POST /api/v1/voting-centers/signup
    @access 
*/
const signup = async (req, res) => {

    const { votingCenterLocation, votingCenterOfficialId, votingCenterOfficialName, votingCenterContactNo, votingCenterPassowrd } = req.body;

    try {
        //* Check if all required data is entered
        if (!votingCenterLocation || !votingCenterOfficialId || !votingCenterOfficialName || !votingCenterContactNo || !votingCenterPassowrd) {
            throw Error("Please fill all details");
        }

        //* Check if the entered voting center location is exsists
        const isExists = await VotingCenter.findOne({ votingCenterLocation });

        if (isExists) {
            throw Error("Voting Center Location is already in use");
        }

        //* Get last voting center Id Id
        const lastVotingCenter = await VotingCenter.find().sort({ productId: -1 });

        let newVotingCenterId;
        if (lastVotingCenter == "") {
            newVotingCenterId = 1
        }
        else {
            newVotingCenterId = (lastVotingCenter[0].votingCenterId + 1)
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(votingCenterPassowrd, salt);

        const votingCenter = await VotingCenter.create({
            votingCenterId: newVotingCenterId,
            votingCenterLocation,
            votingCenterOfficialId,
            votingCenterOfficialName,
            votingCenterContactNo,
            votingCenterPassowrd: hash
        });

        const token = createToken(votingCenter.votingCenterId, votingCenter.votingCenterLocation)

        res.status(201).json({ votingCenter, token })
    }
    catch (err) {
        res.status(404).json({ error: err.message })
    }




}

/* 
    @desc Login a Voting Center
    @route POST /api/v1/voting-centers/login
    @access 
*/
const login = async (req, res) => {
    const { votingCenterLocation, votingCenterPassowrd } = req.body;

    if (!votingCenterLocation || !votingCenterPassowrd) {
        res.status(404).json({ error: "Invalid Credentials" })
    }
    else {
        const votingCenter = await VotingCenter.findOne({ votingCenterLocation });
        if (votingCenter && await bcrypt.compare(votingCenterPassowrd, votingCenter.votingCenterPassowrd)) {

            const token = createToken(votingCenter.votingCenterLocation, votingCenter.votingCenterPassowrd);
            res.status(200).json({ centerId: votingCenter.votingCenterId, location: votingCenter.votingCenterLocation, token })
        }
        else {
            res.status(404).json({ error: "Invalid Credentials" })
        }
    }
}



module.exports = {
    getAllVotingCenters,
    getAVotingCenter,
    signup,
    login
}
