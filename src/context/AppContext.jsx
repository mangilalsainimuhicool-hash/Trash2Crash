import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import {
  WASTE_RATES,
  WASTE_CATEGORIES,
  TIME_SLOTS,
  CAMPUS_INTELLIGENCE_STATS,
  DEMO_DETECTION_EVENTS,
  AI_WASTE_CLASSIFICATIONS,
  CAMPUS_LOCATIONS,
  CAMPUS_CLEANLINESS_DATA,
  AI_CAMPUS_INSIGHTS,
  QR_TRACKING_SAMPLES
} from '../data/mockData';

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
        { id: 'TXN-5102', date: '2026-07-12', wasteType: 'E-Waste', quantity: 12, rate: 60, earnings: 720, status: 'Completed', paymentMethod: 'Bank Transfer' },
        { id: 'TXN-4421', date: '2026-06-25', wasteType: 'Plastic', quantity: 15, rate: 25, earnings: 375, status: 'Completed', paymentMethod: 'UPI' },
        { id: 'TXN-3910', date: '2026-06-08', wasteType: 'Paper', quantity: 21, rate: 18, earnings: 378, status: 'Completed', paymentMethod: 'Cash' },
        { id: 'TXN-2804', date: '2026-09-04', wasteType: 'E-Waste', quantity: 8, rate: 60, earnings: 480, status: 'Scheduled', paymentMethod: 'UPI' },
        { id: 'TXN-2198', date: '2026-09-02', wasteType: 'Metal', quantity: 14, rate: 40, earnings: 560, status: 'Processing', paymentMethod: 'UPI' }
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

  // -----------------------------
  // Campus Waste Intelligence & AI State
  // -----------------------------
  const [campusStats, setCampusStats] = useState(() => {
    try {
      const saved = localStorage.getItem('ttc_campus_stats');
      return saved ? JSON.parse(saved) : CAMPUS_INTELLIGENCE_STATS;
    } catch {
      return CAMPUS_INTELLIGENCE_STATS;
    }
  });

  const [aiEvents, setAiEvents] = useState(DEMO_DETECTION_EVENTS);
  const [activeDetectionIndex, setActiveDetectionIndex] = useState(0);
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const demoIntervalRef = useRef(null);

  // -----------------------------
  // LocalStorage Sync
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

  useEffect(() => {
    localStorage.setItem('ttc_campus_stats', JSON.stringify(campusStats));
  }, [campusStats]);

  // Toast Helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  // Find Waste Rate
  const getWasteRate = (category) => {
    if (!category) return 0;
    const key = category.toLowerCase().replace(/[-\s]/g, '');
    if (WASTE_RATES[key]) return WASTE_RATES[key];
    const matched = WASTE_CATEGORIES.find(
      (item) => item.name.toLowerCase() === category.toLowerCase()
    );
    return matched?.rate || 0;
  };

  // Schedule Pickup
  const schedulePickup = (pickupData) => {
    const quantity = Number.parseFloat(pickupData.quantity) || 0;
    const rate = getWasteRate(pickupData.category);
    const estimatedValue = Math.round(quantity * rate);

    const pickupId = `TTC-${Math.floor(10000 + Math.random() * 90000)}`;
    const transactionId = `TXN-${Math.floor(1000 + Math.random() * 9000)}`;

    const formattedAddress = [
      pickupData.address,
      pickupData.city,
      pickupData.pincode
    ].filter(Boolean).join(', ');

    const newPickup = {
      id: pickupId,
      wasteType: pickupData.category,
      quantity,
      rate,
      estimatedEarnings: estimatedValue,
      date: pickupData.date,
      timeSlot: pickupData.timeSlot || TIME_SLOTS[0],
      address: formattedAddress,
      rawAddress: pickupData.address || '',
      city: pickupData.city || '',
      pincode: pickupData.pincode || '',
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

  // Cancel Pickup
  const cancelPickup = (pickupId) => {
    setUpcomingPickups((prev) => prev.filter((item) => item.id !== pickupId));
    setTransactions((prev) =>
      prev.map((tx) => (tx.id === pickupId ? { ...tx, status: 'Cancelled' } : tx))
    );
    showToast('Pickup cancelled successfully.', 'info');
  };

  // AI Camera Stream Controls
  const startDemo = () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    showToast('Live Camera Stream Active 🤖', 'info');

    demoIntervalRef.current = setInterval(() => {
      setActiveDetectionIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % aiEvents.length;
        const currentEvent = aiEvents[nextIndex];

        // Increment total campus waste events
        setCampusStats((prev) => {
          const newEvents = prev.totalWasteEvents + 1;
          const isContaminated = currentEvent?.isContaminated;
          const accuracyDelta = isContaminated ? -0.1 : 0.1;
          const newAccuracy = Math.min(99, Math.max(70, +(prev.segregationAccuracy + accuracyDelta).toFixed(1)));
          const newContamination = +(100 - newAccuracy).toFixed(1);
          const newKg = isContaminated ? prev.recyclableWasteKg : prev.recyclableWasteKg + 1;

          return {
            ...prev,
            totalWasteEvents: newEvents,
            segregationAccuracy: newAccuracy,
            contaminationRate: newContamination,
            recyclableWasteKg: newKg
          };
        });

        if (currentEvent?.isContaminated) {
          showToast(`⚠️ Contamination Alert: ${currentEvent.object} at ${currentEvent.location}`, 'error');
        }

        return nextIndex;
      });
    }, 3800);
  };

  const stopDemo = () => {
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
    setIsDemoRunning(false);
    showToast('Camera stream paused.', 'info');
  };

  const selectDetection = (index) => {
    setActiveDetectionIndex(index);
  };

  // -----------------------------
  // Instant Image Upload & Detection Analysis
  // -----------------------------
  const analyzeUploadedImage = (fileData, customDetails = {}) => {
    const timeNow = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    const id = `DET-${Math.floor(100 + Math.random() * 900)}`;

    const newDetection = {
      id,
      object: customDetails.object || 'Analyzed Item',
      confidence: customDetails.confidence || Math.floor(92 + Math.random() * 7),
      category: customDetails.category || 'Dry Waste',
      classificationId: customDetails.classificationId || 'dry',
      binUsed: customDetails.binUsed || 'Blue Bin (Dry)',
      status: customDetails.isContaminated ? 'Incorrect' : 'Correct',
      isContaminated: !!customDetails.isContaminated,
      expectedCategory: customDetails.expectedCategory || 'Dry Waste',
      detectedCategory: customDetails.detectedCategory || (customDetails.isContaminated ? 'Wet Contamination' : 'Clean Recyclable'),
      location: customDetails.location || 'Device Camera Station',
      timestamp: timeNow,
      box: customDetails.box || { x: 25, y: 25, width: 50, height: 50 },
      details: customDetails.details || 'Real-time camera optical recognition processed. Ready for disposal verification.',
      rewardValue: customDetails.rewardValue || '₹2.50',
      imageUrl: customDetails.imageUrl || fileData,
      isUserUpload: true
    };

    setAiEvents((prev) => [newDetection, ...prev]);
    setActiveDetectionIndex(0);

    // Update stats
    setCampusStats((prev) => ({
      ...prev,
      totalWasteEvents: prev.totalWasteEvents + 1,
      recyclableWasteKg: customDetails.isContaminated ? prev.recyclableWasteKg : prev.recyclableWasteKg + 1
    }));

    showToast(`Instant Detection Complete: ${newDetection.object} (${newDetection.confidence}%)`, 'success');
    return newDetection;
  };

  // -----------------------------
  // AI Detection Correction Tool
  // -----------------------------
  const correctDetection = (detectionId, correctedCategory, correctedObjectName, notes = '') => {
    const classMap = {
      'Wet Waste': 'wet',
      'Dry Waste': 'dry',
      'Sanitary Waste': 'sanitary',
      'Special / E-Waste': 'special',
      'Special Waste': 'special'
    };

    const classId = classMap[correctedCategory] || 'dry';
    const binMap = {
      wet: 'Green Bin (Wet)',
      dry: 'Blue Bin (Dry)',
      sanitary: 'Red Bin (Sanitary)',
      special: 'Orange Bin (Special)'
    };

    setAiEvents((prev) =>
      prev.map((evt) => {
        if (evt.id === detectionId) {
          return {
            ...evt,
            category: correctedCategory,
            classificationId: classId,
            object: correctedObjectName || evt.object,
            binUsed: binMap[classId] || evt.binUsed,
            status: 'Correct',
            isContaminated: false,
            userCorrected: true,
            correctionNotes: notes,
            details: `Manually verified & corrected: ${correctedObjectName || evt.object}. Categorized as ${correctedCategory}.`
          };
        }
        return evt;
      })
    );

    // Update model accuracy score
    setCampusStats((prev) => ({
      ...prev,
      segregationAccuracy: Math.min(99.5, +(prev.segregationAccuracy + 0.2).toFixed(1)),
      contaminationRate: Math.max(0.5, +(prev.contaminationRate - 0.2).toFixed(1))
    }));

    showToast(`Detection corrected! Model accuracy feedback logged (+0.2% fine-tuning) 🎯`, 'success');
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
      }
    };
  }, []);

  // Auth functions
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
      address: userData.address || 'Academic Block 4, North Campus',
      city: userData.city || 'Bengaluru',
      pincode: userData.pincode || '560034',
      memberSince: new Date().toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    };

    setUser(newUser);
    showToast('Account created successfully! Welcome to Trash2Cash AI ♻️', 'success');
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ttc_user');
    showToast('You have been logged out.', 'info');
  };

  const value = {
    user,
    rates: WASTE_RATES,
    categories: WASTE_CATEGORIES,
    upcomingPickups,
    transactions,
    stats,
    toast,
    campusStats,
    aiEvents,
    activeDetectionIndex,
    activeDetection: aiEvents[activeDetectionIndex] || aiEvents[0],
    isDemoRunning,
    startDemo,
    stopDemo,
    selectDetection,
    analyzeUploadedImage,
    correctDetection,
    classifications: AI_WASTE_CLASSIFICATIONS,
    locations: CAMPUS_LOCATIONS,
    cleanliness: CAMPUS_CLEANLINESS_DATA,
    aiInsights: AI_CAMPUS_INSIGHTS,
    qrTracking: QR_TRACKING_SAMPLES,
    schedulePickup,
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