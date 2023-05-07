import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import PeopleIcon from "@mui/icons-material/People";
import PollIcon from "@mui/icons-material/Poll";
import StatCard from "../components/admin/StatCard";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";

export default function AdminDashboard() {
  // State variables
  const [partyCount, setPartyCount] = useState(0);
  const [candidateCount, setCandidateCount] = useState(0);
  const [voterCount, setVoterCount] = useState(0);
  const [votingCenterCount, setVotingCenterCount] = useState(0);

  // Use the useEffect hook
  useEffect(() => {
    // Method to get all political parties
    async function getParties() {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/political-parties"
        );
        const data = await res.json();

        if (data) {
          setPartyCount(data.length);
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }

    // Method to get all candidates
    async function getCandidates() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/candidates");
        const data = await res.json();

        if (data) {
          setCandidateCount(data.length);
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }

    // Method to get all voters
    async function getVoters() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/voters/voters");
        const data = await res.json();

        if (data) {
          setVoterCount(data.length);
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }

    // Method to get all voting centers
    async function getVotingCenters() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/voting-centers");
        const data = await res.json();

        if (data) {
          setVotingCenterCount(data.length);
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }



    // Invoke the above methods
    getParties();
    getCandidates();
    getVoters();
    getVotingCenters();

  }, []);
  return (
    // Start of AdminDashboard component
    <>
      <div className="flex">
        <ProSidebarProvider>
          <AdminSidebar />
        </ProSidebarProvider>

        <main className="ml-[300px] mt-[30px]">
          <p
            className="flex justify-center text-[38px] font-[400]"
            style={{ fontFamily: "Roboto" }}
          >
            Welcome back!
          </p>

          <p
            className="flex justify-center text-[20px] font-[400]"
            style={{ fontFamily: "Roboto" }}
          >
            {new Date().toLocaleDateString()}
          </p>

          <Divider style={{ marginTop: "50px" }} />

          <div className="mt-[150px] flex justify-center space-x-[75px]">
            <StatCard
              icon={<PollIcon />}
              cardTitle="Political Parties"
              count={partyCount}
            />
            <br />
            <StatCard
              icon={<HowToRegIcon />}
              cardTitle="Election Candidates"
              count={candidateCount}
            />
            <br />
            <StatCard
              icon={<PeopleIcon />}
              cardTitle="Voters"
              count={voterCount}
            />
            <br />
            <StatCard
              icon={<HowToVoteIcon />}
              cardTitle="Voting Centers"
              count={votingCenterCount}
            />
            <br />
          </div>
        </main>
      </div>
    </>
    // End of AdminDashboard component
  );
}
