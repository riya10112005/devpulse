export default function ProfileCard({ profile }) {
  return (
    <div className="card" style={{ display: "flex", gap: "1.5rem", alignItems: "center" }}>
      <img
        src={profile.avatar_url}
        alt="avatar"
        style={{ width: 90, height: 90, borderRadius: "50%", border: "3px solid #30363d" }}
      />
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: "1.4rem", color: "#e6edf3" }}>
          {profile.name || profile.login}
        </h2>
        <p style={{ color: "#58a6ff", margin: "0.2rem 0" }}>@{profile.login}</p>
        <p style={{ color: "#8b949e", fontSize: "0.9rem", margin: "0.3rem 0" }}>
          {profile.bio || "No bio provided"}
        </p>
        <div style={{ display: "flex", gap: "1.5rem", marginTop: "0.6rem", flexWrap: "wrap" }}>
          <span style={{ color: "#8b949e", fontSize: "0.85rem" }}>
            👥 <strong style={{ color: "#e6edf3" }}>{profile.followers}</strong> followers
          </span>
          <span style={{ color: "#8b949e", fontSize: "0.85rem" }}>
            👤 <strong style={{ color: "#e6edf3" }}>{profile.following}</strong> following
          </span>
          {profile.location && (
            <span style={{ color: "#8b949e", fontSize: "0.85rem" }}>
              📍 {profile.location}
            </span>
          )}
          <a
            href={profile.html_url}
            target="_blank"
            rel="noreferrer"
            style={{ color: "#3fb950", fontSize: "0.85rem", textDecoration: "none" }}
          >
            View on GitHub →
          </a>
        </div>
      </div>
    </div>
  );
}