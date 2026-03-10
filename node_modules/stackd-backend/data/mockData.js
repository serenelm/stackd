/**
 * Mock data for stackd wealth wellness dashboard
 * In production, this would come from APIs, databases, etc.
 */

export const mockUserAssets = {
  userId: 'user123',
  lastUpdated: new Date().toISOString(),
  monthlyChange: 2.5,  // percentage change from last month
  ytdReturn: 8.3,      // year to date return
  assets: [
    {
      id: 'cash1',
      category: 'cash',
      displayName: 'Cash & Equivalents',
      name: 'Savings Account',
      value: 25000,
      currency: 'USD',
      icon: '💰',
      sector: 'cash',
      geography: 'USA',
      monthlyReturn: 0.5,
      ytdReturn: 2.0
    },
    {
      id: 'stock1',
      category: 'stocks',
      displayName: 'Equities',
      name: 'Stock Portfolio',
      value: 145000,
      currency: 'USD',
      holdings: ['AAPL', 'MSFT', 'GOOGL', 'TSLA'],
      icon: '📈',
      sector: 'technology',
      geography: 'USA',
      monthlyReturn: 3.2,
      ytdReturn: 12.5
    },
    {
      id: 'crypto1',
      category: 'crypto',
      displayName: 'Cryptocurrencies',
      name: 'Crypto Holdings',
      value: 35000,
      currency: 'USD',
      holdings: ['BTC', 'ETH', 'USDC'],
      icon: '₿',
      sector: 'digital_assets',
      geography: 'Global',
      monthlyReturn: 5.8,
      ytdReturn: 18.2
    },
    {
      id: 'real_estate1',
      category: 'real_estate',
      displayName: 'Real Estate',
      name: 'Primary Residence',
      value: 500000,
      currency: 'USD',
      icon: '🏠',
      sector: 'real_estate',
      geography: 'USA',
      monthlyReturn: 0.3,
      ytdReturn: 1.5
    },
    {
      id: 'private1',
      category: 'private_investments',
      displayName: 'Private Investments',
      name: 'Startup Equity',
      value: 60000,
      currency: 'USD',
      icon: '🚀',
      sector: 'private_equity',
      geography: 'USA',
      monthlyReturn: 2.1,
      ytdReturn: 7.8
    },
    {
      id: 'bonds1',
      category: 'bonds',
      displayName: 'Fixed Income',
      name: 'Bond Portfolio',
      value: 45000,
      currency: 'USD',
      icon: '📊',
      sector: 'fixed_income',
      geography: 'USA',
      monthlyReturn: 0.8,
      ytdReturn: 3.2
    }
  ]
};

/**
 * Calculate total net worth
 */
export const calculateNetWorth = (assets) => {
  return assets.reduce((sum, asset) => sum + asset.value, 0);
};

/**
 * Calculate asset allocation by category
 */
export const calculateAssetAllocation = (assets) => {
  const allocation = {};
  const total = calculateNetWorth(assets);

  assets.forEach(asset => {
    if (!allocation[asset.category]) {
      allocation[asset.category] = { value: 0, percentage: 0 };
    }
    allocation[asset.category].value += asset.value;
  });

  Object.keys(allocation).forEach(category => {
    allocation[category].percentage = Number(((allocation[category].value / total) * 100).toFixed(2));
  });

  return allocation;
};

/**
 * Calculate diversification score (0-100)
 * Higher score = better diversification
 */
export const calculateDiversificationScore = (assets) => {
  const allocation = calculateAssetAllocation(assets);
  const numCategories = Object.keys(allocation).length;
  const percentages = Object.values(allocation).map(a => a.percentage);

  // Calculate Herfindahl index (concentration indicator)
  const herfindahl = percentages.reduce((sum, p) => sum + (p * p), 0);

  // Convert to diversification score (0-100)
  // Herfindahl ranges from 100/n to 10000, we normalize and invert
  const maxHerfindahl = 10000;
  const minHerfindahl = 10000 / numCategories;
  const normalized = (herfindahl - minHerfindahl) / (maxHerfindahl - minHerfindahl);
  const score = Math.round((1 - normalized) * 100);

  return Math.max(0, Math.min(100, score));
};

/**
 * Calculate liquidity score (0-100)
 * Based on percentage of liquid assets
 */
export const calculateLiquidityScore = (assets) => {
  const liquidCategories = ['cash', 'stocks', 'crypto'];
  const total = calculateNetWorth(assets);

  const liquidValue = assets
    .filter(asset => liquidCategories.includes(asset.category))
    .reduce((sum, asset) => sum + asset.value, 0);

  const liquidPercentage = (liquidValue / total) * 100;

  // Score based on liquidity
  // 60%+ liquid = excellent (80-100)
  // 40-60% = good (60-80)
  // 20-40% = fair (40-60)
  // <20% = poor (0-40)
  if (liquidPercentage >= 60) return 85;
  if (liquidPercentage >= 40) return 70;
  if (liquidPercentage >= 20) return 50;
  return 30;
};

/**
 * Calculate concentration risk (0-100)
 * 100 = high risk (concentrated), 0 = low risk (diversified)
 */
export const calculateConcentrationRisk = (assets) => {
  const allocation = calculateAssetAllocation(assets);
  const percentages = Object.values(allocation).map(a => a.percentage);
  const maxPercentage = Math.max(...percentages);

  // If one category is >50%, risk is high
  // Formula: (max_percentage - baseline) / (100 - baseline) * 100
  const baseline = 100 / Object.keys(allocation).length;
  const risk = Math.max(0, ((maxPercentage - baseline) / (100 - baseline)) * 100);

  return Math.round(risk);
};

/**
 * Calculate overall financial health score (0-100)
 */
export const calculateFinancialHealthScore = (assets) => {
  const diversification = calculateDiversificationScore(assets);
  const liquidity = calculateLiquidityScore(assets);
  const riskInverse = 100 - calculateConcentrationRisk(assets);

  // Weighted average
  const score = (diversification * 0.4 + liquidity * 0.3 + riskInverse * 0.3);

  return Math.round(score);
};

/**
 * Generate personalized recommendations
 */
export const generateRecommendations = (assets) => {
  const recommendations = [];
  const diversification = calculateDiversificationScore(assets);
  const liquidity = calculateLiquidityScore(assets);
  const concentrationRisk = calculateConcentrationRisk(assets);
  const allocation = calculateAssetAllocation(assets);

  // Diversification recommendation
  if (diversification < 50) {
    recommendations.push({
      id: 'diversify',
      priority: 'high',
      title: 'Improve Portfolio Diversification',
      description: 'Your portfolio is heavily concentrated. Consider adding assets across different categories.',
      action: 'Add positions in underrepresented asset classes',
      icon: '🎯'
    });
  }

  // Liquidity recommendation
  if (liquidity < 60) {
    recommendations.push({
      id: 'liquidity',
      priority: 'high',
      title: 'Increase Liquidity Reserves',
      description: 'Less than 60% of your portfolio is liquid. Build up cash and liquid investments.',
      action: 'Move 10-15% of portfolio to liquid assets',
      icon: '💧'
    });
  }

  // Concentration risk recommendation
  if (concentrationRisk > 60) {
    recommendations.push({
      id: 'concentration',
      priority: 'high',
      title: 'Reduce Concentration Risk',
      description: 'One asset class represents over 50% of your portfolio. This is risky.',
      action: 'Rebalance to reduce largest position',
      icon: '⚠️'
    });
  }

  // Positive recommendations
  if (diversification >= 60) {
    recommendations.push({
      id: 'diversified',
      priority: 'low',
      title: 'Good Diversification',
      description: 'Your portfolio is well-diversified across multiple asset classes.',
      action: 'Maintain current diversification',
      icon: '✓'
    });
  }

  if (liquidity >= 60) {
    recommendations.push({
      id: 'liquid',
      priority: 'low',
      title: 'Healthy Liquidity Position',
      description: 'You have a strong foundation of liquid assets for emergencies.',
      action: 'Continue maintaining adequate reserves',
      icon: '✓'
    });
  }

  return recommendations.sort((a, b) => {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });
};

/**
 * Generate wellness report
 */
export const generateWellnessReport = (assets) => {
  return {
    timestamp: new Date().toISOString(),
    netWorth: calculateNetWorth(assets),
    assetAllocation: calculateAssetAllocation(assets),
    scores: {
      diversification: calculateDiversificationScore(assets),
      liquidity: calculateLiquidityScore(assets),
      concentrationRisk: calculateConcentrationRisk(assets),
      overallHealth: calculateFinancialHealthScore(assets)
    },
    recommendations: generateRecommendations(assets)
  };
};

/**
 * Calculate sector exposure
 */
export const calculateSectorExposure = (assets) => {
  const sectors = {};
  const total = calculateNetWorth(assets);

  assets.forEach(asset => {
    const sector = asset.sector || 'other';
    if (!sectors[sector]) {
      sectors[sector] = 0;
    }
    sectors[sector] += asset.value;
  });

  return Object.entries(sectors).map(([sector, value]) => ({
    sector: sector.replace(/_/g, ' ').split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
    value,
    percentage: Number(((value / total) * 100).toFixed(2))
  })).sort((a, b) => b.value - a.value);
};

/**
 * Calculate geography exposure
 */
export const calculateGeographyExposure = (assets) => {
  const geographies = {};
  const total = calculateNetWorth(assets);

  assets.forEach(asset => {
    const geography = asset.geography || 'Other';
    if (!geographies[geography]) {
      geographies[geography] = 0;
    }
    geographies[geography] += asset.value;
  });

  return Object.entries(geographies).map(([geography, value]) => ({
    geography,
    value,
    percentage: Number(((value / total) * 100).toFixed(2))
  })).sort((a, b) => b.value - a.value);
};

/**
 * Generate performance history (last 12 months)
 */
export const generatePerformanceHistory = (assets) => {
  const months = [];
  const today = new Date();
  
  for (let i = 11; i >= 0; i--) {
    const date = new Date(today);
    date.setMonth(date.getMonth() - i);
    
    const monthName = date.toLocaleString('en-US', { month: 'short' });
    const netWorth = calculateNetWorth(assets);
    
    // Simulate historical returns with some randomness
    const randomVariance = (Math.sin(i * 0.5) + Math.random() * 0.3) * 2;
    const portfolioReturn = 100 + ((netWorth * (1 + randomVariance / 100)) / netWorth - 1) * 1000;
    const benchmarkReturn = 100 + (i * 0.7 + Math.random() * 0.5) * 10;
    
    months.push({
      month: monthName,
      portfolio: Number((portfolioReturn / 10).toFixed(0)),
      benchmark: Number((benchmarkReturn / 10).toFixed(0))
    });
  }
  
  return months;
};

/**
 * Calculate liquidity breakdown
 */
export const calculateLiquidityBreakdown = (assets) => {
  const liquidCategories = ['cash', 'stocks', 'crypto'];
  const total = calculateNetWorth(assets);

  const liquidValue = assets
    .filter(asset => liquidCategories.includes(asset.category))
    .reduce((sum, asset) => sum + asset.value, 0);

  const liquidPercentage = (liquidValue / total) * 100;

  return {
    liquidValue,
    liquidPercentage: Number(liquidPercentage.toFixed(1)),
    illiquidValue: total - liquidValue,
    illiquidPercentage: Number((100 - liquidPercentage).toFixed(1)),
    hasGoodLiquidity: liquidPercentage >= 60
  };
};
