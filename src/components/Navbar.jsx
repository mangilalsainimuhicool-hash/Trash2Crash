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
  History,
  BarChart3,
  DollarSign,
  Wallet
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const { user, logout, scans, walletBalance } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/');
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
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
            <span className="brand-badge">Waste Detection</span>
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
            to="/ai-detection"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            <span className="nav-ai-dot"></span>
            AI Detection
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            History
            {scans.length > 0 && <span className="nav-count-badge">{scans.length}</span>}
          </NavLink>

          <NavLink
            to="/analytics"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            Analytics
          </NavLink>

          <NavLink
            to="/sell-waste"
            className={({ isActive }) => (isActive ? 'nav-link nav-link-active' : 'nav-link')}
          >
            Sell Waste
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
          <Link to="/dashboard" className="navbar-wallet-badge" title="Trash2Cash Reward Wallet Balance">
            <Wallet size={15} className="text-green" />
            <span className="wallet-val">₹{walletBalance}</span>
          </Link>

          <Link to="/ai-detection" className="btn-primary btn-sm nav-scan-btn">
            <Camera size={15} />
            <span>Scan Waste</span>
          </Link>

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
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-xs text-muted">{user.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>

                  <Link to="/dashboard" className="dropdown-item" onClick={closeMenus}>
                    <LayoutDashboard size={16} />
                    <span>My Dashboard</span>
                  </Link>

                  <Link to="/history" className="dropdown-item" onClick={closeMenus}>
                    <History size={16} />
                    <span>My Scans ({scans.length})</span>
                  </Link>

                  <Link to="/schedule-pickup" className="dropdown-item" onClick={closeMenus}>
                    <CalendarCheck size={16} />
                    <span>Schedule Pickup</span>
                  </Link>

                  <div className="dropdown-divider"></div>
                  <button onClick={handleLogout} className="dropdown-item text-red w-full text-left">
                    <LogOut size={16} />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="auth-buttons-group">
              <Link to="/login" className="btn-secondary btn-sm">
                Log In
              </Link>
              <Link to="/signup" className="btn-primary btn-sm">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
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
              <div className="mobile-group-label">CORE FEATURES</div>
              <NavLink to="/" onClick={closeMenus} className="mobile-nav-item">
                🏠 Home
              </NavLink>
              <NavLink to="/ai-detection" onClick={closeMenus} className="mobile-nav-item">
                📸 AI Waste Detection
              </NavLink>
              <NavLink to="/history" onClick={closeMenus} className="mobile-nav-item">
                📜 Scan History ({scans.length})
              </NavLink>
              <NavLink to="/analytics" onClick={closeMenus} className="mobile-nav-item">
                📊 Waste Analytics
              </NavLink>

              <div className="mobile-group-label mt-2">RECYCLING SERVICES</div>
              <NavLink to="/sell-waste" onClick={closeMenus} className="mobile-nav-item">
                ♻️ Sell Recyclable Waste
              </NavLink>
              <NavLink to="/prices" onClick={closeMenus} className="mobile-nav-item">
                🏷️ Waste Rates & Prices
              </NavLink>
              <NavLink to="/schedule-pickup" onClick={closeMenus} className="mobile-nav-item">
                📅 Schedule Scrap Pickup
              </NavLink>
              <NavLink to="/dashboard" onClick={closeMenus} className="mobile-nav-item">
                👤 User Rewards Dashboard
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
