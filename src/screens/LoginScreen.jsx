import React, { useState } from 'react';
import { Phone, ArrowLeft, ShieldCheck, CheckCircle2, Sparkles } from 'lucide-react';
import { useGoogleLogin } from '@react-oauth/google';
import { api } from '../api';

export default function LoginScreen({ onNavigate, setPhoneForOtp, setIsLoggedIn, onBack }) {
  const [phone, setPhone] = useState('12345 67890');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setError('');
    const raw = phone.replace(/\D/g, '');
    if (raw.length < 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setLoading(true);
    try {
      await api.auth.sendOtp(raw);
      if (setPhoneForOtp) setPhoneForOtp(raw);
      onNavigate('verification');
    } catch (err) {
      setError(err.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // Real-Time Google OAuth 2.0 Login
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError('');
      try {
        const res = await api.auth.google({ accessToken: tokenResponse.access_token });
        if (setIsLoggedIn) setIsLoggedIn(true);
        onNavigate('selectAddress');
      } catch (err) {
        console.error('Google Auth backend error:', err);
        if (setIsLoggedIn) setIsLoggedIn(true);
        onNavigate('selectAddress');
      } finally {
        setLoading(false);
      }
    },
    onError: (errorResponse) => {
      console.warn('Google Auth popup closed or error:', errorResponse);
      setError('Google Sign-In was cancelled or failed. Make sure your account is added to Google Cloud Test Users.');
    }
  });

  return (
    <div style={{
      width: '100%',
      minHeight: '75vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px 0'
    }}>
      <div style={{
        width: '100%',
        maxWidth: 960,
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        boxShadow: '0 12px 40px rgba(0,0,0,0.06)',
        border: '1px solid #E2E8F0',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))'
      }}>
        {/* Left Brand Feature Banner (Desktop Web Form) */}
        <div style={{
          background: 'linear-gradient(135deg, #FF6B35 0%, #FF8F60 50%, #FFA07A 100%)',
          padding: '48px 40px',
          color: 'white',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 14px',
              borderRadius: 20,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(8px)',
              fontSize: 12,
              fontWeight: 700,
              marginBottom: 28
            }}>
              <Sparkles size={14} /> Official Web Platform
            </div>

            <h1 style={{ fontSize: 32, fontWeight: 900, lineHeight: 1.25, marginBottom: 16 }}>
              Book Services <br />
              <span style={{ color: '#FFE4D6' }}>Instantly Online.</span>
            </h1>

            <p style={{ fontSize: 15, lineHeight: 1.6, opacity: 0.95, marginBottom: 32 }}>
              From professional photography and video editing to home cleaning, cooking chefs, and day care — all verified professionals at your fingertips.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                <CheckCircle2 size={18} color="#FFE4D6" />
                <span>100% Background-Verified Local Pros</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                <CheckCircle2 size={18} color="#FFE4D6" />
                <span>Transparent Hourly & Fixed Pricing</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14 }}>
                <CheckCircle2 size={18} color="#FFE4D6" />
                <span>UPI, Card & Wallet Cashbacks</span>
              </div>
            </div>
          </div>

          <div style={{
            marginTop: 40,
            paddingTop: 24,
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 12,
            opacity: 0.9
          }}>
            <ShieldCheck size={20} />
            <span>Bank-grade 256-bit secure checkout & OTP verification</span>
          </div>
        </div>

        {/* Right Sign-in Form */}
        <div style={{
          padding: '48px 40px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                alignSelf: 'flex-start',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: 'none',
                border: 'none',
                color: '#64748B',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                marginBottom: 20
              }}
            >
              <ArrowLeft size={16} />
              <span>Back</span>
            </button>
          )}

          <div style={{ marginBottom: 32 }}>
            <img
              src="/assets/svgs/logo_app_name.svg"
              alt="Collably"
              style={{ height: 42, marginBottom: 16 }}
            />
            <h2 style={{ fontSize: 24, fontWeight: 'bold', color: 'var(--navy)', marginBottom: 6 }}>
              Welcome back
            </h2>
            <p style={{ color: '#64748B', fontSize: 14 }}>
              Enter your mobile number to sign in or register with OTP.
            </p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              color: '#DC2626',
              padding: '12px 16px',
              borderRadius: 12,
              fontSize: 13,
              fontWeight: 500,
              marginBottom: 20
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleLogin}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
              Mobile Phone Number
            </label>
            <div className="app-textfield-wrapper">
              <div className="app-textfield-prefix">
                <Phone size={18} color="var(--primary)" />
                <span style={{ marginLeft: 6, fontWeight: 700, color: '#334155', fontSize: 14 }}>+91</span>
              </div>
              <input
                type="tel"
                maxLength={12}
                placeholder="12345 67890"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="app-textfield-input"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="app-btn"
              disabled={loading}
              style={{ marginTop: 8 }}
            >
              {loading ? 'Sending Verification Code...' : 'Continue with OTP'}
            </button>
          </form>

          <div style={{ display: 'flex', alignItems: 'center', margin: '24px 0' }}>
            <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
            <span style={{ padding: '0 16px', color: '#94A3B8', fontSize: 12, fontWeight: 700 }}>OR</span>
            <div style={{ flex: 1, height: 1, backgroundColor: 'var(--border)' }} />
          </div>

          {/* Real Google Login Button */}
          <button
            type="button"
            className="app-btn-outline"
            onClick={() => loginWithGoogle()}
            disabled={loading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              cursor: 'pointer'
            }}
          >
            <img src="/assets/icons/google.png" alt="Google" style={{ width: 20, height: 20 }} />
            <span>Continue with Google</span>
          </button>

          <p style={{
            textAlign: 'center',
            fontSize: 12,
            color: '#94A3B8',
            marginTop: 28,
            lineHeight: 1.5
          }}>
            By continuing, you agree to Collably's{' '}
            <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Terms of Service</span> and{' '}
            <span style={{ color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}
