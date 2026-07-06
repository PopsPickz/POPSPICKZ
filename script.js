// ===============================
// POPS Pickz 6.0 — script.js
// Manual today.js premium pick loader
// Auto slate is handled by auto.js
// ===============================

function safeArray(name) {
  const data = window.todayData || (typeof todayData !== "undefined" ? todayData : {});
  return Array.isArray(data[name]) ? data[name] : [];
}

function getScore(item) {
  if (!item) return 0;
  if (item.score) return Number(item.score);
  if (item.hitScore) return Number(item.hitScore);
  if (item.confidenceScore) return Number(item.confidenceScore);

  if (item.confidence) {
    const match = String(item.confidence).match(/\d+/);
    return match ? Number(match[0]) : 0;
  }

  return 0;
}

function ratingFromScore(score) {
  return Number((Number(score) / 10).toFixed(1));
}

function tierFromScore(score) {
  const rating = ratingFromScore(score);
  if (rating >= 9.5) return "Elite Play";
  if (rating >= 9.0) return "Excellent";
  if (rating >= 8.5) return "Very Strong";
  if (rating >= 8.0) return "Strong";
  return "Do Not Show";
}

function strongOnly(items = []) {
  return items
    .map(item => ({
      ...item,
      score: getScore(item)
    }))
    .filter(item => item.score >= 80)
    .sort((a, b) => b.score - a.score);
}

function formatScoreBadge(score, label) {
  if (!score || Number(score) < 80) return "";

  return (
    "<span class='score-badge'>" +
      label + ": " + score + "/100 | " +
      ratingFromScore(score) + "/10 | " +
      tierFromScore(score) +
    "</span>"
  );
}

// ---------- Dashboard ----------

function loadDashboard() {
  const hr = strongOnly(safeArray("hrPicks"));
  const hits = strongOnly(safeArray("batterStats"));
  const pitchers = safeArray("pitcherTargets");
  const money = strongOnly(safeArray("moneyline"));

  const topHR = document.getElementById("topHRPick");
  const topHit = document.getElementById("topHitPick");
  const topPitcher = document.getElementById("topTargetPitcher");
  const bestMoney = document.getElementById("bestMoneyline");

  if (topHR) topHR.textContent = hr[0]?.player || "No HR Pick";
  if (topHit) topHit.textContent = hits[0]?.player || "No Hit Pick";
  if (topPitcher) topPitcher.textContent = pitchers[0]?.pitcher || "No Target";
  if (bestMoney) bestMoney.textContent = money[0]?.team || money[0]?.pick || "No Moneyline";
}

// ---------- Manual Game Breakdown ----------

function showGameBreakdown(gameName) {
  const section = document.getElementById("gameBreakdownContent");
  const game = safeArray("games").find(g => g.game === gameName);
  if (!section || !game) return;

  section.innerHTML =
    "<div class='model-card premium-card'>" +
      "<h2>⚾ " + game.game + "</h2>" +
      "<p><strong>Time:</strong> " + (game.time || "") + "</p>" +
      "<p><strong>Venue:</strong> " + (game.venue || "") + "</p>" +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>🎯 Target Pitchers</h3>" +
      formatPitcher(game.pitchers?.away) +
      "<hr>" +
      formatPitcher(game.pitchers?.home) +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>💣 POPS HR Pickz</h3>" +
      formatHRTargets(game.hrTargets || []) +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>⚾ Hit Targets</h3>" +
      formatHitTargets(game.hitTargets || []) +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>💰 Moneyline</h3>" +
      formatMoneyline(game.moneylinePickDetail || game.moneylinePick) +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>🚦 NRFI / YRFI</h3>" +
      formatNRFI(game.nrfiPick || game.nrfi) +
    "</div>";

  document.getElementById("gameBreakdown")?.scrollIntoView({ behavior: "smooth" });
}

// ---------- Format Cards ----------

function formatPitcher(p) {
  if (!p) return "";

  let html = "<div class='premium-card model-card'>";
  html += "<h3>" + (p.name || p.pitcher || "Pitcher") + "</h3>";
  if (p.team) html += "<p><strong>Team:</strong> " + p.team + "</p>";
  if (p.throws) html += "<p><strong>Throws:</strong> " + p.throws + "</p>";
  if (p.era) html += "<p><strong>ERA:</strong> " + p.era + "</p>";
  if (p.hr9) html += "<p><strong>HR/9:</strong> " + p.hr9 + "</p>";
  if (p.flyBall) html += "<p><strong>Fly Ball %:</strong> " + p.flyBall + "</p>";
  if (p.targetRating || p.grade) html += "<span>" + (p.targetRating || p.grade) + "</span>";
  if (p.verdict) html += "<p>" + p.verdict + "</p>";
  html += "</div>";

  return html;
}

function formatHRTargets(players) {
  const filtered = strongOnly(players);

  if (!filtered.length) return "<p>No 80+ HR picks loaded.</p>";

  return filtered.map((p, i) =>
    "<div class='model-card premium-card'>" +
      "<h3>💣 #" + (i + 1) + " " + p.player + "</h3>" +
      formatScoreBadge(p.score, "POPS HR Score") +
      (p.matchup ? "<p><strong>Matchup:</strong> " + p.matchup + "</p>" : "") +
      (p.reason ? "<p>" + p.reason + "</p>" : "") +
    "</div>"
  ).join("");
}

function formatHitTargets(players) {
  const filtered = strongOnly(players);

  if (!filtered.length) return "<p>No strong hit targets loaded.</p>";

  return filtered.map((p, i) =>
    "<div class='model-card premium-card'>" +
      "<h3>⚾ #" + (i + 1) + " " + p.player + "</h3>" +
      formatScoreBadge(p.score, "POPS Hit Score") +
      (p.matchup ? "<p><strong>Matchup:</strong> " + p.matchup + "</p>" : "") +
      (p.reason || p.why ? "<p>" + (p.reason || p.why) + "</p>" : "") +
    "</div>"
  ).join("");
}

function formatMoneyline(m) {
  if (!m || (typeof m === "string")) {
    return m ? "<p><strong>Pick:</strong> " + m + "</p>" : "<p>No strong moneyline loaded.</p>";
  }

  const score = getScore(m);

  if (score && score < 80) return "<p>No strong moneyline loaded.</p>";

  return (
    (score ? formatScoreBadge(score, "POPS Moneyline Score") : "") +
    "<p><strong>Pick:</strong> " + (m.pick || m.team || "") + "</p>" +
    (m.line ? "<p><strong>Line:</strong> " + m.line + "</p>" : "") +
    (m.confidence ? "<p><strong>Confidence:</strong> " + m.confidence + "</p>" : "") +
    (m.reason ? "<p>" + m.reason + "</p>" : "")
  );
}

function formatNRFI(n) {
  if (!n || !n.pick || n.pick === "Pass") return "<p>No strong NRFI/YRFI play.</p>";

  const score = getScore(n);

  if (score && score < 80) return "<p>No strong NRFI/YRFI play.</p>";

  return (
    (score ? formatScoreBadge(score, "POPS NRFI Score") : "") +
    "<p><strong>Pick:</strong> " + n.pick + "</p>" +
    (n.confidence ? "<p><strong>Confidence:</strong> " + n.confidence + "</p>" : "") +
    (n.reason ? "<p>" + n.reason + "</p>" : "")
  );
}

// ---------- Section Loaders ----------

function loadHRPicks() {
  const section = document.getElementById("dailyHRPicks");
  if (!section) return;
  section.innerHTML = formatHRTargets(safeArray("hrPicks"));
}

function loadBatterStats() {
  const section = document.getElementById("batterStatsList");
  if (!section) return;
  section.innerHTML = formatHitTargets(safeArray("batterStats"));
}

function loadPitcherTargets() {
  const section = document.getElementById("pitcherTargets");
  const pitchers = safeArray("pitcherTargets");
  if (!section) return;

  section.innerHTML = pitchers.length
    ? pitchers.map(p => formatPitcher(p)).join("")
    : "<div class='model-card'>No target pitchers loaded.</div>";
}

function loadMoneyline() {
  const section = document.getElementById("moneylinePicks");
  const money = strongOnly(safeArray("moneyline"));
  if (!section) return;

  section.innerHTML = money.length
    ? money.map(m =>
        "<div class='model-card premium-card'>" +
          "<h3>💰 " + (m.team || m.pick) + "</h3>" +
          formatMoneyline(m) +
        "</div>"
      ).join("")
    : "<div class='model-card'>No moneyline picks 80+ loaded.</div>";
}

function loadNRFI() {
  const section = document.getElementById("nrfiPicks");
  const nrfi = strongOnly(safeArray("eliteNRFI"));
  if (!section) return;

  section.innerHTML = nrfi.length
    ? nrfi.map(n =>
        "<div class='model-card premium-card'>" +
          "<h3>🚦 " + n.game + "</h3>" +
          formatNRFI(n) +
        "</div>"
      ).join("")
    : "<div class='model-card'>No strong NRFI/YRFI play.</div>";
}

function initDashboard() {
  loadDashboard();
  loadHRPicks();
  loadBatterStats();
  loadPitcherTargets();
  loadMoneyline();
  loadNRFI();
}

window.addEventListener("DOMContentLoaded", initDashboard);
