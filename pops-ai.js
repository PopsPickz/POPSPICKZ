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
