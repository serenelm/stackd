const express = require("express");
const {
  getWellnessHandler
} = require("../controllers/wellnessController");

const router = express.Router();

// GET /api/wellness
router.get("/", getWellnessHandler);

module.exports = router;