var scoresBox = document.getElementById("scoresBox");
var lineupsBox = document.getElementById("lineupsBox");
var hrBox = document.getElementById("hrBox");

async function loadMLBData() {
  var today = new Date().toISOString().split("T")[0];

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
      scoresBox.innerHTML = "No MLB games scheduled today.";
      lineupsBox.innerHTML = "No lineups available.";
      hrBox.innerHTML = "No home runs today.";
      return;
    }

    scoresBox.innerHTML = "";

    games.forEach(function (game) {
      var away = game.teams.away.team.name;
      var home = game.teams.home.team.name;

      var awayScore = game.teams.away.score || 0;
      var homeScore = game.teams.home.score || 0;

      var status = game.status.detailedState;

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
