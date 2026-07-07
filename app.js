const scoresBox = document.getElementById("scoresBox");
const lineupsBox = document.getElementById("lineupsBox");
const hrBox = document.getElementById("hrBox");

async function loadMLBData() {
  const today = new Date().toISOString().split("T")[0];

  const scheduleURL = ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher ⁠;
  try {
    const res = await fetch(scheduleURL);
    const data = await res.json();

    const games = data.dates[0]?.games || [];

    if (games.length === 0) {
      scoresBox.innerHTML = "No MLB games today.";
      lineupsBox.innerHTML = "No lineups available.";
      hrBox.innerHTML = "No home runs today.";
      return;
    }

    scoresBox.innerHTML = "";

    games.forEach(game => {
      const away = game.teams.away.team.name;
      const home = game.teams.home.team.name;

      const awayScore = game.teams.away.score ?? 0;
      const homeScore = game.teams.home.score ?? 0;

      const status = game.status.detailedState;

      const awayPitcher = game.teams.away.probablePitcher?.fullName || "TBD";
      const homePitcher = game.teams.home.probablePitcher?.fullName || "TBD";

      scoresBox.innerHTML += `
        <div class="game-card">
          <h3>${away} vs ${home}</h3>
          <p><strong>${away}:</strong> ${awayScore}</p>
          <p><strong>${home}:</strong> ${homeScore}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p><strong>Pitchers:</strong> ${awayPitcher} vs ${homePitcher}</p>
        </div>
      `;
    });

    lineupsBox.innerHTML = "Lineups coming next.";
    hrBox.innerHTML = "Home run tracker coming next.";

  } catch (error) {
    console.error(error);
    scoresBox.innerHTML = "Error loading MLB scores.";
  }
}

loadMLBData();

setInterval(loadMLBData, 60000);
