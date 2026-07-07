const scoresBox = document.getElementById("scoresBox");
const lineupsBox = document.getElementById("lineupsBox");
const hrBox = document.getElementById("hrBox");

async function loadMLBData() {
  const today = new Date().toISOString().split("T")[0];

  const scheduleURL = ⁠ `https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher` ⁠;

  try {
    const response = await fetch(scheduleURL);

    if (!response.ok) {
      throw new Error("Failed to load MLB schedule");
    }

    const data = await response.json();

    const games = data.dates?.[0]?.games || [];

    if (games.length === 0) {
      scoresBox.innerHTML = "<p>No MLB games scheduled today.</p>";
      lineupsBox.innerHTML = "<p>No lineups available.</p>";
      hrBox.innerHTML = "<p>No home runs today.</p>";
      return;
    }

    scoresBox.innerHTML = "";

    games.forEach((game) => {
      const away = game.teams.away.team.name;
      const home = game.teams.home.team.name;

      const awayScore = game.teams.away.score ?? "-";
      const homeScore = game.teams.home.score ?? "-";

      const status = game.status.detailedState;

      const awayPitcher =
        game.teams.away.probablePitcher?.fullName || "TBD";

      const homePitcher =
        game.teams.home.probablePitcher?.fullName || "TBD";

      scoresBox.innerHTML += `
        <div style="border:1px solid #ccc;padding:15px;margin-bottom:15px;border-radius:10px;">
          <h3>${away} vs ${home}</h3>

          <p><strong>Score:</strong> ${awayScore} - ${homeScore}</p>

          <p><strong>Status:</strong> ${status}</p>

          <p><strong>Probable Pitchers</strong></p>

          <p>${awayPitcher}</p>

          <p>vs</p>

          <p>${homePitcher}</p>

        </div>
      `;
    });

    lineupsBox.innerHTML =
      "<p>🚧 Live lineups will be added in Step 2.</p>";

    hrBox.innerHTML =
      "<p>💣 Live Home Run Tracker will be added in Step 3.</p>";

  } catch (error) {
    console.error(error);

    scoresBox.innerHTML =
      "<p>❌ Unable to load MLB scores.</p>";

    lineupsBox.innerHTML =
      "<p>❌ Unable to load lineups.</p>";

    hrBox.innerHTML =
      "<p>❌ Unable to load home run tracker.</p>";
  }
}

loadMLBData();

setInterval(loadMLBData, 60000);
