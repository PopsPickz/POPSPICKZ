const todayData = {
  games: [
    {
      game: "San Diego Padres vs Los Angeles Dodgers",
      time: "Live - 5th Inning",
      venue: "Dodger Stadium",
      finalGrade: "B+",

      pitchers: {
        away: {
          name: "Sung-Mun Song",
          team: "San Diego Padres",
          throws: "RHP",
          stats: "Live game starter • Padres side",
          era: "Live",
          whip: "Live",
          hr9: "Live",
          hardHit: "Live",
          barrel: "Live",
          risk: "🔥🔥"
        },
        home: {
          name: "Emmet Sheehan",
          team: "Los Angeles Dodgers",
          throws: "RHP",
          stats: "5.08 ERA profile • command risk • Padres bats can attack if he loses the zone",
          era: "5.08",
          whip: "Command risk",
          hr9: "HR risk",
          hardHit: "Contact risk",
          barrel: "Power risk",
          risk: "🔥🔥🔥"
        }
      },

      moneylinePick: {
        pick: "Los Angeles Dodgers",
        line: "-120",
        confidence: "85%",
        reason: "Dodgers have the home-field edge, stronger overall team profile, and market lean."
      },

      hrTargets: [],
      hitTargets: [],

      weather: {
        temp: "Game environment active",
        wind: "Live",
        direction: "Game in progress",
        rain: "Clear lean",
        score: "Neutral"
      },

      nrfi: {
        pick: "Game already live",
        confidence: "Pass",
        reason: "NRFI/YRFI is no longer playable once the game has started."
      },

      teamEdge: {
        startingPitching: "Dodgers lean",
        bullpen: "Dodgers",
        offense: "Dodgers",
        defense: "Dodgers",
        recentForm: "Dodgers"
      }
    },

    {
      game: "Boston Red Sox vs Los Angeles Angels",
      time: "9:31 PM ET",
      venue: "Angel Stadium",
      finalGrade: "A",

      pitchers: {
        away: {
          name: "R. Suarez",
          team: "Boston Red Sox",
          throws: "LHP",
          stats: "2.94 ERA • 1.13 WHIP • Boston starting pitching edge",
          era: "2.94",
          whip: "1.13",
          hr9: "Low HR risk",
          hardHit: "Limits damage",
          barrel: "Lower barrel risk",
          risk: "🔥🔥"
        },
        home: {
          name: "R. Johnson",
          team: "Los Angeles Angels",
          throws: "RHP",
          stats: "7.40 ERA • 1.52 WHIP • POPS target pitcher for hits, runs, and HRs",
          era: "7.40",
          whip: "1.52",
          hr9: "High HR risk",
          hardHit: "High contact risk",
          barrel: "Power risk",
          risk: "🔥🔥🔥🔥"
        }
      },

      moneylinePick: {
        pick: "Boston Red Sox",
        line: "-154",
        confidence: "86%",
        reason: "Boston has the better starter, better offensive matchup, and faces the main pitcher to target."
      },

      hrTargets: [
        {
          player: "Wilyer Abreu",
          score: "90/100",
          reason: "Strong HR profile, +330 odds, lefty bat vs high-risk RHP, and wind blowing out."
        },
        {
          player: "Willson Contreras",
          score: "88/100",
          reason: ".912 OPS profile with +360 HR odds and strong power setup."
        },
        {
          player: "Zach Neto",
          score: "85/100",
          reason: "Top Angels power bat with +400 HR odds, but tougher matchup vs Suarez."
        }
      ],

      hitTargets: [
        {
          player: "Willson Contreras",
          matchup: "vs R. Johnson",
          hitScore: "95/100",
          hrScore: "88/100",
          avg: ".286",
          obp: ".377",
          slg: ".529",
          ops: ".912",
          iso: ".243",
          xBA: "Strong contact profile",
          xSLG: "Power profile",
          hardHit: "Strong",
          barrel: "Strong",
          sweetSpot: "Good launch profile",
          chase: "Disciplined approach",
          whiff: "Playable swing-miss risk",
          strikeout: "Playable K risk",
          walk: "Good OBP profile",
          hitsLast10: "Strong form lean",
          splits: "RHB vs RHP",
          bvp: "No major negative history",
          pitcherMatchup: "Johnson: 7.40 ERA • 1.52 WHIP",
          why: "Elite POPS hit target because of AVG, OBP, OPS, power, and pitcher matchup."
        },
        {
          player: "Wilyer Abreu",
          matchup: "vs R. Johnson",
          hitScore: "92/100",
          hrScore: "90/100",
          avg: ".266",
          obp: ".336",
          slg: ".433",
          ops: ".763",
          iso: ".167",
          xBA: "Strong lefty contact profile",
          xSLG: "Power upside",
          hardHit: "Strong",
          barrel: "Strong",
          sweetSpot: "Good launch profile",
          chase: "Playable chase profile",
          whiff: "Playable swing-miss risk",
          strikeout: "Playable K risk",
          walk: "Solid plate profile",
          hitsLast10: "Strong matchup lean",
          splits: "LHB vs RHP",
          bvp: "No major negative history",
          pitcherMatchup: "Johnson: 7.40 ERA • 1.52 WHIP",
          why: "Very strong hit and HR target against the main pitcher to attack."
        },
        {
          player: "Zach Neto",
          matchup: "vs R. Suarez",
          hitScore: "86/100",
          hrScore: "85/100",
          avg: ".228",
          obp: ".320",
          slg: ".444",
          ops: ".773",
          iso: ".216",
          xBA: "Power-over-contact profile",
          xSLG: "Strong power profile",
          hardHit: "Strong",
          barrel: "Strong",
          sweetSpot: "Power launch profile",
          chase: "Aggressive hitter",
          whiff: "Swing-miss risk",
          strikeout: "Moderate K risk",
          walk: "Playable walk profile",
          hitsLast10: "Strong power lean",
          splits: "RHB vs LHP",
          bvp: "No major negative history",
          pitcherMatchup: "Suarez: 2.94 ERA • 1.13 WHIP",
          why: "Strong Angels bat, but matchup is tougher than Boston’s bats."
        }
      ],

      weather: {
        temp: "81°F",
        wind: "8 MPH",
        direction: "Out to center field",
        rain: "1%",
        score: "8/10"
      },

      nrfi: {
        pick: "Pass",
        confidence: "Pass",
        reason: "Suarez helps NRFI, but Johnson and wind out create YRFI danger."
      },

      teamEdge: {
        startingPitching: "Boston Red Sox",
        bullpen: "Boston Red Sox lean",
        offense: "Boston Red Sox",
        defense: "Boston Red Sox lean",
        recentForm: "Boston Red Sox"
      }
    }
  ],

  pitcherTargets: [
    {
      pitcher: "R. Johnson",
      stats: "Target pitcher • 7.40 ERA • 1.52 WHIP • Boston bats get the best hit and HR setup",
      grade: "🔥🔥🔥🔥"
    },
    {
      pitcher: "Emmet Sheehan",
      stats: "Target pitcher • 5.08 ERA profile • command risk • Padres bats can attack if he loses the zone",
      grade: "🔥🔥🔥"
    }
  ],

  hrPicks: [
    {
      player: "Wilyer Abreu",
      matchup: "vs R. Johnson",
      barrel: 14,
      hardHit: 48,
      iso: 0.167,
      hr9: 1.7,
      weather: 8,
      ballpark: 7,
      platoon: 8
    },
    {
      player: "Willson Contreras",
      matchup: "vs R. Johnson",
      barrel: 13,
      hardHit: 47,
      iso: 0.243,
      hr9: 1.7,
      weather: 8,
      ballpark: 7,
      platoon: 6
    },
    {
      player: "Zach Neto",
      matchup: "vs R. Suarez",
      barrel: 12,
      hardHit: 45,
      iso: 0.216,
      hr9: 1.0,
      weather: 8,
      ballpark: 7,
      platoon: 7
    }
  ],

  batterStats: [
    {
      player: "Willson Contreras",
      matchup: "vs R. Johnson",
      hitScore: "95/100",
      hrScore: "88/100",
      avg: ".286",
      obp: ".377",
      slg: ".529",
      ops: ".912",
      why: "Elite hit profile and strong HR profile against Johnson."
    },
    {
      player: "Wilyer Abreu",
      matchup: "vs R. Johnson",
      hitScore: "92/100",
      hrScore: "90/100",
      avg: ".266",
      obp: ".336",
      slg: ".433",
      ops: ".763",
      why: "Best HR target and very strong hit target."
    },
    {
      player: "Zach Neto",
      matchup: "vs R. Suarez",
      hitScore: "86/100",
      hrScore: "85/100",
      avg: ".228",
      obp: ".320",
      slg: ".444",
      ops: ".773",
      why: "Strong Angels bat, but tougher matchup."
    }
  ],

  moneyline: [
    {
      team: "Boston Red Sox",
      reason: "Strong play only: better starter, better offense, and Johnson is the target pitcher.",
      confidence: "86%"
    },
    {
      team: "Los Angeles Dodgers",
      reason: "Home-field edge, stronger overall roster, and market lean.",
      confidence: "85%"
    }
  ],

  weather: [
    {
      stadium: "Angel Stadium",
      condition: "Clear • 81°F • 1% rain • 8 MPH wind out to center",
      boost: "Strong HR weather"
    }
  ],

  nrfi: []
};
