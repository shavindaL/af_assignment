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
    voterCenterOfficialId: {
        type: String,
        required: true,
    },
    voterCenterOfficialName: {
        type: String,
        required: true,
    },
    voterCenterContactNo: {
        type: Number,
        required: true,
    },
    votingCenterPassowrd: {
        type: String,
        required: true,
    },
    voterCount: {
        type: Number,
        required: true,
        default: 0
    },
},
    {
        timestamps: true
    });

const VoterCenter = mongoose.model("VotingCenter", votingCenterSchema);

module.exports = VoterCenter;