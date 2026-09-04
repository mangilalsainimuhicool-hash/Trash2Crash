import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
  History,
  BarChart3,
  DollarSign,
  CheckCircle2,
  Recycle,
  Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Home = () => {
  const { rates, scans, getAnalyticsSummary } = useApp();
  const navigate = useNavigate();
  const summary = getAnalyticsSummary();

  // Simple scrap calculator
  const [calcCategory, setCalcCategory] = useState('plastic');
  const [calcQty, setCalcQty] = useState(10);

  const rate = rates[calcCategory] || 25;
  const estimatedEarn = calcQty * rate;

  return (
    <div className="page-wrapper home-page-clean">
      {/* 1. MINIMAL HERO SECTION */}
      <section className="clean-hero-section">
        <div className="container">
          <div className="clean-hero-content text-center">
            <span className="hero-pill-badge">
              <Sparkles size={14} className="text-green" />
              AI Waste Detection & Valuation
            </span>

            <h1 className="clean-hero-title">
              Point. Scan. Classify.<br />
              <span className="text-highlight">Turn Waste Into Value.</span>
            </h1>

            <p className="clean-hero-sub">
              Upload or capture a photo of any waste item. Our AI instantly identifies the material, verifies recyclability, and estimates its real cash value.
            </p>

            {/* Obvious Primary Actions */}
            <div className="clean-hero-actions">
              <Link to="/ai-detection" className="btn-primary btn-hero-lg">
                <Camera size={20} />
                <span>Start AI Waste Detection</span>
                <ArrowRight size={18} />
              </Link>

              <Link to="/history" className="btn-secondary btn-hero-lg">
                <History size={18} />
                <span>View Scan History ({scans.length})</span>
              </Link>
            </div>

            {/* Quick 3-point Highlights */}
            <div className="clean-hero-highlights">
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-green" />
                <span>Real-Time Edge Detection</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-green" />
                <span>Transparent Scrap Rates</span>
              </div>
              <div className="highlight-item">
                <CheckCircle2 size={16} className="text-green" />
                <span>Dynamic Real History</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THREE-STEP FLOW STRIP */}
      <section className="simple-workflow-section">
        <div className="container">
          <div className="simple-section-header text-center">
            <h2 className="section-title">How It Works</h2>
            <p className="section-subtitle">Zero complexity. Three simple steps from trash to cash.</p>
          </div>

          <div className="workflow-cards-3">
            <div className="wf-card">
              <div className="wf-number-circle">1</div>
              <div className="wf-icon-box">
                <Camera size={26} className="text-green" />
              </div>
              <h3>Snap Photo</h3>
              <p>Capture waste with your camera or upload an image file.</p>
            </div>

            <div className="wf-card">
              <div className="wf-number-circle">2</div>
              <div className="wf-icon-box">
                <Zap size={26} className="text-blue" />
              </div>
              <h3>AI Detection</h3>
              <p>Our model accurately identifies materials and recyclability.</p>
            </div>

            <div className="wf-card">
              <div className="wf-number-circle">3</div>
              <div className="wf-icon-box">
                <DollarSign size={26} className="text-green" />
              </div>
              <h3>Get Value & Sell</h3>
              <p>See estimated cash value, save scans, or book doorstep pickup.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. RATES STRIP & CALCULATOR */}
      <section className="quick-rates-section">
        <div className="container">
          <div className="rates-calculator-grid">
            {/* Rates Table / Cards */}
            <div className="rates-summary-card">
              <div className="card-header-clean">
                <h3>Today's Scrap Market Prices</h3>
                <span className="rates-live-tag">Updated Today</span>
              </div>

              <div className="rates-mini-list">
                <div className="rate-mini-row">
                  <span className="mat-tag">🧴 Plastic (PET/HDPE)</span>
                  <strong className="rate-val text-green">₹{rates.plastic || 25}/kg</strong>
                </div>
                <div className="rate-mini-row">
                  <span className="mat-tag">📦 Cardboard & Paper</span>
                  <strong className="rate-val text-green">₹{rates.cardboard || 15}/kg</strong>
                </div>
                <div className="rate-mini-row">
                  <span className="mat-tag">🥫 Metal & Cans</span>
                  <strong className="rate-val text-green">₹{rates.metal || 40}/kg</strong>
                </div>
                <div className="rate-mini-row">
                  <span className="mat-tag">🍾 Glass Bottles</span>
                  <strong className="rate-val text-green">₹{rates.glass || 10}/kg</strong>
                </div>
                <div className="rate-mini-row">
                  <span className="mat-tag">🔋 E-Waste & Batteries</span>
                  <strong className="rate-val text-green">₹{rates.ewaste || 60}/kg</strong>
                </div>
              </div>
            </div>

            {/* Quick Estimator */}
            <div className="quick-estimator-card">
              <div className="card-header-clean">
                <h3>Quick Scrap Value Estimator</h3>
                <span className="text-xs text-muted">Estimate earnings</span>
              </div>

              <div className="estimator-body">
                <div className="form-group-clean">
                  <label className="form-label-clean">Select Material:</label>
                  <select
                    value={calcCategory}
                    onChange={(e) => setCalcCategory(e.target.value)}
                    className="select-clean"
                  >
                    <option value="plastic">Plastic (₹25/kg)</option>
                    <option value="cardboard">Cardboard (₹15/kg)</option>
                    <option value="paper">Paper (₹18/kg)</option>
                    <option value="metal">Metal / Can (₹40/kg)</option>
                    <option value="ewaste">E-Waste (₹60/kg)</option>
                  </select>
                </div>

                <div className="form-group-clean mt-3">
                  <div className="label-slider-row">
                    <label className="form-label-clean">Estimated Weight:</label>
                    <strong>{calcQty} KG</strong>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={calcQty}
                    onChange={(e) => setCalcQty(Number(e.target.value))}
                    className="range-slider-clean"
                  />
                </div>

                <div className="estimator-result-box mt-3">
                  <span className="est-label">Estimated Payout:</span>
                  <h2 className="est-figure text-green">₹{estimatedEarn}</h2>
                </div>

                <button
                  onClick={() => navigate(`/sell-waste?category=${calcCategory}&qty=${calcQty}`)}
                  className="btn-primary w-full mt-3"
                >
                  <span>Sell This Scrap Now</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION BANNER */}
      <section className="clean-cta-section">
        <div className="container">
          <div className="clean-cta-box">
            <div>
              <h2>Ready to identify and value your waste?</h2>
              <p>Experience reliable edge AI detection in your browser right now.</p>
            </div>
            <div className="cta-action-btns">
              <Link to="/ai-detection" className="btn-primary btn-white-invert">
                <Camera size={18} />
                <span>Launch AI Scanner</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
