const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const electionCandidateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNo: {
      type: String,
      required: true,
    },
    nic: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    position: {
      type: String,
    },
    biography: {
      type: String,
      required: true,
    },
    politicalPartyId: {
      type: Number,
      required: true,
    },
    province:{
      type: String,
      required: true
    },
    votingNumber: [

        {
            election: {
                type: String,
                
            },
            number: {
                type: Number,
            }
        }
    ],
    voteCount: [

        {
            election: {
                type: String, 
            },
            count: {
                type: Number,
            }
        }
    ],
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate = mongoose.model("candidate", electionCandidateSchema);

module.exports = Candidate;
