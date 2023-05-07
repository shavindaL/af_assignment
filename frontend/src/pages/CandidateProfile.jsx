import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";

function CandidateProfile(props) {

  const { _id } = useParams();

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    async function fetchCandidate() {
      const response = await axios.get(`http://localhost:5000/api/v1/candidates/${_id}`);
      setCandidate(response.data);
    }
    fetchCandidate();
  }, [props._id]);

  if (!candidate) {
    return <div>Loading candidate...</div>;
  }

  return (

    <div className="bg-white shadow-lg rounded-lg px-6 py-4">
      <div className="bg-blue-500 w-full text-white text-center mb-5 text-4xl" style={{height:"50px"}}>Candidate Profile</div>
        <div className="flex justify-center">
            <img src={candidate.photo} alt={candidate.name} className="w-32 h-32 mb-10 object-cover rounded-full border-4 border-indigo-500" />
        </div>
        <div className="text-center mt-4">
            <h1 className="text-xl font-bold text-gray-700 mb-5">Full name: {candidate.name}</h1>
            <p className="text-gray-600 mt-2 mb-10">Biography: {candidate.biography}</p>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-8 p-10">
            <div>
                <h2 className="text-md font-bold text-gray-700 ml-20">Personal Information</h2>
                <p className="text-gray-600 mt-2 ml-20">NIC Number: <i className="fas fa-address-card ml-1">{candidate.nic}</i></p>
                <p className="text-gray-600 mt-2 ml-20">Gender: <i className="fas fa-address-card ml-1">{candidate.gender}</i></p>
            </div>
            <div>
                <h2 className="text-md font-bold text-gray-700">Contact Information</h2>
                <p className="text-gray-600 mt-2">Phone: <i className="fas fa-phone ml-1">{candidate.phoneNo}</i></p>
                <p className="text-gray-600 mt-2">Email: <i className="fas fa-envelope ml-1">{candidate.email}</i></p>
            </div>
            <div>
                <h2 className="text-md font-bold text-gray-700">Election Information</h2>
                <p className="text-gray-600 mt-2">Political party ID: <i className="fas fa-users ml-1">{candidate.politicalPartyId}</i></p>
                <p className="text-gray-600 mt-2">Province: <i className="fas fa-map-marker-alt ml-1">{candidate.province}</i></p>
                <p className="text-gray-600 -mt-4"><i className="fas fa-vote-yea ml-1"></i>{candidate.votingNumber.map((number, index) => (
                  <p key={index}>
                    <span className="text-gray-600 mt-2">Election Year: <i className="fas fa-users ml-1">{number.election}</i></span> 
                    <br />
                    <span className="text-gray-600 mt-9">Voting Number: <i className="fas fa-users ml-1">{number.number}</i></span> 
                  </p>
            ))}</p>
            </div>
        </div>
    </div>

  );
}

export default CandidateProfile;