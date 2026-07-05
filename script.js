document.querySelector(".ticker").innerHTML =
  "<div>✅ JavaScript is working</div>";
async function loadGameCenter() {
  const today = new Date().toISOString().split("T")[0];
  const url = "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=" + today;

  const gameCenter = document.querySelector("#gameCenter");
  if (!gameCenter) return;

  try {
    const response = await fetch(url);
    const data = await response.json();

    gameCenter.innerHTML = "";

    if (!data.dates || data.dates.length === 0) {
      gameCenter.innerHTML = "<div>No MLB games today</div>";
      return;
    }

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

  } catch (error) {
    gameCenter.innerHTML = "<div>Unable to load Game Center</div>";
  }
}

loadGameCenter();
setInterval(loadGameCenter, 60000);

function loadDailyHRPicks() {
  const section = document.getElementById("dailyHRPicks");

  if (!section) return;
  if (!popsData || !popsData.hrPicks) return;

  section.innerHTML = "";

  popsData.hrPicks.forEach(function(player) {
    section.innerHTML +=
      "<div class='model-card bomb-card'>" +
      "<h3>💣 " + player.player + "</h3>" +
      "<p>" + player.matchup + "</p>" +
      "<span>" + player.grade + "</span>" +
      "</div>";
  });
}

loadDailyHRPicks();

function loadPitcherTargets() {
  const section = document.getElementById("pitcherTargets");

  if (!section) return;
  if (!popsData || !popsData.pitcherTargets) return;

  section.innerHTML = "";

  popsData.pitcherTargets.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>🎯 " + item.pitcher + "</h3>" +
      "<p>" + item.stats + "</p>" +
      "<span>POPS Target Grade: " + item.grade + "</span>" +
      "</div>";
  });
}

loadPitcherTargets();

function loadMoneylinePicks() {
  const section = document.getElementById("moneylinePicks");

  if (!section) return;
  if (!popsData || !popsData.moneylinePicks) return;

  section.innerHTML = "";

  popsData.moneylinePicks.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>💰 " + item.team + "</h3>" +
      "<p>" + item.reason + "</p>" +
      "<span>Confidence: " + item.confidence + "</span>" +
      "</div>";
  });
}

loadMoneylinePicks();

[7/5/26, 1:50:53 PM] Sean g: ]
[7/5/26, 1:52:57 PM] Sean g: function loadWeatherBoosts() {
  const section = document.getElementById("weatherBoosts");

  if (!section) return;
  if (!popsData || !popsData.weatherBoosts) return;

  section.innerHTML = "";

  popsData.weatherBoosts.forEach(function(item) {
    section.innerHTML +=
      "<div class='model-card'>" +
      "<h3>🌦 " + item.stadium + "</h3>" +
      "<p>" + item.condition + "</p>" +
      "<span>HR Weather Boost: " + item.boost + "</span>" +
      "</div>";
  });
}

loadWeatherBoosts();
