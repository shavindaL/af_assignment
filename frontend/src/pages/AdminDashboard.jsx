import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import PeopleIcon from "@mui/icons-material/People";
import PollIcon from "@mui/icons-material/Poll";
import StatCard from "../components/admin/StatCard";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { Divider } from "@mui/material";

export default function AdminDashboard() {
  return (
    // Start of AdminDashboard component
    <>
      <div className="flex">
        <ProSidebarProvider>
          <AdminSidebar />
        </ProSidebarProvider>

        <main className="ml-[30px] mt-[30px]">
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

         <Divider style={{marginTop: "50px"}}/>

          {/* <center> */}
          <div className="mt-[150px] flex justify-center space-x-[75px]">
            <StatCard
              icon={<PollIcon />}
              cardTitle="Political Parties"
              count={10}
            />
            <br />
            <StatCard
              icon={<HowToRegIcon />}
              cardTitle="Election Candidates"
              count={20}
            />
            <br />
            <StatCard
              icon={<PeopleIcon />}
              cardTitle="Voters"
              count={25000}
            />
            <br />
            <StatCard
              icon={<HowToVoteIcon />}
              cardTitle="Voting Centers"
              count={50}
            />
            <br />
          </div>
          {/* </center> */}
        </main>
      </div>
    </>
    // End of AdminDashboard component
  );
}
