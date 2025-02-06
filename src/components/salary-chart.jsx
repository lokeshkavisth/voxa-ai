"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function SalaryChart({ salaryRanges }) {
  const chartData = salaryRanges.map((range) => ({
    name: range.role.split(" ").slice(0, 2).join(" "),
    Min: range.min,
    Median: range.median,
    Max: range.max,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="Min" fill="#8884d8" stackId="a" />
        <Bar dataKey="Median" fill="#82ca9d" stackId="a" />
        <Bar dataKey="Max" fill="#ffc658" stackId="a" />
      </BarChart>
    </ResponsiveContainer>
  );
}
