const todayData = {
  hrPicks: [
    {
  player: "Juan Soto",
  matchup: "vs RHP",

  barrel: 22,
  hardHit: 61,
  iso: .360,
  hr9: 1.8,
  weather: 8,
  ballpark: 9,
  platoon: 10
},
    {
  player: "Shohei Ohtani",
  matchup: "vs RHP",
  barrel: 19,
  hardHit: 58,
  iso: 0.340,
  hr9: 1.5,
  weather: 7,
  ballpark: 8,
  platoon: 10
},
    { player: "Kyle Schwarber", matchup: "vs RHP", note: "HR upside + hitter-friendly park", popsScore: 88 }
  ],

  pitcherTargets: [
  {
    pitcher: "JP Sears",
    stats: "Padres vs Dodgers • LHP • ERA: 6.97 • WHIP: 1.74 • Last start: 3 HR allowed • POPS HR Risk: Very High",
    grade: "🔥🔥🔥🔥🔥"
  },
  {
    pitcher: "Ryan Johnson",
    stats: "Angels vs Red Sox • RHP • ERA: 7.40 • WHIP: 1.52 • POPS HR Risk: Very High",
    grade: "🔥🔥🔥🔥🔥"
  },
  {
    pitcher: "Emmet Sheehan",
    stats: "Dodgers vs Padres • RHP • ERA: 5.08 • WHIP: 1.27 • POPS HR Risk: High",
    grade: "🔥🔥🔥🔥"
  },
  {
    pitcher: "Emerson Hancock",
    stats: "Mariners vs Blue Jays • RHP • Barrel% Allowed: 9.8 • Hard-Hit% Allowed: 44.9 • Avg EV: 90.6 • POPS HR Risk: High",
    grade: "🔥🔥🔥🔥"
  },
  {
    pitcher: "Ranger Suarez",
    stats: "Red Sox vs Angels • LHP • Last 7 ERA: 3.60 • Last 30 ERA: 2.94 • WHIP: 1.13 • POPS HR Risk: Medium",
    grade: "🔥🔥"
  },
  {
    pitcher: "Trey Yesavage",
    stats: "Blue Jays vs Mariners • RHP • ERA: 3.34 • WHIP: 1.10 • Hard-Hit% Allowed: 37.0 • POPS HR Risk: Low-Medium",
    grade: "🔥🔥"
  }
],
  moneyline: [
  {
    team: "Seattle Mariners",
    matchup: "Blue Jays @ Mariners",
    starter: "Edge: Emerson Hancock",
    bullpen: "Edge: Mariners",
    offense: "Edge: Mariners",
    defense: "Edge: Mariners",
    runSupport: "Edge: Mariners",
    confidence: "76%",
    popsGrade: "⭐⭐⭐⭐",
    pick: "Mariners ML"
  },
  {
    team: "Los Angeles Dodgers",
    matchup: "Padres @ Dodgers",
    starter: "Edge: Dodgers",
    bullpen: "Edge: Padres",
    offense: "Edge: Dodgers",
    defense: "Edge: Dodgers",
    runSupport: "Edge: Dodgers",
    confidence: "83%",
    popsGrade: "⭐⭐⭐⭐⭐",
    pick: "Dodgers ML"
  },
  {
    team: "Boston Red Sox",
    matchup: "Red Sox @ Angels",
    starter: "Edge: Ranger Suarez",
    bullpen: "Edge: Red Sox",
    offense: "Edge: Red Sox",
    defense: "Edge: Red Sox",
    runSupport: "Edge: Red Sox",
    confidence: "72%",
    popsGrade: "⭐⭐⭐⭐",
    pick: "Red Sox ML"
  }
],

  weather: [
    { stadium: "Yankee Stadium", condition: "Wind blowing out 12 MPH", boost: "🔥🔥" },
    { stadium: "Citizens Bank Park", condition: "Warm weather + hitter-friendly park", boost: "🔥🔥🔥" },
    { stadium: "Dodger Stadium", condition: "Warm temps, light wind", boost: "🔥" }
  ],

  nrfi: [
    { game: "Phillies vs Braves", pick: "NRFI", confidence: "72%" },
    { game: "Yankees vs Red Sox", pick: "YRFI", confidence: "68%" }
  ]
};
