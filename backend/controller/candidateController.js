const Candidate = require("../models/election_candidate");

const Cryptr = require('cryptr');


async function encryptData(cryptr, password) {
    // Encrypt the given details
    password = await cryptr.encrypt(password);

    // Return the encrypted data
    return {
        password
    }
}

// const getCandidates = (req, res) => {
//     res.status(200).json({success:"candidates"})
// }

//get all candidates
const getAllCandidates = async (req, res) => {
  try {
    //get all candidates documents from candidate collection
    const candidates = await Candidate.find();
    
    const cryptor = new Cryptr(process.env.SECRET_KEY);

    // decrypt password for each candidate
    const decryptedCandidates = candidates.map((candidate) => {
      return {
        ...candidate.toObject(),
        password: cryptor.decrypt(candidate.password)
      };
    });

    if (decryptedCandidates) {
      //response with status 200 if ok
      res.status(200).send(decryptedCandidates);
    } else {
      //response with 400 status if failed
      res.status(400).send("Failed to get candidates");
    }
  } catch (error) {
    //print error
    console.log(error.message);
  }
};

//add candidate
// const addCandidate = async (req,res) =>{

//     const candidate = new Candidate({
//         name: req.body.name,
//         phoneNo: req.body.phoneNo,
//         nic: req.body.nic,
//         email: req.body.email,
//         password: req.body.password,
//         position: req.body.position,
//         biography: req.body.biography,
//         politicalPartyId: req.body.politicalPartyId,
//         province: req.body.province,
//         votingNumber: {election:req.body.election , number:req.body.number}

//         // voteCount: req.body.voteCount,
//         // photo: req.body.photo,
//     })

//     try {

//         await candidate.save()
//         //response with status 200 if ok
//         res.status(200).json({message:"candidate added done"})
//     } catch (error) {
//         //response with 400 status if failed
//         res.status(400).json({message:"Failed to add the candidate"})
//         //print the error
//         console.log(error.message)
//     }
// }

const addCandidate = async (req, res) => {
  try {



    const cryptr = new Cryptr(process.env.SECRET_KEY);

    // Object array to hold existing emails and phone numbers
    const emails_nic = await Candidate.find({}, { email: 1, nic: 1, _id: 0 });

    // Boolean variable to check if the political party with the given email and phone number already exists
    let isCandidateExists = false;

    // Loop through the object array array
    for (let i = 0; i < emails_nic.length; i++) {
      // Check if email is matching after decrypting
      if (emails_nic[i].email.toString() === req.body.email) {
        isCandidateExists = true;

        // Respond with status code 400 (Bad Request) if email already exists
        res.status(400).send("Sorry, this email is already taken");
      }

      // Check if phone number is matching after decrypting
      if (emails_nic[i].nic.toString() === req.body.nic) {
        isCandidateExists = true;

        // Respond with status code 400 (Bad Request) if phone number already exists
        res.status(400).send("Sorry, this NIC is already taken");
      }
    }

    if (isCandidateExists === false) {
      // Variable to hold the last document in the collection
    //   let lastDoc = await Candidate.find().limit(1).sort({ $natural: -1 });

    //   // Variable to hold the partyID of the last document in the collection
    //   let lastDocPartyID;

    //   if (lastDoc.length !== 0) {
    //     lastDocPartyID = await lastDoc[0].partyID;
    //   } else {
    //     lastDocPartyID = 0;
    //   }

      // Encrypt sensitive data
      // const { nic, password } = await encryptData(
      //     cryptr, req.body.nic, req.body.password
      // );


      const { password } = await encryptData(
        cryptr, req.body.password
    );

      // Create new document if isCandidateExists variable is false

      const candidate = new Candidate({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        nic: req.body.nic,
        gender: req.body.gender,
        // dob: req.body.dob,
        email: req.body.email,
        password: password,
        position: req.body.position,
        biography: req.body.biography,
        politicalPartyId: req.body.politicalPartyId,
        province: req.body.province,
        votingNumber: { election: req.body.election, number: req.body.number },

        // voteCount: req.body.voteCount,
        // photo: req.body.photo,
      });

      // Insert the new document
      const newPoltParty = await candidate.save();

      if (newPoltParty) {
        // Respond with status code 201 (Created) if successful
        res.status(201).send("Political Party added successfully");
      } else {
        // Respond with status code 400 (Bad Request) if unsucessful
        res.status(400).send("Failed to add the Candidate");
      }
    }
  } catch (err) {
    // Print error message
    console.log(err.message);
  }
};

//get specific candidate
const getCandidate = async (req, res) => {
  try {
    // Find the particular document
    const candidate = await Candidate.findOne({ _id: req.params.id });
    const cryptor = new Cryptr (process.env.SECRET_KEY)
    candidate.password = cryptor.decrypt(candidate.password);

    // Respond with status code 200 (OK) if successful
    res.status(200).send(candidate);
  } catch (err) {
    // Respond with status code 400 (Bad Request) if unsuccessful
    res.status(400).send("Failed to find candidate");

    // Print the error message
    console.log(err.message);
  }
};
module.exports = {
  // getCandidates,
  getAllCandidates,
  addCandidate,
  getCandidate,
};
