import React from "react";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function CusPoliticalPartiesPage() {
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

  const viewParty = () => {
    
    window.location("http://localhost:3000/admin-dashboard")
  };

  return (
    <>
      <Navbar />
      <Box sx={{ flexGrow: 1, mx: 10, mt: 20 }}>
        <Grid container spacing={3}>
          {rows &&
            rows.map((row) => (
              <Grid item xs={4} key={row._id}>
                <Item>
                  <div style={{ marginBottom: "10px" }}>
                    <img
                      src={row.logo}
                      alt="logo"
                      style={{
                        borderRadius: "50%",
                        height: "60px",
                        width: "60px",

                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                      }}
                    />
                  </div>

                  <h1>{row.name}</h1>
                  <p>Leader Name : {row.leader_name}</p>
                  <p>Competitor Count : {row.competitor_count}</p>
                  <a href={'/political_parties/' + row.partyID}>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={viewParty}
                  >
                    view
                  </Button>
                  </a>
                </Item>
              </Grid>
            ))}
        </Grid>
      </Box>
    </>
  );
}
