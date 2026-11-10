import React, { useState, useEffect } from 'react';
import {
  Search,
  Zap,
  Star,
  ArrowRight,
  ShieldCheck,
  Clock,
  MapPin,
  Sparkles,
  ChevronRight,
  Tag
} from 'lucide-react';
import { api } from '../api';

export default function HomeScreen({ onNavigate, onSelectService }) {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [srvData, catData] = await Promise.all([
        api.services.list(),
        api.categories.list()
      ]);
      setServices(srvData.services || []);
      setCategories(catData.categories || []);
    } catch (err) {
      console.error('Failed to load home data:', err);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'morning';
    if (hour < 17) return 'afternoon';
    return 'evening';
  };

  const handleCardClick = (service) => {
    if (onSelectService) onSelectService(service);
    onNavigate('serviceDetail', { service });
  };

  const handleBookAgain = (service) => {
    if (onSelectService) onSelectService(service);
    onNavigate('serviceBooking', { service });
  };

  const filteredServices = selectedFilter === 'All'
    ? services
    : services.filter(s => (s.category || '').toLowerCase() === selectedFilter.toLowerCase());

  // 4 Primary categories matching the mobile app
  const appCategories = [
    {
      id: 'daily_meals',
      title: 'Daily Meals',
      image: '/assets/images/daily_meals.png',
      bgColor: '#FFFFF6E1',
      borderColor: 'rgba(245, 158, 11, 0.2)',
      badge: 'Best Food',
      category: 'Daily Meals',
      tagColor: '#B45309'
    },
    {
      id: 'appliance_repair',
      title: 'Appliance Repair',
      image: '/assets/images/appliance_repair.png',
      bgColor: '#FFFFEEE8',
      borderColor: 'rgba(255, 107, 53, 0.2)',
      badge: 'Certified Techs',
      category: 'Appliance Repair',
      tagColor: '#C2410C'
    },
    {
      id: 'office_support',
      title: 'Office Support',
      image: '/assets/images/office_support.png',
      bgColor: '#FFE8F4FF',
      borderColor: 'rgba(59, 130, 246, 0.2)',
      badge: 'Corporate',
      category: 'Office Support',
      tagColor: '#1D4ED8'
    },
    {
      id: 'babysitting',
      title: 'Babysitting',
      image: '/assets/images/babysitting.png',
      bgColor: '#FFFEE8E8',
      borderColor: 'rgba(239, 68, 68, 0.2)',
      badge: 'Trained Care',
      category: 'Babysitting',
      tagColor: '#B91C1C'
    }
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: 1040,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box',
      padding: '8px 16px 40px'
    }}>
      {/* 1. Greeting Banner with Sun (Senior UI Hero) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '28px 32px',
        background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.08) 0%, rgba(29, 53, 87, 0.04) 100%)',
        borderRadius: 22,
        border: '1px solid rgba(255, 179, 151, 0.4)',
        boxShadow: '0 4px 20px rgba(255, 107, 53, 0.04)',
        marginBottom: 24,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ zIndex: 1 }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            padding: '4px 12px',
            borderRadius: 20,
            backgroundColor: '#FFFFFF',
            border: '1px solid #E2E8F0',
            fontSize: 11,
            fontWeight: 700,
            color: 'var(--primary)',
            marginBottom: 12,
            boxShadow: '0 2px 6px rgba(0,0,0,0.03)'
          }}>
            <ShieldCheck size={13} /> Instant Verified Services • 100% On-Demand
          </div>

          <h1 style={{
            fontSize: 30,
            fontWeight: 800,
            color: '#0F172A',
            margin: '0 0 6px',
            lineHeight: 1.2
          }}>
            Good <span style={{ color: 'var(--primary)' }}>{getGreeting()}</span>! 👋
          </h1>
          <p style={{ color: '#64748B', fontSize: 15, margin: 0, fontWeight: 500 }}>
            What Service do you need today ?
          </p>
        </div>

        {/* High-fidelity Sun image matching app */}
        <div style={{
          flexShrink: 0,
          animation: 'sunRotate 6s ease-in-out infinite',
          zIndex: 1
        }}>
          <img
            src="/assets/images/sun.png"
            alt="Sun"
            style={{ width: 110, height: 110, objectFit: 'contain' }}
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
      </div>

      {/* 2. Quick Booking ⚡ Card (Exact Flutter Style) */}
      <div
        onClick={() => onNavigate('quickBookings')}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '18px 24px',
          borderRadius: 18,
          border: '1.5px solid rgba(255, 179, 151, 0.7)',
          background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 179, 151, 0.14) 100%)',
          cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(255, 107, 53, 0.06)',
          marginBottom: 32,
          transition: 'all 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 6px 22px rgba(255, 107, 53, 0.12)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(255, 107, 53, 0.06)';
        }}
      >
        <div>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: '0 0 4px' }}>
            Quick Booking ⚡
          </h3>
          <p style={{ fontSize: 13, color: '#64748B', margin: 0, fontWeight: 500 }}>
            Book your last service again with 1-click rebooking
          </p>
        </div>

        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          backgroundColor: 'var(--primary)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 14px rgba(255, 107, 53, 0.35)',
          flexShrink: 0
        }}>
          <Zap size={22} fill="white" />
        </div>
      </div>

      {/* 3. All Category Section with "See All" (Exact App Parity) */}
      <div style={{ marginBottom: 36 }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: '0 0 2px' }}>
              All Category
            </h2>
            <span style={{ fontSize: 13, color: '#64748B' }}>
              Explore certified home, corporate and care solutions
            </span>
          </div>

          <button
            onClick={() => onNavigate('search')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontSize: 14,
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}
          >
            <span>See All</span>
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Categories Grid (4 App Categories + See All Action Card) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: 16
        }}>
          {appCategories.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onNavigate('search', { category: cat.category })}
              style={{
                borderRadius: 18,
                backgroundColor: cat.bgColor,
                border: `1.5px solid ${cat.borderColor}`,
                padding: '16px',
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                height: 180,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.06)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.02)';
              }}
            >
              <div style={{ zIndex: 1 }}>
                <span style={{
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: cat.tagColor,
                  backgroundColor: 'rgba(255,255,255,0.7)',
                  padding: '2px 8px',
                  borderRadius: 10,
                  display: 'inline-block',
                  marginBottom: 6
                }}>
                  {cat.badge}
                </span>
                <div style={{ fontWeight: 800, fontSize: 16, color: '#0F172A', lineHeight: 1.2 }}>
                  {cat.title}
                </div>
              </div>

              <div style={{
                position: 'absolute',
                right: -10,
                bottom: -10,
                width: 140,
                height: 140,
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'flex-end'
              }}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain'
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div style={{
                zIndex: 1,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                gap: 4
              }}>
                <span>Explore</span>
                <ArrowRight size={13} />
              </div>
            </div>
          ))}

          {/* See All Card (Matching app design) */}
          <div
            onClick={() => onNavigate('search')}
            style={{
              borderRadius: 18,
              backgroundColor: '#FFFFFF',
              border: '1.5px dashed #CBD5E1',
              padding: '16px',
              cursor: 'pointer',
              height: 180,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{
              width: 50,
              height: 50,
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 107, 53, 0.15)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ArrowRight size={24} />
            </div>
            <span style={{ fontWeight: 800, fontSize: 15, color: '#1E293B' }}>
              See All
            </span>
            <span style={{ fontSize: 11, color: '#94A3B8', marginTop: -6 }}>
              View all 20+ services
            </span>
          </div>
        </div>
      </div>

      {/* 4. Explore Categories (Circular Pills Matching App) */}
      <div style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
          Explore Categories
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 14,
          padding: '18px 20px',
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          border: '1px solid #F1F5F9',
          boxShadow: '0 2px 10px rgba(0,0,0,0.02)'
        }}>
          {[
            { title: 'Daily Meals', icon: '/assets/icons/daily_meals.png', category: 'Daily Meals' },
            { title: 'Appliance Repair', icon: '/assets/icons/appliance_repair.png', category: 'Appliance Repair' },
            { title: 'Office Support', icon: '/assets/icons/office_support.png', category: 'Office Support' },
            { title: 'Babysitting', icon: '/assets/icons/babysitting.png', category: 'Babysitting' },
            { title: 'Studio', icon: '/assets/icons/studio.png', category: 'Studio' },
            { title: 'House cleaning', icon: '/assets/icons/house_cleaning.png', category: 'House cleaning' }
          ].map((cat) => (
            <div
              key={cat.title}
              onClick={() => {
                setSelectedFilter(cat.category);
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                padding: '8px 4px',
                borderRadius: 14,
                backgroundColor: selectedFilter === cat.category ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                transition: 'all 0.15s ease'
              }}
              onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <div style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                backgroundColor: '#FFFFFF',
                border: selectedFilter === cat.category ? '2px solid var(--primary)' : '1px solid #E2E8F0',
                boxShadow: '0 4px 10px rgba(0,0,0,0.04)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 8,
                overflow: 'hidden'
              }}>
                <img
                  src={cat.icon}
                  alt={cat.title}
                  style={{ width: 34, height: 34, objectFit: 'contain' }}
                  onError={(e) => {
                    e.target.src = '/assets/icons/studio.png';
                  }}
                />
              </div>
              <span style={{
                fontSize: 12,
                fontWeight: selectedFilter === cat.category ? 800 : 600,
                color: selectedFilter === cat.category ? 'var(--primary)' : '#1E293B',
                textAlign: 'center'
              }}>
                {cat.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Filter Tabs & Popular Services Grid */}
      <div style={{ marginBottom: 40 }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
          marginBottom: 18
        }}>
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: '0 0 2px' }}>
              Popular Services
            </h2>
            <span style={{ fontSize: 13, color: '#64748B' }}>
              Verified professionals in Gurugram, Noida & Delhi NCR
            </span>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {['All', 'Daily Meals', 'Appliance Repair', 'Office Support', 'Babysitting', 'Studio'].map((f) => (
              <button
                key={f}
                onClick={() => setSelectedFilter(f)}
                style={{
                  padding: '6px 12px',
                  borderRadius: 20,
                  border: selectedFilter === f ? '1.5px solid var(--primary)' : '1px solid #E2E8F0',
                  backgroundColor: selectedFilter === f ? 'var(--primary)' : '#FFFFFF',
                  color: selectedFilter === f ? '#FFFFFF' : '#475569',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s'
                }}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Grid (Desktop Standard Grid) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: 18
        }}>
          {filteredServices.map((srv) => (
            <div
              key={srv.id || srv.serviceId}
              onClick={() => handleCardClick(srv)}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 18,
                border: '1px solid #F1F5F9',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.boxShadow = '0 8px 22px rgba(0,0,0,0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
              }}
            >
              {/* Card Image Banner */}
              <div style={{ height: 140, backgroundColor: '#F8FAFC', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={srv.image}
                  alt={srv.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/assets/images/elite_photography.png'; }}
                />
                {srv.discount && (
                  <span style={{
                    position: 'absolute',
                    top: 10,
                    left: 10,
                    backgroundColor: '#16A34A',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 800,
                    borderRadius: 6,
                    padding: '3px 7px',
                    boxShadow: '0 2px 6px rgba(0,0,0,0.2)'
                  }}>
                    {srv.discount}
                  </span>
                )}
                {srv.category && (
                  <span style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    backgroundColor: 'rgba(15, 23, 42, 0.75)',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 700,
                    borderRadius: 6,
                    padding: '3px 8px',
                    backdropFilter: 'blur(4px)'
                  }}>
                    {srv.category}
                  </span>
                )}
              </div>

              {/* Card Details */}
              <div style={{ padding: 14, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{
                  fontWeight: 800,
                  fontSize: 15,
                  color: '#0F172A',
                  marginBottom: 6,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {srv.title}
                </div>

                {/* Location and Experience Row (from the real App) */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: 11,
                  color: '#64748B',
                  marginBottom: 10
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} color="#EF4444" />
                    <span>{srv.location || 'Delhi NCR'}</span>
                  </div>
                  {srv.experience && (
                    <span style={{
                      backgroundColor: '#F1F5F9',
                      padding: '2px 6px',
                      borderRadius: 4,
                      fontWeight: 600
                    }}>
                      {srv.experience}
                    </span>
                  )}
                </div>

                {/* Price & Rating */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 12
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                    <span style={{ color: 'var(--primary)', fontWeight: 800, fontSize: 16 }}>
                      {srv.price}
                    </span>
                    {srv.originalPrice && (
                      <span style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'line-through' }}>
                        {srv.originalPrice}
                      </span>
                    )}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: 11, color: '#64748B', fontWeight: 600 }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span>{srv.rating} ({srv.reviewsCount || '120+'})</span>
                  </div>
                </div>

                {/* Book Now Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleBookAgain(srv);
                  }}
                  className="app-btn"
                  style={{
                    height: 36,
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 700,
                    marginTop: 'auto'
                  }}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
