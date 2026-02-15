import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const ComfortChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h2 style={{ textAlign: "center" }}>Comfort Score Comparison</h2>
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Bar dataKey="comfortScore" fill="#4caf50" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComfortChart;
