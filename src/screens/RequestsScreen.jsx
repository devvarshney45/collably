import React from 'react';
import { Search, HelpCircle, Calendar, AlertTriangle, ChevronRight, ShieldCheck } from 'lucide-react';

export default function RequestsScreen({ onNavigate }) {
  const cards = [
    {
      id: 'requestService',
      title: 'Request a Service',
      subtitle: 'Book a service from our list',
      icon: Search,
      color: '#2196F3',
      bg: 'rgba(33, 150, 243, 0.1)',
    },
    {
      id: 'serviceNotListed',
      title: 'Service not listed',
      subtitle: 'Custom request for help',
      icon: HelpCircle,
      color: '#9C27B0',
      bg: 'rgba(156, 39, 176, 0.1)',
    },
    {
      id: 'helpWithBooking',
      title: 'Help with existing booking',
      subtitle: 'Reschedule or report issues',
      icon: Calendar,
      color: '#4CAF50',
      bg: 'rgba(76, 175, 80, 0.1)',
    },
    {
      id: 'urgentRequest',
      title: 'Something urgent',
      subtitle: 'Immediate assistance needed',
      icon: AlertTriangle,
      color: '#F44336',
      bg: 'rgba(244, 67, 54, 0.1)',
    },
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: 960,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box'
    }}>
      {/* 1. Header (Exact Flutter Style) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
      }}>
        <h2 style={{ fontSize: 22, fontWeight: 'bold', color: '#000000', margin: 0 }}>
          Request Assistance
        </h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--primary)', fontSize: 13, fontWeight: 700 }}>
          <ShieldCheck size={16} />
          <span>Concierge Desk</span>
        </div>
      </div>

      {/* 2. Category Cards List (Exact Flutter Layout) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.id}
              onClick={() => onNavigate(c.id)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 16,
                padding: '20px 24px',
                border: '1px solid #F1F5F9',
                boxShadow: '0 4px 12px rgba(0,0,0,0.02)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
                e.currentTarget.style.borderColor = c.color;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.02)';
                e.currentTarget.style.borderColor = '#F1F5F9';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  padding: 12,
                  borderRadius: 12,
                  backgroundColor: c.bg,
                  color: c.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 style={{ fontWeight: 'bold', fontSize: 15, color: '#000000', margin: '0 0 4px' }}>
                    {c.title}
                  </h4>
                  <p style={{ color: '#9E9E9E', fontSize: 12, margin: 0 }}>
                    {c.subtitle}
                  </p>
                </div>
              </div>

              <ChevronRight size={18} color="#9E9E9E" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
