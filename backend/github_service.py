import httpx
import os
from dotenv import load_dotenv

load_dotenv()

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
HEADERS = {"Authorization": f"token {GITHUB_TOKEN}"}
BASE = "https://api.github.com"


async def get_user_profile(username: str):
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{BASE}/users/{username}", headers=HEADERS)
        return r.json()


async def get_user_repos(username: str):
    async with httpx.AsyncClient() as client:
        r = await client.get(
            f"{BASE}/users/{username}/repos?per_page=100&sort=updated",
            headers=HEADERS
        )
        return r.json()


async def get_language_stats(username: str):
    repos = await get_user_repos(username)
    language_count = {}
    for repo in repos:
        if repo.get("language"):
            lang = repo["language"]
            language_count[lang] = language_count.get(lang, 0) + 1
    return language_count


async def get_contribution_stats(username: str):
    repos = await get_user_repos(username)
    total_stars = sum(r.get("stargazers_count", 0) for r in repos)
    total_forks = sum(r.get("forks_count", 0) for r in repos)
    top_repos = sorted(repos, key=lambda x: x.get("stargazers_count", 0), reverse=True)[:5]
    return {
        "total_stars": total_stars,
        "total_forks": total_forks,
        "total_repos": len(repos),
        "top_repos": [
            {
                "name": r["name"],
                "stars": r["stargazers_count"],
                "forks": r["forks_count"],
                "language": r.get("language", "N/A"),
                "url": r["html_url"],
                "description": r.get("description", "")
            }
            for r in top_repos
        ]
    }