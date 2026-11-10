import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShieldCheck, MapPin, Clock, Star, X } from 'lucide-react';
import { api } from '../api';

export default function ServiceDetailScreen({ onNavigate, selectedService, onBack }) {
  const [service, setService] = useState(null);
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => {
    const srvId = selectedService?.id || 'srv_photo';
    api.services.get(srvId)
      .then((data) => setService(data.service))
      .catch((err) => console.error(err));
  }, [selectedService]);

  const s = service || {
    id: 'srv_photo',
    title: 'Elite Photography Studio',
    category: 'Studio',
    price: '₹2,500/hr',
    rating: '4.8',
    reviewsCount: '1250',
    location: 'Koramangala,\nBangalore',
    experience: '5+ Years Of\nExperience',
    image: '/assets/images/elite_photography.png',
    description: 'Professional photography studio with state-of-the-art equipment and experienced team. Specializing in portraits, weddings, and commercial photography.',
    servicesOffered: [
      'Portrait Photography',
      'Wedding Photography',
      'Commercial Shoots',
      'Product Photography'
    ],
    gallery: [
      '/assets/images/Rectangle 4249.png',
      '/assets/images/Rectangle 4250.png',
      '/assets/images/Rectangle 4251.png'
    ],
    reviews: [
      {
        id: 'rev_1',
        name: 'Priya Sharma',
        date: '2 days ago',
        rating: 5,
        comment: 'Amazing service! The team was professional and the photos turned out perfect.'
      },
      {
        id: 'rev_2',
        name: 'Rajesh Kumar',
        date: '1 week ago',
        rating: 4,
        comment: 'Excellent studio with great equipment. Highly recommend for professional shoots.'
      }
    ]
  };

  const handleBookNow = () => {
    onNavigate('serviceBooking', { service: s });
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 960,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box'
    }}>
      {/* Lightbox Modal */}
      {lightboxImg && (
        <div
          onClick={() => setLightboxImg(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.85)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            cursor: 'zoom-out'
          }}
        >
          <button
            onClick={() => setLightboxImg(null)}
            style={{
              position: 'absolute',
              top: 24,
              right: 24,
              backgroundColor: 'white',
              border: 'none',
              borderRadius: '50%',
              width: 44,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={20} />
          </button>
          <img
            src={lightboxImg}
            alt="Enlarged gallery photo"
            style={{ maxWidth: '90%', maxHeight: '90%', borderRadius: 16, objectFit: 'contain' }}
          />
        </div>
      )}

      {/* Top Back Row */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 16 }}>
        <button
          onClick={onBack || (() => onNavigate('dashboard_home'))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'none',
            border: 'none',
            color: '#000000',
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={20} />
          <span>Back</span>
        </button>
      </div>

      {/* Container matching Flutter visuals */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
        border: '1px solid #E2E8F0'
      }}>
        {/* 1. Hero Image */}
        <div style={{ width: '100%', height: 320, position: 'relative', overflow: 'hidden' }}>
          <img
            src={s.image || '/assets/images/elite_photography.png'}
            alt={s.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = '/assets/images/elite_photography.png'; }}
          />
          <div style={{
            position: 'absolute',
            top: 16,
            right: 16,
            backgroundColor: 'rgba(255,255,255,0.92)',
            padding: '6px 14px',
            borderRadius: 20,
            color: 'var(--success)',
            fontWeight: 'bold',
            fontSize: 12,
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}>
            <ShieldCheck size={16} /> Verified
          </div>
        </div>

        {/* 2. Content Body */}
        <div style={{ padding: '32px 36px' }}>
          {/* Studio Title Card */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 24
          }}>
            <div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--primary)' }}>
                {s.category || 'Studio'}
              </span>
              <h1 style={{ fontSize: 26, fontWeight: 'bold', color: '#000000', margin: '4px 0 0' }}>
                {s.title}
              </h1>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 24, fontWeight: 'bold', color: '#000000' }}>
                {s.price}
              </span>
              <button
                onClick={handleBookNow}
                className="app-btn"
                style={{ width: 'auto', padding: '0 28px', height: 46, borderRadius: 12, fontSize: 14 }}
              >
                Book Now
              </button>
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: '#F1F5F9', margin: '24px 0' }} />

          {/* 3 Info Items Row (Exact Flutter Layout) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 16,
            textAlign: 'center',
            marginBottom: 32
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}>
                <MapPin size={20} />
              </div>
              <span style={{ fontSize: 13, color: '#334155', fontWeight: 600, lineHeight: 1.4 }}>
                Koramangala,<br />Bangalore
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 107, 53, 0.1)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}>
                <Clock size={20} />
              </div>
              <span style={{ fontSize: 13, color: '#334155', fontWeight: 600, lineHeight: 1.4 }}>
                5+ Years Of<br />Experience
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                backgroundColor: '#FEF3C7',
                color: '#D97706',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8
              }}>
                <Star size={20} fill="#D97706" />
              </div>
              <span style={{ fontSize: 13, color: '#334155', fontWeight: 600, lineHeight: 1.4 }}>
                4.8<br />Rating (1250)
              </span>
            </div>
          </div>

          {/* Description */}
          <p style={{ color: '#666666', fontSize: 14, lineHeight: 1.6, marginBottom: 32 }}>
            {s.description}
          </p>

          {/* Services Offered Tags */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', marginBottom: 14 }}>
              Services Offered
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {(s.servicesOffered || []).map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    backgroundColor: 'rgba(255, 107, 53, 0.08)',
                    color: 'var(--primary)',
                    padding: '8px 16px',
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 600
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Gallery Horizontal Scroll */}
          <div style={{ marginBottom: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', marginBottom: 14 }}>
              Gallery
            </h3>
            <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 6 }}>
              {(s.gallery || []).map((gImg, idx) => (
                <img
                  key={idx}
                  src={gImg}
                  alt={`Gallery ${idx + 1}`}
                  onClick={() => setLightboxImg(gImg)}
                  style={{
                    width: 140,
                    height: 100,
                    borderRadius: 14,
                    objectFit: 'cover',
                    cursor: 'pointer',
                    boxShadow: 'var(--shadow-sm)',
                    border: '1px solid #E2E8F0',
                    transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.03)'; }}
                  onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
              ))}
            </div>
          </div>

          {/* Reviews List */}
          <div>
            <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', marginBottom: 16 }}>
              Reviews (124)
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {(s.reviews || []).map((rev) => (
                <div
                  key={rev.id}
                  style={{
                    padding: '16px 20px',
                    borderRadius: 14,
                    backgroundColor: '#F8FAFC',
                    border: '1px solid #F1F5F9'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                    <span style={{ fontWeight: 'bold', fontSize: 14, color: '#000000' }}>{rev.name}</span>
                    <span style={{ fontSize: 12, color: 'grey' }}>{rev.date}</span>
                  </div>
                  <div style={{ display: 'flex', gap: 2, marginBottom: 8 }}>
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                  <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.5, margin: 0 }}>
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
