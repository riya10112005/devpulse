import { useState } from "react";
import axios from "axios";
import ProfileCard from "./components/ProfileCard";
import StatsGrid from "./components/StatsGrid";
import LanguageChart from "./components/LanguageChart";
import TopRepos from "./components/TopRepos";
import "./index.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000";

export default function App() {
  const [username, setUsername] = useState("");
  const [profile, setProfile] = useState(null);
  const [stats, setStats] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const search = async () => {
    if (!username.trim()) return;
    setLoading(true);
    setError("");
    setProfile(null);
    setStats(null);
    setLanguages(null);
    try {
      const [p, s, l] = await Promise.all([
        axios.get(`${API}/user/${username}`),
        axios.get(`${API}/user/${username}/stats`),
        axios.get(`${API}/user/${username}/languages`),
      ]);
      setProfile(p.data);
      setStats(s.data);
      setLanguages(l.data);
    } catch {
      setError("User not found. Check the username and try again.");
    }
    setLoading(false);
  };

  return (
    <div className="app">
      <header className="hero">
        <h1 className="logo">⚡ DevPulse</h1>
        <p className="tagline">GitHub Analytics Dashboard</p>
        <div className="search-bar">
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="Enter any GitHub username..."
            className="search-input"
          />
          <button onClick={search} className="search-btn" disabled={loading}>
            {loading ? "Loading..." : "Analyze →"}
          </button>
        </div>
        {error && <p className="error">{error}</p>}
      </header>

      {profile && (
        <main className="dashboard">
          <ProfileCard profile={profile} />
          <StatsGrid stats={stats} />
          <div className="bottom-grid">
            <LanguageChart languages={languages} />
            <TopRepos repos={stats?.top_repos} />
          </div>
        </main>
      )}

      {!profile && !loading && (
        <div className="empty-state">
          <p>🔍 Search any GitHub username above to see their analytics</p>
        </div>
      )}
    </div>
  );
}