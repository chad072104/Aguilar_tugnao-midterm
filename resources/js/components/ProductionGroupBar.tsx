import {
  BarChart, Bar, XAxis, YAxis,
  Tooltip, ResponsiveContainer, CartesianGrid, Legend
} from "recharts";

const data = [
  { month: "Jan", planned: 500, actual: 480 },
  { month: "Feb", planned: 520, actual: 500 },
  { month: "Mar", planned: 550, actual: 530 },
  { month: "Apr", planned: 600, actual: 590 },
  { month: "May", planned: 650, actual: 640 },
  { month: "Jun", planned: 700, actual: 680 },
  { month: "Jul", planned: 720, actual: 710 },
  { month: "Aug", planned: 750, actual: 740 },
  { month: "Sep", planned: 780, actual: 760 },
  { month: "Oct", planned: 800, actual: 790 },
  { month: "Nov", planned: 820, actual: 810 },
  { month: "Dec", planned: 850, actual: 830 },
];

export default function ProductionGroupBar() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="planned" fill="#FFC107" />
        <Bar dataKey="actual" fill="#4CAF50" />
      </BarChart>
    </ResponsiveContainer>
  );
}