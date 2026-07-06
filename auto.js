const stadiums = {
  "Kauffman Stadium": { lat: 39.0517, lon: -94.4803 },
  "Yankee Stadium": { lat: 40.8296, lon: -73.9262 },
  "George M. Steinbrenner Field": { lat: 27.9799, lon: -82.5067 },
  "Nationals Park": { lat: 38.8730, lon: -77.0074 },
  "Truist Park": { lat: 33.8908, lon: -84.4678 },
  "Busch Stadium": { lat: 38.6226, lon: -90.1928 },
  "Petco Park": { lat: 32.7073, lon: -117.1566 },
  "Oracle Park": { lat: 37.7786, lon: -122.3893 },
  "Dodger Stadium": { lat: 34.0739, lon: -118.2400 }
};

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
  await loadTeamStats();
  
  const slateBox = document.getElementById("gameList");
  if (!slateBox) return;

  const today = new Date().toISOString().split("T")[0];

  const url =
    ⁠ https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=${today}&hydrate=probablePitcher,venue ⁠;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const games = data.dates?.[0]?.games || [];

    if (!games.length) {
      slateBox.innerHTML = "<p>No MLB games found today.</p>";
      return;
    }

    const cards = await Promise.all(games.map(async g => {
      const away = g.teams.away.team.name;
      const home = g.teams.home.team.name;
      const awayPitcher = g.teams.away.probablePitcher?.fullName || "TBD";
      const homePitcher = g.teams.home.probablePitcher?.fullName || "TBD";
      const venue = g.venue?.name || "Unknown Stadium";

      const gameTime = new Date(g.gameDate).toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit"
      });

      const weather = await getWeather(venue, g.gameDate);

      return `
        <div class="game-card">
          <h3>${away} vs ${home}</h3>
          <p><strong>Time:</strong> ${gameTime}</p>
          <p><strong>Venue:</strong> ${venue}</p>
          <p><strong>${away} Pitcher:</strong> ${awayPitcher}</p>
          <p><strong>${home} Pitcher:</strong> ${homePitcher}</p>
          <p><strong>Weather:</strong> ${weather.temp}, Wind ${weather.wind}</p>
        </div>
      `;
    }));

    slateBox.innerHTML = cards.join("");

  } catch (err) {
    slateBox.innerHTML = "<p>Could not load MLB slate.</p>";
    console.error(err);
  }
}
function getPitcherScore(pitcherName) {
  if (!pitcherName || pitcherName === "TBD") return 50;
  return 70;
}

let teamStatsMap = {};

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

  const strongTeams = [
    "Toronto Blue Jays",
    "Houston Astros",
    "Arizona Diamondbacks",
    "Milwaukee Brewers"
  ];

  if (eliteTeams.includes(teamName)) return 90;
  if (strongTeams.includes(teamName)) return 82;

  return 72;
}

function getMoneylinePick(away, home, awayPitcher, homePitcher) {
  const awayRun = getRunSupportScore(away);
  const homeRun = getRunSupportScore(home);

  const awayPitcherScore = getPitcherScore(awayPitcher);
  const homePitcherScore = getPitcherScore(homePitcher);

  const awayTotal = awayRun + awayPitcherScore;
  const homeTotal = homeRun + homePitcherScore + 3;

  return homeTotal >= awayTotal ? home : away;
loadAutoSlate();
