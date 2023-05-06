import { TextField } from "@mui/material";
import { useState } from "react";

export default function VotingCenterPassword() {

    const [password, setPassword] = useState("")

    return (
        <>
            <div className="mt-16">
                <div>
                    <h1 className="text-center text-4xl">Enter Password</h1>
                </div>
                <div className="flex mx-auto w-fit h-[600px] items-center ">
                    <TextField
                        label="Passowrd"
                        sx={{
                            marginTop: 2,
                            width: 900,
                        }}
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
            </div>
        </>
    )
}