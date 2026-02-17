import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--primary-color)",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
      }}>
        <p style={{ color: "var(--text-primary)", fontWeight: "bold", marginBottom: "4px" }}>{label}</p>
        <p style={{ color: "var(--text-secondary)" }}>
          Score: <span style={{ color: "var(--primary-color)", fontWeight: "bold" }}>{payload[0].value}</span>
        </p>
      </div>
    );
  }
  return null;
};

const ComfortChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 400 }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "var(--text-primary)" }}>
        Comfort Score Comparison
      </h3>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--text-secondary)" opacity={0.2} />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--text-secondary)" }}
            axisLine={{ stroke: "var(--text-secondary)", opacity: 0.5 }}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "var(--text-secondary)" }}
            axisLine={false}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "var(--primary-color)", opacity: 0.1 }} />
          <Bar dataKey="comfortScore" radius={[8, 8, 0, 0]} animationDuration={1500}>
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.comfortScore > 80 ? "var(--success)" : entry.comfortScore > 50 ? "var(--warning)" : "var(--danger)"}
                opacity={0.8}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ComfortChart;
