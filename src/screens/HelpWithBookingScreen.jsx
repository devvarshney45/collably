import React, { useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock, Calendar, ChevronRight } from 'lucide-react';
import { api } from '../api';
import SuccessDialog from '../components/SuccessDialog';

export default function HelpWithBookingScreen({ onNavigate, onBack }) {
  const [phase, setPhase] = useState(1); // 1: Select Booking, 2: Select Issue
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedIssue, setSelectedIssue] = useState('Delay Service');
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const bookings = [
    {
      id: 'BK-7829',
      title: 'Elite Photography Studio',
      time: 'Today, 2:00 PM',
      status: 'Confirmed',
      image: '/assets/images/elite_photography.png'
    },
    {
      id: 'BK-7830',
      title: 'Cooking & Private Chef',
      time: 'Tomorrow, 10:00 AM',
      status: 'Confirmed',
      image: '/assets/images/cooking.png'
    }
  ];

  const issues = [
    'Delay Service',
    'Provider No-Show',
    'Change Booking Details',
    'Payment Query',
    'Cancel Booking',
    'Other'
  ];

  const handleBookingSelect = (b) => {
    setSelectedBooking(b);
    setPhase(2);
  };

  const handleBackPress = () => {
    if (phase === 2) {
      setPhase(1);
    } else {
      if (onBack) onBack();
      else onNavigate('dashboard_requests');
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await api.requests.helpBooking({
        bookingId: selectedBooking?.id || 'BK-7829',
        issue: selectedIssue,
        details: note
      });
      setShowSuccess(true);
    } catch (e) {
      console.warn(e);
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
          onClick={handleBackPress}
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
          Help with Booking
        </h3>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        padding: '28px 24px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        border: '1px solid #F1F5F9'
      }}>
        {/* Phase 1: Select Booking */}
        {phase === 1 && (
          <div>
            <h4 style={{ fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 16 }}>
              Select Active Booking
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {bookings.map((b) => (
                <div
                  key={b.id}
                  onClick={() => handleBookingSelect(b)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 16,
                    border: '1px solid #E2E8F0',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <img
                      src={b.image}
                      alt={b.title}
                      style={{ width: 50, height: 50, borderRadius: 12, objectFit: 'cover' }}
                      onError={(e) => { e.target.src = '/assets/images/studios.png'; }}
                    />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: '#1E293B' }}>{b.title}</div>
                      <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>{b.id} • {b.time}</div>
                    </div>
                  </div>
                  <ChevronRight size={18} color="#94A3B8" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Phase 2: Select Issue */}
        {phase === 2 && (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '12px 16px',
              backgroundColor: '#F8FAFC',
              borderRadius: 12,
              marginBottom: 20
            }}>
              <span style={{ fontSize: 12, fontWeight: 'bold', color: '#64748B' }}>Selected:</span>
              <span style={{ fontSize: 13, fontWeight: 'bold', color: '#1E293B' }}>{selectedBooking?.title}</span>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>({selectedBooking?.id})</span>
            </div>

            <h4 style={{ fontSize: 15, fontWeight: 'bold', color: '#1E293B', marginBottom: 14 }}>
              What issue are you facing?
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: 10,
              marginBottom: 24
            }}>
              {issues.map((iss) => {
                const active = selectedIssue === iss;
                return (
                  <button
                    key={iss}
                    type="button"
                    onClick={() => setSelectedIssue(iss)}
                    style={{
                      padding: '12px 14px',
                      borderRadius: 12,
                      border: active ? '1.5px solid var(--primary)' : '1px solid #E2E8F0',
                      backgroundColor: '#FFFFFF',
                      color: active ? 'var(--primary)' : '#1E293B',
                      fontWeight: active ? 'bold' : '500',
                      fontSize: 12,
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    {iss}
                  </button>
                );
              })}
            </div>

            {/* Note text field */}
            <div style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 16,
              border: '1px solid #E2E8F0',
              padding: '12px 16px',
              marginBottom: 28
            }}>
              <textarea
                rows={4}
                placeholder="Describe your issue or preferred reschedule time..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
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
        )}
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
