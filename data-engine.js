// ===============================
// POPS Pickz 8.0 — data-engine.js
// Converts live MLB data into POPS-ready picks
// ===============================

function createAutoMoneylinePicks(gameModels = []) {
  return gameModels
    .map(g => {
      const score = Math.max(g.model.awayRun, g.model.homeRun);
      const pick = g.model.moneyline;

      return {
        game: ⁠ ${g.away} vs ${g.home} ⁠,
        team: pick,
        pick: ⁠ ${pick} ML ⁠,
        score,
        confidence: ⁠ ${score}/100 ⁠,
        reason: ⁠ Run support edge: ${g.away} ${g.model.awayRun}/100 vs ${g.home} ${g.model.homeRun}/100 ⁠
      };
    })
    .filter(p => p.score >= 80)
    .sort((a, b) => b.score - a.score);
}

function createAutoNRFIPicks(gameModels = []) {
  return gameModels
    .map(g => ({
      game: ⁠ ${g.away} vs ${g.home} ⁠,
      pick: g.nrfiLabel,
      score: g.model.nrfiScore,
      confidence: ⁠ ${g.model.nrfiScore}/100 ⁠,
      reason: ⁠ Starting pitcher + run environment model score: ${g.model.nrfiScore}/100 ⁠
    }))
    .filter(p => p.score >= 80)
    .sort((a, b) => b.score - a.score);
}

function createAutoPitcherTargets(gameModels = []) {
  const targets = [];

  gameModels.forEach(g => {
    targets.push({
      pitcher: g.awayPitcher,
      team: g.away,
      opponent: g.home,
      score: g.model.awayHRRisk,
      reason: ⁠ HR risk score ${g.model.awayHRRisk}/100 vs ${g.home} ⁠
    });

    targets.push({
      pitcher: g.homePitcher,
      team: g.home,
      opponent: g.away,
      score: g.model.homeHRRisk,
      reason: ⁠ HR risk score ${g.model.homeHRRisk}/100 vs ${g.away} ⁠
    });
  });

  return targets
    .filter(p => p.pitcher !== "TBD")
    .filter(p => p.score >= 80)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);
}

function createAutoHRPicks(games = [], hitterStats = {}, pitcherStats = {}) {
  const hitters = Object.values(hitterStats || {});
  const picks = [];

  games.forEach(game => {
    const away = game.teams.away.team.name;
    const home = game.teams.home.team.name;

    const awayPitcher = game.teams.away.probablePitcher?.fullName || "TBD";
    const homePitcher = game.teams.home.probablePitcher?.fullName || "TBD";

    const awayRisk = hrRiskScore(awayPitcher, pitcherStats);
    const homeRisk = hrRiskScore(homePitcher, pitcherStats);

    hitters.forEach(h => {
      if (h.team === away) {
        const score = hitterHRScore(h, homeRisk);

        picks.push({
          player: h.name,
          team: away,
          game: ⁠ ${away} vs ${home} ⁠,
          matchup: ⁠ vs ${homePitcher} ⁠,
          score,
          reason: ⁠ Power profile plus opposing pitcher HR risk ${homeRisk}/100 ⁠
        });
      }

      if (h.team === home) {
        const score = hitterHRScore(h, awayRisk);

        picks.push({
          player: h.name,
          team: home,
          game: ⁠ ${away} vs ${home} ⁠,
          matchup: ⁠ vs ${awayPitcher} ⁠,
          score,
          reason: ⁠ Power profile plus opposing pitcher HR risk ${awayRisk}/100 ⁠
        });
      }
    });
  });

  return picks
    .filter(p => p.score >= 80)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}

function createAutoHitPicks(games = [], hitterStats = {}) {
  const hitters = Object.values(hitterStats || {});
  const picks = [];

  games.forEach(game => {
    const away = game.teams.away.team.name;
    const home = game.teams.home.team.name;

    const awayPitcher = game.teams.away.probablePitcher?.fullName || "TBD";
    const homePitcher = game.teams.home.probablePitcher?.fullName || "TBD";

    hitters.forEach(h => {
      if (h.team === away) {
        const score = hitterHitScore(h);

        picks.push({
          player: h.name,
          team: away,
          game: ⁠ ${away} vs ${home} ⁠,
          matchup: ⁠ vs ${homePitcher} ⁠,
          score,
          reason: "Contact profile creates strong hit upside"
        });
      }

      if (h.team === home) {
        const score = hitterHitScore(h);

        picks.push({
          player: h.name,
          team: home,
          game: ⁠ ${away} vs ${home} ⁠,
          matchup: ⁠ vs ${awayPitcher} ⁠,
          score,
          reason: "Contact profile creates strong hit upside"
        });
      }
    });
  });

  return picks
    .filter(p => p.score >= 80)
    .sort((a, b) => b.score - a.score)
    .slice(0, 20);
}
