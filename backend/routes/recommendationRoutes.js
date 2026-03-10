const express = require("express");
const {
  getRecommendationsHandler
} = require("../controllers/recommendationController");

const router = express.Router();

// GET /api/recommendations
router.get("/", getRecommendationsHandler);

module.exports = router;