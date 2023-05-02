const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accountSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    nic: {
        type: String,
        required: true,
    },
},
    {
        timestamps: true
    });

const candidateAccount = mongoose.model("candidate_account", accountSchema);

module.exports = candidateAccount;