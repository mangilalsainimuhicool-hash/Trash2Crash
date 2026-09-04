import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  Scale,
  Calendar,
  Wallet,
  Sparkles,
  ShieldCheck,
  AlertTriangle
} from 'lucide-react';
import { HOW_IT_WORKS_STEPS } from '../data/mockData';

const FAQ_ITEMS = [
  {
    q: 'Is doorstep pickup really 100% free?',
    a: 'Yes! There are absolutely zero pickup charges or convenience fees. You receive the full calculated value of your scrap weight via cash or UPI without any hidden deductions.'
  },
  {
    q: 'How is the waste weighed at my home?',
    a: 'Our certified pickup agents carry high-precision Bluetooth-enabled digital weighing scales. The scrap is weighed right before your eyes, and the exact weight reflects immediately on your digital receipt.'
  },
  {
    q: 'What is the minimum quantity required for a pickup?',
    a: 'Our standard minimum quantity is just 10 kg of combined recyclable dry waste (any combination of paper, plastic, metal, or e-waste). If you have lighter high-value e-waste like laptops or smartphones, no minimum weight applies.'
  },
  {
    q: 'How quickly do I receive the money?',
    a: 'Instantly! As soon as your items are weighed and confirmed on the agent app, you can choose to receive payment via instant UPI (Google Pay, PhonePe, Paytm), IMPS Bank Transfer, or crisp doorstep cash.'
  },
  {
    q: 'What should I do to prepare my waste before pickup?',
    a: 'Keep items reasonably dry and segregated by category (e.g. newspapers together, bottles emptied of liquid, electronic cords rolled up). This speeds up weighing so the pickup finishes in under 5 minutes!'
  }
];

const HowItWorks = () => {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <div className="page-wrapper how-it-works-page">
      {/* HEADER BANNER */}
      <section className="page-header-section">
        <div className="container text-center">
          <span className="sub-badge">TRANSPARENT & SEAMLESS</span>
          <h1 className="page-title">How Trash-to-Cash Works</h1>
          <p className="page-description">
            A frictionless 4-step doorstep scrap collection service engineered to make recycling lucrative, easy, and completely trustworthy.
          </p>
        </div>
      </section>

      {/* 4 DETAILED STEPS */}
      <section className="steps-detail-section">
        <div className="container">
          <div className="steps-flow">
            {/* Step 1 */}
            <div className="step-row">
              <div className="step-num-badge">01</div>
              <div className="step-card-content">
                <div className="step-header">
                  <span className="step-phase">STEP ONE</span>
                  <h2>Select Your Waste</h2>
                </div>
                <p className="step-lead">
                  Identify and gather your recyclable dry waste into our 4 core categories: Paper, Plastic, Metal, and E-Waste.
                </p>
                <div className="step-tips-grid">
                  <div className="tip-box do-tip">
                    <h4>
                      <CheckCircle2 size={16} className="text-green" />
                      <span>Best Practices:</span>
                    </h4>
                    <ul>
                      <li>Bundle newspapers and tie cardboard boxes with twine</li>
                      <li>Rinse beverage plastic bottles and flatten them to save space</li>
                      <li>Gather old electrical cables, obsolete remotes and smartphones</li>
                    </ul>
                  </div>
                  <div className="tip-box dont-tip">
                    <h4>
                      <AlertTriangle size={16} className="text-amber" />
                      <span>Avoid:</span>
                    </h4>
                    <ul>
                      <li>Wet kitchen garbage or organic compostable waste</li>
                      <li>Medical syringes or hazardous battery chemicals</li>
                      <li>Oil-soaked pizza boxes and dirty packaging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="step-row">
              <div className="step-num-badge">02</div>
              <div className="step-card-content">
                <div className="step-header">
                  <span className="step-phase">STEP TWO</span>
                  <h2>Enter Estimated Quantity</h2>
                </div>
                <p className="step-lead">
                  Use our live dynamic calculator to enter your approximate weight in kilograms and get an instant payout quotation.
                </p>
                <div className="step-highlights">
                  <div className="highlight-pill">
                    <Scale size={18} className="text-green" />
                    <span>Live daily scrap market benchmark rates</span>
                  </div>
                  <div className="highlight-pill">
                    <Sparkles size={18} className="text-green" />
                    <span>Bulk quantity bonus for weights over 50 kg</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="step-row">
              <div className="step-num-badge">03</div>
              <div className="step-card-content">
                <div className="step-header">
                  <span className="step-phase">STEP THREE</span>
                  <h2>Schedule Doorstep Pickup</h2>
                </div>
                <p className="step-lead">
                  Pick a convenient day and a 3-hour time slot that fits your schedule. Our background-verified green partner arrives right at your gate.
                </p>
                <div className="time-slots-preview">
                  <div className="slot-badge">⏰ 9:00 AM - 12:00 PM</div>
                  <div className="slot-badge">⏰ 12:00 PM - 3:00 PM</div>
                  <div className="slot-badge">⏰ 3:00 PM - 6:00 PM</div>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="step-row">
              <div className="step-num-badge">04</div>
              <div className="step-card-content">
                <div className="step-header">
                  <span className="step-phase">STEP FOUR</span>
                  <h2>Get Paid Instantly</h2>
                </div>
                <p className="step-lead">
                  Our agent weighs everything on ISO-certified digital scales and disburses funds to your UPI or hand before stepping out.
                </p>
                <div className="step-payment-options">
                  <span className="pay-method">⚡ Instant UPI (GPay/PhonePe)</span>
                  <span className="pay-method">💵 Cash at Doorstep</span>
                  <span className="pay-method">🏦 Direct Bank IMPS</span>
                </div>
              </div>
            </div>
          </div>

          <div className="how-page-cta text-center">
            <Link to="/sell-waste" className="btn-primary btn-lg">
              <span>Ready to Start? Sell Your Waste Now</span>
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ ACCORDION */}
      <section className="faq-section">
        <div className="container max-w-3xl">
          <div className="section-header text-center">
            <span className="sub-badge">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">Got Questions? We Have Answers</h2>
            <p className="section-subtitle">
              Everything you need to know about scrap rates, doorstep pickup verification, and payments.
            </p>
          </div>

          <div className="faq-accordion">
            {FAQ_ITEMS.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${openFaq === index ? 'faq-item-open' : ''}`}
              >
                <button
                  className="faq-question-btn"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={openFaq === index}
                >
                  <span className="faq-q-text">{faq.q}</span>
                  {openFaq === index ? (
                    <ChevronUp size={20} className="faq-icon" />
                  ) : (
                    <ChevronDown size={20} className="faq-icon" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="faq-answer-content">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;
