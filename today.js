const todayData = {
  games: [
    {
      game: "New York Mets vs Atlanta Braves",

      pitchers: {
        away: {
          name: "Nolan McLean",
          team: "New York Mets",
          stats: "ERA: TBD • WHIP: TBD • HR/9: TBD • FB%: TBD • Hard-Hit% Allowed: TBD",
          risk: "🔥🔥🔥"
        },
        home: {
          name: "Martín Pérez",
          team: "Atlanta Braves",
          stats: "ERA: TBD • WHIP: TBD • HR/9: TBD • FB%: TBD • Hard-Hit% Allowed: TBD",
          risk: "🔥🔥🔥"
        }
      },

      moneylinePick: {
        pick: "Atlanta Braves",
        reason: "POPS edge: offense + home field + matchup lean",
        confidence: "TBD%"
      },

      hrTargets: [
        { player: "Player 1", score: "TBD/100" },
        { player: "Player 2", score: "TBD/100" },
        { player: "Player 3", score: "TBD/100" }
      ],

      hitTargets: [
        { player: "Player 1", score: "TBD/100" },
        { player: "Player 2", score: "TBD/100" },
        { player: "Player 3", score: "TBD/100" }
      ],

      weather: {
        wind: "8 mph",
        direction: "Out",
        rain: "0%",
        score: "TBD/10"
      },

      nrfi: {
        pick: "YRFI Lean",
        confidence: "TBD%",
        reason: "Based on pitcher first-inning profile, lineup strength, weather, and park."
      }
    }
  ],

  hrPicks: [
    {
      player: "Shohei Ohtani",
      matchup: "vs JP Sears",
      barrel: 19,
      hardHit: 58,
      iso: 0.340,
      hr9: 1.8,
      weather: 9,
      ballpark: 9,
      platoon: 8
    }
  ],

  batterStats: [
    {
      player: "Shohei Ohtani",
      matchup: "vs JP Sears",
      hrScore: "98/100",
      hitScore: "97/100",
      hitModel: "Elite AVG/contact profile • elite xBA/xwOBA • elite hard contact • strong matchup",
      why: "Elite power + high HR-risk pitcher + great weather + strong ballpark boost"
    }
  ],

  pitcherTargets: [
    {
      pitcher: "JP Sears",
      stats: "LHP • High HR risk • HR/9 • FB% • Hard-Hit% allowed",
      grade: "🔥🔥🔥🔥🔥"
    }
  ],

  moneyline: [
    {
      team: "Atlanta Braves",
      reason: "POPS edge: offense + home field + matchup lean",
      confidence: "TBD%"
    }
  ],

  weather: [
    {
      stadium: "Truist Park",
      condition: "Wind 8 mph Out • Rain 0%",
      boost: "Weather Score TBD/10"
    }
  ],

  nrfi: [
    {
      game: "New York Mets vs Atlanta Braves",
      pick: "YRFI Lean",
      confidence: "TBD%",
      reason: "Lineup strength + game environment"
    }
  ]
};
