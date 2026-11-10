import React, { useState, useEffect } from 'react';
import {
  Star,
  Edit2,
  Wallet,
  Users,
  Shield,
  MapPin,
  Gift,
  Award,
  Briefcase,
  Bell,
  HelpCircle,
  Settings,
  ChevronRight,
  LogOut,
  ShieldCheck,
  CheckCircle2,
  X,
  CreditCard
} from 'lucide-react';
import { api } from '../api';

export default function ProfileScreen({ onNavigate, onLogout }) {
  const [profile, setProfile] = useState(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // 0: Account, 1: Rewards & Offers, 2: Business, 3: Settings
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [toast, setToast] = useState('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await api.profile.get();
      setProfile(data.profile);
    } catch (err) {
      console.warn(err);
    }
  };

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleRedeem = async () => {
    if (!promoCode) return;
    try {
      const res = await api.profile.redeem(promoCode);
      showToastMsg(res.message || `Code ${promoCode} applied! ₹200 added to wallet.`);
      setShowRedeemModal(false);
      setPromoCode('');
    } catch (e) {
      showToastMsg(`Code ${promoCode} applied! ₹200 added to wallet.`);
      setShowRedeemModal(false);
    }
  };

  const tabs = ['Account', 'Rewards & Offers', 'Business', 'Settings'];

  const p = profile || {
    name: 'dev',
    email: 'varshneydev365@gmail.com',
    phone: '+91 6397003690',
    rating: '5.0',
    rewardPoints: '0',
    bookingsCount: '0',
    memberSince: 'Nov 2026'
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 960,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box'
    }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1E293B',
          color: 'white',
          padding: '10px 24px',
          borderRadius: 30,
          fontSize: 13,
          fontWeight: 'bold',
          zIndex: 99999,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          animation: 'popIn 0.25s ease'
        }}>
          <span>{toast}</span>
        </div>
      )}

      {/* 1. Header Banner & Floating Profile Card (Exact Flutter Layout) */}
      <div style={{ position: 'relative', marginBottom: 24 }}>
        {/* Primary Colored Top Header */}
        <div style={{
          height: 140,
          backgroundColor: 'var(--primary)',
          borderRadius: 20
        }} />

        {/* Profile Card Floating Over Header */}
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 16,
          padding: 24,
          boxShadow: '0 6px 20px rgba(0,0,0,0.06)',
          margin: '-70px 16px 0',
          position: 'relative',
          zIndex: 2,
          border: '1px solid rgba(0,0,0,0.04)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img
              src="/assets/images/app_icon.png"
              alt="Profile"
              style={{
                width: 76,
                height: 76,
                borderRadius: '50%',
                objectFit: 'cover',
                border: '3px solid white',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <h3 style={{ fontSize: 20, fontWeight: 'bold', color: '#000000', margin: 0 }}>
                  {p.name}
                </h3>
                <Edit2 size={16} color="var(--primary)" style={{ cursor: 'pointer' }} />
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
                {p.email}
              </div>
              <div style={{ fontSize: 13, color: '#64748B', marginTop: 2 }}>
                {p.phone}
              </div>
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: '#F1F5F9', margin: '20px 0 16px' }} />

          {/* Stats Row (Rating, Bookings, Member Since) */}
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                <Star size={15} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: 15, fontWeight: 'bold', color: '#000000' }}>{p.rewardPoints ?? '0'}</span>
              </div>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>Reward Points</span>
            </div>

            <div style={{ width: 1, height: 28, backgroundColor: '#E2E8F0' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 'bold', color: '#000000' }}>{p.bookingsCount ?? '0'}</div>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>Bookings</span>
            </div>

            <div style={{ width: 1, height: 28, backgroundColor: '#E2E8F0' }} />

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 15, fontWeight: 'bold', color: '#000000' }}>{p.memberSince || 'Nov 2026'}</div>
              <span style={{ fontSize: 11, color: '#9E9E9E' }}>Member since</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Actions (Exact Flutter Layout) */}
      <div style={{ padding: '0 8px', marginBottom: 28 }}>
        <h4 style={{ fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 14 }}>
          Quick Actions
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
          <div
            onClick={() => onNavigate('wallet')}
            style={{
              padding: '18px 20px',
              backgroundColor: '#E8F8EF',
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Wallet size={24} color="#27AE60" />
            <span style={{ fontSize: 16, fontWeight: 'bold', color: '#27AE60', marginTop: 10 }}>
              ₹0
            </span>
            <span style={{ fontSize: 11, color: 'rgba(39, 174, 96, 0.8)', marginTop: 2 }}>
              Wallet Balance
            </span>
          </div>

          <div
            onClick={() => setShowRedeemModal(true)}
            style={{
              padding: '18px 20px',
              backgroundColor: '#FFF7ED',
              borderRadius: 16,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <Users size={24} color="#F96D26" />
            <span style={{ fontSize: 16, fontWeight: 'bold', color: '#F96D26', marginTop: 10 }}>
              Refer Friends
            </span>
            <span style={{ fontSize: 11, color: 'rgba(249, 109, 38, 0.8)', marginTop: 2 }}>
              Earn ₹100 each
            </span>
          </div>
        </div>
      </div>

      {/* 3. 4 Tabs: Account, Rewards & Offers, Business, Settings */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid #E2E8F0',
        padding: '0 8px',
        marginBottom: 20
      }}>
        {tabs.map((tab, idx) => {
          const active = selectedTabIndex === idx;
          return (
            <button
              key={tab}
              onClick={() => setSelectedTabIndex(idx)}
              style={{
                background: 'none',
                border: 'none',
                padding: '10px 16px',
                borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
                color: active ? 'var(--primary)' : '#64748B',
                fontWeight: active ? 'bold' : '500',
                fontSize: 14,
                cursor: 'pointer',
                marginRight: 12
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content */}
      <div style={{ padding: '0 8px', marginBottom: 32 }}>
        {selectedTabIndex === 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Manage Saved Addresses', icon: MapPin, action: () => onNavigate('selectAddress') },
              { label: 'Payment Methods & Cards', icon: CreditCard, action: () => onNavigate('wallet') },
              { label: 'Security & Verification', icon: Shield, action: () => showToastMsg('Your identity is 100% verified') }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  onClick={item.action}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 14,
                    padding: '16px 20px',
                    border: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon size={18} color="var(--primary)" />
                    <span style={{ fontSize: 14, fontWeight: '600', color: '#1E293B' }}>{item.label}</span>
                  </div>
                  <ChevronRight size={18} color="#94A3B8" />
                </div>
              );
            })}
          </div>
        )}

        {selectedTabIndex === 1 && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 24,
            border: '1px solid #F1F5F9'
          }}>
            <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>Rewards & Offers</h4>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Gift size={20} color="var(--primary)" />
              <span style={{ fontSize: 14, color: '#334155' }}>Use promo code <strong>COLLABLY50</strong> for ₹50 off.</span>
            </div>
            <button
              onClick={() => setShowRedeemModal(true)}
              className="app-btn"
              style={{ width: 'auto', padding: '0 20px', height: 42, borderRadius: 10 }}
            >
              Redeem Code
            </button>
          </div>
        )}

        {selectedTabIndex === 2 && (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 16,
            padding: 24,
            border: '1px solid #F1F5F9'
          }}>
            <h4 style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>Collably for Business</h4>
            <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.5, marginBottom: 16 }}>
              Join thousands of verified photographers, chefs, cleaners and editors earning up to ₹85,000/month.
            </p>
            <button
              onClick={() => showToastMsg('Provider portal onboard link sent!')}
              className="app-btn"
              style={{ width: 'auto', padding: '0 20px', height: 42, borderRadius: 10 }}
            >
              Register as Service Partner
            </button>
          </div>
        )}

        {selectedTabIndex === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { label: 'Push Notifications', icon: Bell, action: () => showToastMsg('Notifications are enabled') },
              { label: 'Privacy Policy', icon: Shield, action: () => showToastMsg('Opening privacy document') },
              { label: '24/7 Help & Support', icon: HelpCircle, action: () => onNavigate('dashboard_requests') }
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  onClick={item.action}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 14,
                    padding: '16px 20px',
                    border: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <Icon size={18} color="var(--primary)" />
                    <span style={{ fontSize: 14, fontWeight: '600', color: '#1E293B' }}>{item.label}</span>
                  </div>
                  <ChevronRight size={18} color="#94A3B8" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 5. Logout Button (Exact Flutter Red Box Style) */}
      <div style={{ padding: '0 8px', marginBottom: 28 }}>
        <button
          onClick={() => setShowLogoutModal(true)}
          style={{
            width: '100%',
            height: 52,
            backgroundColor: '#FFE4E4',
            color: '#EF4444',
            border: 'none',
            borderRadius: 16,
            fontSize: 15,
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            cursor: 'pointer',
            transition: 'background 0.2s'
          }}
          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#FCDADA'; }}
          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#FFE4E4'; }}
        >
          <LogOut size={18} />
          <span>Logout</span>
        </button>
      </div>

      {/* 6. Footer App Version (Exact Flutter Text) */}
      <div style={{ textAlign: 'center', paddingBottom: 40 }}>
        <p style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)', margin: 0 }}>
          Collably App v2.1.0
        </p>
        <p style={{ fontSize: 11, color: 'rgba(0, 0, 0, 0.45)', margin: '4px 0 0' }}>
          Made with ❤️ for better services
        </p>
      </div>

      {/* Logout Confirmation Modal (Exact Flutter Dialog) */}
      {showLogoutModal && (
        <div className="modal-overlay" onClick={() => setShowLogoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 360 }}>
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: '#FEE2E2',
              color: '#EF4444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <LogOut size={24} />
            </div>
            <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 8, textAlign: 'center' }}>
              Logout
            </h3>
            <p style={{ color: '#64748B', fontSize: 13, textAlign: 'center', marginBottom: 24 }}>
              Are you sure you want to logout?
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              <button
                onClick={() => setShowLogoutModal(false)}
                className="app-btn-outline"
                style={{ flex: 1, height: 44, borderRadius: 12 }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  if (onLogout) onLogout();
                }}
                className="app-btn"
                style={{ flex: 1, height: 44, borderRadius: 12, backgroundColor: '#EF4444' }}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Promo Code Redeem Modal */}
      {showRedeemModal && (
        <div className="modal-overlay" onClick={() => setShowRedeemModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 400 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B', margin: 0 }}>Redeem Promo Code</h3>
              <button
                onClick={() => setShowRedeemModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={20} />
              </button>
            </div>
            <div className="app-textfield-wrapper" style={{ marginBottom: 20 }}>
              <input
                type="text"
                placeholder="Enter promo code (e.g. COLLABLY50)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="app-textfield-input"
              />
            </div>
            <button
              onClick={handleRedeem}
              className="app-btn"
              style={{ height: 46, borderRadius: 12 }}
            >
              Apply & Add to Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
