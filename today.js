const todayData = {
  games: [
    {
      game: "Philadelphia Phillies vs Kansas City Royals",
      time: "Tomorrow",
      venue: "Kauffman Stadium",
      pitchers: {
        away: { name: "Christopher Sánchez", team: "Philadelphia Phillies", throws: "LHP", era: "Strong profile", hr9: "Low HR risk", flyBall: "Ground-ball lean", targetRating: "🔥🔥", verdict: "Not a main pitcher to attack." },
        home: { name: "Noah Cameron", team: "Kansas City Royals", throws: "LHP", era: "Solid profile", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Phillies bats have the better attack side." }
      },
      hrTargets: [
        { player: "Kyle Schwarber", matchup: "vs Noah Cameron", score: 81, grade: "Strong", reason: "Elite power bat with HR upside." }
      ],
      hitTargets: [
        { player: "Trea Turner", matchup: "vs Noah Cameron", score: 91, grade: "Very Strong", reason: "Strong hit profile with speed and lineup value." },
        { player: "Bobby Witt Jr.", matchup: "vs Christopher Sánchez", score: 95, grade: "Elite", reason: "Best Royals bat with elite contact and power." }
      ],
      moneylinePick: { pick: "Philadelphia Phillies", confidence: "86%", reason: "Better overall lineup and stronger offensive profile." },
      nrfi: { pick: "NRFI", confidence: "76%", reason: "Sánchez profile supports early run prevention." }
    },

    {
      game: "New York Yankees vs Tampa Bay Rays",
      time: "Tomorrow",
      venue: "Tropicana Field",
      pitchers: {
        away: { name: "Cam Schlittler", team: "New York Yankees", throws: "RHP", era: "Young arm profile", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Rays contact bats can attack if command is shaky." },
        home: { name: "Griffin Jax", team: "Tampa Bay Rays", throws: "RHP", era: "Power-risk profile", hr9: "HR risk", flyBall: "Fly-ball lean", targetRating: "🔥🔥🔥🔥", verdict: "Yankees power bats are live." }
      },
      hrTargets: [
        { player: "Aaron Judge", matchup: "vs Griffin Jax", score: 87, grade: "Strong", reason: "Elite power profile." }
      ],
      hitTargets: [
        { player: "Aaron Judge", matchup: "vs Griffin Jax", score: 95, grade: "Elite", reason: "Elite OPS and power." }
      ],
      moneylinePick: { pick: "New York Yankees", confidence: "85%", reason: "More impact bats and HR upside." },
      nrfi: { pick: "NRFI", confidence: "73%", reason: "Tropicana Field helps suppress early scoring." }
    },

    {
      game: "Houston Astros vs Washington Nationals",
      time: "Tomorrow",
      venue: "Nationals Park",
      pitchers: {
        away: { name: "Mike Burrows", team: "Houston Astros", throws: "RHP", era: "Contact risk", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Nationals bats have some hit value." },
        home: { name: "Miles Mikolas", team: "Washington Nationals", throws: "RHP", era: "Contact-heavy profile", hr9: "HR risk", flyBall: "Elevated contact", targetRating: "🔥🔥🔥🔥", verdict: "Astros bats are the better attack side." }
      },
      hrTargets: [
        { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 91, grade: "Elite", reason: "Elite power vs contact-heavy pitcher." },
        { player: "Christian Walker", matchup: "vs Miles Mikolas", score: 88, grade: "Very Strong", reason: "Strong HR profile vs contact pitcher." }
      ],
      hitTargets: [
        { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 94, grade: "Elite", reason: "Elite damage profile." },
        { player: "José Altuve", matchup: "vs Miles Mikolas", score: 90, grade: "Very Strong", reason: "Strong contact and lineup value." }
      ],
      moneylinePick: { pick: "Houston Astros", confidence: "85%", reason: "Better offense and matchup vs Mikolas." },
      nrfi: { pick: "YRFI", confidence: "68%", reason: "Houston top order creates early scoring pressure." }
    },

    {
      game: "New York Mets vs Atlanta Braves",
      time: "Tomorrow",
      venue: "Truist Park",
      pitchers: {
        away: { name: "Freddy Peralta", team: "New York Mets", throws: "RHP", era: "Power arm", hr9: "Fly-ball HR risk", flyBall: "Elevated", targetRating: "🔥🔥🔥", verdict: "Braves power bats are live." },
        home: { name: "Reynaldo López", team: "Atlanta Braves", throws: "RHP", era: "Strong profile", hr9: "Moderate risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Mets power bats can attack if command slips." }
      },
      hrTargets: [
        { player: "Juan Soto", matchup: "vs Reynaldo López", score: 86, grade: "Very Strong", reason: "Elite plate discipline and HR upside." },
        { player: "Matt Olson", matchup: "vs Freddy Peralta", score: 90, grade: "Very Strong", reason: "Elite left-handed power at Truist Park." }
      ],
      hitTargets: [
        { player: "Juan Soto", matchup: "vs Reynaldo López", score: 91, grade: "Very Strong", reason: "Elite OBP and contact." },
        { player: "Matt Olson", matchup: "vs Freddy Peralta", score: 91, grade: "Very Strong", reason: "Strong power and OBP profile." }
      ],
      moneylinePick: { pick: "Atlanta Braves", confidence: "85%", reason: "Home field and lineup depth." },
      nrfi: { pick: "YRFI", confidence: "65%", reason: "Both lineups have early power risk." }
    },

    {
      game: "Milwaukee Brewers vs St. Louis Cardinals",
      time: "Tomorrow",
      venue: "Busch Stadium",
      pitchers: {
        away: { name: "Shane Drohan", team: "Milwaukee Brewers", throws: "LHP", era: "Young arm risk", hr9: "Moderate risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Cardinals right-handed bats can attack." },
        home: { name: "Dustin May", team: "St. Louis Cardinals", throws: "RHP", era: "Ground-ball profile", hr9: "Lower HR risk", flyBall: "Low", targetRating: "🔥🔥", verdict: "Not a main pitcher to attack." }
      },
      hrTargets: [
        { player: "Willson Contreras", matchup: "vs Shane Drohan", score: 87, grade: "Strong", reason: "Strong right-handed power vs lefty." }
      ],
      hitTargets: [
        { player: "Willson Contreras", matchup: "vs Shane Drohan", score: 95, grade: "Elite", reason: "Best Cardinals hit and power profile." }
      ],
      moneylinePick: { pick: "St. Louis Cardinals", confidence: "85%", reason: "Home field and stronger starter profile." },
      nrfi: { pick: "NRFI", confidence: "69%", reason: "Busch Stadium helps suppress early HR damage." }
    },

    {
      game: "Arizona Diamondbacks vs San Diego Padres",
      time: "Tomorrow",
      venue: "Petco Park",
      pitchers: {
        away: { name: "Brandon Pfaadt", team: "Arizona Diamondbacks", throws: "RHP", era: "HR-risk profile", hr9: "High HR risk", flyBall: "Elevated", targetRating: "🔥🔥🔥🔥", verdict: "Padres bats are live for HRs." },
        home: { name: "Walker Buehler", team: "San Diego Padres", throws: "RHP", era: "Command risk", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Diamondbacks bats have hit upside." }
      },
      hrTargets: [
        { player: "Fernando Tatis Jr.", matchup: "vs Brandon Pfaadt", score: 82, grade: "Strong", reason: "Elite power-speed profile vs HR-risk pitcher." }
      ],
      hitTargets: [
        { player: "Fernando Tatis Jr.", matchup: "vs Brandon Pfaadt", score: 94, grade: "Elite", reason: "Best Padres impact bat." },
        { player: "Manny Machado", matchup: "vs Brandon Pfaadt", score: 90, grade: "Very Strong", reason: "Strong contact and power profile." }
      ],
      moneylinePick: { pick: "San Diego Padres", confidence: "86%", reason: "Home field and matchup vs Pfaadt." },
      nrfi: { pick: "NRFI", confidence: "71%", reason: "Petco Park helps limit early damage." }
    },

    {
      game: "Toronto Blue Jays vs San Francisco Giants",
      time: "Tomorrow",
      venue: "Oracle Park",
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
      moneylinePick: { pick: "Toronto Blue Jays", confidence: "85%", reason: "Gausman gives Toronto the starter edge." },
      nrfi: { pick: "NRFI", confidence: "78%", reason: "Oracle Park and Gausman support early suppression." }
    },

    {
      game: "Colorado Rockies vs Los Angeles Dodgers",
      time: "Tomorrow",
      venue: "Dodger Stadium",
      pitchers: {
        away: { name: "Kyle Freeland", team: "Colorado Rockies", throws: "LHP", era: "Target profile", hr9: "High HR risk", flyBall: "Elevated", targetRating: "🔥🔥🔥🔥🔥", verdict: "Main pitcher to attack for Dodgers HRs and hits." },
        home: { name: "Eric Lauer", team: "Los Angeles Dodgers", throws: "LHP", era: "Solid profile", hr9: "Moderate HR risk", flyBall: "Moderate", targetRating: "🔥🔥🔥", verdict: "Rockies right-handed bats have some value." }
      },
      hrTargets: [
        { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 97, grade: "Elite", reason: "Elite power profile vs top target pitcher." },
        { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 94, grade: "Elite", reason: "Righty bat vs lefty with elite contact/power." },
        { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 92, grade: "Elite", reason: "Elite hitter in great run environment." },
        { player: "Will Smith", matchup: "vs Kyle Freeland", score: 91, grade: "Very Strong", reason: "Strong power/contact profile vs LHP." }
      ],
      hitTargets: [
        { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 98, grade: "Elite", reason: "Top overall bat on the slate." },
        { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 96, grade: "Elite", reason: "Elite contact profile." },
        { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 93, grade: "Very Strong", reason: "Elite contact and power vs LHP." },
        { player: "Will Smith", matchup: "vs Kyle Freeland", score: 92, grade: "Very Strong", reason: "Strong catcher bat vs LHP." }
      ],
      moneylinePick: { pick: "Los Angeles Dodgers", confidence: "92%", reason: "Best overall edge on the slate." },
      nrfi: { pick: "YRFI", confidence: "82%", reason: "Dodgers top order vs Freeland creates early scoring upside." }
    }
  ],

  pitcherTargets: [
    { pitcher: "Kyle Freeland", team: "Colorado Rockies", era: "Target profile", hr9: "High HR risk", flyBall: "Elevated", grade: "🔥🔥🔥🔥🔥", verdict: "Primary pitcher to attack." },
    { pitcher: "Miles Mikolas", team: "Washington Nationals", era: "Contact-heavy profile", hr9: "HR risk", flyBall: "Elevated contact", grade: "🔥🔥🔥🔥", verdict: "Astros bats are live." },
    { pitcher: "Brandon Pfaadt", team: "Arizona Diamondbacks", era: "HR-risk profile", hr9: "High HR risk", flyBall: "Elevated", grade: "🔥🔥🔥🔥", verdict: "Padres bats are live." },
    { pitcher: "Griffin Jax", team: "Tampa Bay Rays", era: "Power-risk profile", hr9: "HR risk", flyBall: "Fly-ball lean", grade: "🔥🔥🔥🔥", verdict: "Yankees power bats are live." }
  ],

  hrPicks: [
    { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 97, grade: "Elite" },
    { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 94, grade: "Elite" },
    { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 92, grade: "Elite" },
    { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 91, grade: "Elite" },
    { player: "Will Smith", matchup: "vs Kyle Freeland", score: 91, grade: "Very Strong" },
    { player: "Matt Olson", matchup: "vs Freddy Peralta", score: 90, grade: "Very Strong" },
    { player: "Christian Walker", matchup: "vs Miles Mikolas", score: 88, grade: "Very Strong" },
    { player: "Aaron Judge", matchup: "vs Griffin Jax", score: 87, grade: "Strong" },
    { player: "Juan Soto", matchup: "vs Reynaldo López", score: 86, grade: "Very Strong" },
    { player: "Vladimir Guerrero Jr.", matchup: "vs Landen Roupp", score: 84, grade: "Strong" }
  ],

  batterStats: [
    { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 98, grade: "Elite", why: "Top overall bat on the slate." },
    { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 96, grade: "Elite", why: "Elite contact profile." },
    { player: "Bobby Witt Jr.", matchup: "vs Christopher Sánchez", score: 95, grade: "Elite", why: "Best Royals hitter." },
    { player: "Aaron Judge", matchup: "vs Griffin Jax", score: 95, grade: "Elite", why: "Elite OPS and power." },
    { player: "Vladimir Guerrero Jr.", matchup: "vs Landen Roupp", score: 95, grade: "Elite", why: "Top Blue Jays hit profile." },
    { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 94, grade: "Elite", why: "Elite damage profile." },
    { player: "Juan Soto", matchup: "vs Reynaldo López", score: 91, grade: "Very Strong", why: "Elite OBP and contact." },
    { player: "Trea Turner", matchup: "vs Noah Cameron", score: 91, grade: "Very Strong", why: "Strong contact, speed, and lineup value." },
    { player: "Bo Bichette", matchup: "vs Landen Roupp", score: 91, grade: "Very Strong", why: "Strong contact profile." },
    { player: "José Altuve", matchup: "vs Miles Mikolas", score: 90, grade: "Very Strong", why: "Strong contact and lineup value." }
  ],

  moneyline: [
    { team: "Los Angeles Dodgers", reason: "Best overall edge on the slate.", confidence: "92%" },
    { team: "Philadelphia Phillies", reason: "Better overall lineup and offensive profile.", confidence: "86%" },
    { team: "San Diego Padres", reason: "Home field and strong matchup vs Pfaadt.", confidence: "86%" },
    { team: "Houston Astros", reason: "Better offense and matchup vs Mikolas.", confidence: "85%" },
    { team: "New York Yankees", reason: "More impact bats and HR upside.", confidence: "85%" },
    { team: "Toronto Blue Jays", reason: "Gausman gives Toronto the starter edge.", confidence: "85%" }
  ],

  nrfi: [
    { game: "Philadelphia Phillies vs Kansas City Royals", pick: "NRFI", confidence: "76%", reason: "Sánchez profile supports early run prevention." },
    { game: "New York Yankees vs Tampa Bay Rays", pick: "NRFI", confidence: "73%", reason: "Tropicana Field helps suppress early scoring." },
    { game: "Houston Astros vs Washington Nationals", pick: "YRFI", confidence: "68%", reason: "Houston top order creates early scoring pressure." },
    { game: "New York Mets vs Atlanta Braves", pick: "YRFI", confidence: "65%", reason: "Both lineups have early power risk." },
    { game: "Milwaukee Brewers vs St. Louis Cardinals", pick: "NRFI", confidence: "69%", reason: "Busch Stadium helps suppress early HR damage." },
    { game: "Arizona Diamondbacks vs San Diego Padres", pick: "NRFI", confidence: "71%", reason: "Petco Park helps limit early damage." },
    { game: "Toronto Blue Jays vs San Francisco Giants", pick: "NRFI", confidence: "78%", reason: "Oracle Park and Gausman support early suppression." },
    { game: "Colorado Rockies vs Los Angeles Dodgers", pick: "YRFI", confidence: "82%", reason: "Dodgers top order vs Freeland creates early scoring upside." }
  ]
};
