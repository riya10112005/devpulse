export default function TopRepos({ repos }) {
  if (!repos || repos.length === 0) return null;
  return (
    <div className="card">
      <h3 style={{ color: "#e6edf3", marginBottom: "1rem", fontSize: "1rem" }}>🏆 Top Repositories</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
        {repos.map((repo) => (
          <a key={repo.name} href={repo.url} target="_blank" rel="noreferrer"
            style={{ display: "block", padding: "0.75rem", background: "#0d1117", borderRadius: "8px", border: "1px solid #30363d", textDecoration: "none" }}>
            <div style={{ color: "#58a6ff", fontWeight: "600", fontSize: "0.9rem" }}>{repo.name}</div>
            {repo.description && (
              <div style={{ color: "#8b949e", fontSize: "0.78rem", marginTop: "0.2rem" }}>{repo.description}</div>
            )}
            <div style={{ color: "#8b949e", fontSize: "0.78rem", marginTop: "0.3rem" }}>
              ⭐ {repo.stars} &nbsp;🍴 {repo.forks}
              {repo.language && <span style={{ marginLeft: "0.5rem", background: "#21262d", padding: "0.1rem 0.4rem", borderRadius: "4px", color: "#79c0ff" }}>{repo.language}</span>}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}