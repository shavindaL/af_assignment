import {
    Alert,
    Button,
    CircularProgress,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { useState } from "react";

export default function AccountCreationForm() {
    const [location, setLocation] = useState('');
    const [officialId, setOfficialId] = useState('');
    const [officialName, setOfficialName] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');


    const [locationAlert, setLocationAlert] = useState(false);
    const [officialIdAlert, setOfficialIdAlert] = useState(false);
    const [officialNameAlert, setOfficialNameAlert] = useState(false);
    const [contactNoAlert, setContactNoAlert] = useState(false);
    const [invalidContactNoAlert, setInvalidContactNoAlert] = useState(false);
    const [passwordAlert, setPasswordAlert] = useState(false);
    const [passwordLengthAlert, setPasswordLengthAlert] = useState(false);
    const [mismatchAlert, setMismatchAlert] = useState(false)

    const [isValid, setIsValid] = useState(false)

    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    //* Check enterd data is valid
    const validateData = () => {
        if (!location) {
            setLocationAlert(true)
            setIsValid(false)
        }
        else {
            setLocationAlert(false)
            setIsValid(true)
        }

        if (!officialId) {
            setOfficialIdAlert(true)
            setIsValid(false)
        }
        else {
            setOfficialIdAlert(false)
            setIsValid(true)
        }

        if (!officialName) {
            setOfficialNameAlert(true)
            setIsValid(false)
        }
        else {
            setOfficialNameAlert(false)
            setIsValid(true)
        }

        if (!contactNo) {
            setContactNoAlert(true)
            setIsValid(false)
        }
        else {
            if (isNaN(contactNo)) {
                setInvalidContactNoAlert(true)
            }
            else {
                setContactNoAlert(false)
                setIsValid(true)
            }
        }

        if (!password) {
            setPasswordAlert(true)
            setIsValid(false)
        }
        else {
            setPasswordAlert(false)
            if (!password.length > 6) {
                setPasswordLengthAlert(true)
                setIsValid(false)
            }
            else {
                if (password !== confirmPassword) {
                    setMismatchAlert(true)
                    setIsValid(false)
                }
                else {
                    setMismatchAlert(false)
                    setIsValid(true)
                }
            }

        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        validateData();

        if (isValid) {
            setIsLoading(true);

            const votingCenter = {
                votingCenterLocation: location,
                votingCenterOfficialId: officialId,
                votingCenterOfficialName: officialName,
                votingCenterContactNo: contactNo,
                votingCenterPassowrd: password
            }


            const res = await fetch("http://localhost:5000/api/v1/voting-centers/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(votingCenter)
            });

            const json = await res.json()


            if (!res.ok) {
                setIsLoading(false);
                setError(json.error)
            }

            if (res.ok) {
                setIsLoading(false);
                alert("Okay")
            }
        }
    };

    return (
        <div className="w-fit h-fit border-solid border border-black rounded-2xl">
            <form onSubmit={handleSubmit} className="px-16 py-10">
                <FormControl sx={{ width: 300 }}>
                    <InputLabel id="locationLabel">Location</InputLabel>
                    <Select
                        labelId="locationLabel"
                        value={location}
                        label="Location"
                        onChange={e => { setLocation(e.target.value) }}
                    >
                        <MenuItem value={"Central"}>Central</MenuItem>
                        <MenuItem value={"North Central"}>North Central</MenuItem>
                        <MenuItem value={"Northern"}>Northern</MenuItem>
                        <MenuItem value={"Eastern"}>Eastern</MenuItem>
                        <MenuItem value={"North Western"}>North Western</MenuItem>
                        <MenuItem value={"Southern"}>Southern</MenuItem>
                        <MenuItem value={"Uva"}>Uva</MenuItem>
                        <MenuItem value={"Sabaragamuwa"}>Sabaragamuwa</MenuItem>
                        <MenuItem value={"Southern"}>Western</MenuItem>
                    </Select>
                    {locationAlert ? <Alert severity="error">Location must be entered.</Alert> : null}
                    <TextField
                        label="Voting Center Official Id"
                        sx={{ marginTop: 2 }}
                        value={officialId}
                        onChange={(e) => setOfficialId(e.target.value)}
                    />
                    {officialIdAlert ? <Alert severity="error">Official's ID must be entered.</Alert> : null}
                    <TextField
                        label="Voting Center Official Name"
                        sx={{ marginTop: 2 }}
                        value={officialName}
                        onChange={(e) => setOfficialName(e.target.value)}
                    />
                    {officialNameAlert ? <Alert severity="error">Official's Name must be entered.</Alert> : null}
                    <TextField
                        label="Voting Center Contact No."
                        sx={{ marginTop: 2 }}
                        value={contactNo}
                        onChange={(e) => setContactNo(e.target.value)}
                        type="text"
                    />
                    {contactNoAlert ? <Alert severity="error">Contact Number must be entered.</Alert> : null}
                    {invalidContactNoAlert ? <Alert severity="error">Invalid Contact No. format.</Alert> : null}
                    <TextField
                        label="Passowrd"
                        sx={{ marginTop: 2 }}
                        value={password}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {passwordAlert ? <Alert severity="error">Password must be entered.</Alert> : null}
                    {passwordLengthAlert ? <Alert severity="error">Minimum password length should be 6 characters.</Alert> : null}
                    <TextField
                        label="Confirm Passowrd"
                        sx={{ marginTop: 2 }}
                        value={confirmPassword}
                        type="password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    {mismatchAlert ? <Alert severity="error">Passwords mismatch.</Alert> : null}
                    {!isLoading ?
                        <Button sx={{ marginTop: 2, }} type="submit">
                            Submit
                        </Button>
                        :
                        <div className="mx-auto">
                            <CircularProgress />
                        </div>}
                </FormControl>
                {error && <Alert severity="error">{error}</Alert>}
            </form>
        </div>
    );
}
