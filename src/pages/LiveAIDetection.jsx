import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Camera,
  Upload,
  Sparkles,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  RotateCcw,
  History,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  Info,
  Scale,
  DollarSign,
  Layers,
  Check,
  Zap,
  Wallet,
  MapPin,
  BarChart3,
  ChevronRight,
  FileCheck2,
  Truck,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { classifyWasteImage } from '../services/aiClassifier';
import {
  MANUAL_CATEGORIES,
  getMaterialConfig,
  calculateEstimatedValue
} from '../data/materialConfig';

// Realistic sample waste vector graphics for 1-click demo testing in AI Mode
const SAMPLE_TEST_ITEMS = [
  {
    id: 'sample-bottle',
    label: 'Plastic Bottle',
    icon: '🥤',
    categoryHint: 'plastic',
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" fill="%23f0fdf4"/><path d="M145 40 h30 v25 h-30 z" fill="%232563eb"/><path d="M135 65 h50 v25 l20 35 v125 c0 15 -10 20 -25 20 h-40 c-15 0 -25 -5 -25 -20 v-125 l20 -35 z" fill="%2393c5fd" opacity="0.85" stroke="%231d4ed8" stroke-width="4"/><path d="M145 140 h30 v35 h-30 z" fill="%232563eb"/><text x="160" y="295" font-family="sans-serif" font-size="15" font-weight="bold" fill="%231e3a8a" text-anchor="middle">PET Water Bottle</text></svg>`
  },
  {
    id: 'sample-box',
    label: 'Cardboard Box',
    icon: '📦',
    categoryHint: 'cardboard',
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" fill="%23fffbeb"/><path d="M70 100 l90 -45 l90 45 l-90 45 z" fill="%23fde68a" stroke="%23d97706" stroke-width="4"/><path d="M70 100 v90 l90 45 v-90 z" fill="%23fcd34d" stroke="%23d97706" stroke-width="4"/><path d="M250 100 v90 l-90 45 v-90 z" fill="%23fbbf24" stroke="%23d97706" stroke-width="4"/><text x="160" y="295" font-family="sans-serif" font-size="15" font-weight="bold" fill="%2392400e" text-anchor="middle">Corrugated Cardboard</text></svg>`
  },
  {
    id: 'sample-can',
    label: 'Aluminium Can',
    icon: '🥫',
    categoryHint: 'can',
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" fill="%23f8fafc"/><ellipse cx="160" cy="70" rx="45" ry="16" fill="%23cbd5e1" stroke="%23475569" stroke-width="4"/><path d="M115 70 v140 c0 15 20 20 45 20 s45 -5 45 -20 v-140 z" fill="%2394a3b8" stroke="%23475569" stroke-width="4"/><ellipse cx="160" cy="140" rx="45" ry="12" fill="%23ef4444"/><text x="160" y="295" font-family="sans-serif" font-size="15" font-weight="bold" fill="%23334155" text-anchor="middle">Aluminium Can</text></svg>`
  },
  {
    id: 'sample-banana',
    label: 'Organic Waste',
    icon: '🍌',
    categoryHint: 'banana',
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" fill="%23fefce8"/><path d="M80 210 C 110 250, 210 250, 245 115 C 245 115, 235 160, 170 200 C 120 230, 90 215, 80 210 Z" fill="%23eab308" stroke="%23ca8a04" stroke-width="4"/><circle cx="245" cy="115" r="5" fill="%23713f12"/><text x="160" y="295" font-family="sans-serif" font-size="15" font-weight="bold" fill="%23854d0e" text-anchor="middle">Banana Peel / Organic</text></svg>`
  },
  {
    id: 'sample-battery',
    label: 'E-Waste / Battery',
    icon: '🔋',
    categoryHint: 'battery',
    image: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320"><rect width="320" height="320" fill="%23fff1f2"/><rect x="145" y="55" width="30" height="15" fill="%23e11d48" rx="3"/><rect x="120" y="70" width="80" height="150" fill="%230f172a" stroke="%23e11d48" stroke-width="4" rx="8"/><rect x="120" y="160" width="80" height="60" fill="%23f43f5e"/><text x="160" y="145" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">⚡ 9V</text><text x="160" y="295" font-family="sans-serif" font-size="15" font-weight="bold" fill="%23be123c" text-anchor="middle">Lithium Battery</text></svg>`
  }
];

const LiveAIDetection = () => {
  const { walletBalance, scheduleWastePickup, completePickup, showToast } = useApp();
  const navigate = useNavigate();

  // -------------------------------------------------------------
  // SUBMISSION MODE: 'ai' (Option 1) vs 'manual' (Option 2)
  // -------------------------------------------------------------
  const [submissionMode, setSubmissionMode] = useState('ai');

  // Source tab for AI Mode: 'upload' | 'camera'
  const [activeTab, setActiveTab] = useState('upload');

  // Input Image States
  const [selectedImage, setSelectedImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [selectedSampleId, setSelectedSampleId] = useState(null);

  // Manual Mode Category Selection
  const [manualSelectedCatId, setManualSelectedCatId] = useState('');

  // Camera states
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment');

  // AI Classification state
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiDetectionResult, setAiDetectionResult] = useState(null);
  const [scanError, setScanError] = useState(null);

  // -------------------------------------------------------------
  // 3-STEP TRASH2CASH WORKFLOW STATES
  // Step 1: Capture & Classify
  // Step 2: Verify & Reward
  // Step 3: Engage & Improve
  // -------------------------------------------------------------
  const [workflowStep, setWorkflowStep] = useState(0); // 0 = not started, 1 = classify, 2 = verify, 3 = engage
  const [stagedItem, setStagedItem] = useState(null);

  // Stage 2 inputs: Weight & Location
  const [weightKg, setWeightKg] = useState(0.25); // Default 0.25 kg matching prompt
  const [location, setLocation] = useState('Flat 402, Green Meadows, Bengaluru');

  // Stage 3 Output: Summary of submitted pickup & worker handover
  const [scheduledPickupData, setScheduledPickupData] = useState(null);
  const [workerPickupCompleted, setWorkerPickupCompleted] = useState(false);

  // Refs
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const manualFileInputRef = useRef(null);
  const workflowRef = useRef(null);

  // Cleanup camera on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // -------------------------------------------------------------
  // CAMERA METHODS
  // -------------------------------------------------------------
  const startCamera = async (mode = facingMode) => {
    setCameraLoading(true);
    setCameraError(null);
    stopCamera();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: mode, width: { ideal: 1280 }, height: { ideal: 720 } },
        audio: false
      }).catch(() => {
        return navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      });

      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setCameraActive(true);
      setCameraLoading(false);
    } catch (err) {
      console.error('Webcam start failed:', err);
      setCameraLoading(false);
      setCameraActive(false);
      setCameraError('Camera access denied or unavailable. Please use the Upload Photo tab.');
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const switchCameraFacing = () => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    if (cameraActive) {
      startCamera(next);
    }
  };

  const captureFrameFromCamera = () => {
    if (!videoRef.current) return null;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
    setSelectedImage(dataUrl);
    setFileName('Camera_Snapshot.jpg');
    setSelectedSampleId(null);
    return dataUrl;
  };

  // -------------------------------------------------------------
  // FILE UPLOAD HANDLERS
  // -------------------------------------------------------------
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file (JPG, PNG, WEBP).', 'error');
      return;
    }

    setFileName(file.name);
    setSelectedSampleId(null);
    setAiDetectionResult(null);
    setScanError(null);
    setWorkflowStep(0);
    setStagedItem(null);
    setSubmissionOutcome(null);

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setSelectedImage(sample.image);
    setFileName(`${sample.categoryHint}.svg`);
    setAiDetectionResult(null);
    setScanError(null);
    setWorkflowStep(0);
    setStagedItem(null);
    setSubmissionOutcome(null);
  };

  // -------------------------------------------------------------
  // OPTION 1: RUN AI DETECTION
  // -------------------------------------------------------------
  const handleRunAiScan = async () => {
    let imageToScan = selectedImage;

    // If currently in camera tab with live video and no frame captured yet, capture now
    if (activeTab === 'camera' && cameraActive && !imageToScan) {
      imageToScan = captureFrameFromCamera();
    }

    if (!imageToScan) {
      setScanError('Please upload or capture an image first.');
      showToast('Please upload or capture an image first.', 'warning');
      return;
    }

    setIsAnalyzing(true);
    setScanError(null);

    try {
      // Run genuine AI classification
      const result = await classifyWasteImage(imageToScan, fileName);
      setAiDetectionResult(result);

      // Determine material rate per kg
      const config = getMaterialConfig(result.categoryKey);
      const ratePerKg = config.valuePerKg || 0;

      // Stage item for the 3-step Trash2Cash workflow
      const item = {
        wasteType: result.wasteType,
        material: result.material,
        category: result.category,
        categoryKey: result.categoryKey,
        confidence: result.confidence,
        isManual: false,
        recyclable: result.recyclable,
        ratePerKg: ratePerKg,
        imageUrl: imageToScan,
        defaultWeight: config.avgUnitWeightKg || 0.25
      };

      setStagedItem(item);
      setWeightKg(item.defaultWeight);
      setWorkflowStep(1); // Advance to Stage 1: Capture & Classify

      if (result.isLowConfidence) {
        showToast('Low confidence detection. Please review the material.', 'warning');
      } else {
        showToast(`AI Detected: ${result.wasteType} (${result.confidence}%)`, 'success');
      }

      // Smooth scroll to 3-step section
      setTimeout(() => {
        workflowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    } catch (err) {
      console.error('Classification error:', err);
      setScanError(err.message || 'Detection failed. Please try a clearer image.');
      showToast('Detection failed. Please check image quality.', 'error');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // -------------------------------------------------------------
  // OPTION 2: MANUAL CATEGORY SELECTION
  // -------------------------------------------------------------
  const handleSelectManualCategory = (cat) => {
    setManualSelectedCatId(cat.id);
    const config = getMaterialConfig(cat.id);

    const item = {
      wasteType: cat.wasteType || config.wasteType,
      material: cat.material || config.material,
      category: cat.label,
      categoryKey: cat.id,
      confidence: 'Manual Selection',
      isManual: true,
      recyclable: cat.recyclable,
      ratePerKg: cat.rate,
      imageUrl: selectedImage,
      defaultWeight: config.avgUnitWeightKg || 0.25
    };

    setStagedItem(item);
    setWeightKg(item.defaultWeight);
    setWorkflowStep(1); // Advance to Stage 1: Capture & Classify

    showToast(`Category selected: ${cat.label} (₹${cat.rate}/kg)`, 'success');

    setTimeout(() => {
      workflowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 150);
  };

  // -------------------------------------------------------------
  // 3-STEP PROCESS: ADVANCE / CONFIRM / SUBMIT
  // -------------------------------------------------------------
  const handleConfirmWaste = () => {
    // Moves from Stage 1 (Capture & Classify) to Stage 2 (Verify & Reward)
    setWorkflowStep(2);
    setTimeout(() => {
      workflowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Calculate live deterministic reward: Weight (kg) × Rate (₹/kg) = Reward (₹)
  const currentRate = stagedItem?.ratePerKg || 0;
  const isRecyclable = Boolean(stagedItem?.recyclable);
  const calculatedReward = isRecyclable
    ? Math.round(Number(weightKg || 0) * Number(currentRate || 0))
    : 0;

  const handleScheduleWorkerPickup = () => {
    if (!stagedItem) return;

    // Schedules pickup with worker (Money will be credited in User Dashboard upon worker pickup)
    const result = scheduleWastePickup({
      wasteType: stagedItem.wasteType,
      material: stagedItem.material,
      category: stagedItem.category,
      categoryKey: stagedItem.categoryKey,
      confidence: stagedItem.confidence,
      isManual: stagedItem.isManual,
      weightKg: Number(weightKg),
      ratePerKg: stagedItem.ratePerKg,
      rewardAmount: calculatedReward,
      location: location || 'Flat 402, Green Meadows, Bengaluru',
      imageUrl: selectedImage
    });

    setScheduledPickupData(result.newPickup);
    setWorkerPickupCompleted(false);
    setWorkflowStep(3); // Advance to Stage 3: Worker Pickup Tracking

    setTimeout(() => {
      workflowRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleCompleteWorkerHandoverNow = () => {
    if (!scheduledPickupData) return;
    const outcome = completePickup(scheduledPickupData.id);
    if (outcome) {
      setWorkerPickupCompleted(true);
    }
  };

  const handleResetScan = () => {
    setSelectedImage(null);
    setFileName('');
    setAiDetectionResult(null);
    setSelectedSampleId(null);
    setManualSelectedCatId('');
    setScanError(null);
    setWorkflowStep(0);
    setStagedItem(null);
    setScheduledPickupData(null);
    setWorkerPickupCompleted(false);
    setWeightKg(0.25);
  };

  return (
    <div className="page-wrapper ai-detection-page">
      <div className="container">
        {/* COMPACT CLEAN HEADER */}
        <div className="detection-header-block text-center">
          <span className="badge-pill-simple">
            <Sparkles size={14} /> Smart Waste Detection & Rewards
          </span>
          <h1 className="simple-page-title">Submit Waste to Trash2Cash</h1>
          <p className="simple-page-sub">
            Identify waste items, verify recyclability, and earn instant cash rewards deposited directly to your wallet.
          </p>
        </div>

        {/* ============================================================== */}
        {/* TWO WAYS TO SUBMIT WASTE: TAB SELECTOR */}
        {/* ============================================================== */}
        <div className="submission-mode-selector">
          <button
            onClick={() => {
              setSubmissionMode('ai');
              handleResetScan();
            }}
            className={`mode-selector-btn ${submissionMode === 'ai' ? 'mode-active' : ''}`}
          >
            <span className="mode-btn-icon">🤖</span>
            <div className="mode-btn-text">
              <strong>Option 1: AI Detection</strong>
              <small>Auto-detects material & recyclability via AI Vision</small>
            </div>
          </button>

          <button
            onClick={() => {
              setSubmissionMode('manual');
              stopCamera();
              handleResetScan();
            }}
            className={`mode-selector-btn ${submissionMode === 'manual' ? 'mode-active' : ''}`}
          >
            <span className="mode-btn-icon">✍️</span>
            <div className="mode-btn-text">
              <strong>Option 2: Manual Image Upload</strong>
              <small>Upload photo & select material category directly</small>
            </div>
          </button>
        </div>

        {/* ============================================================== */}
        {/* OPTION 1: AI DETECTION SCANNER CARD */}
        {/* ============================================================== */}
        {submissionMode === 'ai' && (
          <div className="scanner-main-card">
            {/* Source Tabs */}
            <div className="scanner-tabs-row">
              <button
                onClick={() => {
                  setActiveTab('upload');
                  stopCamera();
                }}
                className={`scanner-tab-btn ${activeTab === 'upload' ? 'tab-active' : ''}`}
              >
                <Upload size={17} />
                <span>Upload Photo</span>
              </button>

              <button
                onClick={() => {
                  setActiveTab('camera');
                  if (!cameraActive) startCamera();
                }}
                className={`scanner-tab-btn ${activeTab === 'camera' ? 'tab-active' : ''}`}
              >
                <Camera size={17} />
                <span>Use Camera</span>
              </button>
            </div>

            {/* VIEWPORT AREA */}
            <div className="scanner-viewport-box">
              {activeTab === 'camera' ? (
                <div className="camera-live-viewport">
                  {cameraLoading && (
                    <div className="viewport-overlay-state">
                      <RefreshCw size={32} className="animate-spin text-green mb-2" />
                      <p>Starting device camera...</p>
                    </div>
                  )}

                  {cameraError && (
                    <div className="viewport-overlay-state">
                      <AlertTriangle size={36} className="text-red mb-2" />
                      <p>{cameraError}</p>
                      <button
                        onClick={() => setActiveTab('upload')}
                        className="btn-secondary btn-sm mt-3"
                      >
                        Switch to Upload Tab
                      </button>
                    </div>
                  )}

                  {!cameraActive && !cameraLoading && !cameraError && (
                    <div className="viewport-overlay-state">
                      <Camera size={44} className="text-muted mb-2" />
                      <p>Camera is currently inactive</p>
                      <button onClick={() => startCamera()} className="btn-primary btn-sm mt-2">
                        Start Camera
                      </button>
                    </div>
                  )}

                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`camera-video-elem ${cameraActive ? 'elem-visible' : 'elem-hidden'}`}
                  />

                  {cameraActive && (
                    <div className="camera-overlay-controls">
                      <button
                        onClick={switchCameraFacing}
                        className="btn-cam-switch"
                        title="Switch Camera (Front/Rear)"
                      >
                        <RotateCcw size={16} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="upload-drop-viewport">
                  {selectedImage ? (
                    <div className="image-preview-wrapper">
                      <img src={selectedImage} alt="Selected waste" className="preview-image" />
                      <button
                        onClick={handleResetScan}
                        className="btn-remove-image"
                        title="Remove image"
                      >
                        ✕ Change Photo
                      </button>
                    </div>
                  ) : (
                    <div
                      className="upload-drop-target"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={40} className="text-green mb-2" />
                      <h3>Drop waste image here, or browse</h3>
                      <p>Supports JPG, PNG, WEBP</p>
                      <button type="button" className="btn-secondary btn-sm mt-3">
                        Choose Image File
                      </button>
                    </div>
                  )}

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>
              )}
            </div>

            {/* ERROR ALERT IF NO IMAGE */}
            {scanError && (
              <div className="scan-error-alert">
                <AlertTriangle size={16} className="text-red" />
                <span>{scanError}</span>
              </div>
            )}

            {/* PRIMARY SCAN BUTTON */}
            <div className="scanner-action-bar">
              {activeTab === 'camera' && cameraActive && !selectedImage && (
                <button
                  onClick={() => {
                    captureFrameFromCamera();
                  }}
                  className="btn-secondary"
                >
                  <Camera size={18} />
                  <span>Capture Frame</span>
                </button>
              )}

              <button
                onClick={handleRunAiScan}
                disabled={isAnalyzing || (!selectedImage && !cameraActive)}
                className="btn-primary btn-scan-waste"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw size={18} className="animate-spin" />
                    <span>Analyzing waste with AI...</span>
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    <span>Scan Waste with AI</span>
                  </>
                )}
              </button>

              {selectedImage && (
                <button onClick={handleResetScan} className="btn-secondary">
                  Reset
                </button>
              )}
            </div>

            {/* 1-CLICK DEMO TEST CHIPS */}
            <div className="quick-test-strip">
              <span className="quick-test-label">Quick Test Presets:</span>
              <div className="quick-test-chips">
                {SAMPLE_TEST_ITEMS.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelectSample(item)}
                    className={`test-chip-btn ${selectedSampleId === item.id ? 'chip-active' : ''}`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* OPTION 2: MANUAL IMAGE UPLOAD WORKFLOW */}
        {/* ============================================================== */}
        {submissionMode === 'manual' && (
          <div className="manual-upload-card">
            <div className="manual-upload-header">
              <div className="manual-step-badge">Manual Submission Flow</div>
              <h2>Upload Waste Image & Select Material Category</h2>
              <p>
                Take or upload a photo of your waste item, then pick the matching category below.
              </p>
            </div>

            {/* Dropzone / Upload area */}
            <div className="manual-image-drop-area">
              {selectedImage ? (
                <div className="manual-preview-container">
                  <img src={selectedImage} alt="Uploaded waste" className="manual-preview-img" />
                  <div className="manual-preview-actions">
                    <button
                      onClick={() => manualFileInputRef.current?.click()}
                      className="btn-secondary btn-sm"
                    >
                      <Upload size={14} /> Change Photo
                    </button>
                    <button onClick={handleResetScan} className="btn-secondary btn-sm text-red">
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <div
                  className="manual-drop-target"
                  onClick={() => manualFileInputRef.current?.click()}
                >
                  <Upload size={44} className="text-green mb-2" />
                  <h3>Upload photo of your recyclable or waste</h3>
                  <p>Click to browse from your device (JPG, PNG, WEBP)</p>
                  <button type="button" className="btn-primary btn-sm mt-3">
                    Select Photo
                  </button>
                </div>
              )}

              <input
                ref={manualFileInputRef}
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>

            {/* 7 Canonical Waste Categories Selector */}
            <div className="manual-category-section">
              <div className="category-section-title">
                <span className="step-num-bubble">2</span>
                <div>
                  <h3>Select Waste Category:</h3>
                  <p>Choose the material that matches your uploaded waste item.</p>
                </div>
              </div>

              <div className="manual-category-grid">
                {MANUAL_CATEGORIES.map((cat) => {
                  const isSelected = manualSelectedCatId === cat.id;
                  return (
                    <div
                      key={cat.id}
                      onClick={() => handleSelectManualCategory(cat)}
                      className={`cat-card ${isSelected ? 'cat-card-selected' : ''}`}
                    >
                      <div className="cat-card-top">
                        <span className="cat-icon">{cat.icon}</span>
                        <div className="cat-rate-tag">
                          {cat.rate > 0 ? `₹${cat.rate}/kg` : 'Free / Eco'}
                        </div>
                      </div>
                      <h4 className="cat-title">{cat.label}</h4>
                      <p className="cat-sub">{cat.subtext}</p>
                      <div className="cat-badge-row">
                        {cat.recyclable ? (
                          <span className="badge-tag-recyclable">✓ Cash Eligible</span>
                        ) : (
                          <span className="badge-tag-compost">Compostable</span>
                        )}
                        <input
                          type="radio"
                          name="wasteCategory"
                          checked={isSelected}
                          onChange={() => {}}
                          className="cat-radio"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* THE 3-STEP TRASH2CASH PROCESS (ONLY APPEARS AFTER IMAGE READY) */}
        {/* ============================================================== */}
        {stagedItem && workflowStep > 0 && (
          <div ref={workflowRef} className="trash2cash-process-container">
            {/* Visual Process Stepper */}
            <div className="process-stepper-bar">
              <div className={`stepper-step ${workflowStep >= 1 ? 'step-active' : ''} ${workflowStep > 1 ? 'step-done' : ''}`}>
                <div className="stepper-circle">{workflowStep > 1 ? '✓' : '1'}</div>
                <div className="stepper-meta">
                  <span className="stepper-title">Capture & Classify</span>
                  <small className="stepper-status">
                    {workflowStep === 1 ? 'Current' : 'Verified'}
                  </small>
                </div>
              </div>

              <div className={`stepper-connector ${workflowStep >= 2 ? 'conn-active' : ''}`}></div>

              <div className={`stepper-step ${workflowStep >= 2 ? 'step-active' : ''} ${workflowStep > 2 ? 'step-done' : ''}`}>
                <div className="stepper-circle">{workflowStep > 2 ? '✓' : '2'}</div>
                <div className="stepper-meta">
                  <span className="stepper-title">Verify & Reward</span>
                  <small className="stepper-status">
                    {workflowStep === 2 ? 'Current' : workflowStep > 2 ? 'Calculated' : 'Pending'}
                  </small>
                </div>
              </div>

              <div className={`stepper-connector ${workflowStep >= 3 ? 'conn-active' : ''}`}></div>

              <div className={`stepper-step ${workflowStep === 3 ? 'step-active' : ''}`}>
                <div className="stepper-circle">3</div>
                <div className="stepper-meta">
                  <span className="stepper-title">Engage & Improve</span>
                  <small className="stepper-status">
                    {workflowStep === 3 ? 'Rewarded 🎉' : 'Pending'}
                  </small>
                </div>
              </div>
            </div>

            {/* ---------------------------------------------------------- */}
            {/* STAGE 1: CAPTURE & CLASSIFY */}
            {/* ---------------------------------------------------------- */}
            {workflowStep === 1 && (
              <div className="workflow-card stage-card-1 animate-fade-in">
                <div className="stage-header-row">
                  <div className="stage-title-wrap">
                    <span className="stage-tag">Stage 1 of 3</span>
                    <h2 className="stage-heading">Capture & Classify</h2>
                    <p className="stage-subheading">
                      Review the detected item details and material recyclability.
                    </p>
                  </div>
                  <div className="stage-source-badge">
                    {stagedItem.isManual ? 'Manual Selection' : 'AI Vision Classifier'}
                  </div>
                </div>

                <div className="stage-1-details-grid">
                  {selectedImage && (
                    <div className="stage-1-image-box">
                      <img src={selectedImage} alt="Classified item" className="stage-item-preview" />
                    </div>
                  )}

                  <div className="stage-1-info-box">
                    <div className="info-badge-row">
                      <span className="category-pill-lg">{stagedItem.category}</span>
                      {stagedItem.recyclable ? (
                        <span className="stamp-yes">
                          <CheckCircle2 size={16} /> Recyclable (Cash Payout)
                        </span>
                      ) : (
                        <span className="stamp-no">
                          <XCircle size={16} /> Non-Recyclable / Compost
                        </span>
                      )}
                    </div>

                    <h3 className="detected-item-name">{stagedItem.wasteType}</h3>

                    <div className="classified-specs-list">
                      <div className="spec-row">
                        <span className="spec-label">Material:</span>
                        <strong className="spec-value">{stagedItem.material}</strong>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Confidence:</span>
                        <strong className="spec-value text-blue">
                          {typeof stagedItem.confidence === 'number'
                            ? `${stagedItem.confidence}%`
                            : stagedItem.confidence}
                        </strong>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Base Rate:</span>
                        <strong className="spec-value text-green">
                          {stagedItem.ratePerKg > 0 ? `₹${stagedItem.ratePerKg}/kg` : 'Eco Credits'}
                        </strong>
                      </div>
                      <div className="spec-row">
                        <span className="spec-label">Typical Unit Weight:</span>
                        <strong className="spec-value">{stagedItem.defaultWeight} kg</strong>
                      </div>
                    </div>

                    <div className="stage-action-buttons">
                      <button onClick={handleConfirmWaste} className="btn-primary btn-lg">
                        <span>Confirm Waste</span>
                        <ArrowRight size={18} />
                      </button>
                      <button onClick={handleResetScan} className="btn-secondary">
                        <RotateCcw size={16} />
                        <span>Scan Again / Retake</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------- */}
            {/* STAGE 2: VERIFY & SELL WASTE VIA WORKER PICKUP */}
            {/* ---------------------------------------------------------- */}
            {workflowStep === 2 && (
              <div className="workflow-card stage-card-2 animate-fade-in">
                <div className="stage-header-row">
                  <div className="stage-title-wrap">
                    <span className="stage-tag">Stage 2 of 3</span>
                    <h2 className="stage-heading">Verify & Sell Waste via Worker Pickup</h2>
                    <p className="stage-subheading">
                      Confirm weight and collection address to sell your waste. Money is credited to your User Dashboard after pickup by worker.
                    </p>
                  </div>
                  <button onClick={() => setWorkflowStep(1)} className="btn-secondary btn-sm">
                    <ArrowLeft size={14} /> Back to Classify
                  </button>
                </div>

                <div className="stage-2-form-grid">
                  {/* Left Column: Inputs */}
                  <div className="stage-2-inputs-col">
                    <div className="form-group">
                      <label className="form-label">
                        <Scale size={16} className="text-green" />
                        <span>Confirm Weight (kg)</span>
                      </label>
                      <div className="weight-input-wrapper">
                        <input
                          type="number"
                          step="0.05"
                          min="0.05"
                          max="100"
                          value={weightKg}
                          onChange={(e) => setWeightKg(Math.max(0.01, parseFloat(e.target.value) || 0))}
                          className="form-input weight-number-input"
                        />
                        <span className="weight-unit-badge">KG</span>
                      </div>
                      <div className="quick-weight-chips">
                        {[0.25, 0.5, 1.0, 2.5, 5.0].map((w) => (
                          <button
                            key={w}
                            type="button"
                            onClick={() => setWeightKg(w)}
                            className={`weight-chip ${Number(weightKg) === w ? 'chip-selected' : ''}`}
                          >
                            {w} kg
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="form-group mt-3">
                      <label className="form-label">
                        <MapPin size={16} className="text-green" />
                        <span>Doorstep Collection Address</span>
                      </label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="e.g. Flat 402, Green Meadows, Bengaluru"
                        className="form-input"
                      />
                    </div>
                  </div>

                  {/* Right Column: Live Deterministic Math Calculation & Worker Policy */}
                  <div className="stage-2-math-col">
                    <div className="calculation-box">
                      <div className="calc-header">
                        <DollarSign size={18} className="text-green" />
                        <span>Deterministic Scrap Valuation</span>
                      </div>

                      <div className="calc-formula-display">
                        <div className="formula-tag">Weight (kg) × Material Rate (₹/kg) = Payout</div>
                        <div className="formula-numbers">
                          <span className="f-num">{weightKg} kg</span>
                          <span className="f-sym">×</span>
                          <span className="f-num">₹{stagedItem.ratePerKg}/kg</span>
                          <span className="f-sym">=</span>
                          <span className="f-res">₹{calculatedReward}</span>
                        </div>
                      </div>

                      <div className="calc-summary-rows">
                        <div className="summary-row">
                          <span>Material Type:</span>
                          <strong>{stagedItem.material}</strong>
                        </div>
                        <div className="summary-row">
                          <span>Current Dashboard Wallet:</span>
                          <strong>₹{walletBalance}</strong>
                        </div>
                        <div className="summary-row highlight-row">
                          <span>Projected Wallet After Worker Pickup:</span>
                          <strong className="text-green">₹{walletBalance + calculatedReward}</strong>
                        </div>
                      </div>

                      {/* Worker Collection Notice */}
                      <div className="worker-pickup-note">
                        <Truck size={16} className="text-green flex-shrink-0" />
                        <span>
                          Doorstep worker <strong>Ramesh Kumar</strong> will collect and weigh this waste. ₹{calculatedReward} will be credited to your <strong>User Dashboard Wallet</strong> upon pickup.
                        </span>
                      </div>

                      <button
                        onClick={handleScheduleWorkerPickup}
                        className="btn-primary btn-lg btn-reward-submit"
                      >
                        <Truck size={18} />
                        <span>Sell Waste & Request Worker Pickup (₹{calculatedReward})</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ---------------------------------------------------------- */}
            {/* STAGE 3: DOORSTEP WORKER PICKUP SCHEDULED */}
            {/* ---------------------------------------------------------- */}
            {workflowStep === 3 && scheduledPickupData && (
              <div className="workflow-card stage-card-3 animate-bounce-in">
                <div className="reward-celebration-banner">
                  <div className="celebrate-icon-wrap">🚚</div>
                  <h2 className="celebrate-title">Doorstep Worker Pickup Scheduled!</h2>
                  <p className="celebrate-sub">
                    Your waste has been registered for sale. Doorstep recycling partner <strong>Ramesh Kumar</strong> is assigned to collect and verify your waste.
                  </p>
                </div>

                <div className="reward-payout-spotlight">
                  <div className="payout-amount-box">
                    <span className="payout-label">Payout to be Credited</span>
                    <h1 className="payout-value">₹{scheduledPickupData.estimatedEarnings}</h1>
                    <span className={workerPickupCompleted ? "payout-badge" : "payout-badge-pending"}>
                      {workerPickupCompleted ? "✓ Credited to Dashboard Wallet ⚡" : "⏳ Credited on Worker Collection"}
                    </span>
                  </div>

                  <div className="wallet-transition-box">
                    <div className="worker-assignment-card">
                      <div className="worker-avatar-row">
                        <div className="worker-avatar-icon">👷‍♂️</div>
                        <div>
                          <strong>{scheduledPickupData.agentName}</strong>
                          <p className="text-xs text-muted">Recycle Partner • {scheduledPickupData.agentPhone}</p>
                        </div>
                      </div>
                      <div className="worker-pickup-schedule-time">
                        <Clock size={14} className="text-green" />
                        <span>Pickup Slot: <strong>{scheduledPickupData.timeSlot}</strong></span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="verified-metadata-grid">
                  <div className="v-meta-card">
                    <span className="v-label">Waste Item</span>
                    <strong className="v-val">{scheduledPickupData.wasteType}</strong>
                  </div>
                  <div className="v-meta-card">
                    <span className="v-label">Scheduled Weight</span>
                    <strong className="v-val">{scheduledPickupData.quantity} kg</strong>
                  </div>
                  <div className="v-meta-card">
                    <span className="v-label">Scrap Rate</span>
                    <strong className="v-val">₹{scheduledPickupData.rate}/kg</strong>
                  </div>
                  <div className="v-meta-card">
                    <span className="v-label">Pickup ID</span>
                    <strong className="v-val text-truncate">{scheduledPickupData.id}</strong>
                  </div>
                </div>

                {/* Eco Improvement Tip */}
                <div className="eco-improvement-tip">
                  <div className="tip-header">
                    <Truck size={16} className="text-green" />
                    <strong>Worker Pickup Guidelines</strong>
                  </div>
                  <p>
                    Keep your {scheduledPickupData.wasteType} packed and accessible at <strong>{scheduledPickupData.address}</strong>. The worker will verify the scrap, after which the earnings will reflect in your User Dashboard wallet!
                  </p>
                </div>

                {/* Navigation Actions */}
                <div className="stage-3-actions">
                  <Link to="/dashboard" className="btn-primary btn-lg">
                    <LayoutDashboard size={17} />
                    <span>Go to User Dashboard (View Pickup & Wallet)</span>
                    <ArrowRight size={17} />
                  </Link>

                  {!workerPickupCompleted ? (
                    <button onClick={handleCompleteWorkerHandoverNow} className="btn-secondary">
                      <CheckCircle2 size={16} className="text-green" />
                      <span>Worker Here? Confirm Pickup & Add ₹{scheduledPickupData.estimatedEarnings} to Dashboard</span>
                    </button>
                  ) : (
                    <div className="completed-worker-pill">
                      <CheckCircle2 size={16} className="text-green" />
                      <span>✓ Worker Handover Completed! ₹{scheduledPickupData.estimatedEarnings} added to Dashboard Wallet.</span>
                    </div>
                  )}

                  <Link to="/history" className="btn-secondary">
                    <History size={16} />
                    <span>View History</span>
                  </Link>

                  <button onClick={handleResetScan} className="btn-secondary">
                    <RotateCcw size={16} />
                    <span>Sell Another Waste Item</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveAIDetection;
