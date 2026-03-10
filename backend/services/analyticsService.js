const assets = require("../data/assets.json");
const userProfile = require("../data/userProfile.json");

// Sum of all asset values
function calculateNetWorth(assetList) {
  return assetList.reduce((sum, asset) => sum + (asset.value || 0), 0);
}

// Allocation by asset.type as percentages of net worth
function calculateAllocation(assetList, netWorth) {
  const byType = {};

  assetList.forEach((asset) => {
    const type = asset.type || "other";
    if (!byType[type]) {
      byType[type] = 0;
    }
    byType[type] += asset.value || 0;
  });

  const allocation = {};
  Object.keys(byType).forEach((type) => {
    allocation[type] = netWorth > 0 ? byType[type] / netWorth : 0;
  });

  return allocation;
}

// Diversification score based on Herfindahl index, scaled 0–100
function calculateDiversificationScore(allocation) {
  const weights = Object.values(allocation);
  if (!weights.length) return 0;

  const n = weights.length;
  let h = 0;
  weights.forEach((w) => {
    const p = w || 0;
    h += p * p;
  });

  if (n === 1) {
    return 0;
  }

  const minH = 1 / n;
  const maxH = 1;
  const normalized = (maxH - h) / (maxH - minH);
  const clamped = Math.max(0, Math.min(1, normalized));

  return Math.round(clamped * 100);
}

// Liquidity score: weighted average of asset.liquidity (0–1), scaled 0–100
function calculateLiquidityScore(assetList, netWorth) {
  if (!assetList.length || netWorth <= 0) return 0;

  let weightedLiquidity = 0;
  assetList.forEach((asset) => {
    const value = asset.value || 0;
    const liquidity = typeof asset.liquidity === "number" ? asset.liquidity : 0.5;
    const weight = value / netWorth;
    weightedLiquidity += weight * liquidity;
  });

  const clamped = Math.max(0, Math.min(1, weightedLiquidity));
  return Math.round(clamped * 100);
}

// Concentration risk: higher when a single asset class dominates
function calculateConcentrationRisk(allocation) {
  const weights = Object.values(allocation);
  if (!weights.length) return 0;

  const maxWeight = Math.max(...weights);
  // Scale: 0% (no single class dominates) → 0, 80%+ → 100
  const riskRaw = (maxWeight - 0.25) / (0.8 - 0.25); // 25% starts to be concerning
  const clamped = Math.max(0, Math.min(1, riskRaw));

  return Math.round(clamped * 100);
}

// Overall financial health score combines diversification, liquidity, and rule-of-thumb alignment
function calculateOverallHealthScore({
  netWorth,
  allocation,
  diversificationScore,
  liquidityScore,
  concentrationRisk
}) {
  if (netWorth <= 0) return 0;

  const cash = allocation.cash || 0;
  const stocks =
    (allocation.stocks || 0) +
    (allocation.equities || 0) +
    (allocation.etfs || 0);
  const crypto = allocation.crypto || 0;
  const illiquid = (allocation.private || 0) + (allocation.real_estate || 0);

  let alignmentScore = 100;

  // Cash too low or too high vs target range
  if (cash < userProfile.targetCashAllocationRange.min) {
    alignmentScore -= 15;
  } else if (cash > userProfile.targetCashAllocationRange.max) {
    alignmentScore -= 10;
  }

  // Equities outside target range
  if (stocks < userProfile.targetEquityAllocationRange.min) {
    alignmentScore -= 10;
  } else if (stocks > userProfile.targetEquityAllocationRange.max) {
    alignmentScore -= 10;
  }

  // Crypto above comfort level
  if (crypto > userProfile.targetCryptoMax) {
    alignmentScore -= 15;
  }

  // Illiquid assets too high
  if (illiquid > userProfile.targetIlliquidMax) {
    alignmentScore -= 15;
  }

  // Concentration penalty
  alignmentScore -= concentrationRisk * 0.2;

  const normalizedAlignment = Math.max(0, Math.min(100, alignmentScore));

  // Weighted blend – feels realistic and easy to explain in the UI
  const overall =
    diversificationScore * 0.35 +
    liquidityScore * 0.3 +
    normalizedAlignment * 0.35;

  return Math.round(Math.max(0, Math.min(100, overall)));
}

function buildAssetSummary() {
  const netWorth = calculateNetWorth(assets);
  const allocation = calculateAllocation(assets, netWorth);
  const diversificationScore = calculateDiversificationScore(allocation);
  const liquidityScore = calculateLiquidityScore(assets, netWorth);
  const concentrationRisk = calculateConcentrationRisk(allocation);
  const overallHealthScore = calculateOverallHealthScore({
    netWorth,
    allocation,
    diversificationScore,
    liquidityScore,
    concentrationRisk
  });

  return {
    user: {
      id: userProfile.id,
      name: userProfile.name
    },
    netWorth,
    allocation,
    scores: {
      diversificationScore,
      liquidityScore,
      concentrationRisk,
      overallHealthScore
    }
  };
}

module.exports = {
  getAssets: () => assets,
  getUserProfile: () => userProfile,
  buildAssetSummary,
  calculateNetWorth,
  calculateAllocation,
  calculateDiversificationScore,
  calculateLiquidityScore,
  calculateConcentrationRisk,
  calculateOverallHealthScore
};