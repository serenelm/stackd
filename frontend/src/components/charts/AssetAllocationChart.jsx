import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip
} from "recharts";

const COLORS = [
  "#4ade80", // cash
  "#38bdf8", // stocks
  "#a855f7", // crypto
  "#fb7185", // private
  "#e5e7eb"
];

function toChartData(allocation) {
  if (!allocation) return [];
  return Object.entries(allocation)
    .filter(([, weight]) => weight > 0.001)
    .map(([key, weight]) => ({
      name: key,
      value: Math.round(weight * 1000) / 10 // e.g. 24.3%
    }));
}

function AssetAllocationChart({ allocation, loading }) {
  const data = toChartData(allocation);

  if (loading) {
    return <div className="stackd-chart-placeholder">loading your stack…</div>;
  }

  if (!data.length) {
    return (
      <div className="stackd-chart-placeholder">
        no allocation data available yet.
      </div>
    );
  }

  return (
    <div className="stackd-chart">
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            innerRadius={70}
            outerRadius={100}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={COLORS[index % COLORS.length]}
                stroke="transparent"
              />
            ))}
          </Pie>
          <Tooltip
            formatter={(value) => [`${value.toFixed(1)}%`, "allocation"]}
          />
          <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={8}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AssetAllocationChart;