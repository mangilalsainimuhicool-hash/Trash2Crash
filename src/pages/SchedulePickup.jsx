import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CalendarCheck2,
  Clock,
  MapPin,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIME_SLOTS } from '../data/mockData';

const SchedulePickup = () => {
  const { categories, rates, schedulePickup, user } = useApp();
  const navigate = useNavigate();

  // Form states
  const [wasteCategory, setWasteCategory] = useState('Plastic');
  const [quantity, setQuantity] = useState(15);
  const [address, setAddress] = useState(user?.address || 'Flat 402, Green Meadows, 14th Cross');
  const [city, setCity] = useState(user?.city || 'Bengaluru');
  const [pincode, setPincode] = useState(user?.pincode || '560034');

  // Tomorrow's date
  const getTomorrow = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(getTomorrow());
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [errors, setErrors] = useState({});
  const [scheduledResult, setScheduledResult] = useState(null);

  // Compute live estimate
  const catKey = wasteCategory.toLowerCase().replace(' ', '');
  const rate = rates[catKey] || (wasteCategory === 'Paper' ? 18 : wasteCategory === 'Plastic' ? 25 : wasteCategory === 'Metal' ? 40 : 60);
  const qtyNumber = parseFloat(quantity) || 0;
  const estimatedValue = Math.round(qtyNumber * rate);

  const validateForm = () => {
    const errs = {};
    if (!wasteCategory) errs.wasteCategory = 'Please select a waste category';
    if (!quantity || qtyNumber <= 0) errs.quantity = 'Please enter a valid quantity in kg';
    if (!address.trim()) errs.address = 'Street address is required';
    if (!city.trim()) errs.city = 'City is required';
    if (!pincode.trim() || !/^\d{6}$/.test(pincode.trim())) {
      errs.pincode = 'Enter a valid 6-digit PIN code';
    }
    if (!date) errs.date = 'Select a pickup date';
    if (!timeSlot) errs.timeSlot = 'Select a time slot';

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const result = schedulePickup({
      category: wasteCategory,
      quantity: qtyNumber,
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      date,
      timeSlot
    });

    setScheduledResult(result);
  };

  const handleBookAnother = () => {
    setScheduledResult(null);
    setQuantity(10);
  };

  return (
    <div className="page-wrapper schedule-pickup-page">
      {/* HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <span className="sub-badge">DOORSTEP SERVICE</span>
          <h1 className="page-title">Schedule Waste Pickup</h1>
          <p className="page-description">
            Choose your convenient date and time slot. Our certified agent comes with an ISO-certified digital weighing scale.
          </p>
        </div>
      </section>

      <section className="schedule-section-body">
        <div className="container">
          {scheduledResult ? (
            /* SUBMISSION SUCCESS CARD */
            <div className="pickup-scheduled-success-view animate-fade-in">
              <div className="success-header-pill">
                <div className="green-circle-icon">
                  <CheckCircle2 size={42} />
                </div>
                <h2>Pickup Scheduled Successfully ♻</h2>
                <p className="success-sub">
                  Your pickup request has been dispatched to our local green logistics partner.
                </p>
              </div>

              {/* Exact Display Spec */}
              <div className="confirmation-dossier">
                <div className="dossier-id-row">
                  <span className="id-label">Pickup ID:</span>
                  <span className="id-code">{scheduledResult.id}</span>
                </div>

                <div className="dossier-grid">
                  <div className="dossier-cell">
                    <span className="cell-label">Waste Type</span>
                    <span className="cell-value">{scheduledResult.wasteType}</span>
                  </div>

                  <div className="dossier-cell">
                    <span className="cell-label">Quantity</span>
                    <span className="cell-value">{scheduledResult.quantity} KG</span>
                  </div>

                  <div className="dossier-cell">
                    <span className="cell-label">Date</span>
                    <span className="cell-value">{scheduledResult.date}</span>
                  </div>

                  <div className="dossier-cell">
                    <span className="cell-label">Time</span>
                    <span className="cell-value">{scheduledResult.timeSlot}</span>
                  </div>

                  <div className="dossier-cell full-width-highlight">
                    <span className="cell-label">Estimated Value</span>
                    <span className="cell-value highlight-value">₹{scheduledResult.estimatedEarnings}</span>
                  </div>

                  <div className="dossier-cell full-width-cell">
                    <span className="cell-label">Address</span>
                    <span className="cell-value">{scheduledResult.address}</span>
                  </div>
                </div>
              </div>

              <div className="dossier-cta-group">
                <Link to="/dashboard" className="btn-primary">
                  <span>Go to Dashboard</span>
                  <ArrowRight size={18} />
                </Link>
                <button onClick={handleBookAnother} className="btn-secondary">
                  <RotateCcw size={16} />
                  <span>Schedule Another Pickup</span>
                </button>
              </div>
            </div>
          ) : (
            /* SCHEDULE FORM */
            <div className="schedule-layout-grid">
              <div className="schedule-form-container">
                <form onSubmit={handleFormSubmit} className="pickup-form" noValidate>
                  {/* Category Selection */}
                  <div className="form-item">
                    <label className="input-label">
                      Waste Category <span className="req">*</span>
                    </label>
                    <div className="category-btn-row">
                      {['Paper', 'Plastic', 'Metal', 'E-Waste'].map((cat) => (
                        <button
                          type="button"
                          key={cat}
                          onClick={() => setWasteCategory(cat)}
                          className={`cat-pill-btn ${wasteCategory === cat ? 'active' : ''}`}
                        >
                          <span className="pill-dot"></span>
                          <span>{cat}</span>
                        </button>
                      ))}
                    </div>
                    {errors.wasteCategory && <p className="error-msg">{errors.wasteCategory}</p>}
                  </div>

                  {/* Quantity Input */}
                  <div className="form-item">
                    <label className="input-label">
                      Quantity (KG) <span className="req">*</span>
                    </label>
                    <div className="qty-input-box">
                      <input
                        type="number"
                        min="1"
                        step="1"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        className={`form-input ${errors.quantity ? 'input-error' : ''}`}
                        placeholder="e.g. 15"
                      />
                      <span className="qty-suffix">kg</span>
                    </div>
                    {errors.quantity && <p className="error-msg">{errors.quantity}</p>}
                  </div>

                  {/* Address */}
                  <div className="form-item">
                    <label className="input-label">
                      Address <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Door no, Apartment / Street name"
                      className={`form-input ${errors.address ? 'input-error' : ''}`}
                    />
                    {errors.address && <p className="error-msg">{errors.address}</p>}
                  </div>

                  {/* City & Pincode */}
                  <div className="form-row-dual">
                    <div className="form-item">
                      <label className="input-label">
                        City <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="e.g. Bengaluru"
                        className={`form-input ${errors.city ? 'input-error' : ''}`}
                      />
                      {errors.city && <p className="error-msg">{errors.city}</p>}
                    </div>

                    <div className="form-item">
                      <label className="input-label">
                        Pincode <span className="req">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        placeholder="6-digit PIN"
                        className={`form-input ${errors.pincode ? 'input-error' : ''}`}
                      />
                      {errors.pincode && <p className="error-msg">{errors.pincode}</p>}
                    </div>
                  </div>

                  {/* Date Picker */}
                  <div className="form-item">
                    <label className="input-label">
                      Date <span className="req">*</span>
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className={`form-input ${errors.date ? 'input-error' : ''}`}
                    />
                    {errors.date && <p className="error-msg">{errors.date}</p>}
                  </div>

                  {/* Time Slot Selection */}
                  <div className="form-item">
                    <label className="input-label">
                      Time Slot <span className="req">*</span>
                    </label>
                    <div className="time-slots-select-grid">
                      {TIME_SLOTS.map((slot) => (
                        <div
                          key={slot}
                          onClick={() => setTimeSlot(slot)}
                          className={`slot-card-option ${timeSlot === slot ? 'active' : ''}`}
                        >
                          <Clock size={16} className="slot-clock-icon" />
                          <span className="slot-timing">{slot}</span>
                        </div>
                      ))}
                    </div>
                    {errors.timeSlot && <p className="error-msg">{errors.timeSlot}</p>}
                  </div>

                  <button type="submit" className="btn-primary w-full submit-btn-large">
                    <span>Confirm & Schedule Pickup →</span>
                  </button>
                </form>
              </div>

              {/* Side Live Card */}
              <div className="schedule-side-summary">
                <div className="side-estimate-card">
                  <span className="side-card-badge">Instant Valuation</span>
                  <div className="estimate-calc-row">
                    <span className="label">Category:</span>
                    <span className="value font-semibold">{wasteCategory}</span>
                  </div>
                  <div className="estimate-calc-row">
                    <span className="label">Rate:</span>
                    <span className="value">₹{rate}/kg</span>
                  </div>
                  <div className="estimate-calc-row">
                    <span className="label">Weight:</span>
                    <span className="value">{qtyNumber} kg</span>
                  </div>

                  <div className="calc-divider"></div>

                  <div className="estimate-total-box">
                    <span className="tot-label">Estimated Value</span>
                    <span className="tot-val">₹{estimatedValue}</span>
                  </div>

                  <div className="badge-features-list">
                    <div className="feat-line">
                      <Truck size={16} className="text-green" />
                      <span>Free pickup at your doorstep</span>
                    </div>
                    <div className="feat-line">
                      <ShieldCheck size={16} className="text-green" />
                      <span>ISO 9001 certified digital scale</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SchedulePickup;
