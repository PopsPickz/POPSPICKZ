async function loadAutoSlate() {
  const slateBox = document.getElementById("slateList");
  if (!slateBox) return;

  slateBox.innerHTML = "<div class='model-card'>Loading POPS Pickz AI slate...</div>";

  try {
    const games = await getTodaysGames();
    const teamStats = await getTeamStats();
    const pitcherStats = await getPitcherStats();

    if (!games.length) {
      slateBox.innerHTML = "<div class='model-card'>No MLB games found today.</div>";
      return;
    }

      const cards = await Promise.all(games.map(async g => {
      const away = g.teams.away.team.name;
      const home = g.teams.home.team.name;
      const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
      const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";
      const venue = g.venue?.name || "Unknown Stadium";
      const weather = await getGameWeather(venue, g.gameDate);      
      const gameTime = new Date(g.gameDate).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      });

      const model = buildGameModel(g, teamStats, pitcherStats);
      const firstInningPick = nrfiPick(model.nrfiScore);
      const awayP = pitcherStats[awayPitcher] || {};
      const homeP = pitcherStats[homePitcher] || {};

      return `
        <div class="slate-card model-card">
          <h3>${away} vs ${home}</h3>
          <p><strong>Time:</strong> ${gameTime}</p>
          <p><strong>Venue:</strong> ${venue}</p>
          <p><strong>Weather:</strong> ${weather.temp}, Wind ${weather.wind}</p>        
          <p><strong>${away} Pitcher:</strong> ${awayPitcher}</p>
          <p>ERA: ${awayP.era || "N/A"} | WHIP: ${awayP.whip || "N/A"} | HR Allowed: ${awayP.homeRuns ?? "N/A"} | POPS Pitcher Score: ${awayPitchScore}/100</p>
          <p><strong>${awayPitcher} HR Risk:</strong> ${awayHRRisk}/100</p>

          <p><strong>${home} Pitcher:</strong> ${homePitcher}</p>
          <p>ERA: ${homeP.era || "N/A"} | WHIP: ${homeP.whip || "N/A"} | HR Allowed: ${homeP.homeRuns ?? "N/A"} | POPS Pitcher Score: ${homePitchScore}/100</p>
          <p><strong>${homePitcher} HR Risk:</strong> ${homeHRRisk}/100</p>

          <p><strong>Run Support:</strong> ${away} ${awayRun}/100 vs ${home} ${homeRun}/100</p>
          <p><strong>NRFI/YRFI:</strong> ${firstInningPick} — ${firstInningScore}/100</p>
          <p><strong>POPS Moneyline Lean:</strong> ✅ ${mlPick}</p>
        </div>
      `;
    });

   }));

    slateBox.innerHTML = cards.join("");

    const pitcherBox = document.getElementById("pitcherTargetsList");
    if (pitcherBox) {
      pitcherBox.innerHTML = games.map(g => {
        const away = g.teams.away.team.name;
        const home = g.teams.home.team.name;
        const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
        const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";

        const awayRisk = hrRiskScore(awayPitcher, pitcherStats);
        const homeRisk = hrRiskScore(homePitcher, pitcherStats);

        const targetPitcher = awayRisk >= homeRisk ? awayPitcher : homePitcher;
        const targetTeam = awayRisk >= homeRisk ? away : home;
        const opponent = awayRisk >= homeRisk ? home : away;
        const risk = awayRisk >= homeRisk ? awayRisk : homeRisk;
        const grade = targetGrade(risk);

        return `
          <div class="model-card">
            <h3>${grade} ${targetPitcher}</h3>
            <p><strong>Team:</strong> ${targetTeam}</p>
            <p><strong>Opponent:</strong> ${opponent}</p>
            <p><strong>HR Risk:</strong> ${risk}/100</p>
          </div>
        `;
      }).join("");
    }

    const moneyList = document.getElementById("moneylineList");
    if (moneyList) {
      moneyList.innerHTML = games.map(g => {
        const away = g.teams.away.team.name;
        const home = g.teams.home.team.name;
        const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
        const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";
        const pick = moneylineLean(away, home, awayPitcher, homePitcher, teamStats, pitcherStats);

        return `
          <div class="model-card">
            <h3>💰 ${pick}</h3>
            <p>${away} vs ${home}</p>
          </div>
        `;
      }).join("");
    }

    const nrfiList = document.getElementById("nrfiPicks");
    if (nrfiList) {
      nrfiList.innerHTML = games.map(g => {
        const away = g.teams.away.team.name;
        const home = g.teams.home.team.name;
        const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
        const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";

        const score = nrfiScore(away, home, awayPitcher, homePitcher, teamStats, pitcherStats);
        const pick = nrfiPick(score);

        return `
          <div class="model-card">
            <h3>${pick}</h3>
            <p><strong>${away} vs ${home}</strong></p>
            <p><strong>Score:</strong> ${score}/100</p>
          </div>
        `;
      }).join("");
    }

  } catch (err) {
    slateBox.innerHTML = "<div class='model-card'>Could not load POPS Pickz AI slate.</div>";
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", loadAutoSlate);
