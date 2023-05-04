const Candidate = require("../models/election_candidate");

// const getCandidates = (req, res) => {
//     res.status(200).json({success:"candidates"})
// }


//get all candidates
const getAllCandidates =  async(req,res) =>{
    try {
        
        //get all candidates documents from candidate collection
        const candidates = await Candidate.find()

        if(candidates){
            //response with status 200 if ok
            res.status(200).send(candidates)
        }else{
            //response with 400 status if failed
            res.status(400).send("Failed to get candidates")
        }

    } catch (error) {
        //print error
        console.log(error.message)
    }
}



//add candidate
const addCandidate = async (req,res) =>{

    const candidate = new Candidate({
        name: req.body.name,
        phoneNo: req.body.phoneNo,
        nic: req.body.nic,
        email: req.body.email,
        password: req.body.password,
        position: req.body.position,
        biography: req.body.biography,
        politicalPartyId: req.body.politicalPartyId,
        province: req.body.province,
        votingNumber: req.body.votingNumber,
        voteCount: req.body.voteCount,
        photo: req.body.photo,
    })
    
    
    try {

        await candidate.save()
        //response with status 200 if ok
        res.status(200).send("Candidate added done")
    } catch (error) {
        //response with 400 status if failed
        res.status(400).send("Failed to add the candidate")
        //print the error
        console.log(error.message)
    }
}


//get specific candidate
const getCandidate = async (req, res) => {

    try {

        // Find the particular document
        const candidate = await Candidate.findOne({ nic: req.params.id });

        // Respond with status code 200 (OK) if successful
        res.status(200).send(candidate);

    } catch (err) {

        // Respond with status code 400 (Bad Request) if unsuccessful
        res.status(400).send("Failed to find candidate");

        // Print the error message
        console.log(err.message);
    }

};
module.exports ={

    // getCandidates,
    getAllCandidates,
    addCandidate,
    getCandidate
    
}