const todayData = {
  games: [
    {
      game: "Boston Red Sox vs Los Angeles Angels",
      time: "9:31 PM ET",
      venue: "Angel Stadium",

      pitchers: {
        away: {
          name: "Ranger Suárez",
          team: "Boston Red Sox",
          throws: "LHP",
          era: "2.94",
          hr9: "Low risk",
          flyBall: "36%",
          targetRating: "🔥🔥",
          verdict: "Not a main pitcher to attack."
        },
        home: {
          name: "Ryan Johnson",
          team: "Los Angeles Angels",
          throws: "RHP",
          era: "7.40",
          hr9: "2.22",
          flyBall: "High",
          targetRating: "🔥🔥🔥🔥🔥",
          verdict: "Primary pitcher to attack for Boston hitters."
        }
      },

      hrTargets: [
        {
          player: "Wilyer Abreu",
          score: "90/100",
          odds: "+330",
          grade: "Very Strong",
          reason: "Lefty bat vs high-risk RHP with strong HR odds and wind out."
        },
        {
          player: "Willson Contreras",
          score: "88/100",
          odds: "+360",
          grade: "Strong",
          reason: "Strong power profile and favorable matchup vs Johnson."
        },
        {
          player: "Zach Neto",
          score: "85/100",
          odds: "+400",
          grade: "Strong",
          reason: "Best Angels power bat, but tougher matchup vs Suárez."
        }
      ],

      hitTargets: [
        {
          player: "Willson Contreras",
          grade: "Elite",
          score: "95/100",
          avg: ".286",
          obp: ".377",
          ops: ".912",
          reason: "Best overall hit profile with strong AVG, OBP, OPS, and power."
        },
        {
          player: "Wilyer Abreu",
          grade: "Very Strong",
          score: "92/100",
          avg: ".267",
          obp: ".336",
          ops: ".769",
          reason: "Strong lefty matchup vs Johnson and playable HR upside."
        },
        {
          player: "Zach Neto",
          grade: "Strong",
          score: "85/100",
          avg: ".228",
          obp: ".320",
          ops: ".773",
          reason: "Top Angels hit/power target, but matchup is tougher."
        }
      ],

      moneylinePick: {
        pick: "Boston Red Sox",
        line: "-154",
        confidence: "86%",
        reason: "Better starting pitcher edge and Boston gets the clear pitcher to attack."
      },

      nrfi: {
        pick: "Pass",
        confidence: "Pass",
        reason: "Suárez supports NRFI, but Johnson creates too much YRFI risk."
      }
    }
  ],

  pitcherTargets: [
    {
      pitcher: "Ranger Suárez",
      team: "Boston Red Sox",
      era: "2.94",
      hr9: "Low risk",
      flyBall: "36%",
      grade: "🔥🔥",
      verdict: "Not a main pitcher to attack."
    },
    {
      pitcher: "Ryan Johnson",
      team: "Los Angeles Angels",
      era: "7.40",
      hr9: "2.22",
      flyBall: "High",
      grade: "🔥🔥🔥🔥🔥",
      verdict: "Primary pitcher to attack."
    }
  ],

  hrPicks: [
    {
      player: "Wilyer Abreu",
      matchup: "vs Ryan Johnson",
      score: "90/100",
      odds: "+330",
      grade: "Very Strong"
    },
    {
      player: "Willson Contreras",
      matchup: "vs Ryan Johnson",
      score: "88/100",
      odds: "+360",
      grade: "Strong"
    },
    {
      player: "Zach Neto",
      matchup: "vs Ranger Suárez",
      score: "85/100",
      odds: "+400",
      grade: "Strong"
    }
  ],

  batterStats: [
    {
      player: "Willson Contreras",
      matchup: "vs Ryan Johnson",
      hitScore: "95/100",
      grade: "Elite",
      avg: ".286",
      obp: ".377",
      ops: ".912",
      why: "Elite hit profile."
    },
    {
      player: "Wilyer Abreu",
      matchup: "vs Ryan Johnson",
      hitScore: "92/100",
      grade: "Very Strong",
      avg: ".267",
      obp: ".336",
      ops: ".769",
      why: "Strong matchup vs target pitcher."
    },
    {
      player: "Zach Neto",
      matchup: "vs Ranger Suárez",
      hitScore: "85/100",
      grade: "Strong",
      avg: ".228",
      obp: ".320",
      ops: ".773",
      why: "Best Angels bat, tougher matchup."
    }
  ],

  moneyline: [
    {
      team: "Boston Red Sox",
      reason: "Better starter and better matchup vs target pitcher Ryan Johnson.",
      confidence: "86%"
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
