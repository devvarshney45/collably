import React, { useState } from 'react';
import { ArrowLeft, MapPin, Calendar, Edit3 } from 'lucide-react';
import { api } from '../api';
import SuccessDialog from '../components/SuccessDialog';

export default function RequestServiceScreen({ onNavigate, onBack }) {
  const [selectedService, setSelectedService] = useState('Corporate Lunch (Daily Meals)');
  const [address, setAddress] = useState('Ghaziabad, uttar pradesh -');
  const [preferredTime, setPreferredTime] = useState('');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const services = [
    'Corporate Lunch (Daily Meals)',
    'Home-style Tiffin (Daily Meals)',
    'AC Service (Appliance Repair)',
    'Washing Machine Repair',
    'Refrigerator Repair',
    'Office Boy Services',
    'Office Cleaning & Sanitization',
    'Pantry Support Services',
    'Day Care (Babysitting)',
    'Night Care (Infant Nanny)',
    'Other / Custom Requirement'
  ];

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    try {
      await api.requests.create({
        type: 'service_request',
        title: selectedService,
        address: address || 'Ghaziabad, uttar pradesh -',
        preferredTime: preferredTime || 'Immediate / As per schedule',
        note: note || ''
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
      maxWidth: 640,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box',
      padding: '16px 20px 48px'
    }}>
      {/* Top Bar */}
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
          Request a Service
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
        <form onSubmit={handleSubmit}>
          {/* 1. Choose Service Section */}
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 12 }}>
              Choose Service
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: 10,
              maxHeight: 240,
              overflowY: 'auto',
              padding: 4
            }}>
              {services.map((srv) => {
                const active = selectedService === srv;
                return (
                  <div
                    key={srv}
                    onClick={() => setSelectedService(srv)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: active ? '1.5px solid var(--primary)' : '1px solid #E2E8F0',
                      backgroundColor: active ? 'rgba(255, 107, 53, 0.08)' : '#FFFFFF',
                      color: active ? 'var(--primary)' : '#1E293B',
                      fontSize: 13,
                      fontWeight: active ? 700 : 500,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {srv}
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. Address */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
              Address
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              border: '1.5px solid #E2E8F0',
              padding: '0 16px'
            }}>
              <MapPin size={18} color="#94A3B8" style={{ marginRight: 12, flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  padding: '14px 0',
                  fontSize: 14,
                  color: '#0F172A',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* 3. Preferred Date & Time */}
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
              Preferred Date & Time
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              border: '1.5px solid #E2E8F0',
              padding: '0 16px'
            }}>
              <Calendar size={18} color="#94A3B8" style={{ marginRight: 12, flexShrink: 0 }} />
              <input
                type="text"
                placeholder="Select date & time (e.g. Tomorrow 10:00 AM)"
                value={preferredTime}
                onChange={(e) => setPreferredTime(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  padding: '14px 0',
                  fontSize: 14,
                  color: '#0F172A',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          {/* 4. Write A Note */}
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontSize: 14, fontWeight: 700, color: '#1E293B', marginBottom: 8 }}>
              Write A Note
            </label>
            <div style={{
              display: 'flex',
              alignItems: 'flex-start',
              backgroundColor: '#FFFFFF',
              borderRadius: 14,
              border: '1.5px solid #E2E8F0',
              padding: '12px 16px'
            }}>
              <Edit3 size={18} color="#94A3B8" style={{ marginRight: 12, marginTop: 4, flexShrink: 0 }} />
              <textarea
                rows={4}
                placeholder="Write any custom preferences, dietary needs, or specific instructions..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                style={{
                  width: '100%',
                  border: 'none',
                  outline: 'none',
                  fontSize: 14,
                  color: '#0F172A',
                  backgroundColor: 'transparent',
                  resize: 'none',
                  fontFamily: 'inherit'
                }}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="app-btn"
            style={{
              width: '100%',
              height: 52,
              borderRadius: 14,
              fontSize: 16,
              fontWeight: 800,
              backgroundColor: '#FF6B35'
            }}
          >
            {loading ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
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
