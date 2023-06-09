// Import the mongoose module
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Define the schema
const politicalPartySchema = new Schema({
    partyID: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone_no: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    leader_name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    competitor_count: {
        type: String,
        required: true
    },
    vote_results: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        default: "https://cdn.logojoy.com/wp-content/uploads/2018/05/30144716/616-768x591.png",
        required: true
    }
});


// Create new model
const PoliticalParty = mongoose.model("political_party", politicalPartySchema);

// Export the model
module.exports = PoliticalParty;