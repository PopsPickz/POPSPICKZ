var scoresBox = document.getElementById("scoresBox");
var lineupsBox = document.getElementById("lineupsBox");
var hrBox = document.getElementById("hrBox");

function getEasternDate() {
  var now = new Date();

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);
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

    scoresBox.innerHTML = "";
    hrBox.innerHTML = "<p>Checking for home runs...</p>";

    if (games.length === 0) {
      scoresBox.innerHTML = "No MLB games scheduled today.";
      hrBox.innerHTML = "No home runs today.";
      return;
    }

    var allHomeRuns = [];

    for (var i = 0; i < games.length; i++) {
      var game = games[i];

      var away = game.teams.away.team.name;
      var home = game.teams.home.team.name;
      var gamePk = game.gamePk;

      var awayScore = game.teams.away.score || 0;
      var homeScore = game.teams.home.score || 0;
      var status = game.status.detailedState;

      scoresBox.innerHTML +=
        "<div style='border:1px solid #ccc; padding:15px; margin-bottom:15px; border-radius:10px;'>" +
        "<h3>" + away + " vs " + home + "</h3>" +
        "<p><strong>Score:</strong> " + awayScore + " - " + homeScore + "</p>" +
        "<p><strong>Status:</strong> " + status + "</p>" +
        "</div>";

      var liveURL =
        "https://statsapi.mlb.com/api/v1.1/game/" +
        gamePk +
        "/feed/live";

      var liveResponse = await fetch(liveURL);
      var liveData = await liveResponse.json();

      var plays = liveData.liveData.plays.allPlays || [];

      plays.forEach(function (play) {
        if (play.result && play.result.event === "Home Run") {
          var batter = "Unknown hitter";

          if (play.matchup && play.matchup.batter) {
            batter = play.matchup.batter.fullName;
          }

          var inning = play.about.inning;
          var half = play.about.halfInning;

          var description = play.result.description || "Home Run";

          allHomeRuns.push({
            batter: batter,
            game: away + " vs " + home,
            inning: half + " " + inning,
            description: description
          });
        }
      });
    }

    if (allHomeRuns.length === 0) {
      hrBox.innerHTML =
        "<p>No home runs yet today.</p>";
    } else {
      hrBox.innerHTML = "";

      allHomeRuns.forEach(function (hr) {
        hrBox.innerHTML +=
          "<div style='border:2px solid black; padding:15px; margin-bottom:15px; border-radius:10px;'>" +
          "<h3>💣 " + hr.batter + "</h3>" +
          "<p><strong>Game:</strong> " + hr.game + "</p>" +
          "<p><strong>Inning:</strong> " + hr.inning + "</p>" +
          "<p>" + hr.description + "</p>" +
          "</div>";
      });
    }

    lineupsBox.innerHTML = "Lineups coming after home run tracker.";

  } catch (error) {
    console.log(error);
    scoresBox.innerHTML = "Error loading scores.";
    hrBox.innerHTML = "Error loading home run tracker.";
  }
}

loadMLBData();

setInterval(loadMLBData, 60000);
