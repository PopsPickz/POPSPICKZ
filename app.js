const today = new Date().toISOString().split("T")[0];

const scheduleURL = ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher,team ⁠;
