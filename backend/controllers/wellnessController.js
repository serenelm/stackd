const {
    buildAssetSummary
  } = require("../services/analyticsService");
  
  function getWellnessHandler(req, res, next) {
    try {
      const summary = buildAssetSummary();
  
      res.json({
        user: summary.user,
        netWorth: summary.netWorth,
        allocation: summary.allocation,
        scores: summary.scores
      });
    } catch (err) {
      next(err);
    }
  }
  
  module.exports = {
    getWellnessHandler
  };