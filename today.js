const todayData = {
  games: [
    {
      game: "Philadelphia Phillies vs Kansas City Royals",
      time: "Tomorrow",
      venue: "Kauffman Stadium",
      pitchers: {
        away: {
          name: "Christopher Sánchez",
          team: "Philadelphia Phillies",
          throws: "LHP",
          era: "Strong profile",
          hr9: "Low HR risk",
          flyBall: "Ground-ball lean",
          targetRating: "🔥🔥",
          verdict: "Not a main pitcher to attack."
        },
        home: {
          name: "Noah Cameron",
          team: "Kansas City Royals",
          throws: "LHP",
          era: "Solid profile",
          hr9: "Moderate HR risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥🔥",
          verdict: "Phillies right-handed bats are the better side to attack."
        }
      },
      hrTargets: [
        {
          player: "Kyle Schwarber",
          score: 88,
          grade: "Strong",
          matchup: "vs Noah Cameron",
          reason: "Elite power profile with HR upside even in lefty-lefty matchup."
        },
        {
          player: "Trea Turner",
          score: 84,
          grade: "Strong",
          matchup: "vs Noah Cameron",
          reason: "Strong contact and power-speed profile."
        }
      ],
      hitTargets: [
        {
          player: "Trea Turner",
          grade: "Very Strong",
          score: 91,
          matchup: "vs Noah Cameron",
          reason: "Best Phillies hit profile with contact, speed, and lineup value."
        },
        {
          player: "Bobby Witt Jr.",
          grade: "Elite",
          score: 94,
          matchup: "vs Christopher Sánchez",
          reason: "Best Royals hitter with elite contact and power profile."
        }
      ],
      moneylinePick: {
        pick: "Philadelphia Phillies",
        line: "Lean",
        confidence: "86%",
        reason: "Better overall offense and stronger top-end lineup."
      },
      nrfi: {
        pick: "NRFI Lean",
        confidence: "85%",
        reason: "Both starters have enough quality to limit early damage."
      }
    },

    {
      game: "New York Yankees vs Tampa Bay Rays",
      time: "Tomorrow",
      venue: "Tropicana Field",
      pitchers: {
        away: {
          name: "Cam Schlittler",
          team: "New York Yankees",
          throws: "RHP",
          era: "Young arm profile",
          hr9: "Moderate HR risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥🔥",
          verdict: "Rays contact bats can attack if command is shaky."
        },
        home: {
          name: "Griffin Jax",
          team: "Tampa Bay Rays",
          throws: "RHP",
          era: "Bullpen/opener profile",
          hr9: "Power risk",
          flyBall: "Fly-ball lean",
          targetRating: "🔥🔥🔥🔥",
          verdict: "Yankees power bats are live."
        }
      },
      hrTargets: [
        {
          player: "Aaron Judge",
          score: 92,
          grade: "Very Strong",
          matchup: "vs Griffin Jax",
          reason: "Elite power profile in any matchup."
        },
        {
          player: "Juan Soto",
          score: 89,
          grade: "Strong",
          matchup: "vs Griffin Jax",
          reason: "Elite plate discipline and power."
        }
      ],
      hitTargets: [
        {
          player: "Aaron Judge",
          grade: "Elite",
          score: 95,
          matchup: "vs Griffin Jax",
          reason: "Elite OPS and hard-contact profile."
        },
        {
          player: "Juan Soto",
          grade: "Elite",
          score: 94,
          matchup: "vs Griffin Jax",
          reason: "Elite OBP and contact/power blend."
        }
      ],
      moneylinePick: {
        pick: "New York Yankees",
        line: "Lean",
        confidence: "85%",
        reason: "More power upside and better impact bats."
      },
      nrfi: {
        pick: "NRFI Lean",
        confidence: "85%",
        reason: "Tropicana Field helps suppress some HR weather impact."
      }
    },

    {
      game: "Houston Astros vs Washington Nationals",
      time: "Tomorrow",
      venue: "Nationals Park",
      pitchers: {
        away: {
          name: "Mike Burrows",
          team: "Houston Astros",
          throws: "RHP",
          era: "Contact risk",
          hr9: "Moderate HR risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥🔥",
          verdict: "Nationals bats have hit value."
        },
        home: {
          name: "Miles Mikolas",
          team: "Washington Nationals",
          throws: "RHP",
          era: "Contact-heavy profile",
          hr9: "HR risk",
          flyBall: "Elevated contact",
          targetRating: "🔥🔥🔥🔥",
          verdict: "Astros bats are the better attack side."
        }
      },
      hrTargets: [
        {
          player: "Yordan Alvarez",
          score: 93,
          grade: "Very Strong",
          matchup: "vs Miles Mikolas",
          reason: "Elite left-handed power against contact pitcher."
        },
        {
          player: "Jose Altuve",
          score: 84,
          grade: "Strong",
          matchup: "vs Miles Mikolas",
          reason: "Strong pull-side power and contact."
        }
      ],
      hitTargets: [
        {
          player: "Yordan Alvarez",
          grade: "Elite",
          score: 94,
          matchup: "vs Miles Mikolas",
          reason: "Elite OPS and damage profile."
        },
        {
          player: "Jose Altuve",
          grade: "Very Strong",
          score: 90,
          matchup: "vs Miles Mikolas",
          reason: "Contact and lineup value."
        },
        {
          player: "James Wood",
          grade: "Strong",
          score: 87,
          matchup: "vs Mike Burrows",
          reason: "Best Nationals impact bat."
        }
      ],
      moneylinePick: {
        pick: "Houston Astros",
        line: "Lean",
        confidence: "85%",
        reason: "Better offense and better matchup vs Mikolas."
      },
      nrfi: {
        pick: "YRFI Lean",
        confidence: "85%",
        reason: "Both pitchers allow enough contact for early traffic."
      }
    },

    {
      game: "New York Mets vs Atlanta Braves",
      time: "Tomorrow",
      venue: "Truist Park",
      pitchers: {
        away: {
          name: "Freddy Peralta",
          team: "New York Mets",
          throws: "RHP",
          era: "Power arm",
          hr9: "Fly-ball HR risk",
          flyBall: "Elevated",
          targetRating: "🔥🔥🔥",
          verdict: "Braves power bats are live."
        },
        home: {
          name: "Reynaldo López",
          team: "Atlanta Braves",
          throws: "RHP",
          era: "Strong profile",
          hr9: "Moderate risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥🔥",
          verdict: "Mets power bats can attack if command slips."
        }
      },
      hrTargets: [
        {
          player: "Matt Olson",
          score: 90,
          grade: "Very Strong",
          matchup: "vs Freddy Peralta",
          reason: "Elite left-handed power at Truist Park."
        },
        {
          player: "Pete Alonso",
          score: 88,
          grade: "Strong",
          matchup: "vs Reynaldo López",
          reason: "Elite HR profile in any park."
        }
      ],
      hitTargets: [
        {
          player: "Matt Olson",
          grade: "Very Strong",
          score: 91,
          matchup: "vs Freddy Peralta",
          reason: "Power and OBP profile."
        },
        {
          player: "Pete Alonso",
          grade: "Strong",
          score: 87,
          matchup: "vs Reynaldo López",
          reason: "Best Mets power bat."
        }
      ],
      moneylinePick: {
        pick: "Atlanta Braves",
        line: "Lean",
        confidence: "85%",
        reason: "Home field and stronger lineup depth."
      },
      nrfi: {
        pick: "Pass",
        confidence: "Pass",
        reason: "Too much early power on both sides."
      }
    },

    {
      game: "Milwaukee Brewers vs St. Louis Cardinals",
      time: "Tomorrow",
      venue: "Busch Stadium",
      pitchers: {
        away: {
          name: "Shane Drohan",
          team: "Milwaukee Brewers",
          throws: "LHP",
          era: "Young arm risk",
          hr9: "Moderate risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥🔥",
          verdict: "Cardinals right-handed bats can attack."
        },
        home: {
          name: "Dustin May",
          team: "St. Louis Cardinals",
          throws: "RHP",
          era: "Ground-ball profile",
          hr9: "Lower HR risk",
          flyBall: "Low",
          targetRating: "🔥🔥",
          verdict: "Not a main pitcher to attack."
        }
      },
      hrTargets: [
        {
          player: "Willson Contreras",
          score: 87,
          grade: "Strong",
          matchup: "vs Shane Drohan",
          reason: "Strong right-handed power vs lefty."
        }
      ],
      hitTargets: [
        {
          player: "Willson Contreras",
          grade: "Elite",
          score: 95,
          matchup: "vs Shane Drohan",
          reason: "Best Cardinals hit and power profile."
        }
      ],
      moneylinePick: {
        pick: "St. Louis Cardinals",
        line: "Lean",
        confidence: "85%",
        reason: "Better starting pitcher profile and home field."
      },
      nrfi: {
        pick: "NRFI Lean",
        confidence: "85%",
        reason: "Busch Stadium lowers HR environment."
      }
    },

    {
      game: "Arizona Diamondbacks vs San Diego Padres",
      time: "Tomorrow",
      venue: "Petco Park",
      pitchers: {
        away: {
          name: "Brandon Pfaadt",
          team: "Arizona Diamondbacks",
          throws: "RHP",
          era: "HR-risk profile",
          hr9: "High HR risk",
          flyBall: "Elevated",
          targetRating: "🔥🔥🔥🔥",
          verdict: "Padres bats are live for HRs."
        },
        home: {
          name: "Walker Buehler",
          team: "San Diego Padres",
          throws: "RHP",
          era: "Command risk",
          hr9: "Moderate HR risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥🔥",
          verdict: "Diamondbacks bats have hit upside."
        }
      },
      hrTargets: [
        {
          player: "Fernando Tatis Jr.",
          score: 91,
          grade: "Very Strong",
          matchup: "vs Brandon Pfaadt",
          reason: "Elite power-speed profile vs HR-risk pitcher."
        },
        {
          player: "Manny Machado",
          score: 88,
          grade: "Strong",
          matchup: "vs Brandon Pfaadt",
          reason: "Strong pull-side power and matchup."
        }
      ],
      hitTargets: [
        {
          player: "Fernando Tatis Jr.",
          grade: "Elite",
          score: 94,
          matchup: "vs Brandon Pfaadt",
          reason: "Best Padres impact bat."
        },
        {
          player: "Manny Machado",
          grade: "Very Strong",
          score: 90,
          matchup: "vs Brandon Pfaadt",
          reason: "Strong contact and power profile."
        }
      ],
      moneylinePick: {
        pick: "San Diego Padres",
        line: "Lean",
        confidence: "86%",
        reason: "Home field and better impact bats vs Pfaadt."
      },
      nrfi: {
        pick: "Pass",
        confidence: "Pass",
        reason: "Too much HR risk from Pfaadt."
      }
    },

    {
      game: "Toronto Blue Jays vs San Francisco Giants",
      time: "Tomorrow",
      venue: "Oracle Park",
      pitchers: {
        away: {
          name: "Kevin Gausman",
          team: "Toronto Blue Jays",
          throws: "RHP",
          era: "Strong profile",
          hr9: "Moderate risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥",
          verdict: "Not a main pitcher to attack."
        },
        home: {
          name: "Landen Roupp",
          team: "San Francisco Giants",
          throws: "RHP",
          era: "Contact risk",
          hr9: "Moderate HR risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥🔥",
          verdict: "Blue Jays bats have hit upside."
        }
      },
      hrTargets: [
        {
          player: "Vladimir Guerrero Jr.",
          score: 89,
          grade: "Strong",
          matchup: "vs Landen Roupp",
          reason: "Elite contact/power profile."
        }
      ],
      hitTargets: [
        {
          player: "Vladimir Guerrero Jr.",
          grade: "Elite",
          score: 95,
          matchup: "vs Landen Roupp",
          reason: "Top Blue Jays hit profile."
        },
        {
          player: "Bo Bichette",
          grade: "Very Strong",
          score: 91,
          matchup: "vs Landen Roupp",
          reason: "Strong contact profile."
        }
      ],
      moneylinePick: {
        pick: "Toronto Blue Jays",
        line: "Lean",
        confidence: "85%",
        reason: "Gausman gives Toronto the starting pitching edge."
      },
      nrfi: {
        pick: "NRFI Lean",
        confidence: "86%",
        reason: "Oracle Park and Gausman profile support early suppression."
      }
    },

    {
      game: "Colorado Rockies vs Los Angeles Dodgers",
      time: "Tomorrow",
      venue: "Dodger Stadium",
      pitchers: {
        away: {
          name: "Kyle Freeland",
          team: "Colorado Rockies",
          throws: "LHP",
          era: "Target profile",
          hr9: "High HR risk",
          flyBall: "Elevated",
          targetRating: "🔥🔥🔥🔥🔥",
          verdict: "Main pitcher to attack for Dodgers HRs and hits."
        },
        home: {
          name: "Eric Lauer",
          team: "Los Angeles Dodgers",
          throws: "LHP",
          era: "Solid profile",
          hr9: "Moderate HR risk",
          flyBall: "Moderate",
          targetRating: "🔥🔥🔥",
          verdict: "Rockies right-handed bats have some value."
        }
      },
      hrTargets: [
        {
          player: "Shohei Ohtani",
          score: 96,
          grade: "Elite",
          matchup: "vs Kyle Freeland",
          reason: "Elite power profile vs target lefty."
        },
        {
          player: "Mookie Betts",
          score: 93,
          grade: "Very Strong",
          matchup: "vs Kyle Freeland",
          reason: "Elite right-handed bat vs lefty."
        },
        {
          player: "Will Smith",
          score: 91,
          grade: "Very Strong",
          matchup: "vs Kyle Freeland",
          reason: "Strong power/contact profile vs LHP."
        },
        {
          player: "Freddie Freeman",
          score: 88,
          grade: "Strong",
          matchup: "vs Kyle Freeland",
          reason: "Elite hitter even without platoon edge."
        }
      ],
      hitTargets: [
        {
          player: "Shohei Ohtani",
          grade: "Elite",
          score: 97,
          matchup: "vs Kyle Freeland",
          reason: "Top overall bat on the slate."
        },
        {
          player: "Mookie Betts",
          grade: "Elite",
          score: 96,
          matchup: "vs Kyle Freeland",
          reason: "Elite contact and power vs LHP."
        },
        {
          player: "Freddie Freeman",
          grade: "Elite",
          score: 95,
          matchup: "vs Kyle Freeland",
          reason: "Elite hit profile."
        },
        {
          player: "Will Smith",
          grade: "Very Strong",
          score: 92,
          matchup: "vs Kyle Freeland",
          reason: "Strong contact/power catcher profile."
        }
      ],
      moneylinePick: {
        pick: "Los Angeles Dodgers",
        line: "Strong favorite",
        confidence: "92%",
        reason: "Best team edge on the slate with Freeland as the top target pitcher."
      },
      nrfi: {
        pick: "YRFI Lean",
        confidence: "87%",
        reason: "Dodgers vs Freeland creates early-run upside."
      }
    }
  ],

  pitcherTargets: [
    {
      pitcher: "Kyle Freeland",
      team: "Colorado Rockies",
      era: "Target profile",
      hr9: "High HR risk",
      flyBall: "Elevated",
      grade: "🔥🔥🔥🔥🔥",
      verdict: "Primary pitcher to attack."
    },
    {
      pitcher: "Brandon Pfaadt",
      team: "Arizona Diamondbacks",
      era: "HR-risk profile",
      hr9: "High HR risk",
      flyBall: "Elevated",
      grade: "🔥🔥🔥🔥",
      verdict: "Padres bats are live."
    },
    {
      pitcher: "Miles Mikolas",
      team: "Washington Nationals",
      era: "Contact-heavy profile",
      hr9: "HR risk",
      flyBall: "Elevated contact",
      grade: "🔥🔥🔥🔥",
      verdict: "Astros bats are live."
    },
    {
      pitcher: "Griffin Jax",
      team: "Tampa Bay Rays",
      era: "Bullpen/opener profile",
      hr9: "Power risk",
      flyBall: "Fly-ball lean",
      grade: "🔥🔥🔥🔥",
      verdict: "Yankees power bats are live."
    }
  ],

  hrPicks: [
    { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 96, grade: "Elite" },
    { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 93, grade: "Very Strong" },
    { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 93, grade: "Very Strong" },
    { player: "Aaron Judge", matchup: "vs Griffin Jax", score: 92, grade: "Very Strong" },
    { player: "Fernando Tatis Jr.", matchup: "vs Brandon Pfaadt", score: 91, grade: "Very Strong" },
    { player: "Will Smith", matchup: "vs Kyle Freeland", score: 91, grade: "Very Strong" },
    { player: "Matt Olson", matchup: "vs Freddy Peralta", score: 90, grade: "Very Strong" },
    { player: "Vladimir Guerrero Jr.", matchup: "vs Landen Roupp", score: 89, grade: "Strong" },
    { player: "Juan Soto", matchup: "vs Griffin Jax", score: 89, grade: "Strong" },
    { player: "Kyle Schwarber", matchup: "vs Noah Cameron", score: 88, grade: "Strong" }
  ],

  batterStats: [
    { player: "Shohei Ohtani", matchup: "vs Kyle Freeland", score: 97, grade: "Elite", why: "Top overall bat on the slate." },
    { player: "Mookie Betts", matchup: "vs Kyle Freeland", score: 96, grade: "Elite", why: "Elite contact and power vs LHP." },
    { player: "Vladimir Guerrero Jr.", matchup: "vs Landen Roupp", score: 95, grade: "Elite", why: "Elite hit profile." },
    { player: "Freddie Freeman", matchup: "vs Kyle Freeland", score: 95, grade: "Elite", why: "Elite contact profile." },
    { player: "Aaron Judge", matchup: "vs Griffin Jax", score: 95, grade: "Elite", why: "Elite OPS and power." },
    { player: "Bobby Witt Jr.", matchup: "vs Christopher Sánchez", score: 94, grade: "Elite", why: "Best Royals hitter." },
    { player: "Yordan Alvarez", matchup: "vs Miles Mikolas", score: 94, grade: "Elite", why: "Elite power/contact profile." },
    { player: "Fernando Tatis Jr.", matchup: "vs Brandon Pfaadt", score: 94, grade: "Elite", why: "Best Padres impact bat." },
    { player: "Juan Soto", matchup: "vs Griffin Jax", score: 94, grade: "Elite", why: "Elite OBP and contact." },
    { player: "Will Smith", matchup: "vs Kyle Freeland", score: 92, grade: "Very Strong", why: "Strong catcher bat vs LHP." }
  ],

  moneyline: [
    {
      team: "Los Angeles Dodgers",
      reason: "Best overall edge on the slate against Kyle Freeland.",
      confidence: "92%"
    },
    {
      team: "San Diego Padres",
      reason: "Home field and strong matchup vs Brandon Pfaadt.",
      confidence: "86%"
    },
    {
      team: "Philadelphia Phillies",
      reason: "Better offensive profile and lineup depth.",
      confidence: "86%"
    },
    {
      team: "New York Yankees",
      reason: "Power edge and better impact bats.",
      confidence: "85%"
    },
    {
      team: "Toronto Blue Jays",
      reason: "Gausman gives Toronto the starting pitching edge.",
      confidence: "85%"
    }
  ],

  nrfi: [
    {
      game: "Toronto Blue Jays vs San Francisco Giants",
      pick: "NRFI Lean",
      confidence: "86%",
      reason: "Oracle Park and Gausman profile support early suppression."
    },
    {
      game: "Milwaukee Brewers vs St. Louis Cardinals",
      pick: "NRFI Lean",
      confidence: "85%",
      reason: "Busch Stadium lowers HR environment."
    },
    {
      game: "Colorado Rockies vs Los Angeles Dodgers",
      pick: "YRFI Lean",
      confidence: "87%",
      reason: "Dodgers vs Freeland creates early-run upside."
    }
  ]
};
