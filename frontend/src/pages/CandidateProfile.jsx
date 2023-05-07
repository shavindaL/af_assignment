import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CandidateProfile(props) {

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    async function fetchCandidate() {
      const response = await axios.get(`http://localhost:5000/api/v1/candidates/991034927V`);
      setCandidate(response.data);
    }
    fetchCandidate();
  }, [props.nic]);

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
                <p className="text-gray-600 mt-2 ml-20"><i className="fas fa-address-card mr-2">NIC Number:</i>{candidate.nic}</p>
                <p className="text-gray-600 mt-2 ml-20"><i className="fas fa-address-card mr-2">Gender:</i>{candidate.gender}</p>
            </div>
            <div>
                <h2 className="text-md font-bold text-gray-700">Contact Information</h2>
                <p className="text-gray-600 mt-2"><i className="fas fa-phone mr-2">Phone:</i>{candidate.phoneNo}</p>
                <p className="text-gray-600 mt-2"><i className="fas fa-envelope mr-2">Email:</i>{candidate.email}</p>
            </div>
            <div>
                <h2 className="text-md font-bold text-gray-700">Election Information</h2>
                <p className="text-gray-600 mt-2"><i className="fas fa-users mr-2">Political party ID:</i>{candidate.politicalPartyId}</p>
                <p className="text-gray-600 mt-2"><i className="fas fa-map-marker-alt mr-2">Province:</i>{candidate.province}</p>
                <p className="text-gray-600 -mt-4"><i className="fas fa-vote-yea mr-2"></i>{candidate.votingNumber.map((number, index) => (
                  <p key={index}>
                    <span className="text-gray-600 mt-2"><i className="fas fa-users mr-2">Election Year:</i></span> {number.election}
                    <br />
                    <span className="text-gray-600 mt-9"><i className="fas fa-users mr-2">Voting Number:</i></span> {number.number}
                  </p>
            ))}</p>
            </div>
        </div>
    </div>

  );
}

export default CandidateProfile;