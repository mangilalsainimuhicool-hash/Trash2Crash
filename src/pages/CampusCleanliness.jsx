import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MapPin,
  Trash2,
  Activity,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const CampusCleanliness = () => {
  const { cleanliness } = useApp();

  return (
    <div className="page-wrapper campus-cleanliness-page">
      {/* HEADER BANNER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="prototype-badge-pill">
            <span className="prototype-dot"></span>
            <span>CAMPUS SANITATION INDEX • LIVE AUDIT ENGINE</span>
          </div>
          <h1 className="page-title">Campus Cleanliness Monitoring</h1>
          <p className="page-description">
            Live hygiene tracking, bin occupancy telemetry, and sanitation incident tracking to maintain zero-overflow campuses.
          </p>
        </div>
      </section>

      {/* OVERALL SCORE HERO CARD */}
      <section className="cleanliness-score-section">
        <div className="container">
          <div className="score-hero-card">
            <div className="score-main-display">
              <span className="score-badge-mini">CAMPUS AUDIT SCORE</span>
              <div className="score-figure-row">
                <span className="big-score-val">{cleanliness.overallScore}</span>
                <span className="score-denom">/ 100</span>
              </div>
              <span className="score-verdict-badge">Good Sanitation Rating</span>
              <p className="score-subtext">
                Continuous score computed from 14 camera streams, bin overflow sensors, and prompt incident resolution times.
              </p>
            </div>

            <div className="score-breakdown-metrics">
              <div className="sb-item">
                <span className="sb-label">Bin Clusters Monitored</span>
                <strong className="sb-val">32 Stations</strong>
              </div>
              <div className="sb-item">
                <span className="sb-label">Average Overflow Frequency</span>
                <strong className="sb-val text-green">&lt; 1.2 hrs/month</strong>
              </div>
              <div className="sb-item">
                <span className="sb-label">Resolved Sanitation Tickets</span>
                <strong className="sb-val text-green">94.8%</strong>
              </div>
              <div className="sb-item">
                <span className="sb-label">Current Audit Period</span>
                <strong className="sb-val">{cleanliness.auditDate}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ZONE BREAKDOWNS */}
      <section className="cleanliness-zones-section">
        <div className="container">
          <div className="zones-tier-grid">
            {/* 🟢 Clean Areas */}
            <div className="zone-tier-card tier-green">
              <div className="tier-header">
                <div className="tier-title-row">
                  <span className="tier-icon-circle bg-green-soft text-green">✓</span>
                  <div>
                    <h3>Clean Areas</h3>
                    <p className="text-muted text-xs">High compliance, regular clearance</p>
                  </div>
                </div>
                <span className="tier-count-pill">{cleanliness.zones.clean.length} Zones</span>
              </div>

              <div className="zone-items-list">
                {cleanliness.zones.clean.map((z, i) => (
                  <div key={i} className="zone-item-row">
                    <div>
                      <h4 className="zone-name">{z.name}</h4>
                      <span className="zone-meta text-muted">
                        {z.binsCount} bins • Cleared {z.lastCleaned}
                      </span>
                    </div>
                    <span className="zone-score-pill text-green font-bold">
                      {z.score}/100
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🟡 Attention Required */}
            <div className="zone-tier-card tier-yellow">
              <div className="tier-header">
                <div className="tier-title-row">
                  <span className="tier-icon-circle bg-amber-soft text-amber">!</span>
                  <div>
                    <h3>Attention Required</h3>
                    <p className="text-muted text-xs">Moderate waste build-up observed</p>
                  </div>
                </div>
                <span className="tier-count-pill">{cleanliness.zones.moderate.length} Zones</span>
              </div>

              <div className="zone-items-list">
                {cleanliness.zones.moderate.map((z, i) => (
                  <div key={i} className="zone-item-row">
                    <div>
                      <h4 className="zone-name">{z.name}</h4>
                      <span className="zone-meta text-muted">
                        {z.binsCount} bins • Cleared {z.lastCleaned}
                      </span>
                    </div>
                    <span className="zone-score-pill text-amber font-bold">
                      {z.score}/100
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 🔴 High Contamination Areas */}
            <div className="zone-tier-card tier-red">
              <div className="tier-header">
                <div className="tier-title-row">
                  <span className="tier-icon-circle bg-red-soft text-red">✕</span>
                  <div>
                    <h3>High Contamination</h3>
                    <p className="text-muted text-xs">Critical contamination or overflow</p>
                  </div>
                </div>
                <span className="tier-count-pill">{cleanliness.zones.attention.length} Zones</span>
              </div>

              <div className="zone-items-list">
                {cleanliness.zones.attention.map((z, i) => (
                  <div key={i} className="zone-item-row">
                    <div>
                      <h4 className="zone-name">{z.name}</h4>
                      <span className="zone-meta text-red font-medium">
                        Issue: {z.issue}
                      </span>
                    </div>
                    <span className="zone-score-pill text-red font-bold">
                      {z.score}/100
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RECENT SANITATION INCIDENTS TABLE */}
      <section className="incidents-log-section">
        <div className="container">
          <div className="incidents-card">
            <div className="incidents-card-header">
              <div>
                <h3>Recent Sanitation & Contamination Incidents</h3>
                <p className="text-muted text-sm">Automated incident tickets generated by AI vision</p>
              </div>
              <span className="prototype-tag">Auto-Dispatched</span>
            </div>

            <div className="table-responsive">
              <table className="incidents-table">
                <thead>
                  <tr>
                    <th>Ticket ID</th>
                    <th>Location</th>
                    <th>Waste Anomaly / Incident</th>
                    <th>Timestamp</th>
                    <th>Severity</th>
                    <th>Action Taken</th>
                  </tr>
                </thead>
                <tbody>
                  {cleanliness.recentIncidents.map((inc) => (
                    <tr key={inc.id}>
                      <td className="font-mono font-bold text-green">{inc.id}</td>
                      <td className="font-medium">{inc.location}</td>
                      <td>{inc.wasteType}</td>
                      <td className="text-muted">{inc.time}</td>
                      <td>
                        <span
                          className={`severity-badge ${
                            inc.severity === 'High'
                              ? 'severity-high'
                              : inc.severity === 'Medium'
                              ? 'severity-med'
                              : 'severity-low'
                          }`}
                        >
                          {inc.severity}
                        </span>
                      </td>
                      <td className="font-semibold text-charcoal">{inc.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CampusCleanliness;
