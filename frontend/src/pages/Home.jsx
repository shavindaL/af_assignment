import { useEffect } from "react";
import Navbar from "../components/Navbar";
import CandidateAccountCreation from "../components/CandidateAccountCreation";

export default function Home() {
    return (
        <>
            <Navbar />
            <h1 className="text-2xl text-center">
                Index Page
            </h1>

            <CandidateAccountCreation></CandidateAccountCreation>
        </>
    )
}