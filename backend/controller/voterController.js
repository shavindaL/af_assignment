const Voter = require('../models/voter')

const getAllVoters = (req, res) => {
    res.status(200).json({success:"success"})
}

module.exports = getAllVoters;