const {
    getAssets,
    buildAssetSummary
  } = require("./analyticsService");
  
  function generateRecommendations() {
    const assets = getAssets();
    const summary = buildAssetSummary();
  
    const { netWorth, allocation, scores } = summary;
    const recs = [];
  
    const cash = allocation.cash || 0;
    const stocks =
      (allocation.stocks || 0) +
      (allocation.equities || 0) +
      (allocation.etfs || 0);
    const crypto = allocation.crypto || 0;
    const illiquid = (allocation.private || 0) + (allocation.real_estate || 0);
  
    const topType = Object.entries(allocation).sort(
      (a, b) => b[1] - a[1]
    )[0];
  
    // 1. Emergency cash buffer
    if (cash < 0.10) {
      recs.push({
        id: "cash-buffer",
        title: "build a stronger cash buffer",
        description:
          "Your cash position is below 10% of your net worth. For resilience, consider steering new contributions into high-yield savings until you have 3–6 months of expenses.",
        category: "liquidity",
        impact: "high"
      });
    }
  
    // 2. High crypto exposure
    if (crypto > 0.15) {
      recs.push({
        id: "crypto-overweight",
        title: "dial down high-volatility assets",
        description:
          "Crypto represents a meaningful share of your stack. Gradually rebalancing into broader equity or cash can reduce volatility without killing upside.",
        category: "risk",
        impact: "medium"
      });
    }
  
    // 3. Concentration in a single asset class
    if (topType && topType[1] > 0.5) {
      recs.push({
        id: "concentration-risk",
        title: "soften your concentration",
        description: `Over half of your wealth sits in ${topType[0]}. Diversifying into 2–3 additional buckets can make your stack more shock-resistant.`,
        category: "diversification",
        impact: "high"
      });
    }
  
    // 4. Illiquid exposure
    if (illiquid > 0.3) {
      recs.push({
        id: "illiquidity",
        title: "rebalance illiquid bets",
        description:
          "Private and real estate positions tie up meaningful capital. Consider slowing new commitments here until your liquid investments catch up.",
        category: "liquidity",
        impact: "medium"
      });
    }
  
    // 5. General tuning if overall health is already solid
    if (scores.overallHealthScore >= 75 && recs.length === 0) {
      recs.push({
        id: "maintain-course",
        title: "you’re in a solid place",
        description:
          "Your stack scores well on diversification and liquidity. Keep your current mix, automate contributions, and review your allocation a couple of times a year.",
        category: "maintenance",
        impact: "low"
      });
    }
  
    // Always return at least 3 recommendations for the demo
    while (recs.length < 3) {
      recs.push({
        id: `generic-${recs.length + 1}`,
        title: "tighten your plan",
        description:
          "Clarify how each asset in your stack maps to a goal: safety, growth, or optionality. Simplifying holdings around those pillars can make decisions easier.",
        category: "planning",
        impact: "medium"
      });
    }
  
    return {
      user: summary.user,
      netWorth,
      allocation,
      scores,
      recommendations: recs.slice(0, 5)
    };
  }
  
  module.exports = {
    generateRecommendations
  };