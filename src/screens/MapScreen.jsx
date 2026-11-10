import React from 'react';
import { ArrowLeft, MapPin, Navigation, CheckCircle2, ShieldCheck } from 'lucide-react';
import { api } from '../api';

export default function MapScreen({ onNavigate, selectedAddress, setIsLoggedIn, onBack }) {
  const title = selectedAddress?.title || selectedAddress?.label || 'Home';
  const subtitle = selectedAddress?.subtitle || selectedAddress?.fullAddress || 'Ghaziabad, uttar pradesh -';

  const handleConfirm = async () => {
    try {
      await api.addresses.confirm(title, subtitle);
      if (setIsLoggedIn) setIsLoggedIn(true);
      onNavigate('dashboard_home');
    } catch (err) {
      console.error(err);
      if (setIsLoggedIn) setIsLoggedIn(true);
      onNavigate('dashboard_home');
    }
  };

  return (
    <div className="web-map-screen" style={{ width: '100%', maxWidth: 840, margin: '20px auto 60px', animation: 'fadeIn 0.25s ease' }}>
      {/* Top Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          onClick={onBack || (() => onNavigate('selectAddress'))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: '#0F172A',
            fontSize: 14,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={18} />
          <span>Back to Address List</span>
        </button>

        <span style={{ fontSize: 13, color: '#64748B', fontWeight: 600 }}>Confirm GPS Location</span>
      </div>

      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-md)'
      }}>
        {/* Map Simulation Canvas */}
        <div style={{
          width: '100%',
          height: 380,
          position: 'relative',
          backgroundColor: '#E5E7EB',
          backgroundImage: 'radial-gradient(#CBD5E1 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden'
        }}>
          {/* Simulated Street Grid */}
          <div style={{ position: 'absolute', width: '120%', height: 24, background: '#FFFFFF', top: '35%', transform: 'rotate(-12deg)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
          <div style={{ position: 'absolute', width: '120%', height: 32, background: '#FFFFFF', top: '60%', transform: 'rotate(18deg)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
          <div style={{ position: 'absolute', width: 28, height: '120%', background: '#FFFFFF', left: '28%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />
          <div style={{ position: 'absolute', width: 28, height: '120%', background: '#FFFFFF', right: '32%', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }} />

          {/* Center Location Pin with Ripple */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 10,
            transform: 'translateY(-20px)'
          }}>
            <div style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              backgroundColor: 'var(--primary)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(255, 107, 53, 0.45)',
              animation: 'bounce 1.5s infinite ease-in-out'
            }}>
              <MapPin size={30} fill="white" />
            </div>
            <div style={{
              width: 20,
              height: 6,
              borderRadius: '50%',
              backgroundColor: 'rgba(0,0,0,0.25)',
              marginTop: 4
            }} />
          </div>

          <div style={{
            position: 'absolute',
            bottom: 16,
            right: 16,
            background: 'white',
            padding: '6px 12px',
            borderRadius: 10,
            fontSize: 12,
            fontWeight: 700,
            color: '#334155',
            boxShadow: 'var(--shadow-sm)',
            display: 'flex',
            alignItems: 'center',
            gap: 6
          }}>
            <Navigation size={14} color="var(--primary)" />
            <span>GPS Calibrated • Precision 5m</span>
          </div>
        </div>

        {/* Location Confirmation Details Bar */}
        <div style={{ padding: '32px 36px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24, gap: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                backgroundColor: 'var(--primary-light)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MapPin size={24} />
              </div>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900, color: 'var(--navy)', marginBottom: 4 }}>
                  {title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: 14, margin: 0 }}>
                  {subtitle}
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#27AE60', fontSize: 13, fontWeight: 700 }}>
              <CheckCircle2 size={16} /> Verified Address
            </div>
          </div>

          <button
            onClick={handleConfirm}
            className="app-btn"
            style={{ width: '100%', height: 52, borderRadius: 14, fontSize: 16, fontWeight: 800 }}
          >
            <span>Confirm This Address & Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
}
