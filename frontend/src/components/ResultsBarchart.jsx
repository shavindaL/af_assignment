import React from "react";
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
    uv: 4,
    pv: 24,
    cd: 8,
    amt: 24
  },
  {
    name: "Page Central",
    uv: 3,
    pv: 13,
    amt: 22
  },
  {
    name: "Eastern",
    uv: 2,
    pv: 9,
    amt: 22
  },
  {
    name: "North Central",
    uv: 27,
    pv: 39,
    amt: 20
  },
  {
    name: "Northern",
    uv: 18,
    pv: 4,
    amt: 21
  },
  {
    name: "North West",
    uv: 2,
    pv: 3,
    amt: 2
  },
  {
    name: "Sabaragamuwa",
    uv: 3,
    pv: 4,
    amt: 21
  },
  {
    name: "Southern",
    uv: 3,
    pv: 4,
    amt: 21
  },
  {
    name: "Uva",
    uv: 3,
    pv: 4,
    amt: 21
  }
];

export default function ResultsBarchart() {
  return (
    <BarChart
      width={1300}
      height={300}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="pv" fill="#8884d8" />
      <Bar dataKey="uv" fill="#82ca9d" />
      <Bar dataKey="cd" fill="#82ca9s" />
    </BarChart>
  );
}
