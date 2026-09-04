import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  PieChart,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CategoryBarChart, WeeklyTrendChart, AccuracyGaugeCard } from '../components/ChartCard';

const WasteAnalytics = () => {
  const { campusStats } = useApp();
  const [timeRange, setTimeRange] = useState('This Week');

  // Category Distribution Mock Data
  const categoryData = [
    { name: 'Dry Recyclables (Plastic, Paper, Metal)', percentage: 46, weightKg: 334, color: '#2563eb' },
    { name: 'Wet Organic Waste (Canteen, Food leftovers)', percentage: 42, weightKg: 305, color: '#16a34a' },
    { name: 'Sanitary Waste (Restrooms, Medical)', percentage: 7, weightKg: 51, color: '#dc2626' },
    { name: 'Special / E-Waste (Batteries, Cables)', percentage: 5, weightKg: 36, color: '#ea580c' }
  ];

  // Weekly Trend Mock Data (kg per day)
  const weeklyData = [
    { day: 'Mon', totalKg: 104, segregatedKg: 91 },
    { day: 'Tue', totalKg: 118, segregatedKg: 102 },
    { day: 'Wed', totalKg: 125, segregatedKg: 108 },
    { day: 'Thu', totalKg: 142, segregatedKg: 115 },
    { day: 'Fri', totalKg: 156, segregatedKg: 122 },
    { day: 'Sat', totalKg: 85, segregatedKg: 78 },
    { day: 'Sun', totalKg: 46, segregatedKg: 42 }
  ];

  return (
    <div className="page-wrapper analytics-page">
      {/* HEADER BANNER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="prototype-badge-pill">
            <span className="prototype-dot"></span>
            <span>CAMPUS SENSOR NETWORK • REALTIME TELEMETRY</span>
          </div>
          <h1 className="page-title">Waste Analytics & Stream Intelligence</h1>
          <p className="page-description">
            Aggregated institutional telemetry measuring segregation accuracy, daily volumetric trends, and contamination rates across campus bin clusters.
          </p>
        </div>
      </section>

      {/* QUICK SUMMARY TILES */}
      <section className="analytics-metrics-strip">
        <div className="container">
          <div className="analytics-tiles-grid">
            <div className="analytics-metric-tile">
              <span className="tile-label">Total Waste Events</span>
              <h2 className="tile-number">{campusStats.totalWasteEvents.toLocaleString()}</h2>
              <span className="tile-subtext text-green">Logged across 14 sensors</span>
            </div>

            <div className="analytics-metric-tile">
              <span className="tile-label">Segregation Accuracy</span>
              <h2 className="tile-number text-green">{campusStats.segregationAccuracy}%</h2>
              <span className="tile-subtext">Target: 90% Institutional</span>
            </div>

            <div className="analytics-metric-tile">
              <span className="tile-label">Contamination Rate</span>
              <h2 className="tile-number text-red">{campusStats.contaminationRate}%</h2>
              <span className="tile-subtext text-amber">Highest in Canteen Area</span>
            </div>

            <div className="analytics-metric-tile">
              <span className="tile-label">Recyclable Recovered</span>
              <h2 className="tile-number">{campusStats.recyclableWasteKg} KG</h2>
              <span className="tile-subtext text-green">~₹14,200 scrap valuation</span>
            </div>
          </div>
        </div>
      </section>

      {/* CHARTS GRID */}
      <section className="analytics-charts-section">
        <div className="container">
          <div className="charts-double-column">
            {/* Category Breakdown Bar Chart */}
            <CategoryBarChart
              data={categoryData}
              title="Waste Stream Distribution"
              subtitle="Breakdown by volumetric mass (Dry, Wet, Sanitary, Special)"
            />

            {/* Segregation vs Contamination Gauge */}
            <AccuracyGaugeCard
              accuracy={campusStats.segregationAccuracy}
              contamination={campusStats.contaminationRate}
            />
          </div>

          {/* Full-width Weekly Inflow Chart */}
          <div className="charts-full-row mt-4">
            <WeeklyTrendChart
              data={weeklyData}
              title="7-Day Campus Waste Generation & Segregation"
              subtitle="Daily kilograms recorded. Green bars show clean segregation; red stacks indicate contamination."
            />
          </div>

          {/* Contamination Trend Summary Card */}
          <div className="contamination-deepdive-card mt-4">
            <div className="deepdive-header">
              <div className="d-title-group">
                <AlertTriangle size={22} className="text-amber" />
                <div>
                  <h3>Contamination Root-Cause Analysis</h3>
                  <p className="text-muted text-sm">Identified by computer vision classification algorithms</p>
                </div>
              </div>
              <span className="prototype-tag">AI Diagnostics</span>
            </div>

            <div className="contamination-reasons-grid">
              <div className="reason-box">
                <span className="r-percentage text-red">54%</span>
                <h4 className="r-title">Food Residue on Plastics</h4>
                <p className="r-desc">Takeaway containers, oily gravies, and unrinsed beverage cups thrown into blue dry bins.</p>
              </div>

              <div className="reason-box">
                <span className="r-percentage text-amber">28%</span>
                <h4 className="r-title">Mixed Paper & Liquids</h4>
                <p className="r-desc">Wet paper tea cups and tissue paper thrown into clean cardboard recycling chutes.</p>
              </div>

              <div className="reason-box">
                <span className="r-percentage text-blue">18%</span>
                <h4 className="r-title">Hazardous in General Bins</h4>
                <p className="r-desc">Lithium button cells, broken lab glass, and chemical packaging mixed with dry waste.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WasteAnalytics;
