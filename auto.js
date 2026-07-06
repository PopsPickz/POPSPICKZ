// ===============================
// POPS Pickz 8.0 — auto.js
// Auto-load MLB slate + POPS models
// ===============================

async function loadAutoSlate() {
  const slateBox = $("slateList");
  if (!slateBox) return;

  slateBox.innerHTML = loadingCard("Loading POPS Pickz 8.0 slate...");

  try {
    console.log("Loading Games...");
const games = await getTodaysGames();

if (!games || !games.length) {
  slateBox.innerHTML = loadingCard("No MLB games found today.");
  return;
}

// Show live MLB slate immediately
slateBox.innerHTML = games.map(game => {
  const away = getTeamName(game, "away");
  const home = getTeamName(game, "home");
  const awayPitcher = getPitcherName(game, "away");
  const homePitcher = getPitcherName(game, "home");
  const venue = game.venue?.name || "Unknown Stadium";
  const time = getGameTime(game);

  return `
    <div class="slate-card model-card">
      <h3>${away} vs ${home}</h3>
      <p><strong>Time:</strong> ${time}</p>
      <p><strong>Venue:</strong> ${venue}</p>
      <p><strong>Away Pitcher:</strong> ${awayPitcher}</p>
      <p><strong>Home Pitcher:</strong> ${homePitcher}</p>
    </div>
  `;
}).join("");

// Load heavier stats after slate is visible
const teamStats = await getTeamStats();
const pitcherStats = await getPitcherStats();
const hitterStats = await getHitterStats();

    const gameModels = await Promise.all(
      games.map(game => buildAutoGame(game, teamStats, pitcherStats))
    );

    const scoredGames = gameModels
      .map(game => {
        const model = buildMoneylineModel(game);
        return scorePlay({ ...game, popsModel: model }, "moneyline");
      })
      .filter(game => game.showOnSite);

    const autoData = {
      games: gameModels,
      scoredGames,
      moneyline: createAutoMoneylinePicks(gameModels),
      nrfi: createAutoNRFIPicks(gameModels),
      pitcherTargets: createAutoPitcherTargets(gameModels),
      hrPicks: createAutoHRPicks(games, hitterStats, pitcherStats),
      batterStats: createAutoHitPicks(games, hitterStats)
    };

    window.popsAutoData = autoData;

    renderSlate(scoredGames.length ? scoredGames : gameModels, slateBox);
    applyManualOverrides(autoData);
    renderAutoPitcherTargets(autoData.pitcherTargets);
    updateTopSummary(autoData.moneyline, autoData.hrPicks, autoData.batterStats, autoData.pitcherTargets);
    renderDailySummary(autoData);

  } catch (err) {
    console.error(err);
    slateBox.innerHTML = loadingCard("Could not load POPS Pickz 8.0 slate.");
  }
}

function $(id) {
  return document.getElementById(id);
}

function loadingCard(text) {
  return ⁠ <div class="model-card">${text}</div> ⁠;
}

function getPitcherName(game, side) {
  return game.teams?.[side]?.probablePitcher?.fullName || "TBD";
}

function getTeamName(game, side) {
  return game.teams?.[side]?.team?.name || "Unknown Team";
}

function getGameTime(game) {
  if (!game.gameDate) return "TBD";

  return new Date(game.gameDate).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

function getPitcherLine(name, pitcherStats) {
  const p = pitcherStats?.[name] || {};
  return ⁠ ERA: ${p.era || "N/A"} | WHIP: ${p.whip || "N/A"} | HR Allowed: ${p.homeRuns ?? "N/A"} ⁠;
}

function ratingFromScore(score) {
  return Number((Number(score || 0) / 10).toFixed(1));
}

function gradeFromScore(score) {
  const value = Number(score || 0);

  if (value >= 95) return "Elite Play";
  if (value >= 90) return "Excellent";
  if (value >= 85) return "Very Strong";
  if (value >= 80) return "Strong";
  return "Do Not Show";
}

function scoreBadge(score, label = "POPS Rating") {
  if (!score || Number(score) < 80) return "";

  return ⁠ <span class="score-badge">${label}: ${ratingFromScore(score)}/10 | ${gradeFromScore(score)}</span> ⁠;
}

async function buildAutoGame(game, teamStats, pitcherStats) {
  const away = getTeamName(game, "away");
  const home = getTeamName(game, "home");

  const awayPitcher = getPitcherName(game, "away");
  const homePitcher = getPitcherName(game, "home");

  const venue = game.venue?.name || "Unknown Stadium";
  const weather = await getGameWeather(venue, game.gameDate);

  const model = buildGameModel(game, teamStats, pitcherStats);
  const nrfiLabel = nrfiPick(model.nrfiScore);

  return {
    raw: game,
    away,
    home,
    awayPitcher,
    homePitcher,
    venue,
    weather,
    time: getGameTime(game),
    model,
    nrfiLabel,
    awayPitcherLine: getPitcherLine(awayPitcher, pitcherStats),
    homePitcherLine: getPitcherLine(homePitcher, pitcherStats)
  };
}

function updateTopSummary(moneyline = [], hr = [], hits = [], pitchers = []) {
  if ($("topHRPick")) $("topHRPick").textContent = hr[0]?.player || "No HR Pick";
  if ($("topHitPick")) $("topHitPick").textContent = hits[0]?.player || "No Hit Pick";
  if ($("topTargetPitcher")) $("topTargetPitcher").textContent = pitchers[0]?.pitcher || "No Target";
  if ($("bestMoneyline")) $("bestMoneyline").textContent = moneyline[0]?.team || moneyline[0]?.pick || "No Moneyline";
}

// ---------- POPS 8.0 Slate Cards ----------

function renderSlate(gameModels, slateBox) {
  if (!slateBox) return;

  slateBox.innerHTML = gameModels.length
    ? gameModels.map(g => {
      const hrDanger = Math.max(g.model.awayHRRisk || 0, g.model.homeHRRisk || 0);
      const gameScore = Math.max(g.model.awayRun || 0, g.model.homeRun || 0);
      const rating = ratingFromScore(gameScore);
      const title = ⁠ ${g.away} vs ${g.home} ⁠;

      return `
        <div class="slate-card model-card clickable-game" onclick="showAutoGameBreakdown('${title.replace(/'/g, "\\'")}')">
          <div class="game-card-top">
            <h3>${title}</h3>
            <span class="game-time">${g.time}</span>
          </div>

          <div class="pops-rating">POPS Rating: ${rating}/10</div>
          ${scoreBadge(gameScore)}

          <p><strong>Venue:</strong> ${g.venue}</p>
          <p><strong>Weather:</strong> ${g.weather?.temp || "N/A"}, Wind ${g.weather?.wind || "N/A"}</p>

          <div class="mini-meter">
            <span>💰 Moneyline</span>
            <strong>${g.model.moneyline}</strong>
          </div>

          <div class="mini-meter">
            <span>🚦 First Inning</span>
            <strong>${g.nrfiLabel} — ${g.model.nrfiScore}/100</strong>
          </div>

          <div class="mini-meter">
            <span>💣 HR Danger</span>
            <strong>${hrDanger}/100</strong>
          </div>

          <p><small>Tap for full POPS 8.0 breakdown</small></p>
        </div>
      `;
    }).join("")
    : loadingCard("No MLB games loaded yet.");
}

function showAutoGameBreakdown(gameTitle) {
  const section = $("gameBreakdownContent");
  if (!section || !window.popsAutoData?.games) return;

  const game = window.popsAutoData.games.find(g => ⁠ ${g.away} vs ${g.home} ⁠ === gameTitle);
  if (!game) return;

  const hrDanger = Math.max(game.model.awayHRRisk || 0, game.model.homeHRRisk || 0);
  const gameScore = Math.max(game.model.awayRun || 0, game.model.homeRun || 0);

  section.innerHTML = `
    <div class="model-card premium-card">
      <h2>📊 ${game.away} vs ${game.home}</h2>
      ${scoreBadge(gameScore)}
      <p><strong>Time:</strong> ${game.time}</p>
      <p><strong>Venue:</strong> ${game.venue}</p>
      <p><strong>Weather:</strong> ${game.weather?.temp || "N/A"}, Wind ${game.weather?.wind || "N/A"}</p>
    </div>

    <div class="model-card premium-card">
      <h3>💰 Moneyline Edge</h3>
      <p><strong>POPS Lean:</strong> ${game.model.moneyline}</p>
      <p><strong>Run Support:</strong> ${game.away} ${game.model.awayRun}/100 vs ${game.home} ${game.model.homeRun}/100</p>
    </div>

    <div class="model-card premium-card">
      <h3>🎯 Starting Pitchers</h3>
      <p><strong>${game.awayPitcher}</strong> — ${game.awayPitcherLine}</p>
      <p>POPS Pitcher Score: ${game.model.awayPitchScore}/100</p>
      <p>HR Risk: ${game.model.awayHRRisk}/100</p>
      <hr>
      <p><strong>${game.homePitcher}</strong> — ${game.homePitcherLine}</p>
      <p>POPS Pitcher Score: ${game.model.homePitchScore}/100</p>
      <p>HR Risk: ${game.model.homeHRRisk}/100</p>
    </div>

    <div class="model-card premium-card">
      <h3>🚦 NRFI / YRFI</h3>
      <p><strong>${game.nrfiLabel}</strong></p>
      <p>Score: ${game.model.nrfiScore}/100</p>
    </div>

    <div class="model-card premium-card">
      <h3>💣 HR Environment</h3>
      <p><strong>HR Danger:</strong> ${hrDanger}/100</p>
      <p>${hrDanger >= 85 ? "💣 Strong home run environment." : "⚾ Moderate home run environment."}</p>
    </div>
  `;

  $("gameBreakdown")?.scrollIntoView({ behavior: "smooth" });
}

// ---------- Render Picks ----------

function renderAutoMoneyline(picks = []) {
  const box = $("moneylinePicks");
  if (!box) return;

  box.innerHTML = picks.length
    ? picks.map(p => `
      <div class="model-card premium-card">
        <h3>💰 ${p.pick || p.team}</h3>
        ${scoreBadge(p.score)}
        <p><strong>${p.game || ""}</strong></p>
        <p><strong>Score:</strong> ${p.score}/100</p>
        <p>${p.reason || ""}</p>
      </div>
    `).join("")
    : loadingCard("No moneyline picks 80+ found yet.");
}

function renderAutoNRFI(picks = []) {
  const box = $("nrfiPicks");
  if (!box) return;

  box.innerHTML = picks.length
    ? picks.map(p => `
      <div class="model-card premium-card">
        <h3>🚦 ${p.pick}</h3>
        <p><strong>${p.game}</strong></p>
        ${scoreBadge(p.score)}
        <p><strong>Score:</strong> ${p.score}/100</p>
        <p>${p.reason || ""}</p>
      </div>
    `).join("")
    : loadingCard("No NRFI picks 80+ found yet.");
}

function renderAutoPitcherTargets(picks = []) {
  const box = $("pitcherTargets");
  if (!box) return;

  box.innerHTML = picks.length
    ? picks.map(p => `
      <div class="model-card premium-card">
        <h3>🎯 ${p.pitcher}</h3>
        <p><strong>${p.team} vs ${p.opponent}</strong></p>
        ${scoreBadge(p.score, "HR Risk")}
        <p><strong>Score:</strong> ${p.score}/100</p>
        <p>${p.reason || ""}</p>
      </div>
    `).join("")
    : loadingCard("No pitcher targets 80+ found yet.");
}

function renderAutoHRPicks(picks = []) {
  const box = $("dailyHRPicks");
  if (!box) return;

  box.innerHTML = picks.length
    ? picks.map((p, i) => `
      <div class="model-card premium-card">
        <h3>💣 #${i + 1} ${p.player}</h3>
        <p><strong>${p.game || ""}</strong></p>
        <p><strong>Matchup:</strong> ${p.matchup || ""}</p>
        ${scoreBadge(p.score)}
        <p><strong>Score:</strong> ${p.score}/100</p>
        <p>${p.reason || ""}</p>
      </div>
    `).join("")
    : loadingCard("No HR picks 80+ found yet.");
}

function renderAutoHitTargets(picks = []) {
  const box = $("batterStatsList");
  if (!box) return;

  box.innerHTML = picks.length
    ? picks.map((p, i) => `
      <div class="model-card premium-card">
        <h3>⚾ #${i + 1} ${p.player}</h3>
        <p><strong>${p.game || ""}</strong></p>
        <p><strong>Matchup:</strong> ${p.matchup || ""}</p>
        ${scoreBadge(p.score)}
        <p><strong>Score:</strong> ${p.score}/100</p>
        <p>${p.reason || ""}</p>
      </div>
    `).join("")
    : loadingCard("No hit targets 80+ found yet.");
}

// ---------- Manual Overrides ----------

function getManualDataArray(name) {
  const data = window.todayData || {};
  return Array.isArray(data[name]) ? data[name] : [];
}

function getManualScore(item) {
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

function filterStrongManual(items = []) {
  return items
    .map(item => ({ ...item, score: getManualScore(item) }))
    .filter(item => item.score >= 80)
    .sort((a, b) => b.score - a.score);
}

function renderManualMoneylineIfAvailable() {
  const picks = filterStrongManual(getManualDataArray("moneyline"));
  if (!picks.length) return false;

  renderAutoMoneyline(picks.map(p => ({
    game: p.game || "",
    team: p.team || p.pick,
    pick: p.pick || p.team,
    score: p.score,
    reason: p.reason || p.confidence || ""
  })));

  return true;
}

function renderManualHRIfAvailable() {
  const picks = filterStrongManual(getManualDataArray("hrPicks"));
  if (!picks.length) return false;

  renderAutoHRPicks(picks.map(p => ({
    player: p.player,
    game: p.game || "",
    matchup: p.matchup || "",
    score: p.score,
    reason: p.reason || p.grade || ""
  })));

  return true;
}

function renderManualHitsIfAvailable() {
  const picks = filterStrongManual(getManualDataArray("batterStats"));
  if (!picks.length) return false;

  renderAutoHitTargets(picks.map(p => ({
    player: p.player,
    game: p.game || "",
    matchup: p.matchup || "",
    score: p.score,
    reason: p.reason || p.why || p.grade || ""
  })));

  return true;
}

function renderManualNRFIIfAvailable() {
  const picks = filterStrongManual(getManualDataArray("eliteNRFI"));
  if (!picks.length) return false;

  renderAutoNRFI(picks.map(p => ({
    game: p.game,
    pick: p.pick,
    score: p.score,
    reason: p.reason || ""
  })));

  return true;
}

function applyManualOverrides(autoData = {}) {
  const usedManualMoneyline = renderManualMoneylineIfAvailable();
  const usedManualHR = renderManualHRIfAvailable();
  const usedManualHits = renderManualHitsIfAvailable();
  const usedManualNRFI = renderManualNRFIIfAvailable();

  if (!usedManualMoneyline) renderAutoMoneyline(autoData.moneyline || []);
  if (!usedManualHR) renderAutoHRPicks(autoData.hrPicks || []);
  if (!usedManualHits) renderAutoHitTargets(autoData.batterStats || []);
  if (!usedManualNRFI) renderAutoNRFI(autoData.nrfi || []);
}

// ---------- Daily Summary ----------

function buildDailySummary(autoData = {}) {
  const topMoney = autoData.moneyline?.[0];
  const topHR = autoData.hrPicks?.[0];
  const topHit = autoData.batterStats?.[0];
  const topPitcher = autoData.pitcherTargets?.[0];
  const topNRFI = autoData.nrfi?.[0];

  const lines = [];

  if (topMoney) lines.push(⁠ 💰 Best Moneyline: ${topMoney.pick || topMoney.team} — ${ratingFromScore(topMoney.score)}/10 ⁠);
  if (topHR) lines.push(⁠ 💣 Top HR: ${topHR.player} — ${ratingFromScore(topHR.score)}/10 ⁠);
  if (topHit) lines.push(⁠ ⚾ Top Hit: ${topHit.player} — ${ratingFromScore(topHit.score)}/10 ⁠);
  if (topPitcher) lines.push(⁠ 🎯 Target Pitcher: ${topPitcher.pitcher} — ${ratingFromScore(topPitcher.score)}/10 ⁠);
  if (topNRFI) lines.push(⁠ 🚦 Best NRFI/YRFI: ${topNRFI.game} — ${ratingFromScore(topNRFI.score)}/10 ⁠);

  return lines;
}

function renderDailySummary(autoData = {}) {
  let box = $("popsDailySummary");

  if (!box) {
    const hero = document.querySelector(".command-hero");
    if (!hero) return;

    box = document.createElement("div");
    box.id = "popsDailySummary";
    box.className = "summary-card ai-summary";
    hero.appendChild(box);
  }

  const summary = buildDailySummary(autoData);

  box.innerHTML = summary.length
    ? `
      <span>🤖 POPS AI Daily Summary</span>
      ${summary.map(line => ⁠ <p>${line}</p> ⁠).join("")}
    `
    : `
      <span>🤖 POPS AI Daily Summary</span>
      <p>No Strong+ plays found yet.</p>
    `;
}

window.addEventListener("DOMContentLoaded", loadAutoSlate);
