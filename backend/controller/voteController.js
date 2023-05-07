const VotingCenter = require("../models/votingCenter");
const Candidate = require("../models/election_candidate");
const PoliticalPartyAuditTrail = require("../models/politicalPartyAuditTrail");
const PoliticalParty = require("../models/politicalParty");
const Cryptr = require("cryptr");

/* 
    @desc Save Voting data to relevent databases 
    @route POST /api/v1/vote
    @access 
*/
const processVote = async (req, res) => {

    const { votes, location } = req.body;

    votes.forEach(async vote => {

        //* Increment Candidate vote count
        await Candidate
            .findOneAndUpdate(
                { _id: vote._id },
                { $inc: { voteCount: 1 } }
            )
            .then()
            .catch(err => {
                res.status(400).json({ error: err.message })
            });





        try {
            // Instantiate Cryptr object
            const cryptr = new Cryptr(process.env.SECRET_KEY);

            // Get previous vote results of the given political party
            const tempPoltParty = await PoliticalParty.findOne({ partyID: vote.politicalPartyId });
            const voteResult = Number(cryptr.decrypt(tempPoltParty.vote_results))

            const updatedPoltParty = await PoliticalParty.findOneAndUpdate(
                {
                    partyID: vote.politicalPartyId
                },
                {
                    $set: {
                        vote_results: cryptr.encrypt(voteResult + 1)
                    },
                },
                {
                    new: true,
                }
            );

            if (updatedPoltParty) {

                // Decrypt already encrypted data
                tempPoltParty.vote_results = cryptr.decrypt(tempPoltParty.vote_results);
                updatedPoltParty.vote_results = cryptr.decrypt(updatedPoltParty.vote_results);

                // Insert audit log document
                await new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "update",
                    documentID: updatedPoltParty._id,
                    dataBefore: {
                        vote_results: tempPoltParty.vote_results
                    },
                    dataAfter: {
                        vote_results: updatedPoltParty.vote_results
                    },
                    outcome: "success",
                }).save();

            } else {
                // Respond with status code 400 (Bad Request) if unsuccessful
                res.status(400).send("Failed to update voting results");

                // Decrypt already encrypted data
                tempPoltParty.vote_results = cryptr.decrypt(tempPoltParty.vote_results);

                // Insert audit log document
                await new PoliticalPartyAuditTrail({
                    userIPAddress: req.socket.remoteAddress,
                    operation: "update",
                    documentID: tempPoltParty._id,
                    dataBefore: {
                        vote_results: tempPoltParty.vote_results
                    },
                    dataAfter: {
                        vote_results: tempPoltParty.vote_results
                    },
                    outcome: "failure",
                }).save();

            }

        } catch (err) {
            // Print error message
            console.log(err.message);
        }

    });






    //* Increment Voting Count 
    await VotingCenter
        .findOneAndUpdate(
            { votingCenterLocation: location.location },
            { $inc: { votingCount: 1 } }
        )
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