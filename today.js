const todayData = {
  hrPicks: [
  { player: "Shohei Ohtani", matchup: "vs JP Sears", barrel: 19, hardHit: 58, iso: 0.340, hr9: 1.8, weather: 7, ballpark: 9, platoon: 8 },
  { player: "Fernando Tatis Jr.", matchup: "vs Emmet Sheehan", barrel: 15, hardHit: 51, iso: 0.250, hr9: 1.4, weather: 7, ballpark: 9, platoon: 7 },
  { player: "Manny Machado", matchup: "vs Emmet Sheehan", barrel: 13, hardHit: 49, iso: 0.230, hr9: 1.4, weather: 7, ballpark: 9, platoon: 7 },
  { player: "Teoscar Hernandez", matchup: "vs JP Sears", barrel: 16, hardHit: 52, iso: 0.260, hr9: 1.8, weather: 7, ballpark: 9, platoon: 8 },
  { player: "Mookie Betts", matchup: "vs JP Sears", barrel: 12, hardHit: 46, iso: 0.230, hr9: 1.8, weather: 7, ballpark: 9, platoon: 8 },
  { player: "Freddie Freeman", matchup: "vs JP Sears", barrel: 11, hardHit: 47, iso: 0.220, hr9: 1.8, weather: 7, ballpark: 9, platoon: 7 },
  { player: "Wilyer Abreu", matchup: "vs Ryan Johnson", barrel: 14, hardHit: 49, iso: 0.240, hr9: 1.7, weather: 6, ballpark: 7, platoon: 8 },
  { player: "Cal Raleigh", matchup: "vs Trey Yesavage", barrel: 17, hardHit: 50, iso: 0.290, hr9: 1.1, weather: 4, ballpark: 5, platoon: 7 },
  { player: "Logan O'Hoppe", matchup: "vs Ranger Suarez", barrel: 15, hardHit: 49, iso: 0.250, hr9: 1.0, weather: 6, ballpark: 7, platoon: 7 },
  { player: "Jorge Soler", matchup: "vs Ranger Suarez", barrel: 16, hardHit: 50, iso: 0.260, hr9: 1.0, weather: 6, ballpark: 7, platoon: 7 },
  { player: "Vladimir Guerrero Jr.", matchup: "vs Emerson Hancock", barrel: 14, hardHit: 52, iso: 0.230, hr9: 1.3, weather: 4, ballpark: 5, platoon: 7 },
  { player: "Jackson Merrill", matchup: "vs Emmet Sheehan", barrel: 12, hardHit: 45, iso: 0.210, hr9: 1.4, weather: 7, ballpark: 9, platoon: 7 }
],

  pitcherTargets: [
    { pitcher: "JP Sears", stats: "Padres vs Dodgers • LHP • ERA: 6.97 • HR Risk: Very High • Target Dodgers bats", grade: "🔥🔥🔥🔥🔥" },
    { pitcher: "Ryan Johnson", stats: "Angels vs Red Sox • RHP • HR Risk: Very High • Target Red Sox lefty bats", grade: "🔥🔥🔥🔥🔥" },
    { pitcher: "Emmet Sheehan", stats: "Dodgers vs Padres • RHP • ERA: 5.08 • HR Risk: High", grade: "🔥🔥🔥🔥" },
    { pitcher: "Emerson Hancock", stats: "Mariners vs Blue Jays • RHP • HR Risk: Medium-High", grade: "🔥🔥🔥" },
    { pitcher: "Trey Yesavage", stats: "Blue Jays vs Mariners • RHP • ERA: 3.34 • WHIP: 1.10 • HR Risk: Low-Medium", grade: "🔥🔥" },
    { pitcher: "Ranger Suarez", stats: "Red Sox vs Angels • LHP • Better starter profile • HR Risk: Medium", grade: "🔥🔥" }
  ],

  moneyline: [
    {
      team: "Los Angeles Dodgers",
      reason: "Better offense • home field • stronger run support • Padres starter JP Sears is high HR risk",
      confidence: "83%"
    },
    {
      team: "Boston Red Sox",
      reason: "Better starter edge • better offense • stronger bullpen profile over Angels",
      confidence: "72%"
    },
    {
      team: "Seattle Mariners",
      reason: "Home field • bullpen edge • slight moneyline edge vs Toronto",
      confidence: "64%"
    }
  ],

  weather: [
    { stadium: "Dodger Stadium", condition: "Warm night game • hitter-friendly total at 9.5", boost: "🔥🔥🔥" },
    { stadium: "Angel Stadium", condition: "Late game • total 8 • moderate HR environment", boost: "🔥🔥" },
    { stadium: "T-Mobile Park", condition: "Lower total 7.5 • pitcher-friendlier park", boost: "🔥" }
  ],

  nrfi: [
    { game: "Blue Jays vs Mariners", pick: "NRFI lean", confidence: "63%" },
    { game: "Padres vs Dodgers", pick: "YRFI lean", confidence: "61%" },
    { game: "Red Sox vs Angels", pick: "YRFI lean", confidence: "59%" }
  ]
};
