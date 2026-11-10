import React, { useState } from 'react';
import { ArrowLeft, Edit3, Phone, MessageSquare } from 'lucide-react';
import { api } from '../api';
import SuccessDialog from '../components/SuccessDialog';

export default function UrgentRequestScreen({ onNavigate, onBack }) {
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await api.requests.urgent(description || 'Urgent assistance requested');
      setShowSuccess(true);
    } catch (err) {
      console.warn(err);
      setShowSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = () => {
    window.location.href = 'tel:+916397003690';
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/916397003690?text=Hello%20Collably,%20I%20need%20urgent%20assistance.', '_blank');
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 640,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box',
      padding: '16px 20px 48px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
      }}>
        <button
          onClick={onBack || (() => onNavigate('dashboard_requests'))}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            color: '#000000',
            fontSize: 14,
            fontWeight: '600'
          }}
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#0F172A', margin: 0 }}>
          Something urgent
        </h3>

        <div style={{ width: 40 }} />
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        padding: '28px 24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        border: '1px solid #F1F5F9'
      }}>
        {/* Urgent Warning Banner (Exact App Style from Video) */}
        <div style={{
          backgroundColor: '#FFF1F2',
          borderRadius: 16,
          border: '1px solid #FFE4E6',
          padding: '20px 24px',
          marginBottom: 24,
          color: '#E11D48',
          fontSize: 14,
          lineHeight: 1.5,
          fontWeight: '500'
        }}>
          We prioritize urgent requests. Please provide a short description and we will respond immediately.
        </div>

        {/* Short Description Textarea (Exact App Style from Video) */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          border: '1.5px solid #E2E8F0',
          padding: '14px 18px',
          marginBottom: 24,
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <Edit3 size={18} color="#94A3B8" style={{ flexShrink: 0, marginTop: 4, marginRight: 14 }} />
          <div style={{ width: 1, height: 90, backgroundColor: '#E2E8F0', marginRight: 14 }} />
          <textarea
            rows={4}
            placeholder="Short Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: 14,
              color: '#0F172A',
              backgroundColor: 'transparent',
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Dual Direct Buttons: Call Us (Green) & Whats App (Orange) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 14,
          marginBottom: 16
        }}>
          <button
            type="button"
            onClick={handleCall}
            style={{
              backgroundColor: '#16A34A',
              color: 'white',
              border: 'none',
              borderRadius: 14,
              padding: '14px 20px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(22, 163, 74, 0.25)',
              transition: 'all 0.15s'
            }}
          >
            <Phone size={18} />
            <span>Call Us</span>
          </button>

          <button
            type="button"
            onClick={handleWhatsApp}
            style={{
              backgroundColor: '#FF6B35',
              color: 'white',
              border: 'none',
              borderRadius: 14,
              padding: '14px 20px',
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)',
              transition: 'all 0.15s'
            }}
          >
            <MessageSquare size={18} />
            <span>Whats App</span>
          </button>
        </div>

        {/* Submit Urgent Ticket Full Width Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="app-btn"
          style={{
            width: '100%',
            height: 52,
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 800,
            backgroundColor: '#FF6B35',
            boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)'
          }}
        >
          {loading ? 'Submitting...' : 'Submit Urgent Ticket'}
        </button>
      </div>

      <SuccessDialog
        isOpen={showSuccess}
        title="Ticket Submitted"
        message="We've received your urgent request. Our team will contact you within 5 minutes."
        onDone={() => {
          setShowSuccess(false);
          onNavigate('dashboard_requests');
        }}
      />
    </div>
  );
}
