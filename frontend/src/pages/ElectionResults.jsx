import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const Wrapper = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
   paddingTop: "2rem",
  backgroundColor: "#1d4ed8",
});

const ElectionTitle = styled(Typography)({
  fontSize: "2.5rem",
  fontWeight: "bold",
  color: "#fff",
  marginBottom: "1.5rem",
  textAlign: "center",
});

const ElectionDetails = styled(Box)({
  width: "100%",
  maxWidth: "1000px",
  padding: "1.5rem",
  backgroundColor: "#fff",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "0.5rem",
  marginBottom: "1.5rem",
});

const CandidateName = styled(Typography)({
  fontSize: "1.75rem",
  fontWeight: "bold",
  color: "#2c3e50",
  marginBottom: "1.25rem",
});

const ElectionStats = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  "@media (min-width: 768px)": {
    flexDirection: "row",
  },
});

const StatContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginBottom: "1.5rem",
  "@media (min-width: 768px)": {
    marginBottom: 0,
    marginRight: "2.5rem",
  },
});

const StatLabel = styled(Typography)({
  fontSize: "1.25rem",
  fontWeight: "bold",
  color: "#2c3e50",
});

const StatValue = styled(Typography)({
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#27ae60",
});

const ElectionBreakdown = styled(Box)({
  width: "100%",
  maxWidth: "1000px",
  padding: "1.5rem",
  backgroundColor: "#fff",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: "0.5rem",
});

const BreakdownTitle = styled(Typography)({
  fontSize: "1.75rem",
  fontWeight: "bold",
  color: "#2c3e50",
  marginBottom: "1.5rem",
});

const PartyTableContainer = styled(TableContainer)({
  marginTop: "1.5rem",
  borderRadius: "0.5rem",
  overflow: "hidden",
  backgroundColor: "#fff",
  boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.2)",
});

const PartyTable = styled(Table)({
  minWidth: "auto",
});

const PartyTableHead = styled(TableHead)({
  backgroundColor: "#e6e6e6",
});

const PartyTableRow = styled(TableRow)({
    "&:nth-of-type(odd)": {
      backgroundColor: "#e6f7ff",
    },
});

const PartyTableCell = styled(TableCell)({
    backgroundColor: "#e6e6e6",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#4B5563",
});

export default function ElectionResults() {
    return (
    <Wrapper>
    <ElectionTitle>Individual Election Results</ElectionTitle>
    <ElectionDetails>
    <CandidateName>John Doe</CandidateName>

    <ElectionStats>
      <StatContainer>
        <StatLabel>Total Votes</StatLabel>
        <StatValue>245,678</StatValue>
      </StatContainer>

      <StatContainer>
        <StatLabel>Votes Percentage</StatLabel>
        <StatValue>56.3%</StatValue>
      </StatContainer>

      <StatContainer>
        <StatLabel>Winner</StatLabel>
        <StatValue>Yes</StatValue>
      </StatContainer>
    </ElectionStats>
  </ElectionDetails>

  <ElectionBreakdown>
    <BreakdownTitle>Party Results</BreakdownTitle>

    <PartyTableContainer>
      <PartyTable>
        <PartyTableHead>
          <PartyTableRow>
            <PartyTableCell style={{backgroundColor:"orange"}}>Party</PartyTableCell>
            <PartyTableCell style={{backgroundColor:"orange"}}>Votes</PartyTableCell>
            <PartyTableCell style={{backgroundColor:"orange"}}>Percentage</PartyTableCell>
          </PartyTableRow>
        </PartyTableHead>

        <TableBody>
          <PartyTableRow>
            <PartyTableCell>Party 1</PartyTableCell>
            <PartyTableCell>57,829</PartyTableCell>
            <PartyTableCell>23.5%</PartyTableCell>
          </PartyTableRow>

          <PartyTableRow>
            <PartyTableCell style={{backgroundColor:"white"}}>Party 2</PartyTableCell>
            <PartyTableCell style={{backgroundColor:"white"}}>65,178</PartyTableCell>
            <PartyTableCell style={{backgroundColor:"white"}}>26.5%</PartyTableCell>
          </PartyTableRow>

          <PartyTableRow>
            <PartyTableCell>Party 3</PartyTableCell>
            <PartyTableCell>46,520</PartyTableCell>
            <PartyTableCell>18.9%</PartyTableCell>
          </PartyTableRow>

          <PartyTableRow>
            <PartyTableCell style={{backgroundColor:"white"}}>Party 4</PartyTableCell>
            <PartyTableCell style={{backgroundColor:"white"}}>38,670</PartyTableCell>
            <PartyTableCell style={{backgroundColor:"white"}}>15.7%</PartyTableCell>
          </PartyTableRow>

          <PartyTableRow>
            <PartyTableCell>Party 5</PartyTableCell>
            <PartyTableCell>37,481</PartyTableCell>
            <PartyTableCell>15.2%</PartyTableCell>
          </PartyTableRow>
        </TableBody>
      </PartyTable>
    </PartyTableContainer>
  </ElectionBreakdown>
</Wrapper>

);
}