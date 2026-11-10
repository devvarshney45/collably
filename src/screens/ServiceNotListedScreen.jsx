import React, { useState } from 'react';
import { ArrowLeft, Edit3, MapPin, Clock } from 'lucide-react';
import { api } from '../api';
import SuccessDialog from '../components/SuccessDialog';

export default function ServiceNotListedScreen({ onNavigate, onBack }) {
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await api.requests.notListed({
        description,
        address,
        preferredTime
      });
      setShowSuccess(true);
    } catch (err) {
      console.warn(err);
      setShowSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 680,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box'
    }}>
      {/* 1. Header (Exact Flutter Style) */}
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
            fontWeight: '500'
          }}
        >
          <ArrowLeft size={18} />
          <span>Back</span>
        </button>

        <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', margin: 0 }}>
          Service Not Listed
        </h3>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: '28px 24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        border: '1px solid #F1F5F9'
      }}>
        {/* Module 1: What do you need help with? */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          padding: '12px 16px',
          marginBottom: 16
        }}>
          <Edit3 size={20} color="#1E293B" style={{ flexShrink: 0, marginTop: 4 }} />
          <div style={{ width: 1, height: 80, backgroundColor: '#E2E8F0', margin: '0 16px' }} />
          <textarea
            rows={4}
            placeholder="What do you need help with?"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: 14,
              color: '#1E293B',
              backgroundColor: 'transparent',
              resize: 'none',
              fontFamily: 'inherit'
            }}
          />
        </div>

        {/* Module 2: Enter your address */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          padding: '12px 16px',
          marginBottom: 16
        }}>
          <MapPin size={20} color="#1E293B" style={{ flexShrink: 0 }} />
          <div style={{ width: 1, height: 24, backgroundColor: '#E2E8F0', margin: '0 16px' }} />
          <input
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: 14,
              color: '#1E293B',
              backgroundColor: 'transparent'
            }}
          />
        </div>

        {/* Module 3: Preferred Time */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          border: '1px solid #E2E8F0',
          padding: '12px 16px',
          marginBottom: 32
        }}>
          <Clock size={20} color="#1E293B" style={{ flexShrink: 0 }} />
          <div style={{ width: 1, height: 24, backgroundColor: '#E2E8F0', margin: '0 16px' }} />
          <input
            type="text"
            placeholder="Preferred Time"
            value={preferredTime}
            onChange={(e) => setPreferredTime(e.target.value)}
            style={{
              border: 'none',
              outline: 'none',
              width: '100%',
              fontSize: 14,
              color: '#1E293B',
              backgroundColor: 'transparent'
            }}
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="app-btn"
          style={{
            height: 54,
            borderRadius: 14,
            fontSize: 16,
            fontWeight: 'bold'
          }}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>

      <SuccessDialog
        isOpen={showSuccess}
        title="Request Received"
        message="We've received your request. We'll coordinate and update you."
        onDone={() => {
          setShowSuccess(false);
          onNavigate('dashboard_requests');
        }}
      />
    </div>
  );
}
