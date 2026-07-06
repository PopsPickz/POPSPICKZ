// ===============================
// POPS Pickz 6.0 — pops-ai.js
// AI explanations + hitter scoring
// ===============================

// ---------- Hitter HR Score ----------

function hitterHRScore(hitter, pitcherRisk) {
  if (!hitter) return 0;

  let score = 50;

  score += Number(hitter.ops || 0) * 25;
  score += Number(hitter.slg || 0) * 30;
  score += Number(hitter.homeRuns || 0) * 1.2;
  score += Number(pitcherRisk || 0) * 0.25;

  return Math.max(0, Math.min(99, Math.round(score)));
}

// ---------- Hitter Hit Score ----------

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

// ---------- Moneyline AI Explanation ----------

function buildMoneylineExplanation(game) {
  const m = game.model || {};
  const reasons = [];

  if (m.startingPitcherScore >= 85) reasons.push("✅ Starting pitcher advantage");
  if (m.bullpenScore >= 80) reasons.push("✅ Bullpen advantage");
  if (m.offenseScore >= 85) reasons.push("✅ Strong offensive matchup");
  if (m.recentFormScore >= 80) reasons.push("✅ Team in good recent form");
  if (m.vegasScore >= 80) reasons.push("✅ Vegas market supports the pick");
  if (m.injuryScore >= 80) reasons.push("✅ Healthy projected lineup");
  if (m.travelScore >= 80) reasons.push("✅ Travel/rest advantage");

  return reasons.length ? reasons : ["✅ POPS model shows a strong overall edge"];
}

// ---------- HR AI Explanation ----------

function buildHRExplanation(player) {
  const reasons = [];

  if (player.pitcherHRRisk >= 85) reasons.push("💣 Opposing pitcher gives up HR danger");
  if (player.batterPower >= 85) reasons.push("🔥 Strong power profile");
  if (player.batterForm >= 80) reasons.push("📈 Hot hitter");
  if (player.park >= 80) reasons.push("🏟️ Favorable ballpark");
  if (player.weather >= 80) reasons.push("🌤️ Good HR weather");
  if (player.handedness >= 80) reasons.push("⚾ Favorable handedness matchup");

  return reasons.length ? reasons : ["💣 POPS model shows HR upside"];
}

// ---------- Hit AI Explanation ----------

function buildHitExplanation(player) {
  const reasons = [];

  if (player.contact >= 85) reasons.push("⚾ Excellent contact skills");
  if (player.recentForm >= 80) reasons.push("📈 Hot at the plate");
  if (player.matchup >= 80) reasons.push("🎯 Favorable pitcher matchup");
  if (player.lineupSpot >= 80) reasons.push("🔝 Premium lineup position");

  return reasons.length ? reasons : ["⚾ POPS model shows strong hit upside"];
}

// ---------- NRFI AI Explanation ----------

function buildNRFIExplanation(game) {
  const reasons = [];

  if (game.startingPitchers >= 85) reasons.push("🎯 Strong starting pitchers");
  if (game.firstInningHistory >= 80) reasons.push("📊 Good first inning history");
  if (game.offenseSlowStart >= 80) reasons.push("🐢 Offenses start slow");
  if (game.weather >= 80) reasons.push("🌤️ Pitching-friendly weather");

  return reasons.length ? reasons : ["🚦 POPS model shows first-inning value"];
}
