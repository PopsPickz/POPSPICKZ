async function loadMLBScores() {
  const today = new Date().toISOString().split("T")[0];
  const url = ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today} ⁠;

  const ticker = document.querySelector(".ticker");

  try {
    const response = await fetch(url);
    const data = await response.json();

    ticker.innerHTML = "";

    if (!data.dates || data.dates.length === 0) {
      ticker.innerHTML = "<div>No MLB games today</div>";
      return;
    }

    data.dates[0].games.forEach(game => {
      const away = game.teams.away.team.abbreviation;
      const home = game.teams.home.team.abbreviation;
      const awayScore = game.teams.away.score ?? 0;
      const homeScore = game.teams.home.score ?? 0;
      const status = game.status.detailedState;

      const gameBox = document.createElement("div");
      gameBox.innerHTML = ⁠ ⚾ ${away} ${awayScore} - ${home} ${homeScore}<br><small>${status}</small> ⁠;

      ticker.appendChild(gameBox);
    });

  } catch (error) {
    ticker.innerHTML = "<div>Unable to load MLB scores</div>";
    console.error(error);
  }
}

function showCheatSheet() {
  alert("🔥 POPS Pickz Cheat Sheet coming soon!");
}

loadMLBScores();
setInterval(loadMLBScores, 60000);