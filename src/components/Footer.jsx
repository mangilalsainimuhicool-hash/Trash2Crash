import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Recycle, Heart, Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Footer = () => {
  const [pledgeEmail, setPledgeEmail] = useState('');
  const [pledgeJoined, setPledgeJoined] = useState(false);
  const { showToast } = useApp();

  const handlePledge = (e) => {
    e.preventDefault();
    if (!pledgeEmail || !pledgeEmail.includes('@')) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }
    setPledgeJoined(true);
    showToast('Thank you for joining the Green Recycler Pledge! 🌱', 'success');
  };

  return (
    <footer className="footer-root">
      {/* Top Banner Ticker */}
      <div className="footer-ticker-bar">
        <div className="container ticker-flex">
          <span className="ticker-badge">Live Scrap Rates Today</span>
          <div className="ticker-items">
            <span>📰 Paper: ₹18/kg</span>
            <span className="ticker-sep">•</span>
            <span>🧴 Plastic: ₹25/kg</span>
            <span className="ticker-sep">•</span>
            <span>🔩 Metal: ₹40/kg</span>
            <span className="ticker-sep">•</span>
            <span>💻 E-Waste: ₹60/kg</span>
          </div>
          <Link to="/prices" className="ticker-link">
            Check All Rates →
          </Link>
        </div>
      </div>

      <div className="container footer-content-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <span className="brand-icon-wrapper">
              <Recycle className="brand-icon" size={22} />
            </span>
            <span className="brand-title">Trash-to-Cash</span>
          </Link>
          <p className="footer-tagline">
            "Turn waste into value. Build a cleaner future."
          </p>
          <p className="footer-desc">
            India's smart doorstep scrap collection platform making responsible recycling effortless, transparent, and instantly rewarding for households and businesses.
          </p>
          <div className="footer-contact-items">
            <div className="contact-item">
              <MapPin size={16} className="text-green" />
              <span>Smart Eco Hub,Jaipur, mansarovar 302020</span>
            </div>
            <div className="contact-item">
              <Phone size={16} className="text-green" />
              <span>+916378947102 TRASH-CASH (Toll Free)</span>
            </div>
            <div className="contact-item">
              <Mail size={16} className="text-green" />
              <span>mlsaini063@</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Platform</h4>
          <ul className="footer-links-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/categories">Waste Categories</Link></li>
            <li><Link to="/prices">Scrap Prices</Link></li>
            <li><Link to="/sell-waste">Sell Your Waste</Link></li>
            <li><Link to="/schedule-pickup">Schedule Pickup</Link></li>
            <li><Link to="/dashboard">User Dashboard</Link></li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-col">
          <h4 className="footer-heading">Categories</h4>
          <ul className="footer-links-list">
            <li><Link to="/categories#paper">Paper Waste (₹18/kg)</Link></li>
            <li><Link to="/categories#plastic">Plastic Waste (₹25/kg)</Link></li>
            <li><Link to="/categories#metal">Metal Scrap (₹40/kg)</Link></li>
            <li><Link to="/categories#ewaste">E-Waste Scrap (₹60/kg)</Link></li>
            <li><Link to="/about">Our Eco Impact</Link></li>
          </ul>
        </div>

        {/* Newsletter / Eco Pledge */}
        <div className="footer-col newsletter-col">
          <h4 className="footer-heading">Join The Eco Pledge</h4>
          <p className="footer-desc">
            Subscribe for updated weekly scrap market rates, eco tips, and earn bonus ₹50 on your next scheduled pickup.
          </p>
          {pledgeJoined ? (
            <div className="pledge-success-card">
              <Check size={20} className="text-green" />
              <span>You're subscribed! Use code <strong>CLEAN50</strong> for bonus payout.</span>
            </div>
          ) : (
            <form onSubmit={handlePledge} className="footer-form">
              <input
                type="email"
                placeholder="Enter your email"
                value={pledgeEmail}
                onChange={(e) => setPledgeEmail(e.target.value)}
                className="footer-input"
                required
              />
              <button type="submit" className="footer-submit-btn">
                <span>Join</span>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
          <div className="trust-seal">
            <span className="trust-dot"></span>
            <span>100% Verified Digital Weighing Scale Guarantee</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="container bottom-bar-flex">
          <p className="copyright-text">
            © {new Date().getFullYear()} Trash-to-Cash. Built with <Heart size={14} className="heart-icon" /> for HackSmith
          </p>
          <div className="bottom-links">
            <Link to="/about">About Us</Link>
            <span className="dot-sep">•</span>
            <Link to="/about#contact">Contact</Link>
            <span className="dot-sep">•</span>
            <a href="#privacy" onClick={(e) => { e.preventDefault(); alert("Trash-to-Cash respects user privacy: your location and pickup records are securely encrypted."); }}>
              Privacy Policy
            </a>
            <span className="dot-sep">•</span>
            <a href="#terms" onClick={(e) => { e.preventDefault(); alert("Trash-to-Cash Terms: Scrap items must be segregated and free of hazardous/toxic contamination."); }}>
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
