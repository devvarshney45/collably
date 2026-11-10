import React from 'react';
import { Check } from 'lucide-react';

export default function SuccessDialog({
  isOpen,
  title = 'Request Received',
  message = "We've received your request. We'll coordinate and update you.",
  onDone,
  onClose
}) {
  if (!isOpen) return null;
  const handleClose = onDone || onClose || (() => {});

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-check-circle">
          <Check size={36} strokeWidth={2.5} />
        </div>
        <h3 style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10, color: '#1E293B' }}>
          {title}
        </h3>
        <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.5, marginBottom: 26 }}>
          {message}
        </p>
        <button
          className="app-btn"
          style={{ height: 48, borderRadius: 12 }}
          onClick={handleClose}
        >
          Done
        </button>
      </div>
    </div>
  );
}
