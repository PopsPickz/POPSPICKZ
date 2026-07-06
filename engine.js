function calculatePopsScore(model = {}) {
  let total = 0;

  Object.keys(POPS.weights).forEach(key => {
    const value = Number(model[key]) || 0;
    const weight = POPS.weights[key] || 0;
    total += value * (weight / 100);
  });

  return Math.round(total);
}

function calculatePopsRating(score) {
  return Number((score / 10).toFixed(1));
}

function getPopsTier(rating) {
  if (rating >= POPS.tiers.elite) return "Elite Play";
  if (rating >= POPS.tiers.excellent) return "Excellent";
  if (rating >= POPS.tiers.veryStrong) return "Very Strong";
  if (rating >= POPS.tiers.strong) return "Strong";
  return "Do Not Show";
}

function qualifiesForSite(rating) {
  return rating >= POPS.minimumRating;
}

function applyPopsEngine(items = []) {
  return items
    .map(item => {
      const score = calculatePopsScore(item.model);
      const rating = calculatePopsRating(score);
      const tier = getPopsTier(rating);

      return {
        ...item,
        popsScore: score,
        rating,
        tier,
        showOnSite: qualifiesForSite(rating)
      };
    })
    .filter(item => item.showOnSite);
}
