import { Grid, Button } from "@mui/material";
import LoginForm from "../components/voting_center/LoginForm";
import { auto } from "@popperjs/core";
import { useState } from "react";
import { VotingCenterAuthContextProvider } from "../context/VotingCenterAuthContext";



export default function VotingCenterLogin() {

    return (
        <>
            <VotingCenterAuthContextProvider>
                <LoginForm />
            </VotingCenterAuthContextProvider>
        </>
    )
}