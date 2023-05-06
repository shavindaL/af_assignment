import { ProSidebarProvider } from "react-pro-sidebar";
import AdminSidebar from "../components/admin/AdminSidebar";
import UpdateCandidateForm from "../components/candidates/UpdateCandidateForm";

export default function UpdateCandidates() {
    return (
        <div className="flex">
            <ProSidebarProvider>
                <AdminSidebar />
            </ProSidebarProvider>

            <div className="ml-[300px] w-fit h-fit justify-center">
                <div className="ml-[230px] mt-[40px] h-fit">
                    <UpdateCandidateForm />
                </div>


            </div>
        </div>
    )
}