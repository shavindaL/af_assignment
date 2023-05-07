import { useEffect } from "react";
import Navbar from "../components/Navbar";
import CandidateAccountCreation from "../components/CandidateAccountCreation";
import ResultsBarchart from "../components/ResultsBarchart";

export default function Home() {
    return (
        <>
            <Navbar />

            <ResultsBarchart></ResultsBarchart>

            {/* <CandidateAccountCreation></CandidateAccountCreation> */}
        </>
    )
}