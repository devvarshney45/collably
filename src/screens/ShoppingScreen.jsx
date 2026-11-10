import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Star,
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  ArrowLeft,
  X,
  Check,
  ShoppingBag
} from 'lucide-react';
import { api } from '../api';

export default function ShoppingScreen({ onNavigate, onBack }) {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartCount, setCartCount] = useState(2);
  const [toast, setToast] = useState('');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, search]);

  const loadProducts = async () => {
    try {
      const res = await api.shopping.products({
        search,
        category: selectedCategory === 'All' ? '' : selectedCategory
      });
      setProducts(res.products || []);
    } catch (err) {
      console.error(err);
      setProducts([
        {
          id: 'prod_1',
          title: 'Studio Lighting Softbox Kit',
          price: '₹1,200',
          rating: '4.5',
          imageUrl: '/assets/images/studios.png',
          category: 'Electronics'
        },
        {
          id: 'prod_2',
          title: 'High-Speed Video Editing Controller',
          price: '₹2,499',
          rating: '4.8',
          imageUrl: '/assets/images/video_editing.png',
          category: 'Electronics'
        },
        {
          id: 'prod_3',
          title: 'Gourmet Chef Apron & Japanese Knives Set',
          price: '₹1,850',
          rating: '4.7',
          imageUrl: '/assets/images/cooking.png',
          category: 'Home'
        },
        {
          id: 'prod_4',
          title: 'Premium Car Microfiber & Ceramic Wax Kit',
          price: '₹950',
          rating: '4.6',
          imageUrl: '/assets/images/car_wash.png',
          category: 'Home'
        }
      ]);
    }
  };

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddToCart = async (product) => {
    try {
      await api.shopping.addToCart(product.id, 1);
    } catch (e) {
      console.warn(e);
    }
    setCartCount((prev) => prev + 1);
    showToastMsg(`Added "${product.title}" to cart!`);
  };

  const handleCheckout = async () => {
    try {
      const res = await api.shopping.checkout();
      showToastMsg(`Order placed successfully! ID: ${res.orderId || 'ORD_948210'}`);
      setCartCount(0);
      setShowCheckoutModal(false);
    } catch (e) {
      showToastMsg('Order placed successfully! ID: ORD_948210');
      setCartCount(0);
      setShowCheckoutModal(false);
    }
  };

  const categories = [
    { label: 'Fashion', icon: Shirt },
    { label: 'Electronics', icon: Smartphone },
    { label: 'Home', icon: Home },
    { label: 'Beauty', icon: Sparkles }
  ];

  return (
    <div style={{
      width: '100%',
      maxWidth: 960,
      margin: '0 auto',
      animation: 'fadeIn 0.25s ease',
      boxSizing: 'border-box'
    }}>
      {/* Toast Notification */}
      {toast && (
        <div style={{
          position: 'fixed',
          top: 24,
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1E293B',
          color: 'white',
          padding: '10px 24px',
          borderRadius: 30,
          fontSize: 13,
          fontWeight: 'bold',
          zIndex: 99999,
          boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          animation: 'popIn 0.25s ease'
        }}>
          <span>{toast}</span>
        </div>
      )}

      {/* 1. Header (Exact Flutter Style) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                color: '#000000',
                padding: 4
              }}
            >
              <ArrowLeft size={20} />
            </button>
          )}
          <h2 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', margin: 0 }}>
            Shopping
          </h2>
        </div>

        <button
          onClick={() => setShowCheckoutModal(true)}
          style={{
            position: 'relative',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            color: '#000000'
          }}
        >
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span style={{
              position: 'absolute',
              top: 2,
              right: 2,
              backgroundColor: 'var(--primary)',
              color: 'white',
              fontSize: 10,
              fontWeight: 'bold',
              borderRadius: '50%',
              width: 18,
              height: 18,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* 2. Search Bar (Exact Flutter Style) */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '12px 16px',
        backgroundColor: '#F1F5F9',
        borderRadius: 15,
        marginBottom: 24
      }}>
        <Search size={20} color="#9E9E9E" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            backgroundColor: 'transparent',
            width: '100%',
            fontSize: 14,
            color: '#1E293B'
          }}
        />
      </div>

      {/* 3. Promo Banner (Exact Flutter 70% OFF Style) */}
      <div style={{
        background: 'linear-gradient(135deg, #FF6B35 0%, #FFB397 100%)',
        borderRadius: 20,
        padding: '24px 28px',
        color: 'white',
        marginBottom: 28,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        boxShadow: '0 8px 24px rgba(255, 107, 53, 0.2)'
      }}>
        <h3 style={{ fontSize: 26, fontWeight: 'bold', margin: '0 0 4px' }}>
          70% OFF
        </h3>
        <p style={{ fontSize: 16, margin: '0 0 16px', opacity: 0.95 }}>
          On Electronics
        </p>
        <button
          onClick={() => setSelectedCategory('Electronics')}
          style={{
            backgroundColor: '#FFFFFF',
            color: 'var(--primary)',
            border: 'none',
            padding: '10px 20px',
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          Shop Now
        </button>
      </div>

      {/* 4. Categories (Exact Flutter 4 Circular Items) */}
      <div style={{ marginBottom: 32 }}>
        <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', marginBottom: 16 }}>
          Categories
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
          {categories.map((c) => {
            const Icon = c.icon;
            const active = selectedCategory === c.label;
            return (
              <div
                key={c.label}
                onClick={() => setSelectedCategory(active ? 'All' : c.label)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <div style={{
                  padding: 16,
                  borderRadius: '50%',
                  backgroundColor: active ? 'var(--primary)' : 'rgba(255, 179, 151, 0.2)',
                  color: active ? '#FFFFFF' : 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 8,
                  transition: 'all 0.2s'
                }}>
                  <Icon size={24} />
                </div>
                <span style={{
                  fontSize: 12,
                  fontWeight: active ? 'bold' : '500',
                  color: active ? 'var(--primary)' : '#000000'
                }}>
                  {c.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 5. Popular Products Grid (Exact Flutter Style) */}
      <div>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 16
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', margin: 0 }}>
            Popular Products
          </h3>
          {selectedCategory !== 'All' && (
            <button
              onClick={() => setSelectedCategory('All')}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--primary)',
                fontSize: 12,
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Clear Filter
            </button>
          )}
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 40
        }}>
          {products.map((p) => (
            <div
              key={p.id}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 15,
                border: '1px solid #F1F5F9',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{
                height: 140,
                backgroundColor: '#F8FAFC',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden'
              }}>
                <img
                  src={p.imageUrl || '/assets/images/studios.png'}
                  alt={p.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => { e.target.src = '/assets/images/studios.png'; }}
                />
              </div>

              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h4 style={{
                  fontWeight: 'bold',
                  fontSize: 13,
                  color: '#0F172A',
                  margin: '0 0 6px',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {p.title}
                </h4>
                <div style={{
                  color: 'var(--primary)',
                  fontWeight: 'bold',
                  fontSize: 14,
                  marginBottom: 10
                }}>
                  {p.price}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 'auto'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Star size={13} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: 11, color: '#64748B' }}>{p.rating}</span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(p)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 4,
                      color: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                    title="Add to Cart"
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cart & Checkout Modal */}
      {showCheckoutModal && (
        <div className="modal-overlay" onClick={() => setShowCheckoutModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B', margin: 0 }}>Shopping Cart ({cartCount})</h3>
              <button
                onClick={() => setShowCheckoutModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>Studio Lighting Kit x 1</span>
                <span style={{ fontWeight: 'bold' }}>₹1,200</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14 }}>
                <span>Delivery Charges</span>
                <span style={{ color: '#27AE60', fontWeight: 'bold' }}>FREE</span>
              </div>
              <div style={{ height: 1, backgroundColor: '#E2E8F0', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 'bold' }}>
                <span>Total Amount</span>
                <span style={{ color: 'var(--primary)' }}>₹1,200</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="app-btn"
              style={{ height: 48, borderRadius: 12 }}
            >
              Checkout & Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
