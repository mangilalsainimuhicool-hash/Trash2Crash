import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Truck,
  Wallet,
  Scale,
  Leaf,
  ChevronRight,
  TrendingUp,
  Clock,
  Award,
  CheckCircle2,
  Camera,
  BarChart3,
  MapPin,
  Coins,
  Brain,
  Cpu,
  Layers
} from 'lucide-react';
import WasteCard from '../components/WasteCard';
import StatCard from '../components/StatCard';
import { useApp } from '../context/AppContext';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

const Home = () => {
  const { categories, rates, campusStats } = useApp();
  const navigate = useNavigate();

  // Interactive Live Calculator in Hero
  const [calculatorCategory, setCalculatorCategory] = useState('plastic');
  const [calculatorQty, setCalculatorQty] = useState(15);

  const currentRate = rates[calculatorCategory] || 25;
  const estimatedHeroEarnings = calculatorQty * currentRate;

  const handleHeroSellNow = () => {
    navigate(`/sell-waste?category=${calculatorCategory}&qty=${calculatorQty}`);
  };

  // 6 New Core Feature Cards
  const coreFeatures = [
    {
      icon: '♻️',
      title: 'Sell & Earn',
      desc: 'Users can sell recyclable paper, plastic, metal, and cardboard waste with instant transparent valuation.',
      link: '/sell-waste',
      btnText: 'Sell Scrap'
    },
    {
      icon: '🤖',
      title: 'AI Waste Detection',
      desc: 'Computer vision identifies materials automatically at the disposal point with zero user effort required.',
      link: '/ai-detection',
      btnText: 'Live Vision'
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      desc: 'Institutions can monitor segregation accuracy, daily waste volume, and contamination rates across bin clusters.',
      link: '/analytics',
      btnText: 'View Metrics'
    },
    {
      icon: '📍',
      title: 'Location Intelligence',
      desc: 'Pinpoint problem hotspots like canteens, hostels, and libraries to dispatch prompt custodial interventions.',
      link: '/location-analytics',
      btnText: 'Explore Map'
    },
    {
      icon: '💰',
      title: 'Citizen Rewards',
      desc: 'Users receive instant payouts via cash, UPI, or campus eco-credits for verified clean recyclables.',
      link: '/dashboard',
      btnText: 'My Rewards'
    },
    {
      icon: '🧠',
      title: 'AI Recommendations',
      desc: 'Actionable heuristic insights guide administrators on bin placement, clearing schedules, and signage.',
      link: '/ai-insights',
      btnText: 'AI Actions'
    }
  ];

  return (
    <div className="page-wrapper home-page">
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="container hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-pulse"></span>
              <span className="badge-text">TRASH2CASH AI • CAMPUS WASTE INTELLIGENCE</span>
            </div>

            <h1 className="hero-title">
              Turn Waste Into Value. Build <span className="text-highlight">Smarter & Cleaner Campuses.</span>
            </h1>

            <p className="hero-tagline-quote">
              “People Throw. AI Observes. Data Identifies. Institutions Act.”
            </p>

            <p className="hero-description">
              An AI-powered waste management platform that detects, verifies and analyzes waste while rewarding responsible recycling. Zero effort for the user — intelligence for the institution.
            </p>

            {/* Primary Actions: Sell Waste, AI Dashboard, How it Works */}
            <div className="hero-actions">
              <Link to="/sell-waste" className="btn-primary hero-btn">
                <span>Sell Your Waste</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/admin-dashboard" className="btn-secondary hero-btn btn-ai-highlight">
                <Brain size={18} className="text-green" />
                <span>View AI Dashboard</span>
              </Link>
              <Link to="/how-it-works" className="btn-text-plain">
                <span>How It Works →</span>
              </Link>
            </div>

            {/* Quick trust metrics */}
            <div className="hero-trust-row">
              <div className="trust-item">
                <ShieldCheck size={18} className="text-green" />
                <span>100% Certified Weighing</span>
              </div>
              <div className="trust-item">
                <Cpu size={18} className="text-green" />
                <span>Background Computer Vision</span>
              </div>
              <div className="trust-item">
                <Wallet size={18} className="text-green" />
                <span>Instant Doorstep UPI</span>
              </div>
            </div>
          </div>

          {/* Waste -> Value Interactive Card */}
          <div className="hero-card-column">
            <div className="waste-value-card">
              <div className="card-top-tag">
                <Sparkles size={16} className="text-green" />
                <span>Live Scrap-to-Value Estimator</span>
              </div>

              <div className="calculator-tabs">
                {categories.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setCalculatorCategory(cat.id)}
                    className={`calc-tab ${calculatorCategory === cat.id ? 'active' : ''}`}
                  >
                    <span className="tab-emoji">{cat.emoji}</span>
                    <span className="tab-name">{cat.name}</span>
                  </button>
                ))}
              </div>

              <div className="calculator-controls">
                <div className="calc-row-header">
                  <span className="calc-label">Estimated Quantity (KG):</span>
                  <span className="calc-value-badge">{calculatorQty} kg</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="1"
                  value={calculatorQty}
                  onChange={(e) => setCalculatorQty(Number(e.target.value))}
                  className="calc-range-slider"
                />
                <div className="slider-limits">
                  <span>5 kg</span>
                  <span>50 kg</span>
                  <span>100 kg</span>
                </div>
              </div>

              <div className="calculator-result-box">
                <div className="calc-result-left">
                  <span className="res-label">Current Market Rate</span>
                  <span className="res-rate">₹{currentRate} / kg</span>
                </div>
                <div className="calc-result-divider"></div>
                <div className="calc-result-right">
                  <span className="res-label">Estimated Payout</span>
                  <span className="res-amount">₹{estimatedHeroEarnings}</span>
                </div>
              </div>

              <button onClick={handleHeroSellNow} className="btn-primary w-full calc-cta-btn">
                <span>Lock Price & Schedule Pickup</span>
                <ArrowRight size={18} />
              </button>

              <p className="card-note">
                <Clock size={13} />
                <span>Doorstep pickup slots available across campus & city</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NEW SECTION: 6 CORE PRODUCT PILLARS */}
      <section className="core-pillars-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-badge">UNIFIED PLATFORM CAPABILITIES</span>
            <h2 className="section-title">The Complete Smart Waste Ecosystem</h2>
            <p className="section-subtitle">
              Combining individual economic incentives with automated institutional artificial intelligence for a zero-waste future.
            </p>
          </div>

          <div className="features-grid-6">
            {coreFeatures.map((feat, idx) => (
              <div key={idx} className="feature-pillar-card">
                <div className="pillar-icon-box">{feat.icon}</div>
                <h3 className="pillar-title">{feat.title}</h3>
                <p className="pillar-desc">{feat.desc}</p>
                <Link to={feat.link} className="pillar-link">
                  <span>{feat.btnText}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE AI DETECTION PREVIEW BANNER */}
      <section className="ai-teaser-banner-section">
        <div className="container">
          <div className="ai-teaser-banner">
            <div className="ai-teaser-content">
              <span className="teaser-pill">
                <Camera size={14} /> LIVE COMPUTER VISION
              </span>
              <h2>Experience Real-Time AI Waste Detection</h2>
              <p>
                Watch our computer vision model track, bound, classify, and audit waste segregation with 94%+ confidence scores and instant contamination alerts.
              </p>
              <div className="teaser-actions">
                <Link to="/ai-detection" className="btn-primary">
                  <span>Launch Live AI Detection</span>
                  <ArrowRight size={16} />
                </Link>
                <Link to="/admin-dashboard" className="btn-secondary">
                  <span>Open Admin Console</span>
                </Link>
              </div>
            </div>

            <div className="ai-teaser-stats-box">
              <div className="teaser-stat-item">
                <span className="ts-num">84.2%</span>
                <span className="ts-lbl">Segregation Accuracy</span>
              </div>
              <div className="teaser-stat-item">
                <span className="ts-num">1,248</span>
                <span className="ts-lbl">Events Logged</span>
              </div>
              <div className="teaser-stat-item">
                <span className="ts-num text-amber">15.8%</span>
                <span className="ts-lbl">Contamination Alerted</span>
              </div>
              <div className="teaser-stat-item">
                <span className="ts-num text-green">726 KG</span>
                <span className="ts-lbl">Recyclables Diverted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WASTE PRICES TICKER BOARD */}
      <section className="live-prices-section">
        <div className="container">
          <div className="section-header-compact">
            <div>
              <span className="sub-badge">DAILY SCRAP RATES</span>
              <h2 className="section-title">Transparent Waste Prices</h2>
            </div>
            <Link to="/prices" className="view-all-link">
              <span>View Full Price Index</span>
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="price-cards-grid">
            <div className="price-item-card">
              <div className="price-item-icon bg-amber-soft">📰</div>
              <div className="price-item-info">
                <h4>Paper</h4>
                <p>Newspapers, cartons & books</p>
              </div>
              <div className="price-item-rate">
                <span className="rate-val">₹18</span>
                <span className="rate-unit">/kg</span>
              </div>
            </div>

            <div className="price-item-card">
              <div className="price-item-icon bg-blue-soft">🧴</div>
              <div className="price-item-info">
                <h4>Plastic</h4>
                <p>PET bottles & containers</p>
              </div>
              <div className="price-item-rate">
                <span className="rate-val">₹25</span>
                <span className="rate-unit">/kg</span>
              </div>
            </div>

            <div className="price-item-card">
              <div className="price-item-icon bg-slate-soft">🔩</div>
              <div className="price-item-info">
                <h4>Metal</h4>
                <p>Iron, copper, steel & cans</p>
              </div>
              <div className="price-item-rate">
                <span className="rate-val">₹40</span>
                <span className="rate-unit">/kg</span>
              </div>
            </div>

            <div className="price-item-card">
              <div className="price-item-icon bg-emerald-soft">💻</div>
              <div className="price-item-info">
                <h4>E-Waste</h4>
                <p>Phones, laptops & accessories</p>
              </div>
              <div className="price-item-rate">
                <span className="rate-val">₹60</span>
                <span className="rate-unit">/kg</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-badge">EFFORTLESS 4-STEP PROCESS</span>
            <h2 className="section-title">How Trash2Cash Works for Citizens</h2>
            <p className="section-subtitle">
              Turning household and campus recyclables into fair cash is now as simple as ordering groceries.
            </p>
          </div>

          <div className="how-cards-grid">
            {HOW_IT_WORKS_STEPS.map((item) => (
              <div key={item.step} className="process-card">
                <div className="step-watermark">{item.step}</div>
                <div className="step-pill">Step {item.step}</div>
                <h3 className="process-title">{item.title}</h3>
                <p className="process-subtitle">{item.subtitle}</p>
                <p className="process-desc">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="how-it-works-action text-center">
            <Link to="/how-it-works" className="btn-secondary">
              <span>Read Full Guidelines & Segregation Tips</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* WASTE CATEGORIES */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-badge">ACCEPTED RECYCLABLES</span>
            <h2 className="section-title">Waste Categories We Purchase</h2>
            <p className="section-subtitle">
              Sell paper, plastic, metal scrap, cardboard, and electronic waste at top market rates with instant digital verification.
            </p>
          </div>

          <div className="categories-grid">
            {categories.slice(0, 4).map((category) => (
              <WasteCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US / VALUE PROPOSITIONS */}
      <section className="why-us-section">
        <div className="container">
          <div className="why-us-grid">
            <div className="why-us-text">
              <span className="sub-badge">THE TRASH2CASH ADVANTAGE</span>
              <h2 className="section-title">
                Zero Effort for Users. Total Intelligence for Institutions.
              </h2>
              <p className="why-desc">
                Whether you are a student recycling old exam papers or a university administrator managing hundreds of kilograms of daily waste, Trash2Cash AI delivers complete transparency, instant rewards, and deep environmental impact.
              </p>

              <div className="features-list">
                <div className="feature-item">
                  <div className="feature-icon">
                    <Scale size={20} />
                  </div>
                  <div>
                    <h4>Certified Digital Weighing Scales</h4>
                    <p>Every pickup agent carries ISO-certified Bluetooth digital scales calibrated to 10-gram accuracy.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <Wallet size={20} />
                  </div>
                  <div>
                    <h4>Instant Bank or UPI Payment</h4>
                    <p>Funds are credited directly to your UPI ID or handed as crisp cash before our agent leaves.</p>
                  </div>
                </div>

                <div className="feature-item">
                  <div className="feature-icon">
                    <Brain size={20} />
                  </div>
                  <div>
                    <h4>Automated AI Spatial Telemetry</h4>
                    <p>Continuously identifies contamination hotspots to optimize custodial shifts and reduce campus landfill fees.</p>
                  </div>
                </div>
              </div>

              <div className="why-actions">
                <Link to="/schedule-pickup" className="btn-primary">
                  <span>Schedule Your First Pickup</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            <div className="why-us-stats-card">
              <div className="stats-box-header">
                <h3>Our Collective Impact</h3>
                <span className="live-tag">Updated Live</span>
              </div>
              <div className="stats-inner-grid">
                <StatCard
                  icon="Recycle"
                  value="52,400+ kg"
                  label="Total Waste Diverted"
                  subtext="From municipal landfills"
                />
                <StatCard
                  icon="Leaf"
                  value="26,800+ kg"
                  label="CO₂ Carbon Offset"
                  subtext="Verified by climate models"
                />
                <StatCard
                  icon="IndianRupee"
                  value="₹14.8 Lakh+"
                  label="Paid to Recyclers"
                  subtext="Direct wealth generated"
                />
                <StatCard
                  icon="Truck"
                  value="9,850+"
                  label="Zero-Emission Pickups"
                  subtext="On-time doorstep service"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA BANNER */}
      <section className="cta-banner-section">
        <div className="container">
          <div className="cta-banner-card">
            <div className="cta-banner-content">
              <span className="cta-mini-tag">SMART SUSTAINABILITY</span>
              <h2 className="cta-heading">Ready to Turn Waste Into Value?</h2>
              <p className="cta-subheading">
                Book a 100% free doorstep pickup or explore how our AI vision models make campus waste segregation effortless.
              </p>
              <div className="cta-banner-buttons">
                <Link to="/sell-waste" className="btn-primary btn-white-invert">
                  <span>Sell Waste Now</span>
                  <ArrowRight size={18} />
                </Link>
                <Link to="/ai-detection" className="btn-ghost-white">
                  <span>Explore Live AI Vision</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
