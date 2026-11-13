import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Star,
  ArrowRight,
  PhoneCall,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { api } from '../api';

export default function BookingsScreen({ onNavigate, onSelectService, onBookingUpdate }) {
  const [activeBookings, setActiveBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.bookings.list();
      const sortFn = (a, b) => {
        const getMs = (item) => {
          if (!item || !item.createdAt) return 0;
          const c = item.createdAt;
          if (c._seconds) return c._seconds * 1000 + (c._nanoseconds || 0) / 1000000;
          if (typeof c.toDate === 'function') return c.toDate().getTime();
          if (c instanceof Date) return c.getTime();
          const ms = new Date(c).getTime();
          return isNaN(ms) ? 0 : ms;
        };
        return getMs(b) - getMs(a);
      };
      const active = [...(data.activeBookings || [])].sort(sortFn);
      const past = [...(data.pastBookings || [])].sort(sortFn);
      setActiveBookings(active);
      setPastBookings(past);
      if (onBookingUpdate) {
        onBookingUpdate(active.length);
      }
    } catch (err) {
      console.warn('[BookingsScreen] Failed to load bookings:', err);
      setError('Unable to load bookings. Please check your connection.');
      setActiveBookings([]);
      setPastBookings([]);
      if (onBookingUpdate) {
        onBookingUpdate(0);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleContact = (b) => {
    const bookingId = b.id || b.bookingId || '';
    const title = b.title || b.serviceName || 'Service';
    window.open(
      `https://wa.me/919818191755?text=Hello%20Collably%2C%20regarding%20booking%20${bookingId}%20for%20${encodeURIComponent(title)}`,
      '_blank'
    );
  };

  const handleReschedule = (b) => {
    if (onSelectService) {
      onSelectService({
        id: b.serviceId,
        title: b.title,
        name: b.title,
        image: b.imageUrl,
        iconImage: b.imageUrl,
        price: b.numericPrice || b.price,
        category: b.categoryName || 'Daily Meals'
      });
    }
    onNavigate('serviceBooking');
  };

  const renderStatusBadge = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('pending')) {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '4px 10px',
          borderRadius: 20,
          backgroundColor: '#FFFBEB',
          color: '#B45309',
          border: '1px solid #FDE68A',
          fontSize: 11,
          fontWeight: 700
        }}>
          <Clock size={12} /> Pending Confirmation
        </span>
      );
    }
    if (s.includes('complete')) {
      return (
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '4px 10px',
          borderRadius: 20,
          backgroundColor: '#EFF6FF',
          color: '#1D4ED8',
          border: '1px solid #DBEAFE',
          fontSize: 11,
          fontWeight: 700
        }}>
          <CheckCircle2 size={12} /> Completed
        </span>
      );
    }
    return (
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        padding: '4px 10px',
        borderRadius: 20,
        backgroundColor: '#F0FDF4',
        color: '#15803D',
        border: '1px solid #BBF7D0',
        fontSize: 11,
        fontWeight: 700
      }}>
        <CheckCircle2 size={12} /> Confirmed
      </span>
    );
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 960,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box',
      padding: '8px 16px 40px'
    }}>
      {/* 1. Header with Refresh */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
      }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
            My Bookings
          </h1>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0 }}>
            Track and manage your real-time appointments & service history
          </p>
        </div>

        <button
          onClick={loadBookings}
          disabled={isLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            padding: '8px 14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            color: '#475569',
            cursor: 'pointer',
            transition: 'all 0.15s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--primary)'; }}
          onMouseOut={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; }}
        >
          <RotateCcw size={13} className={isLoading ? 'spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 2. Loading State */}
      {isLoading && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid #F1F5F9'
        }}>
          <div style={{
            width: 36,
            height: 36,
            border: '3px solid #F1F5F9',
            borderTopColor: 'var(--primary)',
            borderRadius: '50%',
            margin: '0 auto 16px',
            animation: 'spin 0.8s linear infinite'
          }} />
          <p style={{ color: '#64748B', fontSize: 14, fontWeight: 600, margin: 0 }}>
            Fetching your live bookings from Firestore...
          </p>
        </div>
      )}

      {/* 3. Error Banner */}
      {!isLoading && error && (
        <div style={{
          padding: '16px 20px',
          borderRadius: 14,
          backgroundColor: '#FEF2F2',
          border: '1px solid #FEE2E2',
          color: '#991B1B',
          fontSize: 13,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 20
        }}>
          <AlertCircle size={18} />
          <span>{error}</span>
          <button
            onClick={loadBookings}
            style={{
              marginLeft: 'auto',
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      )}

      {/* 4. Active Bookings Section */}
      {!isLoading && (
        <div style={{ marginBottom: 36 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 16
          }}>
            <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: 0 }}>
              Active Bookings ({activeBookings.length})
            </h2>
            {activeBookings.length > 0 && (
              <span style={{ fontSize: 12, color: '#64748B', fontWeight: 500 }}>
                Live updates synced with Firestore
              </span>
            )}
          </div>

          {activeBookings.length === 0 ? (
            /* Senior UI Empty State */
            <div style={{
              textAlign: 'center',
              padding: '48px 24px',
              backgroundColor: '#FFFFFF',
              borderRadius: 20,
              border: '1.5px dashed #E2E8F0',
              boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
            }}>
              <div style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 107, 53, 0.08)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px'
              }}>
                <Calendar size={28} />
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
                No Active Bookings
              </h3>
              <p style={{
                fontSize: 13,
                color: '#64748B',
                maxWidth: 420,
                margin: '0 auto 20px',
                lineHeight: 1.5
              }}>
                You do not have any upcoming bookings. Explore our certified services in Delhi NCR and book on-demand in seconds!
              </p>
              <button
                onClick={() => onNavigate('dashboard_home')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '10px 22px',
                  backgroundColor: 'var(--primary)',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 12,
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(255, 107, 53, 0.25)'
                }}
              >
                <span>Explore Services</span>
                <ArrowRight size={15} />
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {activeBookings.map((b) => (
                <div
                  key={b.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    borderRadius: 18,
                    border: '1px solid #E2E8F0',
                    backgroundColor: '#FFFFFF',
                    overflow: 'hidden',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.03)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 107, 53, 0.4)';
                    e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.06)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.borderColor = '#E2E8F0';
                    e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.03)';
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    width: 160,
                    minHeight: 140,
                    position: 'relative',
                    backgroundColor: '#F8FAFC',
                    flexShrink: 0
                  }}>
                    <img
                      src={b.imageUrl}
                      alt={b.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                      onError={(e) => {
                        e.target.src = '/assets/images/daily_meals_hr.jpg';
                      }}
                    />
                    <div style={{
                      position: 'absolute',
                      top: 8,
                      left: 8,
                      backgroundColor: 'rgba(15, 23, 42, 0.75)',
                      color: '#FFFFFF',
                      fontSize: 10,
                      fontWeight: 700,
                      padding: '2px 6px',
                      borderRadius: 6
                    }}>
                      #{String(b.id).slice(-6).toUpperCase()}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div style={{
                    padding: '16px 20px',
                    flex: 1,
                    minWidth: 260,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                        gap: 12,
                        marginBottom: 6
                      }}>
                        <h3 style={{
                          fontSize: 16,
                          fontWeight: 800,
                          color: '#0F172A',
                          margin: 0
                        }}>
                          {b.title}
                        </h3>
                        {renderStatusBadge(b.status)}
                      </div>

                      {/* Price & Category */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 10,
                        marginBottom: 10
                      }}>
                        <span style={{
                          color: 'var(--primary)',
                          fontWeight: 800,
                          fontSize: 16
                        }}>
                          {b.price}
                        </span>
                        {b.categoryName && (
                          <span style={{
                            fontSize: 11,
                            color: '#64748B',
                            backgroundColor: '#F1F5F9',
                            padding: '2px 8px',
                            borderRadius: 6,
                            fontWeight: 600
                          }}>
                            {b.categoryName}
                          </span>
                        )}
                      </div>

                      {/* Meta Information: Date, Time, Location */}
                      <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 16,
                        color: '#64748B',
                        fontSize: 12,
                        fontWeight: 500,
                        marginBottom: 14
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Calendar size={13} color="var(--primary)" />
                          <span>{b.date || 'Today'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <Clock size={13} color="var(--primary)" />
                          <span>{b.time || '11:00 AM'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                          <MapPin size={13} color="#64748B" />
                          <span>{b.location || 'Noida / Gurugram'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      paddingTop: 12,
                      borderTop: '1px solid #F1F5F9'
                    }}>
                      <button
                        onClick={() => handleContact(b)}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          padding: '8px 14px',
                          border: '1.5px solid #E2E8F0',
                          borderRadius: 10,
                          backgroundColor: '#FFFFFF',
                          color: '#1E293B',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                        onMouseOver={(e) => {
                          e.currentTarget.style.borderColor = '#25D366';
                          e.currentTarget.style.color = '#25D366';
                        }}
                        onMouseOut={(e) => {
                          e.currentTarget.style.borderColor = '#E2E8F0';
                          e.currentTarget.style.color = '#1E293B';
                        }}
                      >
                        <PhoneCall size={13} />
                        <span>Support & Contact</span>
                      </button>

                      <button
                        onClick={() => handleReschedule(b)}
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: 6,
                          padding: '8px 14px',
                          border: 'none',
                          borderRadius: 10,
                          backgroundColor: 'var(--primary)',
                          color: '#FFFFFF',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'all 0.15s'
                        }}
                      >
                        <span>Reschedule</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 5. Past Bookings Section */}
      {!isLoading && pastBookings.length > 0 && (
        <div>
          <h2 style={{ fontSize: 17, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
            Past Bookings ({pastBookings.length})
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {pastBookings.map((b) => (
              <div
                key={b.id}
                style={{
                  display: 'flex',
                  borderRadius: 16,
                  border: '1px solid #E2E8F0',
                  backgroundColor: '#FFFFFF',
                  overflow: 'hidden',
                  opacity: 0.95
                }}
              >
                <img
                  src={b.imageUrl}
                  alt={b.title}
                  style={{ width: 120, objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/assets/images/daily_meals_hr.jpg'; }}
                />

                <div style={{ padding: '14px 18px', flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: '#0F172A', margin: 0 }}>
                      {b.title}
                    </h4>
                    <span style={{ fontSize: 12, color: 'var(--primary)', fontWeight: 700 }}>
                      {b.price}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: 14, color: '#64748B', fontSize: 11, marginBottom: 10 }}>
                    <span>{b.date || 'Completed'}</span>
                    <span>•</span>
                    <span>{b.location}</span>
                  </div>

                  <button
                    onClick={() => handleReschedule(b)}
                    style={{
                      padding: '6px 14px',
                      backgroundColor: '#F8FAFC',
                      border: '1px solid #E2E8F0',
                      borderRadius: 8,
                      color: 'var(--primary)',
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Book Again
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
