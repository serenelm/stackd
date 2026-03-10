import React, { useState, useEffect } from 'react';
import { fetchDashboard } from '../config/api';
import NetWorthCard from './NetWorthCard';
import AssetAllocationChart from './AssetAllocationChart';
import WellnessScore from './WellnessScore';
import RecommendationsList from './RecommendationsList';
import './Dashboard.css';

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchDashboard();
      setDashboardData(response.data);
    } catch (err) {
      console.error('Failed to load dashboard:', err);
      setError('Failed to load dashboard data. Make sure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="dashboard loading">
        <div className="loading-spinner"></div>
        <p>Loading your financial wellness dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard error">
        <div className="error-box">
          <h3>⚠️ Connection Error</h3>
          <p>{error}</p>
          <button onClick={loadDashboardData} className="retry-button">
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="dashboard">
        <p>No data available</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Net Worth Summary */}
      <NetWorthCard
        netWorth={dashboardData.overview.netWorth}
        lastUpdated={dashboardData.overview.lastUpdated}
      />

      {/* Main Grid */}
      <div className="dashboard-grid">
        {/* Left Column */}
        <div className="dashboard-column">
          <AssetAllocationChart allocation={dashboardData.allocation} />
          <RecommendationsList recommendations={dashboardData.recommendations} />
        </div>

        {/* Right Column */}
        <div className="dashboard-column">
          <WellnessScore scores={dashboardData.wellness} />

          {/* Assets List */}
          <div className="assets-list">
            <h3>Your Assets</h3>
            <div className="assets-table">
              {dashboardData.assets.map((asset) => (
                <div key={asset.id} className="asset-row">
                  <div className="asset-info">
                    <span className="asset-icon">{asset.icon}</span>
                    <div className="asset-details">
                      <p className="asset-name">{asset.name}</p>
                      <p className="asset-category">{formatCategory(asset.category)}</p>
                    </div>
                  </div>
                  <div className="asset-value">
                    {formatCurrency(asset.value)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount);
}

function formatCategory(category) {
  return category
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
