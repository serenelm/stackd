const {
    getAssets,
    buildAssetSummary
  } = require("../services/analyticsService");
  
  function getAssetsHandler(req, res, next) {
    try {
      const rawAssets = getAssets();
      const summary = buildAssetSummary();
  
      res.json({
        user: summary.user,
        netWorth: summary.netWorth,
        allocation: summary.allocation,
        scores: summary.scores,
        assets: rawAssets
      });
    } catch (err) {
      next(err);
    }
  }
  
  module.exports = {
    getAssetsHandler
  };