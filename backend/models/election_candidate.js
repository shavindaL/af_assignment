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
      required: true,
    },
    biography: {
      type: String,
      required: true,
    },
    political_party_id: {
      type: int,
      required: true,
    },
    voting_number: [

        {
            election: {
                type: String,
                required: true
            },
            number: {
                type: Number,
                required: true,
                unique: true
            }
        }
    ],
    vote_count: [

        {
            election: {
                type: String,
                required: true
            },
            count: {
                type: Number,
                required: true
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
