// ===========================
// POPS Pickz MLB API — Test Safe Version
// ===========================

async function getTodaysGames() {
  const today = new Date().toISOString().split("T")[0];

  const url = ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher,venue ⁠;

  const res = await fetch(url);
  const data = await res.json();

  return data.dates?.[0]?.games || [];
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
