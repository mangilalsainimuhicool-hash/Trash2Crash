import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';

const Toast = () => {
  const { toast } = useApp();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={20} className="toast-icon text-green" />,
    error: <AlertCircle size={20} className="toast-icon text-red" />,
    info: <Info size={20} className="toast-icon text-blue" />
  };

  return (
    <div className={`toast-notification toast-${toast.type || 'success'}`}>
      <div className="toast-content">
        {icons[toast.type] || icons.success}
        <span className="toast-message">{toast.message}</span>
      </div>
    </div>
  );
};

export default Toast;
