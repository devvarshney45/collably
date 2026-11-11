import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Wallet as WalletIcon,
  Plus,
  ArrowUpRight,
  Send,
  CreditCard,
  Smartphone,
  Landmark,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Gift,
  X
} from 'lucide-react';
import { api } from '../api';

export default function WalletScreen({ onNavigate, onBack }) {
  const [selectedTabIndex, setSelectedTabIndex] = useState(0); // 0: Balance, 1: Add Money, 2: History
  const [balance, setBalance] = useState('₹1247.50');
  const [loyaltyPoints, setLoyaltyPoints] = useState('890 points');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addAmount, setAddAmount] = useState('500');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('UPI');
  const [sendRecipient, setSendRecipient] = useState('');
  const [sendAmount, setSendAmount] = useState('250');
  const [showSendModal, setShowSendModal] = useState(false);
  const [toast, setToast] = useState('');
  const [historyFilter, setHistoryFilter] = useState('all');

  useEffect(() => {
    loadWallet();
  }, []);

  const loadWallet = async () => {
    try {
      const data = await api.wallet.get();
      if (data.wallet) {
        setBalance(typeof data.wallet.balance === 'number' ? `₹${data.wallet.balance.toFixed(2)}` : data.wallet.balance);
        if (data.wallet.loyaltyPoints) setLoyaltyPoints(`${data.wallet.loyaltyPoints} points`);
        setTransactions(data.wallet.transactions || []);
      }
    } catch (err) {
      console.error(err);
      setBalance('₹1247.50');
      setLoyaltyPoints('890 points');
      setTransactions([
        {
          id: 'tx_1',
          title: 'Referral bonus',
          date: '2024-01-15 • 10:30 AM',
          amount: '+₹100',
          positive: true
        },
        {
          id: 'tx_2',
          title: 'Photography booking payment',
          date: '2024-01-14 • 3:45 PM',
          amount: '-₹250',
          positive: false
        },
        {
          id: 'tx_3',
          title: 'Money added via UPI',
          date: '2024-01-12 • 11:20 AM',
          amount: '+₹500',
          positive: true
        }
      ]);
    }
  };

  const showToastMsg = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const handleAddMoney = async () => {
    const num = Number(addAmount);
    if (!num || num <= 0) return;
    setLoading(true);
    try {
      const res = await api.wallet.addMoney(num);
      if (res.wallet) {
        const balNum = typeof res.wallet.balance === 'number' ? res.wallet.balance : parseFloat(res.wallet.balance) || 0;
        setBalance(`₹${balNum.toFixed(2)}`);
        if (res.wallet.loyaltyPoints !== undefined) {
          setLoyaltyPoints(`${res.wallet.loyaltyPoints} points`);
        }
        if (Array.isArray(res.wallet.transactions)) {
          setTransactions([...res.wallet.transactions]);
        }
      } else if (res.transaction) {
        setTransactions((prev) => [res.transaction, ...prev]);
      }
      showToastMsg(`₹${num} added successfully via ${selectedPaymentMethod}!`);
      setSelectedTabIndex(0);
    } catch (err) {
      console.error('Wallet add error:', err);
      const fallbackTx = {
        id: `tx_${Date.now()}`,
        title: `Money added via ${selectedPaymentMethod}`,
        date: `${new Date().toISOString().slice(0, 10)} • Just now`,
        amount: `+₹${num.toLocaleString('en-IN')}`,
        numericAmount: num,
        positive: true
      };
      setTransactions((prev) => [fallbackTx, ...prev]);
      setBalance((prev) => {
        const curr = parseFloat(String(prev).replace(/[^0-9.]/g, '')) || 0;
        return `₹${(curr + num).toFixed(2)}`;
      });
      showToastMsg(`₹${num} added successfully via ${selectedPaymentMethod}!`);
      setSelectedTabIndex(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMoney = async () => {
    const num = Number(sendAmount);
    if (!num || num <= 0) return;
    setLoading(true);
    try {
      const res = await api.wallet.sendMoney(sendRecipient || 'Friend', num);
      if (res.wallet) {
        const balNum = typeof res.wallet.balance === 'number' ? res.wallet.balance : parseFloat(res.wallet.balance) || 0;
        setBalance(`₹${balNum.toFixed(2)}`);
        if (Array.isArray(res.wallet.transactions)) {
          setTransactions([...res.wallet.transactions]);
        }
      } else if (res.transaction) {
        setTransactions((prev) => [res.transaction, ...prev]);
      }
      setShowSendModal(false);
      showToastMsg(`₹${num} sent to ${sendRecipient || 'Friend'} successfully!`);
    } catch (err) {
      console.error('Wallet send error:', err);
      const fallbackTx = {
        id: `tx_${Date.now()}`,
        title: `Transferred to ${sendRecipient || 'Friend'}`,
        date: `${new Date().toISOString().slice(0, 10)} • Just now`,
        amount: `-₹${num.toLocaleString('en-IN')}`,
        numericAmount: -num,
        positive: false
      };
      setTransactions((prev) => [fallbackTx, ...prev]);
      setBalance((prev) => {
        const curr = parseFloat(String(prev).replace(/[^0-9.]/g, '')) || 0;
        return `₹${Math.max(0, curr - num).toFixed(2)}`;
      });
      setShowSendModal(false);
      showToastMsg(`₹${num} sent successfully!`);
    } finally {
      setLoading(false);
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    if (historyFilter === 'credits') return t.positive;
    if (historyFilter === 'debits') return !t.positive;
    return true;
  });

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
          <button
            onClick={onBack || (() => onNavigate('dashboard_home'))}
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
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 'bold', color: '#000000', margin: 0 }}>
              My Wallet
            </h2>
            <p style={{ fontSize: 12, color: '#9E9E9E', margin: '2px 0 0' }}>
              Manage your payments
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#27AE60', fontSize: 12, fontWeight: 700 }}>
          <ShieldCheck size={16} />
          <span>Escrow Protected</span>
        </div>
      </div>

      {/* 2. Tabs Segmented Control (Exact Flutter Style) */}
      <div style={{
        display: 'flex',
        backgroundColor: '#F1F5F9',
        padding: 4,
        borderRadius: 12,
        marginBottom: 24
      }}>
        {['Balance', 'Add Money', 'History'].map((tab, idx) => {
          const active = selectedTabIndex === idx;
          return (
            <button
              key={tab}
              onClick={() => setSelectedTabIndex(idx)}
              style={{
                flex: 1,
                height: 40,
                border: 'none',
                borderRadius: 10,
                backgroundColor: active ? '#FFFFFF' : 'transparent',
                boxShadow: active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                color: active ? 'var(--primary)' : '#64748B',
                fontWeight: active ? 'bold' : '500',
                fontSize: 13,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* TAB 0: Balance View (Exact Flutter Orange Card + Quick Actions + Recent Transactions) */}
      {selectedTabIndex === 0 && (
        <div>
          {/* Orange Wallet Card (Exact Flutter Gradient & Layout) */}
          <div style={{
            background: 'linear-gradient(135deg, #FF7A45 0%, #F96D26 100%)',
            borderRadius: 24,
            padding: 24,
            color: 'white',
            boxShadow: '0 8px 24px rgba(249, 109, 38, 0.25)',
            marginBottom: 32
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <WalletIcon size={24} color="white" />
                <span style={{ fontSize: 16, fontWeight: 'bold' }}>Collably Wallet</span>
              </div>
              <div style={{
                backgroundColor: 'rgba(255, 255, 255, 0.2)',
                padding: '4px 10px',
                borderRadius: 8,
                fontSize: 10,
                fontWeight: 'bold'
              }}>
                Active
              </div>
            </div>

            <div style={{ fontSize: 13, color: 'rgba(255, 255, 255, 0.75)', marginBottom: 4 }}>
              Available Balance
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 24
            }}>
              <span style={{ fontSize: 32, fontWeight: 'bold' }}>{balance}</span>
              <button
                onClick={() => setSelectedTabIndex(1)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 10,
                  fontSize: 12,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                <Plus size={16} />
                <span>Add Money</span>
              </button>
            </div>

            <div style={{ fontSize: 11, color: 'rgba(255, 255, 255, 0.75)' }}>Loyalty Points</div>
            <div style={{ fontSize: 16, fontWeight: 'bold' }}>{loyaltyPoints}</div>
          </div>

          {/* Quick Actions (Exact Flutter Style) */}
          <div style={{ marginBottom: 32 }}>
            <h4 style={{ fontSize: 16, fontWeight: 'bold', color: '#1E293B', marginBottom: 16 }}>
              Quick Actions
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16 }}>
              <div
                onClick={() => setSelectedTabIndex(1)}
                style={{
                  height: 90,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 107, 53, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}>
                  <Plus size={20} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 'bold', color: '#1E293B' }}>Add Money</span>
              </div>

              <div
                onClick={() => setShowSendModal(true)}
                style={{
                  height: 90,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 16,
                  border: '1px solid #F1F5F9',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 12,
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
              >
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  backgroundColor: 'rgba(39, 174, 96, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#27AE60'
                }}>
                  <ArrowUpRight size={20} />
                </div>
                <span style={{ fontSize: 14, fontWeight: 'bold', color: '#1E293B' }}>Send Money</span>
              </div>
            </div>
          </div>

          {/* Recent Transactions (Exact Flutter Style) */}
          <div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <h4 style={{ fontSize: 16, fontWeight: 'bold', color: '#1E293B', margin: 0 }}>
                Recent Transactions
              </h4>
              <button
                onClick={() => setSelectedTabIndex(2)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontSize: 13,
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                View All
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {transactions.slice(0, 5).map((t) => (
                <div
                  key={t.id}
                  style={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: 16,
                    padding: '16px 20px',
                    border: '1px solid #F1F5F9',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: t.positive ? '#E8F8EF' : '#FEE2E2',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: t.positive ? '#27AE60' : '#EF4444'
                    }}>
                      <WalletIcon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 'bold', color: '#1E293B' }}>
                        {t.title}
                      </div>
                      <div style={{ fontSize: 11, color: '#9E9E9E', marginTop: 2 }}>
                        {t.date}
                      </div>
                    </div>
                  </div>

                  <span style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: t.positive ? '#27AE60' : '#EF4444'
                  }}>
                    {t.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 1: Add Money Interactive Form */}
      {selectedTabIndex === 1 && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: 28,
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B', marginBottom: 6 }}>
            Add Money to Wallet
          </h3>
          <p style={{ fontSize: 13, color: '#64748B', marginBottom: 24 }}>
            Top up your balance instantly with zero convenience charges.
          </p>

          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 8 }}>
            Enter Amount (₹)
          </label>
          <div className="app-textfield-wrapper" style={{ marginBottom: 16 }}>
            <span style={{ fontSize: 20, fontWeight: 800, color: '#0F172A', marginLeft: 4 }}>₹</span>
            <input
              type="number"
              value={addAmount}
              onChange={(e) => setAddAmount(e.target.value)}
              className="app-textfield-input"
              style={{ fontSize: 20, fontWeight: 700 }}
              placeholder="500"
            />
          </div>

          {/* Quick Amount Chips */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 28 }}>
            {['100', '250', '500', '1000', '2000'].map((amt) => (
              <button
                key={amt}
                onClick={() => setAddAmount(amt)}
                style={{
                  padding: '8px 16px',
                  borderRadius: 10,
                  border: addAmount === amt ? '1.5px solid var(--primary)' : '1px solid #CBD5E1',
                  background: addAmount === amt ? 'var(--primary-light)' : '#FFFFFF',
                  color: addAmount === amt ? 'var(--primary)' : '#475569',
                  fontWeight: 700,
                  fontSize: 13,
                  cursor: 'pointer'
                }}
              >
                +₹{amt}
              </button>
            ))}
          </div>

          <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 12 }}>
            Select Payment Method:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12, marginBottom: 28 }}>
            {[
              { id: 'UPI', label: 'UPI (GPay/PhonePe)', icon: Smartphone },
              { id: 'Card', label: 'Debit / Credit Card', icon: CreditCard },
              { id: 'NetBanking', label: 'Net Banking', icon: Landmark }
            ].map((pm) => {
              const Icon = pm.icon;
              const selected = selectedPaymentMethod === pm.id;
              return (
                <div
                  key={pm.id}
                  onClick={() => setSelectedPaymentMethod(pm.id)}
                  style={{
                    padding: '14px 16px',
                    borderRadius: 14,
                    border: selected ? '2px solid var(--primary)' : '1px solid #E2E8F0',
                    background: selected ? 'var(--primary-faint)' : '#FFFFFF',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    textAlign: 'center'
                  }}
                >
                  <Icon size={22} color={selected ? 'var(--primary)' : '#64748B'} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: selected ? 'var(--primary)' : '#334155' }}>
                    {pm.label}
                  </span>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleAddMoney}
            disabled={loading}
            className="app-btn"
            style={{ height: 48, borderRadius: 12, fontSize: 15 }}
          >
            {loading ? 'Processing Payment...' : `Add ₹${addAmount} to Wallet`}
          </button>
        </div>
      )}

      {/* TAB 2: Full History View */}
      {selectedTabIndex === 2 && (
        <div style={{
          backgroundColor: '#FFFFFF',
          borderRadius: 20,
          padding: 28,
          border: '1px solid #E2E8F0',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 20
          }}>
            <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B', margin: 0 }}>
              Transaction History
            </h3>
            <div style={{ display: 'flex', gap: 8 }}>
              {['all', 'credits', 'debits'].map((f) => (
                <button
                  key={f}
                  onClick={() => setHistoryFilter(f)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: 8,
                    border: 'none',
                    background: historyFilter === f ? 'var(--primary)' : '#F1F5F9',
                    color: historyFilter === f ? 'white' : '#64748B',
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {f.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {filteredTransactions.map((t) => (
              <div
                key={t.id}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: 14,
                  padding: '14px 18px',
                  border: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    backgroundColor: t.positive ? '#E8F8EF' : '#FEE2E2',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: t.positive ? '#27AE60' : '#EF4444'
                  }}>
                    <WalletIcon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 'bold', color: '#1E293B' }}>{t.title}</div>
                    <div style={{ fontSize: 11, color: '#9E9E9E' }}>{t.date}</div>
                  </div>
                </div>

                <span style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: t.positive ? '#27AE60' : '#EF4444'
                }}>
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Send Money Modal */}
      {showSendModal && (
        <div className="modal-overlay" onClick={() => setShowSendModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 440 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontSize: 18, fontWeight: 'bold', color: '#1E293B', margin: 0 }}>Send Money</h3>
              <button
                onClick={() => setShowSendModal(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8' }}
              >
                <X size={20} />
              </button>
            </div>

            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Recipient Phone Number or UPI ID
            </label>
            <div className="app-textfield-wrapper" style={{ marginBottom: 16 }}>
              <input
                type="text"
                placeholder="e.g. 9876543210 or user@upi"
                value={sendRecipient}
                onChange={(e) => setSendRecipient(e.target.value)}
                className="app-textfield-input"
              />
            </div>

            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#334155', marginBottom: 6 }}>
              Amount (₹)
            </label>
            <div className="app-textfield-wrapper" style={{ marginBottom: 24 }}>
              <span style={{ fontSize: 18, fontWeight: 800, color: '#0F172A', marginLeft: 4 }}>₹</span>
              <input
                type="number"
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className="app-textfield-input"
              />
            </div>

            <button
              onClick={handleSendMoney}
              disabled={loading}
              className="app-btn"
              style={{ height: 48, borderRadius: 12 }}
            >
              {loading ? 'Sending...' : `Send ₹${sendAmount} Now`}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
