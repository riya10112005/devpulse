const StatCard = ({ label, value, color, icon }) => (
  <div className="card" style={{ textAlign: "center", padding: "1.5rem 1rem" }}>
    <div style={{ fontSize: "1.6rem", marginBottom: "0.3rem" }}>{icon}</div>
    <div style={{ fontSize: "2rem", fontWeight: "800", color }}>{value}</div>
    <div style={{ color: "#8b949e", fontSize: "0.85rem", marginTop: "0.3rem" }}>{label}</div>
  </div>
);

export default function StatsGrid({ stats }) {
  if (!stats) return null;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem", marginTop: "1.5rem" }}>
      <StatCard label="Public Repos" value={stats.total_repos} color="#58a6ff" icon="📁" />
      <StatCard label="Total Stars" value={stats.total_stars} color="#f1c40f" icon="⭐" />
      <StatCard label="Total Forks" value={stats.total_forks} color="#3fb950" icon="🍴" />
    </div>
  );
}