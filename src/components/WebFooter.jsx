import React from 'react';
import { MapPin, Phone, Mail, ShieldCheck, Heart } from 'lucide-react';

export default function WebFooter({ onNavigate }) {
  return (
    <footer className="web-footer">
      <div className="web-footer-inner">
        <div className="web-footer-grid">
          {/* Brand Info */}
          <div className="web-footer-col">
            <div className="web-footer-brand" onClick={() => onNavigate('dashboard_home')}>
              <img src="/assets/svgs/logo_app_name.svg" alt="Collably" style={{ height: 38, marginBottom: 12 }} />
            </div>
            <p className="web-footer-desc">
              Collably connects you with top-rated local professionals for photography, video editing, culinary chefs, day care, car wash, and custom home services instantly.
            </p>
            <div className="web-footer-badges">
              <span className="web-footer-badge">
                <ShieldCheck size={14} color="#27AE60" /> 100% Verified Providers
              </span>
              <span className="web-footer-badge">
                <ShieldCheck size={14} color="var(--primary)" /> Secure Payments
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="web-footer-col">
            <h4 className="web-footer-heading">Services</h4>
            <ul className="web-footer-links">
              <li><button onClick={() => onNavigate('search', { category: 'Studio' })}>Studio & Photography</button></li>
              <li><button onClick={() => onNavigate('search', { category: 'Cooking' })}>Gourmet Cooking & Chefs</button></li>
              <li><button onClick={() => onNavigate('search', { category: 'Video Editing' })}>Video Editing & Post-Production</button></li>
              <li><button onClick={() => onNavigate('search', { category: 'Day Care' })}>Day Care & Childcare</button></li>
              <li><button onClick={() => onNavigate('search', { category: 'Car Wash' })}>Doorstep Car Wash</button></li>
              <li><button onClick={() => onNavigate('requestService')}>Request Custom Service</button></li>
            </ul>
          </div>

          {/* Platform & Account */}
          <div className="web-footer-col">
            <h4 className="web-footer-heading">Account & Platform</h4>
            <ul className="web-footer-links">
              <li><button onClick={() => onNavigate('dashboard_bookings')}>My Bookings</button></li>
              <li><button onClick={() => onNavigate('wallet')}>Collably Wallet & Points</button></li>
              <li><button onClick={() => onNavigate('shopping')}>Collably Store (E-Commerce)</button></li>
              <li><button onClick={() => onNavigate('dashboard_requests')}>Requests Hub</button></li>
              <li><button onClick={() => onNavigate('urgentRequest')}>Urgent Assistance</button></li>
              <li><button onClick={() => onNavigate('dashboard_profile')}>Account & KYC Settings</button></li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="web-footer-col">
            <h4 className="web-footer-heading">Customer Support</h4>
            <p style={{ color: '#64748B', fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>
              Need help with a booking or custom request? Our team is available 24/7.
            </p>
            <div className="web-footer-contact-item">
              <Phone size={14} color="var(--primary)" />
              <span>+91 98888 12345 / +1 2620 0323 7631</span>
            </div>
            <div className="web-footer-contact-item">
              <Mail size={14} color="var(--primary)" />
              <span>support@collably.com</span>
            </div>
            <div className="web-footer-contact-item">
              <MapPin size={14} color="var(--primary)" />
              <span>1685 Lake Forest, New York & Koramangala, Bangalore</span>
            </div>
          </div>
        </div>

        <div className="web-footer-bottom">
          <div className="web-footer-copy">
            © 2026 Collably Inc. All rights reserved. Built with precision, identical to the Collably mobile application.
          </div>
          <div className="web-footer-legal">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

