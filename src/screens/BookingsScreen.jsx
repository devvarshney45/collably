import React, { useState, useEffect } from 'react';
import { MapPin, Calendar, CheckCircle2, Star, ArrowLeft } from 'lucide-react';
import { api } from '../api';

export default function BookingsScreen({ onNavigate, onSelectService }) {
  const [activeBookings, setActiveBookings] = useState([]);
  const [pastBookings, setPastBookings] = useState([]);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await api.bookings.list();
      setActiveBookings(data.activeBookings || []);
      setPastBookings(data.pastBookings || []);
    } catch (err) {
      console.warn(err);
      setActiveBookings([
        {
          id: 'COL95751',
          serviceId: 'srv_photo',
          title: 'Elite Photography Studio',
          price: '₹2,500/hr',
          location: 'Koramangala, Bangalore',
          imageUrl: '/assets/images/elite_photography.png',
          status: 'Confirmed'
        },
        {
          id: 'COL95752',
          serviceId: 'srv_clean',
          title: 'Premium House Cleaning',
          price: '₹1,500/hr',
          location: 'Koramangala, Bangalore',
          imageUrl: '/assets/images/house_cleaning.png',
          status: 'Confirmed'
        }
      ]);
      setPastBookings([
        {
          id: 'COL95750',
          serviceId: 'srv_photo',
          title: 'Elite Photography Studio',
          price: '₹2,500/hr',
          location: 'Koramangala, Bangalore',
          date: 'Dec 14, 2024',
          imageUrl: '/assets/images/elite_photography.png',
          rating: 5.0
        }
      ]);
    }
  };

  const handleContact = (b) => {
    onSelectService({ id: b.serviceId, title: b.title, image: b.imageUrl });
    onNavigate('serviceDetail');
  };

  const handleReschedule = (b) => {
    onSelectService({ id: b.serviceId, title: b.title, image: b.imageUrl });
    onNavigate('serviceBooking');
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 960,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box'
    }}>
      {/* Title matching Flutter AppBar */}
      <h2 style={{ fontSize: 22, fontWeight: 'bold', color: 'black', marginBottom: 20 }}>
        My Bookings
      </h2>

      {/* Active Bookings Section */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 16 }}>
          Active Bookings
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {activeBookings.map((b) => (
            <div
              key={b.id}
              style={{
                display: 'flex',
                borderRadius: 16,
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
              }}
            >
              <img
                src={b.imageUrl}
                alt={b.title}
                style={{ width: 140, minHeight: 120, objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { e.target.src = '/assets/images/elite_photography.png'; }}
              />

              <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#1E293B',
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {b.title}
                </h4>

                <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: 13, marginBottom: 6 }}>
                  {b.price}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'grey', fontSize: 11, fontWeight: 500, marginBottom: 6 }}>
                  <MapPin size={12} color="grey" />
                  <span>{b.location}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#27AE60', fontSize: 11, fontWeight: 'bold', marginBottom: 12 }}>
                  <CheckCircle2 size={13} color="#27AE60" />
                  <span>Confirmed</span>
                </div>

                <div style={{ display: 'flex', gap: 8, marginTop: 'auto' }}>
                  <button
                    onClick={() => handleContact(b)}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      border: '1px solid #CBD5E1',
                      borderRadius: 6,
                      background: 'white',
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.87)',
                      cursor: 'pointer'
                    }}
                  >
                    Contact
                  </button>

                  <button
                    onClick={() => handleReschedule(b)}
                    style={{
                      flex: 1,
                      padding: '6px 0',
                      border: '1px solid #CBD5E1',
                      borderRadius: 6,
                      background: 'white',
                      fontSize: 11,
                      fontWeight: 600,
                      color: 'rgba(0,0,0,0.87)',
                      cursor: 'pointer'
                    }}
                  >
                    Reschedule
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Bookings Section */}
      <div>
        <h3 style={{ fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 16 }}>
          Past Bookings
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {pastBookings.map((b) => (
            <div
              key={b.id}
              style={{
                display: 'flex',
                borderRadius: 16,
                border: '1px solid #E2E8F0',
                backgroundColor: '#FFFFFF',
                overflow: 'hidden',
                boxShadow: '0 4px 10px rgba(0,0,0,0.02)'
              }}
            >
              <img
                src={b.imageUrl}
                alt={b.title}
                style={{ width: 140, minHeight: 120, objectFit: 'cover', flexShrink: 0 }}
                onError={(e) => { e.target.src = '/assets/images/elite_photography.png'; }}
              />

              <div style={{ padding: 14, flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{
                  fontSize: 13,
                  fontWeight: 'bold',
                  color: '#1E293B',
                  marginBottom: 4,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {b.title}
                </h4>

                <span style={{ color: 'var(--primary)', fontWeight: 'bold', fontSize: 13, marginBottom: 6 }}>
                  {b.price}
                </span>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'grey', fontSize: 11, fontWeight: 500, marginBottom: 4 }}>
                  <MapPin size={12} color="grey" />
                  <span>{b.location}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'grey', fontSize: 11, fontWeight: 600, marginBottom: 12 }}>
                  <Calendar size={12} color="grey" />
                  <span>{b.date || 'Dec 14, 2024'}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 'auto' }}>
                  <button
                    onClick={() => handleReschedule(b)}
                    style={{
                      padding: '6px 16px',
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      border: 'none',
                      borderRadius: 6,
                      fontSize: 11,
                      fontWeight: 'bold',
                      cursor: 'pointer'
                    }}
                  >
                    Reschedule
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    <Star size={14} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 11, color: 'rgba(0,0,0,0.54)', fontWeight: 'bold' }}>
                      Rated {b.rating || '5.0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
