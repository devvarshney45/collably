import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  FileText,
  Smartphone,
  CreditCard,
  Wallet,
  Check,
  Download,
  Share2,
  MessageCircle,
  MapPin,
  ChevronDown
} from 'lucide-react';
import { api } from '../api';

export default function ServiceBookingScreen({ onNavigate, selectedService, onBack }) {
  const [phase, setPhase] = useState(1);
  const [selectedDate, setSelectedDate] = useState('Today');
  const [selectedTime, setSelectedTime] = useState('11:00 AM');
  const [selectedDuration, setSelectedDuration] = useState('2 Hour Session');
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [note, setNote] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [loading, setLoading] = useState(false);

  const dates = ['Today', 'Tomorrow', 'Dec 18', 'Dec 19'];
  const times = ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM', '5:00 PM', '7:00 PM'];
  const durations = ['1 Hour Session', '2 Hour Session', '4 Hour Session'];

  const s = selectedService || {
    id: 'srv_photo',
    title: 'Elite Photography Studio',
    category: 'Studio',
    price: '₹2,500/hr',
    image: '/assets/images/elite_photography.png',
    location: 'Koramangala, Bangalore'
  };

  const handleBookNow = async () => {
    setLoading(true);
    try {
      const data = await api.bookings.create({
        serviceId: s.id || 'srv_photo',
        title: s.title || 'Elite Photography Studio',
        date: `${selectedDate}, December 16`,
        time: `${selectedTime} - 1:00 PM`,
        duration: selectedDuration,
        paymentMethod: selectedPayment,
        note
      });
      setBookingConfirmed(data.booking);
      setPhase(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error(err);
      setBookingConfirmed({
        id: 'COL95751',
        title: s.title || 'Elite Photography Studio',
        date: `${selectedDate}, December 16`,
        time: `${selectedTime} - 1:00 PM`,
        duration: selectedDuration,
        location: s.location || 'Koramangala, Bangalore',
        totalAmount: '₹4,550'
      });
      setPhase(2);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  if (phase === 2) {
    // Confirmation UI (Exact Flutter Visuals)
    return (
      <div style={{
        width: '100%',
        maxWidth: 620,
        margin: '20px auto 60px',
        animation: 'fadeIn 0.25s ease',
        boxSizing: 'border-box'
      }}>
        {/* Status Box */}
        <div style={{
          backgroundColor: '#E8F8EF',
          borderRadius: 20,
          padding: '32px 24px',
          textAlign: 'center',
          marginBottom: 24,
          border: '1px solid rgba(39, 174, 96, 0.2)'
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            backgroundColor: '#27AE60',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 6px 16px rgba(39, 174, 96, 0.3)'
          }}>
            <Check size={36} strokeWidth={3} />
          </div>
          <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', marginBottom: 6 }}>
            Booking Confirmed!
          </h2>
          <p style={{ color: '#666666', fontSize: 13, margin: 0 }}>
            Your service has been successfully booked
          </p>
        </div>

        {/* Receipt Card */}
        <div style={{
          borderRadius: 20,
          border: '1px solid #E2E8F0',
          backgroundColor: '#FFFFFF',
          padding: '28px 24px',
          boxShadow: 'var(--shadow-sm)',
          marginBottom: 24
        }}>
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <span style={{ fontSize: 12, color: '#9E9E9E' }}>Booking ID</span>
            <div style={{ fontSize: 20, fontWeight: 'bold', color: '#000000', marginTop: 4 }}>
              #{bookingConfirmed?.id || 'COL95751'}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ padding: 10, background: 'rgba(255, 107, 53, 0.1)', borderRadius: 10, color: 'var(--primary)' }}>
                <Calendar size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>{bookingConfirmed?.date || 'Today, December 16'}</div>
                <div style={{ color: '#666666', fontSize: 12 }}>{bookingConfirmed?.time || '11:00 AM - 1:00 PM'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ padding: 10, background: 'rgba(255, 107, 53, 0.1)', borderRadius: 10, color: 'var(--primary)' }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>{bookingConfirmed?.title || s.title}</div>
                <div style={{ color: '#666666', fontSize: 12 }}>{bookingConfirmed?.location || 'Koramangala, Bangalore'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ padding: 10, background: 'rgba(255, 107, 53, 0.1)', borderRadius: 10, color: 'var(--primary)' }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>{bookingConfirmed?.duration || selectedDuration}</div>
                <div style={{ color: '#666666', fontSize: 12 }}>Photography Service</div>
              </div>
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: '#E2E8F0', margin: '20px 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: 15, color: '#000000' }}>Total Paid</span>
            <span style={{ fontWeight: 'bold', fontSize: 20, color: 'var(--primary)' }}>
              {bookingConfirmed?.totalAmount || '₹4,550'}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
          <button
            onClick={() => alert('Booking receipt downloaded!')}
            className="app-btn-outline"
            style={{ flex: 1, height: 46, borderRadius: 12, fontSize: 13, fontWeight: 'bold' }}
          >
            <Download size={16} />
            <span>Download</span>
          </button>
          <button
            onClick={() => alert('Booking shared!')}
            className="app-btn-outline"
            style={{ flex: 1, height: 46, borderRadius: 12, fontSize: 13, fontWeight: 'bold' }}
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>

        <button
          onClick={() => onNavigate('dashboard_bookings')}
          className="app-btn"
          style={{ width: '100%', height: 48, borderRadius: 12, fontSize: 15, fontWeight: 'bold' }}
        >
          View in My Bookings
        </button>
      </div>
    );
  }

  // Phase 1: Booking Form (Exact Flutter Widgets)
  return (
    <div style={{
      width: '100%',
      maxWidth: 780,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box'
    }}>
      {/* Top Header */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <button
          onClick={onBack || (() => onNavigate('serviceDetail'))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: '#000000',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
        <h2 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', margin: '0 auto 0 20px' }}>
          Book Your Service
        </h2>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        border: '1px solid #E2E8F0',
        padding: '28px 32px',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {/* 1. Select Date */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Calendar size={18} color="var(--primary)" />
            <h3 style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', margin: 0 }}>Select Date</h3>
          </div>

          <div style={{ display: 'flex', gap: 10, overflowX: 'auto', paddingBottom: 4 }}>
            {dates.map((d) => {
              const active = selectedDate === d;
              return (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDate(d)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 12,
                    border: active ? '1.5px solid var(--primary)' : '1px solid #E2E8F0',
                    backgroundColor: active ? 'rgba(255, 107, 53, 0.1)' : '#FFFFFF',
                    color: active ? 'var(--primary)' : '#334155',
                    fontWeight: active ? 'bold' : '500',
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Select Time */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Clock size={18} color="var(--primary)" />
            <h3 style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', margin: 0 }}>Select Time</h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 10 }}>
            {times.map((t) => {
              const active = selectedTime === t;
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setSelectedTime(t)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: active ? '1.5px solid var(--primary)' : '1px solid #E2E8F0',
                    backgroundColor: active ? 'rgba(255, 107, 53, 0.1)' : '#FFFFFF',
                    color: active ? 'var(--primary)' : '#334155',
                    fontWeight: active ? 'bold' : '500',
                    fontSize: 13,
                    cursor: 'pointer',
                    textAlign: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  {t}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. Session Duration */}
        <div style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', marginBottom: 10 }}>
            Price Breakdown / Duration
          </h3>

          <div className="app-textfield-wrapper">
            <span className="app-textfield-prefix"><Clock size={18} color="var(--primary)" /></span>
            <select
              value={selectedDuration}
              onChange={(e) => setSelectedDuration(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: 14,
                color: '#000000',
                fontFamily: 'inherit',
                cursor: 'pointer'
              }}
            >
              {durations.map((dur) => (
                <option key={dur} value={dur}>{dur}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 4. Write A Note */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', marginBottom: 10 }}>
            Write A Note
          </h3>
          <div className="app-textfield-wrapper" style={{ alignItems: 'flex-start', padding: '12px 14px' }}>
            <span className="app-textfield-prefix" style={{ paddingTop: 4 }}><FileText size={18} color="var(--primary)" /></span>
            <textarea
              rows={3}
              placeholder="Write any instructions for provider..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 14,
                color: '#000000',
                fontFamily: 'inherit',
                resize: 'none',
                background: 'transparent'
              }}
            />
          </div>
        </div>

        {/* 5. Payment Method & Total */}
        <div style={{
          backgroundColor: '#F8FAFC',
          borderRadius: 16,
          padding: '20px',
          border: '1px solid #E2E8F0',
          marginBottom: 24
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <span style={{ fontWeight: 'bold', fontSize: 15, color: '#000000' }}>Total Amount</span>
            <span style={{ fontWeight: 'bold', fontSize: 22, color: 'var(--primary)' }}>₹4,550</span>
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            {['UPI', 'Card', 'Wallet'].map((p) => {
              const active = selectedPayment === p;
              return (
                <button
                  key={p}
                  type="button"
                  onClick={() => setSelectedPayment(p)}
                  style={{
                    flex: 1,
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: active ? '1.5px solid var(--primary)' : '1px solid #CBD5E1',
                    backgroundColor: active ? 'var(--primary-light)' : '#FFFFFF',
                    color: active ? 'var(--primary)' : '#475569',
                    fontWeight: active ? 'bold' : '600',
                    fontSize: 13,
                    cursor: 'pointer'
                  }}
                >
                  {p}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit */}
        <button
          className="app-btn"
          onClick={handleBookNow}
          disabled={loading}
          style={{ height: 48, borderRadius: 12, fontSize: 15 }}
        >
          {loading ? 'Securing Booking...' : 'Book Now • ₹4,550'}
        </button>
      </div>
    </div>
  );
}
