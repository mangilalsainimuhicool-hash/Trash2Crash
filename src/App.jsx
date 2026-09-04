import React, { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';

// Existing Pages
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
import Categories from './pages/Categories';
import Prices from './pages/Prices';
import SellWaste from './pages/SellWaste';
import SchedulePickup from './pages/SchedulePickup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';

// Core Pages
import LiveAIDetection from './pages/LiveAIDetection';
import ScanHistory from './pages/ScanHistory';
import WasteAnalytics from './pages/WasteAnalytics';
import LocationAnalytics from './pages/LocationAnalytics';
import CampusCleanliness from './pages/CampusCleanliness';
import AIInsights from './pages/AIInsights';
import AdminDashboard from './pages/AdminDashboard';

// ScrollToTop component to reset scroll position on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [pathname]);

  return null;
}

function App() {
  return (
    <div className="app-container">
      <ScrollToTop />
      <Toast />
      <Navbar />

      <main className="main-content">
        <Routes>
          {/* Citizen / Recycler Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/prices" element={<Prices />} />
          <Route path="/sell-waste" element={<SellWaste />} />
          <Route path="/schedule-pickup" element={<SchedulePickup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />

          {/* AI & Core Routes */}
          <Route path="/ai-detection" element={<LiveAIDetection />} />
          <Route path="/history" element={<ScanHistory />} />
          <Route path="/analytics" element={<WasteAnalytics />} />
          <Route path="/location-analytics" element={<LocationAnalytics />} />
          <Route path="/campus-cleanliness" element={<CampusCleanliness />} />
          <Route path="/ai-insights" element={<AIInsights />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          {/* Fallback for any unknown route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
