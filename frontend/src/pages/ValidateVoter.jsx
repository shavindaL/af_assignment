import { Alert, Button, TextField } from "@mui/material";
import Navbar from "../components/voting_center/NavBar";
import { FormControl } from "@mui/base";
import { useState } from "react";
import { auto } from "@popperjs/core";
import { VotingCenterAuthContextProvider } from "../context/VotingCenterAuthContext";


export default function ValidateVoter() {
    const [nic, setNic] = useState("")
    const [alert, setAlert] = useState(false)
    const [emptyAlert, setEmptyAlert] = useState(false)


    const validate = () => {
        if (nic === "") {
            setEmptyAlert(true);
            return false
        }
        else {
            setEmptyAlert(false);
            return true
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const res = await fetch(`http://localhost:5000/api/v1/voters/voters/${nic}`);
            const json = await res.json();

            if (res.ok) {
                setAlert(false)
                localStorage.setItem('validate', JSON.stringify(json))
                window.location.replace("http://localhost:3000/voting-center/vote")
            }

            if (!res.ok) {
                setAlert(true)
            }
        }

    }

    return (
        <>
            <VotingCenterAuthContextProvider>
                <Navbar />
                <div className="mt-16">
                    <form onSubmit={handleSubmit}>
                        <FormControl>
                            <div>
                                <h1 className="text-center text-4xl">Enter NIC</h1>
                            </div>
                            <div className="flex mx-auto w-fit h-[200px] items-center ">
                                <TextField
                                    onChange={e => { setNic(e.target.value) }}
                                    label="NIC"
                                    sx={{
                                        marginTop: 2,
                                        width: 900,
                                    }}
                                    type="text"
                                />
                            </div>
                            {alert ?
                                <Alert
                                    sx={{
                                        width: 500,
                                        marginX: auto,
                                        fontSize: 28
                                    }}
                                    severity="error">Invalid NIC</Alert> : null}
                            {emptyAlert ?
                                <Alert
                                    sx={{
                                        width: 500,
                                        marginX: auto,
                                        fontSize: 28
                                    }}
                                    severity="error">NIC Field must be filled</Alert> : null}
                            <div className="flex mx-auto w-fit items-center mt-10">
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{
                                        width: 300,
                                        height: 80,
                                        fontSize: 24,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>Validate</Button>
                            </div>
                        </FormControl>
                    </form>
                </div>
            </VotingCenterAuthContextProvider>
        </>
    )
}