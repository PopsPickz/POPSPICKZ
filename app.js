var scoresBox = document.getElementById("scoresBox");
var lineupsBox = document.getElementById("lineupsBox");
var hrBox = document.getElementById("hrBox");

function getEasternDate() {
  var now = new Date();

  var easternDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);

  return easternDate;
}

async function loadMLBData() {
  var today = getEasternDate();

  var scheduleURL =
    "https://statsapi.mlb.com/api/v1/schedule?sportId=1&date=" +
    today +
    "&hydrate=probablePitcher";

  try {
    var response = await fetch(scheduleURL);
    var data = await response.json();

    var games = [];

    if (data.dates && data.dates.length > 0) {
      games = data.dates[0].games;
    }

    if (games.length === 0) {
      scoresBox.innerHTML = "No MLB games scheduled for " + today + ".";
      lineupsBox.innerHTML = "No lineups available.";
      hrBox.innerHTML = "No home runs today.";
      return;
    }

    scoresBox.innerHTML = "<p><strong>Date:</strong> " + today + "</p>";

    games.forEach(function (game) {
      var away = game.teams.away.team.name;
      var home = game.teams.home.team.name;

      var awayScore = game.teams.away.score || 0;
      var homeScore = game.teams.home.score || 0;

      var status = game.status.detailedState;

      var gameTime = new Date(game.gameDate).toLocaleTimeString("en-US", {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit"
      });

      var awayPitcher = "TBD";
      var homePitcher = "TBD";

      if (game.teams.away.probablePitcher) {
        awayPitcher = game.teams.away.probablePitcher.fullName;
      }

      if (game.teams.home.probablePitcher) {
        homePitcher = game.teams.home.probablePitcher.fullName;
      }

      scoresBox.innerHTML +=
        "<div style='border:1px solid #ccc; padding:15px; margin-bottom:15px; border-radius:10px;'>" +
        "<h3>" + away + " vs " + home + "</h3>" +
        "<p><strong>Game Time:</strong> " + gameTime + " ET</p>" +
        "<p><strong>Score:</strong> " + awayScore + " - " + homeScore + "</p>" +
        "<p><strong>Status:</strong> " + status + "</p>" +
        "<p><strong>Pitchers:</strong> " + awayPitcher + " vs " + homePitcher + "</p>" +
        "</div>";
    });

    lineupsBox.innerHTML = "Lineups coming next.";
    hrBox.innerHTML = "Home run tracker coming next.";

  } catch (error) {
    scoresBox.innerHTML = "Error loading MLB scores.";
    lineupsBox.innerHTML = "Error loading lineups.";
    hrBox.innerHTML = "Error loading home run tracker.";
  }
}

loadMLBData();
setInterval(loadMLBData, 60000);
