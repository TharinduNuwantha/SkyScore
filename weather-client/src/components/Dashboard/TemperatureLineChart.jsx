import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const TemperatureLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p>No chart data available</p>;
  }

  return (
    <div style={{ width: "100%", height: 350 }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
        Temperature Trend
      </h2>

      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#007bff"
            strokeWidth={3}
            dot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureLineChart;
