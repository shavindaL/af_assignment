import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import VotingCenterSignup from "./pages/VotingCenterSignup";
import AdminDashboard from "./pages/AdminDashboard";
import PoliticalParties from "./pages/PoliticalParties";
import NewPoliticalParty from "./pages/NewPoliticalParty";
import CandidateLogin from "./pages/candidateLogin";
import AdministratorLogin from "./pages/AdministratorLogin";
import InquiryForm from "./pages/InquiryForm";
import ElectionResults from "./pages/ElectionResults";
import ElectionCandidates from "./pages/ElectionCandidates";
import EditPoliticalParty from "./pages/EditPoliticalParty";
import Voters from "./pages/Voters";
import VotingCenters from "./pages/VotingCenters";
import VotingCenterLogin from "./pages/VotingCenterLogin";
import CandidateProfile from "./pages/CandidateProfile";
import CusPoliticalPartiesPage from "./pages/CusPoliticalPartiesPage";
import CusPoliticalParty from "./pages/CusPoliticalParty";

import AddCandidate from "./pages/AddCandidate";
import ValidateVoter from "./pages/ValidateVoter";
import UpdateCandidates from "./pages/UpdateCandidates";
import VotingPage from "./pages/VoitingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/voting-center/new-account" element={<VotingCenterSignup />} />
          <Route path="/voting-center/login" element={<VotingCenterLogin />} />
          <Route path="/voting-center/validate" element={localStorage.getItem('votingCenter') ? <ValidateVoter /> :<Navigate to='../voting-center/login'/> } />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/election-candidates/candidate" element={<AddCandidate />} />
          <Route path="/political-parties" element={<PoliticalParties />} />
          <Route path="/election-candidates" element={<ElectionCandidates />} />
          <Route path="/voters" element={<Voters />} />
          <Route path="/voting-centers" element={<VotingCenters />} />
          <Route
            path="/political-parties/new"
            element={<NewPoliticalParty />}
          />
          <Route
            path="/political-parties/:id"
            element={<EditPoliticalParty />}
          />
          <Route path="/CandidateLogin" element={<CandidateLogin />} />
          <Route path="/AdministratorLogin" element={<AdministratorLogin />} />
          <Route path="/InquiryForm" element={<InquiryForm />} />
          <Route path="/ElectionResults" element={<ElectionResults />} />
          <Route path="/CandidateProfile" element={<CandidateProfile />} />
          <Route path="/ElectionReults" element={<ElectionResults />} />

          <Route path="/political_parties" element={<CusPoliticalPartiesPage />} />
          <Route path="/political_parties/:id" element={<CusPoliticalParty />} />
          <Route path="/election-candidates/update/:id" element={<UpdateCandidates />} />
          <Route path="/voting-center/vote" element={localStorage.getItem('validate') ? <VotingPage /> : <Navigate to='../voting-center/validate' />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
