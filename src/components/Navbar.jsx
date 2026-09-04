import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  Recycle,
  Menu,
  X,
  User,
  ArrowRight,
  LogOut,
  LayoutDashboard,
  CalendarCheck,
  Camera,
  BarChart3,
  Brain,
  ShieldCheck,
  ChevronDown,
  Sparkles,
  MapPin,
  Activity
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [aiDropdownOpen, setAiDropdownOpen] = useState(false);
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    setAiDropdownOpen(false);
  };

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <Link to="/" className="brand-logo" onClick={closeMenus}>
          <span className="brand-icon-wrapper">
            <Recycle className="brand-icon" size={24} />
          </span>
          <div className="brand-text-group">
            <span className="brand-title">Trash2Cash <span className="text-highlight">AI</span></span>
            <span className="brand-badge">Campus AI</span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            Home
          </NavLink>

          <NavLink
            to="/sell-waste"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            Sell Waste
          </NavLink>

          <NavLink
            to="/ai-detection"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            <span className="nav-ai-dot"></span>
            AI Detection
          </NavLink>

          {/* AI Intelligence Dropdown */}
          <div
            className="nav-dropdown-wrapper"
            onMouseEnter={() => setAiDropdownOpen(true)}
            onMouseLeave={() => setAiDropdownOpen(false)}
          >
            <button className="nav-dropdown-trigger">
              <span>Campus Intel</span>
              <ChevronDown size={14} />
            </button>

            {aiDropdownOpen && (
              <div className="nav-dropdown-menu">
                <Link to="/analytics" className="dropdown-item" onClick={closeMenus}>
                  <BarChart3 size={16} className="text-green" />
                  <div>
                    <strong>Waste Analytics</strong>
                    <span className="item-sub">Stream & contamination trends</span>
                  </div>
                </Link>

                <Link to="/location-analytics" className="dropdown-item" onClick={closeMenus}>
                  <MapPin size={16} className="text-green" />
                  <div>
                    <strong>Location Analytics</strong>
                    <span className="item-sub">Zone & problem hotspot matrix</span>
                  </div>
                </Link>

                <Link to="/campus-cleanliness" className="dropdown-item" onClick={closeMenus}>
                  <Activity size={16} className="text-green" />
                  <div>
                    <strong>Campus Cleanliness</strong>
                    <span className="item-sub">Sanitation index (82/100)</span>
                  </div>
                </Link>

                <Link to="/ai-insights" className="dropdown-item" onClick={closeMenus}>
                  <Brain size={16} className="text-green" />
                  <div>
                    <strong>AI Recommendations</strong>
                    <span className="item-sub">Heuristic operational actions</span>
                  </div>
                </Link>
              </div>
            )}
          </div>

          <NavLink
            to="/admin-dashboard"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            Admin
          </NavLink>

          <NavLink
            to="/prices"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            Prices
          </NavLink>
        </nav>

        {/* Right CTA / Auth Controls */}
        <div className="navbar-actions">
          {user ? (
            <div className="user-menu-wrapper">
              <button
                className="user-profile-btn"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                aria-label="User menu"
              >
                <div className="user-avatar">
                  <User size={18} />
                </div>
                <span className="user-name-label">{user.name.split(' ')[0]}</span>
              </button>

              {userDropdownOpen && (
                <div className="user-dropdown-menu">
                  <div className="dropdown-header">
                    <p className="dropdown-user-name">{user.name}</p>
                    <p className="dropdown-user-email">{user.email}</p>
                  </div>
                  <hr className="dropdown-divider" />
                  <Link to="/dashboard" className="dropdown-item" onClick={closeMenus}>
                    <LayoutDashboard size={16} />
                    <span>Citizen Dashboard</span>
                  </Link>
                  <Link to="/schedule-pickup" className="dropdown-item" onClick={closeMenus}>
                    <CalendarCheck size={16} />
                    <span>Schedule Pickup</span>
                  </Link>
                  <Link to="/admin-dashboard" className="dropdown-item" onClick={closeMenus}>
                    <ShieldCheck size={16} />
                    <span>Admin Console</span>
                  </Link>
                  <hr className="dropdown-divider" />
                  <button onClick={handleLogout} className="dropdown-item logout-btn">
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="login-link">
                Login
              </Link>
              <Link to="/signup" className="signup-pill-btn">
                Sign Up
              </Link>
            </div>
          )}

          <Link to="/sell-waste" className="btn-primary sell-btn-nav">
            <span>Sell Waste</span>
            <ArrowRight size={16} />
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-drawer">
          <div className="mobile-drawer-inner">
            <nav className="mobile-nav-list">
              <div className="mobile-group-label">CITIZEN SERVICES</div>
              <NavLink to="/" onClick={closeMenus} className="mobile-nav-item">
                Home
              </NavLink>
              <NavLink to="/sell-waste" onClick={closeMenus} className="mobile-nav-item">
                Sell Waste
              </NavLink>
              <NavLink to="/prices" onClick={closeMenus} className="mobile-nav-item">
                Scrap Prices
              </NavLink>
              <NavLink to="/categories" onClick={closeMenus} className="mobile-nav-item">
                Categories
              </NavLink>
              <NavLink to="/schedule-pickup" onClick={closeMenus} className="mobile-nav-item">
                Schedule Pickup
              </NavLink>
              <NavLink to="/dashboard" onClick={closeMenus} className="mobile-nav-item">
                User Rewards Dashboard
              </NavLink>

              <div className="mobile-group-label mt-2">CAMPUS AI INTELLIGENCE</div>
              <NavLink to="/ai-detection" onClick={closeMenus} className="mobile-nav-item">
                🤖 Live AI Detection
              </NavLink>
              <NavLink to="/analytics" onClick={closeMenus} className="mobile-nav-item">
                📊 Waste Stream Analytics
              </NavLink>
              <NavLink to="/location-analytics" onClick={closeMenus} className="mobile-nav-item">
                📍 Location Spatial Telemetry
              </NavLink>
              <NavLink to="/campus-cleanliness" onClick={closeMenus} className="mobile-nav-item">
                ✨ Campus Cleanliness Index
              </NavLink>
              <NavLink to="/ai-insights" onClick={closeMenus} className="mobile-nav-item">
                🧠 AI Recommendations
              </NavLink>
              <NavLink to="/admin-dashboard" onClick={closeMenus} className="mobile-nav-item">
                🛡️ Admin Intelligence Console
              </NavLink>
            </nav>

            <div className="mobile-auth-section">
              {user ? (
                <div className="mobile-user-box">
                  <div className="mobile-user-details">
                    <User size={20} className="text-green" />
                    <div>
                      <p className="font-semibold">{user.name}</p>
                      <p className="text-xs text-muted">{user.email}</p>
                    </div>
                  </div>
                  <button onClick={handleLogout} className="mobile-logout-btn">
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              ) : (
                <div className="mobile-auth-buttons">
                  <Link to="/login" onClick={closeMenus} className="btn-secondary w-full">
                    Login
                  </Link>
                  <Link to="/signup" onClick={closeMenus} className="btn-primary w-full">
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
