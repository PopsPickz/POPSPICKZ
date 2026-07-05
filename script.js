// POPS PICKZ 2.0 SCRIPT
// Live MLB scores + daily POPS dashboard

async function fetchMLBData() {
  const today = new Date().toISOString().split("T")[0];
  const url = "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=" + today;

  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error("MLB data error:", error);
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
      "⚾ " + away + " " + awayScore + " - " + home + " " + homeScore +
      "<br><small>" + status + "</small>";

    ticker.appendChild(box);
  });
}

async function loadGameCenter() {
  const gameCenter = document.querySelector("#gameCenter");
  if (!gameCenter) return;

  gameCenter.innerHTML = "<div>Loading today’s MLB games...</div>";

  const data = await fetchMLBData();

  if (!data || !data.dates || data.dates.length === 0) {
    gameCenter.innerHTML = "<div>No MLB games today</div>";
    return;
  }

  gameCenter.innerHTML = "";

  data.dates[0].games.forEach(function(game) {
    const away = game.teams.away.team.name;
    const home = game.teams.home.team.name;
    const awayScore = game.teams.away.score || 0;
    const homeScore = game.teams.home.score || 0;
    const status = game.status.detailedState;

    const card = document.createElement("div");
    card.className = "game-card";
    card.innerHTML =
      "<h3>" + away + " vs " + home + "</h3>" +
      "<p>" + awayScore + " - " + homeScore + "</p>" +
      "<span>" + status + "</span>";

    gameCenter.appendChild(card);
  });
}

function loadHRPicks() {
  const section = document.getElementById("dailyHRPicks");
  if (!section || typeof todayData === "undefined") return;

  section.innerHTML = "";

  todayData.hrPicks.forEach(function(player) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>💣 " + player.player + "</h3>" +
      "<p>" + player.matchup + "</p>" +
      "<p>" + player.note + "</p>" +
      "<span class='score-badge'>POPS Score: " + player.popsScore + "/100</span>" +
      "</div>";
  });
}

function loadPitcherTargets() {
  const section = document.getElementById("pitcherTargets");
  if (!section || typeof todayData === "undefined") return;

  section.innerHTML = "";

  todayData.pitcherTargets.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>🎯 " + item.pitcher + "</h3>" +
      "<p>" + item.stats + "</p>" +
      "<span>POPS Target Grade: " + item.grade + "</span>" +
      "</div>";
  });
}

function loadMoneyline() {
  const section = document.getElementById("moneylinePicks");
  if (!section || typeof todayData === "undefined") return;

  section.innerHTML = "";

  todayData.moneyline.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>💰 " + item.team + "</h3>" +
      "<p>" + item.reason + "</p>" +
      "<span>Confidence: " + item.confidence + "</span>" +
      "</div>";
  });
}

function loadWeather() {
  const section = document.getElementById("weatherBoosts");
  if (!section || typeof todayData === "undefined") return;

  section.innerHTML = "";

  todayData.weather.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>🌦 " + item.stadium + "</h3>" +
      "<p>" + item.condition + "</p>" +
      "<span>HR Weather Boost: " + item.boost + "</span>" +
      "</div>";
  });
}

function loadNRFI() {
  const section = document.getElementById("nrfiPicks");
  if (!section || typeof todayData === "undefined") return;

  section.innerHTML = "";

  todayData.nrfi.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>🚦 " + item.game + "</h3>" +
      "<p>Pick: " + item.pick + "</p>" +
      "<span>Confidence: " + item.confidence + "</span>" +
      "</div>";
  });
}

function showCheatSheet() {
  alert("🔥 POPS Pickz Daily Cheat Sheet is loaded from today.js!");
}

function initDashboard() {
  loadMLBScores();
  loadGameCenter();
  loadHRPicks();
  loadPitcherTargets();
  loadMoneyline();
  loadWeather();
  loadNRFI();
}

initDashboard();
setInterval(loadMLBScores, 60000);
setInterval(loadGameCenter, 60000);
