import { Alert, Button, CircularProgress, FormControl, Grid, TextField } from "@mui/material";
import { auto } from "@popperjs/core";
import { useEffect, useState } from "react";
import { useLogin } from "../../hooks/useVotingCenterLogIn";


export default function LoginForm() {

    const [votingCenters, setVotingCenters] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [errorAlert, setErrorAlert] = useState(false)



    useEffect(() => {
        const getData = async () => {
            const res = await fetch('http://localhost:5000/api/v1/voting-centers');
            const json = await res.json();
            if (res.ok) {
                setVotingCenters(json)
            }
        }

        getData()
    }, [])


    const handleClick = (center) => {

        // Check if the clicked item is already selected
        if (selectedItems.includes(center)) {
            setErrorAlert(false)
            // If it is, remove it from the array of selected items
            setSelectedItems(selectedItems.filter(selectedItem => selectedItem !== center));
        } else {
            // If it's not, add it to the array of selected items
            if (selectedItems.length === 0) {
                setErrorAlert(false)
                setSelectedItems([...selectedItems, center]);
                setLocation(center.votingCenterLocation);
            }
            else {
                setErrorAlert(true)
            }
        }
    }

    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");
    const [page, setPage] = useState(0);

    const { login, error, isLoading } = useLogin();
    const [isValid, setIsValid] = useState(false);


    const handleNext = () => {
        if (page === 0) {
            setPage(page + 1)
        }
    }

    const handleBack = () => {
        if (page == 1) {
            setPage(page - 1)
        }
    }

    //* validation
    const validate = () => {
        if (location === "") {
            setIsValid(false)
        }
        else {
            setIsValid(true)
        }

        if (password === "") {
            setIsValid(false)
        }
        else {
            setIsValid(true)
        }

        if (location === "" && password === "") {
            setIsValid(false)
        }
        else {
            setIsValid(true)
        }


    }

    const handleSubmit = async e => {
        e.preventDefault();
        validate();
        if (isValid) {
            await login(location, password);
        }

    }


    return (
        <>
            <div className="mt-16">

                <h1 className="text-center text-4xl">{page == 0 ? "Select Province" : "Enter Password"}</h1>
            </div>
            <div className="w-96 mx-auto mt-10"> 
                {errorAlert && <Alert severity="error">Remove previous selected location to select new location.</Alert>}
                {error && page === 1 && <Alert severity="error">{error}</Alert>}
                {isLoading ? <div className="mx-auto">
                    <CircularProgress />
                </div> : null}
            </div>
            <form onSubmit={handleSubmit}>
                {page === 0 ? <div className="ml-20 w-fit mt-10">
                    <FormControl>
                        <Grid container spacing={12}>
                            {votingCenters && votingCenters.map(votingCenter =>
                                <Grid item xs={12} sm={6} md={4} lg={4} key={votingCenter.votingCenterId}>
                                    <Button
                                        variant={selectedItems.includes(votingCenter) ? "outlined" : "contained"}
                                        onClick={() => {

                                            handleClick(votingCenter);
                                        }}
                                        sx={{
                                            width: 500,
                                            height: 120,
                                            fontSize: 36,
                                            fontWeight: 700,
                                            borderRadius: 5,
                                        }}>{votingCenter.votingCenterLocation}</Button>
                                </Grid>
                            )
                            }
                        </Grid>
                    </FormControl>
                </div> :

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
                }
                <Grid container columnSpacing={{ lg: 105 }} marginTop={10}>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        {page === 1 ?
                            <Button
                                type="button"
                                variant="contained"
                                sx={{
                                    width: 300,
                                    height: 80,
                                    fontSize: 36,
                                    fontWeight: 700,
                                    borderRadius: 5,
                                    marginLeft: 12
                                }}
                                onClick={handleBack}>Back</Button> : null}
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} lg={6}>
                        {page === 0 ?
                            <Button
                                variant="outlined"
                                type="button"
                                sx={{           
                                    width: 300,
                                    height: 80,
                                    fontSize: 36,
                                    fontWeight: 700,
                                    borderRadius: 5,
                                    marginRight: 0,
                                    marginLeft: auto
                                }}
                                onClick={handleNext}>
                                Next
                            </Button> :
                            <Button
                                variant="contained"
                                type="submit"
                                sx={{
                                    width: 300,
                                    height: 80,
                                    fontSize: 36,
                                    fontWeight: 700,
                                    borderRadius: 5,
                                    marginRight: 0,
                                    marginLeft: auto
                                }}
                            >
                                Login
                            </Button>}
                    </Grid>
                </Grid>
            </form>

        </>
    )
}
