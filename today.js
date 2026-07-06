const todayData = {
  games: [
    {
      game: "Boston Red Sox vs Los Angeles Angels",
      finalGrade: "A",

      pitchers: {
        away: {
          name: "R. Suarez",
          team: "Boston Red Sox",
          stats: "LHP • Strong starter profile • Lower run-risk arm • Limits damage better than Angels side",
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
          stats: "RHP • High-risk target • Struggles with traffic on base • Boston bats get the matchup edge",
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
        reason: "Boston has the better pitching edge with Suarez, stronger hit-target group, and favorable matchup vs Johnson."
      },

      hrTargets: [
        { player: "Wilyer Abreu", score: "88/100", reason: "Strong power profile plus wind blowing out." },
        { player: "Willson Contreras", score: "86/100", reason: "Power bat with strong HR odds." },
        { player: "Zach Neto", score: "82/100", reason: "Best Angels HR profile despite tougher matchup." },
        { player: "Jarren Duran", score: "80/100", reason: "Contact plus extra-base upside." },
        { player: "Jorge Soler", score: "78/100", reason: "Power upside hitter." }
      ],

      hitTargets: [
        { player: "Wilyer Abreu", score: "94/100", reason: "Best overall POPS hit target in this game." },
        { player: "Jarren Duran", score: "91/100", reason: "Contact, speed, and lineup value." },
        { player: "Masataka Yoshida", score: "89/100", reason: "Contact-first hitter with strong single/double chance." },
        { player: "Zach Neto", score: "84/100", reason: "Top Angels hit profile." },
        { player: "Carlos Narvaez", score: "78/100", reason: "Lower-tier hit target with matchup upside." }
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
        reason: "Suarez supports NRFI, but Johnson and wind out create some YRFI danger."
      },

      teamEdge: {
        startingPitching: "Boston Red Sox",
        bullpen: "TBD",
        offense: "Boston Red Sox",
        defense: "TBD",
        recentForm: "TBD"
      }
    }
  ],

  hrPicks: [
    {
      player: "Wilyer Abreu",
      matchup: "vs R. Johnson",
      barrel: 14,
      hardHit: 48,
      iso: 0.230,
      hr9: 1.7,
      weather: 8,
      ballpark: 7,
      platoon: 7
    },
    {
      player: "Willson Contreras",
      matchup: "vs R. Johnson",
      barrel: 13,
      hardHit: 47,
      iso: 0.220,
      hr9: 1.7,
      weather: 8,
      ballpark: 7,
      platoon: 7
    },
    {
      player: "Zach Neto",
      matchup: "vs R. Suarez",
      barrel: 12,
      hardHit: 45,
      iso: 0.210,
      hr9: 1.0,
      weather: 8,
      ballpark: 7,
      platoon: 6
    },
    {
      player: "Jarren Duran",
      matchup: "vs R. Johnson",
      barrel: 10,
      hardHit: 44,
      iso: 0.190,
      hr9: 1.7,
      weather: 8,
      ballpark: 7,
      platoon: 7
    }
  ],

  batterStats: [
    {
      player: "Wilyer Abreu",
      matchup: "vs R. Johnson",
      hrScore: "88/100",
      hitScore: "94/100",
      hitModel: "Strong contact profile • favorable pitcher matchup • good weather boost",
      why: "Best overall POPS hit target in this game."
    },
    {
      player: "Jarren Duran",
      matchup: "vs R. Johnson",
      hrScore: "80/100",
      hitScore: "91/100",
      hitModel: "Contact + speed profile • good lineup position • strong hit chance",
      why: "Better hit target than pure HR target."
    },
    {
      player: "Masataka Yoshida",
      matchup: "vs R. Johnson",
      hrScore: "72/100",
      hitScore: "89/100",
      hitModel: "Contact-first hitter • low strikeout style • good single/double chance",
      why: "Strong POPS hit target."
    },
    {
      player: "Zach Neto",
      matchup: "vs R. Suarez",
      hrScore: "82/100",
      hitScore: "84/100",
      hitModel: "Best Angels hit profile despite tougher pitcher matchup",
      why: "Top Angels bat to consider."
    },
    {
      player: "Jo Adell",
      matchup: "vs R. Suarez",
      hrScore: "78/100",
      hitScore: "76/100",
      hitModel: "Power upside • higher strikeout risk",
      why: "Better HR dart than safe hit target."
    }
  ],

  pitcherTargets: [
    {
      pitcher: "R. Johnson",
      stats: "RHP • Target pitcher for Boston bats • higher traffic risk • HR and hit opportunity allowed",
      grade: "🔥🔥🔥🔥"
    },
    {
      pitcher: "R. Suarez",
      stats: "LHP • Stronger starter • lower hit-risk profile • Angels bats have tougher matchup",
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
