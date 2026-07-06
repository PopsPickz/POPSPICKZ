const todayData = {
  games: [
    {
      game: "Boston Red Sox vs Los Angeles Angels",
      time: "9:31 PM ET",
      venue: "Angel Stadium",
      finalGrade: "A",

      pitchers: {
        away: {
          name: "R. Suarez",
          team: "Boston Red Sox",
          stats: "LHP • POPS pitching edge • lower run-risk starter • gives Boston the matchup advantage",
          era: "TBD",
          whip: "TBD",
          hr9: "TBD",
          hardHit: "TBD",
          barrel: "TBD",
          risk: "🔥🔥"
        },
        home: {
          name: "R. Johnson",
          team: "Los Angeles Angels",
          stats: "RHP • POPS target pitcher • Boston bats get the better hit and HR setup",
          era: "TBD",
          whip: "TBD",
          hr9: "TBD",
          hardHit: "TBD",
          barrel: "TBD",
          risk: "🔥🔥🔥🔥"
        }
      },

      moneylinePick: {
        pick: "Boston Red Sox",
        line: "-154",
        confidence: "72%",
        reason: "Boston has the starting pitching edge with Suarez, stronger hit targets, and the market favorite price."
      },

      hrTargets: [
        { player: "Wilyer Abreu", score: "90/100", reason: "Best HR odds on board at +330 plus strong Boston matchup." },
        { player: "Willson Contreras", score: "88/100", reason: "+360 HR price with strong power profile." },
        { player: "Zach Neto", score: "84/100", reason: "Top Angels HR profile at +400." },
        { player: "Jarren Duran", score: "82/100", reason: "Good lineup spot and +430 HR value." },
        { player: "Jorge Soler", score: "80/100", reason: "Power bat with +450 HR upside." },
        { player: "Jo Adell", score: "78/100", reason: "Power-first hitter with +470 HR value." },
        { player: "Jose Siri", score: "76/100", reason: "+480 HR dart with power upside." },
        { player: "Carlos Narvaez", score: "72/100", reason: "+600 long-shot HR value." },
        { player: "Masataka Yoshida", score: "70/100", reason: "Better hit target than HR target but playable at +680." },
        { player: "Anthony Seigler", score: "66/100", reason: "+800 long-shot HR option." }
      ],

      hitTargets: [
        { player: "Wilyer Abreu", score: "94/100", reason: "Top POPS hit target with favorable matchup vs Johnson." },
        { player: "Jarren Duran", score: "91/100", reason: "Contact, speed, and lineup value make him a strong hit target." },
        { player: "Masataka Yoshida", score: "89/100", reason: "Contact-first profile with strong single/double chance." },
        { player: "Carlos Narvaez", score: "84/100", reason: "Good Boston value hit target lower in the order." },
        { player: "Ceddanne Rafaela", score: "82/100", reason: "Athletic contact profile with hit upside." },
        { player: "Zach Neto", score: "81/100", reason: "Best Angels hit profile despite tougher matchup." },
        { player: "Jo Adell", score: "77/100", reason: "Power upside but more strikeout risk." },
        { player: "Jorge Soler", score: "76/100", reason: "Power bat; less safe for hits than HRs." },
        { player: "Logan O'Hoppe", score: "74/100", reason: "Lower-tier Angels hit option." }
      ],

      weather: {
        temp: "81°F",
        wind: "8 MPH",
        direction: "Out to center field",
        rain: "1%",
        score: "8/10"
      },

      nrfi: {
        pick: "NRFI Lean",
        confidence: "60%",
        reason: "Suarez gives Boston the first-inning pitching edge, but Johnson and wind out create some YRFI danger."
      },

      teamEdge: {
        startingPitching: "Boston Red Sox",
        bullpen: "TBD",
        offense: "Boston Red Sox",
        defense: "TBD",
        recentForm: "Boston Red Sox"
      }
    }
  ],

  hrPicks: [
    { player: "Wilyer Abreu", matchup: "vs R. Johnson", barrel: 14, hardHit: 48, iso: 0.230, hr9: 1.7, weather: 8, ballpark: 7, platoon: 7 },
    { player: "Willson Contreras", matchup: "vs R. Johnson", barrel: 13, hardHit: 47, iso: 0.220, hr9: 1.7, weather: 8, ballpark: 7, platoon: 7 },
    { player: "Zach Neto", matchup: "vs R. Suarez", barrel: 12, hardHit: 45, iso: 0.210, hr9: 1.0, weather: 8, ballpark: 7, platoon: 6 },
    { player: "Jarren Duran", matchup: "vs R. Johnson", barrel: 10, hardHit: 44, iso: 0.190, hr9: 1.7, weather: 8, ballpark: 7, platoon: 7 },
    { player: "Jorge Soler", matchup: "vs R. Suarez", barrel: 13, hardHit: 46, iso: 0.220, hr9: 1.0, weather: 8, ballpark: 7, platoon: 6 },
    { player: "Jo Adell", matchup: "vs R. Suarez", barrel: 12, hardHit: 45, iso: 0.210, hr9: 1.0, weather: 8, ballpark: 7, platoon: 6 },
    { player: "Jose Siri", matchup: "vs R. Suarez", barrel: 11, hardHit: 43, iso: 0.200, hr9: 1.0, weather: 8, ballpark: 7, platoon: 6 },
    { player: "Carlos Narvaez", matchup: "vs R. Johnson", barrel: 9, hardHit: 41, iso: 0.170, hr9: 1.7, weather: 8, ballpark: 7, platoon: 7 },
    { player: "Masataka Yoshida", matchup: "vs R. Johnson", barrel: 7, hardHit: 39, iso: 0.150, hr9: 1.7, weather: 8, ballpark: 7, platoon: 7 },
    { player: "Anthony Seigler", matchup: "vs R. Johnson", barrel: 8, hardHit: 38, iso: 0.160, hr9: 1.7, weather: 8, ballpark: 7, platoon: 7 }
  ],

  batterStats: [
    {
      player: "Wilyer Abreu",
      matchup: "vs R. Johnson",
      hrScore: "90/100",
      hitScore: "94/100",
      hitModel: "Strong contact profile • favorable pitcher matchup • best Boston HR price",
      why: "Best overall POPS hitter in this game."
    },
    {
      player: "Jarren Duran",
      matchup: "vs R. Johnson",
      hrScore: "82/100",
      hitScore: "91/100",
      hitModel: "Contact + speed + lineup value",
      why: "Better hit target than HR target."
    },
    {
      player: "Masataka Yoshida",
      matchup: "vs R. Johnson",
      hrScore: "70/100",
      hitScore: "89/100",
      hitModel: "Contact-first hitter • low strikeout style",
      why: "Strong hit target for singles/doubles."
    },
    {
      player: "Carlos Narvaez",
      matchup: "vs R. Johnson",
      hrScore: "72/100",
      hitScore: "84/100",
      hitModel: "Boston lineup value • cheaper HR price",
      why: "Sneaky POPS value."
    },
    {
      player: "Zach Neto",
      matchup: "vs R. Suarez",
      hrScore: "84/100",
      hitScore: "81/100",
      hitModel: "Best Angels hitter profile",
      why: "Top Angels bat despite tougher pitching matchup."
    }
  ],

  pitcherTargets: [
    {
      pitcher: "R. Johnson",
      stats: "RHP • Target pitcher for Boston bats • Boston has hit and HR edge",
      grade: "🔥🔥🔥🔥"
    },
    {
      pitcher: "R. Suarez",
      stats: "LHP • Stronger starter • Angels bats have tougher matchup",
      grade: "🔥🔥"
    }
  ],

  moneyline: [
    {
      team: "Boston Red Sox",
      reason: "Better starting pitcher edge, stronger offensive targets, and market favorite at -154.",
      confidence: "72%"
    }
  ],

  weather: [
    {
      stadium: "Angel Stadium",
      condition: "Clear • 81°F • 1% rain • 8 MPH wind out to center",
      boost: "Weather Score 8/10"
    }
  ],

  nrfi: [
    {
      game: "Boston Red Sox vs Los Angeles Angels",
      pick: "NRFI Lean",
      confidence: "60%",
      reason: "Suarez supports NRFI, but Johnson and wind out create some YRFI danger."
    }
  ]
};
