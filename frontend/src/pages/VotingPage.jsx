import Navbar from "../components/voting_center/NavBar";
import VotingCandidateTable from "../components/voting_center/VotingCandidateTable";
import { VotingCenterAuthContextProvider } from "../context/VotingCenterAuthContext";

export default function VotingPage() {

    return (
        <>
            <VotingCenterAuthContextProvider>
                <div className="font-serif">
                    <Navbar />
                    <VotingCandidateTable />
                </div>
            </VotingCenterAuthContextProvider>
        </>
    )
}