// ===========================
// POPS Pickz MLB API
// ===========================

async function getTodaysGames() {
  const today = new Date().toISOString().split("T")[0];

  const res = await fetch(
    ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher,venue ⁠
  );

  const data = await res.json();

  return data.dates?.[0]?.games || [];
}

async function getTeamStats() {
  const res = await fetch(
    "https://statsapi.mlb.com/api/v1/teams/stats?stats=season&group=hitting&sportIds=1"
  );

  const data = await res.json();

  const teams = {};

  (data.stats?.[0]?.splits || []).forEach(team => {
    teams[team.team.name] = team.stat;
  });

  return teams;
}

async function getPitcherStats() {
  const res = await fetch(
    "https://statsapi.mlb.com/api/v1/stats?stats=season&group=pitching&playerPool=ALL&sportIds=1&limit=5000"
  );

  const data = await res.json();

  const pitchers = {};

  (data.stats?.[0]?.splits || []).forEach(player => {
    pitchers[player.player.fullName] = player.stat;
  });

  return pitchers;
}
