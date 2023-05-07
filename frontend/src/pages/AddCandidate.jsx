import React from "react";

import CandidateAccountCreation from "../components/CandidateAccountCreation";
import AdminSidebar from "../components/admin/AdminSidebar";
import { ProSidebarProvider } from "react-pro-sidebar";

export default function AddCandidate() {
  return (
    <div className="flex">
      <ProSidebarProvider>
        <AdminSidebar />
      </ProSidebarProvider>

      <div className="ml-[400px] w-fit h-fit justify-center mt-[40px]">
        <p
          className="w-fit h-fit mt-[10px] flex text-[38px] font-[400]"
          style={{ fontFamily: "Roboto", content:"center"}}
        >
          Add Candidate
        </p>

        <div style={{ marginTop:"30px", marginBottom:"200px"}}>
        <CandidateAccountCreation></CandidateAccountCreation>
        </div>

      </div>

      

    </div>
  );
}
