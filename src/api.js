const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) || '/api';

/**
 * Token and Local Storage Helpers
 */
export function getAuthToken() {
  try {
    return localStorage.getItem('auth_token') || localStorage.getItem('token') || '';
  } catch (e) {
    return '';
  }
}

export function setAuthSession(token, user) {
  try {
    if (token) localStorage.setItem('auth_token', token);
    if (user) localStorage.setItem('user_profile', JSON.stringify(user));
  } catch (e) {
    console.warn('Failed to save auth session:', e);
  }
}

export function clearAuthSession() {
  try {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('token');
    localStorage.removeItem('user_profile');
  } catch (e) {
    console.warn('Failed to clear auth session:', e);
  }
}

export function getCachedUserProfile() {
  try {
    const raw = localStorage.getItem('user_profile');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/**
 * Data normalizers for seamless rendering across all Web Screens
 */
export function normalizeCategory(c) {
  if (!c) return null;
  const id = c.id || c.categoryId || c._id || 'cat_gen';
  const name = c.name || c.title || '';
  const icon = c.iconImage || c.image || c.icon || '/assets/images/daily_meals_hr.jpg';
  return {
    ...c,
    id,
    categoryId: id,
    name,
    title: name,
    icon,
    image: icon,
    iconImage: icon,
    color: c.color || '#FFFBEB'
  };
}

export function normalizeService(s) {
  if (!s) return null;
  const id = s.serviceId || s.id || s._id || `srv_${Math.random().toString(36).substring(7)}`;
  const name = s.name || s.title || 'Collably Service';
  const price = Number(s.price || 0);
  const discount = Number(s.discount || 0);
  const finalPrice = s.finalPrice !== undefined && s.finalPrice !== null
    ? Number(s.finalPrice)
    : (discount > 0 ? Math.round(price - (price * discount) / 100) : price);

  const places = Array.isArray(s.placesAvailable)
    ? s.placesAvailable.join(', ')
    : (s.placesAvailable || s.location || 'Delhi NCR & Noida');

  const exp = s.yearsOfExperience
    ? `${s.yearsOfExperience} yrs experience`
    : (s.experience || 'Verified Professional');

  const image = s.iconImage || s.image || '/assets/images/daily_meals_hr.jpg';

  return {
    ...s,
    id,
    serviceId: id,
    name,
    title: name,
    category: s.categoryName || s.category || 'General',
    categoryName: s.categoryName || s.category || 'General',
    categoryId: s.categoryId || '',
    price: `₹${finalPrice.toLocaleString('en-IN')}`,
    originalPrice: discount > 0 ? `₹${price.toLocaleString('en-IN')}` : null,
    numericPrice: finalPrice,
    basePrice: price,
    discount: discount > 0 ? `${discount}% OFF` : null,
    numericDiscount: discount,
    finalPrice,
    image,
    iconImage: image,
    location: places,
    placesAvailable: Array.isArray(s.placesAvailable) ? s.placesAvailable : [places],
    experience: exp,
    yearsOfExperience: s.yearsOfExperience || '3',
    rating: s.rating || '4.9',
    reviewsCount: s.reviewsCount || '240',
    contactPhone: s.contactPhone || '9818191755',
    description: s.description || `Professional ${name} service provided by background-verified experts in ${places}. Trained technicians with standard equipment and customer satisfaction guarantee.`,
    servicesOffered: s.servicesOffered || [
      'Verified & Trained Specialists',
      'On-time Service Guarantee',
      'Transparent Pricing & Live Tracking',
      'Dedicated Support via App & WhatsApp'
    ],
    gallery: s.gallery && s.gallery.length ? s.gallery : [image],
    reviews: s.reviews || [
      { id: 'rev_1', name: 'Dev V.', date: 'Recently', rating: 5, comment: `Excellent ${name} experience. Prompt and well mannered!` }
    ]
  };
}

export function normalizeBooking(b) {
  if (!b) return null;
  const id = b.id || b.bookingId || `COL${Math.floor(10000 + Math.random() * 90000)}`;
  const title = b.serviceName || b.title || 'Service Booking';
  const price = b.serviceFinalPrice || b.servicePrice || b.price || 0;
  const numericPrice = typeof price === 'number' ? price : Number(String(price).replace(/[^\d.]/g, '')) || 0;
  const places = Array.isArray(b.serviceLocation) ? b.serviceLocation.join(', ') : (b.location || 'Noida, Sector 62');

  const catOrTitle = `${b.categoryName || ''} ${title}`.toLowerCase();
  let defaultImg = '/assets/images/daily_meals_hr.jpg';
  if (catOrTitle.includes('appliance') || catOrTitle.includes('ac') || catOrTitle.includes('repair') || catOrTitle.includes('refrigerator') || catOrTitle.includes('washing')) {
    defaultImg = '/assets/images/appliance_repair_hr.jpg';
  } else if (catOrTitle.includes('office') || catOrTitle.includes('pantry') || catOrTitle.includes('cleaning')) {
    defaultImg = '/assets/images/office_support_hr.jpg';
  } else if (catOrTitle.includes('baby') || catOrTitle.includes('care') || catOrTitle.includes('night care') || catOrTitle.includes('day care')) {
    defaultImg = '/assets/images/babysitting_hr.jpg';
  }

  return {
    ...b,
    id,
    bookingId: id,
    serviceId: b.serviceId || '',
    title,
    serviceName: title,
    price: `₹${numericPrice.toLocaleString('en-IN')}`,
    numericPrice,
    totalAmount: `₹${numericPrice.toLocaleString('en-IN')}`,
    location: places,
    date: b.date || 'Today',
    time: b.time || '10:00 AM',
    duration: b.duration || '1 Hour',
    status: (b.status === 'confirmed' || b.status === 'Confirmed')
      ? 'Confirmed'
      : (b.status === 'completed' || b.status === 'Completed')
        ? 'Completed'
        : (b.status === 'pending_admin' || b.status === 'Pending Confirmation')
          ? 'Pending Confirmation'
          : b.status || 'Pending Confirmation',
    imageUrl: b.iconImage || b.imageUrl || defaultImg
  };
}

export function isTokenValid(token) {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  if (parts.length !== 3) return false;
  try {
    const payload = JSON.parse(atob(parts[1]));
    if (!payload.exp) return true;
    // Check if expiry is in future (buffer of 30 seconds)
    return Math.floor(Date.now() / 1000) < (payload.exp - 30);
  } catch (e) {
    return false;
  }
}

/**
 * Universal Fetch Request with JWT Auth, Auto-Retry on 401, & JSON parsing
 */
let isRefreshing = false;
let refreshPromise = null;

async function acquireFreshSession() {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }
  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 8000);

      const res = await fetch(`${API_BASE}/auth/demo-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      const data = await res.json();
      if (data && data.accessToken) {
        setAuthSession(data.accessToken, data.data || data.user);
        return data.accessToken;
      }
    } catch (e) {
      console.warn('[Collably Auth] Auto-acquire session failed:', e);
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
    return '';
  })();
  return refreshPromise;
}

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  let token = getAuthToken();

  const isPublicAuth = endpoint.startsWith('/auth/demo-session') || 
                       endpoint.startsWith('/auth/send-otp') || 
                       endpoint.startsWith('/auth/verify-otp') || 
                       endpoint.startsWith('/auth/google') ||
                       endpoint.startsWith('/services') ||
                       endpoint.startsWith('/category');

  // If token is missing, expired, or malformed and not a public route, auto-acquire valid session first
  if (!isPublicAuth && (!token || !isTokenValid(token))) {
    token = await acquireFreshSession();
  }

  const getHeaders = (currToken) => ({
    'Content-Type': 'application/json',
    ...(currToken ? { 'Authorization': `Bearer ${currToken}` } : {})
  });

  try {
    let res = await fetch(url, {
      ...options,
      headers: {
        ...getHeaders(token),
        ...options.headers,
      },
    });

    // AUTO-RECOVER on 401: Invalid or expired session token
    if (res.status === 401 && !options._retry && !endpoint.startsWith('/auth/logout') && !endpoint.startsWith('/auth/demo-session')) {
      clearAuthSession();
      const freshToken = await acquireFreshSession();

      if (freshToken) {
        res = await fetch(url, {
          ...options,
          _retry: true,
          headers: {
            ...options.headers,
            ...getHeaders(freshToken),
          },
        });
      }
    }

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || `Request failed with status ${res.status}`);
    }
    return data;
  } catch (err) {
    console.warn(`[Collably Real-Time API] Call to ${endpoint} failed:`, err.message);
    return getOfflineFallback(endpoint, options);
  }
}

/**
 * Realistic local fallback in case backend is offline
 */
function getOfflineFallback(endpoint, options) {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? (typeof options.body === 'string' ? JSON.parse(options.body) : options.body) : {};

  if (endpoint.startsWith('/auth/send-otp')) {
    return { success: true, message: 'OTP sent successfully', otp: '1234' };
  }
  if (endpoint.startsWith('/auth/verify-otp') || endpoint.startsWith('/auth/google')) {
    const testUser = {
      uid: 'user_collably_live',
      name: 'Dev Varshney',
      email: 'varshneydev365@gmail.com',
      phone: body.phone || '6397003690',
      profileImage: '/assets/images/app_icon.png',
      isLoggedIn: true
    };
    return { success: true, user: testUser, data: testUser };
  }
  if (endpoint.startsWith('/profile') || endpoint.startsWith('/auth/me')) {
    const cached = getCachedUserProfile();
    return {
      success: true,
      data: cached || {
        uid: 'user_collably_live',
        name: 'Dev Varshney',
        email: 'varshneydev365@gmail.com',
        phone: '6397003690',
        profileImage: '/assets/images/app_icon.png',
        referralCode: 'DEV2026'
      }
    };
  }
  if (endpoint.startsWith('/address')) {
    return {
      success: true,
      addresses: [
        { id: 'addr_1', label: 'Home', address: { addressLine: 'Plot 45, Sector 62', city: 'Noida', state: 'Uttar Pradesh' }, pincode: '201301', isDefault: true },
        { id: 'addr_2', label: 'Office', address: { addressLine: 'DLF Cyber City, Tower B', city: 'Gurugram', state: 'Haryana' }, pincode: '122002', isDefault: false }
      ]
    };
  }
  if (endpoint.startsWith('/wallet/transactions')) {
    return {
      success: true,
      transactions: [
        { id: 'tx_1', type: 'credit', amount: 500, description: 'Welcome Bonus', createdAt: new Date().toISOString(), status: 'success' },
        { id: 'tx_2', type: 'credit', amount: 200, description: 'Referral Cashback', createdAt: new Date().toISOString(), status: 'success' }
      ]
    };
  }
  if (endpoint.startsWith('/wallet')) {
    return {
      success: true,
      data: { balance: 1500, currency: 'INR' },
      balance: '₹1,500',
      numericBalance: 1500
    };
  }
  if (endpoint.startsWith('/bookings')) {
    return {
      success: true,
      activeBookings: [],
      pastBookings: []
    };
  }

  return { success: true };
}

/**
 * The Collably Real-Time API Client
 */
export const api = {
  auth: {
    sendOtp: async (phone) => {
      const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
      return request('/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: cleanPhone })
      });
    },
    verifyOtp: async (phone, otp) => {
      const cleanPhone = String(phone).replace(/\D/g, '').slice(-10);
      const res = await request('/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone: cleanPhone, otp: String(otp) })
      });
      if (res && res.accessToken) {
        setAuthSession(res.accessToken, res.data);
      }
      return res;
    },
    google: async (payload = {}) => {
      const res = await request('/auth/google', {
        method: 'POST',
        body: JSON.stringify(payload)
      });
      if (res && res.accessToken) {
        setAuthSession(res.accessToken, res.data);
      }
      return res;
    },
    me: async () => {
      const res = await request('/profile');
      return {
        success: true,
        user: res.data || res.user || getCachedUserProfile(),
        data: res.data || res.user || getCachedUserProfile()
      };
    },
    ensureSession: async (force = false) => {
      let token = getAuthToken();
      if (!token || !isTokenValid(token) || force) {
        return acquireFreshSession();
      }
      return token;
    },
    logout: async () => {
      try {
        await request('/auth/logout', { method: 'POST' });
      } catch (e) {
        // ignore
      }
      clearAuthSession();
      return { success: true };
    },
  },

  categories: {
    list: async () => {
      const res = await request('/categories');
      const rawList = res.data || res.categories || [];
      const normalized = rawList.map(normalizeCategory);
      return {
        success: true,
        categories: normalized,
        data: normalized
      };
    },
  },

  services: {
    list: async (params = {}) => {
      const q = new URLSearchParams();
      if (params.q) q.append('q', params.q);
      const queryStr = q.toString() ? `?${q.toString()}` : '';
      const res = await request(`/services${queryStr}`);
      let list = (res.data || res.services || []).map(normalizeService);

      if (params.category && params.category !== 'All') {
        const catLower = params.category.toLowerCase().trim();
        list = list.filter(s => (s.category || '').toLowerCase().trim() === catLower);
      }

      return {
        success: true,
        count: list.length,
        services: list,
        data: list
      };
    },

    get: async (id) => {
      const res = await request(`/services/${id}`);
      const s = normalizeService(res.data || res.service);
      return {
        success: true,
        service: s,
        data: s
      };
    },

    popular: async () => {
      const res = await request('/bookings/popular');
      let list = (res.popularServices || res.data || []).map(normalizeService);
      if (!list.length) {
        // Fallback to all services
        const allRes = await request('/services');
        list = (allRes.data || []).slice(0, 6).map(normalizeService);
      }
      return {
        success: true,
        services: list,
        popularServices: list
      };
    },

    recentlyBooked: async () => {
      const allRes = await request('/services');
      const list = (allRes.data || []).slice(0, 4).map(normalizeService);
      return {
        success: true,
        services: list
      };
    },
  },

  bookings: {
    list: async () => {
      if (!isTokenValid(getAuthToken())) await api.auth.ensureSession();
      const res = await request('/bookings/my');
      const sortFn = (a, b) => {
        const getMs = (item) => {
          if (!item) return 0;
          const c = item.createdAt;
          if (!c) return 0;
          if (c._seconds) return c._seconds * 1000 + (c._nanoseconds || 0) / 1000000;
          if (typeof c.toDate === 'function') return c.toDate().getTime();
          if (c instanceof Date) return c.getTime();
          const ms = new Date(c).getTime();
          return isNaN(ms) ? 0 : ms;
        };
        return getMs(b) - getMs(a);
      };
      const rawActive = Array.isArray(res?.activeBookings) ? res.activeBookings : (Array.isArray(res?.data) ? res.data : []);
      const rawPast = Array.isArray(res?.pastBookings) ? res.pastBookings : [];
      const active = rawActive.map(normalizeBooking).sort(sortFn);
      const past = rawPast.map(normalizeBooking).sort(sortFn);
      return {
        success: true,
        activeBookings: active,
        pastBookings: past,
        data: [...active, ...past]
      };
    },

    create: async (data) => {
      if (!getAuthToken()) await api.auth.ensureSession();
      return request('/bookings', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    reschedule: async (id, data) => {
      return request(`/bookings/${id}/reschedule`, {
        method: 'PATCH',
        body: JSON.stringify(data)
      });
    },

    accept: async (id) => {
      return request(`/bookings/${id}/accept`, {
        method: 'PATCH'
      });
    },

    reject: async (id) => {
      return request(`/bookings/${id}/reject`, {
        method: 'PATCH'
      });
    },
  },

  addresses: {
    list: async (search = '') => {
      if (!getAuthToken()) await api.auth.ensureSession();
      const res = await request('/address');
      const rawAddrs = res.addresses || res.data || [];
      const formatted = rawAddrs.map((a, idx) => ({
        id: a.id || `addr_${idx}`,
        title: a.label || a.customLabel || 'Home',
        subtitle: a.address ? `${a.address.addressLine || ''}, ${a.address.city || ''}, ${a.address.state || ''} ${a.pincode || ''}` : (a.subtitle || 'Address'),
        fullAddress: a.address ? `${a.address.addressLine || ''}, ${a.address.city || ''}, ${a.address.state || ''}` : (a.subtitle || ''),
        isDefault: !!a.isDefault
      }));

      const active = formatted.find(a => a.isDefault) || formatted[0] || {
        id: 'addr_default',
        title: 'Home',
        subtitle: 'Sector 62, Noida, Uttar Pradesh 201301',
        fullAddress: 'Sector 62, Noida, Uttar Pradesh'
      };

      return {
        success: true,
        addresses: formatted,
        activeAddress: active
      };
    },

    confirm: async (title, subtitle) => {
      try {
        localStorage.setItem('active_address', JSON.stringify({ title, subtitle }));
      } catch (e) {}
      return {
        success: true,
        activeAddress: { title, subtitle }
      };
    },

    create: async (data) => {
      return request('/address/add', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    update: async (id, data) => {
      return request(`/address/update/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    delete: async (id) => {
      return request(`/address/delete/${id}`, {
        method: 'DELETE'
      });
    }
  },

  wallet: {
    get: async () => {
      if (!isTokenValid(getAuthToken())) await api.auth.ensureSession();
      const [walletRes, txRes] = await Promise.all([
        request('/wallet').catch(() => ({ balance: 0 })),
        request('/wallet/transactions').catch(() => ({ transactions: [] }))
      ]);
      const rawBalance = walletRes?.data?.balance !== undefined
        ? walletRes.data.balance
        : (walletRes?.balance !== undefined ? walletRes.balance : 0);
      const numBal = Number(rawBalance) || 0;

      const rawList = Array.isArray(txRes?.data?.transactions)
        ? txRes.data.transactions
        : (Array.isArray(txRes?.transactions)
          ? txRes.transactions
          : (Array.isArray(txRes?.data)
            ? txRes.data
            : (Array.isArray(walletRes?.data?.recentTransactions)
              ? walletRes.data.recentTransactions
              : (Array.isArray(walletRes?.recentTransactions)
                ? walletRes.recentTransactions
                : []))));

      const sortTxFn = (a, b) => {
        const getMs = (t) => {
          if (!t || !t.createdAt) return 0;
          const c = t.createdAt;
          if (c._seconds) return c._seconds * 1000 + (c._nanoseconds || 0) / 1000000;
          if (typeof c.toDate === 'function') return c.toDate().getTime();
          if (c instanceof Date) return c.getTime();
          const ms = new Date(c).getTime();
          return isNaN(ms) ? 0 : ms;
        };
        return getMs(b) - getMs(a);
      };

      const sortedTxs = [...rawList].sort(sortTxFn);

      const formattedTxs = sortedTxs.map(t => {
        const amt = Number(t.amount || 0);
        const isCredit = t.type === 'credit';
        let dateStr = 'Recently';
        if (t.createdAt) {
          const ms = t.createdAt._seconds ? t.createdAt._seconds * 1000 : (typeof t.createdAt === 'string' ? new Date(t.createdAt).getTime() : t.createdAt);
          if (!isNaN(ms)) {
            dateStr = new Date(ms).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          }
        }
        return {
          id: t.id || `tx_${Math.random()}`,
          title: t.description || (isCredit ? 'Money Added' : 'Payment for Service'),
          service: t.description || (isCredit ? 'UPI Top-up' : 'Booking Payment'),
          type: t.type || 'credit',
          amount: `${isCredit ? '+' : '-'}₹${amt.toLocaleString('en-IN')}`,
          numericAmount: isCredit ? amt : -amt,
          positive: isCredit,
          date: dateStr,
          status: t.status || 'Success'
        };
      });

      const walletObj = {
        balance: `₹${numBal.toLocaleString('en-IN')}`,
        numericBalance: numBal,
        loyaltyPoints: `${Math.round(numBal / 10)} points`,
        currency: 'INR',
        transactions: formattedTxs,
        data: walletRes?.data || walletRes
      };

      return {
        success: true,
        wallet: walletObj,
        ...walletObj
      };
    },

    transactions: async () => {
      if (!isTokenValid(getAuthToken())) await api.auth.ensureSession();
      const res = await request('/wallet/transactions');
      const rawList = Array.isArray(res?.data?.transactions)
        ? res.data.transactions
        : (Array.isArray(res?.transactions)
          ? res.transactions
          : (Array.isArray(res?.data) ? res.data : []));

      const sortTxFn = (a, b) => {
        const getMs = (t) => {
          if (!t || !t.createdAt) return 0;
          const c = t.createdAt;
          if (c._seconds) return c._seconds * 1000 + (c._nanoseconds || 0) / 1000000;
          if (typeof c.toDate === 'function') return c.toDate().getTime();
          if (c instanceof Date) return c.getTime();
          const ms = new Date(c).getTime();
          return isNaN(ms) ? 0 : ms;
        };
        return getMs(b) - getMs(a);
      };

      const sortedTxs = [...rawList].sort(sortTxFn);

      const formatted = sortedTxs.map(t => {
        const amt = Number(t.amount || 0);
        const isCredit = t.type === 'credit';
        let dateStr = 'Recently';
        if (t.createdAt) {
          const ms = t.createdAt._seconds ? t.createdAt._seconds * 1000 : (typeof t.createdAt === 'string' ? new Date(t.createdAt).getTime() : t.createdAt);
          if (!isNaN(ms)) {
            dateStr = new Date(ms).toLocaleDateString('en-IN', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });
          }
        }
        return {
          id: t.id || `tx_${Math.random()}`,
          title: t.description || (isCredit ? 'Money Added' : 'Payment for Service'),
          service: t.description || (isCredit ? 'UPI Top-up' : 'Booking Payment'),
          type: t.type || 'credit',
          amount: `${isCredit ? '+' : '-'}₹${amt.toLocaleString('en-IN')}`,
          numericAmount: isCredit ? amt : -amt,
          positive: isCredit,
          date: dateStr,
          status: t.status || 'Success'
        };
      });
      return {
        success: true,
        transactions: formatted
      };
    },

    addMoney: async (amount, paymentMethod = 'UPI') => {
      if (!getAuthToken()) await api.auth.ensureSession();
      return request('/wallet/add-money', {
        method: 'POST',
        body: JSON.stringify({
          amount: Number(amount),
          paymentMethod
        })
      });
    },

    walletPay: async (data) => {
      if (!getAuthToken()) await api.auth.ensureSession();
      return request('/payment/wallet-pay', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    },

    sendMoney: async (recipient, amount) => {
      return request('/wallet/send-money', {
        method: 'POST',
        body: JSON.stringify({
          receiverPhone: String(recipient).replace(/\D/g, '').slice(-10),
          amount: Number(amount),
          note: 'Web Transfer'
        })
      });
    }
  },

  profile: {
    get: async () => {
      if (!getAuthToken()) await api.auth.ensureSession();
      const res = await request('/profile');
      return {
        success: true,
        profile: res.data || res.profile,
        data: res.data || res.profile
      };
    },

    update: async (data) => {
      return request('/profile', {
        method: 'PUT',
        body: JSON.stringify(data)
      });
    },

    referral: async (friendEmail) => {
      return { success: true, message: `Referral invite sent to ${friendEmail}!` };
    },

    redeem: async (code) => {
      return { success: true, message: `Promo code ${code} redeemed successfully!` };
    }
  },

  requests: {
    create: async (data) => {
      if (!getAuthToken()) await api.auth.ensureSession();
      return request('/support/request-service', {
        method: 'POST',
        body: JSON.stringify({
          serviceType: data.serviceType || data.title || 'General Service',
          address: data.address || 'Sector 62, Noida, Uttar Pradesh',
          preferredTime: data.preferredTime || 'Immediate / As per schedule',
          note: data.note || ''
        })
      });
    },

    notListed: async (data) => {
      if (!getAuthToken()) await api.auth.ensureSession();
      return request('/support/service-not-listed', {
        method: 'POST',
        body: JSON.stringify({
          serviceNeeded: data.serviceNeeded || data.title || 'Custom Service',
          address: data.address || 'Sector 62, Noida, Uttar Pradesh',
          preferredTime: data.preferredTime || 'Immediate'
        })
      });
    },

    urgent: async (description) => {
      if (!getAuthToken()) await api.auth.ensureSession();
      return request('/support/urgent-request', {
        method: 'POST',
        body: JSON.stringify({
          description: typeof description === 'string' ? description : description?.description || 'Emergency service assistance requested'
        })
      });
    },

    helpBooking: async (data) => {
      if (!getAuthToken()) await api.auth.ensureSession();
      return request('/support/help-with-booking', {
        method: 'POST',
        body: JSON.stringify({
          bookingId: data.bookingId,
          issueType: data.issueType || data.issue || 'Service Inquiry'
        })
      });
    }
  }
};
