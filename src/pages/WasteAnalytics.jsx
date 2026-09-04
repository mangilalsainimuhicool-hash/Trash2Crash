import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  CheckCircle2,
  XCircle,
  Camera,
  History,
  ArrowRight,
  Scale,
  DollarSign,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const WasteAnalytics = () => {
  const { scans, getAnalyticsSummary } = useApp();
  const summary = getAnalyticsSummary();

  return (
    <div className="page-wrapper analytics-page">
      <div className="container">
        {/* SIMPLE COMPACT HEADER */}
        <div className="page-simple-header">
          <div className="header-left">
            <span className="badge-pill-simple">
              <BarChart3 size={14} /> Real Scan Analytics
            </span>
            <h1 className="simple-page-title">Waste Analytics</h1>
            <p className="simple-page-sub">
              Dynamic recycling metrics calculated directly from your actual saved AI scans.
            </p>
          </div>

          <div className="header-actions">
            <Link to="/ai-detection" className="btn-primary">
              <Camera size={16} />
              <span>New AI Scan</span>
            </Link>
            <Link to="/history" className="btn-secondary">
              <History size={16} />
              <span>View History ({summary.totalScans})</span>
            </Link>
          </div>
        </div>

        {/* 4 SUMMARY STAT TILES */}
        <div className="analytics-metrics-strip">
          <div className="analytics-tiles-grid">
            {/* Total Scans */}
            <div className="analytics-metric-tile">
              <span className="tile-label">Total Scans</span>
              <h2 className="tile-number">{summary.totalScans}</h2>
              <span className="tile-subtext text-muted">
                {summary.totalScans === 1 ? '1 scan recorded' : `${summary.totalScans} scans recorded`}
              </span>
            </div>

            {/* Total Waste Detected */}
            <div className="analytics-metric-tile">
              <span className="tile-label">Total Waste Detected</span>
              <h2 className="tile-number">{summary.totalWeight} KG</h2>
              <span className="tile-subtext text-muted">Sum of item weights</span>
            </div>

            {/* Total Estimated Value */}
            <div className="analytics-metric-tile">
              <span className="tile-label">Total Estimated Value</span>
              <h2 className="tile-number text-green">₹{summary.totalValue}</h2>
              <span className="tile-subtext text-green">Real scrap cash potential</span>
            </div>

            {/* Recyclable Waste */}
            <div className="analytics-metric-tile">
              <span className="tile-label">Recyclable Waste</span>
              <h2 className="tile-number text-blue">{summary.recyclablePercent}%</h2>
              <span className="tile-subtext text-blue">
                {summary.recyclableCount} of {summary.totalScans} items ({summary.recyclableWeight} kg)
              </span>
            </div>
          </div>
        </div>

        {/* EMPTY STATE OR REAL CHARTS */}
        {summary.totalScans === 0 ? (
          <div className="empty-analytics-card">
            <div className="empty-icon-wrap">
              <BarChart3 size={44} className="text-muted" />
            </div>
            <h2>No scan data to analyze yet</h2>
            <p>
              Analytics are generated automatically as you scan and save waste items. Start your first AI scan to see real material distributions and recycling values.
            </p>
            <Link to="/ai-detection" className="btn-primary mt-3">
              <Camera size={18} />
              <span>Start First Scan</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="analytics-content-grid">
            {/* Left Column: Material Distribution */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Material Distribution</h3>
                  <p className="chart-subtitle">Calculated strictly from your {summary.totalScans} saved scans</p>
                </div>
                <span className="chart-count-pill">{summary.materialDistribution.length} Categories</span>
              </div>

              <div className="material-bars-container">
                {summary.materialDistribution.map((item) => (
                  <div key={item.key || item.name} className="material-bar-row">
                    <div className="bar-info-line">
                      <span className="mat-name">
                        <span className="mat-dot" style={{ backgroundColor: item.color }}></span>
                        <strong>{item.name}</strong>
                      </span>
                      <span className="mat-stat">
                        <strong>{item.percentage}%</strong> ({item.count} {item.count === 1 ? 'scan' : 'scans'} • {item.weightKg} kg)
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

            {/* Right Column: Recyclability Breakdown */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Recyclability Breakdown</h3>
                  <p className="chart-subtitle">Recyclable scrap vs non-recyclable / compostable</p>
                </div>
              </div>

              <div className="recyclability-gauge-box">
                <div className="gauge-split-metrics">
                  <div className="gauge-metric-item text-green">
                    <span className="g-percent">{summary.recyclablePercent}%</span>
                    <span className="g-label">Recyclable</span>
                    <span className="g-sub">{summary.recyclableCount} items ({summary.recyclableWeight} kg)</span>
                  </div>

                  <div className="gauge-divider"></div>

                  <div className="gauge-metric-item text-amber">
                    <span className="g-percent">{summary.contaminationPercent}%</span>
                    <span className="g-label">Non-Recyclable</span>
                    <span className="g-sub">{summary.nonRecyclableCount} items (Organic / Mixed)</span>
                  </div>
                </div>

                <div className="gauge-bar-track">
                  <div
                    className="gauge-portion portion-green"
                    style={{ width: `${summary.recyclablePercent}%` }}
                  ></div>
                  <div
                    className="gauge-portion portion-amber"
                    style={{ width: `${summary.contaminationPercent}%` }}
                  ></div>
                </div>

                <div className="analytics-summary-callout">
                  <p>
                    💡 <strong>Summary:</strong> You have scanned <strong>{summary.totalScans} items</strong> totaling <strong>{summary.totalWeight} kg</strong> with an estimated cash value of <strong>₹{summary.totalValue}</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* RECENT SCANS SNIPPET */}
        {scans.length > 0 && (
          <div className="recent-scans-strip-card">
            <div className="recent-scans-header">
              <h3>Recent Scan Activity</h3>
              <Link to="/history" className="text-green font-semibold text-sm">
                View Full History ({scans.length}) →
              </Link>
            </div>

            <div className="recent-scans-list">
              {scans.slice(0, 4).map((scan) => (
                <div key={scan.id} className="recent-scan-item">
                  <div className="rsi-left">
                    <strong>{scan.wasteType}</strong>
                    <span className="rsi-meta">{scan.material} • {scan.confidence}% confidence</span>
                  </div>
                  <div className="rsi-right">
                    <span className="rsi-weight">{scan.estimatedWeight} kg</span>
                    <strong className="rsi-val text-green">₹{scan.estimatedValue}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WasteAnalytics;
