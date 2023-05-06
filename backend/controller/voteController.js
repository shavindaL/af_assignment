const VotingCenter = require("../models/votingCenter");
const Candidate = require("../models/election_candidate");


/* 
    @desc Save Voting data to relevent databases 
    @route POST /api/v1/vote
    @access 
*/
const processVote = async (req, res) => {

    const { votes, location } = req.body;

    // votes.forEach(async vote => {
    //     await Candidate.findOneAndUpdate({ _id: vote._id }, { "voteCount.election": vote.votingNumber.election}).then(candidate=>console.log(candidate))
    // });

    //* Increment Voting Count 
    await VotingCenter
        .findOneAndUpdate({ votingCenterLocation: location.location }, { $inc: { votingCount: 1 } })
        .sort("votingCenterId")
        .then(votingCenter => {
            res.status(200).json(votingCenter);
        })
        .catch(err => {
            res.status(400).json({ error: err.message })
        });

}

module.exports = {
    processVote
}