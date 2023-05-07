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
        unique: true,
        lowercase: true
    },
    votingCenterOfficialId: {
        type: String,
        required: true,
    },
    votingCenterOfficialName: {
        type: String,
        required: true,
    },
    votingCenterContactNo: {
        type: Number,
        required: true,
    },
    votingCenterPassowrd: {
        type: String,
        required: true,
    },
    votingCount: {
        type: Number,
        required: true,
        default: 0
    },
},
    {
        timestamps: true
    });

const votingCenter = mongoose.model("VotingCenter", votingCenterSchema);

module.exports = votingCenter;