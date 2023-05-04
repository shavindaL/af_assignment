import { ProSidebarProvider } from "react-pro-sidebar";
import AccountCreationForm from "../components/admin/VotingCenterAccountCreationForm";
import AdminSidebar from "../components/admin/AdminSidebar";

export default function VotingCenterSignup() {
    return (
        <>
            <div className="flex">
                <ProSidebarProvider>
                    <AdminSidebar />
                </ProSidebarProvider>
                <div className="mx-auto mt-20">
                    <AccountCreationForm />
                </div>
            </div>
        </>
    )
}