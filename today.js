const todayData = {
  dashboard: {
    topHRPick: "Wilyer Abreu",
    topHitPick: "Willson Contreras",
    bestMoneyline: "Boston Red Sox",
    bestNRFI: "Boston Red Sox vs Los Angeles Angels - NRFI Lean",
    bestWeather: "Angel Stadium"
  },

  games: [
    {
      game: "Boston Red Sox vs Los Angeles Angels",
      time: "9:31 PM ET",
      venue: "Angel Stadium",
      finalGrade: "A",
      total: "8",

      pitchers: {
        away: {
          name: "R. Suarez",
          team: "Boston Red Sox",
          throws: "LHP",
          stats: "4-3 • 2.94 ERA • 1.13 WHIP • 92 K in 88.2 IP • Strong Boston pitching edge",
          era: "2.94",
          whip: "1.13",
          hr9: "Low risk",
          hardHit: "N/A",
          barrel: "N/A",
          flyBall: "N/A",
          groundBall: "Strong GB profile",
          kRate: "92 K",
          bbRate: "N/A",
          xERA: "N/A",
          xFIP: "N/A",
          firstInning: "Strong NRFI profile",
          risk: "🔥🔥"
        },

        home: {
          name: "R. Johnson",
          team: "Los Angeles Angels",
          throws: "RHP",
          stats: "1-3 • 7.40 ERA • 1.52 WHIP • 18 K • POPS target pitcher for hits and HRs",
          era: "7.40",
          whip: "1.52",
          hr9: "High risk",
          hardHit: "High traffic pitcher",
          barrel: "HR risk",
          flyBall: "N/A",
          groundBall: "N/A",
          kRate: "18 K",
          bbRate: "N/A",
          xERA: "N/A",
          xFIP: "N/A",
          firstInning: "YRFI danger because of baserunners",
          risk: "🔥🔥🔥🔥"
        }
      },

      moneylinePick: {
        pick: "Boston Red Sox",
        line: "-154",
        confidence: "72%",
        reason: "Boston has the stronger starter, better offensive targets, and faces the higher-risk pitcher."
      },

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
        reason: "Suarez supports NRFI, but Johnson plus wind out creates some YRFI danger."
      },

      teamEdge: {
        startingPitching: "Boston Red Sox",
        bullpen: "Boston Red Sox lean",
        offense: "Boston Red Sox",
        defense: "N/A",
        recentForm: "Boston Red Sox"
      },

      hrTargets: [
        {
          player: "Wilyer Abreu",
          score: "90/100",
          reason: "Best HR odds on board at +330, bats left vs RHP, wind out."
        },
        {
          player: "Willson Contreras",
          score: "88/100",
          reason: ".286 AVG • .912 OPS • strong power bat at +360."
        },
        {
          player: "Zach Neto",
          score: "84/100",
          reason: "18 HR power profile and +400 HR odds."
        },
        {
          player: "Jarren Duran",
          score: "80/100",
          reason: "Lefty bat with speed/contact upside and +430 HR price."
        },
        {
          player: "Jorge Soler",
          score: "78/100",
          reason: "Power-first bat with +450 HR odds."
        },
        {
          player: "Jo Adell",
          score: "76/100",
          reason: "Power upside at +470, but more strikeout risk."
        },
        {
          player: "Jose Siri",
          score: "74/100",
          reason: "Long-shot power bat at +480."
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
          iso: "Strong",
          xBA: "N/A",
          xSLG: "N/A",
          hardHit: "Power contact",
          barrel: "Strong",
          sweetSpot: "N/A",
          chase: "N/A",
          whiff: "N/A",
          strikeout: "N/A",
          walk: "Good OBP profile",
          hitsLast10: "N/A",
          splits: "RHB vs RHP",
          bvp: "N/A",
          pitcherMatchup: "Johnson: 7.40 ERA • 1.52 WHIP",
          why: "Best overall hit profile on Boston with strong AVG, OBP, OPS, and matchup."
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
          iso: "Solid",
          xBA: "N/A",
          xSLG: "N/A",
          hardHit: "Strong",
          barrel: "Strong",
          sweetSpot: "N/A",
          chase: "N/A",
          whiff: "N/A",
          strikeout: "N/A",
          walk: "N/A",
          hitsLast10: "N/A",
          splits: "LHB vs RHP",
          bvp: "N/A",
          pitcherMatchup: "Johnson: 7.40 ERA • 1.52 WHIP",
          why: "Top POPS HR target and strong hit target against a high-WHIP pitcher."
        },
        {
          player: "Zach Neto",
          matchup: "vs R. Suarez",
          hitScore: "86/100",
          hrScore: "84/100",
          avg: ".228",
          obp: ".320",
          slg: ".444",
          ops: ".773",
          iso: "Strong",
          xBA: "N/A",
          xSLG: "N/A",
          hardHit: "Power profile",
          barrel: "Strong",
          sweetSpot: "N/A",
          chase: "N/A",
          whiff: "N/A",
          strikeout: "N/A",
          walk: "N/A",
          hitsLast10: "N/A",
          splits: "RHB vs LHP",
          bvp: "N/A",
          pitcherMatchup: "Suarez: 2.94 ERA • 1.13 WHIP",
          why: "Best Angels hitter profile, but tougher matchup vs Suarez."
        },
        {
          player: "Jarren Duran",
          matchup: "vs R. Johnson",
          hitScore: "82/100",
          hrScore: "80/100",
          avg: ".193",
          obp: ".254",
          slg: ".348",
          ops: ".602",
          iso: "Moderate",
          xBA: "N/A",
          xSLG: "N/A",
          hardHit: "N/A",
          barrel: "N/A",
          sweetSpot: "N/A",
          chase: "N/A",
          whiff: "N/A",
          strikeout: "N/A",
          walk: "N/A",
          hitsLast10: "Recent form improving",
          splits: "LHB vs RHP",
          bvp: "N/A",
          pitcherMatchup: "Johnson: 7.40 ERA • 1.52 WHIP",
          why: "Season stats are weaker, but matchup, speed, and lineup value keep him in the hit pool."
        }
      ]
    }
  ],

  pitcherTargets: [
    {
      pitcher: "R. Johnson",
      stats: "Target pitcher • 7.40 ERA • 1.52 WHIP • Boston bats get hit and HR edge",
      grade: "🔥🔥🔥🔥"
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
      why: "Best hit profile and strong power profile."
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
      why: "Best HR target and strong lefty matchup."
    },
    {
      player: "Zach Neto",
      matchup: "vs R. Suarez",
      hitScore: "86/100",
      hrScore: "84/100",
      avg: ".228",
      obp: ".320",
      slg: ".444",
      ops: ".773",
      why: "Best Angels bat, but tougher pitcher matchup."
    },
    {
      player: "Jarren Duran",
      matchup: "vs R. Johnson",
      hitScore: "82/100",
      hrScore: "80/100",
      avg: ".193",
      obp: ".254",
      slg: ".348",
      ops: ".602",
      why: "Better matchup play than season-stat play."
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
    },
    {
      player: "Jarren Duran",
      matchup: "vs R. Johnson",
      barrel: 10,
      hardHit: 44,
      iso: 0.155,
      hr9: 1.7,
      weather: 8,
      ballpark: 7,
      platoon: 8
    }
  ],

  moneyline: [
    {
      team: "Boston Red Sox",
      reason: "Better starting pitcher, better offensive targets, and Johnson is the main pitcher to attack.",
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
      reason: "Suarez supports NRFI, but Johnson and wind out create YRFI danger."
    }
  ]
};
