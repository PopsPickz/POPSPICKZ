const todayData = {
  hrPicks: [
    { player: "Shohei Ohtani", matchup: "vs JP Sears", barrel: 19, hardHit: 58, iso: 0.340, hr9: 1.8, weather: 9, ballpark: 9, platoon: 8 },
    { player: "Teoscar Hernandez", matchup: "vs JP Sears", barrel: 16, hardHit: 52, iso: 0.260, hr9: 1.8, weather: 9, ballpark: 9, platoon: 8 },
    { player: "Fernando Tatis Jr.", matchup: "vs Emmet Sheehan", barrel: 15, hardHit: 51, iso: 0.250, hr9: 1.4, weather: 9, ballpark: 9, platoon: 7 },
    { player: "Mookie Betts", matchup: "vs JP Sears", barrel: 12, hardHit: 46, iso: 0.230, hr9: 1.8, weather: 9, ballpark: 9, platoon: 8 },
    { player: "Manny Machado", matchup: "vs Emmet Sheehan", barrel: 13, hardHit: 49, iso: 0.230, hr9: 1.4, weather: 9, ballpark: 9, platoon: 7 },
    { player: "Wilyer Abreu", matchup: "vs Ryan Johnson", barrel: 14, hardHit: 49, iso: 0.240, hr9: 1.7, weather: 8, ballpark: 7, platoon: 8 },
    { player: "Freddie Freeman", matchup: "vs JP Sears", barrel: 11, hardHit: 47, iso: 0.220, hr9: 1.8, weather: 9, ballpark: 9, platoon: 7 },
    { player: "Cal Raleigh", matchup: "vs Trey Yesavage", barrel: 17, hardHit: 50, iso: 0.290, hr9: 1.1, weather: 5, ballpark: 5, platoon: 7 },
    { player: "Jorge Soler", matchup: "vs Ranger Suarez", barrel: 16, hardHit: 50, iso: 0.260, hr9: 1.0, weather: 8, ballpark: 7, platoon: 7 },
    { player: "Logan O'Hoppe", matchup: "vs Ranger Suarez", barrel: 15, hardHit: 49, iso: 0.250, hr9: 1.0, weather: 8, ballpark: 7, platoon: 7 }
  ],

  batterStats: [
    {
      player: "Shohei Ohtani",
      matchup: "vs JP Sears",
      hrScore: "98/100",
      hitScore: "97/100",
      hitModel: "Elite AVG/contact profile • elite xBA/xwOBA • elite hard contact • strong matchup",
      why: "Elite power + high HR-risk pitcher + great weather + strong ballpark boost"
    },
    {
      player: "Teoscar Hernandez",
      matchup: "vs JP Sears",
      hrScore: "96/100",
      hitScore: "90/100",
      hitModel: "Strong hard-hit profile • good ISO • strong matchup vs vulnerable pitcher",
      why: "High power bat against one of the top pitcher targets"
    },
    {
      player: "Fernando Tatis Jr.",
      matchup: "vs Emmet Sheehan",
      hrScore: "93/100",
      hitScore: "91/100",
      hitModel: "Strong contact quality • speed/power profile • strong recent upside",
      why: "Elite athletic profile + strong weather + good power matchup"
    },
    {
      player: "Mookie Betts",
      matchup: "vs JP Sears",
      hrScore: "88/100",
      hitScore: "95/100",
      hitModel: "Elite hit tool • strong contact rate • low strikeout profile • strong top-order run environment",
      why: "Better hit play than HR play, but still strong vs Sears"
    },
    {
      player: "Freddie Freeman",
      matchup: "vs JP Sears",
      hrScore: "86/100",
      hitScore: "96/100",
      hitModel: "Elite contact hitter • strong AVG/xBA profile • line-drive bat • excellent 1+ hit profile",
      why: "One of the best hit-score players on the slate"
    }
  ],

  pitcherTargets: [
    { pitcher: "JP Sears", stats: "LHP • vs Dodgers • High HR risk • Target Dodgers power bats", grade: "🔥🔥🔥🔥🔥" },
    { pitcher: "Ryan Johnson", stats: "RHP • vs Red Sox • High run/HR risk profile", grade: "🔥🔥🔥🔥🔥" },
    { pitcher: "Emmet Sheehan", stats: "RHP • vs Padres • HR risk: High", grade: "🔥🔥🔥🔥" },
    { pitcher: "Emerson Hancock", stats: "RHP • vs Blue Jays • Hard contact risk", grade: "🔥🔥🔥" },
    { pitcher: "Trey Yesavage", stats: "RHP • vs Mariners • Lower HR risk", grade: "🔥🔥" },
    { pitcher: "Ranger Suarez", stats: "LHP • vs Angels • Better starter profile", grade: "🔥🔥" }
  ],

  moneyline: [
    { team: "Los Angeles Dodgers", reason: "Better offense • home field • stronger run support • JP Sears HR risk", confidence: "83%" },
    { team: "Boston Red Sox", reason: "Starter edge • offense edge • bullpen edge over Angels", confidence: "72%" },
    { team: "Seattle Mariners", reason: "Home field • bullpen edge • slight team edge vs Toronto", confidence: "64%" }
  ],

  weather: [
    { stadium: "Dodger Stadium", condition: "Padres @ Dodgers • Wind 9 mph out to CF • Rain 0% • Excellent HR weather", boost: "🔥🔥🔥 • Weather Score 9.2/10" },
    { stadium: "Angel Stadium", condition: "Red Sox @ Angels • Wind 8 mph out to LF/LCF • Rain 1% • Good HR weather", boost: "🔥🔥 • Weather Score 8.1/10" },
    { stadium: "T-Mobile Park", condition: "Blue Jays @ Mariners • Wind 10 mph across field • Rain 0% • Neutral HR weather", boost: "⭐ • Weather Score 5.4/10" }
  ],

  nrfi: [
    { game: "Blue Jays @ Mariners", pick: "NRFI", confidence: "74%", reason: "Pitcher-friendly park • lower run environment" },
    { game: "Red Sox @ Angels", pick: "NRFI lean", confidence: "62%", reason: "Starter edge with moderate scoring environment" },
    { game: "Padres @ Dodgers", pick: "YRFI lean", confidence: "61%", reason: "Dodgers top order vs high-risk starter" }
  ]
};
