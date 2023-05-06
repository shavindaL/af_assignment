import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
import CusPartyCandidates from "../components/CusPartyCandidates";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CusPoliticalParty() {
  // Array to hold political data
  const [rows, setRows] = useState([]);

  const ids = window.location.pathname.split("/")[2];

  // Use useEffect hook
  useEffect(() => {
    // Method to get data of political parties
    async function getPoltPartyData() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/political-parties/${ids}`
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

    getPoltPartyData();
  }, []);

  return (
    <>
      <Navbar />

      <Box sx={{ backgroundColor: "", mx: 10, my: 10 }}>
        <Grid>
          <Grid>
            <Item>
              <div>
                <img
                  src={rows.logo}
                  alt="logo"
                  style={{
                    borderRadius: "50%",
                    height: "100px",
                    width: "100px",

                    display: "block",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></img>
                <h1 style={{ fontSize: "32px" }}>
                  Political Party Name: {rows.name}
                </h1>
                <h2 style={{ fontSize: "18px" }}>Candidates :{rows.competitor_count}</h2>
                <h3 style={{ fontSize: "18px" }}>Vote Count : {rows.vote_results}</h3>
              </div>
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mx: 20 }}>
        <CusPartyCandidates></CusPartyCandidates>
      </Box>
    </>
  );
}
