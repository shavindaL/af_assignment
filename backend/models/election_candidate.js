const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const electionCandidateSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone_no: {
      type: String,
      required: true,
    },
    nic: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
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
    political_party_id: {
      type: int,
      required: true,
    },
    province:{
      type: String,
      required: true
    },
    voting_number: [

        {
            election: {
                type: String,
                
            },
            number: {
                type: Number,
                unique: true
            }
        }
    ],
    vote_count: [

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

const Candidate = mongoose.model("electionCandidate", electionCandidateSchema);

module.exports = Candidate;
