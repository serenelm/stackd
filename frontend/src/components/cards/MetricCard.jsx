import React from "react";

function formatCurrency(value) {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(value);
}

function formatScore(value) {
  if (value == null || Number.isNaN(value)) return "—";
  return `${value}`;
}

function MetricCard({
  label,
  value,
  format = "score",
  tone = "neutral",
  invert = false,
  compact = false
}) {
  const display =
    format === "currency" ? formatCurrency(value) : formatScore(value);

  const scoreValue = typeof value === "number" ? value : null;
  const scoreBadge =
    scoreValue == null
      ? null
      : invert
      ? 100 - Math.min(100, Math.max(0, scoreValue))
      : Math.min(100, Math.max(0, scoreValue));

  return (
    <article
      className={[
        "metric-card",
        compact ? "metric-card--compact" : "",
        `metric-card--${tone}`
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="metric-card-label">{label}</div>
      <div className="metric-card-value">{display}</div>
      {scoreBadge != null && format === "score" && (
        <div className="metric-card-meter">
          <div
            className="metric-card-meter-fill"
            style={{ width: `${scoreBadge}%` }}
          />
        </div>
      )}
    </article>
  );
}

export default MetricCard;