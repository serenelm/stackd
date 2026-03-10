import React from 'react';
import './RecommendationsList.css';

export default function RecommendationsList({ recommendations }) {
  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'high':
        return '⚡';
      case 'medium':
        return '⚠️';
      case 'low':
        return '✓';
      default:
        return '💡';
    }
  };

  const getPriorityClass = (priority) => {
    return `priority-${priority}`;
  };

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="recommendations-container">
        <h3>Personalized Insights</h3>
        <p className="no-recommendations">Your portfolio looks great! No recommendations at this time.</p>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h3>Personalized Insights</h3>
      <div className="recommendations-list">
        {recommendations.map((rec) => (
          <div key={rec.id} className={`recommendation-card ${getPriorityClass(rec.priority)}`}>
            <div className="rec-header">
              <div className="rec-title-section">
                <span className="rec-icon">{rec.icon || getPriorityIcon(rec.priority)}</span>
                <div>
                  <h4>{rec.title}</h4>
                  <p className="rec-description">{rec.description}</p>
                </div>
              </div>
              <span className={`priority-badge ${rec.priority}`}>{rec.priority}</span>
            </div>
            <div className="rec-action">
              <span className="action-label">→ {rec.action}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
