import React, { useState, useEffect } from 'react';
import {
  Search,
  MapPin,
  Navigation,
  ArrowLeft,
  CheckCircle2,
  Plus,
  Sparkles,
  Home,
  Briefcase,
  Building2,
  Compass,
  Check,
  Info
} from 'lucide-react';
import { api } from '../api';

export default function SelectAddressScreen({ onNavigate, setSelectedAddress, onBack }) {
  const [addresses, setAddresses] = useState([]);
  const [search, setSearch] = useState('');
  const [activeId, setActiveId] = useState('addr_home');
  const [showAddCustom, setShowAddCustom] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customSubtitle, setCustomSubtitle] = useState('');
  const [customFullAddress, setCustomFullAddress] = useState('');
  const [customTag, setCustomTag] = useState('Home');
  const [gpsLoading, setGpsLoading] = useState(false);

  useEffect(() => {
    loadAddresses('');
  }, []);

  const loadAddresses = async (query) => {
    try {
      const data = await api.addresses.list(query);
      setAddresses(data.addresses || []);
      if (data.activeAddress) {
        setActiveId(data.activeAddress.id || 'addr_home');
      }
    } catch (err) {
      console.error('Failed to load addresses:', err);
    }
  };

  const handleSelect = async (addr) => {
    setActiveId(addr.id);
    if (setSelectedAddress) setSelectedAddress(addr);
    try {
      await api.addresses.confirm({
        title: addr.title,
        subtitle: addr.subtitle || addr.fullAddress,
        fullAddress: addr.fullAddress
      });
    } catch (e) {
      console.warn(e);
    }
    onNavigate('map', { selectedAddress: addr });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    loadAddresses(val);
  };

  // Real GPS Geolocation using browser HTML5 Geolocation API
  const handleUseCurrentGPS = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }

    setGpsLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        let detectedAddress = `Ghaziabad, Uttar Pradesh, India (${lat.toFixed(4)}, ${lng.toFixed(4)})`;

        // Attempt reverse geocoding via OpenStreetMap Nominatim
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
          const geoData = await res.json();
          if (geoData && geoData.display_name) {
            detectedAddress = geoData.display_name;
          }
        } catch (e) {
          console.warn('Geocoding fallback used');
        }

        const realGpsAddr = {
          id: `gps_${Date.now()}`,
          title: 'Current Live GPS Location',
          subtitle: detectedAddress.slice(0, 45) + '...',
          fullAddress: detectedAddress,
          tag: 'Live GPS',
          isDefault: true
        };

        setGpsLoading(false);
        handleSelect(realGpsAddr);
      },
      (error) => {
        setGpsLoading(false);
        const fallbackGps = {
          id: 'addr_home',
          title: 'Home',
          subtitle: 'ghaziabad',
          fullAddress: 'Ghaziabad, uttar pradesh -',
          tag: 'Default',
          isDefault: true
        };
        handleSelect(fallbackGps);
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const handleAddCustomAddress = async (e) => {
    e.preventDefault();
    if (!customTitle.trim() || !customFullAddress.trim()) return;

    try {
      const newAddr = {
        title: customTitle.trim(),
        subtitle: customSubtitle.trim() || customTitle.trim(),
        fullAddress: customFullAddress.trim(),
        tag: customTag,
        isDefault: false
      };
      const res = await api.addresses.create(newAddr);
      setShowAddCustom(false);
      setCustomTitle('');
      setCustomSubtitle('');
      setCustomFullAddress('');
      await loadAddresses('');
      if (res.address) {
        handleSelect(res.address);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div style={{
      width: '100%',
      maxWidth: 720,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box',
      padding: '16px 20px 48px'
    }}>
      {/* Top Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
      }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: 700,
            color: '#1E293B',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <h1 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: 0 }}>
          Your Address
        </h1>

        <button
          onClick={() => setShowAddCustom(true)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            background: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 10,
            padding: '8px 14px',
            fontSize: 13,
            fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(255, 107, 53, 0.25)'
          }}
        >
          <Plus size={16} />
          <span>Add Address</span>
        </button>
      </div>

      {/* Search Location Bar with Geolocation Button */}
      <div style={{
        display: 'flex',
        gap: 12,
        marginBottom: 20
      }}>
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#FFFFFF',
          border: '1.5px solid #E2E8F0',
          borderRadius: 14,
          padding: '0 16px',
          boxShadow: '0 2px 6px rgba(0,0,0,0.02)'
        }}>
          <Search size={18} color="#94A3B8" style={{ marginRight: 10 }} />
          <input
            type="text"
            placeholder="Search Location, City or Area..."
            value={search}
            onChange={handleSearchChange}
            style={{
              flex: 1,
              border: 'none',
              outline: 'none',
              fontSize: 14,
              color: '#0F172A',
              padding: '14px 0',
              fontFamily: 'inherit'
            }}
          />
        </div>

        <button
          onClick={handleUseCurrentGPS}
          disabled={gpsLoading}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: 14,
            padding: '0 20px',
            fontSize: 13,
            fontWeight: 700,
            cursor: gpsLoading ? 'wait' : 'pointer',
            boxShadow: '0 4px 12px rgba(255, 107, 53, 0.25)',
            flexShrink: 0
          }}
          title="Detect live location using browser GPS"
        >
          <Navigation size={16} className={gpsLoading ? 'spin' : ''} />
          <span>{gpsLoading ? 'Detecting...' : 'Use Current GPS'}</span>
        </button>
      </div>

      {/* Saved Addresses List (Matching App View) */}
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: 20,
        border: '1px solid #F1F5F9',
        boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
        overflow: 'hidden',
        marginBottom: 24
      }}>
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #F1F5F9',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span style={{ fontSize: 14, fontWeight: 800, color: '#0F172A' }}>
            Saved Delivery Addresses
          </span>
          <span style={{ fontSize: 12, color: '#64748B' }}>
            {addresses.length} saved
          </span>
        </div>

        <div>
          {addresses.map((addr, index) => {
            const isSelected = activeId === addr.id || (addr.isDefault && !activeId);
            return (
              <div
                key={addr.id || index}
                onClick={() => handleSelect(addr)}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                  padding: '18px 20px',
                  borderBottom: index < addresses.length - 1 ? '1px solid #F8FAFC' : 'none',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'rgba(255, 107, 53, 0.04)' : '#FFFFFF',
                  transition: 'background 0.15s'
                }}
                onMouseOver={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#F8FAFC';
                }}
                onMouseOut={(e) => {
                  if (!isSelected) e.currentTarget.style.backgroundColor = '#FFFFFF';
                }}
              >
                {/* Icon Circle */}
                <div style={{
                  width: 42,
                  height: 42,
                  borderRadius: '50%',
                  backgroundColor: isSelected ? 'rgba(255, 107, 53, 0.15)' : '#F1F5F9',
                  color: isSelected ? 'var(--primary)' : '#475569',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}>
                  {addr.title.toLowerCase().includes('home') ? (
                    <Home size={18} />
                  ) : addr.title.toLowerCase().includes('office') ? (
                    <Briefcase size={18} />
                  ) : (
                    <MapPin size={18} />
                  )}
                </div>

                {/* Details */}
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                    <span style={{ fontSize: 16, fontWeight: 800, color: '#0F172A' }}>
                      {addr.title}
                    </span>
                    {addr.isDefault && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 800,
                        color: 'var(--primary)',
                        backgroundColor: 'rgba(255, 107, 53, 0.12)',
                        padding: '2px 8px',
                        borderRadius: 12
                      }}>
                        Default
                      </span>
                    )}
                    {addr.tag && !addr.isDefault && (
                      <span style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: '#64748B',
                        backgroundColor: '#F1F5F9',
                        padding: '2px 6px',
                        borderRadius: 8
                      }}>
                        {addr.tag}
                      </span>
                    )}
                  </div>

                  <div style={{ fontSize: 14, color: '#334155', fontWeight: 600, marginBottom: 2 }}>
                    {addr.subtitle}
                  </div>
                  <div style={{ fontSize: 12, color: '#94A3B8' }}>
                    {addr.fullAddress || addr.subtitle}
                  </div>
                </div>

                {/* Selection Radio / Checkmark */}
                <div style={{
                  width: 22,
                  height: 22,
                  borderRadius: '50%',
                  border: isSelected ? '6px solid var(--primary)' : '2px solid #CBD5E1',
                  backgroundColor: '#FFFFFF',
                  flexShrink: 0,
                  marginTop: 4
                }} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Pro Tips Box (Exact App Parity from video) */}
      <div style={{
        backgroundColor: '#F0F7FF',
        borderRadius: 18,
        border: '1.5px solid #BFDBFE',
        padding: '20px 24px',
        boxShadow: '0 2px 10px rgba(59, 130, 246, 0.05)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          fontSize: 15,
          fontWeight: 800,
          color: '#1D4ED8',
          marginBottom: 12
        }}>
          <Info size={18} />
          <span>Pro Tips</span>
        </div>

        <ul style={{
          margin: 0,
          paddingLeft: 20,
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          color: '#1E3A8A',
          fontSize: 13,
          lineHeight: 1.5,
          fontWeight: 500
        }}>
          <li>Set a default address for faster checkouts</li>
          <li>Add landmarks to help service providers find you easily</li>
          <li>Keep your addresses updated for accurate service delivery</li>
        </ul>
      </div>

      {/* Add Custom Address Modal */}
      {showAddCustom && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999,
          padding: 16
        }}>
          <div style={{
            backgroundColor: '#FFFFFF',
            borderRadius: 24,
            padding: '28px',
            width: '100%',
            maxWidth: 480,
            boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
            animation: 'scaleIn 0.2s ease'
          }}>
            <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', margin: '0 0 6px' }}>
              Add Delivery Address
            </h3>
            <p style={{ fontSize: 13, color: '#64748B', margin: '0 0 20px' }}>
              Enter real location details for verified doorstep dispatch
            </p>

            <form onSubmit={handleAddCustomAddress}>
              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Label (e.g. Home, Office, Studio)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Home"
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1.5px solid #E2E8F0',
                    fontSize: 14,
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: 14 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Area / Locality / Subtitle
                </label>
                <input
                  type="text"
                  placeholder="e.g. ghaziabad"
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1.5px solid #E2E8F0',
                    fontSize: 14,
                    boxSizing: 'border-box',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
                  Full Doorstep Address
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. Ghaziabad, Uttar Pradesh, 201001"
                  value={customFullAddress}
                  onChange={(e) => setCustomFullAddress(e.target.value)}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: 12,
                    border: '1.5px solid #E2E8F0',
                    fontSize: 14,
                    boxSizing: 'border-box',
                    outline: 'none',
                    fontFamily: 'inherit',
                    resize: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  onClick={() => setShowAddCustom(false)}
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 12,
                    border: '1.5px solid #E2E8F0',
                    backgroundColor: '#F8FAFC',
                    color: '#64748B',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: '12px',
                    borderRadius: 12,
                    border: 'none',
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    fontSize: 14,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
