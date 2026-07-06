function buildGameModel(g, teamStats, pitcherStats) {
  const away = g.teams.away.team.name;
  const home = g.teams.home.team.name;

  const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
  const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";

  return {
    away,
    home,
    awayPitcher,
    homePitcher,
    awayRun: runSupportScore(away, teamStats),
    homeRun: runSupportScore(home, teamStats),
    awayPitchScore: pitcherScore(awayPitcher, pitcherStats),
    homePitchScore: pitcherScore(homePitcher, pitcherStats),
    awayHRRisk: hrRiskScore(awayPitcher, pitcherStats),
    homeHRRisk: hrRiskScore(homePitcher, pitcherStats),
    moneyline: moneylineLean(away, home, awayPitcher, homePitcher, teamStats, pitcherStats),
    nrfiScore: nrfiScore(away, home, awayPitcher, homePitcher, teamStats, pitcherStats)
  };
}
function hitterHRScore(hitter, pitcherRisk) {
  if (!hitter) return 0;

  let score = 50;

  score += Number(hitter.ops || 0) * 25;
  score += Number(hitter.slg || 0) * 30;
  score += hitter.homeRuns * 1.2;
  score += pitcherRisk * 0.25;

  return Math.max(0, Math.min(99, Math.round(score)));
}

function hitterHitScore(hitter) {
  if (!hitter) return 0;

  let score = 50;

  score += Number(hitter.avg || 0) * 60;
  score += Number(hitter.obp || 0) * 35;
  score += Number(hitter.ops || 0) * 20;

  if (hitter.hits >= 100) score += 8;
  if (hitter.hits >= 130) score += 5;

  return Math.max(0, Math.min(99, Math.round(score)));
}
