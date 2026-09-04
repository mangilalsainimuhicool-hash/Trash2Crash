import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertCircle,
  FileText,
  Boxes,
  ShieldCheck,
  Cpu,
  Receipt,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TIME_SLOTS } from '../data/mockData';

const SellWaste = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { categories, rates, schedulePickup, user } = useApp();

  const initialCat = searchParams.get('category') || 'plastic';
  const initialQty = Number(searchParams.get('qty')) || 10;

  // Form State
  const [category, setCategory] = useState(initialCat);
  const [quantity, setQuantity] = useState(initialQty);
  const [address, setAddress] = useState(user?.address || 'Flat 402, Green Meadows, 14th Cross');
  const [city, setCity] = useState(user?.city || 'Bengaluru');
  const [pincode, setPincode] = useState(user?.pincode || '560034');

  // Tomorrow's date default
  const getTomorrowDate = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [date, setDate] = useState(getTomorrowDate());
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  // Validation & Submission State
  const [errors, setErrors] = useState({});
  const [submittedPickup, setSubmittedPickup] = useState(null);

  // Synchronize category if query changes
  useEffect(() => {
    const qCat = searchParams.get('category');
    if (qCat && rates[qCat]) {
      setCategory(qCat);
    }
    const qQty = searchParams.get('qty');
    if (qQty && !isNaN(Number(qQty))) {
      setQuantity(Number(qQty));
    }
  }, [searchParams, rates]);

  // Rate & Calculation
  const currentRate = rates[category] || 25;
  const numQty = parseFloat(quantity) || 0;
  const estimatedEarnings = Math.round(numQty * currentRate);

  const validate = () => {
    const newErrors = {};
    if (!category) newErrors.category = 'Please select a waste category';
    if (!quantity || numQty <= 0) newErrors.quantity = 'Please enter a valid weight in kg (min 1 kg)';
    if (!address.trim()) newErrors.address = 'Street address is required';
    if (!city.trim()) newErrors.city = 'City is required';
    if (!pincode.trim() || !/^\d{6}$/.test(pincode.trim())) {
      newErrors.pincode = 'Please enter a valid 6-digit PIN code';
    }
    if (!date) newErrors.date = 'Pickup date is required';
    if (!timeSlot) newErrors.timeSlot = 'Please pick a time slot';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const categoryObj = categories.find((c) => c.id === category);
    const categoryName = categoryObj ? categoryObj.name : category;

    const createdPickup = schedulePickup({
      category: categoryName,
      quantity: numQty,
      address: address.trim(),
      city: city.trim(),
      pincode: pincode.trim(),
      date,
      timeSlot,
      paymentMethod
    });

    setSubmittedPickup(createdPickup);
  };

  const handleReset = () => {
    setSubmittedPickup(null);
    setQuantity(10);
  };

  return (
    <div className="page-wrapper sell-waste-page">
      {/* HEADER */}
      <section className="page-header-section">
        <div className="container text-center">
          <span className="sub-badge">SELL RECYCLABLES AT HOME</span>
          <h1 className="page-title">Sell Your Waste</h1>
          <p className="page-description">
            Fill in your scrap details and pickup location. We calculate your guaranteed payout instantly and dispatch a verified green partner.
          </p>
        </div>
      </section>

      <section className="sell-form-section">
        <div className="container">
          {submittedPickup ? (
            /* SUCCESS CONFIRMATION RECEIPT */
            <div className="pickup-success-card animate-fade-in">
              <div className="success-badge-top">
                <span className="check-ring">
                  <CheckCircle2 size={36} className="text-green" />
                </span>
                <h2>Pickup Scheduled Successfully ♻</h2>
                <p className="success-lead">
                  Your doorstep waste collection has been booked. Our verified green partner will arrive with certified digital scales.
                </p>
              </div>

              <div className="success-receipt-details">
                <div className="receipt-banner-id">
                  <span>Pickup Reference ID:</span>
                  <strong>{submittedPickup.id}</strong>
                </div>

                <div className="details-table">
                  <div className="detail-row">
                    <span className="d-label">Waste Type</span>
                    <span className="d-value font-semibold">{submittedPickup.wasteType}</span>
                  </div>
                  <div className="detail-row">
                    <span className="d-label">Estimated Quantity</span>
                    <span className="d-value">{submittedPickup.quantity} kg</span>
                  </div>
                  <div className="detail-row">
                    <span className="d-label">Applied Rate</span>
                    <span className="d-value">₹{submittedPickup.rate} / kg</span>
                  </div>
                  <div className="detail-row highlight-earnings">
                    <span className="d-label">Estimated Payout</span>
                    <span className="d-value font-bold text-green">₹{submittedPickup.estimatedEarnings}</span>
                  </div>
                  <div className="detail-row">
                    <span className="d-label">Pickup Date</span>
                    <span className="d-value">{submittedPickup.date}</span>
                  </div>
                  <div className="detail-row">
                    <span className="d-label">Time Slot</span>
                    <span className="d-value">{submittedPickup.timeSlot}</span>
                  </div>
                  <div className="detail-row">
                    <span className="d-label">Pickup Address</span>
                    <span className="d-value text-right">{submittedPickup.address}</span>
                  </div>
                  <div className="detail-row">
                    <span className="d-label">Assigned Partner</span>
                    <span className="d-value">{submittedPickup.agentName}</span>
                  </div>
                </div>
              </div>

              <div className="success-action-buttons">
                <Link to="/dashboard" className="btn-primary">
                  <span>View in User Dashboard</span>
                  <ArrowRight size={16} />
                </Link>
                <button onClick={handleReset} className="btn-secondary">
                  <RotateCcw size={16} />
                  <span>Sell Another Scrap Item</span>
                </button>
              </div>
            </div>
          ) : (
            /* SELL FORM GRID */
            <div className="sell-form-layout">
              {/* Form Column */}
              <div className="sell-form-col">
                <form onSubmit={handleSubmit} className="waste-booking-form" noValidate>
                  {/* Category Selection */}
                  <div className="form-group-block">
                    <label className="form-label">
                      1. Select Waste Category <span className="req">*</span>
                    </label>
                    <div className="category-select-grid">
                      {categories.map((c) => (
                        <div
                          key={c.id}
                          onClick={() => setCategory(c.id)}
                          className={`category-radio-card ${category === c.id ? 'selected' : ''}`}
                        >
                          <div className="cat-radio-top">
                            <span className="cat-radio-emoji">{c.emoji}</span>
                            <span className="cat-radio-price">₹{c.rate}/kg</span>
                          </div>
                          <span className="cat-radio-name">{c.name}</span>
                        </div>
                      ))}
                    </div>
                    {errors.category && <p className="error-msg">{errors.category}</p>}
                  </div>

                  {/* Quantity In KG */}
                  <div className="form-group-block">
                    <div className="label-with-addon">
                      <label className="form-label">
                        2. Quantity in KG <span className="req">*</span>
                      </label>
                      <span className="small-helper">10 KG Plastic × ₹25 = ₹250</span>
                    </div>

                    <div className="quantity-field-wrapper">
                      <input
                        type="number"
                        min="1"
                        step="0.5"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        placeholder="e.g. 15"
                        className={`form-input quantity-input ${errors.quantity ? 'input-error' : ''}`}
                      />
                      <span className="quantity-kg-tag">KG</span>
                    </div>
                    {errors.quantity && <p className="error-msg">{errors.quantity}</p>}

                    {/* Quick quantity shortcuts */}
                    <div className="quick-qty-pills">
                      {[5, 10, 20, 35, 50].map((preset) => (
                        <button
                          type="button"
                          key={preset}
                          onClick={() => setQuantity(preset)}
                          className={`preset-btn ${Number(quantity) === preset ? 'active' : ''}`}
                        >
                          +{preset} kg
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="form-group-block">
                    <label className="form-label">
                      3. Pickup Address Details <span className="req">*</span>
                    </label>

                    <div className="address-fields-stack">
                      <div className="field-row">
                        <input
                          type="text"
                          placeholder="House / Flat / Building / Street Address"
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className={`form-input ${errors.address ? 'input-error' : ''}`}
                        />
                        {errors.address && <p className="error-msg">{errors.address}</p>}
                      </div>

                      <div className="address-dual-grid">
                        <div>
                          <input
                            type="text"
                            placeholder="City (e.g. Bengaluru)"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className={`form-input ${errors.city ? 'input-error' : ''}`}
                          />
                          {errors.city && <p className="error-msg">{errors.city}</p>}
                        </div>

                        <div>
                          <input
                            type="text"
                            placeholder="6-digit Pincode"
                            maxLength={6}
                            value={pincode}
                            onChange={(e) => setPincode(e.target.value)}
                            className={`form-input ${errors.pincode ? 'input-error' : ''}`}
                          />
                          {errors.pincode && <p className="error-msg">{errors.pincode}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="form-group-block">
                    <label className="form-label">
                      4. Pickup Date & Time Slot <span className="req">*</span>
                    </label>

                    <div className="date-time-grid">
                      <div>
                        <input
                          type="date"
                          min={new Date().toISOString().split('T')[0]}
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          className={`form-input ${errors.date ? 'input-error' : ''}`}
                        />
                        {errors.date && <p className="error-msg">{errors.date}</p>}
                      </div>

                      <div className="slot-pills-row">
                        {TIME_SLOTS.map((slot) => (
                          <button
                            type="button"
                            key={slot}
                            onClick={() => setTimeSlot(slot)}
                            className={`time-slot-btn ${timeSlot === slot ? 'active' : ''}`}
                          >
                            <Clock size={14} />
                            <span>{slot}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Payment Preference */}
                  <div className="form-group-block">
                    <label className="form-label">5. Preferred Payout Mode</label>
                    <div className="payout-mode-row">
                      {['UPI', 'Cash', 'Bank Transfer'].map((method) => (
                        <button
                          type="button"
                          key={method}
                          onClick={() => setPaymentMethod(method)}
                          className={`payout-chip ${paymentMethod === method ? 'active' : ''}`}
                        >
                          {method === 'UPI' && '⚡ UPI'}
                          {method === 'Cash' && '💵 Cash'}
                          {method === 'Bank Transfer' && '🏦 Bank IMPS'}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button type="submit" className="btn-primary w-full submit-schedule-btn">
                    <span>Schedule Pickup →</span>
                  </button>
                </form>
              </div>

              {/* Dynamic Valuation Display Column */}
              <div className="sell-valuation-col">
                <div className="sticky-valuation-card">
                  <div className="valuation-card-header">
                    <Receipt size={22} className="text-green" />
                    <h3>Live Value Summary</h3>
                  </div>

                  <div className="valuation-breakdown">
                    <div className="val-item">
                      <span className="v-label">Waste Type</span>
                      <span className="v-data capitalize font-semibold">{category}</span>
                    </div>
                    <div className="val-item">
                      <span className="v-label">Quantity</span>
                      <span className="v-data">{numQty} KG</span>
                    </div>
                    <div className="val-item">
                      <span className="v-label">Rate</span>
                      <span className="v-data">₹{currentRate} / kg</span>
                    </div>

                    <div className="val-formula-row">
                      <span>Formula:</span>
                      <code>{numQty} KG × ₹{currentRate}/kg</code>
                    </div>

                    <hr className="val-hr" />

                    <div className="val-earnings-row">
                      <div className="earnings-text">
                        <span className="e-title">Estimated Earnings</span>
                        <span className="e-sub">Disbursed on pickup</span>
                      </div>
                      <span className="earnings-figure">₹{estimatedEarnings}</span>
                    </div>
                  </div>

                  <div className="service-promises">
                    <div className="promise-point">
                      <CheckCircle2 size={16} className="text-green" />
                      <span>Zero door-step pickup fee</span>
                    </div>
                    <div className="promise-point">
                      <CheckCircle2 size={16} className="text-green" />
                      <span>Certified Bluetooth digital scale</span>
                    </div>
                    <div className="promise-point">
                      <CheckCircle2 size={16} className="text-green" />
                      <span>Instant UPI / Cash payout guarantee</span>
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

export default SellWaste;
