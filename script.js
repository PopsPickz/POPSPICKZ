function safeArray(name) {
  if (typeof todayData === "undefined") return [];
  return Array.isArray(todayData[name]) ? todayData[name] : [];
}

function clean(value) {
  if (!value || value === "N/A" || value === "TBD" || value === "Pass") return "";
  return value;
}

function scoreText(score) {
  if (!score) return "";
  if (typeof score === "number") return score + "/100";
  return score;
}

function loadDashboard() {
  const hr = safeArray("hrPicks");
  const hits = safeArray("batterStats");
  const pitchers = safeArray("pitcherTargets");
  const money = safeArray("moneyline");

  const topHR = document.getElementById("topHRPick");
  const topHit = document.getElementById("topHitPick");
  const topPitcher = document.getElementById("topTargetPitcher");
  const bestMoney = document.getElementById("bestMoneyline");

  if (topHR) topHR.textContent = hr[0]?.player || "No HR Pick";
  if (topHit) topHit.textContent = hits[0]?.player || "No Hit Pick";
  if (topPitcher) topPitcher.textContent = pitchers[0]?.pitcher || "No Target";
  if (bestMoney) bestMoney.textContent = money[0]?.team || "No Moneyline";
}

function loadDailySlate() {
  const slateList = document.getElementById("slateList");
  const games = safeArray("games");
  if (!slateList) return;

  if (games.length === 0) {
    slateList.innerHTML = "<div class='model-card'>No POPS games loaded.</div>";
    return;
  }

  slateList.innerHTML = "";

  games.forEach(function(game) {
    const card = document.createElement("div");
    card.className = "game-card clickable-game";

    card.innerHTML =
      "<h3>" + game.game + "</h3>" +
      "<p>" + game.pitchers.away.name + " vs " + game.pitchers.home.name + "</p>" +
      "<p>" + (game.venue || "") + "</p>" +
      "<span>" + (game.time || "") + "</span>" +
      "<p><small>Tap for POPS breakdown</small></p>";

    card.onclick = function() {
      showGameBreakdown(game.game);
    };

    slateList.appendChild(card);
  });
}

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
      formatPitcher(game.pitchers.away) +
      "<hr>" +
      formatPitcher(game.pitchers.home) +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>💣 POPS HR Pickz</h3>" +
      formatHRTargets(game.hrTargets) +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>⚾ Hit Targets</h3>" +
      formatHitTargets(game.hitTargets) +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>💰 Moneyline</h3>" +
      formatMoneyline(game.moneylinePick) +
    "</div>" +

    "<div class='model-card'>" +
      "<h3>🚦 NRFI / YRFI</h3>" +
      formatNRFI(game.nrfi) +
    "</div>";

  document.getElementById("gameBreakdown").scrollIntoView({ behavior: "smooth" });
}

function formatPitcher(p) {
  if (!p) return "";

  let html = "<div class='premium-card model-card'>";
  html += "<h3>" + p.name + "</h3>";
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
  if (!players || players.length === 0) return "<p>No 80+ HR picks loaded.</p>";

  let html = "";
  players.forEach(function(p, i) {
    html +=
      "<div class='model-card premium-card'>" +
      "<h3>💣 #" + (i + 1) + " " + p.player + "</h3>" +
      (p.score ? "<span class='score-badge'>POPS HR Score: " + scoreText(p.score) + "</span>" : "") +
      (p.odds ? "<p><strong>HR Odds:</strong> " + p.odds + "</p>" : "") +
      (p.matchup ? "<p><strong>Matchup:</strong> " + p.matchup + "</p>" : "") +
      (p.barrel ? "<p><strong>Barrel:</strong> " + p.barrel + "%</p>" : "") +
      (p.hardHit ? "<p><strong>Hard Hit:</strong> " + p.hardHit + "%</p>" : "") +
      (p.iso ? "<p><strong>ISO:</strong> " + p.iso + "</p>" : "") +
      (p.hr9 ? "<p><strong>Pitcher HR/9:</strong> " + p.hr9 + "</p>" : "") +
      (p.reason ? "<p>" + p.reason + "</p>" : "") +
      "</div>";
  });
  return html;
}

function formatHitTargets(players) {
  if (!players || players.length === 0) return "<p>No strong hit targets loaded.</p>";

  let html = "";
  players.forEach(function(p, i) {
    html +=
      "<div class='model-card premium-card'>" +
      "<h3>⚾ #" + (i + 1) + " " + p.player + "</h3>" +
      (p.grade ? "<span>" + p.grade + "</span>" : "") +
      (p.score || p.hitScore ? "<p><strong>POPS Hit Score:</strong> " + scoreText(p.score || p.hitScore) + "</p>" : "") +
      (p.matchup ? "<p><strong>Matchup:</strong> " + p.matchup + "</p>" : "") +
      (p.avg ? "<p><strong>AVG:</strong> " + p.avg + "</p>" : "") +
      (p.obp ? "<p><strong>OBP:</strong> " + p.obp + "</p>" : "") +
      (p.ops ? "<p><strong>OPS:</strong> " + p.ops + "</p>" : "") +
      (p.reason || p.why ? "<p>" + (p.reason || p.why) + "</p>" : "") +
      "</div>";
  });
  return html;
}

function formatMoneyline(m) {
  if (!m || !m.pick) return "<p>No strong moneyline loaded.</p>";

  return (
    "<p><strong>Pick:</strong> " + m.pick + "</p>" +
    (m.line ? "<p><strong>Line:</strong> " + m.line + "</p>" : "") +
    (m.confidence ? "<p><strong>Confidence:</strong> " + m.confidence + "</p>" : "") +
    (m.reason ? "<p>" + m.reason + "</p>" : "")
  );
}

function formatNRFI(n) {
  if (!n || !n.pick || n.pick === "Pass") return "<p>No strong NRFI/YRFI play.</p>";

  return (
    "<p><strong>Pick:</strong> " + n.pick + "</p>" +
    (n.confidence ? "<p><strong>Confidence:</strong> " + n.confidence + "</p>" : "") +
    (n.reason ? "<p>" + n.reason + "</p>" : "")
  );
}

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
    ? pitchers.map(p => formatPitcher({
        name: p.pitcher,
        team: p.team,
        era: p.era,
        hr9: p.hr9,
        flyBall: p.flyBall,
        grade: p.grade,
        verdict: p.verdict
      })).join("")
    : "<div class='model-card'>No target pitchers loaded.</div>";
}

function loadMoneyline() {
  const section = document.getElementById("moneylinePicks");
  const money = safeArray("moneyline");
  if (!section) return;

  section.innerHTML = money.length
    ? money.map(m =>
        "<div class='model-card premium-card'><h3>💰 " + m.team + "</h3>" +
        "<p>" + (m.reason || "") + "</p>" +
        "<span>" + (m.confidence || "") + "</span></div>"
      ).join("")
    : "<div class='model-card'>No strong moneyline loaded.</div>";
}

function loadNRFI() {
  const section = document.getElementById("nrfiPicks");
  const nrfi = safeArray("nrfi");
  if (!section) return;

  section.innerHTML = nrfi.length
    ? nrfi.map(n =>
        "<div class='model-card premium-card'><h3>🚦 " + n.game + "</h3>" +
        "<p><strong>" + n.pick + "</strong></p>" +
        "<p>" + (n.reason || "") + "</p></div>"
      ).join("")
    : "<div class='model-card'>No strong NRFI/YRFI play.</div>";
}

function initDashboard() {
  loadDashboard();
  loadDailySlate();
  loadHRPicks();
  loadBatterStats();
  loadPitcherTargets();
  loadMoneyline();
  loadNRFI();
}

initDashboard();
