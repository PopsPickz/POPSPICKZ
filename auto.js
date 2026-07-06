const stadiums = {
  "Kauffman Stadium": { lat: 39.0517, lon: -94.4803 },
  "George M. Steinbrenner Field": { lat: 27.9799, lon: -82.5067 },
  "Nationals Park": { lat: 38.8730, lon: -77.0074 },
  "Truist Park": { lat: 33.8908, lon: -84.4678 },
  "Busch Stadium": { lat: 38.6226, lon: -90.1928 },
  "Petco Park": { lat: 32.7073, lon: -117.1566 },
  "Oracle Park": { lat: 37.7786, lon: -122.3893 },
  "Dodger Stadium": { lat: 34.0739, lon: -118.2400 },
  "Yankee Stadium": { lat: 40.8296, lon: -73.9262 },
  "Fenway Park": { lat: 42.3467, lon: -71.0972 },
  "Wrigley Field": { lat: 41.9484, lon: -87.6553 },
  "Citi Field": { lat: 40.7571, lon: -73.8458 }
};

let teamStatsMap = {};
let pitcherStatsMap = {};

async function loadTeamStats() {
  const url = "https://statsapi.mlb.com/api/v1/teams/stats?stats=season&group=hitting&sportIds=1";
  const res = await fetch(url);
  const data = await res.json();

  const splits = data.stats?.[0]?.splits || [];

  splits.forEach(item => {
    const teamName = item.team.name;
    const stat = item.stat;

    teamStatsMap[teamName] = {
      runs: Number(stat.runs || 0),
      avg: Number(stat.avg || 0),
      obp: Number(stat.obp || 0),
      slg: Number(stat.slg || 0),
      ops: Number(stat.ops || 0)
    };
  });
}

function getRunSupportScore(teamName) {
  const stats = teamStatsMap[teamName];

  if (!stats) return 70;

  let score = 50;

  score += stats.ops * 40;
  score += stats.obp * 30;
  score += stats.slg * 25;

  if (stats.runs > 500) score += 8;
  if (stats.runs > 600) score += 5;

  return Math.max(50, Math.min(98, Math.round(score)));
}

async function loadPitcherStats() {
  const url = "https://statsapi.mlb.com/api/v1/stats?stats=season&group=pitching&playerPool=ALL&sportIds=1&limit=5000";
  const res = await fetch(url);
  const data = await res.json();

  const splits = data.stats?.[0]?.splits || [];

  splits.forEach(item => {
    const name = item.player.fullName;
    const stat = item.stat;

    pitcherStatsMap[name] = {
      era: stat.era || "N/A",
      whip: stat.whip || "N/A",
      innings: stat.inningsPitched || "0",
      strikeouts: Number(stat.strikeOuts || 0),
      walks: Number(stat.baseOnBalls || 0),
      homeRuns: Number(stat.homeRuns || 0)
    };
  });
}

function getPitcherStats(pitcherName) {
  return pitcherStatsMap[pitcherName] || {
    era: "N/A",
    whip: "N/A",
    innings: "0",
    strikeouts: 0,
    walks: 0,
    homeRuns: 0
  };
}

function getPitcherScore(pitcherName) {
  const p = getPitcherStats(pitcherName);

  if (p.era === "N/A") return 50;

  let score = 75;

  const era = Number(p.era);
  const whip = Number(p.whip);

  if (era <= 3.00) score += 12;
  else if (era <= 4.00) score += 6;
  else if (era >= 5.00) score -= 12;

  if (whip <= 1.15) score += 8;
  else if (whip >= 1.40) score -= 8;

  if (p.homeRuns >= 20) score -= 6;
  if (p.walks > p.strikeouts * 0.4) score -= 5;

  return Math.max(40, Math.min(98, Math.round(score)));
}

function getMoneylinePick(away, home, awayPitcher, homePitcher) {
  const awayRun = getRunSupportScore(away);
  const homeRun = getRunSupportScore(home);

  const awayPitcherScore = getPitcherScore(awayPitcher);
  const homePitcherScore = getPitcherScore(homePitcher);

  const awayTotal = awayRun + awayPitcherScore;
  const homeTotal = homeRun + homePitcherScore + 3;

  return homeTotal >= awayTotal ? home : away;
}

async function getWeather(venueName, gameDate) {
  const venue = stadiums[venueName];

  if (!venue) {
    return {
      temp: "N/A",
      wind: "N/A",
      note: "Weather unavailable"
    };
  }

  const weatherUrl =
    ⁠ https://api.open-meteo.com/v1/forecast?latitude=${venue.lat}&longitude=${venue.lon}&hourly=temperature_2m,wind_speed_10m,wind_direction_10m&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto ⁠;

  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();

    const gameHour = new Date(gameDate).getHours();
    const index = data.hourly.time.findIndex(t => new Date(t).getHours() === gameHour);

    if (index === -1) {
      return {
        temp: "N/A",
        wind: "N/A",
        note: "Weather time unavailable"
      };
    }

    return {
      temp: Math.round(data.hourly.temperature_2m[index]) + "°F",
      wind: Math.round(data.hourly.wind_speed_10m[index]) + " mph",
      direction: Math.round(data.hourly.wind_direction_10m[index]) + "°",
      note: "Auto weather"
    };
  } catch (err) {
    return {
      temp: "N/A",
      wind: "N/A",
      note: "Weather error"
    };
  }
}

async function loadAutoSlate() {
  const slateBox = document.getElementById("slateList");
  if (!slateBox) return;

  slateBox.innerHTML = "<div class='model-card'>Loading auto MLB slate...</div>";

  try {
    await loadTeamStats();
    await loadPitcherStats();

    const today = new Date().toISOString().split("T")[0];

    const url =
      ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher,venue ⁠;

    const res = await fetch(url);
    const data = await res.json();

    const games = data.dates?.[0]?.games || [];

    if (!games.length) {
      slateBox.innerHTML = "<div class='model-card'>No MLB games found today.</div>";
      return;
    }

    const cards = await Promise.all(games.map(async g => {
      const away = g.teams.away.team.name;
      const home = g.teams.home.team.name;

      const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
      const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";

      const awayStats = getPitcherStats(awayPitcher);
      const homeStats = getPitcherStats(homePitcher);

      const venue = g.venue?.name || "Unknown Stadium";

      const gameTime = new Date(g.gameDate).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      });

      const weather = await getWeather(venue, g.gameDate);

      const awayRunSupport = getRunSupportScore(away);
      const homeRunSupport = getRunSupportScore(home);

      const moneylinePick = getMoneylinePick(away, home, awayPitcher, homePitcher);

      const awayPitcherScore = getPitcherScore(awayPitcher);
      const homePitcherScore = getPitcherScore(homePitcher);

      return `
        <div class="slate-card model-card">
          <h3>${away} vs ${home}</h3>

          <p><strong>Time:</strong> ${gameTime}</p>
          <p><strong>Venue:</strong> ${venue}</p>

          <p><strong>${away} Pitcher:</strong> ${awayPitcher}</p>
          <p>ERA: ${awayStats.era} | WHIP: ${awayStats.whip} | HR Allowed: ${awayStats.homeRuns} | POPS Pitcher Score: ${awayPitcherScore}/100</p>

          <p><strong>${home} Pitcher:</strong> ${homePitcher}</p>
          <p>ERA: ${homeStats.era} | WHIP: ${homeStats.whip} | HR Allowed: ${homeStats.homeRuns} | POPS Pitcher Score: ${homePitcherScore}/100</p>

          <p><strong>Weather:</strong> ${weather.temp}, Wind ${weather.wind}</p>

          <p><strong>Run Support:</strong> ${away} ${awayRunSupport}/100 vs ${home} ${homeRunSupport}/100</p>

          <p><strong>POPS Moneyline Lean:</strong> ✅ ${moneylinePick}</p>
        </div>
      `;
    }));

    slateBox.innerHTML = cards.join("");

  } catch (err) {
    slateBox.innerHTML = "<div class='model-card'>Could not load MLB slate.</div>";
    console.error(err);
  }
}

window.addEventListener("DOMContentLoaded", loadAutoSlate);
