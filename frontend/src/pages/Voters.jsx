import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import VotersTable from "../components/admin/VotersTable";

export default function Voters() {
  return (
    // Start of ElectionCandidates component
    <>
      <div className="flex">
        <ProSidebarProvider>
          <AdminSidebar />
        </ProSidebarProvider>

        <div className="ml-[30px] w-fit h-fit justify-center">
          <p
            className="w-fit h-fit mt-[10px] flex text-[38px] font-[400]"
            style={{ fontFamily: "Roboto" }}
          >
            Voters
          </p>

          <div className="ml-[230px] mt-[40px] h-fit">
            <VotersTable />
          </div>


        </div>
      </div>
    </>
    // End of ElectionCandidates component
  );
}