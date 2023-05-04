import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PollIcon from "@mui/icons-material/Poll";
import LogoutIcon from "@mui/icons-material/Logout";
import { Avatar, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import HowToRegIcon from "@mui/icons-material/HowToReg";

export default function AdminSidebar() {
  const { collapseSidebar } = useProSidebar();

  return (
    // Start of AdminSidebar component
    <>
      {/* <div id="app" className="flex h-auto"> */}
        <Sidebar className="h-auto" style={{ fontFamily: "Roboto" }} rootStyles={{backgroundColor: "#0d47a1"}}>
          <Menu className="bg-[#0d47a1] h-[100vh]">
            <MenuItem
              icon={<Avatar>A</Avatar>}
              onClick={() => {
                collapseSidebar();
              }}
              style={{ textAlign: "center" }}
              className="tracking-[1px] text-white hover:text-black h-auto"
            >
              ADMINISTRATOR
            </MenuItem>


            <Divider className="bg-white" />

            <MenuItem
              icon={<DashboardIcon />}
              className="tracking-[1px] text-white hover:text-black"
            >
              <Link to="/admin-dashboard">DASHBOARD</Link>
            </MenuItem>
            <MenuItem
              icon={<PollIcon />}
              className="tracking-[1px] text-white hover:text-black"
            >
              <Link to="/political-parties">POLITICAL PARTIES</Link>
            </MenuItem>
            <MenuItem
              icon={<HowToRegIcon />}
              className="tracking-[1px] text-white hover:text-black"
            >
              <Link to="/election-candidates">CANDIDATES</Link>
            </MenuItem>
            <MenuItem
              icon={<PeopleAltIcon />}
              className="tracking-[1px] text-white hover:text-black"
            >
              VOTERS
            </MenuItem>
            <MenuItem
              icon={<HowToVoteIcon />}
              className="tracking-[1px] text-white hover:text-black"
            >
              VOTING CENTERS
            </MenuItem>
            <Divider className="bg-white" />
            <MenuItem
              icon={<LogoutIcon />}
              className="tracking-[1px] text-white hover:text-black"
            >
              LOGOUT
            </MenuItem>
          </Menu>
        </Sidebar>
      {/* </div> */}
    </>
    // End of AdminSidebar component
  );
}
