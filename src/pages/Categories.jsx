import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Check,
  X,
  Leaf,
  ArrowRight,
  Sparkles,
  Info,
  Scale
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Categories = () => {
  const { categories } = useApp();
  const [selectedTab, setSelectedTab] = useState('all');
  const navigate = useNavigate();

  const filteredCategories =
    selectedTab === 'all'
      ? categories
      : categories.filter((c) => c.id === selectedTab);

  const handleSellNow = (categoryId) => {
    navigate(`/sell-waste?category=${categoryId}`);
  };

  return (
    <div className="page-wrapper categories-page">
      {/* HEADER BANNER */}
      <section className="page-header-section">
        <div className="container text-center">
          <span className="sub-badge">RECYCLABLE MATERIALS</span>
          <h1 className="page-title">Scrap Waste Categories</h1>
          <p className="page-description">
            Discover what types of waste we collect, current per-kilogram rates, and clear guidelines on accepted vs rejected materials.
          </p>

          {/* Category Filter Pills */}
          <div className="category-filter-nav">
            <button
              className={`filter-btn ${selectedTab === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedTab('all')}
            >
              All Categories (4)
            </button>
            {categories.map((c) => (
              <button
                key={c.id}
                className={`filter-btn ${selectedTab === c.id ? 'active' : ''}`}
                onClick={() => setSelectedTab(c.id)}
              >
                {c.emoji} {c.name} (₹{c.rate}/kg)
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* CATEGORY DETAILED CARDS */}
      <section className="categories-list-section">
        <div className="container">
          <div className="category-detail-stack">
            {filteredCategories.map((cat) => (
              <div key={cat.id} id={cat.id} className="category-detail-card">
                <div className="cat-card-grid">
                  {/* Left info column */}
                  <div className="cat-primary-info">
                    <div className="cat-emoji-banner">{cat.emoji}</div>
                    <div className="cat-title-block">
                      <div className="cat-title-row">
                        <h2 className="cat-name">{cat.name} Waste</h2>
                        {cat.popular && (
                          <span className="cat-badge-popular">
                            <Sparkles size={12} /> High Demand
                          </span>
                        )}
                      </div>
                      <p className="cat-tagline">{cat.tagline}</p>
                    </div>

                    <p className="cat-long-desc">{cat.description}</p>

                    <div className="cat-price-banner">
                      <div className="price-display">
                        <span className="curr-sym">₹</span>
                        <span className="curr-amount">{cat.rate}</span>
                        <span className="curr-per">/ {cat.unit}</span>
                      </div>
                      <button
                        onClick={() => handleSellNow(cat.id)}
                        className="btn-primary cat-sell-action"
                      >
                        <span>Sell {cat.name} Now</span>
                        <ArrowRight size={16} />
                      </button>
                    </div>

                    <div className="cat-impact-box">
                      <Leaf size={18} className="text-green" />
                      <p>{cat.environmentalImpact}</p>
                    </div>
                  </div>

                  {/* Right acceptance rules column */}
                  <div className="cat-rules-column">
                    <div className="rules-section accepted-rules">
                      <h3 className="rules-heading text-green-dark">
                        <Check size={18} className="rules-check" />
                        <span>Accepted Materials</span>
                      </h3>
                      <ul className="rules-list">
                        {cat.acceptedItems.map((item, i) => (
                          <li key={i} className="rule-item">
                            <span className="rule-bullet green-bullet">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="rules-section rejected-rules">
                      <h3 className="rules-heading text-red-dark">
                        <X size={18} className="rules-cross" />
                        <span>Not Accepted / Rejected</span>
                      </h3>
                      <ul className="rules-list">
                        {cat.notAccepted.map((item, i) => (
                          <li key={i} className="rule-item">
                            <span className="rule-bullet red-bullet">✕</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Box */}
          <div className="segregation-notice-banner">
            <Info size={22} className="text-green" />
            <div>
              <h4>Unsure about your material category?</h4>
              <p>
                Don't worry! Our certified pickup agent carries automated testing tools and will grade materials accurately right at your doorstep before final weighing.
              </p>
            </div>
            <button onClick={() => navigate('/schedule-pickup')} className="btn-secondary">
              Book Evaluation
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Categories;
