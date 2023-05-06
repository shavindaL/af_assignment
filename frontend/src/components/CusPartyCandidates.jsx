import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Avatar, Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";

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

export default function CusPartyCandidates() {
  // Array to hold candidate data
  const [rows, setRows] = useState([]);

  const ids = window.location.pathname.split("/")[2]

  // Use useEffect hook
  useEffect(() => {
    // Method to get data of election candidates
    async function getCandidateData() {
      try {
        const res = await fetch(`http://localhost:5000/api/v1/candidates/party/${ids}`);
        const data = await res.json()

        data.sort((a,b)=>(b.votingNumber[0].number)-(a.votingNumber[0].number));

        console.log(data);
        if (data) {
          //Set the state variable
          setRows(data);
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }

    // Invoke getCandidateData method
    getCandidateData();
  }, []);

  return (
    // Start of CandidateTable component
    <>

      <TableContainer component={Paper} >
        <Table aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              <StyledTableCell align="center">Province</StyledTableCell>
              <StyledTableCell align="center">Voting Number</StyledTableCell>
              <StyledTableCell align="center">Votes</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {/* <Avatar
                      align="center"
                      sx={{ position: "relative", left: "25px" }}
                    >
                      <img
                        src={row.logo}
                        alt="logo"
                        style={{
                          borderRadius: "50%",
                          height: "60px",
                          width: "60px",
                          alignItems: "center",
                        }}
                      />
                    </Avatar> */}
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.gender}</StyledTableCell>

                  <StyledTableCell align="center">
                    {row.province}
                  </StyledTableCell>
                   
                  <StyledTableCell align="center">
                    {row.votingNumber[0].number}
                  </StyledTableCell>

                  <StyledTableCell align="center">{10}</StyledTableCell> 
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    // End of CandidateTable component
  );
}
