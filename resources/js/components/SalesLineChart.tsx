import {
  LineChart, Line, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

const data = [
  // 2024
  { month: "Jan 2024", sales: 4000 },
  { month: "Feb 2024", sales: 4200 },
  { month: "Mar 2024", sales: 4600 },
  { month: "Apr 2024", sales: 4800 },
  { month: "May 2024", sales: 5300 },
  { month: "Jun 2024", sales: 6000 },
  { month: "Jul 2024", sales: 5800 },
  { month: "Aug 2024", sales: 6200 },
  { month: "Sep 2024", sales: 6400 },
  { month: "Oct 2024", sales: 7000 },
  { month: "Nov 2024", sales: 7500 },
  { month: "Dec 2024", sales: 8000 },

  // 2025
  { month: "Jan 2025", sales: 8200 },
  { month: "Feb 2025", sales: 8600 },
  { month: "Mar 2025", sales: 9000 },
  { month: "Apr 2025", sales: 9400 },
  { month: "May 2025", sales: 9800 },
  { month: "Jun 2025", sales: 10200 },
];

export default function SalesLineChart() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="sales" stroke="#2196F3" />
      </LineChart>
    </ResponsiveContainer>
  );
}