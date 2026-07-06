const todayData = {
  eliteNRFI: [],

  hrPicks: [
    { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 97, grade: "Elite" },
    { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 94, grade: "Elite" },
    { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 92, grade: "Elite" },
    { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 91, grade: "Elite" },
    { player: "Will Smith", matchup: "vs Kyle Freeland", score: 91, grade: "Very Strong" },
    { player: "Matt Olson", matchup: "vs Freddy Peralta", score: 90, grade: "Very Strong" },
    { player: "Christian Walker", matchup: "vs Miles Mikolas", score: 88, grade: "Very Strong" },
    { player: "Juan Soto", matchup: "vs Reynaldo López", score: 86, grade: "Very Strong" },
    { player: "Vladimir Guerrero Jr.", matchup: "vs Landen Roupp", score: 84, grade: "Strong" },
    { player: "Fernando Tatis Jr.", matchup: "vs Brandon Pfaadt", score: 82, grade: "Strong" },
    { player: "Kyle Schwarber", matchup: "vs Noah Cameron", score: 81, grade: "Strong" },
    { player: "Bryce Harper", matchup: "vs Noah Cameron", score: 80, grade: "Strong" }
  ],

  batterStats: [
    { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 98, grade: "Elite", why: "Top overall bat on the slate." },
    { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 96, grade: "Elite", why: "Elite contact profile." },
    { player: "Bobby Witt Jr.", matchup: "vs Cristopher Sánchez", score: 95, grade: "Elite", why: "Elite contact, speed, and power." },
    { player: "Vladimir Guerrero Jr.", matchup: "vs Landen Roupp", score: 95, grade: "Elite", why: "Top Blue Jays hit profile." },
    { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 94, grade: "Elite", why: "Elite damage profile." },
    { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 93, grade: "Very Strong", why: "Elite contact and power vs LHP." }
  ],

  pitcherTargets: [
    { pitcher: "Kyle Freeland", team: "Colorado Rockies", era: "Target profile", hr9: "High HR risk", flyBall: "Elevated", grade: "🔥🔥🔥🔥🔥", verdict: "Primary pitcher to attack." },
    { pitcher: "Miles Mikolas", team: "Washington Nationals", era: "Contact-heavy profile", hr9: "HR risk", flyBall: "Elevated contact", grade: "🔥🔥🔥🔥", verdict: "Astros bats are live." },
    { pitcher: "Brandon Pfaadt", team: "Arizona Diamondbacks", era: "HR-risk profile", hr9: "High HR risk", flyBall: "Elevated", grade: "🔥🔥🔥🔥", verdict: "Padres bats are live." },
    { pitcher: "Griffin Jax", team: "Tampa Bay Rays", era: "Power-risk profile", hr9: "HR risk", flyBall: "Fly-ball lean", grade: "🔥🔥🔥🔥", verdict: "Yankees bats are live if healthy." },
    { pitcher: "Noah Cameron", team: "Kansas City Royals", era: "4.95", hr9: "Moderate HR risk", flyBall: "Moderate", grade: "🔥🔥🔥", verdict: "Phillies bats have upside." }
  ],

  moneyline: [
    { team: "Los Angeles Dodgers ✅", reason: "Pitcher ✅ | Run Support 94–58 | Bullpen ✅ | Offense ✅ | Defense ✅ | Home Field ✅", confidence: "96/100 ⭐⭐⭐⭐⭐" },
    { team: "Atlanta Braves ✅", reason: "Pitcher ✅ | Run Support 89–70 | Bullpen ✅ | Offense ✅ | Defense ✅ | Home Field ✅", confidence: "93/100 ⭐⭐⭐⭐⭐" },
    { team: "Philadelphia Phillies ✅", reason: "Pitcher ✅ | Run Support 90–74 | Bullpen ✅ | Offense ✅ | Defense ✅ | Road Team ❌", confidence: "87/100 ⭐⭐⭐⭐☆" },
    { team: "Milwaukee Brewers ✅", reason: "Pitcher 🟡 | Run Support 84–78 | Bullpen ✅ | Offense ✅ | Defense ✅ | Road Team ❌", confidence: "82/100 ⭐⭐⭐⭐☆" },
    { team: "Toronto Blue Jays ✅", reason: "Pitcher ✅ | Run Support 80–78 | Bullpen 🟡 | Offense ✅ | Defense ✅ | Road Team ❌", confidence: "81/100 ⭐⭐⭐⭐☆" }
  ],

  nrfi: [
    { game: "Philadelphia Phillies vs Kansas City Royals", pick: "NRFI", confidence: "76%", reason: "Sánchez profile supports early run prevention." },
    { game: "New York Yankees vs Tampa Bay Rays", pick: "NRFI", confidence: "73%", reason: "Projected low-scoring first inning." },
    { game: "Toronto Blue Jays vs San Francisco Giants", pick: "NRFI", confidence: "78%", reason: "Oracle Park and Gausman support early suppression." }
  ],

  games: [
    {
      game: "Philadelphia Phillies vs Kansas City Royals",
      time: "2:10 PM ET",
      venue: "Kauffman Stadium",
      moneylinePick: "Phillies",
      runSupport: {
        away: { team: "Phillies", score: 90, rating: "🟢 Elite" },
        home: { team: "Royals", score: 74, rating: "🟡 Average" },
        edge: "Phillies"
      }
    },
    {
      game: "New York Yankees vs Tampa Bay Rays",
      time: "6:40 PM ET",
      venue: "George M. Steinbrenner Field",
      moneylinePick: "Yankees",
      runSupport: {
        away: { team: "Yankees", score: 82, rating: "🟢 Strong" },
        home: { team: "Rays", score: 79, rating: "🟡 Good" },
        edge: "Yankees"
      }
    },
    {
      game: "Houston Astros vs Washington Nationals",
      time: "6:45 PM ET",
      venue: "Nationals Park",
      moneylinePick: "Nationals",
      runSupport: {
        away: { team: "Astros", score: 81, rating: "🟢 Strong" },
        home: { team: "Nationals", score: 83, rating: "🟢 Strong" },
        edge: "Nationals"
      }
    },
    {
      game: "New York Mets vs Atlanta Braves",
      time: "7:15 PM ET",
      venue: "Truist Park",
      moneylinePick: "Braves",
      runSupport: {
        away: { team: "Mets", score: 70, rating: "🟡 Average" },
        home: { team: "Braves", score: 89, rating: "🟢 Elite" },
        edge: "Braves"
      }
    },
    {
      game: "Milwaukee Brewers vs St. Louis Cardinals",
      time: "7:45 PM ET",
      venue: "Busch Stadium",
      moneylinePick: "Brewers",
      runSupport: {
        away: { team: "Brewers", score: 84, rating: "🟢 Strong" },
        home: { team: "Cardinals", score: 78, rating: "🟡 Good" },
        edge: "Brewers"
      }
    },
    {
      game: "Arizona Diamondbacks vs San Diego Padres",
      time: "9:40 PM ET",
      venue: "Petco Park",
      moneylinePick: "Diamondbacks",
      runSupport: {
        away: { team: "Diamondbacks", score: 85, rating: "🟢 Strong" },
        home: { team: "Padres", score: 83, rating: "🟢 Strong" },
        edge: "Diamondbacks"
      }
    },
    {
      game: "Toronto Blue Jays vs San Francisco Giants",
      time: "9:45 PM ET",
      venue: "Oracle Park",
      moneylinePick: "Blue Jays",
      runSupport: {
        away: { team: "Blue Jays", score: 80, rating: "🟢 Strong" },
        home: { team: "Giants", score: 78, rating: "🟡 Good" },
        edge: "Blue Jays"
      }
    },
    {
      game: "Colorado Rockies vs Los Angeles Dodgers",
      time: "10:10 PM ET",
      venue: "Dodger Stadium",
      moneylinePick: "Dodgers",
      runSupport: {
        away: { team: "Rockies", score: 58, rating: "🔴 Weak" },
        home: { team: "Dodgers", score: 94, rating: "🟢 Elite" },
        edge: "Dodgers"
      }
    }
  ]
};
