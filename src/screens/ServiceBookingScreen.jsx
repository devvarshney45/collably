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
  ChevronDown,
  Tag,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { api } from '../api';

export default function ServiceBookingScreen({ onNavigate, selectedService, onBack, onBookingSuccess }) {
  const allTimes = ['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM', '07:00 PM', '09:00 PM'];
  const durations = ['1 Hour Session', '2 Hour Session', '4 Hour Session'];

  const getDynamicDates = () => {
    const list = ['Today', 'Tomorrow'];
    const now = new Date();
    for (let i = 2; i <= 4; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      list.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
    }
    return list;
  };

  const dates = getDynamicDates();

  const isTimeSlotPast = (slotStr, dateStr) => {
    if (dateStr !== 'Today') return false;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const [timePart, meridian] = slotStr.split(' ');
    let [hours, minutes] = (timePart || '0:0').split(':').map(Number);
    if (meridian === 'PM' && hours !== 12) hours += 12;
    if (meridian === 'AM' && hours === 12) hours = 0;
    const slotMinutes = hours * 60 + (minutes || 0);

    return slotMinutes <= currentMinutes;
  };

  const getFirstAvailableSlot = (dateStr) => {
    for (const t of allTimes) {
      if (!isTimeSlotPast(t, dateStr)) return t;
    }
    return allTimes[0];
  };

  const areAllTodaySlotsPast = () => {
    return allTimes.every(t => isTimeSlotPast(t, 'Today'));
  };

  const [phase, setPhase] = useState(1);
  const [selectedDate, setSelectedDate] = useState(() => (areAllTodaySlotsPast() ? 'Tomorrow' : 'Today'));
  const [selectedTime, setSelectedTime] = useState(() => {
    const initDate = areAllTodaySlotsPast() ? 'Tomorrow' : 'Today';
    return getFirstAvailableSlot(initDate);
  });
  const [selectedDuration, setSelectedDuration] = useState('1 Hour Session');
  const [selectedPayment, setSelectedPayment] = useState('UPI');
  const [note, setNote] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingError, setBookingError] = useState('');

  const handleDateChange = (d) => {
    setSelectedDate(d);
    if (isTimeSlotPast(selectedTime, d)) {
      setSelectedTime(getFirstAvailableSlot(d));
    }
  };

  const s = selectedService || {
    id: 'srv_corp_lunch',
    serviceId: 'srv_corp_lunch',
    title: 'Corporate Lunch',
    category: 'Daily Meals',
    price: '₹200',
    numericPrice: 200,
    image: '/assets/images/daily_meals_hr.jpg',
    location: 'Gurugram, Cyber City'
  };

  // Accurate dynamic price breakdown calculation matching the app backend exactly
  const parseNumPrice = (priceStr, numVal) => {
    if (typeof numVal === 'number' && !isNaN(numVal) && numVal > 0) return numVal;
    if (!priceStr) return 200;
    const cleaned = String(priceStr).replace(/[^0-9]/g, '');
    const val = parseInt(cleaned, 10);
    return isNaN(val) || val <= 0 ? 200 : val;
  };

  const unitPrice = Number(s.basePrice) || parseNumPrice(s.price, s.numericPrice);
  const hoursMultiplier = selectedDuration.includes('2') ? 2 : (selectedDuration.includes('4') ? 4 : 1);
  const basePrice = unitPrice * hoursMultiplier;
  
  // Real backend discount: only apply if discount actually exists in Firestore
  const discountRate = Number(s.numericDiscount !== undefined ? s.numericDiscount : (s.discount ? parseInt(String(s.discount).replace(/[^0-9]/g, ''), 10) : 0)) || 0;
  const discountAmount = discountRate > 0 ? Math.round(basePrice * (discountRate / 100)) : 0;
  const platformFee = 50;
  const totalAmount = Math.max(0, basePrice - discountAmount + platformFee);
  const formattedTotal = `₹${totalAmount.toLocaleString('en-IN')}`;

  const handleBookNow = async () => {
    setLoading(true);
    setBookingError('');
    try {
      const now = new Date();
      let bookingDateStr = now.toISOString().split('T')[0];
      if (selectedDate === 'Tomorrow') {
        const d = new Date(now);
        d.setDate(now.getDate() + 1);
        bookingDateStr = d.toISOString().split('T')[0];
      } else if (selectedDate !== 'Today') {
        const parsed = new Date(`${selectedDate}, ${now.getFullYear()}`);
        if (!isNaN(parsed.getTime())) {
          bookingDateStr = parsed.toISOString().split('T')[0];
        }
      }

      const timeSlot = selectedTime || getFirstAvailableSlot(selectedDate);
      const paymentId = 'pay_web_' + Date.now();

      const data = await api.bookings.create({
        serviceId: s.id || s.serviceId || '2o1FYbRgWazZWMTMw5Z3',
        date: bookingDateStr,
        time: timeSlot,
        duration: selectedDuration,
        note: note || '',
        paymentId,
        paymentStatus: 'success',
        status: 'pending_admin',
        totalAmount: formattedTotal,
        numericTotal: totalAmount
      });

      if (data && (data.success || data.bookingId)) {
        const confirmedId = data.bookingId || data.id || `COL${Math.floor(10000 + Math.random() * 90000)}`;

        setBookingConfirmed({
          id: confirmedId,
          bookingId: confirmedId,
          title: s.title || s.name || 'Service Booking',
          date: `${selectedDate} (${bookingDateStr})`,
          time: timeSlot,
          duration: selectedDuration,
          location: s.location || 'Delhi NCR & Noida',
          totalAmount: formattedTotal,
          numericTotal: totalAmount,
          basePrice,
          discountAmount,
          discountRate,
          platformFee
        });
        setPhase(2);
        if (onBookingSuccess) onBookingSuccess();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        throw new Error(data?.message || 'Booking creation failed');
      }
    } catch (err) {
      console.error('Booking create notice:', err);
      setBookingError(err.message || 'Cannot create booking for past time. Please select an upcoming time slot.');
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
            Your service has been successfully booked with live status tracking
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
                <div style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>{bookingConfirmed?.date || `${selectedDate}, December 16`}</div>
                <div style={{ color: '#666666', fontSize: 12 }}>{bookingConfirmed?.time || `${selectedTime} - 1:00 PM`}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ padding: 10, background: 'rgba(255, 107, 53, 0.1)', borderRadius: 10, color: 'var(--primary)' }}>
                <MapPin size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>{bookingConfirmed?.title || s.title}</div>
                <div style={{ color: '#666666', fontSize: 12 }}>{bookingConfirmed?.location || s.location || 'Delhi NCR'}</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ padding: 10, background: 'rgba(255, 107, 53, 0.1)', borderRadius: 10, color: 'var(--primary)' }}>
                <Clock size={18} />
              </div>
              <div>
                <div style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>{bookingConfirmed?.duration || selectedDuration}</div>
                <div style={{ color: '#666666', fontSize: 12 }}>{s.category || 'Professional Service'}</div>
              </div>
            </div>
          </div>

          {/* Breakdown in Receipt */}
          <div style={{
            backgroundColor: '#F8FAFC',
            borderRadius: 14,
            padding: '14px 16px',
            marginBottom: 20
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748B', marginBottom: 6 }}>
              <span>Base price ({selectedDuration})</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>₹{basePrice.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748B', marginBottom: 6 }}>
                <span>Discount ({discountRate}% off)</span>
                <span style={{ fontWeight: 700, color: '#16A34A' }}>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#64748B', marginBottom: 8 }}>
              <span>Platform fee</span>
              <span style={{ fontWeight: 600, color: '#0F172A' }}>₹{platformFee}</span>
            </div>
            <div style={{ height: 1, backgroundColor: '#E2E8F0', margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: 15, color: '#000000' }}>Total Paid</span>
              <span style={{ fontWeight: 'bold', fontSize: 20, color: 'var(--primary)' }}>
                {bookingConfirmed?.totalAmount || formattedTotal}
              </span>
            </div>
          </div>

          {/* Primary Action Button */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <button
              onClick={() => window.open(`https://wa.me/919818191755?text=Hello%20Collably%2C%20regarding%20booking%20${bookingConfirmed?.id || 'COL12345'}%20for%20${encodeURIComponent(s.title)}`, '_blank')}
              style={{
                width: '100%',
                height: 48,
                borderRadius: 12,
                backgroundColor: '#25D366',
                color: 'white',
                border: 'none',
                fontWeight: 'bold',
                fontSize: 14,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.25)'
              }}
            >
              <MessageCircle size={18} />
              <span>Chat with Provider on WhatsApp</span>
            </button>

            <button
              onClick={() => onNavigate('dashboard_bookings')}
              className="app-btn"
              style={{ width: '100%', height: 48, borderRadius: 12, fontSize: 14, fontWeight: 'bold' }}
            >
              View in My Bookings
            </button>

            <button
              onClick={() => onNavigate('dashboard_home')}
              style={{
                background: 'none',
                border: 'none',
                color: '#64748B',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              Back to Home
            </button>
          </div>
        </div>
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
        {/* Service Summary Banner */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '14px 18px',
          borderRadius: 16,
          backgroundColor: '#FFF7ED',
          border: '1.5px solid #FFEDD5',
          marginBottom: 26
        }}>
          <img
            src={s.image || '/assets/images/daily_meals_hr.jpg'}
            alt={s.title}
            style={{ width: 60, height: 60, borderRadius: 12, objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/assets/images/daily_meals_hr.jpg'; }}
          />
          <div style={{ flex: 1 }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>
              {s.category || 'Professional Service'}
            </span>
            <div style={{ fontSize: 16, fontWeight: 800, color: '#0F172A', marginTop: 2 }}>
              {s.title}
            </div>
            <div style={{ fontSize: 12, color: '#64748B', marginTop: 2 }}>
              {s.location || 'Delhi NCR'} • {s.price}
            </div>
          </div>
        </div>

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
                  onClick={() => handleDateChange(d)}
                  style={{
                    padding: '10px 18px',
                    borderRadius: 12,
                    border: active ? '1.5px solid var(--primary)' : '1px solid #E2E8F0',
                    backgroundColor: active ? 'var(--primary)' : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#334155',
                    fontWeight: active ? 'bold' : '500',
                    fontSize: 13,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    whiteSpace: 'nowrap'
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Clock size={18} color="var(--primary)" />
              <h3 style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', margin: 0 }}>Select Time</h3>
            </div>
            {selectedDate === 'Today' && (
              <span style={{ fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                Showing upcoming slots for today
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(105px, 1fr))', gap: 10 }}>
            {allTimes.map((t) => {
              const isPast = isTimeSlotPast(t, selectedDate);
              const active = selectedTime === t;
              return (
                <button
                  key={t}
                  type="button"
                  disabled={isPast}
                  onClick={() => !isPast && setSelectedTime(t)}
                  style={{
                    padding: '10px 12px',
                    borderRadius: 12,
                    border: isPast
                      ? '1px dashed #E2E8F0'
                      : (active ? '1.5px solid var(--primary)' : '1px solid #E2E8F0'),
                    backgroundColor: isPast
                      ? '#F8FAFC'
                      : (active ? 'var(--primary)' : '#FFFFFF'),
                    color: isPast
                      ? '#94A3B8'
                      : (active ? '#FFFFFF' : '#334155'),
                    fontWeight: active ? 'bold' : '500',
                    fontSize: 13,
                    cursor: isPast ? 'not-allowed' : 'pointer',
                    textAlign: 'center',
                    opacity: isPast ? 0.45 : 1,
                    textDecoration: isPast ? 'line-through' : 'none',
                    transition: 'all 0.2s',
                    position: 'relative'
                  }}
                  title={isPast ? 'This slot has already passed today' : t}
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
            Select Duration
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

        {/* 5. Detailed Price Breakdown (Exact Flutter Design) */}
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Tag size={18} color="var(--primary)" />
            <h3 style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', margin: 0 }}>
              Price Breakdown
            </h3>
          </div>

          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            border: '1.5px solid #E2E8F0',
            padding: '18px 20px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
              <span style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>
                Base price ({selectedDuration})
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                ₹{basePrice.toLocaleString('en-IN')}
              </span>
            </div>

            {discountAmount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
                <span style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>
                  Discount ({discountRate}% off)
                </span>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#16A34A' }}>
                  -₹{discountAmount.toLocaleString('en-IN')}
                </span>
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0' }}>
              <span style={{ fontSize: 14, color: '#475569', fontWeight: 500 }}>
                Platform fee
              </span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#0F172A' }}>
                ₹{platformFee}
              </span>
            </div>

            <div style={{ height: 1, backgroundColor: '#E2E8F0', margin: '14px 0' }} />

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0' }}>
              <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                Total Amount
              </span>
              <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--primary)' }}>
                {formattedTotal}
              </span>
            </div>
          </div>
        </div>

        {/* 6. Payment Method */}
        <div style={{ marginBottom: 28 }}>
          <h3 style={{ fontSize: 15, fontWeight: 'bold', color: '#000000', marginBottom: 12 }}>
            Payment Method
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { id: 'UPI', title: 'UPI', subtitle: 'Pay with UPI apps (GPay, PhonePe, Paytm)', icon: Smartphone },
              { id: 'Card', title: 'Credit / Debit Card', subtitle: 'Visa, Mastercard, RuPay', icon: CreditCard },
              { id: 'Wallet', title: 'Collably Wallet', subtitle: 'Pay from instant wallet balance', icon: Wallet }
            ].map((pm) => {
              const active = selectedPayment === pm.id;
              const IconComp = pm.icon;
              return (
                <div
                  key={pm.id}
                  onClick={() => setSelectedPayment(pm.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '14px 18px',
                    borderRadius: 14,
                    border: active ? '2px solid var(--primary)' : '1px solid #E2E8F0',
                    backgroundColor: active ? 'var(--primary)' : '#FFFFFF',
                    color: active ? '#FFFFFF' : '#0F172A',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    backgroundColor: active ? 'rgba(255,255,255,0.2)' : '#F1F5F9',
                    color: active ? '#FFFFFF' : 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <IconComp size={20} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 800, fontSize: 14, color: active ? '#FFFFFF' : '#0F172A' }}>
                      {pm.title}
                    </div>
                    <div style={{ fontSize: 12, color: active ? 'rgba(255,255,255,0.85)' : '#64748B', marginTop: 2 }}>
                      {pm.subtitle}
                    </div>
                  </div>
                  <div style={{
                    width: 20,
                    height: 20,
                    borderRadius: '50%',
                    border: active ? '2px solid #FFFFFF' : '2px solid #CBD5E1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {active && <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: '#FFFFFF' }} />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking Error Banner */}
        {bookingError && (
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#FEF2F2',
            border: '1px solid #FEE2E2',
            borderRadius: 12,
            color: '#B91C1C',
            fontSize: 13,
            fontWeight: 600,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8
          }}>
            <AlertCircle size={16} />
            <span>{bookingError}</span>
          </div>
        )}

        {/* Agreement notice */}
        <p style={{ textAlign: 'center', fontSize: 12, color: '#64748B', marginBottom: 20 }}>
          By confirming this booking, you agree to Collably Terms of Service & Cancellation Policy.
        </p>

        {/* Submit */}
        <button
          className="app-btn"
          onClick={handleBookNow}
          disabled={loading}
          style={{ width: '100%', height: 50, borderRadius: 14, fontSize: 16, fontWeight: 800 }}
        >
          {loading ? 'Securing Booking...' : `Book Now • ${formattedTotal}`}
        </button>
      </div>
    </div>
  );
}
