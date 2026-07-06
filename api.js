async function fetchMLBSchedule() {
  const today = new Date().toISOString().split("T")[0];

  const url = ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher,venue ⁠;

  const res = await fetch(url);
  const data = await res.json();

  return data.dates?.[0]?.games || [];
}

async function fetchTeamStats() {
  const url = "https://statsapi.mlb.com/api/v1/teams/stats?stats=season&group=hitting&sportIds=1";

  const res = await fetch(url);
  const data = await res.json();

  const teams = {};
  const splits = data.stats?.[0]?.splits || [];

  splits.forEach(item => {
    teams[item.team.name] = {
      runs: Number(item.stat.runs || 0),
      avg: Number(item.stat.avg || 0),
      obp: Number(item.stat.obp || 0),
      slg: Number(item.stat.slg || 0),
      ops: Number(item.stat.ops || 0)
    };
  });

  return teams;
}

async function fetchPitcherStats() {
  const url = "https://statsapi.mlb.com/api/v1/stats?stats=season&group=pitching&playerPool=ALL&sportIds=1&limit=5000";

  const res = await fetch(url);
  const data = await res.json();

  const pitchers = {};
  const splits = data.stats?.[0]?.splits || [];

  splits.forEach(item => {
    pitchers[item.player.fullName] = {
      era: item.stat.era || "N/A",
      whip: item.stat.whip || "N/A",
      innings: item.stat.inningsPitched || "0",
      strikeouts: Number(item.stat.strikeOuts || 0),
      walks: Number(item.stat.baseOnBalls || 0),
      homeRuns: Number(item.stat.homeRuns || 0)
    };
  });

  return pitchers;
}
