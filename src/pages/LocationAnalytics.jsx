import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  BarChart3,
  CheckCircle2,
  Camera,
  History,
  ArrowRight,
  Layers,
  Scale,
  DollarSign
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const LocationAnalytics = () => {
  const { scans, getAnalyticsSummary } = useApp();
  const summary = getAnalyticsSummary();

  // Group scans by location tag
  const locationGroups = scans.reduce((acc, scan) => {
    const loc = scan.location || 'General Scanner';
    if (!acc[loc]) {
      acc[loc] = { count: 0, weightKg: 0, value: 0 };
    }
    acc[loc].count += 1;
    acc[loc].weightKg += Number(scan.estimatedWeight) || 0;
    acc[loc].value += Number(scan.estimatedValue) || 0;
    return acc;
  }, {});

  const locationsList = Object.keys(locationGroups).map((loc) => ({
    name: loc,
    count: locationGroups[loc].count,
    weightKg: Number(locationGroups[loc].weightKg.toFixed(2)),
    value: locationGroups[loc].value
  }));

  return (
    <div className="page-wrapper location-analytics-page">
      <div className="container">
        {/* SIMPLE COMPACT HEADER */}
        <div className="page-simple-header">
          <div className="header-left">
            <span className="badge-pill-simple">
              <MapPin size={14} /> Scan Intelligence
            </span>
            <h1 className="simple-page-title">Location Analytics</h1>
            <p className="simple-page-sub">
              Scan distribution, waste volume, and recycling valuation summary.
            </p>
          </div>

          <div className="header-actions">
            <Link to="/ai-detection" className="btn-primary">
              <Camera size={16} />
              <span>Scan Item</span>
            </Link>
            <Link to="/analytics" className="btn-secondary">
              <BarChart3 size={16} />
              <span>General Analytics</span>
            </Link>
          </div>
        </div>

        {/* 4 MANDATORY METRIC TILES */}
        <div className="analytics-metrics-strip">
          <div className="analytics-tiles-grid">
            <div className="analytics-metric-tile">
              <span className="tile-label">Total Scans</span>
              <h2 className="tile-number">{summary.totalScans}</h2>
              <span className="tile-subtext text-muted">Verified scan events</span>
            </div>

            <div className="analytics-metric-tile">
              <span className="tile-label">Total Waste</span>
              <h2 className="tile-number">{summary.totalWeight} KG</h2>
              <span className="tile-subtext text-muted">Cumulative weight</span>
            </div>

            <div className="analytics-metric-tile">
              <span className="tile-label">Recyclable Waste</span>
              <h2 className="tile-number text-blue">{summary.recyclablePercent}%</h2>
              <span className="tile-subtext text-blue">{summary.recyclableCount} items recyclable</span>
            </div>

            <div className="analytics-metric-tile">
              <span className="tile-label">Estimated Value</span>
              <h2 className="tile-number text-green">₹{summary.totalValue}</h2>
              <span className="tile-subtext text-green">Total cash valuation</span>
            </div>
          </div>
        </div>

        {summary.totalScans === 0 ? (
          <div className="empty-analytics-card">
            <div className="empty-icon-wrap">
              <MapPin size={44} className="text-muted" />
            </div>
            <h2>No location scans recorded yet</h2>
            <p>
              Scans performed via the AI Detection scanner will appear here with material and valuation breakdowns.
            </p>
            <Link to="/ai-detection" className="btn-primary mt-3">
              <Camera size={18} />
              <span>Scan Waste Now</span>
            </Link>
          </div>
        ) : (
          <div className="analytics-content-grid">
            {/* Simple Material Breakdown */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Material Breakdown</h3>
                  <p className="chart-subtitle">Percentages derived from recorded scans</p>
                </div>
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
                        <strong>{item.percentage}%</strong> ({item.count} items • {item.weightKg} kg)
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

            {/* Scan Point Breakdown */}
            <div className="chart-card">
              <div className="chart-header">
                <div>
                  <h3 className="chart-title">Scan Points</h3>
                  <p className="chart-subtitle">Locations where scans were recorded</p>
                </div>
              </div>

              <div className="locations-simple-list">
                {locationsList.map((loc) => (
                  <div key={loc.name} className="location-simple-row">
                    <div className="loc-name-group">
                      <MapPin size={16} className="text-green" />
                      <strong>{loc.name}</strong>
                    </div>

                    <div className="loc-stats-group">
                      <span>{loc.count} scans</span>
                      <span>{loc.weightKg} kg</span>
                      <strong className="text-green">₹{loc.value}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className="analytics-summary-callout mt-4">
                <p>
                  Recycling is active across <strong>{locationsList.length} scan source(s)</strong> with <strong>{summary.recyclablePercent}% compliance</strong>.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LocationAnalytics;
