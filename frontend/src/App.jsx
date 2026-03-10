import React from "react";
import PageShell from "./components/layout/PageShell";
import Header from "./components/layout/Headers";
import MetricCard from "./components/cards/MetricCard";
import AssetAllocationChart from "./components/charts/AssetAllocationChart";
import RecommendationsPanel from "./components/panels/RecommendationsPanel";
import useDashboardData from "./hooks/useDashboardData";

function App() {
  const { loading, error, data } = useDashboardData();

  const netWorth = data?.wellness?.netWorth ?? 0;
  const scores = data?.wellness?.scores ?? {};
  const allocation = data?.wellness?.allocation ?? {};
  const recommendations = data?.recommendations?.recommendations ?? [];

  return (
    <PageShell>
      <Header />
      <main className="stackd-main">
        <section className="stackd-section stackd-grid-3">
          <MetricCard
            label="total net worth"
            value={netWorth}
            format="currency"
            tone="primary"
          />
          <MetricCard
            label="overall wellness"
            value={scores.overallHealthScore}
            format="score"
            tone="positive"
          />
          <MetricCard
            label="liquidity"
            value={scores.liquidityScore}
            format="score"
            tone="neutral"
          />
        </section>

        <section className="stackd-section stackd-layout-2-1">
          <div className="stackd-card stackd-card--chart">
            <div className="stackd-card-header">
              <h2>asset allocation</h2>
              <p className="stackd-card-subtitle">
                how your stack breaks down across cash, stocks, crypto, and private bets
              </p>
            </div>
            <AssetAllocationChart allocation={allocation} loading={loading} />
          </div>

          <div className="stackd-card stackd-card--scores">
            <div className="stackd-card-header">
              <h2>wellness scores</h2>
              <p className="stackd-card-subtitle">simple signals for diversification and risk</p>
            </div>
            <div className="stackd-scores-grid">
              <MetricCard
                label="diversification"
                value={scores.diversificationScore}
                format="score"
                tone="neutral"
                compact
              />
              <MetricCard
                label="concentration risk"
                value={scores.concentrationRisk}
                format="score"
                invert
                tone="warning"
                compact
              />
            </div>
          </div>
        </section>

        <section className="stackd-section">
          <RecommendationsPanel
            loading={loading}
            error={error}
            recommendations={recommendations}
          />
        </section>
      </main>
    </PageShell>
  );
}

export default App;