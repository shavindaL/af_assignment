import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import CusPoliticalPartiesPage from "./pages/CusPoliticalPartiesPage";
import CusPoliticalParty from "./pages/CusPoliticalParty";

import AddCandidate from "./pages/AddCandidate";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/voting-center/new-account"
            element={<VotingCenterSignup />}
          />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/election-candidates/candidate" element={<AddCandidate/>} />
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
          <Route path="/ElectionReults" element={<ElectionResults />} />

          <Route path="/political_parties" element={<CusPoliticalPartiesPage />} />
          <Route path="/political_parties/:id" element={<CusPoliticalParty />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
