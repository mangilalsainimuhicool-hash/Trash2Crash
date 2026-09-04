import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TrendingUp,
  Clock,
  Sparkles,
  Calculator,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  Boxes,
  Cpu,
  Layers
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Prices = () => {
  const { categories, rates } = useApp();
  const navigate = useNavigate();

  // Calculator State
  const [calcType, setCalcType] = useState('plastic');
  const [calcWeight, setCalcWeight] = useState(20);

  const currentRate = rates[calcType] || 25;
  const rawEarnings = calcWeight * currentRate;
  // Bonus if weight >= 50kg (+5%)
  const bulkBonus = calcWeight >= 50 ? Math.round(rawEarnings * 0.05) : 0;
  const totalEstimatedEarnings = rawEarnings + bulkBonus;

  const handleBookWithEstimate = () => {
    navigate(`/sell-waste?category=${calcType}&qty=${calcWeight}`);
  };

  const todayStr = new Date().toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="page-wrapper prices-page">
      {/* HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="live-badge-row">
            <span className="live-pulse-badge">
              <span className="live-dot"></span>
              Prices updated today ({todayStr})
            </span>
          </div>

          <h1 className="page-title">Live Scrap Market Rates</h1>
          <p className="page-description">
            Transparent, benchmarked recycling rates. No hidden deductions, no guesswork. Weigh accurately and get paid directly.
          </p>
        </div>
      </section>

      {/* RATES GRID & CALCULATOR */}
      <section className="price-content-section">
        <div className="container">
          {/* Top 4 Rate Cards */}
          <div className="rates-table-grid">
            <div className="rate-card">
              <div className="rate-card-top">
                <span className="cat-icon-bubble">📰</span>
                <span className="trend-badge-pill positive">+₹1.50 this week</span>
              </div>
              <h3 className="rate-cat-title">Paper Waste</h3>
              <p className="rate-cat-sub">Newspapers, cartons, registers, books</p>
              <div className="rate-big-num">
                <span className="sym">₹</span>
                <span className="val">18</span>
                <span className="per">/ kg</span>
              </div>
              <div className="rate-card-meta">
                <span>Min Weight: 5 kg</span>
                <button
                  onClick={() => { setCalcType('paper'); setCalcWeight(15); }}
                  className="rate-calc-btn"
                >
                  Calculate →
                </button>
              </div>
            </div>

            <div className="rate-card featured-rate">
              <div className="popular-ribbon">Most Sold</div>
              <div className="rate-card-top">
                <span className="cat-icon-bubble">🧴</span>
                <span className="trend-badge-pill positive">+₹2.00 this week</span>
              </div>
              <h3 className="rate-cat-title">Plastic Waste</h3>
              <p className="rate-cat-sub">PET bottles, HDPE containers, rigid plastics</p>
              <div className="rate-big-num">
                <span className="sym">₹</span>
                <span className="val">25</span>
                <span className="per">/ kg</span>
              </div>
              <div className="rate-card-meta">
                <span>Min Weight: 5 kg</span>
                <button
                  onClick={() => { setCalcType('plastic'); setCalcWeight(20); }}
                  className="rate-calc-btn"
                >
                  Calculate →
                </button>
              </div>
            </div>

            <div className="rate-card">
              <div className="rate-card-top">
                <span className="cat-icon-bubble">🔩</span>
                <span className="trend-badge-pill neutral">Stable rate</span>
              </div>
              <h3 className="rate-cat-title">Metal Scrap</h3>
              <p className="rate-cat-sub">Iron rods, tin, aluminum, brass, copper</p>
              <div className="rate-big-num">
                <span className="sym">₹</span>
                <span className="val">40</span>
                <span className="per">/ kg</span>
              </div>
              <div className="rate-card-meta">
                <span>Min Weight: 5 kg</span>
                <button
                  onClick={() => { setCalcType('metal'); setCalcWeight(15); }}
                  className="rate-calc-btn"
                >
                  Calculate →
                </button>
              </div>
            </div>

            <div className="rate-card">
              <div className="rate-card-top">
                <span className="cat-icon-bubble">💻</span>
                <span className="trend-badge-pill positive">High Value</span>
              </div>
              <h3 className="rate-cat-title">E-Waste</h3>
              <p className="rate-cat-sub">Defunct laptops, phones, cables & PCBs</p>
              <div className="rate-big-num">
                <span className="sym">₹</span>
                <span className="val">60</span>
                <span className="per">/ kg</span>
              </div>
              <div className="rate-card-meta">
                <span>Min Weight: 2 kg</span>
                <button
                  onClick={() => { setCalcType('ewaste'); setCalcWeight(10); }}
                  className="rate-calc-btn"
                >
                  Calculate →
                </button>
              </div>
            </div>
          </div>

          {/* DYNAMIC EARNINGS CALCULATOR BOX */}
          <div className="interactive-calculator-wrapper">
            <div className="calc-panel-header">
              <div className="calc-header-title">
                <Calculator size={24} className="text-green" />
                <div>
                  <h2>Interactive Scrap Earnings Calculator</h2>
                  <p>Choose your waste material and slide or type the weight to calculate instant returns.</p>
                </div>
              </div>
              <span className="calc-live-pill">Live Formula</span>
            </div>

            <div className="calc-layout-grid">
              {/* Left Configuration */}
              <div className="calc-inputs-col">
                <label className="field-title">1. Select Waste Type</label>
                <div className="calc-type-selector">
                  {categories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setCalcType(c.id)}
                      className={`type-select-btn ${calcType === c.id ? 'active' : ''}`}
                    >
                      <span className="type-btn-emoji">{c.emoji}</span>
                      <div className="type-btn-meta">
                        <span className="name">{c.name}</span>
                        <span className="rate">₹{c.rate}/kg</span>
                      </div>
                    </button>
                  ))}
                </div>

                <div className="calc-weight-box">
                  <div className="weight-header-row">
                    <label className="field-title">2. Enter Quantity (KG)</label>
                    <div className="weight-input-group">
                      <input
                        type="number"
                        min="1"
                        max="500"
                        value={calcWeight}
                        onChange={(e) => setCalcWeight(Math.max(1, Number(e.target.value) || 1))}
                        className="weight-number-input"
                      />
                      <span className="unit-label">kg</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="2"
                    max="150"
                    step="1"
                    value={calcWeight}
                    onChange={(e) => setCalcWeight(Number(e.target.value))}
                    className="calc-range-slider"
                  />

                  {/* Quick Preset Buttons */}
                  <div className="preset-buttons">
                    <span>Quick Select:</span>
                    {[5, 10, 25, 50, 100].map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setCalcWeight(preset)}
                        className={`preset-pill ${calcWeight === preset ? 'active' : ''}`}
                      >
                        {preset} kg
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Output Receipt */}
              <div className="calc-receipt-col">
                <div className="receipt-card">
                  <div className="receipt-header">
                    <span className="receipt-tag">ESTIMATED PAYOUT BREAKDOWN</span>
                    <h3>Instant Valuation</h3>
                  </div>

                  <div className="receipt-rows">
                    <div className="receipt-row">
                      <span className="r-label">Selected Category</span>
                      <span className="r-val capitalize">{calcType}</span>
                    </div>
                    <div className="receipt-row">
                      <span className="r-label">Quantity</span>
                      <span className="r-val">{calcWeight} kg</span>
                    </div>
                    <div className="receipt-row">
                      <span className="r-label">Base Rate</span>
                      <span className="r-val">₹{currentRate} / kg</span>
                    </div>
                    <div className="receipt-row">
                      <span className="r-label">Subtotal</span>
                      <span className="r-val">₹{rawEarnings}</span>
                    </div>
                    {calcWeight >= 50 && (
                      <div className="receipt-row bonus-row">
                        <span className="r-label">🎉 Bulk Bonus (+5%)</span>
                        <span className="r-val text-green">+₹{bulkBonus}</span>
                      </div>
                    )}
                  </div>

                  <div className="receipt-total-divider"></div>

                  <div className="receipt-grand-total">
                    <div className="total-text">
                      <span className="t-label">Estimated Earnings</span>
                      <span className="t-sub">Paid instantly at doorstep</span>
                    </div>
                    <div className="total-number">
                      ₹{totalEstimatedEarnings}
                    </div>
                  </div>

                  <button
                    onClick={handleBookWithEstimate}
                    className="btn-primary w-full receipt-book-btn"
                  >
                    <span>Schedule Pickup for ₹{totalEstimatedEarnings}</span>
                    <ArrowRight size={18} />
                  </button>

                  <div className="receipt-guarantees">
                    <div className="guarantee-item">
                      <CheckCircle2 size={14} className="text-green" />
                      <span>100% Free Doorstep Pickup</span>
                    </div>
                    <div className="guarantee-item">
                      <CheckCircle2 size={14} className="text-green" />
                      <span>Certified Bluetooth Scale</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prices;
