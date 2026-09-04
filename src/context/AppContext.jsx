import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import {
  WASTE_RATES,
  WASTE_CATEGORIES,
  TIME_SLOTS,
  AI_WASTE_CLASSIFICATIONS,
  QR_TRACKING_SAMPLES
} from '../data/mockData';
import { MATERIAL_CONFIG, getMaterialConfig, calculateEstimatedValue } from '../data/materialConfig';

const AppContext = createContext(null);

const EMPTY_STATS = {
  totalWasteSold: 127,
  totalEarnings: 3420,
  pickupsCompleted: 8,
  co2Saved: 64
};

export const AppProvider = ({ children }) => {
  // -----------------------------
  // User Authentication State
  // -----------------------------
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('ttc_user');
      return savedUser ? JSON.parse(savedUser) : {
        name: 'Aarav Sharma',
        email: 'aarav.sharma@example.com',
        phone: '+91 98765 43210',
        address: 'Flat 402, Green Meadows, 14th Cross',
        city: 'Bengaluru',
        pincode: '560034',
        memberSince: 'March 2024'
      };
    } catch {
      return null;
    }
  });

  // -----------------------------
  // Real Scan History State (Single Source of Truth)
  // -----------------------------
  const [scans, setScans] = useState(() => {
    try {
      const savedScans = localStorage.getItem('trash2cash_scans');
      return savedScans ? JSON.parse(savedScans) : [];
    } catch {
      return [];
    }
  });

  // Sync scans to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('trash2cash_scans', JSON.stringify(scans));
    } catch (e) {
      console.error('Failed to sync scans to localStorage:', e);
    }
  }, [scans]);

  // -----------------------------
  // User Wallet State (Rewards Balance)
  // Default ₹40 matching workflow example (Previous ₹40 -> New ₹48)
  // -----------------------------
  const [walletBalance, setWalletBalance] = useState(() => {
    try {
      const savedWallet = localStorage.getItem('trash2cash_wallet');
      return savedWallet !== null ? Number(savedWallet) : 40;
    } catch {
      return 40;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('trash2cash_wallet', walletBalance.toString());
    } catch (e) {
      console.error('Failed to sync wallet balance:', e);
    }
  }, [walletBalance]);

  // -----------------------------
  // Pickups State
  // -----------------------------
  const [upcomingPickups, setUpcomingPickups] = useState(() => {
    try {
      const saved = localStorage.getItem('ttc_pickups');
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'TTC-94812',
          wasteType: 'E-Waste',
          quantity: 8,
          rate: 60,
          estimatedEarnings: 480,
          date: '2026-09-05',
          timeSlot: '9:00 AM - 12:00 PM',
          address: 'Flat 402, Green Meadows, 14th Cross, Bengaluru, 560034',
          status: 'Scheduled',
          agentName: 'Ramesh Kumar (Recycle Partner #402)',
          agentPhone: '+91 98450 11223'
        }
      ];
    } catch {
      return [];
    }
  });

  // -----------------------------
  // Transactions State
  // -----------------------------
  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('ttc_transactions');
      if (saved) return JSON.parse(saved);
      return [
        { id: 'TXN-7281', date: '2026-08-28', wasteType: 'Plastic', quantity: 24, rate: 25, earnings: 600, status: 'Completed', paymentMethod: 'UPI' },
        { id: 'TXN-6914', date: '2026-08-15', wasteType: 'Paper', quantity: 35, rate: 18, earnings: 630, status: 'Completed', paymentMethod: 'Cash' },
        { id: 'TXN-5820', date: '2026-07-30', wasteType: 'Metal', quantity: 18, rate: 40, earnings: 720, status: 'Completed', paymentMethod: 'UPI' },
        { id: 'TXN-5102', date: '2026-07-12', wasteType: 'E-Waste', quantity: 12, rate: 60, earnings: 720, status: 'Completed', paymentMethod: 'Bank Transfer' }
      ];
    } catch {
      return [];
    }
  });

  // -----------------------------
  // Stats State
  // -----------------------------
  const [stats, setStats] = useState(() => {
    try {
      const saved = localStorage.getItem('ttc_stats');
      return saved ? JSON.parse(saved) : EMPTY_STATS;
    } catch {
      return EMPTY_STATS;
    }
  });

  // -----------------------------
  // Toast Notification State
  // -----------------------------
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
  };

  // -----------------------------
  // LocalStorage Sync for other states
  // -----------------------------
  useEffect(() => {
    if (user) {
      localStorage.setItem('ttc_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ttc_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('ttc_pickups', JSON.stringify(upcomingPickups));
  }, [upcomingPickups]);

  useEffect(() => {
    localStorage.setItem('ttc_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('ttc_stats', JSON.stringify(stats));
  }, [stats]);

  // -----------------------------
  // Real Scan Management (Deterministic & Persistent)
  // -----------------------------
  const saveScan = (scanData) => {
    const config = getMaterialConfig(scanData.categoryKey || scanData.category);
    const weight = Number(scanData.estimatedWeight) || config.avgUnitWeightKg;
    const value = scanData.estimatedValue !== undefined 
      ? Number(scanData.estimatedValue) 
      : calculateEstimatedValue(config, weight);

    const newScan = {
      id: scanData.id || `scan-${Date.now()}`,
      wasteType: scanData.wasteType || config.wasteType,
      material: scanData.material || config.material,
      category: config.category,
      categoryKey: config.id,
      confidence: Number(scanData.confidence) || 92,
      estimatedWeight: Number(weight.toFixed(2)),
      estimatedValue: Number(value),
      recyclable: Boolean(config.recyclable),
      timestamp: scanData.timestamp || new Date().toISOString(),
      imageUrl: scanData.imageUrl || null,
      location: scanData.location || 'Home / General'
    };

    setScans((prev) => [newScan, ...prev]);
    showToast(`✓ Scan Saved: ${newScan.wasteType} (₹${newScan.estimatedValue})`, 'success');
    return newScan;
  };

  const deleteScan = (scanId) => {
    setScans((prev) => prev.filter((s) => s.id !== scanId));
    showToast('Scan removed from history.', 'info');
  };

  const clearAllScans = () => {
    setScans([]);
    try {
      localStorage.removeItem('trash2cash_scans');
    } catch {}
    showToast('Scan history cleared.', 'info');
  };

  // -----------------------------
  // Credit Reward (Atomic Consistency: Wallet + Stats + Transactions + Scans)
  // -----------------------------
  const creditReward = (submissionData) => {
    const config = getMaterialConfig(submissionData.categoryKey || submissionData.category);
    const weight = Number(submissionData.weightKg ?? submissionData.estimatedWeight) || config.avgUnitWeightKg || 0.25;
    const rate = submissionData.ratePerKg !== undefined 
      ? Number(submissionData.ratePerKg) 
      : (config.valuePerKg || 0);
    
    // Deterministic Reward Calculation: weight (kg) * rate (₹/kg)
    const reward = submissionData.rewardAmount !== undefined 
      ? Number(submissionData.rewardAmount) 
      : Math.round(weight * rate);

    const prevBalance = walletBalance;
    const newBalance = prevBalance + reward;

    // 1. Atomically update wallet
    setWalletBalance(newBalance);

    // 2. Update platform stats
    setStats((prev) => ({
      ...prev,
      totalEarnings: Number(prev.totalEarnings || 0) + reward,
      totalWasteSold: Number((Number(prev.totalWasteSold || 0) + weight).toFixed(2)),
      co2Saved: Number((Number(prev.co2Saved || 0) + weight * 0.5).toFixed(2))
    }));

    // 3. Add to transactions log
    const txnId = `TXN-REW-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTransaction = {
      id: txnId,
      date: new Date().toISOString().split('T')[0],
      wasteType: submissionData.wasteType || config.wasteType,
      quantity: Number(weight.toFixed(2)),
      rate: rate,
      earnings: reward,
      status: 'Completed',
      paymentMethod: 'Reward Wallet'
    };
    setTransactions((prev) => [newTransaction, ...prev]);

    // 4. Save to scans history
    const newScan = {
      id: submissionData.id || `scan-${Date.now()}`,
      wasteType: submissionData.wasteType || config.wasteType,
      material: submissionData.material || config.material,
      category: config.category,
      categoryKey: config.id,
      confidence: submissionData.isManual 
        ? 'Manual Selection' 
        : (submissionData.confidence !== undefined ? submissionData.confidence : 92),
      estimatedWeight: Number(weight.toFixed(2)),
      estimatedValue: reward,
      ratePerKg: rate,
      recyclable: Boolean(config.recyclable),
      timestamp: new Date().toISOString(),
      imageUrl: submissionData.imageUrl || null,
      location: submissionData.location || 'Home / Main Scanner',
      submissionType: submissionData.isManual ? 'Manual Upload' : 'AI Detection'
    };
    setScans((prev) => [newScan, ...prev]);

    showToast(`🎉 ₹${reward} added to wallet! (New Balance: ₹${newBalance})`, 'success');

    return {
      previousBalance: prevBalance,
      rewardEarned: reward,
      currentBalance: newBalance,
      scanRecord: newScan
    };
  };

  // -----------------------------
  // Dynamic Analytics Calculation (100% derived from real scan history)
  // -----------------------------
  const getAnalyticsSummary = () => {
    const totalScans = scans.length;
    const totalWeight = Number(
      scans.reduce((acc, s) => acc + (Number(s.estimatedWeight) || 0), 0).toFixed(2)
    );
    const totalValue = scans.reduce((acc, s) => acc + (Number(s.estimatedValue) || 0), 0);
    const recyclableScans = scans.filter((s) => s.recyclable);
    const recyclableCount = recyclableScans.length;
    const nonRecyclableCount = totalScans - recyclableCount;
    const recyclableWeight = Number(
      recyclableScans.reduce((acc, s) => acc + (Number(s.estimatedWeight) || 0), 0).toFixed(2)
    );
    const recyclablePercent = totalScans > 0 ? Math.round((recyclableCount / totalScans) * 100) : 0;
    const contaminationPercent = totalScans > 0 ? 100 - recyclablePercent : 0;

    // Categories list for material breakdown
    const categoriesList = [
      { key: 'plastic', name: 'Plastic', color: '#2563eb' },
      { key: 'paper', name: 'Paper/Cardboard', color: '#d97706' },
      { key: 'metal', name: 'Metal', color: '#475569' },
      { key: 'glass', name: 'Glass', color: '#0891b2' },
      { key: 'organic', name: 'Organic Waste', color: '#16a34a' },
      { key: 'ewaste', name: 'E-Waste', color: '#dc2626' },
      { key: 'mixed', name: 'Mixed Waste', color: '#64748b' }
    ];

    const materialDistribution = categoriesList.map((cat) => {
      const matching = scans.filter(
        (s) => s.categoryKey === cat.key || s.category === cat.name
      );
      const count = matching.length;
      const weightKg = Number(
        matching.reduce((acc, s) => acc + (Number(s.estimatedWeight) || 0), 0).toFixed(2)
      );
      const percentage = totalScans > 0 ? Math.round((count / totalScans) * 100) : 0;
      return {
        key: cat.key,
        name: cat.name,
        count,
        weightKg,
        percentage,
        color: cat.color
      };
    }).filter((item) => totalScans === 0 || item.count > 0);

    return {
      totalScans,
      totalWeight,
      totalValue,
      recyclableCount,
      nonRecyclableCount,
      recyclableWeight,
      recyclablePercent,
      contaminationPercent,
      materialDistribution
    };
  };

  // -----------------------------
  // Schedule Pickup
  // -----------------------------
  const schedulePickup = (pickupData) => {
    const pickupId = `TTC-${Math.floor(10000 + Math.random() * 90000)}`;
    const transactionId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const quantity = Number(pickupData.quantity);
    const rate = WASTE_RATES[pickupData.category.toLowerCase()] || 20;
    const estimatedValue = quantity * rate;

    const formattedAddress = [
      pickupData.address,
      pickupData.city,
      pickupData.pincode
    ]
      .filter(Boolean)
      .join(', ');

    const newPickup = {
      id: pickupId,
      wasteType: pickupData.category,
      quantity,
      rate,
      estimatedEarnings: estimatedValue,
      date: pickupData.date,
      timeSlot: pickupData.timeSlot || TIME_SLOTS[0],
      address: formattedAddress,
      status: 'Scheduled',
      agentName: 'Suresh Verma (Recycle Partner #109)',
      agentPhone: '+91 97312 44556',
      createdAt: new Date().toISOString()
    };

    const newTransaction = {
      id: transactionId,
      date: pickupData.date,
      wasteType: pickupData.category,
      quantity,
      rate,
      earnings: estimatedValue,
      status: 'Scheduled',
      paymentMethod: pickupData.paymentMethod || 'UPI'
    };

    setUpcomingPickups((prev) => [newPickup, ...prev]);
    setTransactions((prev) => [newTransaction, ...prev]);

    setStats((prev) => ({
      totalWasteSold: Number(prev.totalWasteSold || 0) + quantity,
      totalEarnings: Number(prev.totalEarnings || 0) + estimatedValue,
      pickupsCompleted: Number(prev.pickupsCompleted || 0),
      co2Saved: Number(prev.co2Saved || 0) + Math.round(quantity * 0.5)
    }));

    showToast(`Pickup Scheduled Successfully ♻ (ID: ${pickupId})`, 'success');
    return newPickup;
  };

  const cancelPickup = (pickupId) => {
    setUpcomingPickups((prev) => prev.filter((item) => item.id !== pickupId));
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === pickupId ? { ...tx, status: 'Cancelled' } : tx))
    );
    showToast('Pickup cancelled successfully.', 'info');
  };

  // -----------------------------
  // Schedule Waste Pickup from Image Upload (Sells waste to worker)
  // Money is NOT credited immediately; it is credited in User Dashboard upon worker pickup!
  // -----------------------------
  const scheduleWastePickup = (data) => {
    const config = getMaterialConfig(data.categoryKey || data.category);
    const weight = Number(data.weightKg ?? data.estimatedWeight) || config.avgUnitWeightKg || 0.25;
    const rate = data.ratePerKg !== undefined 
      ? Number(data.ratePerKg) 
      : (config.valuePerKg || 0);
    const earnings = data.rewardAmount !== undefined 
      ? Number(data.rewardAmount) 
      : Math.round(weight * rate);

    const pickupId = `TTC-${Math.floor(10000 + Math.random() * 90000)}`;
    const txnId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;
    const scanId = `scan-${Date.now()}`;

    // 1. Create Doorstep Worker Pickup (Money to be credited after pickup by worker)
    const newPickup = {
      id: pickupId,
      scanId: scanId,
      wasteType: data.wasteType || config.wasteType,
      material: data.material || config.material,
      quantity: Number(weight.toFixed(2)),
      rate: rate,
      estimatedEarnings: earnings,
      date: data.date || 'Today / Immediate',
      timeSlot: data.timeSlot || 'Doorstep Collection (Within 2 Hours)',
      address: data.location || 'Flat 402, Green Meadows, Bengaluru',
      status: 'Scheduled',
      agentName: 'Ramesh Kumar (Recycle Partner #402)',
      agentPhone: '+91 98450 11223',
      imageUrl: data.imageUrl || null,
      submissionType: data.isManual ? 'Manual Upload' : 'AI Detection',
      createdAt: new Date().toISOString()
    };

    // 2. Transaction with 'Scheduled' status
    const newTransaction = {
      id: txnId,
      date: new Date().toISOString().split('T')[0],
      wasteType: data.wasteType || config.wasteType,
      quantity: Number(weight.toFixed(2)),
      rate: rate,
      earnings: earnings,
      status: 'Scheduled',
      paymentMethod: 'User Dashboard Wallet'
    };

    // 3. Scan History with 'Scheduled for Worker Pickup'
    const newScan = {
      id: scanId,
      wasteType: data.wasteType || config.wasteType,
      material: data.material || config.material,
      category: config.category,
      categoryKey: config.id,
      confidence: data.isManual ? 'Manual Selection' : (data.confidence !== undefined ? data.confidence : 92),
      estimatedWeight: Number(weight.toFixed(2)),
      estimatedValue: earnings,
      ratePerKg: rate,
      recyclable: Boolean(config.recyclable),
      timestamp: new Date().toISOString(),
      imageUrl: data.imageUrl || null,
      location: data.location || 'Home / Main Scanner',
      submissionType: data.isManual ? 'Manual Upload' : 'AI Detection',
      status: 'Scheduled for Worker Pickup'
    };

    setUpcomingPickups((prev) => [newPickup, ...prev]);
    setTransactions((prev) => [newTransaction, ...prev]);
    setScans((prev) => [newScan, ...prev]);

    showToast(`🚚 Waste pickup scheduled with worker! Assigned: ${newPickup.agentName}`, 'success');

    return {
      newPickup,
      scanRecord: newScan
    };
  };

  // -----------------------------
  // Complete Pickup by Worker -> Adds Money to User Dashboard Wallet
  // -----------------------------
  const completePickup = (pickupId) => {
    const pickup = upcomingPickups.find((p) => p.id === pickupId);
    if (!pickup) return null;

    const earnings = Number(pickup.estimatedEarnings || 0);
    const prevBalance = walletBalance;
    const newBalance = prevBalance + earnings;

    // 1. Add money ONLY to User Dashboard Wallet
    setWalletBalance(newBalance);

    // 2. Remove from upcoming pickups
    setUpcomingPickups((prev) => prev.filter((p) => p.id !== pickupId));

    // 3. Update transactions to 'Completed'
    setTransactions((prev) =>
      prev.map((tx) =>
        tx.id === pickup.id || tx.wasteType === pickup.wasteType
          ? { ...tx, status: 'Completed' }
          : tx
      )
    );

    // 4. Update scan record to 'Picked Up by Worker & Credited'
    if (pickup.scanId) {
      setScans((prev) =>
        prev.map((s) =>
          s.id === pickup.scanId ? { ...s, status: 'Picked Up by Worker & Credited' } : s
        )
      );
    }

    // 5. Update user stats
    setStats((prev) => ({
      ...prev,
      totalEarnings: Number(prev.totalEarnings || 0) + earnings,
      totalWasteSold: Number((Number(prev.totalWasteSold || 0) + Number(pickup.quantity || 0)).toFixed(2)),
      pickupsCompleted: Number(prev.pickupsCompleted || 0) + 1,
      co2Saved: Number((Number(prev.co2Saved || 0) + Number(pickup.quantity || 0) * 0.5).toFixed(2))
    }));

    showToast(`🎉 Waste collected by worker! ₹${earnings} added to User Dashboard Wallet (New Balance: ₹${newBalance})`, 'success');

    return {
      pickup,
      previousBalance: prevBalance,
      earnings,
      newBalance
    };
  };

  // -----------------------------
  // Auth Functions
  // -----------------------------
  const login = (email, password) => {
    const cleanEmail = email?.trim();
    if (!cleanEmail || !password) {
      showToast('Please enter your email and password.', 'error');
      return null;
    }

    const namePart = cleanEmail.split('@')[0].replace('.', ' ');
    const formattedName = namePart.charAt(0).toUpperCase() + namePart.slice(1);

    const loggedInUser = {
      name: formattedName || 'Aarav Sharma',
      email: cleanEmail,
      phone: '+91 98765 43210',
      address: 'Flat 402, Green Meadows, 14th Cross',
      city: 'Bengaluru',
      pincode: '560034',
      memberSince: 'March 2024'
    };

    setUser(loggedInUser);
    showToast(`Welcome back, ${loggedInUser.name}! 👋`, 'success');
    return loggedInUser;
  };

  const signup = (userData) => {
    const newUser = {
      name: userData.fullName?.trim() || 'User',
      email: userData.email?.trim() || '',
      phone: userData.phone?.trim() || '+91 98765 00000',
      address: userData.address || 'Green Meadows',
      city: userData.city || 'Bengaluru',
      pincode: userData.pincode || '560034',
      memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    };

    setUser(newUser);
    showToast('Account created successfully! Welcome to Trash2Cash ♻️', 'success');
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ttc_user');
    showToast('You have been logged out.', 'info');
  };

  const value = {
    user,
    scans,
    walletBalance,
    setWalletBalance,
    creditReward,
    saveScan,
    deleteScan,
    clearAllScans,
    getAnalyticsSummary,
    rates: WASTE_RATES,
    categories: WASTE_CATEGORIES,
    materialConfig: MATERIAL_CONFIG,
    upcomingPickups,
    transactions,
    stats,
    toast,
    classifications: AI_WASTE_CLASSIFICATIONS,
    qrTracking: QR_TRACKING_SAMPLES,
    schedulePickup,
    scheduleWastePickup,
    completePickup,
    cancelPickup,
    login,
    signup,
    logout,
    showToast
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
};