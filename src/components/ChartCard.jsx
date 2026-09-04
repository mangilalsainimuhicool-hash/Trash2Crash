import React from 'react';

export const CategoryBarChart = ({ data, title, subtitle }) => {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">{title || 'Waste Category Distribution'}</h3>
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
        <span className="prototype-tag">Real-Time Sensor Feed</span>
      </div>

      <div className="category-bars-list">
        {data.map((item, idx) => (
          <div key={idx} className="category-bar-row">
            <div className="bar-info-header">
              <span className="cat-bar-name">
                <span className="cat-color-dot" style={{ backgroundColor: item.color }}></span>
                {item.name}
              </span>
              <span className="cat-bar-metrics">
                <strong>{item.percentage}%</strong> ({item.weightKg} kg)
              </span>
            </div>
            <div className="bar-track">
              <div
                className="bar-fill"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const WeeklyTrendChart = ({ data, title, subtitle }) => {
  const maxVal = Math.max(...data.map((d) => d.totalKg), 100);

  return (
    <div className="chart-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">{title || 'Weekly Campus Waste Inflow (KG)'}</h3>
          {subtitle && <p className="chart-subtitle">{subtitle}</p>}
        </div>
        <span className="prototype-tag">Weekly Audit Telemetry</span>
      </div>

      <div className="weekly-trend-chart">
        <div className="chart-columns-container">
          {data.map((col, idx) => {
            const heightPercent = Math.round((col.totalKg / maxVal) * 100);
            const segregatedHeight = Math.round((col.segregatedKg / maxVal) * 100);
            const contaminatedHeight = heightPercent - segregatedHeight;

            return (
              <div key={idx} className="chart-col-wrapper">
                <div className="bar-stacked-column" style={{ height: `${heightPercent}%` }}>
                  <div
                    className="bar-stack-contaminated"
                    style={{ height: `${(contaminatedHeight / heightPercent) * 100}%` }}
                    title={`Contaminated: ${col.totalKg - col.segregatedKg} kg`}
                  ></div>
                  <div
                    className="bar-stack-segregated"
                    style={{ height: `${(segregatedHeight / heightPercent) * 100}%` }}
                    title={`Correct: ${col.segregatedKg} kg`}
                  ></div>
                </div>
                <span className="col-day-label">{col.day}</span>
                <span className="col-val-label">{col.totalKg}kg</span>
              </div>
            );
          })}
        </div>

        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot bg-green"></span>
            <span>Correctly Segregated</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot bg-red"></span>
            <span>Contamination Spike</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AccuracyGaugeCard = ({ accuracy = 84.2, contamination = 15.8 }) => {
  return (
    <div className="chart-card accuracy-gauge-card">
      <div className="chart-header">
        <div>
          <h3 className="chart-title">Segregation vs Contamination</h3>
          <p className="chart-subtitle">Campus compliance ratio</p>
        </div>
        <span className="prototype-tag">Live Sensor Aggregate</span>
      </div>

      <div className="accuracy-split-display">
        <div className="accuracy-metric-box correct-box">
          <span className="acc-number text-green">{accuracy}%</span>
          <span className="acc-label">Clean Segregation</span>
          <span className="acc-sub">Ready for recycling mills</span>
        </div>

        <div className="accuracy-divider-line"></div>

        <div className="accuracy-metric-box error-box">
          <span className="acc-number text-red">{contamination}%</span>
          <span className="acc-label">Contamination Rate</span>
          <span className="acc-sub">Requires manual intervention</span>
        </div>
      </div>

      <div className="split-progress-bar">
        <div className="segregated-portion" style={{ width: `${accuracy}%` }}></div>
        <div className="contaminated-portion" style={{ width: `${contamination}%` }}></div>
      </div>

      <div className="compliance-insight-pill">
        <span>💡 Campus segregation is <strong>+4.2%</strong> higher than municipal benchmark.</span>
      </div>
    </div>
  );
};
