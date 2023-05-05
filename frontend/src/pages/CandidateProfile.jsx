import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CandidateProfile(props) {

  const [candidate, setCandidate] = useState(null);

  useEffect(() => {
    async function fetchCandidate() {
      const response = await axios.get(`http://localhost:5000/api/v1/candidates ${props._id}`);
      setCandidate(response.data);
    }
    fetchCandidate();
  }, [props._id]);

  if (!candidate) {
    return <div>Loading candidate...</div>;
  }

  return (

    <div className="bg-white shadow-lg rounded-lg px-6 py-8">
        <div className="flex justify-center">
            <img src={candidate.photo} alt={candidate.name} className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500" />
        </div>
        <div className="text-center mt-4">
            <h1 className="text-xl font-bold text-gray-700">{candidate.name}</h1>
            <p className="text-gray-600 mt-2">{candidate.biography}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-8">
            <div>
                <h2 className="text-md font-bold text-gray-700">Contact Information</h2>
                <p className="text-gray-600 mt-2"><i className="fas fa-phone mr-2"></i>{candidate.phoneNo}</p>
                <p className="text-gray-600 mt-2"><i className="fas fa-envelope mr-2"></i>{candidate.email}</p>
                <p className="text-gray-600 mt-2"><i className="fas fa-address-card mr-2"></i>{candidate.nic}</p>
            </div>
            <div>
                <h2 className="text-md font-bold text-gray-700">Election Information</h2>
                <p className="text-gray-600 mt-2"><i className="fas fa-users mr-2"></i>{candidate.politicalPartyId}</p>
                <p className="text-gray-600 mt-2"><i className="fas fa-map-marker-alt mr-2"></i>{candidate.province}</p>
                <p className="text-gray-600 mt-2"><i className="fas fa-vote-yea mr-2"></i>{candidate.votingNumber}</p>
            </div>
        </div>
    </div>

  );
}

export default CandidateProfile;