// ===============================
// POPS Pickz 6.0 — models.js
// Core MLB scoring models
// ===============================

// ---------- Utility ----------

function clampScore(value, fallback = 75) {
  const num = Number(value);

  if (Number.isNaN(num)) return fallback;

  return Math.max(0, Math.min(100, Math.round(num)));
}

// ---------- Team Run Support ----------

function runSupportScore(teamName, teamStats) {
  const s = teamStats[teamName];
  if (!s) return 70;

  let score = 50;

  score += Number(s.ops || 0) * 40;
  score += Number(s.obp || 0) * 30;
  score += Number(s.slg || 0) * 25;

  if (s.runs > 500) score += 8;
  if (s.runs > 600) score += 5;

  return clampScore(score, 70);
}

// ---------- Pitcher Strength ----------

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

// ---------- Pitcher HR Risk ----------

function hrRiskScore(pitcherName, pitcherStats) {
  const p = pitcherStats[pitcherName];
  if (!p || p.era === "N/A") return 50;

  let score = 50;

  const era = Number(p.era);
  const whip = Number(p.whip);

  score += Number(p.homeRuns || 0) * 1.5;

  if (era >= 5.00) score += 15;
  else if (era >= 4.25) score += 8;

  if (whip >= 1.40) score += 10;
  else if (whip >= 1.30) score += 5;

  if (p.walks > p.strikeouts * 0.4) score += 6;

  return Math.max(40, Math.min(99, Math.round(score)));
}

// ---------- Moneyline Lean ----------

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

// ---------- NRFI Score ----------

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

// ---------- Display Grades ----------

function targetGrade(score) {
  if (score >= 95) return "🔥🔥🔥🔥🔥 Elite";
  if (score >= 90) return "🔥🔥🔥🔥 Excellent";
  if (score >= 85) return "🔥🔥🔥 Very Strong";
  if (score >= 80) return "🔥🔥 Strong";
  return "Do Not Show";
}

// ---------- Main Game Model ----------

function buildGameModel(game, teamStats, pitcherStats) {
  const away = game.teams.away.team.name;
  const home = game.teams.home.team.name;

  const awayPitcher = game.teams.away.probablePitcher?.fullName || "TBD";
  const homePitcher = game.teams.home.probablePitcher?.fullName || "TBD";

  const awayRun = runSupportScore(away, teamStats);
  const homeRun = runSupportScore(home, teamStats);

  const awayPitchScore = pitcherScore(awayPitcher, pitcherStats);
  const homePitchScore = pitcherScore(homePitcher, pitcherStats);

  const awayHRRisk = hrRiskScore(awayPitcher, pitcherStats);
  const homeHRRisk = hrRiskScore(homePitcher, pitcherStats);

  const moneyline = moneylineLean(
    away,
    home,
    awayPitcher,
    homePitcher,
    teamStats,
    pitcherStats
  );

  const nrfi = nrfiScore(
    away,
    home,
    awayPitcher,
    homePitcher,
    teamStats,
    pitcherStats
  );

  const chosenPitcherScore =
    moneyline === home ? homePitchScore : awayPitchScore;

  const chosenOffenseScore =
    moneyline === home ? homeRun : awayRun;

  const opponentOffenseScore =
    moneyline === home ? awayRun : homeRun;

  const runEdge = Math.abs(homeRun - awayRun);

  return {
    awayRun,
    homeRun,
    awayPitchScore,
    homePitchScore,
    awayHRRisk,
    homeHRRisk,
    moneyline,
    nrfiScore: nrfi,

    startingPitcherScore: chosenPitcherScore,
    offenseScore: chosenOffenseScore,
    bullpenScore: 80,
    recentFormScore: clampScore(75 + runEdge, 75),
    vegasScore: clampScore(78 + runEdge, 75),
    injuryScore: 85,
    travelScore: 82,
    opponentOffenseScore
  };
}

// =====================================
// POPS Pickz 6.0 — Model Builders
// Used by engine.js
// =====================================

function buildMoneylineModel(game = {}) {
  const m = game.model || game;

  return {
    startingPitcher: clampScore(m.startingPitcherScore || m.pitcherScore || 75),
    bullpen: clampScore(m.bullpenScore || 75),
    offense: clampScore(m.offenseScore || m.teamOffenseScore || 75),
    recentForm: clampScore(m.recentFormScore || m.formScore || 75),
    vegas: clampScore(m.vegasScore || m.marketScore || 75),
    injuries: clampScore(m.injuryScore || 75),
    travel: clampScore(m.travelScore || m.restScore || 75)
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
  const m = game.model || game;

  return {
    startingPitchers: clampScore(m.nrfiScore || m.startingPitchersScore || 75),
    firstInningHistory: clampScore(m.firstInningScore || m.nrfiHistoryScore || m.nrfiScore || 75),
    offenseSlowStart: clampScore(100 - ((m.awayRun || 75) + (m.homeRun || 75)) / 2),
    bullpenBackup: clampScore(m.bullpenBackupScore || m.bullpenScore || 75),
    weather: clampScore(m.weatherScore || 75),
    vegasTotal: clampScore(m.vegasTotalScore || m.totalScore || 75)
  };
}
