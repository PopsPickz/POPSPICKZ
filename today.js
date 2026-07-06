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
          hr9: "0.51",
          flyBall: "Low FB / 40.0% GB",
          targetRating: "🔥🔥",
          verdict: "Not a main pitcher to attack."
        },
        home: {
          name: "Ryan Johnson",
          team: "Los Angeles Angels",
          throws: "RHP",
          era: "7.40",
          hr9: "2.22",
          flyBall: "34.9%",
          hardHit: "39.8%",
          barrel: "7.2%",
          targetRating: "🔥🔥🔥🔥🔥",
          verdict: "Main pitcher to attack for Boston hits, runs, and HRs."
        }
      },

      hrTargets: [
        {
          player: "Wilyer Abreu",
          score: "90/100",
          odds: "+330",
          grade: "Very Strong",
          avg: ".266",
          obp: ".331",
          slg: ".429",
          ops: ".760",
          reason: "Lefty bat vs high-risk RHP Johnson with strong HR odds and wind out."
        },
        {
          player: "Willson Contreras",
          score: "88/100",
          odds: "+360",
          grade: "Strong",
          avg: ".283",
          obp: ".377",
          slg: ".529",
          ops: ".906",
          reason: "Best Boston power/contact profile against Johnson."
        },
        {
          player: "Zach Neto",
          score: "85/100",
          odds: "+400",
          grade: "Strong",
          reason: "Top Angels power bat, but matchup is tougher vs Suárez."
        }
      ],

      hitTargets: [
        {
          player: "Willson Contreras",
          grade: "Elite",
          score: "95/100",
          avg: ".283",
          obp: ".377",
          slg: ".529",
          ops: ".906",
          reason: "Best hit profile in this game."
        },
        {
          player: "Wilyer Abreu",
          grade: "Very Strong",
          score: "92/100",
          avg: ".266",
          obp: ".331",
          slg: ".429",
          ops: ".760",
          reason: "Strong matchup vs Johnson."
        },
        {
          player: "Ceddanne Rafaela",
          grade: "Strong",
          score: "87/100",
          avg: ".282",
          obp: ".331",
          slg: ".435",
          ops: ".766",
          reason: "Strong hit profile and Boston matchup edge."
        }
      ],

      moneylinePick: {
        pick: "Boston Red Sox",
        line: "-154",
        confidence: "86%",
        reason: "Boston has the better starter and faces the clear target pitcher."
      },

      nrfi: {
        pick: "Pass",
        confidence: "Pass",
        reason: "Suárez supports NRFI, but Johnson creates YRFI risk."
      }
    }
  ],

  pitcherTargets: [
    {
      pitcher: "Ranger Suárez",
      team: "Boston Red Sox",
      era: "2.94",
      hr9: "0.51",
      flyBall: "Low FB / 40.0% GB",
      grade: "🔥🔥",
      verdict: "Not a main pitcher to attack."
    },
    {
      pitcher: "Ryan Johnson",
      team: "Los Angeles Angels",
      era: "7.40",
      hr9: "2.22",
      flyBall: "34.9%",
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
      avg: ".283",
      obp: ".377",
      slg: ".529",
      ops: ".906",
      why: "Elite hit profile."
    },
    {
      player: "Wilyer Abreu",
      matchup: "vs Ryan Johnson",
      hitScore: "92/100",
      grade: "Very Strong",
      avg: ".266",
      obp: ".331",
      slg: ".429",
      ops: ".760",
      why: "Strong matchup vs target pitcher."
    },
    {
      player: "Ceddanne Rafaela",
      matchup: "vs Ryan Johnson",
      hitScore: "87/100",
      grade: "Strong",
      avg: ".282",
      obp: ".331",
      slg: ".435",
      ops: ".766",
      why: "Strong hit profile."
    }
  ],

  moneyline: [
    {
      team: "Boston Red Sox",
      reason: "Better starter and better matchup vs target pitcher Ryan Johnson.",
      confidence: "86%"
    }
  ],

  nrfi: []
};
