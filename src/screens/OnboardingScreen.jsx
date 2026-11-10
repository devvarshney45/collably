import React from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Star, Users, Clock } from 'lucide-react';

export default function OnboardingScreen({ onNavigate }) {
  return (
    <div className="web-onboarding-screen" style={{ width: '100%', padding: '20px 0 60px' }}>
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 28,
        border: '1px solid #E2E8F0',
        boxShadow: 'var(--shadow-md)',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        alignItems: 'center'
      }}>
        {/* Left Column: Hero Content */}
        <div style={{ padding: '60px 48px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '6px 14px',
            borderRadius: 20,
            background: 'var(--primary-light)',
            color: 'var(--primary)',
            fontSize: 12,
            fontWeight: 800,
            marginBottom: 20
          }}>
            <ShieldCheck size={14} /> Collably Web Platform • Verified Local Experts
          </div>

          <h1 style={{
            fontSize: 40,
            fontWeight: 900,
            color: 'var(--navy)',
            lineHeight: 1.2,
            marginBottom: 20
          }}>
            Book Services <br />
            <span style={{ color: 'var(--primary)' }}>Instantly Online</span>
          </h1>

          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 17,
            lineHeight: 1.6,
            marginBottom: 32,
            maxWidth: 480
          }}>
            From professional photography and video editing to gourmet private chefs, day care, and doorstep car wash — all services at your fingertips.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 36 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#334155' }}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span><strong>100% Background-Checked</strong> certified professionals</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#334155' }}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span><strong>Instant Booking & Escrow Protection</strong> — pay only on satisfaction</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 15, color: '#334155' }}>
              <CheckCircle2 size={18} color="var(--primary)" />
              <span><strong>24/7 Concierge Support</strong> for custom & urgent requests</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <button
              className="app-btn"
              onClick={() => onNavigate('login')}
              style={{
                width: 'auto',
                padding: '0 32px',
                height: 52,
                fontSize: 16,
                fontWeight: 800,
                borderRadius: 14
              }}
            >
              <span>Get Started</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="app-btn-outline"
              onClick={() => onNavigate('dashboard_home')}
              style={{
                width: 'auto',
                padding: '0 28px',
                height: 52,
                fontSize: 15,
                fontWeight: 700,
                borderRadius: 14
              }}
            >
              Browse Services
            </button>
          </div>
        </div>

        {/* Right Column: Hero Graphic Banner */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(255, 179, 151, 0.2) 100%)',
          height: '100%',
          minHeight: 460,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          padding: 40
        }}>
          <img
            src="/assets/images/onboarding.png"
            alt="Onboarding Collably"
            style={{
              maxWidth: '90%',
              maxHeight: 380,
              objectFit: 'contain',
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.08))'
            }}
          />

          {/* Floating Trust Badge */}
          <div style={{
            position: 'absolute',
            bottom: 30,
            right: 30,
            background: 'white',
            borderRadius: 16,
            padding: '12px 18px',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid #E2E8F0',
            display: 'flex',
            alignItems: 'center',
            gap: 12
          }}>
            <div style={{
              width: 38,
              height: 38,
              borderRadius: 10,
              background: '#FEF3C7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#D97706'
            }}>
              <Star size={20} fill="#D97706" />
            </div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 14, color: '#0F172A' }}>4.9 / 5.0 Rating</div>
              <div style={{ fontSize: 12, color: '#64748B' }}>10,000+ Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
