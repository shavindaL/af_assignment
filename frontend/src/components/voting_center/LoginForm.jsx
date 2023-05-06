import { Alert, Button, CircularProgress, FormControl, Grid, TextField } from "@mui/material";
import { auto } from "@popperjs/core";
import { useState } from "react";
import { useLogin } from "../../hooks/useVotingCenterLogIn";


export default function LoginForm() {

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
            <form onSubmit={handleSubmit}>
                {page === 0 ? <div className="ml-20 w-fit mt-10">
                    <FormControl>
                        <Grid container spacing={12}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("Central") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5,
                                    }}>Central</Button>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("North Central") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>North Central</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("Northern") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>Northern</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("Eastern") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>Eastern</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("North Western") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>North Western</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("Southern") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>Southern</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("Uva") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>Uva</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("Sabaragamuwa") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>Sabaragamuwa</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Button
                                    variant="contained"
                                    onClick={() => { setLocation("Western") }}
                                    sx={{
                                        width: 500,
                                        height: 120,
                                        fontSize: 36,
                                        fontWeight: 700,
                                        borderRadius: 5
                                    }}>Western</Button>
                            </Grid>
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
                                    width: 500,
                                    height: 120,
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
                                variant="contained"
                                type="button"
                                sx={{
                                    width: 500,
                                    height: 120,
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
                                    width: 500,
                                    height: 120,
                                    fontSize: 36,
                                    fontWeight: 700,
                                    borderRadius: 5,
                                    marginRight: 0,
                                    marginLeft: auto
                                }}
                            >
                                Login
                            </Button>}
                        {error && <Alert severity="error">{error}</Alert>}
                        {isLoading ? <div className="mx-auto">
                            <CircularProgress />
                        </div> : null}
                    </Grid>
                </Grid>
            </form>

        </>
    )
}
