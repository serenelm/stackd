import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import './AssetAllocationChart.css';

const COLORS = {
  cash: '#667eea',
  stocks: '#764ba2',
  crypto: '#f093fb',
  real_estate: '#4facfe',
  private_investments: '#43e97b',
  bonds: '#fa709a'
};

export default function AssetAllocationChart({ allocation }) {
  const data = Object.entries(allocation).map(([category, values]) => ({
    name: formatCategoryName(category),
    value: values.percentage,
    absolute: values.value,
    category
  }));

  function formatCategoryName(category) {
    return category
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="label">{payload[0].name}</p>
          <p className="value">{payload[0].value.toFixed(1)}%</p>
          <p className="absolute">{formatCurrency(payload[0].payload.absolute)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="allocation-chart-container">
      <h3>Asset Allocation</h3>
      <ResponsiveContainer width="100%" height={350}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name} ${value.toFixed(0)}%`}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[entry.category] || '#ccc'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      <div className="allocation-table">
        {data.map((item) => (
          <div key={item.category} className="allocation-row">
            <div className="allocation-label">
              <span className="color-dot" style={{ backgroundColor: COLORS[item.category] }}></span>
              {item.name}
            </div>
            <div className="allocation-stats">
              <span className="percentage">{item.value.toFixed(1)}%</span>
              <span className="amount">{formatCurrency(item.absolute)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
