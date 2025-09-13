import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { d: "Mon", v: 1200 },
  { d: "Tue", v: 2100 },
  { d: "Wed", v: 1800 },
  { d: "Thu", v: 2600 },
  { d: "Fri", v: 2400 },
  { d: "Sat", v: 3000 },
  { d: "Sun", v: 2800 },
];

export default function RevenueLineChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data} margin={{ left: 8, right: 8, top: 8, bottom: 8 }}>
        <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
        <XAxis dataKey="d" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="v" stroke="#6366f1" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
