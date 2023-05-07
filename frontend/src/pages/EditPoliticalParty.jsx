import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import EditPartyForm from "../components/admin/EditPartyForm";

export default function EditPoliticalParty() {
  return (
    // Start of EditPoliticalParty component
    <div className="flex">
      <ProSidebarProvider>
        <AdminSidebar />
      </ProSidebarProvider>

      <div className="ml-[30px] w-fit h-fit justify-center">
        <p
          className="w-fit h-fit mt-[10px] flex text-[38px] font-[400]"
          style={{ fontFamily: "Roboto" }}
        >
          Edit Political Party
        </p>

      

      </div>

      <EditPartyForm partyID={window.location.pathname.split("/")[2]}/>

    </div>
    // End of EditPoliticalParty component
  );
}