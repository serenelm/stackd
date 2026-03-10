const {
    generateRecommendations
  } = require("../services/recommendationService");
  
  function getRecommendationsHandler(req, res, next) {
    try {
      const data = generateRecommendations();
      res.json(data);
    } catch (err) {
      next(err);
    }
  }
  
  module.exports = {
    getRecommendationsHandler
  };