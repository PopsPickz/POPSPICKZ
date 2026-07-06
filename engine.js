function calculateModelScore(model = {}, weights = {}) {
  let total = 0;

  Object.keys(weights).forEach(key => {
    const value = Number(model[key]) || 0;
    const weight = Number(weights[key]) || 0;
    total += value * (weight / 100);
  });

  return Math.round(total);
}

function scoreToRating(score) {
  return Number((score / 10).toFixed(1));
}

function getPopsTier(rating) {
  if (rating >= POPS.tiers.elite) return POPS.labels.elite;
  if (rating >= POPS.tiers.excellent) return POPS.labels.excellent;
  if (rating >= POPS.tiers.veryStrong) return POPS.labels.veryStrong;
  if (rating >= POPS.tiers.strong) return POPS.labels.strong;
  return POPS.labels.hidden;
}

function qualifiesForSite(rating) {
  return Number(rating) >= POPS.minimumRating;
}

function scorePlay(play = {}, modelType = "moneyline") {
  const weights = POPS.weights[modelType];

  if (!weights || !play.model) {
    return {
      ...play,
      score: 0,
      rating: 0,
      tier: POPS.labels.hidden,
      showOnSite: false
    };
  }

  const score = calculateModelScore(play.model, weights);
  const rating = scoreToRating(score);
  const tier = getPopsTier(rating);

  return {
    ...play,
    score,
    rating,
    tier,
    showOnSite: qualifiesForSite(rating)
  };
}

function scoreCategory(items = [], modelType = "moneyline") {
  return items
    .map(item => scorePlay(item, modelType))
    .filter(item => item.showOnSite)
    .sort((a, b) => b.rating - a.rating);
}

function applyPopsAnalytics() {
  if (!window.todayData) return;

  todayData.scored = {
    moneyline: scoreCategory(todayData.moneyline || [], "moneyline"),
    hr: scoreCategory(todayData.hr || [], "hr"),
    hits: scoreCategory(todayData.hits || [], "hits"),
    nrfi: scoreCategory(todayData.nrfi || [], "nrfi")
  };
}
