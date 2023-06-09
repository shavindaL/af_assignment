const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const voterSchema = new Schema({
    voterNIC: {
        type: String,
        required: true,
        unique: true
    },
    voterName: {
        type: String,
        required: true,
    },
    voterContactNo: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    voterAddress: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });

const Voter = mongoose.model("Voter", voterSchema);

module.exports = Voter;