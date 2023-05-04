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

export default function VotersTable() {
  // Array to hold voter data
  const [rows, setRows] = useState([]);

  // Use useEffect hook
  useEffect(() => {
    // Method to get data of voters
    async function getVoterData() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/voters/voters");
        const data = await res.json();

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

    // Invoke getVoterData method
    getVoterData();
  }, []);

  return (
    // Start of VotersTable component
    <>
      <center>
        <Button
          variant="outlined"
          sx={{ color: "#1565c0" }}
          href="#"
          className="relative bottom-[10px]"
        >
          ADD
        </Button>
      </center>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">NIC</StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Phone</StyledTableCell>
              <StyledTableCell align="center">Gender</StyledTableCell>
              {/* <StyledTableCell align="center">Votes</StyledTableCell> */}
              <StyledTableCell align="center"></StyledTableCell>
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
                    {row.voterNIC}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.voterName}</StyledTableCell>

                  <StyledTableCell align="center">
                    {row.voterContactNo}
                  </StyledTableCell>
                   
                  <StyledTableCell align="center">
                    {row.gender}
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">{10}</StyledTableCell>  */}
                  <StyledTableCell align="center">
                    <IconButton
                      size="medium"
                      sx={{ padding: "4px 4px 4px 4px" }}
                    >
                      <EditIcon fontSize="inherit" sx={{ color: "#42a5f5" }} />
                    </IconButton>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <ConfirmDialog partyID={row.partyID} /> */}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    // End of VotersTable component
  );
}
