async function getTodaysGames() {
  const today = new Date().toISOString().split("T")[0];
  const url = ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher,venue ⁠;

  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.dates?.[0]?.games || [];
  } catch (err) {
    console.error("MLB schedule error:", err);
    return [];
  }
}

async function getTeamStats() {
  return {};
}

async function getPitcherStats() {
  return {};
}

async function getHitterStats() {
  return {};
}
