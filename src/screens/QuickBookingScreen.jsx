import React, { useState, useEffect } from 'react';
import { ArrowLeft, Search } from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import CategoryItem from '../components/CategoryItem';
import { api } from '../api';

export default function QuickBookingScreen({ onNavigate, onSelectService, onBack }) {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    loadServices('');
  }, []);

  const loadServices = async (q) => {
    try {
      const data = await api.services.list({ q });
      setServices(data.services || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = (srv) => {
    onSelectService(srv);
    onNavigate('serviceDetail');
  };

  const handleBookAgain = (srv) => {
    onSelectService(srv);
    onNavigate('serviceBooking');
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 1080,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box'
    }}>
      {/* Top Back Row */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 20 }}>
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

      {/* Search Input */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '14px 16px',
        backgroundColor: '#FFFFFF',
        borderRadius: 15,
        boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
        marginBottom: 28,
        border: '1px solid rgba(0,0,0,0.03)'
      }}>
        <Search size={20} color="#9E9E9E" />
        <input
          type="text"
          placeholder="Search Services"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            loadServices(e.target.value);
          }}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: 14,
            fontFamily: 'inherit',
            color: '#000000',
            background: 'transparent'
          }}
        />
      </div>

      {/* Categories Section */}
      <div style={{ marginBottom: 36 }}>
        <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', marginBottom: 20 }}>
          Categories
        </h3>

        <div style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          paddingBottom: 8
        }}>
          <CategoryItem title="Daily Meals" iconAsset="/assets/images/daily_meals_hr.jpg" onTap={() => onNavigate('search', { category: 'Daily Meals' })} />
          <CategoryItem title="Appliance Repair" iconAsset="/assets/images/appliance_repair_hr.jpg" onTap={() => onNavigate('search', { category: 'Appliance Repair' })} />
          <CategoryItem title="Office Support" iconAsset="/assets/images/office_support_hr.jpg" onTap={() => onNavigate('search', { category: 'Office Support' })} />
          <CategoryItem title="Babysitting" iconAsset="/assets/images/babysitting_hr.jpg" onTap={() => onNavigate('search', { category: 'Babysitting' })} />
        </div>
      </div>

      {/* Popular Services Grid */}
      <div style={{ marginBottom: 40 }}>
        <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', marginBottom: 20 }}>
          Popular Services
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: 16
        }}>
          {services.map((srv) => (
            <div key={srv.id} style={{ display: 'flex', justifyContent: 'center' }}>
              <ServiceCard
                service={srv}
                onTap={() => handleCardClick(srv)}
                onBookAgain={() => handleBookAgain(srv)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
