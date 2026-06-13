import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#58a6ff","#3fb950","#f1c40f","#ff7b72","#d2a8ff","#79c0ff","#56d364","#ffa657"];

export default function LanguageChart({ languages }) {
  if (!languages || Object.keys(languages).length === 0) return null;
  const data = Object.entries(languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 8)
    .map(([name, value]) => ({ name, value }));
  return (
    <div className="card">
      <h3 style={{ color: "#e6edf3", marginBottom: "1rem", fontSize: "1rem" }}>🧑‍💻 Languages Used</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius={75} dataKey="value">
            {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
          </Pie>
          <Tooltip contentStyle={{ background: "#161b22", border: "1px solid #30363d", borderRadius: 8 }} />
          <Legend formatter={(value) => <span style={{ color: "#8b949e", fontSize: "0.8rem" }}>{value}</span>} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}