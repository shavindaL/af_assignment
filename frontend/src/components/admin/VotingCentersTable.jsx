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
import { Link } from "react-router-dom";

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
  // const [voterCenters, setVoterCenters] = useState([]);


  const [votingCenters, setVotingCenters] = useState([]);

  useEffect(() => {
    // Method to get data of voting centers
    const getData = async () => {

      const res = await fetch('http://localhost:5000/api/v1/voting-centers');
      const json = await res.json();

      if (res.ok) {
        //Set the state variable
        setVotingCenters(json)
      }
    }
    // Invoke getVotingCenterData method
    getData()
  }, [])
  return (
    // Start of VotingCenterTable component
    <>
      <center>
        <Link to={{ pathname: "../voting-center/new-account" }}>
          <Button
            variant="outlined"
            sx={{ color: "#1565c0" }}
            href="#"
            className="relative bottom-[10px]"
          >
            ADD
          </Button>
        </Link>
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
            {votingCenters &&
              votingCenters.map(voterCenter =>
                <StyledTableRow key={voterCenter._id}>
                  <StyledTableCell component="th" scope="row" align="left">
                    {/* <Avatar
                      align="center"
                      sx={{ position: "relative", left: "25px" }}
                    >
                      <img
                        src={voterCenter.logo}
                        alt="logo"
                        style={{
                          borderRadius: "50%",
                          height: "60px",
                          width: "60px",
                          alignItems: "center",
                        }}
                      />
                    </Avatar> */}
                    {voterCenter.votingCenterId}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {voterCenter.votingCenterLocation}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {voterCenter.votingCenterOfficialId}
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    {voterCenter.votingCenterOfficialName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {voterCenter.votingCenterContactNo}
                  </StyledTableCell>                 
                </StyledTableRow>
              )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
    // End of VotingCenterTable component
  );
}
