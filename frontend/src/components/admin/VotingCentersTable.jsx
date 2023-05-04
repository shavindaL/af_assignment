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

export default function VotingCenterTable() {
  // Array to hold voting center data
  const [rows, setRows] = useState([]);

  // Use useEffect hook
  useEffect(() => {
    // Method to get data of voting centers
    async function getVotingCenterData() {
      try {
        const res = await fetch("http://localhost:5000/api/v1/voting-centers");
        const data = await res.json();

        if (data) {
          //Set the state variable
          setRows(data.votingCenters);
          console.log(data.votingCenters);
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }

    // Invoke getVotingCenterData method
    getVotingCenterData();

  }, []);

  return (
    // Start of VotingCenterTable component
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
              <StyledTableCell align="center">ID</StyledTableCell>
              <StyledTableCell align="center">Location</StyledTableCell>
              <StyledTableCell align="center">Offical ID</StyledTableCell>
              <StyledTableCell align="center">Official Name</StyledTableCell>
              <StyledTableCell align="center">Official Phone</StyledTableCell>
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
                    {row.votingCenterId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.votingCenterLocation}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.voterCenterOfficialId}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {row.voterCenterOfficialName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {row.voterCenterContactNo}
                  </StyledTableCell>
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
    // End of VotingCenterTable component
  );
}
