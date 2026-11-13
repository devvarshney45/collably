import React from 'react';
import { Star, MapPin, Clock } from 'lucide-react';

export default function ServiceCard({
  service,
  onBookAgain,
  onTap,
  showBookAgain = true
}) {
  const {
    title,
    price,
    originalPrice,
    discount,
    category,
    location,
    experience,
    rating = '4.8',
    reviewsCount = '120+',
    distance = '1.8 km away',
    image
  } = service;

  return (
    <div className="service-card" onClick={onTap} style={{ position: 'relative', width: '100%', borderRadius: 18, overflow: 'hidden', isolation: 'isolate' }}>
      {/* 1:1 Aspect Ratio container so 1254x1254 banner images never get cropped */}
      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '1 / 1',
        overflow: 'hidden',
        borderRadius: '18px 18px 0 0',
        backgroundColor: '#F8FAFC',
        isolation: 'isolate',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={image || '/assets/images/daily_meals_hr.jpg'}
          alt={title}
          className="service-card-image"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            objectPosition: 'center',
            display: 'block',
            borderRadius: '18px 18px 0 0'
          }}
          onError={(e) => {
            e.target.src = '/assets/images/daily_meals_hr.jpg';
          }}
        />
      </div>

      <div className="service-card-body">
        {/* Category & Discount Tag Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
          {category && (
            <span style={{
              fontSize: 10,
              fontWeight: 700,
              textTransform: 'uppercase',
              color: 'var(--primary)',
              backgroundColor: 'rgba(255, 107, 53, 0.08)',
              padding: '3px 8px',
              borderRadius: 6,
              letterSpacing: '0.4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}>
              {category}
            </span>
          )}
          {discount && (
            <span style={{
              fontSize: 10,
              fontWeight: 800,
              color: '#16A34A',
              backgroundColor: '#DCFCE7',
              padding: '3px 8px',
              borderRadius: 6,
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              {discount}
            </span>
          )}
        </div>

        <h4 className="service-card-title">{title}</h4>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 11, color: '#64748B', marginBottom: 6 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <MapPin size={11} color="#EF4444" /> {location || distance}
          </span>
          {experience && (
            <span style={{ backgroundColor: '#F1F5F9', padding: '1px 5px', borderRadius: 4, fontWeight: 600 }}>
              {experience}
            </span>
          )}
        </div>

        <div className="service-card-price-row">
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span className="service-card-price">{price}</span>
            {originalPrice && (
              <span style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'line-through' }}>
                {originalPrice}
              </span>
            )}
          </div>
          <div className="service-card-rating">
            <Star size={12} fill="#F59E0B" color="#F59E0B" />
            <span>{rating} ({reviewsCount})</span>
          </div>
        </div>

        {showBookAgain && (
          <button
            className="service-card-book-btn"
            onClick={(e) => {
              e.stopPropagation();
              if (onBookAgain) onBookAgain();
            }}
          >
            Book Now
          </button>
        )}
      </div>
    </div>
  );
}
