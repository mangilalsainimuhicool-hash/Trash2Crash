import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  MapPin,
  TrendingUp,
  Download,
  PlusCircle,
  CheckCircle2,
  AlertCircle,
  Clock3,
  Trash2,
  Leaf,
  Award,
  Filter,
  ArrowUpRight,
  ExternalLink,
  QrCode,
  Wallet,
  Check,
  ShieldCheck,
  Smartphone,
  ArrowRight
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const { user, stats, transactions, upcomingPickups, cancelPickup, showToast, qrTracking } = useApp();
  const [filterStatus, setFilterStatus] = useState('All');
  const [certModalOpen, setCertModalOpen] = useState(false);
  const [selectedBatch, setSelectedBatch] = useState(qrTracking[0]);
  const [mockUpiId, setMockUpiId] = useState('aarav@okaxis');
  const [upiClaimed, setUpiClaimed] = useState(false);

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    if (filterStatus === 'All') return true;
    return t.status.toLowerCase() === filterStatus.toLowerCase();
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <span className="badge-status status-completed">
            <CheckCircle2 size={12} />
            <span>Completed</span>
          </span>
        );
      case 'Processing':
        return (
          <span className="badge-status status-processing">
            <Clock3 size={12} />
            <span>Processing</span>
          </span>
        );
      case 'Scheduled':
        return (
          <span className="badge-status status-scheduled">
            <Calendar size={12} />
            <span>Scheduled</span>
          </span>
        );
      default:
        return (
          <span className="badge-status status-cancelled">
            <span>{status}</span>
          </span>
        );
    }
  };

  const handleDownloadCertificate = () => {
    setCertModalOpen(true);
  };

  const handleSimulateUpiReward = () => {
    setUpiClaimed(true);
    showToast('UPI Payout of ₹250 successfully initiated to ' + mockUpiId + ' ⚡ Reference: TXN-941829', 'success');
  };

  return (
    <div className="page-wrapper dashboard-page">
      {/* TOP WELCOME SECTION */}
      <section className="dashboard-hero-bar">
        <div className="container">
          <div className="dashboard-welcome-flex">
            <div>
              <span className="sub-badge">CITIZEN REWARDS & IMPACT PORTAL</span>
              <h1 className="welcome-title">
                Welcome back 👋 {user ? user.name.split(' ')[0] : 'Eco Recycler'}
              </h1>
              <p className="welcome-subtitle">
                Track your doorstep recycling history, view instant cash earnings, verify QR batch logistics, and monitor carbon savings.
              </p>
            </div>

            <div className="welcome-actions">
              <button onClick={handleDownloadCertificate} className="btn-secondary cert-btn">
                <Award size={16} className="text-green" />
                <span>Eco Certificate</span>
              </button>
              <Link to="/schedule-pickup" className="btn-primary">
                <PlusCircle size={16} />
                <span>Schedule Pickup</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4 CORE STATISTICS */}
      <section className="dashboard-stats-section">
        <div className="container">
          <div className="stats-cards-grid">
            <StatCard
              icon="Scale"
              value={`${stats.totalWasteSold} kg`}
              label="Total Waste Sold"
              subtext="Clean dry recyclables"
              trend="+18% this month"
              colorScheme="green"
            />
            <StatCard
              icon="IndianRupee"
              value={`₹${stats.totalEarnings.toLocaleString('en-IN')}`}
              label="Total Earnings"
              subtext="Credited to UPI / Cash"
              trend="100% Instant"
              colorScheme="emerald"
            />
            <StatCard
              icon="CalendarCheck2"
              value={`${stats.pickupsCompleted}`}
              label="Pickups Completed"
              subtext="Doorstep visits fulfilled"
              trend="5.0 ★ Rating"
              colorScheme="blue"
            />
            <StatCard
              icon="Leaf"
              value={`${stats.co2Saved} kg`}
              label="CO₂ Saved"
              subtext="Diverted from city landfills"
              trend="Eco Champion"
              colorScheme="teal"
            />
          </div>
        </div>
      </section>

      {/* UPCOMING PICKUPS & ACTIVITY */}
      <section className="dashboard-main-section">
        <div className="container">
          <div className="dashboard-content-grid">
            {/* Left Column: Upcoming Pickups, QR Tracking, & Transactions */}
            <div className="dashboard-left-col">
              {/* UPCOMING PICKUP SECTION */}
              <div className="dash-card upcoming-pickups-card">
                <div className="dash-card-header">
                  <div>
                    <h2 className="dash-card-title">Upcoming Pickup</h2>
                    <p className="dash-card-sub">Next scheduled doorstep collection</p>
                  </div>
                  <Link to="/schedule-pickup" className="btn-text-link">
                    + Book Another
                  </Link>
                </div>

                {upcomingPickups && upcomingPickups.length > 0 ? (
                  <div className="upcoming-list">
                    {upcomingPickups.map((pickup) => (
                      <div key={pickup.id} className="upcoming-item-box">
                        <div className="item-box-top">
                          <div className="item-type-badge">
                            <span className="dot-pulse"></span>
                            <span className="waste-type-tag">{pickup.wasteType} Waste</span>
                            <span className="ref-tag">({pickup.id})</span>
                          </div>
                          <span className="item-est-earnings">
                            Est. ₹{pickup.estimatedEarnings}
                          </span>
                        </div>

                        <div className="item-meta-grid">
                          <div className="meta-col">
                            <Calendar size={15} className="text-green" />
                            <span>{pickup.date}</span>
                          </div>
                          <div className="meta-col">
                            <Clock size={15} className="text-green" />
                            <span>{pickup.timeSlot}</span>
                          </div>
                          <div className="meta-col">
                            <Scale size={15} className="text-green" />
                            <span>~{pickup.quantity} kg</span>
                          </div>
                        </div>

                        <div className="item-address-row">
                          <MapPin size={15} className="text-muted" />
                          <span className="addr-text">{pickup.address}</span>
                        </div>

                        <div className="item-agent-info">
                          <span className="agent-label">Assigned Partner:</span>
                          <span className="agent-val">{pickup.agentName}</span>
                          <button
                            onClick={() => cancelPickup(pickup.id)}
                            className="cancel-pickup-btn"
                            title="Cancel this pickup"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="empty-pickups-placeholder">
                    <Calendar size={36} className="text-muted" />
                    <p className="empty-title">No upcoming pickups scheduled</p>
                    <p className="empty-desc">Declutter your house and earn cash today.</p>
                    <Link to="/schedule-pickup" className="btn-primary btn-sm mt-2">
                      Schedule a Pickup
                    </Link>
                  </div>
                )}
              </div>

              {/* NEW: QR-BASED BATCH TRACKING UI */}
              <div className="dash-card qr-tracking-card">
                <div className="dash-card-header">
                  <div className="qr-title-group">
                    <QrCode size={24} className="text-green" />
                    <div>
                      <h2 className="dash-card-title">QR-Based Waste Batch Tracking</h2>
                      <p className="dash-card-sub">Traceable batch custody from collection to recycling mill</p>
                    </div>
                  </div>
                  <span className="prototype-tag">Live Batch Tracking</span>
                </div>

                <div className="qr-batch-selector-row">
                  {qrTracking.map((batch) => (
                    <button
                      key={batch.trackingId}
                      onClick={() => setSelectedBatch(batch)}
                      className={`qr-select-btn ${selectedBatch.trackingId === batch.trackingId ? 'active' : ''}`}
                    >
                      <span className="font-mono font-bold">{batch.trackingId}</span>
                      <span className="text-xs text-muted">({batch.weightKg} kg)</span>
                    </button>
                  ))}
                </div>

                {selectedBatch && (
                  <div className="qr-dossier-box">
                    <div className="dossier-top-flex">
                      <div>
                        <span className="batch-status-label">Current Status:</span>
                        <h3 className="batch-status-val text-green">
                          Collected → Verified → Sent to Recycler
                        </h3>
                        <p className="text-xs text-muted mt-1">
                          {selectedBatch.batchName} • {selectedBatch.collectionLocation}
                        </p>
                      </div>
                      <div className="batch-payout-box">
                        <span className="text-xs text-muted">Valuation</span>
                        <strong>{selectedBatch.payoutCredited}</strong>
                      </div>
                    </div>

                    <div className="qr-stepper">
                      {selectedBatch.steps.map((step, idx) => (
                        <div key={idx} className={`qr-step-item ${step.completed ? 'step-done' : 'step-pending'}`}>
                          <div className="step-circle">
                            {step.completed ? <Check size={14} /> : idx + 1}
                          </div>
                          <div className="step-content">
                            <span className="step-lbl">{step.label}</span>
                            <span className="step-time text-muted text-xs">{step.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* RECENT TRANSACTIONS TABLE */}
              <div className="dash-card transactions-card">
                <div className="dash-card-header">
                  <div>
                    <h2 className="dash-card-title">Recent Transactions</h2>
                    <p className="dash-card-sub">History of your scrap sales & payouts</p>
                  </div>

                  {/* Filter Pills */}
                  <div className="trans-filter-pills">
                    {['All', 'Completed', 'Processing', 'Scheduled'].map((status) => (
                      <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`pill-btn ${filterStatus === status ? 'active' : ''}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="table-responsive">
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Waste</th>
                        <th>Quantity</th>
                        <th>Earnings</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTransactions.length > 0 ? (
                        filteredTransactions.map((tx) => (
                          <tr key={tx.id}>
                            <td className="cell-date font-medium">{tx.date}</td>
                            <td className="cell-waste">
                              <span className="waste-badge-table">{tx.wasteType}</span>
                            </td>
                            <td className="cell-qty">{tx.quantity} kg</td>
                            <td className="cell-earnings font-semibold text-green-dark">
                              ₹{tx.earnings}
                            </td>
                            <td className="cell-status">{getStatusBadge(tx.status)}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center py-6 text-muted">
                            No transactions found for status: {filterStatus}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: UPI Reward Prototype, Eco Impact, & Quick Sell */}
            <div className="dashboard-right-col">
              {/* UPI REWARD INTEGRATION CARD */}
              <div className="dash-card upi-integration-card">
                <div className="dash-card-header">
                  <div className="upi-title-group">
                    <Zap size={22} className="text-yellow" />
                    <div>
                      <h3 className="upi-card-title">Instant UPI Waste Payout</h3>
                      <p className="upi-card-sub">Direct bank transfer for your segregated recyclables</p>
                    </div>
                  </div>
                  <span className="prototype-tag">Instant Gateway</span>
                </div>

                <div className="upi-body-fields">
                  <div className="upi-balance-preview">
                    <span className="balance-sub">Available Redeemable Earnings</span>
                    <h3 className="balance-sum">₹{stats.totalEarnings}.00</h3>
                  </div>

                  <div className="upi-id-field-group">
                    <label className="upi-label">Registered UPI VPA / PhonePe / GPay</label>
                    <input
                      type="text"
                      readOnly
                      value={mockUpiId}
                      className="upi-input-mock"
                    />
                  </div>
                </div>

                <div className="upi-payout-cta">
                  <button
                    onClick={handleSimulateUpiReward}
                    className="btn-primary w-full btn-sm"
                  >
                    <span>{upiClaimed ? '✓ Payout Dispatched (₹250)' : 'Claim Instant UPI Payout (₹250)'}</span>
                  </button>
                  <span className="disclaimer-text">
                    *Instant UPI Payout Gateway connected to verified scrap collections.
                  </span>
                </div>
              </div>

              {/* Eco Impact Milestone Card */}
              <div className="dash-card milestone-card">
                <div className="milestone-badge">
                  <Leaf size={18} className="text-green" />
                  <span>Green Citizen Level 3</span>
                </div>
                <h3 className="milestone-heading">Eco Conservation Score</h3>
                <p className="milestone-desc">
                  You've saved <strong>64 kg of CO₂</strong> and conserved <strong>3,400 liters</strong> of industrial water.
                </p>

                <div className="progress-bar-container">
                  <div className="progress-labels">
                    <span>Progress to Level 4</span>
                    <span>64%</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill" style={{ width: '64%' }}></div>
                  </div>
                </div>

                <div className="eco-equivalents">
                  <div className="eq-item">
                    <span className="eq-num">3</span>
                    <span className="eq-label">Trees Saved</span>
                  </div>
                  <div className="eq-item">
                    <span className="eq-num">128 kWh</span>
                    <span className="eq-label">Energy Conserved</span>
                  </div>
                </div>
              </div>

              {/* Quick Sell Shortcut */}
              <div className="dash-card quick-sell-shortcut">
                <h3>Quick Sell by Rate</h3>
                <div className="quick-rates-list">
                  <Link to="/sell-waste?category=paper" className="quick-rate-item">
                    <span>📰 Paper</span>
                    <span className="qr-rate">₹18/kg →</span>
                  </Link>
                  <Link to="/sell-waste?category=plastic" className="quick-rate-item">
                    <span>🧴 Plastic</span>
                    <span className="qr-rate">₹25/kg →</span>
                  </Link>
                  <Link to="/sell-waste?category=metal" className="quick-rate-item">
                    <span>🔩 Metal</span>
                    <span className="qr-rate">₹40/kg →</span>
                  </Link>
                  <Link to="/sell-waste?category=cardboard" className="quick-rate-item">
                    <span>📦 Cardboard</span>
                    <span className="qr-rate">₹15/kg →</span>
                  </Link>
                  <Link to="/sell-waste?category=ewaste" className="quick-rate-item">
                    <span>💻 E-Waste</span>
                    <span className="qr-rate">₹60/kg →</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ECO CERTIFICATE MODAL */}
      {certModalOpen && (
        <div className="modal-overlay" onClick={() => setCertModalOpen(false)}>
          <div className="certificate-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="cert-border">
              <div className="cert-top">
                <span className="cert-seal">♻️</span>
                <span className="cert-badge">TRASH2CASH AI SUSTAINABILITY INITIATIVE</span>
                <h2>Certificate of Environmental Impact</h2>
                <p className="cert-awarded-to">This certificate is proudly awarded to</p>
                <h3 className="cert-user-name">{user ? user.name : 'Eco Recycler'}</h3>
              </div>

              <p className="cert-body">
                In recognition of outstanding dedication to circular economy and zero-waste sustainability. By diverting <strong>{stats.totalWasteSold} kg</strong> of dry recyclable scrap and avoiding <strong>{stats.co2Saved} kg of CO₂</strong> greenhouse emissions.
              </p>

              <div className="cert-stats-row">
                <div className="cert-stat">
                  <strong>{stats.totalWasteSold} kg</strong>
                  <span>Waste Diverted</span>
                </div>
                <div className="cert-stat">
                  <strong>{stats.co2Saved} kg</strong>
                  <span>CO₂ Avoided</span>
                </div>
                <div className="cert-stat">
                  <strong>₹{stats.totalEarnings}</strong>
                  <span>Direct Earnings</span>
                </div>
              </div>

              <div className="cert-footer">
                <div>
                  <p className="sig-line">Dr. P. Sundaram</p>
                  <p className="sig-title">Director of Green Operations, Trash2Cash AI</p>
                </div>
                <div>
                  <p className="sig-line">{new Date().toLocaleDateString()}</p>
                  <p className="sig-title">Date of Issue</p>
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <button
                onClick={() => {
                  showToast('Certificate PDF downloaded successfully! 📄', 'success');
                  setCertModalOpen(false);
                }}
                className="btn-primary"
              >
                <Download size={16} />
                <span>Download PDF Certificate</span>
              </button>
              <button onClick={() => setCertModalOpen(false)} className="btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
