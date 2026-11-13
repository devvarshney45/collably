import React, { useState } from 'react';
import {
  MapPin,
  ChevronDown,
  Search,
  User,
  RotateCcw,
  Home,
  Calendar,
  ClipboardList,
  Wallet,
  ShieldCheck,
  PhoneCall,
  Sparkles
} from 'lucide-react';

export default function WebNavbar({
  currentScreen,
  dashboardTab,
  onNavigate,
  onReset,
  screenList = [],
  activeAddress,
  cartCount = 0,
  bookingsCount = 0,
  isLoggedIn,
  onLogout
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const isDashboard = currentScreen === 'dashboard';

  const navLinks = [
    { id: 'dashboard_home', tab: 'home', label: 'Home', icon: Home },
    { id: 'dashboard_bookings', tab: 'bookings', label: 'Bookings', icon: Calendar, badge: bookingsCount > 0 ? bookingsCount : null },
    { id: 'dashboard_requests', tab: 'requests', label: 'Requests', icon: ClipboardList },
    { id: 'wallet', tab: 'wallet', label: 'Wallet', icon: Wallet },
  ];

  const getIsActive = (link) => {
    if (link.id.startsWith('dashboard_')) {
      return isDashboard && dashboardTab === link.tab;
    }
    return currentScreen === link.id || (isDashboard && dashboardTab === link.tab);
  };

  const handleSearchSubmit = (e) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('search', { q: searchQuery.trim() });
    } else {
      onNavigate('search');
    }
  };

  return (
    <header className="web-header-container" style={{ width: '100%', position: 'sticky', top: 0, zIndex: 1000, boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
      {/* ================= BAR 1: TOP UTILITY BAR ================= */}
      <div className="web-top-bar" style={{
        backgroundColor: '#0F172A',
        color: '#94A3B8',
        fontSize: 12,
        height: 38,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1140,
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
          boxSizing: 'border-box'
        }}>
          {/* Left: Active Delivery Address Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div
              onClick={() => onNavigate('selectAddress')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                cursor: 'pointer',
                color: '#E2E8F0',
                transition: 'color 0.15s'
              }}
              title="Click to change your delivery location"
              onMouseOver={(e) => { e.currentTarget.style.color = '#FFA07A'; }}
              onMouseOut={(e) => { e.currentTarget.style.color = '#E2E8F0'; }}
            >
              <MapPin size={13} color="var(--primary)" />
              <span style={{ color: '#94A3B8' }}>Deliver to:</span>
              <strong style={{
                color: '#FFFFFF',
                maxWidth: 240,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: 'inline-block'
              }}>
                {activeAddress || 'Home • Ghaziabad, Uttar Pradesh'}
              </strong>
              <ChevronDown size={12} color="#94A3B8" />
            </div>

            <span style={{ color: '#334155' }}>|</span>

            {/* Concierge Hotline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#94A3B8', fontSize: 11 }}>
              <PhoneCall size={11} color="#27AE60" />
              <span>24/7 Helpline: +91 6397003690</span>
            </div>
          </div>

          {/* Right: Screen Selector, Reset & Profile State */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Quick Screen Selector Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: 11, color: '#64748B' }}>Screen:</span>
              <select
                value={currentScreen === 'dashboard' ? `dashboard_${dashboardTab}` : currentScreen}
                onChange={(e) => onNavigate(e.target.value)}
                style={{
                  backgroundColor: '#1E293B',
                  color: '#E2E8F0',
                  border: '1px solid #334155',
                  borderRadius: 6,
                  padding: '2px 8px',
                  fontSize: 11,
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer',
                  maxWidth: 150
                }}
                title="Jump directly to any of the 20 screens"
              >
                {screenList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <button
              onClick={onReset}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                backgroundColor: 'transparent',
                border: '1px solid #334155',
                color: '#94A3B8',
                borderRadius: 6,
                padding: '2px 8px',
                fontSize: 11,
                fontWeight: 600,
                cursor: 'pointer'
              }}
              title="Reset flow to Splash screen"
            >
              <RotateCcw size={10} />
              <span>Reset</span>
            </button>

            {/* KYC Verified Status */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              color: '#34D399',
              fontSize: 11,
              fontWeight: 700
            }}>
              <ShieldCheck size={12} />
              <span>KYC Verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= BAR 2: MAIN NAVIGATION BAR ================= */}
      <div className="web-main-bar" style={{
        backgroundColor: '#FFFFFF',
        height: 68,
        display: 'flex',
        alignItems: 'center',
        borderBottom: '1px solid #E2E8F0'
      }}>
        <div style={{
          width: '100%',
          maxWidth: 1140,
          margin: '0 auto',
          padding: '0 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 20,
          boxSizing: 'border-box'
        }}>
          {/* 1. Brand Logo */}
          <div
            onClick={() => onNavigate('dashboard_home')}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              flexShrink: 0
            }}
          >
            <img
              src="/assets/svgs/logo_app_name.svg"
              alt="Collably"
              style={{ height: 40, objectFit: 'contain' }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* 2. Senior UI Search Bar (Balanced & Properly Contained) */}
          <form
            onSubmit={handleSearchSubmit}
            style={{
              flex: 1,
              maxWidth: 480,
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F8FAFC',
              border: '1.5px solid #E2E8F0',
              borderRadius: 14,
              padding: '4px 6px 4px 14px',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(255, 107, 53, 0.12)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = '#E2E8F0';
              e.currentTarget.style.backgroundColor = '#F8FAFC';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
            }}
          >
            <Search size={16} color="#94A3B8" style={{ flexShrink: 0, marginRight: 10 }} />
            <input
              type="text"
              placeholder="Search Daily Meals, Appliance Repair, Babysitting, Cleaning..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                fontSize: 13,
                color: '#1E293B',
                fontFamily: 'inherit'
              }}
            />
            <button
              type="submit"
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '6px 14px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.15s',
                flexShrink: 0
              }}
            >
              Search
            </button>
          </form>

          {/* 3. Primary Navigation Links */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }}>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = getIsActive(link);
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  style={{
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    padding: '8px 12px',
                    borderRadius: 10,
                    border: 'none',
                    backgroundColor: active ? 'var(--primary-light)' : 'transparent',
                    color: active ? 'var(--primary)' : '#475569',
                    fontSize: 13,
                    fontWeight: active ? 700 : 600,
                    cursor: 'pointer',
                    transition: 'all 0.15s'
                  }}
                  onMouseOver={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = '#F8FAFC';
                      e.currentTarget.style.color = 'var(--primary)';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!active) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#475569';
                    }
                  }}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                  {link.badge && (
                    <span style={{
                      backgroundColor: 'var(--primary)',
                      color: 'white',
                      fontSize: 9,
                      fontWeight: 800,
                      borderRadius: 10,
                      padding: '1px 5px',
                      marginLeft: 2
                    }}>
                      {link.badge}
                    </span>
                  )}
                  {active && (
                    <span style={{
                      position: 'absolute',
                      bottom: -8,
                      left: 12,
                      right: 12,
                      height: 2.5,
                      backgroundColor: 'var(--primary)',
                      borderRadius: 2
                    }} />
                  )}
                </button>
              );
            })}
          </nav>

          {/* 4. User Profile / Sign In */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            {/* Profile Avatar / Login */}
            {isLoggedIn ? (
              <div
                onClick={() => onNavigate('dashboard_profile')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 10px 4px 4px',
                  backgroundColor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 24,
                  cursor: 'pointer'
                }}
                title="View Profile"
              >
                <img
                  src="/assets/images/app_icon.png"
                  alt="dev"
                  style={{ width: 30, height: 30, borderRadius: '50%', objectFit: 'cover' }}
                />
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1E293B' }}>dev</span>
              </div>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '8px 16px',
                  borderRadius: 10,
                  backgroundColor: 'var(--primary)',
                  color: 'white',
                  border: 'none',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                <User size={14} />
                <span>Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
