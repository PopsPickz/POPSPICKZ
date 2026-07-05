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
