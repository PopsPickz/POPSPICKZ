async function loadAutoSlate() {
  const slateBox = document.getElementById("slateList");
  if (!slateBox) return;

  slateBox.innerHTML = "<div class='model-card'>Loading POPS Pickz AI slate...</div>";

  try {
    const games = await fetchMLBSchedule();
    const teamStats = await fetchTeamStats();
    const pitcherStats = await fetchPitcherStats();

    if (!games.length) {
      slateBox.innerHTML = "<div class='model-card'>No MLB games found today.</div>";
      return;
    }

    const cards = games.map(g => {
      const away = g.teams.away.team.name;
      const home = g.teams.home.team.name;

      const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
      const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";

      const venue = g.venue?.name || "Unknown Stadium";

      const gameTime = new Date(g.gameDate).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      });

      const awayRun = runSupportScore(away, teamStats);
      const homeRun = runSupportScore(home, teamStats);

      const awayPitchScore = pitcherScore(awayPitcher, pitcherStats);
      const homePitchScore = pitcherScore(homePitcher, pitcherStats);

      const awayHRRisk = hrRiskScore(awayPitcher, pitcherStats);
      const homeHRRisk = hrRiskScore(homePitcher, pitcherStats);

      const mlPick = moneylineLean(
        away,
        home,
        awayPitcher,
        homePitcher,
        teamStats,
        pitcherStats
      );

      const firstInningScore = nrfiScore(
        away,
        home,
        awayPitcher,
        homePitcher,
        teamStats,
        pitcherStats
      );

      const firstInningPick = nrfiPick(firstInningScore);

      const awayP = pitcherStats[awayPitcher] || {};
      const homeP = pitcherStats[homePitcher] || {};

      return `
        <div class="slate-card model-card">
          <h3>${away} vs ${home}</h3>

          <p><strong>Time:</strong> ${gameTime}</p>
          <p><strong>Venue:</strong> ${venue}</p>

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

   document.getElementById("slateList").innerHTML = cards.join("");
   const moneyList = document.getElementById("moneylineList");

if (moneyList) {
  moneyList.innerHTML = games.map(g => {

    const away = g.teams.away.team.name;
    const home = g.teams.home.team.name;

    const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
    const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";

    const pick = getMoneylinePick(
      away,
      home,
      awayPitcher,
      homePitcher
    );

    return `
      <div class="model-card">
        <h3>💰 ${pick}</h3>
        <p>${away} vs ${home}</p>
      </div>
    `;
  }).join("");
}    document.getElementById("pitcherTargetsList").innerHTML =
games.map(g => {

    const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
    const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";

    const awayRisk = getHRRiskScore(awayPitcher);
    const homeRisk = getHRRiskScore(homePitcher);

    const target =
        awayRisk > homeRisk
            ? ⁠ ${awayPitcher} 🔥 ${awayRisk}/100 ⁠
            : ⁠ ${homePitcher} 🔥 ${homeRisk}/100 ⁠;

    return `
        <div class="model-card">
            <strong>${target}</strong>
        </div>
    `;
}).join("");  } catch (err) {
    slateBox.innerHTML = "<div class='model-card'>Could not load POPS Pickz AI slate.</div>";
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", loadAutoSlate);
