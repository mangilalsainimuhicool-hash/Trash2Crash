import React from 'react';
import { Link } from 'react-router-dom';
import {
  Recycle,
  Leaf,
  ShieldCheck,
  Users,
  Award,
  ArrowRight,
  Truck
} from 'lucide-react';

const About = () => {
  // Current platform impact — operations have not started yet
  const impactMetrics = [
    {
      icon: 'Recycle',
      value: '0 kg',
      label: 'Waste Recycled',
      subtext: 'Operations yet to begin'
    },
    {
      icon: 'Leaf',
      value: '0',
      label: 'Trees Impacted',
      subtext: 'Impact will grow with every collection'
    },
    {
      icon: 'Users',
      value: '0',
      label: 'Citizens Onboarded',
      subtext: 'Platform is ready for launch'
    },
    {
      icon: 'Truck',
      value: '0',
      label: 'Pickups Completed',
      subtext: 'Doorstep collection coming soon'
    }
  ];

  return (
    <div className="page-wrapper about-page">

      {/* HERO SECTION */}
      <section className="about-hero-section">
        <div className="container text-center">
          <span className="sub-badge">
            CIRCULAR SUSTAINABILITY FOR ALL
          </span>

          <h1 className="page-title">
            Making Recycling Rewarding.
          </h1>

          <p className="page-description max-w-3xl">
            Trash-to-Cash is a smart recycling platform transforming how
            urban India views municipal waste—turning discarded paper,
            plastics, metals, and electronics into tangible household wealth
            and quantifiable planetary recovery.
          </p>
        </div>
      </section>

      {/* IMPACT METRICS SECTION */}
      <section className="about-metrics-section">
        <div className="container">
          <div className="metrics-banner-grid">

            {impactMetrics.map((metric, idx) => (
              <div key={idx} className="metric-stat-box">

                <div className="metric-icon-circle">
                  {metric.icon === 'Recycle' && (
                    <Recycle size={24} className="text-green" />
                  )}

                  {metric.icon === 'Leaf' && (
                    <Leaf size={24} className="text-green" />
                  )}

                  {metric.icon === 'Users' && (
                    <Users size={24} className="text-green" />
                  )}

                  {metric.icon === 'Truck' && (
                    <Truck size={24} className="text-green" />
                  )}
                </div>

                <h3 className="metric-number">
                  {metric.value}
                </h3>

                <p className="metric-title">
                  {metric.label}
                </p>

                <span className="metric-sub">
                  {metric.subtext}
                </span>

              </div>
            ))}

          </div>
        </div>
      </section>

      {/* CONCEPT & MISSION SECTION */}
      <section className="about-story-section">
        <div className="container">

          <div className="story-split-grid">

            <div className="story-text-col">

              <span className="sub-badge">
                THE TRASH-TO-CASH VISION
              </span>

              <h2 className="section-title">
                Bridging the Gap Between Households & Circular Recyclers
              </h2>

              <p className="story-p">
                Over 75% of domestic recyclable waste in India ends up
                choked in landfills, lakes, and open incinerators simply
                because selling scrap is perceived as inconvenient,
                unreliable, and opaque.
              </p>

              <p className="story-p">
                <strong>Trash-to-Cash</strong> re-engineers this paradigm.
                By providing an on-demand doorstep booking system,
                transparent daily scrap indices, and certified digital
                scale weighing, we make recycling as painless and
                rewarding as clicking a button.
              </p>

              <div className="story-pillars">

                <div className="pillar-item">
                  <ShieldCheck
                    size={20}
                    className="text-green flex-shrink-0"
                  />

                  <div>
                    <h4>100% Rate Transparency</h4>
                    <p>
                      Live benchmarks updated daily in sync with wholesale
                      commodity scrap markets.
                    </p>
                  </div>
                </div>

                <div className="pillar-item">
                  <Leaf
                    size={20}
                    className="text-green flex-shrink-0"
                  />

                  <div>
                    <h4>Zero-Landfill Commitment</h4>
                    <p>
                      Every kilogram collected is channeled directly to
                      certified recycling mills and smelters.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* VISION CARD */}
            <div className="story-card-col">

              <div className="hackathon-vision-card">

                <div className="hackathon-badge">
                  <Award size={16} />
                  <span>Smart Recycling Platform</span>
                </div>

                <h3>
                  Tech-Enabled Urban Circular Economy
                </h3>

                <p>
                  Trash-to-Cash is built with a vision to integrate
                  informal scrap waste pickers (Kabadiwalas) into a formal,
                  digitized logistics grid with dignity, fair wages, and
                  electric mobility.
                </p>

                <div className="tech-stack-pills">
                  <span className="tech-pill">
                    React Frontend
                  </span>

                  <span className="tech-pill">
                    Transparent Pricing
                  </span>

                  <span className="tech-pill">
                    Clean Green UI
                  </span>

                  <span className="tech-pill">
                    Responsive Design
                  </span>
                </div>

                <div className="quote-box">
                  <p>
                    "Waste isn't waste until we waste it. It is raw material
                    in the wrong place."
                  </p>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="about-cta-section">
        <div className="container">

          <div className="about-cta-box text-center">

            <h2>
              Be Among the First to Join the Green Revolution
            </h2>

            <p>
              Our platform is ready to launch. Start your recycling journey
              and help us build a cleaner, more circular future.
            </p>

            <div className="about-cta-actions">

              <Link
                to="/sell-waste"
                className="btn-primary"
              >
                <span>Sell Your First Scrap Item</span>
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/categories"
                className="btn-secondary"
              >
                <span>Explore Waste Categories</span>
              </Link>

            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default About;