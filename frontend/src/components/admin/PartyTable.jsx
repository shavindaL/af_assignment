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
import ConfirmDialog from "./ConfirmDialog";

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

export default function PartyTable() {
  // Array to hold political data
  const [rows, setRows] = useState([]);

  // Use useEffect hook
  useEffect(() => {
    // Method to get data of political parties
    async function getPoltPartyData() {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/political-parties"
        );
        const data = await res.json();

        if (data) {
          //Set the state variable
          setRows(data);
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }

    // Invoke getPoltPartyData method
    getPoltPartyData();
  }, []);

  return (
    // Start of PartyTable component
    <>
      <center>
        <Button variant="outlined" sx={{color: "#1565c0"}} href="/political-parties/new" className="relative bottom-[10px]">
          ADD
        </Button>
      </center>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 600 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Logo</StyledTableCell>
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Vote Results</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows &&
              rows.map((row) => (
                <StyledTableRow key={row._id}>
                  <StyledTableCell component="th" scope="row" align="left">
                    <Avatar
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
                    </Avatar>
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.partyID}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.name}</StyledTableCell>
                  <StyledTableCell align="center">
                    {row.vote_results}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <IconButton
                      size="medium"
                      sx={{ padding: "4px 4px 4px 4px" }}
                      href={`/political-parties/${row.partyID}`}
                    >
                      <EditIcon fontSize="inherit" sx={{ color: "#42a5f5" }} />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <ConfirmDialog partyID={row.partyID} />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    // End of PartyTable component
  );
}
