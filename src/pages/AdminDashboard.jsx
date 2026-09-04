import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart3,
  Camera,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Play,
  Activity,
  Award
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import StatCard from '../components/StatCard';
import { CategoryBarChart, AccuracyGaugeCard } from '../components/ChartCard';

const AdminDashboard = () => {
  const { campusStats, locations, aiEvents, aiInsights, isDemoRunning, startDemo } = useApp();

  // Category summary data
  const categoryData = [
    { name: 'Dry Recyclables (Plastic, Paper, Metal)', percentage: 46, weightKg: 334, color: '#2563eb' },
    { name: 'Wet Organic Waste (Food leftovers)', percentage: 42, weightKg: 305, color: '#16a34a' },
    { name: 'Sanitary Waste (Restrooms, Medical)', percentage: 7, weightKg: 51, color: '#dc2626' },
    { name: 'Special / E-Waste (Batteries, Cables)', percentage: 5, weightKg: 36, color: '#ea580c' }
  ];

  return (
    <div className="page-wrapper admin-dashboard-page">
      {/* HEADER BAR */}
      <section className="admin-header-bar">
        <div className="container">
          <div className="admin-title-flex">
            <div>
              <div className="prototype-badge-pill">
                <span className="prototype-dot"></span>
                <span>CAMPUS WASTE INTELLIGENCE • ADMIN CONSOLE</span>
              </div>
              <h1 className="admin-title">Campus Waste Intelligence Dashboard</h1>
              <p className="admin-subtitle">
                Central command telemetry monitoring real-time segregation accuracy, contamination anomalies, and resource recovery across campus.
              </p>
            </div>

            <div className="admin-quick-actions">
              <Link to="/ai-detection" className="btn-primary">
                <Camera size={16} />
                <span>Live AI Vision Feed</span>
              </Link>
              <Link to="/analytics" className="btn-secondary">
                <BarChart3 size={16} />
                <span>Deep Analytics</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* TOP 5 MANDATORY KPI CARDS */}
      <section className="admin-kpi-section">
        <div className="container">
          <div className="kpi-cards-grid-5">
            {/* Total Waste Events */}
            <div className="kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-label">TOTAL WASTE EVENTS</span>
                <Activity size={18} className="text-green" />
              </div>
              <h2 className="kpi-val">{campusStats.totalWasteEvents.toLocaleString()}</h2>
              <span className="kpi-subtext text-muted">Across 14 smart vision nodes</span>
              <span className="proto-label">Live Telemetry</span>
            </div>

            {/* Segregation Accuracy */}
            <div className="kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-label">SEGREGATION ACCURACY</span>
                <CheckCircle2 size={18} className="text-green" />
              </div>
              <h2 className="kpi-val text-green">{campusStats.segregationAccuracy}%</h2>
              <span className="kpi-subtext text-green">+3.4% compliance vs last month</span>
              <span className="proto-label">Live Telemetry</span>
            </div>

            {/* Contamination Rate */}
            <div className="kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-label">CONTAMINATION RATE</span>
                <AlertTriangle size={18} className="text-red" />
              </div>
              <h2 className="kpi-val text-red">{campusStats.contaminationRate}%</h2>
              <span className="kpi-subtext text-red">Priority: Canteen Area</span>
              <span className="proto-label">Live Telemetry</span>
            </div>

            {/* Recyclable Waste */}
            <div className="kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-label">RECYCLABLE WASTE</span>
                <Layers size={18} className="text-blue" />
              </div>
              <h2 className="kpi-val text-blue">{campusStats.recyclableWasteKg} KG</h2>
              <span className="kpi-subtext text-muted">Ready for certified recycler</span>
              <span className="proto-label">Live Telemetry</span>
            </div>

            {/* Top Problem Area */}
            <div className="kpi-card problem-kpi-card">
              <div className="kpi-card-top">
                <span className="kpi-label">TOP PROBLEM AREA</span>
                <AlertTriangle size={18} className="text-red" />
              </div>
              <h2 className="kpi-val text-red">{campusStats.topProblemArea}</h2>
              <span className="kpi-subtext">37% contamination at lunch</span>
              <Link to="/location-analytics" className="problem-link">
                Investigate Zone →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CORE DASHBOARD SPLIT VIEW */}
      <section className="admin-body-section">
        <div className="container">
          <div className="admin-split-grid">
            {/* Left Column: Live AI Telemetry & Location Matrix */}
            <div className="admin-main-col">
              {/* Live Vision Preview Banner */}
              <div className="admin-banner-card">
                <div className="banner-text-part">
                  <div className="cam-pulse-badge">
                    <span className="pulse-circle"></span>
                    <span>14 Active Computer Vision Nodes</span>
                  </div>
                  <h3>Realtime Automated Detection Stream</h3>
                  <p>
                    Camera nodes continuously detect, classify, and verify segregation in the background with zero user touch.
                  </p>
                </div>
                <div className="banner-action-part">
                  <Link to="/ai-detection" className="btn-primary btn-sm">
                    Open Camera Viewport →
                  </Link>
                </div>
              </div>

              {/* Location Performance Matrix */}
              <div className="admin-table-card mt-4">
                <div className="table-header-flex">
                  <div>
                    <h3>Campus Location Segregation Index</h3>
                    <p className="text-muted text-xs">Sorted by priority compliance requirements</p>
                  </div>
                  <Link to="/location-analytics" className="view-more-text">
                    View Full Spatial Analytics →
                  </Link>
                </div>

                <div className="table-responsive">
                  <table className="admin-locations-table">
                    <thead>
                      <tr>
                        <th>Location</th>
                        <th>Accuracy</th>
                        <th>Status</th>
                        <th>Contamination</th>
                        <th>Primary Waste Stream</th>
                      </tr>
                    </thead>
                    <tbody>
                      {locations.map((loc) => (
                        <tr key={loc.id}>
                          <td className="font-semibold">{loc.name}</td>
                          <td>
                            <strong
                              className={
                                loc.statusColor === 'red'
                                  ? 'text-red'
                                  : loc.statusColor === 'yellow'
                                  ? 'text-amber'
                                  : 'text-green'
                              }
                            >
                              {loc.accuracy}%
                            </strong>
                          </td>
                          <td>
                            <span className={`status-pill pill-${loc.statusColor}`}>
                              {loc.status}
                            </span>
                          </td>
                          <td className="text-muted">{loc.contaminationRate}%</td>
                          <td className="text-sm text-charcoal">{loc.primaryWaste}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Quick AI Heuristic Insight Preview */}
              <div className="admin-insights-preview-card mt-4">
                <div className="preview-header">
                  <div className="p-title-group">
                    <Zap size={20} className="text-green" />
                    <h3>Top Operational AI Recommendation</h3>
                  </div>
                  <Link to="/ai-insights" className="text-green text-sm font-semibold">
                    All Recommendations ({aiInsights.length}) →
                  </Link>
                </div>

                {aiInsights[0] && (
                  <div className="preview-insight-box">
                    <h4>{aiInsights[0].title}</h4>
                    <p className="text-muted text-sm my-1">{aiInsights[0].recommendedAction}</p>
                    <div className="preview-meta">
                      <span className="impact-bold">{aiInsights[0].impactEstimate}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Mini Charts & Modules */}
            <div className="admin-sidebar-col">
              <AccuracyGaugeCard
                accuracy={campusStats.segregationAccuracy}
                contamination={campusStats.contaminationRate}
              />

              <div className="mt-4">
                <CategoryBarChart
                  data={categoryData}
                  title="Waste Distribution"
                  subtitle="7-day material weight"
                />
              </div>

              {/* Quick Navigation Panel */}
              <div className="quick-links-panel mt-4">
                <h4>Campus Intelligence Navigation</h4>
                <div className="quick-nav-list">
                  <Link to="/ai-detection" className="quick-nav-item">
                    <span>🤖 Live AI Detection Feed</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/analytics" className="quick-nav-item">
                    <span>📊 Waste Analytics & Charts</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/location-analytics" className="quick-nav-item">
                    <span>📍 Location Spatial Analytics</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/campus-cleanliness" className="quick-nav-item">
                    <span>✨ Campus Cleanliness Monitoring</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/ai-insights" className="quick-nav-item">
                    <span>🧠 AI Generated Action Insights</span>
                    <ArrowRight size={14} />
                  </Link>
                  <Link to="/dashboard" className="quick-nav-item">
                    <span>👤 Citizen / User Portal</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
