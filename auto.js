// ===============================
// POPS Pickz 6.0 — auto.js v2.1
// Auto-loads MLB slate + models
// Filters site to 8.0+ plays only
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

    if (!games.length) {
      slateBox.innerHTML = loadingCard("No MLB games found today.");
      return;
    }

    const gameModels = await Promise.all(
      games.map(game => buildAutoGame(game, teamStats, pitcherStats))
    );

    // POPS Pickz 6.0 Score Engine
    const scoredGames = gameModels
      .map(game => {
        const moneylineModel = buildMoneylineModel(game);

        return scorePlay(
          {
            ...game,
            model: {
              ...game.model,
              moneylineModel
            },
            popsModel: moneylineModel
          },
          "moneyline"
        );
      })
      .filter(game => game.showOnSite);

    renderSlate(scoredGames, slateBox);
    renderPitcherTargets(scoredGames);
    renderMoneyline(scoredGames);
    renderNRFI(scoredGames);
    renderHRPicks(games, hitterStats, pitcherStats);
    renderHitTargets(games, hitterStats);

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
  return Number((score / 10).toFixed(1));
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
        <p><strong>Weather:</strong> ${g.weather.temp}, Wind ${g.weather.wind}</p>

        <p><strong>POPS Rating:</strong> ${g.rating}/10</p>
        <p><strong>Tier:</strong> ${g.tier}</p>

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
    : loadingCard("No Strong+ POPS plays found yet.");
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
      <div class="model-card">
        <h3>${targetGrade(p.risk)} ${p.pitcher}</h3>
        <p><strong>Team:</strong> ${p.team}</p>
        <p><strong>Opponent:</strong> ${p.opponent}</p>
        <p><strong>HR Risk:</strong> ${p.risk}/100</p>
        <p><strong>Tier:</strong> ${gradeFromScore(p.risk)}</p>
      </div>
    `).join("")
    : loadingCard("No pitcher targets 80+ found yet.");
}

// ---------- Render Moneyline ----------

function renderMoneyline(gameModels) {
  const box = $("moneylinePicks");
  if (!box) return;

  box.innerHTML = gameModels.length
    ? gameModels.map(g => {
      const edge =
        g.model.moneyline === g.home
          ? g.model.homeRun - g.model.awayRun
          : g.model.awayRun - g.model.homeRun;

      const confidence = Math.max(80, Math.min(98, Math.round(70 + Math.abs(edge))));
      const rating = ratingFromScore(confidence);

      return `
        <div class="model-card">
          <h3>💰 ${g.model.moneyline}</h3>
          <p><strong>${g.away} vs ${g.home}</strong></p>
          <p><strong>POPS Rating:</strong> ${g.rating}/10</p>
          <p><strong>Tier:</strong> ${g.tier}</p>
          <p><strong>Confidence:</strong> ${confidence}/100</p>
          <p><strong>Display Rating:</strong> ${rating}/10</p>
          <p><strong>Run Support:</strong> ${g.away} ${g.model.awayRun}/100 vs ${g.home} ${g.model.homeRun}/100</p>
        </div>
      `;
    }).join("")
    : loadingCard("No moneyline picks 8.0+ found yet.");
}

// ---------- Render NRFI ----------

function renderNRFI(gameModels) {
  const box = $("nrfiPicks");
  if (!box) return;

  const filtered = gameModels
    .filter(g => g.model.nrfiScore >= 80)
    .sort((a, b) => b.model.nrfiScore - a.model.nrfiScore);

  box.innerHTML = filtered.length
    ? filtered.map(g => `
      <div class="model-card">
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
      <div class="model-card">
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
      <div class="model-card">
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

window.addEventListener("DOMContentLoaded", loadAutoSlate);
