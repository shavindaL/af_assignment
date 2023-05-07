import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";
import { Alert, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auto } from "@popperjs/core";
import { useVotingCenterAuthContext } from "../../hooks/useVotingCenterAuthContext";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#1565c0",
        color: theme.palette.common.white,
        fontFamily: "Roboto",
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: "Roboto",
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

export default function VotingCandidateTable() {

    const [votes, setVotes] = useState([])
    const [candidates, setCandidates] = useState();
    const [errorAlert, setErrorAlert] = useState(false)
    const [successAlert, setSuccessAlert] = useState(false)

    const { location } = useVotingCenterAuthContext();


    useEffect(() => {
        // Method to get data of election candidates
        async function getCandidateData() {
            try {
                const res = await fetch("http://localhost:5000/api/v1/candidates");
                const data = await res.json()

                // data.sort((a, b) => (b.votingNumber[0].number) - (a.votingNumber[0].number));

                if (data) {
                    //Set the state variable
                    setCandidates(data);
                }
            } catch (err) {
                // Print error message
                console.log(err.message);
            }
        }
        getCandidateData()
    }, [])

    const handleVote = (newVote) => {

        if (votes.includes(newVote)) {
            setErrorAlert(false)
            // If it is, remove it from the array of selected items
            setVotes(votes.filter(vote => vote.name !== newVote.name));
        } else {
            // If it's not, add it to the array of selected items
            if (votes.length < 3) {
                setErrorAlert(false)
                setVotes([...votes, newVote]);
            }
            else {
                setErrorAlert(true)
            }
        }
    }

    const processVote = async () => {
        const res = await fetch('http://localhost:5000/api/v1/vote', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ votes, location })
        });

        if (res.ok) {
            setSuccessAlert(true)
            setTimeout(() => {
                localStorage.removeItem('validate')
                window.location.replace("http://localhost:3000/voting-center/validate")
            }
                , 5000);
        }
    }

    return (
        <>
            <div className="mt-20">
                <div className="w-fit mx-auto">{successAlert ? <Alert severity="success">Vote recorded successfully.</Alert> : null}</div>
                <div className="w-fit mx-auto">{errorAlert ? <Alert severity="error">Maximum vote count reached.</Alert> : null}</div>
                <div className="mx-10 my-12">
                    <Button
                        onClick={processVote}
                        sx={{
                            width: 300,
                            height: 80,
                            fontSize: 20,
                            fontWeight: 900,
                            borderRadius: 3
                        }}
                        variant="contained"
                        size="large"
                        type="button">Submit Vote</Button>
                </div>
                <TableContainer
                    component={Paper}
                    sx={{
                        width: 1200,
                        marginX: auto,
                        fontSize: 20
                    }}>
                    <Table aria-label="customized table" sx={{
                        fontSize: 20
                    }}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align="center">Candidate Name</StyledTableCell>
                                <StyledTableCell align="center">Party</StyledTableCell>
                                <StyledTableCell align="center">Voting Number</StyledTableCell>
                                <StyledTableCell align="center"></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {candidates &&
                                candidates.map((candidate) => (
                                    <StyledTableRow key={candidate._id}>
                                        <StyledTableCell align="center">{candidate.name}</StyledTableCell>

                                        <StyledTableCell align="center">
                                            {candidate.politicalPartyId}
                                        </StyledTableCell>

                                        <StyledTableCell align="center">
                                            {candidate.votingNumber[0].number}
                                        </StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button
                                                variant={votes.includes(candidate) ? "outlined" : "contained"}
                                                type="button"
                                                onClick={() => { handleVote(candidate) }
                                                }>Vote</Button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}