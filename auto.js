// ===============================
// POPS Pickz 6.0 — auto.js v2.2
// Auto-loads MLB slate + models
// ===============================

async function loadAutoSlate() {
  const slateBox = $("slateList");
  if (!slateBox) return;

  slateBox.innerHTML = loadingCard("Loading POPS Pickz AI slate...");

  try {
    const games = await getTodaysGames();
    const teamStats = await getTeamStats();
    const pitcherStats = await getPitcherStats();
    const hitterStats = await getHitterStats();

    if (!games || !games.length) {
      slateBox.innerHTML = loadingCard("No MLB games found today.");
      return;
    }

    const gameModels = await Promise.all(
      games.map(game => buildAutoGame(game, teamStats, pitcherStats))
    );

    const scoredGames = gameModels
      .map(game => {
        const moneylineModel = buildMoneylineModel(game);

        return scorePlay(
          {
            ...game,
            popsModel: moneylineModel
          },
          "moneyline"
        );
      })
      .filter(game => game.showOnSite);

const autoMoneyline = createAutoMoneylinePicks(gameModels);
const autoNRFI = createAutoNRFIPicks(gameModels);
const autoPitchers = createAutoPitcherTargets(gameModels);
const autoHR = createAutoHRPicks(games, hitterStats, pitcherStats);
const autoHits = createAutoHitPicks(games, hitterStats);

window.popsAutoData = {
  moneyline: autoMoneyline,
  nrfi: autoNRFI,
  pitcherTargets: autoPitchers,
  hrPicks: autoHR,
  batterStats: autoHits
};

renderSlate(scoredGames.length ? scoredGames : gameModels, slateBox);
renderAutoMoneyline(autoMoneyline);
renderAutoNRFI(autoNRFI);
renderAutoPitcherTargets(autoPitchers);
renderAutoHRPicks(autoHR);
renderAutoHitTargets(autoHits);

  } catch (err) {
    console.error(err);
    slateBox.innerHTML = loadingCard("Could not load POPS Pickz AI slate.");
  }
}

// ---------- Helpers ----------

function $(id) {
  return document.getElementById(id);
}

function loadingCard(text) {
  return ⁠ <div class="model-card">${text}</div> ⁠;
}

function getPitcherName(game, side) {
  return game.teams[side].probablePitcher?.fullName || "TBD";
}

function getTeamName(game, side) {
  return game.teams[side].team.name;
}

function getGameTime(game) {
  return new Date(game.gameDate).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit"
  });
}

function getPitcherLine(name, pitcherStats) {
  const p = pitcherStats[name] || {};
  return ⁠ ERA: ${p.era || "N/A"} | WHIP: ${p.whip || "N/A"} | HR Allowed: ${p.homeRuns ?? "N/A"} ⁠;
}

function gradeFromScore(score) {
  if (score >= 95) return "Elite Play";
  if (score >= 90) return "Excellent";
  if (score >= 85) return "Very Strong";
  if (score >= 80) return "Strong";
  return "Do Not Show";
}

function ratingFromScore(score) {
  return Number((Number(score) / 10).toFixed(1));
}

// ---------- Build Game Model ----------

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

// ---------- Render Slate ----------

function renderSlate(gameModels, slateBox) {
  slateBox.innerHTML = gameModels.length
    ? gameModels.map(g => `
      <div class="slate-card model-card">
        <h3>${g.away} vs ${g.home}</h3>

        <p><strong>Time:</strong> ${g.time}</p>
        <p><strong>Venue:</strong> ${g.venue}</p>
        <p><strong>Weather:</strong> ${g.weather?.temp || "N/A"}, Wind ${g.weather?.wind || "N/A"}</p>

        ${g.rating ? ⁠ <p><strong>POPS Rating:</strong> ${g.rating}/10</p> ⁠ : ""}
        ${g.tier ? ⁠ <p><strong>Tier:</strong> ${g.tier}</p> ⁠ : ""}

        <p><strong>${g.away} Pitcher:</strong> ${g.awayPitcher}</p>
        <p>${g.awayPitcherLine} | POPS Pitcher Score: ${g.model.awayPitchScore}/100</p>
        <p><strong>${g.awayPitcher} HR Risk:</strong> ${g.model.awayHRRisk}/100</p>

        <p><strong>${g.home} Pitcher:</strong> ${g.homePitcher}</p>
        <p>${g.homePitcherLine} | POPS Pitcher Score: ${g.model.homePitchScore}/100</p>
        <p><strong>${g.homePitcher} HR Risk:</strong> ${g.model.homeHRRisk}/100</p>

        <p><strong>Run Support:</strong> ${g.away} ${g.model.awayRun}/100 vs ${g.home} ${g.model.homeRun}/100</p>
        <p><strong>NRFI/YRFI:</strong> ${g.nrfiLabel} — ${g.model.nrfiScore}/100</p>
        <p><strong>POPS Moneyline Lean:</strong> ✅ ${g.model.moneyline}</p>
      </div>
    `).join("")
    : loadingCard("No MLB games loaded yet.");
}

// ---------- Render Pitcher Targets ----------

function renderPitcherTargets(gameModels) {
  const box = $("pitcherTargets");
  if (!box) return;

  const targets = [];

  gameModels.forEach(g => {
    targets.push({
      pitcher: g.awayPitcher,
      team: g.away,
      opponent: g.home,
      risk: g.model.awayHRRisk
    });

    targets.push({
      pitcher: g.homePitcher,
      team: g.home,
      opponent: g.away,
      risk: g.model.homeHRRisk
    });
  });

  const filtered = targets
    .filter(p => p.pitcher !== "TBD")
    .filter(p => p.risk >= 80)
    .sort((a, b) => b.risk - a.risk)
    .slice(0, 10);

  box.innerHTML = filtered.length
    ? filtered.map(p => `
      <div class="model-card premium-card">
        <h3>${targetGrade(p.risk)} ${p.pitcher}</h3>
        <p><strong>Team:</strong> ${p.team}</p>
        <p><strong>Opponent:</strong> ${p.opponent}</p>
        <p><strong>HR Risk:</strong> ${p.risk}/100</p>
        <p><strong>Rating:</strong> ${ratingFromScore(p.risk)}/10</p>
        <p><strong>Tier:</strong> ${gradeFromScore(p.risk)}</p>
      </div>
    `).join("")
    : loadingCard("No pitcher targets 80+ found yet.");
}

// ---------- Render Moneyline ----------

function renderMoneyline(gameModels) {
  const box = $("moneylinePicks");
  if (!box) return;

  const manualMoneyline =
    window.todayData && Array.isArray(window.todayData.moneyline)
      ? window.todayData.moneyline
          .map(m => {
            const score = Number(m.score || String(m.confidence || "").match(/\d+/)?.[0] || 0);
            return { ...m, score };
          })
          .filter(m => m.score >= 80)
          .sort((a, b) => b.score - a.score)
      : [];

  if (manualMoneyline.length) {
    box.innerHTML = manualMoneyline.map(m => `
      <div class="model-card premium-card">
        <h3>💰 ${m.team || m.pick}</h3>
        <span class="score-badge">POPS Rating: ${(m.score / 10).toFixed(1)}/10 | ${gradeFromScore(m.score)}</span>
        <p><strong>POPS Score:</strong> ${m.score}/100</p>
        <p><strong>Confidence:</strong> ${m.confidence || ""}</p>
        <p>${m.reason || ""}</p>
      </div>
    `).join("");
    return;
  }

  const autoMoneyline = gameModels
    .map(g => {
      const score = Math.max(g.model.awayRun, g.model.homeRun);
      return {
        team: g.model.moneyline,
        game: ⁠ ${g.away} vs ${g.home} ⁠,
        score,
        reason: ⁠ Run support edge: ${g.away} ${g.model.awayRun}/100 vs ${g.home} ${g.model.homeRun}/100 ⁠
      };
    })
    .filter(m => m.score >= 80)
    .sort((a, b) => b.score - a.score);

  box.innerHTML = autoMoneyline.length
    ? autoMoneyline.map(m => `
      <div class="model-card premium-card">
        <h3>💰 ${m.team}</h3>
        <span class="score-badge">POPS Rating: ${(m.score / 10).toFixed(1)}/10 | ${gradeFromScore(m.score)}</span>
        <p><strong>${m.game}</strong></p>
        <p><strong>POPS Score:</strong> ${m.score}/100</p>
        <p>${m.reason}</p>
      </div>
    `).join("")
    : loadingCard("No moneyline picks 80+ found yet.");
}

// ---------- Render NRFI ----------

function renderNRFI(gameModels) {
  const box = $("nrfiPicks");
  if (!box) return;

  const manualNRFI =
    window.todayData && Array.isArray(window.todayData.eliteNRFI)
      ? window.todayData.eliteNRFI.filter(n => Number(n.score || 0) >= 80)
      : [];

  if (manualNRFI.length) {
    box.innerHTML = manualNRFI.map(n => `
      <div class="model-card premium-card">
        <h3>🚦 ${n.game}</h3>
        <p><strong>${n.pick}</strong></p>
        <p><strong>Score:</strong> ${n.score}/100</p>
        <p><strong>Rating:</strong> ${ratingFromScore(n.score)}/10</p>
        <p><strong>Tier:</strong> ${gradeFromScore(n.score)}</p>
        <p>${n.reason || ""}</p>
      </div>
    `).join("");
    return;
  }

  const filtered = gameModels
    .filter(g => g.model.nrfiScore >= 80)
    .sort((a, b) => b.model.nrfiScore - a.model.nrfiScore);

  box.innerHTML = filtered.length
    ? filtered.map(g => `
      <div class="model-card premium-card">
        <h3>${g.nrfiLabel}</h3>
        <p><strong>${g.away} vs ${g.home}</strong></p>
        <p><strong>Score:</strong> ${g.model.nrfiScore}/100</p>
        <p><strong>Rating:</strong> ${ratingFromScore(g.model.nrfiScore)}/10</p>
        <p><strong>Tier:</strong> ${gradeFromScore(g.model.nrfiScore)}</p>
      </div>
    `).join("")
    : loadingCard("No NRFI picks 80+ found yet.");
}

// ---------- Render HR Picks ----------

function renderHRPicks(games, hitterStats, pitcherStats) {
  const box = $("dailyHRPicks");
  if (!box) return;

  const manualHR =
    window.todayData && Array.isArray(window.todayData.hrPicks)
      ? window.todayData.hrPicks.filter(p => Number(p.score || 0) >= 80)
      : [];

  if (manualHR.length) {
    box.innerHTML = manualHR.map((p, i) => `
      <div class="model-card premium-card">
        <h3>💣 #${i + 1} ${p.player}</h3>
        <span class="score-badge">POPS Rating: ${(p.score / 10).toFixed(1)}/10 | ${gradeFromScore(p.score)}</span>
        <p><strong>Matchup:</strong> ${p.matchup || ""}</p>
        <p>${p.reason || ""}</p>
      </div>
    `).join("");
    return;
  }

  const hitters = Object.values(hitterStats || {});
  const picks = [];

  games.forEach(game => {
    const away = getTeamName(game, "away");
    const home = getTeamName(game, "home");
    const awayPitcher = getPitcherName(game, "away");
    const homePitcher = getPitcherName(game, "home");

    const awayRisk = hrRiskScore(awayPitcher, pitcherStats);
    const homeRisk = hrRiskScore(homePitcher, pitcherStats);

    hitters.forEach(h => {
      if (h.team === away) {
        picks.push({
          player: h.name,
          matchup: ⁠ vs ${homePitcher} ⁠,
          score: hitterHRScore(h, homeRisk)
        });
      }

      if (h.team === home) {
        picks.push({
          player: h.name,
          matchup: ⁠ vs ${awayPitcher} ⁠,
          score: hitterHRScore(h, awayRisk)
        });
      }
    });
  });

  const filtered = picks
    .filter(p => p.score >= 80)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  box.innerHTML = filtered.length
    ? filtered.map(p => `
      <div class="model-card premium-card">
        <h3>💣 ${p.player}</h3>
        <p>${p.matchup}</p>
        <p><strong>POPS HR Score:</strong> ${p.score}/100</p>
        <p><strong>POPS Rating:</strong> ${ratingFromScore(p.score)}/10</p>
        <p><strong>Tier:</strong> ${gradeFromScore(p.score)}</p>
      </div>
    `).join("")
    : loadingCard("No HR picks 80+ found yet.");
}

// ---------- Render Hit Targets ----------

function renderHitTargets(games, hitterStats) {
  const box = $("batterStatsList");
  if (!box) return;

  const manualHits =
    window.todayData && Array.isArray(window.todayData.batterStats)
      ? window.todayData.batterStats.filter(p => Number(p.score || 0) >= 80)
      : [];

  if (manualHits.length) {
    box.innerHTML = manualHits.map((p, i) => `
      <div class="model-card premium-card">
        <h3>⚾ #${i + 1} ${p.player}</h3>
        <span class="score-badge">POPS Rating: ${(p.score / 10).toFixed(1)}/10 | ${gradeFromScore(p.score)}</span>
        <p><strong>Matchup:</strong> ${p.matchup || ""}</p>
        <p>${p.reason || p.why || ""}</p>
      </div>
    `).join("");
    return;
  }

  const hitters = Object.values(hitterStats || {});
  const picks = [];

  games.forEach(game => {
    const away = getTeamName(game, "away");
    const home = getTeamName(game, "home");
    const awayPitcher = getPitcherName(game, "away");
    const homePitcher = getPitcherName(game, "home");

    hitters.forEach(h => {
      if (h.team === away) {
        picks.push({
          player: h.name,
          matchup: ⁠ vs ${homePitcher} ⁠,
          score: hitterHitScore(h)
        });
      }

      if (h.team === home) {
        picks.push({
          player: h.name,
          matchup: ⁠ vs ${awayPitcher} ⁠,
          score: hitterHitScore(h)
        });
      }
    });
  });

  const filtered = picks
    .filter(p => p.score >= 80)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);

  box.innerHTML = filtered.length
    ? filtered.map(p => `
      <div class="model-card premium-card">
        <h3>⚾ ${p.player}</h3>
        <p>${p.matchup}</p>
        <p><strong>POPS Hit Score:</strong> ${p.score}/100</p>
        <p><strong>POPS Rating:</strong> ${ratingFromScore(p.score)}/10</p>
        <p><strong>Tier:</strong> ${gradeFromScore(p.score)}</p>
      </div>
    `).join("")
    : loadingCard("No hit targets 80+ found yet.");
}

// ---------- Start ----------
function renderAutoMoneyline(picks = []) {
  const box = $("moneylinePicks");
  if (!box) return;

  box.innerHTML = picks.length
    ? picks.map(p => `
      <div class="model-card premium-card">
        <h3>💰 ${p.pick}</h3>
        <span class="score-badge">POPS Rating: ${(p.score / 10).toFixed(1)}/10 | ${gradeFromScore(p.score)}</span>
        <p><strong>${p.game}</strong></p>
        <p><strong>Score:</strong> ${p.score}/100</p>
        <p>${p.reason}</p>
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
        <span class="score-badge">POPS Rating: ${(p.score / 10).toFixed(1)}/10 | ${gradeFromScore(p.score)}</span>
        <p>${p.reason}</p>
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
        <span class="score-badge">HR Risk: ${p.score}/100 | ${gradeFromScore(p.score)}</span>
        <p>${p.reason}</p>
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
        <p><strong>${p.game}</strong></p>
        <p>${p.matchup}</p>
        <span class="score-badge">POPS Rating: ${(p.score / 10).toFixed(1)}/10 | ${gradeFromScore(p.score)}</span>
        <p>${p.reason}</p>
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
        <p><strong>${p.game}</strong></p>
        <p>${p.matchup}</p>
        <span class="score-badge">POPS Rating: ${(p.score / 10).toFixed(1)}/10 | ${gradeFromScore(p.score)}</span>
        <p>${p.reason}</p>
      </div>
    `).join("")
    : loadingCard("No hit targets 80+ found yet.");
}window.addEventListener("DOMContentLoaded", loadAutoSlate);
