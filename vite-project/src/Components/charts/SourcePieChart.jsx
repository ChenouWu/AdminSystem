import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const data = [
  { name: "Direct", value: 400 },
  { name: "Search", value: 300 },
  { name: "Social", value: 200 },
  { name: "Referral", value: 150 },
];
const COLORS = ["#6366f1", "#22c55e", "#06b6d4", "#f59e0b"];

export default function SourcePieChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip />
        <Legend />
        <Pie data={data} dataKey="value" nameKey="name" outerRadius={90} innerRadius={50} paddingAngle={2}>
          {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
