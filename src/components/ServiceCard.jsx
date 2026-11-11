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
    <div className="service-card" onClick={onTap} style={{ position: 'relative' }}>
      <div style={{ position: 'relative', width: '100%', height: 135, overflow: 'hidden' }}>
        <img
          src={image || '/assets/images/daily_meals_hr.jpg'}
          alt={title}
          className="service-card-image"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = '/assets/images/daily_meals_hr.jpg';
          }}
        />
        {discount && (
          <span style={{
            position: 'absolute',
            top: 8,
            left: 8,
            backgroundColor: '#16A34A',
            color: 'white',
            fontSize: 10,
            fontWeight: 800,
            borderRadius: 6,
            padding: '2px 6px'
          }}>
            {discount}
          </span>
        )}
        {category && (
          <span style={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            color: 'white',
            fontSize: 9,
            fontWeight: 700,
            borderRadius: 6,
            padding: '2px 6px'
          }}>
            {category}
          </span>
        )}
      </div>

      <div className="service-card-body">
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
