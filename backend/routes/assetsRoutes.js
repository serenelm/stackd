const express = require("express");
const {
  getAssetsHandler
} = require("../controllers/assetsController");

const router = express.Router();

// GET /api/assets
router.get("/", getAssetsHandler);

module.exports = router;