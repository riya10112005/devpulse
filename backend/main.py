from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from github_service import get_user_profile, get_language_stats, get_contribution_stats

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {"status": "DevPulse API is running"}


@app.get("/user/{username}")
async def user_profile(username: str):
    data = await get_user_profile(username)
    if "message" in data:
        raise HTTPException(status_code=404, detail="User not found")
    return data


@app.get("/user/{username}/languages")
async def languages(username: str):
    return await get_language_stats(username)


@app.get("/user/{username}/stats")
async def stats(username: str):
    return await get_contribution_stats(username)