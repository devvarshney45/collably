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
  Tag,
  UtensilsCrossed,
  Wrench,
  Building2,
  Baby,
  Camera,
  Car
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

  // 4 Primary categories matching the mobile app with High-Definition assets from live database
  const appCategories = [
    {
      id: 'daily_meals',
      title: 'Daily Meals',
      image: categories.find(c => (c.name || '').toLowerCase() === 'daily meals')?.iconImage || '/assets/images/daily_meals_hr.jpg',
      bgColor: '#FFFBEB',
      borderColor: '#FDE68A',
      badge: 'Best Food',
      category: 'Daily Meals',
      tagColor: '#B45309'
    },
    {
      id: 'appliance_repair',
      title: 'Appliance Repair',
      image: categories.find(c => (c.name || '').toLowerCase() === 'appliance repair')?.iconImage || '/assets/images/appliance_repair_hr.jpg',
      bgColor: '#FFF7ED',
      borderColor: '#FFEDD5',
      badge: 'Certified Techs',
      category: 'Appliance Repair',
      tagColor: '#C2410C'
    },
    {
      id: 'office_support',
      title: 'Office Support',
      image: categories.find(c => (c.name || '').toLowerCase() === 'office support')?.iconImage || '/assets/images/office_support_hr.jpg',
      bgColor: '#EFF6FF',
      borderColor: '#DBEAFE',
      badge: 'Corporate',
      category: 'Office Support',
      tagColor: '#1D4ED8'
    },
    {
      id: 'babysitting',
      title: 'Babysitting',
      image: categories.find(c => (c.name || '').toLowerCase() === 'babysitting')?.iconImage || '/assets/images/babysitting_hr.jpg',
      bgColor: '#FEF2F2',
      borderColor: '#FEE2E2',
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
                cursor: 'pointer',
                overflow: 'hidden',
                height: 195,
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.08)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.03)';
              }}
            >
              {/* Crisp Retina Image Banner */}
              <div style={{
                position: 'relative',
                height: 115,
                width: '100%',
                overflow: 'hidden',
                borderRadius: '18px 18px 0 0',
                backgroundColor: 'rgba(0,0,0,0.03)',
                isolation: 'isolate'
              }}>
                <img
                  src={cat.image}
                  alt={cat.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center',
                    display: 'block',
                    borderRadius: '18px 18px 0 0'
                  }}
                />
                <span style={{
                  position: 'absolute',
                  top: 10,
                  left: 10,
                  fontSize: 10,
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: cat.tagColor,
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  backdropFilter: 'blur(6px)',
                  padding: '3px 8px',
                  borderRadius: 6,
                  boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
                }}>
                  {cat.badge}
                </span>
              </div>

              {/* Card Footer with Title and Explore link */}
              <div style={{
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flex: 1,
                backgroundColor: cat.bgColor
              }}>
                <div style={{
                  fontWeight: 800,
                  fontSize: 15,
                  color: '#0F172A',
                  lineHeight: 1.2
                }}>
                  {cat.title}
                </div>
                <div style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 4,
                  flexShrink: 0
                }}>
                  <span>Explore</span>
                  <ArrowRight size={13} />
                </div>
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
              height: 195,
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 12,
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.borderColor = 'var(--primary)';
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(255, 107, 53, 0.12)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.borderColor = '#CBD5E1';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
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
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(255, 107, 53, 0.15)'
            }}>
              <ArrowRight size={24} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 15, color: '#1E293B', marginBottom: 2 }}>
                See All
              </div>
              <span style={{ fontSize: 11, color: '#94A3B8' }}>
                View all 20+ services
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Explore Categories (High-Definition Crisp Vector Pills) */}
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
            { title: 'Daily Meals', icon: UtensilsCrossed, category: 'Daily Meals' },
            { title: 'Appliance Repair', icon: Wrench, category: 'Appliance Repair' },
            { title: 'Office Support', icon: Building2, category: 'Office Support' },
            { title: 'Babysitting', icon: Baby, category: 'Babysitting' }
          ].map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedFilter.toLowerCase() === cat.category.toLowerCase();
            return (
              <div
                key={cat.title}
                onClick={() => {
                  setSelectedFilter(isSelected ? 'All' : cat.category);
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                  padding: '8px 4px',
                  borderRadius: 14,
                  backgroundColor: isSelected ? 'rgba(255, 107, 53, 0.08)' : 'transparent',
                  transition: 'all 0.15s ease'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  width: 58,
                  height: 58,
                  borderRadius: '50%',
                  backgroundColor: isSelected ? 'var(--primary)' : '#FFF7ED',
                  border: isSelected ? '2px solid var(--primary)' : '1.5px solid #FFEDD5',
                  boxShadow: isSelected
                    ? '0 6px 16px rgba(255, 107, 53, 0.3)'
                    : '0 2px 8px rgba(255, 107, 53, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                  transition: 'all 0.2s ease'
                }}>
                  <IconComp
                    size={24}
                    color={isSelected ? '#FFFFFF' : 'var(--primary)'}
                    strokeWidth={2.2}
                  />
                </div>
                <span style={{
                  fontSize: 12,
                  fontWeight: isSelected ? 800 : 600,
                  color: isSelected ? 'var(--primary)' : '#1E293B',
                  textAlign: 'center'
                }}>
                  {cat.title}
                </span>
              </div>
            );
          })}
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
            {['All', 'Daily Meals', 'Appliance Repair', 'Office Support', 'Babysitting'].map((f) => (
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
          gap: 20
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
                isolation: 'isolate',
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
              {/* Card Image Banner - Exact 1:1 Aspect Ratio matching the original 1254x1254 banner artwork */}
              <div style={{
                width: '100%',
                aspectRatio: '1 / 1',
                backgroundColor: '#F8FAFC',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '18px 18px 0 0',
                isolation: 'isolate',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <img
                  src={srv.image || '/assets/images/daily_meals_hr.jpg'}
                  alt={srv.title}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    objectPosition: 'center',
                    display: 'block',
                    borderRadius: '18px 18px 0 0'
                  }}
                  onError={(e) => { e.target.src = '/assets/images/daily_meals_hr.jpg'; }}
                />
              </div>

              {/* Card Details */}
              <div style={{ padding: 14, display: 'flex', flexDirection: 'column', flex: 1 }}>
                {/* Category & Discount Tag Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
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
                    {srv.category}
                  </span>
                  {srv.discount && (
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
                      {srv.discount}
                    </span>
                  )}
                </div>

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
