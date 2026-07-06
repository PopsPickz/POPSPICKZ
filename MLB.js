// ===========================
// POPS Pickz MLB API
// ===========================

async function getTodaysGames() {
  const today = new Date().toISOString().split("T")[0];

 const url = ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher,venue ⁠;

  const res = await fetch(url);
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
    teams[team.team.name] = {
      ops: Number(team.stat.ops || 0),
      obp: Number(team.stat.obp || 0),
      slg: Number(team.stat.slg || 0),
      runs: Number(team.stat.runs || 0)
    };
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
    pitchers[player.player.fullName] = {
      era: player.stat.era || "N/A",
      whip: player.stat.whip || "N/A",
      homeRuns: Number(player.stat.homeRuns || 0),
      walks: Number(player.stat.baseOnBalls || player.stat.walks || 0),
      strikeouts: Number(player.stat.strikeOuts || player.stat.strikeouts || 0)
    };
  });

  return pitchers;
}

async function getHitterStats() {
  const res = await fetch(
    "https://statsapi.mlb.com/api/v1/stats?stats=season&group=hitting&playerPool=ALL&sportIds=1&limit=5000"
  );

  const data = await res.json();
  const hitters = {};

  (data.stats?.[0]?.splits || []).forEach(player => {
    hitters[player.player.fullName] = {
      name: player.player.fullName,
      team: player.team?.name || "Unknown",
      avg: player.stat.avg || "0",
      obp: player.stat.obp || "0",
      slg: player.stat.slg || "0",
      ops: player.stat.ops || "0",
      homeRuns: Number(player.stat.homeRuns || 0),
      hits: Number(player.stat.hits || 0),
      atBats: Number(player.stat.atBats || 0),
      rbi: Number(player.stat.rbi || 0)
    };
  });

  return hitters;
}
