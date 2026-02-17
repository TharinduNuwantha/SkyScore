import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div style={{
        backgroundColor: "var(--card-bg)",
        border: "1px solid var(--primary-dark)",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
      }}>
        <p style={{ color: "var(--text-primary)", fontWeight: "bold", marginBottom: "4px" }}>{label}</p>
        <p style={{ color: "var(--text-secondary)" }}>
          Temp: <span style={{ color: "var(--primary-dark)", fontWeight: "bold" }}>{payload[0].value}°C</span>
        </p>
      </div>
    );
  }
  return null;
};

const TemperatureLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return <p className="text-secondary text-center">No chart data available</p>;
  }

  return (
    <div style={{ width: "100%", height: 350 }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "var(--text-primary)" }}>
        Temperature Trend
      </h3>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--primary-color)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--primary-color)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--text-secondary)" opacity={0.2} />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--text-secondary)" }}
            axisLine={{ stroke: "var(--text-secondary)", opacity: 0.5 }}
          />
          <YAxis
            tick={{ fill: "var(--text-secondary)" }}
            axisLine={false}
            allowDecimals
          />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: "var(--text-secondary)", strokeDasharray: 3 }} />
          <Area
            type="monotone"
            dataKey="temperature"
            stroke="var(--primary-dark)"
            fillOpacity={1}
            fill="url(#tempGradient)"
            strokeWidth={3}
            dot={{ r: 4, strokeWidth: 2, fill: "var(--bg-color)" }}
            activeDot={{ r: 6 }}
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TemperatureLineChart;
