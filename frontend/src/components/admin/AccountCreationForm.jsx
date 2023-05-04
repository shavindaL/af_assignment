import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    TextField,
} from "@mui/material";
import { useState } from "react";

export default function AccountCreationForm() {
    const [location, setLocation] = useState();
    const [officialId, setOfficialId] = useState();
    const [officialName, setOfficialName] = useState();
    const [contactNo, setContactNo] = useState();
    const [password, setPassword] = useState();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const votingCenter = {
            votingCenterLocation: location,
            votingCenterOfficialId: officialId,
            votingCenterOfficialName: officialName,
            votingCenterContactNo: contactNo,
            votingCenterPassowrd: password
        }

        console.log(votingCenter);

        const res = await fetch("http://localhost:5000/api/v1/voting-centers/signup", {
            method: "POST",
            body: JSON.stringify(votingCenter)
        });

        console.log(res);
        if (res.ok) {
            alert("Okay")
        }


    };

    return (
        <Box
            sx={{
                width: 500,
                height: 500,
                backgroundColor: "",
                marginLeft: 20,
                borderStyle: "solid",
                borderWidth: 1
            }}
        >
            <form onSubmit={handleSubmit}>
                <FormControl>
                    <TextField
                        label="Voting Center Location"
                        sx={{
                            marginTop: 2,
                            width: 500,
                        }}
                        onChange={(e) => setLocation(e.target.value)}
                        value={location}
                    />
                    <TextField
                        label="Voting Center Official Id"
                        sx={{ marginTop: 2 }}
                        value={officialId}
                        onChange={(e) => setOfficialId(e.target.value)}
                    />
                    <TextField
                        label="Voting Center Official Name"
                        sx={{ marginTop: 2 }}
                        value={officialName}
                        onChange={(e) => setOfficialName(e.target.value)}
                    />
                    <TextField
                        label="Voting Center Contact No."
                        sx={{ marginTop: 2 }}
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                    />
                    <TextField
                        label="Voting Center Passowrd"
                        sx={{ marginTop: 2 }}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button sx={{ marginTop: 2 }} type="submit">
                        Submit
                    </Button>
                </FormControl>
            </form>
        </Box>
    );
}
