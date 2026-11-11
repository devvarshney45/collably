import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  X,
  UtensilsCrossed,
  Wrench,
  Building2,
  Baby,
  Camera,
  Sparkles
} from 'lucide-react';
import ServiceCard from '../components/ServiceCard';
import CategoryItem from '../components/CategoryItem';
import { api } from '../api';

export default function SearchScreen({ onNavigate, onSelectService, onBack, initialCategory = '' }) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  useEffect(() => {
    loadResults(query, selectedCategory);
  }, [query, selectedCategory]);

  const loadResults = async (q, cat) => {
    try {
      const data = await api.services.list({ q, category: cat });
      setResults(data.services || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCardClick = (srv) => {
    if (onSelectService) onSelectService(srv);
    onNavigate('serviceDetail', { service: srv });
  };

  const handleBookAgain = (srv) => {
    if (onSelectService) onSelectService(srv);
    onNavigate('serviceBooking', { service: srv });
  };

  const categories = [
    { title: 'Daily Meals', icon: UtensilsCrossed },
    { title: 'Appliance Repair', icon: Wrench },
    { title: 'Office Support', icon: Building2 },
    { title: 'Babysitting', icon: Baby }
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
      {/* Top Back Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <button
          onClick={onBack || (() => onNavigate('dashboard_home'))}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '8px 14px',
            color: '#0F172A',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>

        {selectedCategory && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'rgba(255, 107, 53, 0.1)',
            padding: '6px 12px',
            borderRadius: 20,
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--primary)'
          }}>
            <span>Category: {selectedCategory}</span>
            <X size={14} style={{ cursor: 'pointer' }} onClick={() => setSelectedCategory('')} />
          </div>
        )}
      </div>

      {/* Search Input Box */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 18px',
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
        marginBottom: 28,
        border: '1.5px solid #E2E8F0'
      }}>
        <Search size={20} color="#94A3B8" />
        <input
          type="text"
          placeholder="Search by service name, food, appliance, or city..."
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            fontSize: 14,
            fontFamily: 'inherit',
            color: '#0F172A',
            background: 'transparent'
          }}
        />
        {query && (
          <X size={16} color="#94A3B8" style={{ cursor: 'pointer' }} onClick={() => setQuery('')} />
        )}
      </div>

      {/* Filter Categories Horizontal Bar */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginBottom: 16 }}>
          Filter by Category
        </h3>

        <div style={{
          display: 'flex',
          gap: 12,
          overflowX: 'auto',
          paddingBottom: 8
        }}>
          {categories.map((c) => {
            const active = selectedCategory.toLowerCase() === c.title.toLowerCase();
            return (
              <div
                key={c.title}
                onClick={() => setSelectedCategory(active ? '' : c.title)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  padding: '10px 16px',
                  borderRadius: 14,
                  backgroundColor: active ? 'var(--primary)' : '#FFFFFF',
                  color: active ? '#FFFFFF' : '#1E293B',
                  border: active ? '1.5px solid var(--primary)' : '1px solid #E2E8F0',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontSize: 13,
                  fontWeight: 700,
                  transition: 'all 0.15s'
                }}
              >
                {c.icon && <c.icon size={18} color={active ? '#FFFFFF' : 'var(--primary)'} strokeWidth={2.2} />}
                <span>{c.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Results Section */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
          <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', margin: 0 }}>
            {selectedCategory ? `${selectedCategory} (${results.length})` : `All Matching Services (${results.length})`}
          </h3>
          <span style={{ fontSize: 12, color: '#64748B' }}>Verified doorstep booking</span>
        </div>

        {results.length === 0 ? (
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 18,
            padding: '48px 20px',
            textAlign: 'center',
            border: '1px solid #F1F5F9'
          }}>
            <p style={{ color: '#64748B', fontSize: 15, margin: '0 0 12px' }}>
              No services found matching "{query || selectedCategory}".
            </p>
            <button
              onClick={() => { setQuery(''); setSelectedCategory(''); }}
              style={{
                backgroundColor: 'var(--primary)',
                color: 'white',
                border: 'none',
                borderRadius: 10,
                padding: '8px 18px',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))',
            gap: 16
          }}>
            {results.map((srv) => (
              <ServiceCard
                key={srv.id || srv.serviceId}
                service={srv}
                onTap={() => handleCardClick(srv)}
                onBookAgain={() => handleBookAgain(srv)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
