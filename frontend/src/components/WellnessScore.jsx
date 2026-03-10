import React from 'react';
import './WellnessScore.css';

export default function WellnessScore({ scores }) {
  const getScoreColor = (score) => {
    if (score >= 80) return '#43e97b';
    if (score >= 60) return '#4facfe';
    if (score >= 40) return '#f093fb';
    return '#fa709a';
  };

  const getScoreLabel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Poor';
  };

  const ScoreCard = ({ title, score, subtitle }) => (
    <div className="score-card">
      <h4>{title}</h4>
      <div className="score-circle" style={{ borderColor: getScoreColor(score) }}>
        <div className="score-value">{score}</div>
      </div>
      <p className="score-label">{getScoreLabel(score)}</p>
      {subtitle && <p className="score-subtitle">{subtitle}</p>}
    </div>
  );

  return (
    <div className="wellness-scores-container">
      <h3>Financial Wellness</h3>
      <div className="scores-grid">
        <ScoreCard
          title="Diversification"
          score={scores.diversification}
          subtitle="Portfolio spread across assets"
        />
        <ScoreCard
          title="Liquidity"
          score={scores.liquidity}
          subtitle="Quick access to funds"
        />
        <ScoreCard
          title="Risk Level"
          score={100 - scores.concentrationRisk}
          subtitle="Lower concentration risk"
        />
        <ScoreCard
          title="Overall Health"
          score={scores.overallHealth}
          subtitle="Composite wellness score"
        />
      </div>
    </div>
  );
}
