import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  History,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Calendar,
  DollarSign,
  Scale,
  Camera,
  Layers,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const ScanHistory = () => {
  const { scans, deleteScan, clearAllScans, getAnalyticsSummary } = useApp();
  const [filterCategory, setFilterCategory] = useState('all');

  const summary = getAnalyticsSummary();

  // Filtered scans
  const filteredScans = scans.filter((scan) => {
    if (filterCategory === 'all') return true;
    if (filterCategory === 'recyclable') return scan.recyclable;
    if (filterCategory === 'non-recyclable') return !scan.recyclable;
    return scan.categoryKey === filterCategory || scan.category?.toLowerCase() === filterCategory;
  });

  return (
    <div className="page-wrapper scan-history-page">
      <div className="container">
        {/* HEADER */}
        <div className="page-simple-header">
          <div className="header-left">
            <span className="badge-pill-simple">
              <History size={14} /> Scan Log
            </span>
            <h1 className="simple-page-title">Waste Scan History</h1>
            <p className="simple-page-sub">
              Your real AI-analyzed scans, material classifications, and recycling earnings.
            </p>
          </div>

          <div className="header-actions">
            <Link to="/ai-detection" className="btn-primary">
              <Camera size={16} />
              <span>Scan New Item</span>
            </Link>
            {scans.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to clear all scan records?')) {
                    clearAllScans();
                  }
                }}
                className="btn-secondary text-red"
                title="Clear all scans"
              >
                <Trash2 size={16} />
                <span>Clear All</span>
              </button>
            )}
          </div>
        </div>

        {/* SUMMARY STATS BAR */}
        <div className="history-stats-bar">
          <div className="h-stat-tile">
            <span className="h-stat-label">Total Scans</span>
            <h3 className="h-stat-val">{summary.totalScans}</h3>
            <span className="h-stat-sub text-muted">All-time scans</span>
          </div>

          <div className="h-stat-tile">
            <span className="h-stat-label">Total Estimated Value</span>
            <h3 className="h-stat-val text-green">₹{summary.totalValue}</h3>
            <span className="h-stat-sub text-green">Recyclable value</span>
          </div>

          <div className="h-stat-tile">
            <span className="h-stat-label">Total Weight</span>
            <h3 className="h-stat-val">{summary.totalWeight} KG</h3>
            <span className="h-stat-sub text-muted">Detected materials</span>
          </div>

          <div className="h-stat-tile">
            <span className="h-stat-label">Recyclable Rate</span>
            <h3 className="h-stat-val text-blue">{summary.recyclablePercent}%</h3>
            <span className="h-stat-sub text-blue">{summary.recyclableCount} items recyclable</span>
          </div>
        </div>

        {/* FILTER CHIPS */}
        {scans.length > 0 && (
          <div className="history-filter-strip">
            <span className="filter-label">Filter:</span>
            <div className="filter-chips-list">
              <button
                onClick={() => setFilterCategory('all')}
                className={`history-filter-chip ${filterCategory === 'all' ? 'active-chip' : ''}`}
              >
                All ({scans.length})
              </button>
              <button
                onClick={() => setFilterCategory('recyclable')}
                className={`history-filter-chip ${filterCategory === 'recyclable' ? 'active-chip' : ''}`}
              >
                Recyclable ({summary.recyclableCount})
              </button>
              <button
                onClick={() => setFilterCategory('plastic')}
                className={`history-filter-chip ${filterCategory === 'plastic' ? 'active-chip' : ''}`}
              >
                Plastic
              </button>
              <button
                onClick={() => setFilterCategory('paper')}
                className={`history-filter-chip ${filterCategory === 'paper' ? 'active-chip' : ''}`}
              >
                Paper/Cardboard
              </button>
              <button
                onClick={() => setFilterCategory('metal')}
                className={`history-filter-chip ${filterCategory === 'metal' ? 'active-chip' : ''}`}
              >
                Metal
              </button>
              <button
                onClick={() => setFilterCategory('glass')}
                className={`history-filter-chip ${filterCategory === 'glass' ? 'active-chip' : ''}`}
              >
                Glass
              </button>
              <button
                onClick={() => setFilterCategory('organic')}
                className={`history-filter-chip ${filterCategory === 'organic' ? 'active-chip' : ''}`}
              >
                Organic
              </button>
              <button
                onClick={() => setFilterCategory('ewaste')}
                className={`history-filter-chip ${filterCategory === 'ewaste' ? 'active-chip' : ''}`}
              >
                E-Waste
              </button>
            </div>
          </div>
        )}

        {/* SCAN CARDS LIST */}
        {scans.length === 0 ? (
          <div className="empty-history-card">
            <div className="empty-icon-wrap">
              <History size={48} className="text-muted" />
            </div>
            <h2>No scans yet</h2>
            <p>
              You haven't scanned any waste items yet. Upload a photo or use your camera to identify materials, estimate resale value, and log your recycling.
            </p>
            <Link to="/ai-detection" className="btn-primary mt-3">
              <Camera size={18} />
              <span>Start AI Detection</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        ) : filteredScans.length === 0 ? (
          <div className="empty-filtered-card">
            <p>No scans found for the selected category filter.</p>
            <button onClick={() => setFilterCategory('all')} className="btn-secondary btn-sm mt-2">
              Show All Scans
            </button>
          </div>
        ) : (
          <div className="history-cards-grid">
            {filteredScans.map((scan) => (
              <div key={scan.id} className="scan-record-card">
                <div className="scan-card-top">
                  <div className="scan-title-group">
                    <h3 className="scan-item-name">{scan.wasteType}</h3>
                    <span className="scan-material-tag">{scan.material}</span>
                  </div>

                  <div className="scan-badges-right">
                    {scan.recyclable ? (
                      <span className="recyclable-badge badge-yes">
                        <CheckCircle2 size={13} /> Recyclable
                      </span>
                    ) : (
                      <span className="recyclable-badge badge-no">
                        <XCircle size={13} /> Non-Recyclable
                      </span>
                    )}
                  </div>
                </div>

                {/* Scan Image if available */}
                {scan.imageUrl && (
                  <div className="scan-card-thumb-wrap">
                    <img src={scan.imageUrl} alt={scan.wasteType} className="scan-card-thumb" />
                  </div>
                )}

                <div className="scan-card-metrics-grid">
                  <div className="metric-box">
                    <span className="m-label">
                      {typeof scan.confidence === 'string' ? 'Detection' : 'AI Confidence'}
                    </span>
                    <strong className="m-val text-blue">
                      {typeof scan.confidence === 'number' ? `${scan.confidence}%` : scan.confidence}
                    </strong>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">Est. Weight</span>
                    <strong className="m-val">{scan.estimatedWeight} kg</strong>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">Earned Reward</span>
                    <strong className="m-val text-green">₹{scan.estimatedValue}</strong>
                  </div>
                  <div className="metric-box">
                    <span className="m-label">Category</span>
                    <strong className="m-val">{scan.category}</strong>
                  </div>
                </div>

                <div className="scan-card-footer">
                  <span className="scan-timestamp">
                    <Calendar size={13} className="text-muted" />
                    {new Date(scan.timestamp).toLocaleString('en-IN', {
                      dateStyle: 'medium',
                      timeStyle: 'short'
                    })}
                  </span>

                  <button
                    onClick={() => deleteScan(scan.id)}
                    className="btn-delete-scan"
                    title="Delete this scan record"
                  >
                    <Trash2 size={15} />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanHistory;
