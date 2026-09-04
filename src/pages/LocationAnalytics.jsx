import React, { useState } from 'react';
import {
  MapPin,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Filter,
  BarChart,
  ShieldCheck,
  ArrowRight,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';

const LocationAnalytics = () => {
  const { locations } = useApp();
  const [filterType, setFilterType] = useState('all');

  const filteredLocations = locations.filter((loc) => {
    if (filterType === 'all') return true;
    if (filterType === 'attention') return loc.statusColor === 'red' || loc.statusColor === 'yellow';
    if (filterType === 'good') return loc.statusColor === 'green';
    return true;
  });

  return (
    <div className="page-wrapper location-analytics-page">
      {/* HEADER BANNER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="prototype-badge-pill">
            <span className="prototype-dot"></span>
            <span>CAMPUS SPATIAL TELEMETRY • ACTIVE SENSOR NODES</span>
          </div>
          <h1 className="page-title">Location-Wise Waste Analytics</h1>
          <p className="page-description">
            Continuous zone-level segregation monitoring across academic buildings, residential hostels, libraries, and food courts.
          </p>
        </div>
      </section>

      {/* CRITICAL ATTENTION BANNER (WORST PERFORMER) */}
      <section className="worst-performer-banner-section">
        <div className="container">
          <div className="hotspot-alert-banner">
            <div className="hotspot-badge-tag">
              <AlertTriangle size={18} className="text-red" />
              <span>PRIMARY INTERVENTION REQUIRED</span>
            </div>

            <div className="hotspot-content-row">
              <div className="hotspot-main-text">
                <h2>Canteen Food Court requires immediate attention</h2>
                <p>
                  Segregation compliance has dropped to <strong>63%</strong> (37% contamination rate), primarily driven by gravy and oily takeaway containers discarded into Dry Recyclable bins during the 12:30 PM – 2:00 PM lunch rush.
                </p>
              </div>

              <div className="hotspot-stats-box">
                <div className="stat-circle-red">
                  <span className="sc-val">63%</span>
                  <span className="sc-lbl">Accuracy</span>
                </div>
                <div className="hotspot-actions">
                  <Link to="/ai-insights" className="btn-primary btn-sm">
                    View AI Action Plan →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATIONS GRID & FILTERS */}
      <section className="locations-grid-section">
        <div className="container">
          <div className="section-toolbar">
            <div className="toolbar-left">
              <h3>All Monitored Campus Zones ({locations.length})</h3>
              <p className="text-muted text-sm">Realtime telemetry from IoT bin vision nodes</p>
            </div>

            <div className="filter-pill-group">
              <button
                onClick={() => setFilterType('all')}
                className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
              >
                All Zones
              </button>
              <button
                onClick={() => setFilterType('attention')}
                className={`filter-btn ${filterType === 'attention' ? 'active' : ''}`}
              >
                Needs Attention (2)
              </button>
              <button
                onClick={() => setFilterType('good')}
                className={`filter-btn ${filterType === 'good' ? 'active' : ''}`}
              >
                High Performing (4)
              </button>
            </div>
          </div>

          <div className="locations-card-grid">
            {filteredLocations.map((loc) => {
              const isRed = loc.statusColor === 'red';
              const isYellow = loc.statusColor === 'yellow';

              return (
                <div
                  key={loc.id}
                  className={`location-card ${isRed ? 'loc-card-danger' : ''} ${
                    isYellow ? 'loc-card-warning' : ''
                  }`}
                >
                  <div className="loc-card-header">
                    <div className="loc-title-group">
                      <div className={`loc-icon-bubble loc-bubble-${loc.statusColor}`}>
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="loc-name">{loc.name}</h4>
                        <span className="loc-events-sub">{loc.totalEvents} Waste Events Logged</span>
                      </div>
                    </div>

                    <span className={`loc-status-pill pill-${loc.statusColor}`}>
                      {loc.status}
                    </span>
                  </div>

                  {/* Accuracy Bar */}
                  <div className="loc-metric-block">
                    <div className="loc-bar-label-row">
                      <span>Segregation Accuracy</span>
                      <strong className={isRed ? 'text-red' : isYellow ? 'text-amber' : 'text-green'}>
                        {loc.accuracy}%
                      </strong>
                    </div>
                    <div className="loc-progress-track">
                      <div
                        className={`loc-progress-fill bg-${loc.statusColor}`}
                        style={{ width: `${loc.accuracy}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="loc-details-list">
                    <div className="loc-detail-row">
                      <span className="lbl">Contamination Rate:</span>
                      <span className="val font-semibold">{loc.contaminationRate}%</span>
                    </div>
                    <div className="loc-detail-row">
                      <span className="lbl">Dominant Materials:</span>
                      <span className="val text-muted">{loc.primaryWaste}</span>
                    </div>
                    <div className="loc-detail-row">
                      <span className="lbl">Weekly Trend:</span>
                      <span className="val text-green font-medium">{loc.trend}</span>
                    </div>
                  </div>

                  {loc.alert && (
                    <div className="loc-alert-box">
                      <AlertTriangle size={15} className="text-red flex-shrink-0" />
                      <span>{loc.alert}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationAnalytics;
