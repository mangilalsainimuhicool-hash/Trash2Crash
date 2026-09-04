import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Boxes,
  ShieldCheck,
  Cpu,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const iconMap = {
  paper: FileText,
  plastic: Boxes,
  metal: ShieldCheck,
  ewaste: Cpu
};

const WasteCard = ({ category, onSelect }) => {
  const navigate = useNavigate();
  const IconComponent = iconMap[category.id] || Boxes;

  const handleSellClick = () => {
    if (onSelect) {
      onSelect(category);
    } else {
      navigate(`/sell-waste?category=${category.id}`);
    }
  };

  return (
    <div className={`waste-card ${category.popular ? 'waste-card-popular' : ''}`}>
      {category.popular && (
        <div className="popular-badge">
          <Sparkles size={12} />
          <span>High Demand</span>
        </div>
      )}

      <div className="waste-card-header">
        <div className={`waste-icon-box waste-icon-${category.id}`}>
          <IconComponent size={28} />
        </div>
        <div className="waste-card-price-tag">
          <span className="price-currency">₹</span>
          <span className="price-amount">{category.rate}</span>
          <span className="price-unit">/{category.unit}</span>
        </div>
      </div>

      <div className="waste-card-body">
        <h3 className="waste-card-title">{category.name}</h3>
        <p className="waste-card-desc">{category.description}</p>

        {category.acceptedItems && category.acceptedItems.length > 0 && (
          <div className="waste-card-accepted">
            <span className="accepted-title">Accepted items:</span>
            <ul className="accepted-list">
              {category.acceptedItems.slice(0, 3).map((item, idx) => (
                <li key={idx} className="accepted-item">
                  <span className="bullet-dot"></span>
                  <span>{item}</span>
                </li>
              ))}
              {category.acceptedItems.length > 3 && (
                <li className="accepted-more">
                  +{category.acceptedItems.length - 3} more types
                </li>
              )}
            </ul>
          </div>
        )}
      </div>

      <div className="waste-card-footer">
        <div className="price-trend">
          <TrendingUp size={14} className="trend-icon" />
          <span>Instant doorstep cash</span>
        </div>
        <button
          onClick={handleSellClick}
          className="btn-sell-card"
          aria-label={`Sell ${category.name} at ₹${category.rate} per kg`}
        >
          <span>Sell Now</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default WasteCard;
