import React from "react";
import { Box } from "@mui/system";
import { ResponsiveContainer } from "recharts";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Western",
    UNP: 4,
    JVP: 24,
    SLFP: 8,
    amt: 24
  },
  {
    name: "Central",
    UNP: 3,
    JVP: 13,
    SLFP: 2,
    amt: 22
  },
  {
    name: "Eastern",
    UNP: 2,
    JVP: 9,
    SLFP: 3,
    amt: 22
  },
  {
    name: "North Central",
    UNP: 27,
    JVP: 50,
    SLFP:5,
    amt: 20
  },
  {
    name: "Northern",
    UNP: 18,
    JVP: 4,
    SLFP:7,
    amt: 21
  },
  {
    name: "North West",
    UNP: 2,
    JVP: 3,
    SLFP:8,
    amt: 2
  },
  {
    name: "Sabaragamuwa",
    UNP: 3,
    JVP: 4,
    SLFP:8,
    amt: 21
  },
  {
    name: "Southern",
    UNP: 3,
    JVP: 23,
    SLFP: 7,
    amt: 21
  },
  {
    name: "Uva",
    UNP: 3,
    JVP: 40,
    SLFP: 7,
    amt: 21
  }
];

export default function ResultsBarchart() {
  return (
    <>
    <center>
    <h1 style={{fontSize:"32px" , marginTop:"90px"}}>2023 Election</h1>
    
        <BarChart
          width={1200}
          height={500}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="UNP" fill="green" />
      <Bar dataKey="JVP" fill="red" />
      <Bar dataKey="SLFP" fill="blue" />
        </BarChart>

        </center>

    <Box sx={{mx:10}}>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus qui totam voluptas dolorem, dolore rerum nemo similique quidem, repellat atque corporis eligendi cumque odit minima? Necessitatibus asperiores iste modi omnis.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam debitis totam dolorum expedita voluptatibus, inventore suscipit perspiciatis? Soluta sequi sunt, magnam nemo suscipit doloribus impedit. Asperiores perferendis vero placeat labore?</p>
    </Box>
    
    
    
    
    
    
    
    </>
  );
}
