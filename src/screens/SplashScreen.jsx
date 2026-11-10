import React, { useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function SplashScreen({ onNavigate, isLoggedIn }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoggedIn) {
        onNavigate('dashboard_home');
      } else {
        onNavigate('onboarding');
      }
    }, 2200);
    return () => clearTimeout(timer);
  }, [isLoggedIn, onNavigate]);

  return (
    <div className="web-splash-screen" style={{
      minHeight: '65vh',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      borderRadius: 24,
      border: '1px solid #E2E8F0',
      boxShadow: 'var(--shadow-sm)',
      padding: '60px 24px',
      position: 'relative'
    }}>
      <div style={{
        animation: 'pulse 1.8s infinite ease-in-out',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32
      }}>
        <img
          src="/assets/svgs/app_logo.svg"
          alt="Collably"
          style={{ width: 130, height: 130, objectFit: 'contain', marginBottom: 20 }}
        />
        <img
          src="/assets/svgs/Collably.svg"
          alt="Collably"
          style={{ height: 44, objectFit: 'contain' }}
        />
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: '#64748B',
        fontSize: 14,
        fontWeight: 600,
        marginBottom: 28
      }}>
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          animation: 'pulse 1s infinite'
        }} />
        <span>Loading Verified Services & Marketplace...</span>
      </div>

      <button
        onClick={() => onNavigate(isLoggedIn ? 'dashboard_home' : 'onboarding')}
        className="app-btn-outline"
        style={{
          width: 'auto',
          padding: '0 24px',
          height: 44,
          borderRadius: 12,
          fontSize: 13,
          fontWeight: 700
        }}
      >
        <span>Skip & Enter Platform</span>
        <ArrowRight size={15} />
      </button>
    </div>
  );
}
