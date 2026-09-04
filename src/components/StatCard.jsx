import React from 'react';
import {
  Scale,
  IndianRupee,
  CalendarCheck2,
  Leaf,
  TrendingUp,
  Recycle,
  Users,
  Truck
} from 'lucide-react';

const iconLookup = {
  Scale,
  IndianRupee,
  CalendarCheck2,
  Leaf,
  Recycle,
  Users,
  Truck,
  TrendingUp
};

const StatCard = ({
  icon,
  label,
  value,
  subtext,
  trend,
  colorScheme = 'green'
}) => {
  const IconComponent = typeof icon === 'string' ? (iconLookup[icon] || TrendingUp) : icon;

  return (
    <div className={`stat-card stat-card-${colorScheme}`}>
      <div className="stat-card-top">
        <div className="stat-icon-wrapper">
          {IconComponent && <IconComponent size={24} />}
        </div>
        {trend && (
          <span className="stat-trend-badge">
            <TrendingUp size={12} />
            <span>{trend}</span>
          </span>
        )}
      </div>
      <div className="stat-card-bottom">
        <h3 className="stat-value">{value}</h3>
        <p className="stat-label">{label}</p>
        {subtext && <p className="stat-subtext">{subtext}</p>}
      </div>
    </div>
  );
};

export default StatCard;
