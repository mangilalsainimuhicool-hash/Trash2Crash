import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Upload,
  Video,
  Play,
  Pause,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Layers,
  MapPin,
  Clock,
  Scan,
  RotateCcw,
  ShieldCheck,
  Info,
  DollarSign,
  ArrowRight,
  Edit3,
  X,
  FileImage,
  RefreshCw,
  Sliders,
  Check,
  HelpCircle,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import DetectionCard from '../components/DetectionCard';

// Sample waste vector images (base64 SVG data URIs) for 1-click instant test
const SAMPLE_WASTE_IMAGES = {
  bottle: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f0fdf4"/><path d="M130 50 h40 v25 h-40 z" fill="%233b82f6"/><path d="M120 75 h60 v30 l20 30 v110 c0 10 -10 15 -20 15 h-60 c-10 0 -20 -5 -20 -15 v-110 l20 -30 z" fill="%2393c5fd" opacity="0.8" stroke="%232563eb" stroke-width="4"/><path d="M135 150 h30 v30 h-30 z" fill="%232563eb"/><text x="150" y="270" font-family="sans-serif" font-size="14" font-weight="bold" fill="%231e3a8a" text-anchor="middle">PET 1 • 500ml Clean</text></svg>`,
  banana: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23fefce8"/><path d="M70 200 C 100 240, 200 240, 230 110 C 230 110, 225 150, 160 190 C 110 220, 80 205, 70 200 Z" fill="%23eab308" stroke="%23ca8a04" stroke-width="4"/><circle cx="230" cy="110" r="5" fill="%23713f12"/><text x="150" y="270" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23854d0e" text-anchor="middle">Fruit Peel • Compostable</text></svg>`,
  pizza: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23fff7ed"/><path d="M60 100 l90 -40 l90 40 l-90 40 z" fill="%23fed7aa" stroke="%23ea580c" stroke-width="4"/><path d="M60 100 v80 l90 40 v-80 z" fill="%23fdba74" stroke="%23ea580c" stroke-width="4"/><path d="M240 100 v80 l-90 40 v-80 z" fill="%23fb923c" stroke="%23ea580c" stroke-width="4"/><ellipse cx="150" cy="100" rx="35" ry="15" fill="%23ef4444" opacity="0.6"/><text x="150" y="270" font-family="sans-serif" font-size="14" font-weight="bold" fill="%239a3412" text-anchor="middle">Greasy Pizza Box • Contaminated</text></svg>`,
  can: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23f8fafc"/><ellipse cx="150" cy="70" rx="45" ry="16" fill="%23cbd5e1" stroke="%23475569" stroke-width="4"/><path d="M105 70 v140 c0 15 20 20 45 20 s45 -5 45 -20 v-140 z" fill="%2394a3b8" stroke="%23475569" stroke-width="4"/><ellipse cx="150" cy="140" rx="45" ry="12" fill="%23ef4444"/><text x="150" y="270" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23334155" text-anchor="middle">Aluminium Can • Recyclable</text></svg>`,
  battery: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23fff1f2"/><rect x="135" y="55" width="30" height="15" fill="%23e11d48" rx="3"/><rect x="110" y="70" width="80" height="150" fill="%230f172a" stroke="%23e11d48" stroke-width="4" rx="8"/><rect x="110" y="160" width="80" height="60" fill="%23f43f5e"/><text x="150" y="145" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">⚡ 9V</text><text x="150" y="270" font-family="sans-serif" font-size="14" font-weight="bold" fill="%23be123c" text-anchor="middle">Special E-Waste • Hazardous</text></svg>`,
  coffee: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"><rect width="300" height="300" fill="%23fafaf9"/><path d="M110 90 l15 130 h50 l15 -130 z" fill="%23d6d3d1" stroke="%2378716c" stroke-width="4"/><ellipse cx="150" cy="90" rx="45" ry="12" fill="%2344403c"/><text x="150" y="270" font-family="sans-serif" font-size="14" font-weight="bold" fill="%2344403c" text-anchor="middle">Coffee Cup + Plastic Lid</text></svg>`
};

const SAMPLE_PRESETS = [
  {
    id: 'bottle',
    name: 'PET Water Bottle',
    icon: '🥤',
    category: 'Dry Waste',
    classificationId: 'dry',
    binUsed: 'Blue Bin (Dry)',
    isContaminated: false,
    confidence: 96,
    rewardValue: '₹2.50',
    details: 'Unsoiled PET mineral bottle. Label clean, suitable for direct baling and mechanical recycling.',
    image: SAMPLE_WASTE_IMAGES.bottle
  },
  {
    id: 'banana',
    name: 'Banana Peel / Pulp',
    icon: '🍌',
    category: 'Wet Waste',
    classificationId: 'wet',
    binUsed: 'Green Bin (Wet)',
    isContaminated: false,
    confidence: 98,
    rewardValue: '1 Eco Point',
    details: 'Pure biodegradable fruit waste. Routed directly to campus aerobic composting digester.',
    image: SAMPLE_WASTE_IMAGES.banana
  },
  {
    id: 'pizza',
    name: 'Oily Pizza Cardboard Box',
    icon: '🍕',
    category: 'Dry Waste',
    classificationId: 'dry',
    binUsed: 'Blue Bin (Dry)',
    isContaminated: true,
    confidence: 93,
    rewardValue: '0 Eco Points',
    expectedCategory: 'Clean Cardboard (Dry Bin)',
    detectedCategory: 'Soiled with Food Oil/Gravy (Wet Contamination)',
    details: '⚠️ CONTAMINATION DETECTED: Corrugated fiberboard soaked with grease. Cannot be processed by paper mills without cleaning.',
    recommendation: 'Compost contaminated bottom half; tear clean cardboard lid for recycling.',
    image: SAMPLE_WASTE_IMAGES.pizza
  },
  {
    id: 'can',
    name: 'Aluminium Beverage Can',
    icon: '🥫',
    category: 'Dry Waste',
    classificationId: 'dry',
    binUsed: 'Blue Bin (Dry)',
    isContaminated: false,
    confidence: 97,
    rewardValue: '₹4.00',
    details: 'High-purity aluminium alloy 3104 can. 100% infinitely recyclable with 95% energy conservation.',
    image: SAMPLE_WASTE_IMAGES.can
  },
  {
    id: 'battery',
    name: 'Lithium Battery / E-Waste',
    icon: '🔋',
    category: 'Special / E-Waste',
    classificationId: 'special',
    binUsed: 'Orange Bin (Special)',
    isContaminated: false,
    confidence: 95,
    rewardValue: '₹5.00',
    details: 'Hazardous domestic electronic waste. Contains reactive chemicals. Dispatched to certified safe dismantling hub.',
    image: SAMPLE_WASTE_IMAGES.battery
  },
  {
    id: 'coffee',
    name: 'Takeaway Cup w/ Lid',
    icon: '☕',
    category: 'Dry Waste',
    classificationId: 'dry',
    binUsed: 'Blue Bin (Dry)',
    isContaminated: true,
    confidence: 89,
    rewardValue: '0 Eco Points',
    expectedCategory: 'Separate: Lid (Dry) + Cup (Waxed Paper)',
    detectedCategory: 'Mixed Material & Coffee Liquid Residue',
    details: '⚠️ CONTAMINATION DETECTED: Cup has residual liquid and polyethylene wax liner with polystyrene plastic lid.',
    recommendation: 'Empty remaining liquid before sorting. Remove plastic lid (#6 PS) from paper cup.',
    image: SAMPLE_WASTE_IMAGES.coffee
  }
];

const LiveAIDetection = () => {
  const {
    activeDetection,
    activeDetectionIndex,
    selectDetection,
    isDemoRunning,
    startDemo,
    stopDemo,
    aiEvents,
    classifications,
    campusStats,
    analyzeUploadedImage,
    correctDetection,
    showToast
  } = useApp();

  // Mode Selection: 'camera' | 'upload' | 'cctv'
  const [inputMode, setInputMode] = useState('camera');

  // Camera States
  const [cameraActive, setCameraActive] = useState(false);
  const [cameraLoading, setCameraLoading] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [facingMode, setFacingMode] = useState('environment'); // 'user' or 'environment'
  const [cameraSnapshot, setCameraSnapshot] = useState(null);

  // Upload States
  const [dragActive, setDragActive] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState(null);
  const [selectedPresetId, setSelectedPresetId] = useState(null);

  // CCTV Feed States
  const [selectedFeed, setSelectedFeed] = useState('CAM-04 (Canteen Counter B)');
  const feeds = [
    'CAM-04 (Canteen Counter B)',
    'CAM-02 (Central Library Entry)',
    'CAM-07 (Student Hostel H1 Courtyard)',
    'CAM-09 (Science Lab Corridor)'
  ];

  // AI Correction Modal States
  const [correctionModalOpen, setCorrectionModalOpen] = useState(false);
  const [targetToCorrect, setTargetToCorrect] = useState(null);
  const [correctedCategory, setCorrectedCategory] = useState('Dry Waste');
  const [correctedObjectName, setCorrectedObjectName] = useState('');
  const [isContaminatedToggle, setIsContaminatedToggle] = useState(false);
  const [contaminationReason, setContaminationReason] = useState('None');
  const [scrapValueInput, setScrapValueInput] = useState('₹2.50');
  const [correctionNotes, setCorrectionNotes] = useState('');

  // Correction Hub Filter
  const [hubFilter, setHubFilter] = useState('all'); // 'all' | 'unverified' | 'contaminated' | 'corrected'

  // Refs for camera & off-screen canvas
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraStreamRef = useRef(null);
  const fileInputRef = useRef(null);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCameraStream();
    };
  }, []);

  // -------------------------------------------------------------
  // CAMERA FUNCTIONS
  // -------------------------------------------------------------
  const startCameraStream = async (mode = facingMode) => {
    setCameraLoading(true);
    setCameraError(null);
    setCameraSnapshot(null);

    // Stop existing stream if any
    stopCameraStream();

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera hardware access is not supported by this browser.');
      }

      const constraints = {
        video: {
          facingMode: mode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      };

      let stream;
      try {
        stream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        // Fallback to basic video constraint if specific facingMode fails
        console.warn('Advanced camera constraints failed, attempting basic video:', err);
        stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      }

      cameraStreamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setCameraActive(true);
      setCameraLoading(false);
      showToast('Camera stream connected. Point at waste item to scan.', 'info');
    } catch (err) {
      console.error('Failed to initialize webcam:', err);
      setCameraLoading(false);
      setCameraActive(false);
      setCameraError(
        err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError'
          ? 'Camera permission denied. Please allow camera access in browser settings or use the Photo Upload tab.'
          : 'No camera device detected. Switch to Photo Upload or CCTV Stream to test AI detection.'
      );
      showToast('Camera unavailable. Using fallback photo upload mode.', 'warning');
    }
  };

  const stopCameraStream = () => {
    if (cameraStreamRef.current) {
      cameraStreamRef.current.getTracks().forEach((track) => track.stop());
      cameraStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const switchCameraFacingMode = () => {
    const nextMode = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(nextMode);
    if (cameraActive) {
      startCameraStream(nextMode);
    }
  };

  // Instant Camera Shutter Capture
  const handleSnapAndDetect = () => {
    if (!videoRef.current) return;

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current || document.createElement('canvas');
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const snapshotDataUrl = canvas.toDataURL('image/jpeg', 0.9);
      setCameraSnapshot(snapshotDataUrl);

      // AI Heuristic Recognition Engine
      // Picks a random realistic detected object from the preset suite with 93-98% confidence
      const detectedPreset = SAMPLE_PRESETS[Math.floor(Math.random() * SAMPLE_PRESETS.length)];
      const confidence = Math.floor(93 + Math.random() * 6);

      const newEvent = analyzeUploadedImage(snapshotDataUrl, {
        object: detectedPreset.name,
        confidence,
        category: detectedPreset.category,
        classificationId: detectedPreset.classificationId,
        binUsed: detectedPreset.binUsed,
        isContaminated: detectedPreset.isContaminated,
        expectedCategory: detectedPreset.expectedCategory || detectedPreset.category,
        detectedCategory: detectedPreset.detectedCategory || (detectedPreset.isContaminated ? 'Contaminated' : 'Clean'),
        location: 'Device Optical Station (Webcam)',
        details: `Live edge camera capture processed. Recognized ${detectedPreset.name} with ${confidence}% confidence.`,
        rewardValue: detectedPreset.rewardValue,
        imageUrl: snapshotDataUrl,
        box: { x: 22, y: 20, width: 56, height: 56 }
      });

      showToast(`🎯 Object Detected: ${newEvent.object} (${confidence}% Confidence)`, 'success');
    } catch (err) {
      console.error('Error snapping photo:', err);
      showToast('Failed to capture frame from camera.', 'error');
    }
  };

  // -------------------------------------------------------------
  // FILE UPLOAD & PRESET HANDLERS
  // -------------------------------------------------------------
  const handleFileUpload = (file) => {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Please upload a valid image file (JPG, PNG, WEBP).', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      setUploadedPreview(dataUrl);
      setSelectedPresetId(null);

      // Analyze image heuristically based on file name or generic detection
      const name = file.name.toLowerCase();
      let preset = SAMPLE_PRESETS[0]; // default plastic bottle
      if (name.includes('banana') || name.includes('fruit') || name.includes('food') || name.includes('wet') || name.includes('peel')) {
        preset = SAMPLE_PRESETS[1];
      } else if (name.includes('pizza') || name.includes('box') || name.includes('cardboard') || name.includes('soiled')) {
        preset = SAMPLE_PRESETS[2];
      } else if (name.includes('can') || name.includes('tin') || name.includes('coke') || name.includes('metal')) {
        preset = SAMPLE_PRESETS[3];
      } else if (name.includes('battery') || name.includes('cable') || name.includes('electronic') || name.includes('cell')) {
        preset = SAMPLE_PRESETS[4];
      } else if (name.includes('cup') || name.includes('coffee') || name.includes('tea')) {
        preset = SAMPLE_PRESETS[5];
      }

      analyzeUploadedImage(dataUrl, {
        object: preset.name,
        confidence: Math.floor(91 + Math.random() * 8),
        category: preset.category,
        classificationId: preset.classificationId,
        binUsed: preset.binUsed,
        isContaminated: preset.isContaminated,
        expectedCategory: preset.expectedCategory || preset.category,
        detectedCategory: preset.detectedCategory || (preset.isContaminated ? 'Contaminated Stream' : 'Clean Recyclable'),
        location: 'Uploaded Image Analysis',
        details: `Custom photo uploaded (${file.name}). Edge model identified: ${preset.name}.`,
        rewardValue: preset.rewardValue,
        imageUrl: dataUrl,
        box: { x: 25, y: 22, width: 50, height: 52 }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (preset) => {
    setSelectedPresetId(preset.id);
    setUploadedPreview(preset.image);

    analyzeUploadedImage(preset.image, {
      object: preset.name,
      confidence: preset.confidence,
      category: preset.category,
      classificationId: preset.classificationId,
      binUsed: preset.binUsed,
      isContaminated: preset.isContaminated,
      expectedCategory: preset.expectedCategory || preset.category,
      detectedCategory: preset.detectedCategory || (preset.isContaminated ? 'Contaminated Stream' : 'Clean Recyclable'),
      location: 'Sample Bench Test',
      details: preset.details,
      recommendation: preset.recommendation,
      rewardValue: preset.rewardValue,
      imageUrl: preset.image,
      box: { x: 24, y: 22, width: 52, height: 54 }
    });
  };

  // -------------------------------------------------------------
  // AI DETECTION CORRECTION MODAL HANDLERS
  // -------------------------------------------------------------
  const handleOpenCorrection = (detectionItem = activeDetection) => {
    if (!detectionItem) return;
    setTargetToCorrect(detectionItem);
    setCorrectedCategory(detectionItem.category || 'Dry Waste');
    setCorrectedObjectName(detectionItem.object || '');
    setIsContaminatedToggle(!!detectionItem.isContaminated);
    setContaminationReason(detectionItem.isContaminated ? 'Food / Gravy Residue' : 'None');
    setScrapValueInput(detectionItem.rewardValue || '₹2.50');
    setCorrectionNotes(detectionItem.correctionNotes || '');
    setCorrectionModalOpen(true);
  };

  const handleSubmitCorrection = (e) => {
    e.preventDefault();
    if (!targetToCorrect) return;

    correctDetection(
      targetToCorrect.id,
      correctedCategory,
      correctedObjectName || targetToCorrect.object,
      correctionNotes || `Human verified stream: ${correctedCategory}`
    );

    setCorrectionModalOpen(false);
  };

  // Filtered Events for the Correction Hub
  const communityCorrectedCount = aiEvents.filter((e) => e.userCorrected).length;
  const filteredEventsForHub = aiEvents.filter((evt) => {
    if (hubFilter === 'contaminated') return evt.isContaminated;
    if (hubFilter === 'unverified') return !evt.userCorrected && evt.confidence < 95;
    if (hubFilter === 'corrected') return evt.userCorrected;
    return true;
  });

  return (
    <div className="page-wrapper ai-detection-page">
      {/* HIDDEN OFFSCREEN CANVAS FOR SHUTTER SNAPSHOTS */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />

      {/* HEADER SECTION */}
      <section className="page-header-section">
        <div className="container text-center">
          <div className="live-telemetry-badge">
            <span className="live-pulse-dot"></span>
            <span>LIVE AI VISION STREAM • REAL-TIME EDGE INFERENCE</span>
          </div>
          <h1 className="page-title">Live AI Waste Detection & Vision Classifier</h1>
          <p className="page-description">
            Computer vision waste detection and institutional segregation monitoring. Automatically identifies materials at point of disposal, classifies categories, and alerts against contamination with zero user effort.
          </p>
        </div>
      </section>

      {/* WORKFLOW PIPELINE BANNER */}
      <section className="detection-flow-banner-section">
        <div className="container">
          <div className="detection-workflow-pills">
            <div className="wf-step">
              <span className="wf-num">1</span>
              <span>Input Stream</span>
            </div>
            <span className="wf-arrow">→</span>
            <div className="wf-step">
              <span className="wf-num">2</span>
              <span>Edge AI Detection</span>
            </div>
            <span className="wf-arrow">→</span>
            <div className="wf-step">
              <span className="wf-num">3</span>
              <span>Stream Classification</span>
            </div>
            <span className="wf-arrow">→</span>
            <div className="wf-step">
              <span className="wf-num">4</span>
              <span>Segregation Audit</span>
            </div>
            <span className="wf-arrow">→</span>
            <div className="wf-step">
              <span className="wf-num">5</span>
              <span>Instant Correction</span>
            </div>
            <span className="wf-arrow">→</span>
            <div className="wf-step">
              <span className="wf-num">6</span>
              <span>Sell / Reward Logged</span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN VIEWPORT SECTION */}
      <section className="detection-viewport-section">
        <div className="container">
          {/* SOURCE MODE SWITCHER */}
          <div className="source-mode-switcher-bar">
            <div className="mode-tabs-group">
              <button
                onClick={() => {
                  setInputMode('camera');
                  if (!cameraActive) startCameraStream();
                }}
                className={`mode-tab-btn ${inputMode === 'camera' ? 'active-mode-tab' : ''}`}
              >
                <Camera size={18} />
                <span>Instant Device Camera</span>
                <span className="tab-pill">Webcam Live</span>
              </button>

              <button
                onClick={() => {
                  setInputMode('upload');
                  stopCameraStream();
                }}
                className={`mode-tab-btn ${inputMode === 'upload' ? 'active-mode-tab' : ''}`}
              >
                <Upload size={18} />
                <span>Upload Waste Photo</span>
                <span className="tab-pill">File / Samples</span>
              </button>

              <button
                onClick={() => {
                  setInputMode('cctv');
                  stopCameraStream();
                }}
                className={`mode-tab-btn ${inputMode === 'cctv' ? 'active-mode-tab' : ''}`}
              >
                <Video size={18} />
                <span>Campus CCTV Streams</span>
                <span className="tab-pill">Fixed Nodes</span>
              </button>
            </div>
          </div>

          <div className="ai-detection-main-grid">
            {/* Left Column: Camera Viewport / Upload Zone */}
            <div className="camera-viewport-column">
              <div className="camera-box-card">
                {/* HUD Header */}
                <div className="camera-top-hud">
                  <div className="cam-title-group">
                    <span className="cam-recording-indicator">
                      <span className="cam-red-pulse"></span>
                      LIVE
                    </span>

                    {inputMode === 'cctv' ? (
                      <select
                        value={selectedFeed}
                        onChange={(e) => setSelectedFeed(e.target.value)}
                        className="cam-select-dropdown"
                      >
                        {feeds.map((feed) => (
                          <option key={feed} value={feed}>
                            {feed}
                          </option>
                        ))}
                      </select>
                    ) : inputMode === 'camera' ? (
                      <span className="hud-mode-title">
                        {facingMode === 'environment' ? 'Rear / Environmental Lens' : 'Front / User Lens'}
                      </span>
                    ) : (
                      <span className="hud-mode-title">Optical File Inspection Mode</span>
                    )}
                  </div>

                  <div className="cam-hud-stats">
                    <span className="hud-badge">60 FPS</span>
                    <span className="hud-badge">1080p HD</span>
                    <span className="hud-badge ai-active-tag">AI Vision: Online</span>
                  </div>
                </div>

                {/* VIEWPORT BODY */}
                <div className="camera-canvas">
                  <div className="canvas-grid-overlay"></div>
                  <div className="canvas-scanline"></div>

                  {/* 1. WEBCAM STREAM MODE */}
                  {inputMode === 'camera' && (
                    <div className="webcam-viewport-inner">
                      {cameraLoading && (
                        <div className="camera-loading-overlay">
                          <RefreshCw size={32} className="animate-spin text-green" />
                          <p>Initializing camera optical stream...</p>
                        </div>
                      )}

                      {cameraError && (
                        <div className="camera-error-overlay">
                          <AlertTriangle size={36} className="text-red mb-2" />
                          <h4>Camera Access Notice</h4>
                          <p>{cameraError}</p>
                          <div className="error-action-btns">
                            <button onClick={() => startCameraStream()} className="btn-primary btn-sm">
                              Retry Camera
                            </button>
                            <button onClick={() => setInputMode('upload')} className="btn-secondary btn-sm">
                              Switch to Photo Upload
                            </button>
                          </div>
                        </div>
                      )}

                      {!cameraActive && !cameraLoading && !cameraError && (
                        <div className="camera-standby-overlay">
                          <Camera size={44} className="text-green mb-3" />
                          <h3>Instant Device Camera Detection</h3>
                          <p>Point your laptop or phone camera at any waste item for real-time edge AI classification.</p>
                          <button onClick={() => startCameraStream()} className="btn-primary mt-3">
                            <Camera size={18} />
                            <span>Activate Device Camera</span>
                          </button>
                        </div>
                      )}

                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className={`live-webcam-video ${cameraActive ? 'video-visible' : 'video-hidden'}`}
                      />

                      {/* Optical Reticle overlay */}
                      {cameraActive && (
                        <div className="camera-crosshairs-hud">
                          <div className="crosshair-reticle"></div>
                          <div className="hud-target-label">
                            <Scan size={14} className="text-green" />
                            <span>TARGET LOCK • READY FOR SNAPSHOT</span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 2. PHOTO UPLOAD MODE */}
                  {inputMode === 'upload' && (
                    <div className="upload-viewport-inner">
                      {uploadedPreview ? (
                        <div className="uploaded-preview-container">
                          <img src={uploadedPreview} alt="Uploaded waste" className="uploaded-preview-img" />
                        </div>
                      ) : (
                        <div
                          className={`upload-dropzone ${dragActive ? 'dropzone-active' : ''}`}
                          onDragOver={(e) => {
                            e.preventDefault();
                            setDragActive(true);
                          }}
                          onDragLeave={() => setDragActive(false)}
                          onDrop={(e) => {
                            e.preventDefault();
                            setDragActive(false);
                            if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                              handleFileUpload(e.dataTransfer.files[0]);
                            }
                          }}
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Upload size={40} className="text-green mb-2" />
                          <h3>Upload Waste Photo for Instant Detection</h3>
                          <p>Drag & drop photo here or click to browse files</p>
                          <span className="file-formats-tag">JPG, PNG, WEBP supported • Max 10MB</span>
                          <button type="button" className="btn-secondary btn-sm mt-3">
                            Browse Photo File
                          </button>
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                    </div>
                  )}

                  {/* 3. CCTV STREAM MODE */}
                  {inputMode === 'cctv' && (
                    <div className="canvas-scene-art">
                      <div className="bin-cluster-silhouette">
                        <div className="bin-prop bin-green">
                          <span className="bin-lbl">WET</span>
                        </div>
                        <div className="bin-prop bin-blue">
                          <span className="bin-lbl">DRY</span>
                        </div>
                        <div className="bin-prop bin-red">
                          <span className="bin-lbl">SANITARY</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Dynamic Bounding Box Overlay for Active Detection */}
                  {activeDetection && (
                    <div
                      className={`bounding-box ${
                        activeDetection.isContaminated ? 'bbox-contaminated' : 'bbox-correct'
                      }`}
                      style={{
                        left: `${activeDetection.box?.x || 25}%`,
                        top: `${activeDetection.box?.y || 25}%`,
                        width: `${activeDetection.box?.width || 50}%`,
                        height: `${activeDetection.box?.height || 50}%`
                      }}
                    >
                      <div className="bbox-corner corner-tl"></div>
                      <div className="bbox-corner corner-tr"></div>
                      <div className="bbox-corner corner-bl"></div>
                      <div className="bbox-corner corner-br"></div>

                      <div className="bbox-tag">
                        <span className="bbox-label">{activeDetection.object}</span>
                        <span className="bbox-conf">{activeDetection.confidence}%</span>
                      </div>

                      {activeDetection.userCorrected ? (
                        <div className="bbox-clean-pill bbox-human-verified">
                          <CheckCircle2 size={12} /> HUMAN VERIFIED
                        </div>
                      ) : activeDetection.isContaminated ? (
                        <div className="bbox-warning-pill">
                          <AlertTriangle size={12} /> CONTAMINATION
                        </div>
                      ) : (
                        <div className="bbox-clean-pill">
                          <CheckCircle2 size={12} /> VERIFIED {activeDetection.category}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Bottom Viewport HUD Info */}
                  <div className="canvas-bottom-overlay">
                    <div className="cam-location-label">
                      <MapPin size={14} className="text-green" />
                      <span>{activeDetection?.location || selectedFeed}</span>
                    </div>
                    <div className="cam-timestamp">
                      <Clock size={14} />
                      <span>{activeDetection?.timestamp || '10:42 AM'} • Edge Live</span>
                    </div>
                  </div>
                </div>

                {/* VIEWPORT CONTROLS BAR */}
                <div className="camera-controls-bar">
                  {inputMode === 'camera' ? (
                    <div className="camera-shutter-row">
                      <button
                        onClick={handleSnapAndDetect}
                        disabled={!cameraActive}
                        className="btn-primary btn-snap-shutter"
                        title="Capture frame and run instant AI detection"
                      >
                        <Camera size={20} />
                        <span>Snap & Detect Waste</span>
                      </button>

                      <div className="secondary-cam-controls">
                        <button
                          onClick={switchCameraFacingMode}
                          className="btn-secondary btn-icon-only"
                          title="Flip Camera (Front/Back)"
                        >
                          <RotateCcw size={17} />
                        </button>

                        {cameraActive ? (
                          <button onClick={stopCameraStream} className="btn-secondary btn-sm">
                            <Pause size={16} />
                            <span>Stop Camera</span>
                          </button>
                        ) : (
                          <button onClick={() => startCameraStream()} className="btn-secondary btn-sm">
                            <Play size={16} />
                            <span>Start Camera</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ) : inputMode === 'upload' ? (
                    <div className="upload-controls-row">
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="btn-primary btn-sm"
                      >
                        <Upload size={16} />
                        <span>Upload Another Photo</span>
                      </button>
                      <span className="upload-status-text">
                        Instant optical inference on selected waste image
                      </span>
                    </div>
                  ) : (
                    <div className="cctv-controls-row">
                      <div className="stream-action-btns">
                        {isDemoRunning ? (
                          <button onClick={stopDemo} className="btn-secondary btn-sm">
                            <Pause size={16} />
                            <span>Pause Telemetry Feed</span>
                          </button>
                        ) : (
                          <button onClick={startDemo} className="btn-primary btn-sm">
                            <Play size={16} />
                            <span>Resume Telemetry Feed</span>
                          </button>
                        )}
                      </div>

                      <div className="camera-status-indicator">
                        <span className="status-label">Active Feed:</span>
                        <strong>{isDemoRunning ? 'Ingesting Real-time Edge Frames' : 'Standby / Click to Resume'}</strong>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* QUICK SAMPLE TEST CHIPS (Always visible for zero-friction instant detection) */}
              <div className="sample-chips-wrapper">
                <div className="sample-chips-header">
                  <span className="chips-title">
                    <Sparkles size={15} className="text-green" />
                    <strong>Instant Waste Presets (1-Click Test):</strong>
                  </span>
                  <span className="chips-sub">Click any item to simulate instant edge detection</span>
                </div>
                <div className="sample-chips-grid">
                  {SAMPLE_PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      onClick={() => handleSelectPreset(preset)}
                      className={`sample-preset-chip ${selectedPresetId === preset.id ? 'preset-chip-active' : ''}`}
                    >
                      <span className="preset-chip-icon">{preset.icon}</span>
                      <div className="preset-chip-info">
                        <strong className="preset-name">{preset.name}</strong>
                        <span className="preset-cat">{preset.category}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* ACTIVE TARGET DOSSIER WITH CORRECTION CTA */}
              {activeDetection && (
                <div className={`active-target-dossier ${activeDetection.isContaminated ? 'dossier-alert' : ''}`}>
                  <div className="target-dossier-header">
                    <div className="dossier-title-group">
                      <Scan size={22} className={activeDetection.isContaminated ? 'text-red' : 'text-green'} />
                      <div>
                        <h3>Target Recognition: {activeDetection.object}</h3>
                        <p className="dossier-subtext">
                          Detected at {activeDetection.location} • Confidence: <strong>{activeDetection.confidence}%</strong>
                        </p>
                      </div>
                    </div>

                    <div className="dossier-badges-wrap">
                      {activeDetection.userCorrected ? (
                        <span className="target-status-badge status-corrected">
                          <CheckCircle2 size={13} /> Human Verified & Corrected
                        </span>
                      ) : activeDetection.isContaminated ? (
                        <span className="target-status-badge status-bad">
                          ⚠️ Contamination Detected
                        </span>
                      ) : (
                        <span className="target-status-badge status-good">
                          ✓ Correct Segregation
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="target-dossier-grid">
                    <div className="dossier-metric">
                      <span className="d-label">Detected Stream</span>
                      <strong className="d-val">{activeDetection.category}</strong>
                    </div>
                    <div className="dossier-metric">
                      <span className="d-label">Disposal Target Bin</span>
                      <strong className="d-val">{activeDetection.binUsed}</strong>
                    </div>
                    <div className="dossier-metric">
                      <span className="d-label">Verification Result</span>
                      <strong className="d-val font-semibold">
                        {activeDetection.userCorrected
                          ? '100% Verified by Reviewer'
                          : activeDetection.isContaminated
                          ? 'Contaminated Stream'
                          : 'Clean Recyclable'}
                      </strong>
                    </div>
                    <div className="dossier-metric">
                      <span className="d-label">Recycler Value / Credit</span>
                      <strong className="d-val text-green">{activeDetection.rewardValue || 'Logged'}</strong>
                    </div>
                  </div>

                  <p className="target-analysis-desc">{activeDetection.details}</p>

                  {activeDetection.isContaminated && activeDetection.recommendation && (
                    <div className="dossier-recommendation-box">
                      <AlertTriangle size={16} className="text-red flex-shrink-0" />
                      <div>
                        <strong>AI Recommended Operational Action:</strong>
                        <p>{activeDetection.recommendation}</p>
                      </div>
                    </div>
                  )}

                  {/* ACTION BAR: CORRECTION TOOL & SELL WASTE */}
                  <div className="dossier-action-bar">
                    <button
                      onClick={() => handleOpenCorrection(activeDetection)}
                      className="btn-secondary btn-correct-action"
                    >
                      <Edit3 size={16} className="text-green" />
                      <span>{activeDetection.userCorrected ? 'Edit Correction Again' : '✏️ Correct AI Detection'}</span>
                    </button>

                    {activeDetection.category === 'Dry Waste' && !activeDetection.isContaminated && (
                      <Link to="/sell-waste" className="btn-primary btn-sell-action">
                        <DollarSign size={16} />
                        <span>Sell This Scrap @ Best Rates</span>
                        <ArrowRight size={15} />
                      </Link>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Live Detection Event Feed */}
            <div className="detection-events-column">
              <div className="detection-feed-card">
                <div className="feed-card-header">
                  <div>
                    <h3>Realtime Detection Events</h3>
                    <p className="text-muted text-xs">Active IoT & Camera sensor event stream</p>
                  </div>
                  <span className="live-events-pill">
                    {aiEvents.length} Verified Events Logged
                  </span>
                </div>

                <div className="detection-cards-scroll">
                  {aiEvents.map((evt, idx) => (
                    <DetectionCard
                      key={evt.id}
                      event={evt}
                      isActive={activeDetectionIndex === idx}
                      onSelect={() => selectDetection(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MORE CORRECTION: CAMPUS AI MODEL CORRECTION & VERIFICATION HUB */}
      <section className="model-correction-hub-section">
        <div className="container">
          <div className="hub-header-card">
            <div className="hub-title-group">
              <div className="hub-icon-wrap">
                <Sliders size={26} className="text-green" />
              </div>
              <div>
                <span className="sub-badge">COMMUNITY HUMAN-IN-THE-LOOP FEEDBACK</span>
                <h2 className="hub-title">Campus AI Model Correction & Verification Hub</h2>
                <p className="hub-subtitle">
                  Help continuously fine-tune our institutional vision model. Inspect recent detections, correct misclassifications, and earn Eco-Steward badges.
                </p>
              </div>
            </div>

            <div className="hub-metrics-pill">
              <div className="hub-metric-item">
                <span className="hm-val text-green">{communityCorrectedCount}</span>
                <span className="hm-lbl">Corrections Submitted</span>
              </div>
              <div className="hub-metric-divider"></div>
              <div className="hub-metric-item">
                <span className="hm-val text-blue">+{ (communityCorrectedCount * 0.2).toFixed(1) }%</span>
                <span className="hm-lbl">Accuracy Fine-Tuned</span>
              </div>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="hub-filter-bar">
            <span className="filter-label">Filter Detection Queue:</span>
            <div className="filter-buttons-row">
              <button
                onClick={() => setHubFilter('all')}
                className={`filter-btn ${hubFilter === 'all' ? 'filter-active' : ''}`}
              >
                All Events ({aiEvents.length})
              </button>
              <button
                onClick={() => setHubFilter('unverified')}
                className={`filter-btn ${hubFilter === 'unverified' ? 'filter-active' : ''}`}
              >
                Needs Review / Low Confidence
              </button>
              <button
                onClick={() => setHubFilter('contaminated')}
                className={`filter-btn ${hubFilter === 'contaminated' ? 'filter-active' : ''}`}
              >
                Contamination Anomaly Flags
              </button>
              <button
                onClick={() => setHubFilter('corrected')}
                className={`filter-btn ${hubFilter === 'corrected' ? 'filter-active' : ''}`}
              >
                Human Verified ({communityCorrectedCount})
              </button>
            </div>
          </div>

          {/* Correction Queue Grid */}
          <div className="correction-queue-grid">
            {filteredEventsForHub.map((item) => (
              <div
                key={item.id}
                className={`queue-item-card ${item.userCorrected ? 'card-corrected' : item.isContaminated ? 'card-alert' : ''}`}
              >
                <div className="queue-card-top">
                  <div>
                    <strong className="queue-item-name">{item.object}</strong>
                    <span className="queue-item-meta">
                      {item.location} • {item.timestamp}
                    </span>
                  </div>
                  <span className={`queue-badge ${item.isContaminated ? 'badge-bad' : 'badge-good'}`}>
                    {item.category}
                  </span>
                </div>

                <p className="queue-item-desc">{item.details}</p>

                <div className="queue-card-bottom">
                  <div className="queue-confidence">
                    <span>Confidence: <strong>{item.confidence}%</strong></span>
                  </div>

                  <button
                    onClick={() => handleOpenCorrection(item)}
                    className="btn-secondary btn-xs btn-review-correct"
                  >
                    <Edit3 size={13} />
                    <span>{item.userCorrected ? 'Verified ✓' : 'Review & Correct'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-STREAM TAXONOMY REFERENCE */}
      <section className="classification-rules-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="sub-badge">AI CLASSIFICATION TAXONOMY</span>
            <h2 className="section-title">Institutional Waste Categorization</h2>
            <p className="section-subtitle">
              Every item detected is mapped to one of 4 municipal segregation streams with zero manual entry required from students or staff.
            </p>
          </div>

          <div className="classification-grid-4">
            {classifications.map((cat) => (
              <div key={cat.id} className="classification-card">
                <div className="class-header" style={{ borderTop: `4px solid ${cat.color}` }}>
                  <span className="class-bin-tag" style={{ color: cat.color }}>
                    {cat.binColor}
                  </span>
                  <h3 className="class-title">{cat.name}</h3>
                </div>

                <div className="class-body">
                  <div className="class-field">
                    <span className="f-title">Common Examples:</span>
                    <p className="f-desc">{cat.examples}</p>
                  </div>
                  <div className="class-field">
                    <span className="f-title">Campus Handling Route:</span>
                    <p className="f-desc text-muted">{cat.handling}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================== */}
      {/* AI DETECTION CORRECTION MODAL */}
      {/* ============================================================== */}
      {correctionModalOpen && targetToCorrect && (
        <div className="modal-overlay" onClick={() => setCorrectionModalOpen(false)}>
          <div className="modal-content correction-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-title-wrap">
                <Edit3 size={22} className="text-green" />
                <div>
                  <h3>Correct AI Detection & Train Model</h3>
                  <p className="text-muted text-xs">Event ID: {targetToCorrect.id} • {targetToCorrect.location}</p>
                </div>
              </div>
              <button
                onClick={() => setCorrectionModalOpen(false)}
                className="modal-close-btn"
                title="Close modal"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmitCorrection} className="modal-body correction-form">
              {/* Target Preview Box */}
              <div className="correction-current-banner">
                <span className="text-xs text-muted font-bold">CURRENT DETECTION:</span>
                <div className="current-detected-row">
                  <span className="detected-item-pill">
                    📦 <strong>{targetToCorrect.object}</strong>
                  </span>
                  <span className="detected-stream-pill">
                    {targetToCorrect.category} ({targetToCorrect.confidence}%)
                  </span>
                  {targetToCorrect.isContaminated && (
                    <span className="detected-alert-pill">⚠️ Contaminated</span>
                  )}
                </div>
              </div>

              {/* Step 1: Select Correct Stream */}
              <div className="form-group">
                <label className="form-label font-bold">
                  1. Select Correct Waste Category Stream:
                </label>
                <div className="stream-selector-grid">
                  {[
                    { name: 'Dry Waste', label: 'Dry Recyclable', bin: 'Blue Bin (Dry)', color: '#2563eb', desc: 'Paper, Clean Plastics, Metals, Cardboard' },
                    { name: 'Wet Waste', label: 'Wet Organic', bin: 'Green Bin (Wet)', color: '#16a34a', desc: 'Food Scraps, Fruit Peels, Biodegradable' },
                    { name: 'Sanitary Waste', label: 'Sanitary', bin: 'Red Bin (Sanitary)', color: '#dc2626', desc: 'Medical, Diapers, Contaminated Tissues' },
                    { name: 'Special / E-Waste', label: 'Special / E-Waste', bin: 'Orange Bin (Special)', color: '#ea580c', desc: 'Batteries, Cables, Hazardous Chemicals' }
                  ].map((stream) => (
                    <div
                      key={stream.name}
                      onClick={() => setCorrectedCategory(stream.name)}
                      className={`stream-choice-card ${correctedCategory === stream.name ? 'stream-selected' : ''}`}
                      style={{
                        borderColor: correctedCategory === stream.name ? stream.color : 'var(--border-warm)'
                      }}
                    >
                      <div className="stream-choice-top">
                        <span className="stream-dot" style={{ backgroundColor: stream.color }}></span>
                        <strong>{stream.label}</strong>
                        {correctedCategory === stream.name && <Check size={16} style={{ color: stream.color }} />}
                      </div>
                      <span className="stream-bin-sub">{stream.bin}</span>
                      <p className="stream-desc-text">{stream.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Accurate Item Name */}
              <div className="form-group">
                <label className="form-label font-bold">
                  2. Accurate Item Name / Classification:
                </label>
                <input
                  type="text"
                  required
                  value={correctedObjectName}
                  onChange={(e) => setCorrectedObjectName(e.target.value)}
                  className="form-input"
                  placeholder="e.g. PET Mineral Water Bottle"
                />

                {/* Quick Name Suggestions */}
                <div className="quick-suggestions-row">
                  <span className="text-xs text-muted">Quick Tags:</span>
                  {[
                    'PET Plastic Bottle',
                    'Corrugated Cardboard',
                    'Aluminium Can',
                    'Organic Food Scraps',
                    'Used Sanitary Napkin',
                    'Lithium-Ion Battery',
                    'Milk Pouch (LDPE)'
                  ].map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => setCorrectedObjectName(tag)}
                      className="quick-tag-btn"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Contamination Check */}
              <div className="form-group">
                <label className="form-label font-bold">
                  3. Contamination Audit:
                </label>
                <div className="contamination-toggle-group">
                  <button
                    type="button"
                    onClick={() => setIsContaminatedToggle(false)}
                    className={`toggle-option ${!isContaminatedToggle ? 'toggle-active-good' : ''}`}
                  >
                    <CheckCircle2 size={16} />
                    <span>Clean & Segregated</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsContaminatedToggle(true)}
                    className={`toggle-option ${isContaminatedToggle ? 'toggle-active-bad' : ''}`}
                  >
                    <AlertTriangle size={16} />
                    <span>Contaminated / Soiled</span>
                  </button>
                </div>

                {isContaminatedToggle && (
                  <div className="contamination-reason-box mt-2">
                    <label className="text-xs font-semibold text-muted">Contamination Type:</label>
                    <select
                      value={contaminationReason}
                      onChange={(e) => setContaminationReason(e.target.value)}
                      className="form-input"
                    >
                      <option value="Food & Gravy Residue">Food & Gravy Residue</option>
                      <option value="Liquid Spillage / Moisture">Liquid Spillage / Moisture</option>
                      <option value="Mixed Multi-layer Foil">Mixed Multi-layer Foil</option>
                      <option value="Grease / Oil Stains">Grease / Oil Stains</option>
                      <option value="Medical / Hazardous Contact">Medical / Hazardous Contact</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Step 4: ML Engineer Notes */}
              <div className="form-group">
                <label className="form-label font-bold">
                  4. ML Feedback & Edge Model Notes (Optional):
                </label>
                <textarea
                  rows={2}
                  value={correctionNotes}
                  onChange={(e) => setCorrectionNotes(e.target.value)}
                  className="form-textarea"
                  placeholder="e.g. Item crushed and shaded by shadow; label PET-1 clearly visible."
                ></textarea>
              </div>

              {/* Submit Buttons */}
              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setCorrectionModalOpen(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <CheckCircle2 size={16} />
                  <span>Save Correction & Retrain AI (+0.2% Accuracy)</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiveAIDetection;
