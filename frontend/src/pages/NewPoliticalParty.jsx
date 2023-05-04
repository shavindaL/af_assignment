import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import PartyForm from "../components/admin/PartyForm";


export default function NewPoliticalParty() {
  return (
    // Start of NewPoliticalParty component
    <div className="flex">
      <ProSidebarProvider>
        <AdminSidebar />
      </ProSidebarProvider>

      <div className="ml-[30px] w-fit h-fit justify-center">
        <p
          className="w-fit h-fit mt-[30px] flex text-[38px] font-[400]"
          style={{ fontFamily: "Roboto" }}
        >
          New Political Party
        </p>

      

      </div>

      <PartyForm />
    </div>
    // End of NewPoliticalParty component
  );
}
