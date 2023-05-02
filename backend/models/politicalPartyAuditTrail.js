// Import the mongoose module
const mongoose = require('mongoose');

// Define the schema for political party audit trail
const politicalPartyAuditTrailSchema = mongoose.Schema({
    dbName: {
        type: String,
        default: process.env.DB_NAME
    },
    userIPAddress: {
        type: String,
        required: true
    },
    operation: {
        type: String,
        required: true
    },
    documentID: {
        type: String,
    },
    dataBefore: {
        type: Object,
        required: true
    },
    dataAfter: {
        type: Object,
        required: true
    },
    outcome: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: new Date().toLocaleDateString(),
        required: true
    }
});

// Define the model
const PoliticalPartyAuditTrail = mongoose.model("political_party_audit_trails", politicalPartyAuditTrailSchema);

// Export the model
module.exports = PoliticalPartyAuditTrail;