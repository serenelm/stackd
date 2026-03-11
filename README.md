# stackd 📊

> Your unified wealth wellness dashboard. Stack smarter.

Stackd is a financial wellness dashboard that helps investors understand the overall health of their portfolio in one place. By bringing together assets across different platforms, Stackd analyzes diversification, risk exposure, liquidity, and performance to give users a clearer picture of their financial position.

Through simple visualizations and a Wealth Wellness Score, the platform highlights potential risks and suggests ways to improve portfolio balance and long-term financial resilience.

---

## Key Features

* Unified Portfolio Overview – View assets across different asset classes in one dashboard
* Wealth Wellness Score – A simple metric that reflects diversification, liquidity, and risk exposure
* Portfolio Insights – Visualize asset allocation, sector exposure, and geographic exposure
* Performance Tracking – Compare portfolio performance against market benchmarks
* Actionable Recommendations – Suggestions to rebalance, diversify, and strengthen liquidity

---

## Demo

* Video Pitch: (YouTube link)

---
## 📦 Project Structure

```
stackd/
├── backend/
│   ├── server.js                 # Express server
│   ├── routes/api.js            # API endpoints
│   ├── data/mockData.js         # Mock data & calculations
│   ├── package.json
│   ├── .env
│   └── .env.example
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── WellnessScore.jsx
│   │   ├── config/api.js        # API client
│   │   ├── App.jsx
│   ├── vite.config.js
│   └── .env.example
└── README.md
```

## 📊 Financial Wellness Metrics

### Diversification Score (0-100)
Uses Herfindahl Index to measure portfolio concentration

### Liquidity Score (0-100)
Based on percentage of liquid assets (cash, stocks, crypto)

### Concentration Risk (0-100)
Measures risk of over-concentration in single asset class

### Overall Health Score (0-100)
Weighted composite of diversification (0.4), liquidity (0.3), and risk (0.3)

