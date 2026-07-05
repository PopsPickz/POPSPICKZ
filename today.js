// POPS PICKZ v4 CLEAN SCRIPT
// Loads: live scores, slate, hrPicks, batter stats, pitcherTargets, moneyline, weather, nrfi

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

async function loadDailySlate() {
  const slateList = document.getElementById("slateList");
  if (!slateList) return;

  slateList.innerHTML =
    "<div class='model-card'>Loading today’s MLB slate...</div>";

  const data = await fetchMLBData();

  if (!data || !data.dates || data.dates.length === 0) {
    slateList.innerHTML = "<div class='model-card'>No MLB games today</div>";
    return;
  }

  slateList.innerHTML = "";

  data.dates[0].games.forEach(function(game) {
    const away = game.teams.away.team.name;
    const home = game.teams.home.team.name;
    const status = game.status.detailedState;
    const venue = game.venue ? game.venue.name : "Venue TBD";

    const gameTime = new Date(game.gameDate).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    });

    const awayPitcher = game.teams.away.probablePitcher
      ? game.teams.away.probablePitcher.fullName
      : "TBD";

    const homePitcher = game.teams.home.probablePitcher
      ? game.teams.home.probablePitcher.fullName
      : "TBD";

    const card = document.createElement("div");
    card.className = "game-card";

    card.innerHTML =
      "<h3>" +
      away +
      " vs " +
      home +
      "</h3>" +
      "<p>" +
      awayPitcher +
      " vs " +
      homePitcher +
      "</p>" +
      "<p>" +
      venue +
      "</p>" +
      "<span>" +
      gameTime +
      " • " +
      status +
      "</span>";

    slateList.appendChild(card);
  });
}

function loadHRPicks() {
  const section = document.getElementById("dailyHRPicks");
  const picks = safeArray("hrPicks");

  if (!section) return;

  if (picks.length === 0) {
    section.innerHTML = "<div class='model-card'>No HR picks loaded.</div>";
    return;
  }

  const ranked = [...picks].sort(function(a, b) {
    return calculatePopsScore(b) - calculatePopsScore(a);
  });

  section.innerHTML = "";

  ranked.forEach(function(player, index) {
    const score = calculatePopsScore(player);

    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>💣 #" +
      (index + 1) +
      " " +
      player.player +
      "</h3>" +
      "<p><strong>Matchup:</strong> " +
      (player.matchup || "N/A") +
      "</p>" +
      "<p>Barrel: " +
      (player.barrel ?? "N/A") +
      "% • Hard Hit: " +
      (player.hardHit ?? "N/A") +
      "%</p>" +
      "<p>ISO: " +
      (player.iso ?? "N/A") +
      " • Pitcher HR/9: " +
      (player.hr9 ?? "N/A") +
      "</p>" +
      "<span class='score-badge'>POPS Score: " +
      score +
      "/100</span>" +
      "</div>";
  });
}

function loadBatterStats() {
  const section = document.getElementById("batterStatsList");
  const picks = safeArray("hrPicks");

  if (!section) return;

  if (picks.length === 0) {
    section.innerHTML = "<div class='model-card'>No batter stats loaded.</div>";
    return;
  }

  section.innerHTML = "";

  picks.forEach(function(player) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>📊 " +
      player.player +
      "</h3>" +
      "<p><strong>Matchup:</strong> " +
      (player.matchup || "N/A") +
      "</p>" +
      "<p>Barrel: " +
      (player.barrel ?? "N/A") +
      "%</p>" +
      "<p>Hard Hit: " +
      (player.hardHit ?? "N/A") +
      "%</p>" +
      "<p>ISO: " +
      (player.iso ?? "N/A") +
      "</p>" +
      "<p>Pitcher HR/9: " +
      (player.hr9 ?? "N/A") +
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

function initDashboard() {
  loadMLBScores();
  loadDailySlate();
  loadHRPicks();
  loadBatterStats();
  loadPitcherTargets();
  loadMoneyline();
  loadWeather();
  loadNRFI();
}

initDashboard();

setInterval(loadMLBScores, 60000);
setInterval(loadDailySlate, 60000);
