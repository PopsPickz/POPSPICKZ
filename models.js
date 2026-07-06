function runSupportScore(teamName, teamStats) {
  const s = teamStats[teamName];
  if (!s) return 70;

  let score = 50;
  score += s.ops * 40;
  score += s.obp * 30;
  score += s.slg * 25;

  if (s.runs > 500) score += 8;
  if (s.runs > 600) score += 5;

  return Math.max(50, Math.min(98, Math.round(score)));
}

function pitcherScore(pitcherName, pitcherStats) {
  const p = pitcherStats[pitcherName];
  if (!p || p.era === "N/A") return 50;

  let score = 75;

  const era = Number(p.era);
  const whip = Number(p.whip);

  if (era <= 3.00) score += 12;
  else if (era <= 4.00) score += 6;
  else if (era >= 5.00) score -= 12;

  if (whip <= 1.15) score += 8;
  else if (whip >= 1.40) score -= 8;

  if (p.homeRuns >= 20) score -= 6;
  if (p.walks > p.strikeouts * 0.4) score -= 5;

  return Math.max(40, Math.min(98, Math.round(score)));
}

function hrRiskScore(pitcherName, pitcherStats) {
  const p = pitcherStats[pitcherName];
  if (!p || p.era === "N/A") return 50;

  let score = 50;

  const era = Number(p.era);
  const whip = Number(p.whip);

  score += p.homeRuns * 1.5;

  if (era >= 5.00) score += 15;
  else if (era >= 4.25) score += 8;

  if (whip >= 1.40) score += 10;
  else if (whip >= 1.30) score += 5;

  if (p.walks > p.strikeouts * 0.4) score += 6;

  return Math.max(40, Math.min(99, Math.round(score)));
}

function moneylineLean(away, home, awayPitcher, homePitcher, teamStats, pitcherStats) {
  const awayTotal =
    runSupportScore(away, teamStats) +
    pitcherScore(awayPitcher, pitcherStats);

  const homeTotal =
    runSupportScore(home, teamStats) +
    pitcherScore(homePitcher, pitcherStats) +
    3;

  return homeTotal >= awayTotal ? home : away;
}

function nrfiScore(away, home, awayPitcher, homePitcher, teamStats, pitcherStats) {
  let score = 50;

  score += (pitcherScore(awayPitcher, pitcherStats) + pitcherScore(homePitcher, pitcherStats)) / 4;
  score -= (hrRiskScore(awayPitcher, pitcherStats) + hrRiskScore(homePitcher, pitcherStats)) / 6;
  score -= (runSupportScore(away, teamStats) + runSupportScore(home, teamStats)) / 10;

  return Math.max(30, Math.min(95, Math.round(score)));
}

function nrfiPick(score) {
  if (score >= 80) return "🟢 Elite NRFI";
  if (score >= 65) return "🟡 NRFI Lean";
  return "🔴 YRFI Alert";
}
function targetGrade(score) {
  if (score >= 90) return "🔥🔥🔥🔥🔥";
  if (score >= 80) return "🔥🔥🔥🔥";
  if (score >= 70) return "🔥🔥🔥";
  if (score >= 60) return "🔥🔥";
  return "🔥";
}
// =====================================
// POPS Pickz 6.0 — Model Builder
// =====================================

function clampScore(value) {
  const num = Number(value) || 0;
  return Math.max(0, Math.min(100, num));
}

function buildMoneylineModel(game = {}) {
  return {
    startingPitcher: clampScore(game.startingPitcherScore || game.pitcherScore || 75),
    bullpen: clampScore(game.bullpenScore || 75),
    offense: clampScore(game.offenseScore || game.teamOffenseScore || 75),
    recentForm: clampScore(game.recentFormScore || game.formScore || 75),
    vegas: clampScore(game.vegasScore || game.marketScore || 75),
    injuries: clampScore(game.injuryScore || 75),
    travel: clampScore(game.travelScore || game.restScore || 75)
  };
}

function buildHRModel(player = {}) {
  return {
    pitcherHRRisk: clampScore(player.pitcherHRRisk || 75),
    batterPower: clampScore(player.batterPower || player.powerScore || 75),
    batterForm: clampScore(player.batterForm || player.formScore || 75),
    park: clampScore(player.parkScore || 75),
    weather: clampScore(player.weatherScore || 75),
    handedness: clampScore(player.handednessScore || player.splitScore || 75)
  };
}

function buildHitModel(player = {}) {
  return {
    contact: clampScore(player.contactScore || 75),
    recentForm: clampScore(player.recentFormScore || player.formScore || 75),
    matchup: clampScore(player.matchupScore || 75),
    pitcherContactAllowed: clampScore(player.pitcherContactAllowed || 75),
    lineupSpot: clampScore(player.lineupSpotScore || 75),
    park: clampScore(player.parkScore || 75),
    weather: clampScore(player.weatherScore || 75)
  };
}

function buildNRFIModel(game = {}) {
  return {
    startingPitchers: clampScore(game.startingPitchersScore || game.pitcherScore || 75),
    firstInningHistory: clampScore(game.firstInningScore || game.nrfiHistoryScore || 75),
    offenseSlowStart: clampScore(game.offenseSlowStartScore || 75),
    bullpenBackup: clampScore(game.bullpenBackupScore || game.bullpenScore || 75),
    weather: clampScore(game.weatherScore || 75),
    vegasTotal: clampScore(game.vegasTotalScore || game.totalScore || 75)
  };
}
