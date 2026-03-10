const express = require("express");
const cors = require("cors");
const { PORT, CORS_ORIGIN } = require("./config");
const assetsRoutes = require("../routes/assetsRoutes");
const wellnessRoutes = require("../routes/wellnessRoutes");
const recommendationRoutes = require("../routes/recommendationRoutes");
const errorHandler = require("../middleware/errorHandler");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: false
  })
);

// Simple health check for the backend itself
app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "stackd-backend" });
});

// API routes
app.use("/api/assets", assetsRoutes);
app.use("/api/wellness", wellnessRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Error handler (last middleware)
app.use(errorHandler);

// Start server
app.listen(PORT, () => {
  console.log(`stackd backend listening on http://localhost:${PORT}`);
});