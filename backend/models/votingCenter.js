const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const votingCenterSchema = new Schema({
    votingCenterId: {
        type: String,
        required: true,
        unique: true
    },
    votingCenterLocation: {
        type: String,
        required: true,
    },
    voterContactNo: {
        type: Number,
        required: true,
    },
    voterAddress: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });

const VoterCenter = mongoose.model("VotingCenter", votingCenterSchema);

module.exports = VoterCenter;