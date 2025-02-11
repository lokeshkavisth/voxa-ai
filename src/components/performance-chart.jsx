"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Mock data (replace with real data fetching in a production app)
const performanceData = [
  { date: "2023-05-01", score: 75 },
  { date: "2023-05-08", score: 80 },
  { date: "2023-05-15", score: 78 },
  { date: "2023-05-22", score: 85 },
  { date: "2023-05-29", score: 82 },
];

export default function PerformanceChart({ className }) {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Performance Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={performanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="score" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
