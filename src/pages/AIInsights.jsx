import React, { useState } from 'react';
import {
  Sparkles,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Brain,
  Layers,
  ThumbsUp,
  FileCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const AIInsights = () => {
  const { aiInsights, showToast } = useApp();
  const [actionsTaken, setActionsTaken] = useState({});

  const handleApplyRecommendation = (insightId, actionName) => {
    setActionsTaken((prev) => ({
      ...prev,
      [insightId]: true
    }));
    showToast(`Action dispatched: "${actionName}" • Campus operations notified 🚀`, 'success');
  };

  return (
    <div className="page-wrapper ai-insights-page">
      {/* HEADER BANNER */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="prototype-badge-pill">
            <span className="prototype-dot"></span>
            <span>OPERATIONAL INTELLIGENCE • AI HEURISTIC ENGINE</span>
          </div>
          <h1 className="page-title">AI Waste Intelligence & Actionable Insights</h1>
          <p className="page-description">
            Automated machine learning heuristics that analyze spatial contamination patterns and provide administrators with high-impact, low-cost operational interventions.
          </p>
        </div>
      </section>

      {/* CORE HIGHLIGHT CARDS */}
      <section className="ai-insights-list-section">
        <div className="container">
          <div className="insights-stack">
            {aiInsights.map((insight) => {
              const isApplied = actionsTaken[insight.id];

              return (
                <div
                  key={insight.id}
                  className={`insight-card ${
                    insight.severity === 'critical'
                      ? 'insight-critical'
                      : insight.severity === 'moderate'
                      ? 'insight-moderate'
                      : 'insight-info'
                  }`}
                >
                  <div className="insight-card-top">
                    <div className="insight-title-block">
                      <div className="insight-badge-row">
                        <span className={`severity-tag severity-${insight.severity}`}>
                          {insight.severity.toUpperCase()} PRIORITY
                        </span>
                        <span className="insight-id-tag">{insight.id}</span>
                      </div>
                      <h3 className="insight-heading">{insight.title}</h3>
                    </div>

                    <div className="insight-brain-icon">
                      <Brain size={26} />
                    </div>
                  </div>

                  <p className="insight-body-text">{insight.description}</p>

                  <div className="insight-evidence-bar">
                    <strong>Sensor Evidence:</strong>
                    <span>{insight.evidence}</span>
                  </div>

                  <div className="insight-action-card">
                    <div className="action-card-header">
                      <Lightbulb size={18} className="text-amber" />
                      <h4>Recommended Institutional Action:</h4>
                    </div>
                    <p className="action-body-text">{insight.recommendedAction}</p>
                    <div className="action-impact-tag">
                      <span>Expected Outcome: <strong>{insight.impactEstimate}</strong></span>
                    </div>

                    <div className="action-footer-row">
                      {isApplied ? (
                        <div className="applied-success-badge">
                          <CheckCircle2 size={16} />
                          <span>Action Dispatched & Logged to Facilities Task Grid</span>
                        </div>
                      ) : (
                        <button
                          onClick={() =>
                            handleApplyRecommendation(insight.id, insight.recommendedAction)
                          }
                          className="btn-primary btn-sm action-execute-btn"
                        >
                          <span>Simulate Action Implementation</span>
                          <ArrowRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Heuristic Bulletins */}
          <div className="heuristic-bulletins-card mt-5">
            <div className="bulletins-header">
              <Sparkles size={20} className="text-green" />
              <h3>Weekly AI Pattern Bulletins</h3>
            </div>
            <div className="bulletins-grid">
              <div className="bulletin-item">
                <span className="bulletin-icon">🥤</span>
                <div>
                  <h4>Plastic packaging increased 18% near Academic Lawns</h4>
                  <p>Correlates with warmer weather and cold beverage consumption. Bins require afternoon clearing.</p>
                </div>
              </div>
              <div className="bulletin-item">
                <span className="bulletin-icon">📦</span>
                <div>
                  <h4>Hostel cardboard salvage value reached ₹2,800/month</h4>
                  <p>Sufficient volume to justify dedicated recycling partner collection every Monday morning.</p>
                </div>
              </div>
              <div className="bulletin-item">
                <span className="bulletin-icon">🚰</span>
                <div>
                  <h4>Dry waste segregation needs improvement near Beverage Counter</h4>
                  <p>Sugary juice cups discarded before complete drainage cause downstream mould in paper bins.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AIInsights;
