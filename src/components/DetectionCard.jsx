import React from 'react';
import { CheckCircle2, AlertTriangle, MapPin, Clock, Eye, Sparkles } from 'lucide-react';

const categoryColorMap = {
  wet: { bg: '#dcfce7', text: '#15803d', border: '#86efac' },
  dry: { bg: '#dbeafe', text: '#1d4ed8', border: '#93c5fd' },
  sanitary: { bg: '#fee2e2', text: '#b91c1c', border: '#fca5a5' },
  special: { bg: '#ffedd5', text: '#c2410c', border: '#fdba74' }
};

const DetectionCard = ({ event, isActive, onSelect }) => {
  const catStyle = categoryColorMap[event.classificationId] || categoryColorMap.dry;

  return (
    <div
      onClick={onSelect}
      className={`detection-card ${isActive ? 'detection-card-active' : ''} ${
        event.isContaminated ? 'detection-card-contaminated' : ''
      }`}
    >
      <div className="det-card-top">
        <div className="det-object-info">
          <span className="det-object-name">{event.object}</span>
          <span className="det-confidence-pill">
            <Sparkles size={12} />
            {event.confidence}% Confidence
          </span>
        </div>

        <span
          className="det-category-pill"
          style={{
            backgroundColor: catStyle.bg,
            color: catStyle.text,
            borderColor: catStyle.border
          }}
        >
          {event.category.toUpperCase()}
        </span>
      </div>

      {event.isContaminated ? (
        <div className="det-contamination-alert">
          <div className="alert-title-row">
            <AlertTriangle size={15} className="text-red" />
            <strong className="text-red">⚠️ Contamination Detected</strong>
          </div>
          <p className="alert-details-text">{event.details}</p>
          <div className="contamination-meta">
            <span>Expected: <strong>{event.expectedCategory}</strong></span>
            <span>Detected: <strong>{event.detectedCategory}</strong></span>
          </div>
        </div>
      ) : (
        <div className="det-status-correct">
          <CheckCircle2 size={15} className="text-green" />
          <span>Correctly Segregated • {event.binUsed}</span>
        </div>
      )}

      <div className="det-card-footer">
        <div className="det-location-tag">
          <MapPin size={13} className="text-muted" />
          <span>{event.location}</span>
        </div>
        <div className="det-time-tag">
          <Clock size={13} className="text-muted" />
          <span>{event.timestamp}</span>
        </div>
        {event.userCorrected && (
          <span className="det-verified-badge">
            <CheckCircle2 size={12} /> Verified
          </span>
        )}
        {event.isUserUpload && !event.userCorrected && (
          <span className="det-upload-tag">
            📷 Camera
          </span>
        )}
        {isActive && (
          <span className="det-live-viewing-badge">
            <Eye size={12} /> Active
          </span>
        )}
      </div>
    </div>
  );
};

export default DetectionCard;
