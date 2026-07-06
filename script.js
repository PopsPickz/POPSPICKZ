function safeArray(name) {
  if (typeof todayData === "undefined") return [];
  return Array.isArray(todayData[name]) ? todayData[name] : [];
}

function calculatePopsScore(player) {
  let score = 0;
  score += Math.min(Number(player.barrel || 0), 25);
  score += Math.min(Number(player.hardHit || 0), 20);
  score += Math.min(Number(player.iso || 0) * 40, 15);
  score += Math.min(Number(player.hr9 || 0) * 10, 20);
  score += Math.min(Number(player.weather || 0), 10);
  score += Math.min(Number(player.ballpark || 0), 10);
  score += Math.min(Number(player.platoon || 0), 10);
  return Math.round(Math.min(score, 100));
}

async function fetchMLBData() {
  const today = new Date().toISOString().split("T")[0];
  const url =
    "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=" +
    today +
    "&hydrate=probablePitcher";

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("MLB API error:", error);
    return null;
  }
}

async function loadMLBScores() {
  const ticker = document.querySelector(".ticker");
  if (!ticker) return;

  ticker.innerHTML = "<div>Loading live MLB scores...</div>";

  const data = await fetchMLBData();

  if (!data || !data.dates || data.dates.length === 0) {
    ticker.innerHTML = "<div>No MLB games today</div>";
    return;
  }

  ticker.innerHTML = "";

  data.dates[0].games.forEach(function(game) {
    const away = game.teams.away.team.name;
    const home = game.teams.home.team.name;
    const awayScore = game.teams.away.score || 0;
    const homeScore = game.teams.home.score || 0;
    const status = game.status.detailedState;

    const box = document.createElement("div");
    box.innerHTML =
      "⚾ " +
      away +
      " " +
      awayScore +
      " - " +
      home +
      " " +
      homeScore +
      "<br><small>" +
      status +
      "</small>";

    ticker.appendChild(box);
  });
}

/* IMPORTANT:
   Slate now comes from today.js only.
   No more wrong MLB API games in the slate.
*/
function loadDailySlate() {
  const slateList = document.getElementById("slateList");
  if (!slateList) return;

  const games = safeArray("games");

  if (games.length === 0) {
    slateList.innerHTML =
      "<div class='model-card'>No POPS games loaded in today.js.</div>";
    return;
  }

  slateList.innerHTML = "";

  games.forEach(function(game) {
    const card = document.createElement("div");
    card.className = "game-card clickable-game";

    card.innerHTML =
      "<h3>" +
      game.game +
      "</h3>" +
      "<p>" +
      game.pitchers.away.name +
      " vs " +
      game.pitchers.home.name +
      "</p>" +
      "<p>" +
      (game.venue || "Venue TBD") +
      "</p>" +
      "<span>" +
      (game.time || "Time TBD") +
      "</span>" +
      "<p><small>Tap for POPS breakdown</small></p>";

    card.onclick = function() {
      showGameBreakdown(game.game);
    };

    slateList.appendChild(card);
  });
}

function showGameBreakdown(gameName) {
  const section = document.getElementById("gameBreakdownContent");
  if (!section) return;

  const games = safeArray("games");

  const game = games.find(function(g) {
    return g.game === gameName;
  });

  if (!game) {
    section.innerHTML =
      "<div class='model-card'>" +
      "<h3>No game data found.</h3>" +
      "<p>This game is clickable, but today.js does not have a matching POPS breakdown yet.</p>" +
      "<p><strong>Needed game name:</strong> " +
      gameName +
      "</p>" +
      "</div>";
    return;
  }

  section.innerHTML =
    "<div class='model-card premium-card'>" +
    "<h2>⚾ " +
    game.game +
    "</h2>" +
    "<p><strong>Time:</strong> " +
    (game.time || "TBD") +
    "</p>" +
    "<p><strong>Venue:</strong> " +
    (game.venue || "TBD") +
    "</p>" +
    "<p><strong>POPS Final Grade:</strong> " +
    (game.finalGrade || "TBD") +
    "</p>" +
    "</div>" +

    "<div class='model-card'>" +
    "<h3>💰 POPS Moneyline</h3>" +
    "<p><strong>Pick:</strong> " +
    game.moneylinePick.pick +
    "</p>" +
    "<p><strong>Confidence:</strong> " +
    game.moneylinePick.confidence +
    "</p>" +
    "<p><strong>Vegas Line:</strong> " +
    (game.moneylinePick.line || "TBD") +
    "</p>" +
    "<p>" +
    game.moneylinePick.reason +
    "</p>" +
    "</div>" +

    "<div class='model-card'>" +
    "<h3>🎯 Starting Pitchers</h3>" +
    formatPitcher(game.pitchers.away) +
    "<hr>" +
    formatPitcher(game.pitchers.home) +
    "</div>" +

    "<div class='model-card'>" +
    "<h3>📊 Premium Hit Targets</h3>" +
    formatPremiumHitCards(game.hitTargets) +
    "</div>" +

    "<div class='model-card'>" +
    "<h3>💣 Home Run Model</h3>" +
    formatGameTargets(game.hrTargets) +
    "</div>" +

    "<div class='model-card'>" +
    "<h3>🌦 Weather Center</h3>" +
    "<p><strong>Temperature:</strong> " +
    (game.weather.temp || "TBD") +
    "</p>" +
    "<p><strong>Wind:</strong> " +
    (game.weather.wind || "TBD") +
    " " +
    (game.weather.direction || "") +
    "</p>" +
    "<p><strong>Rain:</strong> " +
    (game.weather.rain || "TBD") +
    "</p>" +
    "<p><strong>HR Boost:</strong> " +
    (game.weather.score || "TBD") +
    "</p>" +
    "</div>" +

    "<div class='model-card'>" +
    "<h3>🚦 NRFI / YRFI Model</h3>" +
    "<p><strong>Pick:</strong> " +
    game.nrfi.pick +
    "</p>" +
    "<p><strong>Confidence:</strong> " +
    game.nrfi.confidence +
    "</p>" +
    "<p>" +
    game.nrfi.reason +
    "</p>" +
    "</div>" +

    "<div class='model-card'>" +
    "<h3>📈 Team Comparison</h3>" +
    "<p><strong>Starting Pitching:</strong> " +
    ((game.teamEdge && game.teamEdge.startingPitching) || "TBD") +
    "</p>" +
    "<p><strong>Bullpen:</strong> " +
    ((game.teamEdge && game.teamEdge.bullpen) || "TBD") +
    "</p>" +
    "<p><strong>Offense:</strong> " +
    ((game.teamEdge && game.teamEdge.offense) || "TBD") +
    "</p>" +
    "<p><strong>Defense:</strong> " +
    ((game.teamEdge && game.teamEdge.defense) || "TBD") +
    "</p>" +
    "<p><strong>Recent Form:</strong> " +
    ((game.teamEdge && game.teamEdge.recentForm) || "TBD") +
    "</p>" +
    "</div>";

  const breakdown = document.getElementById("gameBreakdown");
  if (breakdown) {
    breakdown.scrollIntoView({ behavior: "smooth" });
  }
}

function formatPitcher(pitcher) {
  if (!pitcher) return "<p>No pitcher data loaded.</p>";

  return (
    "<p><strong>" +
    pitcher.name +
    " - " +
    pitcher.team +
    "</strong></p>" +
    "<p>" +
    (pitcher.stats || "No pitcher notes loaded.") +
    "</p>" +
    "<p><strong>ERA:</strong> " +
    (pitcher.era || "TBD") +
    "</p>" +
    "<p><strong>WHIP:</strong> " +
    (pitcher.whip || "TBD") +
    "</p>" +
    "<p><strong>HR/9:</strong> " +
    (pitcher.hr9 || "TBD") +
    "</p>" +
    "<p><strong>Hard-Hit Allowed:</strong> " +
    (pitcher.hardHit || "TBD") +
    "</p>" +
    "<p><strong>Barrel Allowed:</strong> " +
    (pitcher.barrel || "TBD") +
    "</p>" +
    "<span>Danger Rating: " +
    (pitcher.risk || "TBD") +
    "</span>"
  );
}

function formatGameTargets(players) {
  if (!players || players.length === 0) {
    return "<p>No targets loaded.</p>";
  }

  let html = "<ol>";

  players.forEach(function(player) {
    html +=
      "<li>" +
      "<strong>" +
      player.player +
      "</strong><br>" +
      "<span>POPS Score: " +
      (player.score || "TBD") +
      "</span><br>" +
      "<small>" +
      (player.reason || "Strong POPS profile.") +
      "</small>" +
      "</li><br>";
  });

  html += "</ol>";
  return html;
}

function formatPremiumHitCards(players) {
  if (!players || players.length === 0) {
    return "<p>No premium hitter cards loaded.</p>";
  }

  let html = "";

  players.forEach(function(player, index) {
    html +=
      "<div class='model-card premium-card'>" +
      "<h3>📊 #" +
      (index + 1) +
      " " +
      player.player +
      "</h3>" +
      "<span class='score-badge'>POPS Hit Score: " +
      (player.hitScore || player.score || "TBD") +
      "</span>" +
      "<p><strong>Matchup:</strong> " +
      (player.matchup || "N/A") +
      "</p>" +
      "<p><strong>AVG:</strong> " +
      (player.avg || "TBD") +
      " • <strong>OBP:</strong> " +
      (player.obp || "TBD") +
      "</p>" +
      "<p><strong>SLG:</strong> " +
      (player.slg || "TBD") +
      " • <strong>OPS:</strong> " +
      (player.ops || "TBD") +
      "</p>" +
      "<p><strong>xBA:</strong> " +
      (player.xBA || "TBD") +
      " • <strong>Hard Hit:</strong> " +
      (player.hardHit || "TBD") +
      "</p>" +
      "<p><strong>Barrel:</strong> " +
      (player.barrel || "TBD") +
      " • <strong>Line Drive:</strong> " +
      (player.lineDrive || "TBD") +
      "</p>" +
      "<p><strong>K%:</strong> " +
      (player.strikeout || "TBD") +
      " • <strong>BB%:</strong> " +
      (player.walk || "TBD") +
      "</p>" +
      "<p><strong>Hits Last 10:</strong> " +
      (player.hitsLast10 || "TBD") +
      "</p>" +
      "<p><strong>Split:</strong> " +
      (player.splits || "TBD") +
      "</p>" +
      "<p><strong>Pitcher Matchup:</strong> " +
      (player.pitcherMatchup || "TBD") +
      "</p>" +
      "<p><strong>Why POPS likes it:</strong> " +
      (player.why || player.reason || "Strong POPS hit profile.") +
      "</p>" +
      "</div>";
  });

  return html;
}

function loadHRPicks() {
  const section = document.getElementById("dailyHRPicks");
  const picks = safeArray("hrPicks");

  if (!section) return;

  if (picks.length === 0) {
    section.innerHTML = "<div class='model-card'>No HR picks loaded.</div>";
    return;
  }

  const ranked = picks.slice().sort(function(a, b) {
    return calculatePopsScore(b) - calculatePopsScore(a);
  });

  section.innerHTML = "";

  ranked.forEach(function(player, index) {
    const score = calculatePopsScore(player);

    section.innerHTML +=
      "<div class='model-card premium-card'>" +
      "<h3>💣 #" +
      (index + 1) +
      " " +
      player.player +
      "</h3>" +
      "<p><strong>Matchup:</strong> " +
      (player.matchup || "N/A") +
      "</p>" +
      "<p>Barrel: " +
      (player.barrel || "N/A") +
      "% • Hard Hit: " +
      (player.hardHit || "N/A") +
      "%</p>" +
      "<p>ISO: " +
      (player.iso || "N/A") +
      " • Pitcher HR/9: " +
      (player.hr9 || "N/A") +
      "</p>" +
      "<span class='score-badge'>POPS Score: " +
      score +
      "/100</span>" +
      "</div>";
  });
}

function loadBatterStats() {
  const section = document.getElementById("batterStatsList");
  const stats = safeArray("batterStats");

  if (!section) return;

  if (stats.length === 0) {
    section.innerHTML = "<div class='model-card'>No batter stats loaded.</div>";
    return;
  }

  section.innerHTML = "";

  stats.forEach(function(player) {
    section.innerHTML +=
      "<div class='model-card premium-card'>" +
      "<h3>📊 " +
      player.player +
      "</h3>" +
      "<span class='score-badge'>Hit Score: " +
      (player.hitScore || "TBD") +
      "</span>" +
      "<p><strong>Matchup:</strong> " +
      (player.matchup || "N/A") +
      "</p>" +
      "<p><strong>AVG:</strong> " +
      (player.avg || "TBD") +
      " • <strong>OBP:</strong> " +
      (player.obp || "TBD") +
      "</p>" +
      "<p><strong>SLG:</strong> " +
      (player.slg || "TBD") +
      " • <strong>OPS:</strong> " +
      (player.ops || "TBD") +
      "</p>" +
      "<p><strong>xBA:</strong> " +
      (player.xBA || "TBD") +
      " • <strong>Hard Hit:</strong> " +
      (player.hardHit || "TBD") +
      "</p>" +
      "<p><strong>Barrel:</strong> " +
      (player.barrel || "TBD") +
      " • <strong>Line Drive:</strong> " +
      (player.lineDrive || "TBD") +
      "</p>" +
      "<p><strong>K%:</strong> " +
      (player.strikeout || "TBD") +
      " • <strong>BB%:</strong> " +
      (player.walk || "TBD") +
      "</p>" +
      "<p><strong>Hits Last 10:</strong> " +
      (player.hitsLast10 || "TBD") +
      "</p>" +
      "<p><strong>Split:</strong> " +
      (player.splits || "TBD") +
      "</p>" +
      "<p><strong>Why POPS likes it:</strong> " +
      (player.why || player.reason || "Strong POPS hit profile.") +
      "</p>" +
      "</div>";
  });
}

function loadPitcherTargets() {
  const section = document.getElementById("pitcherTargets");
  const items = safeArray("pitcherTargets");

  if (!section) return;

  if (items.length === 0) {
    section.innerHTML =
      "<div class='model-card'>No pitcher targets loaded.</div>";
    return;
  }

  section.innerHTML = "";

  items.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>🎯 " +
      item.pitcher +
      "</h3>" +
      "<p>" +
      (item.stats || "No stats entered") +
      "</p>" +
      "<span>" +
      (item.grade || "") +
      "</span>" +
      "</div>";
  });
}

function loadMoneyline() {
  const section = document.getElementById("moneylinePicks");
  const items = safeArray("moneyline");

  if (!section) return;

  if (items.length === 0) {
    section.innerHTML =
      "<div class='model-card'>No moneyline picks loaded.</div>";
    return;
  }

  section.innerHTML = "";

  items.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>💰 " +
      item.team +
      "</h3>" +
      "<p>" +
      (item.reason || "No reason entered") +
      "</p>" +
      "<span>Confidence: " +
      (item.confidence || "N/A") +
      "</span>" +
      "</div>";
  });
}

function loadWeather() {
  const section = document.getElementById("weatherBoosts");
  const items = safeArray("weather");

  if (!section) return;

  if (items.length === 0) {
    section.innerHTML =
      "<div class='model-card'>No weather data loaded.</div>";
    return;
  }

  section.innerHTML = "";

  items.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>🌦 " +
      (item.stadium || item.game || "Weather") +
      "</h3>" +
      "<p>" +
      (item.condition || "") +
      "</p>" +
      "<span>" +
      (item.boost || item.hrBoost || "") +
      "</span>" +
      "</div>";
  });
}

function loadNRFI() {
  const section = document.getElementById("nrfiPicks");
  const items = safeArray("nrfi");

  if (!section) return;

  if (items.length === 0) {
    section.innerHTML =
      "<div class='model-card'>No NRFI/YRFI picks loaded.</div>";
    return;
  }

  section.innerHTML = "";

  items.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>🚦 " +
      item.game +
      "</h3>" +
      "<p>Pick: " +
      item.pick +
      "</p>" +
      "<p>" +
      (item.reason || "") +
      "</p>" +
      "<span>Confidence: " +
      (item.confidence || "N/A") +
      "</span>" +
      "</div>";
  });
}

function loadSummaryCards() {
  const hr = safeArray("hrPicks");
  const moneyline = safeArray("moneyline");
  const nrfi = safeArray("nrfi");
  const weather = safeArray("weather");

  const topHREl = document.getElementById("topHRPick");
  const bestMoneylineEl = document.getElementById("bestMoneyline");
  const bestNRFIEl = document.getElementById("bestNRFI");
  const bestWeatherEl = document.getElementById("bestWeather");

  if (topHREl) {
    if (hr.length > 0) {
      const top = hr.slice().sort(function(a, b) {
        return calculatePopsScore(b) - calculatePopsScore(a);
      })[0];
      topHREl.textContent = top.player;
    } else {
      topHREl.textContent = "No HR pick";
    }
  }

  if (bestMoneylineEl) {
    bestMoneylineEl.textContent =
      moneyline.length > 0 ? moneyline[0].team : "No moneyline";
  }

  if (bestNRFIEl) {
    bestNRFIEl.textContent =
      nrfi.length > 0 ? nrfi[0].game + " " + nrfi[0].pick : "No NRFI";
  }

  if (bestWeatherEl) {
    bestWeatherEl.textContent =
      weather.length > 0
        ? weather[0].stadium || weather[0].game
        : "No weather";
  }
}

function initDashboard() {
  // loadMLBScores();   // Disabled

loadDailySlate();
loadHRPicks();
loadBatterStats();
loadPitcherTargets();
loadMoneyline();
loadWeather();
loadNRFI();
loadSummaryCards();
}

initDashboard();

setInterval(loadMLBScores, 60000);
