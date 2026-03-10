const PORT = process.env.PORT || 4000;

// In hackathon/demo mode we default to "*". In production,
// set CORS_ORIGIN explicitly via environment variables.
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

module.exports = {
  PORT,
  CORS_ORIGIN
};