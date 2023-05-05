import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import VotingCenterTable from "../components/admin/VotingCentersTable";

export default function VotingCenters() {
  return (
    // Start of ElectionCandidates component
    <>
      <div className="flex">
        <ProSidebarProvider>
          <AdminSidebar />
        </ProSidebarProvider>

        <div className="ml-[300px] w-fit h-fit justify-center">
          <p
            className="w-fit h-fit mt-[10px] flex text-[38px] font-[400]"
            style={{ fontFamily: "Roboto" }}
          >
            Voting Centers
          </p>

          <div className="ml-[230px] mt-[40px] h-fit">
            <VotingCenterTable />
          </div>


        </div>
      </div>
    </>
    // End of ElectionCandidates component
  );
}