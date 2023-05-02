const Candidate = require("../models/election_candidate");

const getAllCandidates = (req, res) => {
    res.status(200).json({success:"candidates"})
}

module.export ={

    getAllCandidates,
}