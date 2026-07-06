const POPS = {
  version: "6.0",

  minimumRating: 8.0,

  tiers: {
    elite: 9.5,
    excellent: 9.0,
    veryStrong: 8.5,
    strong: 8.0
  },

  labels: {
    elite: "Elite Play",
    excellent: "Excellent",
    veryStrong: "Very Strong",
    strong: "Strong",
    hidden: "Do Not Show"
  },

  weights: {
    moneyline: {
      startingPitcher: 25,
      bullpen: 15,
      offense: 20,
      recentForm: 10,
      vegas: 15,
      injuries: 10,
      travel: 5
    },

    hr: {
      pitcherHRRisk: 30,
      batterPower: 25,
      batterForm: 15,
      park: 10,
      weather: 10,
      handedness: 10
    },

    hits: {
      contact: 25,
      recentForm: 20,
      matchup: 20,
      pitcherContactAllowed: 15,
      lineupSpot: 10,
      park: 5,
      weather: 5
    },

    nrfi: {
      startingPitchers: 35,
      firstInningHistory: 25,
      offenseSlowStart: 15,
      bullpenBackup: 5,
      weather: 10,
      vegasTotal: 10
    }
  }
};
