"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "./ui/chart";

export default function SalaryChart({ salaryRanges }) {
  const chartData = salaryRanges.map((range) => ({
    name: range.role,
    Min: range.min,
    Median: range.median,
    Max: range.max,
  }));

  const chartConfig = {
    Min: {
      label: "Minimum",
      color: "hsl(var(--chart-1))",
    },
    Median: {
      label: "Median",
      color: "hsl(var(--chart-2))",
    },
    Max: {
      label: "Maximum",
      color: "hsl(var(--chart-3))",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="w-full h-[420px]">
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey={"name"}
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="Min" fill="var(--color-Min)" radius={4} />
        <Bar dataKey="Median" fill="var(--color-Median)" radius={4} />
        <Bar dataKey="Max" fill="var(--color-Max)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
