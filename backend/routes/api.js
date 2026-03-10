import express from 'express';
import {
  mockUserAssets,
  calculateNetWorth,
  calculateAssetAllocation,
  generateWellnessReport,
  generateRecommendations
} from '../data/mockData.js';

const router = express.Router();

/**
 * GET /api/assets
 * Returns aggregated assets across all categories
 */
router.get('/assets', (req, res) => {
  try {
    const netWorth = calculateNetWorth(mockUserAssets.assets);
    const allocation = calculateAssetAllocation(mockUserAssets.assets);

    res.json({
      success: true,
      data: {
        userId: mockUserAssets.userId,
        netWorth,
        assets: mockUserAssets.assets,
        allocation,
        lastUpdated: mockUserAssets.lastUpdated,
        currency: 'USD'
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error fetching assets:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch assets' });
  }
});

/**
 * GET /api/wellness
 * Returns financial wellness scores and metrics
 */
router.get('/wellness', (req, res) => {
  try {
    const report = generateWellnessReport(mockUserAssets.assets);

    res.json({
      success: true,
      data: {
        userId: mockUserAssets.userId,
        ...report
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error calculating wellness:', error);
    res.status(500).json({ success: false, error: 'Failed to calculate wellness metrics' });
  }
});

/**
 * GET /api/recommendations
 * Returns personalized recommendations based on financial profile
 */
router.get('/recommendations', (req, res) => {
  try {
    const recommendations = generateRecommendations(mockUserAssets.assets);

    res.json({
      success: true,
      data: {
        userId: mockUserAssets.userId,
        recommendations,
        totalRecommendations: recommendations.length,
        highPriority: recommendations.filter(r => r.priority === 'high').length
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating recommendations:', error);
    res.status(500).json({ success: false, error: 'Failed to generate recommendations' });
  }
});

/**
 * GET /api/dashboard
 * Returns complete dashboard data
 */
router.get('/dashboard', (req, res) => {
  try {
    const assetsReport = generateWellnessReport(mockUserAssets.assets);
    const netWorth = calculateNetWorth(mockUserAssets.assets);

    res.json({
      success: true,
      data: {
        userId: mockUserAssets.userId,
        overview: {
          netWorth,
          currency: 'USD',
          lastUpdated: mockUserAssets.lastUpdated
        },
        assets: mockUserAssets.assets,
        allocation: assetsReport.assetAllocation,
        wellness: assetsReport.scores,
        recommendations: assetsReport.recommendations
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating dashboard:', error);
    res.status(500).json({ success: false, error: 'Failed to generate dashboard data' });
  }
});

export default router;
