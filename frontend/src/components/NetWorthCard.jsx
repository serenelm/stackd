import React from 'react';
import './NetWorthCard.css';

export default function NetWorthCard({ netWorth, lastUpdated }) {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="net-worth-card">
      <div className="card-header">
        <h2>Total Net Worth</h2>
        <span className="update-badge">Updated {formatDate(lastUpdated)}</span>
      </div>
      <div className="worth-amount">{formatCurrency(netWorth)}</div>
      <div className="card-footer">
        <p>Your aggregated wealth across all asset categories</p>
      </div>
    </div>
  );
}
