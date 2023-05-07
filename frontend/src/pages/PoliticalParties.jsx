import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import PartyTable from "../components/admin/PartyTable";

export default function PoliticalParties() {
  return (
    // Start of PoliticalParties component
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
            Political Parties
          </p>

          <div className="ml-[230px] mt-[40px] h-fit">
            <PartyTable />
          </div>


        </div>
      </div>
    </>
    // End of PoliticalParties component
  );
}
