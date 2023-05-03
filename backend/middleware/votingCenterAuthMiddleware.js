const jwt = require('jsonwebtoken');
const VotingCenter = require("../models/votingCenter");


const requireAuth = (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization required" })
    }

    const token = authorization.split(' ')[1];

    try {
        jwt.verify(token, process.env.VOTING_CENTER_JWT);
        next();
    }
    catch (err) {
        res.status(401).json({ error: "Authorization required" })
    }
}

module.exports = { requireAuth }