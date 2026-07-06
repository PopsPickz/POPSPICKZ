async function loadAutoSlate() {
  const slateBox = document.getElementById("gameList");
  if (!slateBox) return;

  const today = new Date().toISOString().split("T")[0];

  const url =
    ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher ⁠;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const games = data.dates?.[0]?.games || [];

    if (!games.length) {
      slateBox.innerHTML = "<p>No MLB games found today.</p>";
      return;
    }

    slateBox.innerHTML = games.map(g => {
      const away = g.teams.away.team.name;
      const home = g.teams.home.team.name;
      const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
      const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";
      const gameTime = new Date(g.gameDate).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      });

      return `
        <div class="game-card">
          <h3>${away} vs ${home}</h3>
          <p><strong>Time:</strong> ${gameTime}</p>
          <p><strong>${away} Pitcher:</strong> ${awayPitcher}</p>
          <p><strong>${home} Pitcher:</strong> ${homePitcher}</p>
        </div>
      `;
    }).join("");

  } catch (err) {
    slateBox.innerHTML = "<p>Could not load MLB slate.</p>";
    console.error(err);
  }
}

loadAutoSlate();
