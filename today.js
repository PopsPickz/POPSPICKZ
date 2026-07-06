var todayData = {
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
    { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 93, grade: "Very Strong", why: "Elite contact and power vs LHP." },
    { player: "Juan Soto", matchup: "vs Reynaldo López", score: 91, grade: "Very Strong", why: "Elite OBP and contact profile." },
    { player: "Trea Turner", matchup: "vs Noah Cameron", score: 91, grade: "Very Strong", why: "Strong contact, speed, and lineup value." },
    { player: "Bo Bichette", matchup: "vs Landen Roupp", score: 91, grade: "Very Strong", why: "Strong contact profile." },
    { player: "José Altuve", matchup: "vs Miles Mikolas", score: 90, grade: "Very Strong", why: "Strong contact and lineup value." },
    { player: "Bryce Harper", matchup: "vs Noah Cameron", score: 89, grade: "Strong", why: "Strong OBP and damage upside." },
    { player: "Kyle Schwarber", matchup: "vs Noah Cameron", score: 88, grade: "Strong", why: "Power bat with walk and run-production upside." },
    { player: "Fernando Tatis Jr.", matchup: "vs Brandon Pfaadt", score: 88, grade: "Strong", why: "Best Padres impact bat." },
    { player: "Manny Machado", matchup: "vs Brandon Pfaadt", score: 87, grade: "Strong", why: "Strong contact and power profile." },
    { player: "Will Smith", matchup: "vs Kyle Freeland", score: 87, grade: "Strong", why: "Strong catcher bat vs LHP." }
  ],

  pitcherTargets: [
    { pitcher: "Kyle Freeland", team: "Colorado Rockies", era: "Target profile", hr9: "High HR risk", flyBall: "Elevated", grade: "🔥🔥🔥🔥🔥", verdict: "Primary pitcher to attack." },
    { pitcher: "Miles Mikolas", team: "Washington Nationals", era: "Contact-heavy profile", hr9: "HR risk", flyBall: "Elevated contact", grade: "🔥🔥🔥🔥", verdict: "Astros bats are live." },
    { pitcher: "Brandon Pfaadt", team: "Arizona Diamondbacks", era: "HR-risk profile", hr9: "High HR risk", flyBall: "Elevated", grade: "🔥🔥🔥🔥", verdict: "Padres bats are live." },
    { pitcher: "Griffin Jax", team: "Tampa Bay Rays", era: "Power-risk profile", hr9: "HR risk", flyBall: "Fly-ball lean", grade: "🔥🔥🔥🔥", verdict: "Yankees bats are live if healthy." },
    { pitcher: "Noah Cameron", team: "Kansas City Royals", era: "4.95", hr9: "Moderate HR risk", flyBall: "Moderate", grade: "🔥🔥🔥", verdict: "Phillies bats have upside." }
  ],

  moneyline: [
    { team: "Los Angeles Dodgers ✅", confidence: "96/100 ⭐⭐⭐⭐⭐", reason: "Pitcher ✅ | Run Support 94–58 | Bullpen ✅ | Offense ✅ | Defense ✅ | Home Field ✅" },
    { team: "Atlanta Braves ✅", confidence: "93/100 ⭐⭐⭐⭐⭐", reason: "Pitcher ✅ | Run Support 89–70 | Bullpen ✅ | Offense ✅ | Defense ✅ | Home Field ✅" },
    { team: "Philadelphia Phillies ✅", confidence: "87/100 ⭐⭐⭐⭐☆", reason: "Pitcher ✅ | Run Support 90–74 | Bullpen ✅ | Offense ✅ | Defense ✅ | Road Team ❌" },
    { team: "Milwaukee Brewers ✅", confidence: "82/100 ⭐⭐⭐⭐☆", reason: "Pitcher 🟡 | Run Support 84–78 | Bullpen ✅ | Offense ✅ | Defense ✅ | Road Team ❌" },
    { team: "Toronto Blue Jays ✅", confidence: "81/100 ⭐⭐⭐⭐☆", reason: "Pitcher ✅ | Run Support 80–78 | Bullpen 🟡 | Offense ✅ | Defense ✅ | Road Team ❌" },
    { team: "New York Yankees ✅", confidence: "72/100 ⭐⭐⭐☆☆", reason: "Pitcher 🟡 | Run Support 82–79 | Bullpen ✅ | Offense ✅ | Defense ✅ | Road Team ❌" },
    { team: "Washington Nationals ✅", confidence: "70/100 ⭐⭐⭐☆☆", reason: "Pitcher ✅ | Run Support 83–81 | Bullpen ❌ | Offense 🟡 | Home Field ✅" },
    { team: "Arizona Diamondbacks ✅", confidence: "68/100 ⭐⭐⭐☆☆", reason: "Pitcher 🟡 | Run Support 85–83 | Bullpen 🟡 | Offense ✅ | Road Team ❌" }
  ],

  nrfi: [
    { game: "Philadelphia Phillies vs Kansas City Royals", pick: "NRFI", confidence: "76%", reason: "Sánchez profile supports early run prevention." },
    { game: "New York Yankees vs Tampa Bay Rays", pick: "NRFI", confidence: "73%", reason: "Projected low-scoring first inning with park suppression." },
    { game: "Houston Astros vs Washington Nationals", pick: "YRFI", confidence: "68%", reason: "Houston top order creates early scoring pressure." },
    { game: "New York Mets vs Atlanta Braves", pick: "YRFI", confidence: "65%", reason: "Both lineups have early power risk." },
    { game: "Milwaukee Brewers vs St. Louis Cardinals", pick: "NRFI", confidence: "69%", reason: "Busch Stadium helps suppress early HR damage." },
    { game: "Arizona Diamondbacks vs San Diego Padres", pick: "NRFI", confidence: "71%", reason: "Petco Park helps limit early damage." },
    { game: "Toronto Blue Jays vs San Francisco Giants", pick: "NRFI", confidence: "78%", reason: "Oracle Park and Gausman support early suppression." },
    { game: "Colorado Rockies vs Los Angeles Dodgers", pick: "YRFI", confidence: "82%", reason: "Dodgers top order vs Freeland creates early scoring upside." }
  ],

  games: [
    {
      game: "Philadelphia Phillies vs Kansas City Royals",
      time: "2:10 PM ET",
      venue: "Kauffman Stadium",
      moneylinePick: "Philadelphia Phillies",
      runSupport: {
        away: { team: "Phillies", score: 90, rating: "🟢 Elite" },
        home: { team: "Royals", score: 74, rating: "🟡 Average" },
        edge: "Phillies"
      },
      pitchers: {
        away: { name: "Cristopher Sánchez", team: "Philadelphia Phillies", throws: "LHP", era: "2.00", hr9: "Low HR risk", flyBall: "Ground-ball lean", targetRating: "🔥🔥", verdict: "Not a main pitcher to attack." },
        home: { name: "Noah Cameron", team: "Kansas City Royals", throws: "LHP", era: "4.95", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Phillies bats have upside." }
      },
      hrTargets: [
        { player: "Kyle Schwarber", matchup: "vs Noah Cameron", score: 81, grade: "Strong", reason: "Power profile keeps him above the POPS 80 mark." },
        { player: "Bryce Harper", matchup: "vs Noah Cameron", score: 80, grade: "Strong", reason: "Strong left-handed power bat with run-producing upside." }
      ],
      hitTargets: [
        { player: "Bobby Witt Jr.", matchup: "vs Cristopher Sánchez", score: 95, grade: "Elite", reason: "Elite contact, speed, and power profile." },
        { player: "Trea Turner", matchup: "vs Noah Cameron", score: 91, grade: "Very Strong", reason: "Strong hit profile with speed and lineup value." },
        { player: "Bryce Harper", matchup: "vs Noah Cameron", score: 89, grade: "Strong", reason: "High-quality bat with strong OBP and damage upside." },
        { player: "Kyle Schwarber", matchup: "vs Noah Cameron", score: 88, grade: "Strong", reason: "Power bat with walk and run-production upside." }
      ],
      moneylinePickDetail: { pick: "Philadelphia Phillies", confidence: "87/100", reason: "Phillies have the stronger pitcher, bullpen, offense, and run-support edge." },
      nrfiPick: { pick: "NRFI", confidence: "76%", reason: "Sánchez profile supports early run prevention." }
    },

    {
      game: "New York Yankees vs Tampa Bay Rays",
      time: "6:40 PM ET",
      venue: "George M. Steinbrenner Field",
      moneylinePick: "New York Yankees",
      runSupport: {
        away: { team: "Yankees", score: 82, rating: "🟢 Strong" },
        home: { team: "Rays", score: 79, rating: "🟡 Good" },
        edge: "Yankees"
      },
      pitchers: {
        away: { name: "Cam Schlittler", team: "New York Yankees", throws: "RHP", era: "Young arm profile", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Rays contact bats can attack if command is shaky." },
        home: { name: "Griffin Jax", team: "Tampa Bay Rays", throws: "RHP", era: "Power-risk profile", hr9: "HR risk", flyBall: "Fly-ball lean", targetRating: "🔥🔥🔥🔥", verdict: "Yankees bats are live if healthy." }
      },
      hrTargets: [],
      hitTargets: [],
      moneylinePickDetail: { pick: "New York Yankees", confidence: "72/100", reason: "Yankees hold a slight run-support and offensive edge, but this is not a premium moneyline." },
      nrfiPick: { pick: "NRFI", confidence: "73%", reason: "Projected low-scoring first inning with park suppression." }
    },

    {
      game: "Houston Astros vs Washington Nationals",
      time: "6:45 PM ET",
      venue: "Nationals Park",
      moneylinePick: "Washington Nationals",
      runSupport: {
        away: { team: "Astros", score: 81, rating: "🟢 Strong" },
        home: { team: "Nationals", score: 83, rating: "🟢 Strong" },
        edge: "Nationals"
      },
      pitchers: {
        away: { name: "Mike Burrows", team: "Houston Astros", throws: "RHP", era: "Contact risk", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Nationals bats have hit value." },
        home: { name: "Miles Mikolas", team: "Washington Nationals", throws: "RHP", era: "Contact-heavy profile", hr9: "HR risk", flyBall: "Elevated contact", targetRating: "🔥🔥🔥🔥", verdict: "Astros bats are live." }
      },
      hrTargets: [
        { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 91, grade: "Elite", reason: "Elite power bat vs contact-heavy pitcher." },
        { player: "Christian Walker", matchup: "vs Miles Mikolas", score: 88, grade: "Very Strong", reason: "Strong HR profile against a pitcher who allows contact." }
      ],
      hitTargets: [
        { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 94, grade: "Elite", reason: "Elite damage profile." },
        { player: "José Altuve", matchup: "vs Miles Mikolas", score: 90, grade: "Very Strong", reason: "Strong contact and lineup value." }
      ],
      moneylinePickDetail: { pick: "Washington Nationals", confidence: "70/100", reason: "Nationals have small home-field and run-support edge." },
      nrfiPick: { pick: "YRFI", confidence: "68%", reason: "Houston top order creates early scoring pressure." }
    },

    {
      game: "New York Mets vs Atlanta Braves",
      time: "7:15 PM ET",
      venue: "Truist Park",
      moneylinePick: "Atlanta Braves",
      runSupport: {
        away: { team: "Mets", score: 70, rating: "🟡 Average" },
        home: { team: "Braves", score: 89, rating: "🟢 Elite" },
        edge: "Braves"
      },
      pitchers: {
        away: { name: "Freddy Peralta", team: "New York Mets", throws: "RHP", era: "Power arm", hr9: "Fly-ball HR risk", flyBall: "Elevated", targetRating: "🔥🔥🔥", verdict: "Braves power bats are live." },
        home: { name: "Reynaldo López", team: "Atlanta Braves", throws: "RHP", era: "Strong profile", hr9: "Moderate risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Mets power bats can attack if command slips." }
      },
      hrTargets: [
        { player: "Matt Olson", matchup: "vs Freddy Peralta", score: 90, grade: "Very Strong", reason: "Elite left-handed power at Truist Park." },
        { player: "Juan Soto", matchup: "vs Reynaldo López", score: 86, grade: "Very Strong", reason: "Elite plate discipline and HR upside." }
      ],
      hitTargets: [
        { player: "Matt Olson", matchup: "vs Freddy Peralta", score: 91, grade: "Very Strong", reason: "Strong power and OBP profile." },
        { player: "Juan Soto", matchup: "vs Reynaldo López", score: 91, grade: "Very Strong", reason: "Elite OBP and contact profile." }
      ],
      moneylinePickDetail: { pick: "Atlanta Braves", confidence: "93/100", reason: "Braves have the stronger offense, run support, bullpen, defense, and home field." },
      nrfiPick: { pick: "YRFI", confidence: "65%", reason: "Both lineups have early power risk." }
    },

    {
      game: "Milwaukee Brewers vs St. Louis Cardinals",
      time: "7:45 PM ET",
      venue: "Busch Stadium",
      moneylinePick: "Milwaukee Brewers",
      runSupport: {
        away: { team: "Brewers", score: 84, rating: "🟢 Strong" },
        home: { team: "Cardinals", score: 78, rating: "🟡 Good" },
        edge: "Brewers"
      },
      pitchers: {
        away: { name: "Shane Drohan", team: "Milwaukee Brewers", throws: "LHP", era: "Young arm risk", hr9: "Moderate risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Cardinals right-handed bats can attack." },
        home: { name: "Dustin May", team: "St. Louis Cardinals", throws: "RHP", era: "Ground-ball profile", hr9: "Lower HR risk", flyBall: "Low", targetRating: "🔥🔥", verdict: "Not a main pitcher to attack." }
      },
      hrTargets: [],
      hitTargets: [
        { player: "Willson Contreras", matchup: "vs Shane Drohan", score: 87, grade: "Strong", reason: "Best Cardinals bat with right-handed matchup edge." }
      ],
      moneylinePickDetail: { pick: "Milwaukee Brewers", confidence: "82/100", reason: "Brewers have better run support, bullpen, offense, and defense." },
      nrfiPick: { pick: "NRFI", confidence: "69%", reason: "Busch Stadium helps suppress early HR damage." }
    },

    {
      game: "Arizona Diamondbacks vs San Diego Padres",
      time: "9:40 PM ET",
      venue: "Petco Park",
      moneylinePick: "Arizona Diamondbacks",
      runSupport: {
        away: { team: "Diamondbacks", score: 85, rating: "🟢 Strong" },
        home: { team: "Padres", score: 83, rating: "🟢 Strong" },
        edge: "Diamondbacks"
      },
      pitchers: {
        away: { name: "Brandon Pfaadt", team: "Arizona Diamondbacks", throws: "RHP", era: "HR-risk profile", hr9: "High HR risk", flyBall: "Elevated", targetRating: "🔥🔥🔥🔥", verdict: "Padres bats are live for HRs." },
        home: { name: "Walker Buehler", team: "San Diego Padres", throws: "RHP", era: "Command risk", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Diamondbacks bats have hit upside." }
      },
      hrTargets: [
        { player: "Fernando Tatis Jr.", matchup: "vs Brandon Pfaadt", score: 82, grade: "Strong", reason: "Elite power-speed profile vs HR-risk pitcher." }
      ],
      hitTargets: [
        { player: "Fernando Tatis Jr.", matchup: "vs Brandon Pfaadt", score: 88, grade: "Strong", reason: "Best Padres impact bat." },
        { player: "Manny Machado", matchup: "vs Brandon Pfaadt", score: 87, grade: "Strong", reason: "Strong contact and power profile." }
      ],
      moneylinePickDetail: { pick: "Arizona Diamondbacks", confidence: "68/100", reason: "Small run-support edge, but not a premium moneyline play." },
      nrfiPick: { pick: "NRFI", confidence: "71%", reason: "Petco Park helps limit early damage." }
    },

    {
      game: "Toronto Blue Jays vs San Francisco Giants",
      time: "9:45 PM ET",
      venue: "Oracle Park",
      moneylinePick: "Toronto Blue Jays",
      runSupport: {
        away: { team: "Blue Jays", score: 80, rating: "🟢 Strong" },
        home: { team: "Giants", score: 78, rating: "🟡 Good" },
        edge: "Blue Jays"
      },
      pitchers: {
        away: { name: "Kevin Gausman", team: "Toronto Blue Jays", throws: "RHP", era: "Strong profile", hr9: "Moderate risk", flyBall: "Moderate", targetRating: "🔥🔥", verdict: "Not a main pitcher to attack." },
        home: { name: "Landen Roupp", team: "San Francisco Giants", throws: "RHP", era: "Contact risk", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Blue Jays bats have hit upside." }
      },
      hrTargets: [
        { player: "Vladimir Guerrero Jr.", matchup: "vs Landen Roupp", score: 84, grade: "Strong", reason: "Elite contact and power profile." }
      ],
      hitTargets: [
        { player: "Vladimir Guerrero Jr.", matchup: "vs Landen Roupp", score: 95, grade: "Elite", reason: "Top Blue Jays hit profile." },
        { player: "Bo Bichette", matchup: "vs Landen Roupp", score: 91, grade: "Very Strong", reason: "Strong contact profile." }
      ],
      moneylinePickDetail: { pick: "Toronto Blue Jays", confidence: "81/100", reason: "Blue Jays have the stronger pitcher, offense, and slight run-support edge." },
      nrfiPick: { pick: "NRFI", confidence: "78%", reason: "Oracle Park and Gausman support early suppression." }
    },

    {
      game: "Colorado Rockies vs Los Angeles Dodgers",
      time: "10:10 PM ET",
      venue: "Dodger Stadium",
      moneylinePick: "Los Angeles Dodgers",
      runSupport: {
        away: { team: "Rockies", score: 58, rating: "🔴 Weak" },
        home: { team: "Dodgers", score: 94, rating: "🟢 Elite" },
        edge: "Dodgers"
      },
      pitchers: {
        away: { name: "Kyle Freeland", team: "Colorado Rockies", throws: "LHP", era: "Target profile", hr9: "High HR risk", flyBall: "Elevated", targetRating: "🔥🔥🔥🔥🔥", verdict: "Main pitcher to attack for Dodgers HRs and hits." },
        home: { name: "Eric Lauer", team: "Los Angeles Dodgers", throws: "LHP", era: "Solid profile", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Rockies right-handed bats have some value." }
      },
      hrTargets: [
        { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 97, grade: "Elite", reason: "Top POPS HR target on the slate." },
        { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 94, grade: "Elite", reason: "Righty bat vs lefty with elite contact/power." },
        { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 92, grade: "Elite", reason: "Elite hitter in great run environment." },
        { player: "Will Smith", matchup: "vs Kyle Freeland", score: 91, grade: "Very Strong", reason: "Strong power/contact profile vs LHP." }
      ],
      hitTargets: [
        { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 98, grade: "Elite", reason: "Top overall bat on the slate." },
        { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 96, grade: "Elite", reason: "Elite contact profile." },
        { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 93, grade: "Very Strong", reason: "Elite contact and power vs LHP." },
        { player: "Will Smith", matchup: "vs Kyle Freeland", score: 87, grade: "Strong", reason: "Strong catcher bat vs LHP." }
      ],
      moneylinePickDetail: { pick: "Los Angeles Dodgers", confidence: "96/100", reason: "Dodgers have the biggest run-support edge on the slate plus bullpen, offense, defense, and home-field advantage." },
      nrfiPick: { pick: "YRFI", confidence: "82%", reason: "Dodgers top order vs Freeland creates early scoring upside." }
    }
  ]
};
window.todayData = todayData;
