const API_BASE = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_BASE) || 'http://localhost:5020/api';

// Fallback in-memory store for seamless offline/standalone support
const fallbackStore = {
  user: {
    id: "usr_101",
    name: "Priya Sharma",
    email: "priya.sharma@email.com",
    phone: "+91 98765 43210",
    avatar: "/assets/images/app_icon.png",
    rating: 4.8,
    bookingsCount: 27,
    memberSince: "March 2024",
    kycVerified: true,
    isLoggedIn: false
  },
  activeAddress: {
    id: "addr_1",
    title: "My House",
    fullAddress: "1685 Lake Forest, New York, United States"
  },
  addresses: [
    { id: "addr_1", title: "Royal Ln. Mesa", subtitle: "2464 Royal Ln. Mesa, New Jersey 45463", isDefault: true },
    { id: "addr_2", title: "Ranchview Park", subtitle: "4517 Washington Ave. Manchester, Kentucky 39495", isDefault: false },
    { id: "addr_3", title: "Ash Dr. San", subtitle: "2715 Ash Dr. San Jose, South Dakota 83475", isDefault: false },
    { id: "addr_4", title: "Eligin St.", subtitle: "6391 Elgin St. Celina, Delaware 10299", isDefault: false },
    { id: "addr_5", title: "Thornridge Cir.", subtitle: "1901 Thornridge Cir. Shiloh, Hawaii 81063", isDefault: false }
  ],
  categories: [
    { id: "cat_meals", title: "Daily Meals", icon: "/assets/images/daily_meals_hr.jpg", color: "#FFFBEB" },
    { id: "cat_appliance", title: "Appliance Repair", icon: "/assets/images/appliance_repair_hr.jpg", color: "#FFF7ED" },
    { id: "cat_office", title: "Office Support", icon: "/assets/images/office_support_hr.jpg", color: "#EFF6FF" },
    { id: "cat_babysitting", title: "Babysitting", icon: "/assets/images/babysitting_hr.jpg", color: "#FEF2F2" }
  ],
  services: [
    {
      id: "srv_corp_lunch",
      serviceId: "srv_corp_lunch",
      title: "Corporate Lunch",
      category: "Daily Meals",
      price: "₹200",
      numericPrice: 200,
      rating: "4.9",
      reviewsCount: "340",
      distance: "1.2 km away",
      location: "Gurugram, Cyber City",
      experience: "8 yrs experience",
      image: "/assets/images/daily_meals_hr.jpg",
      description: "Wholesome corporate lunch catering prepared fresh daily. Healthy multi-cuisine meal trays with prompt delivery to your office.",
      servicesOffered: ["Executive Thali", "Diet Meal Trays", "Fresh Fruit Bowl", "Dessert & Beverages"],
      gallery: ["/assets/images/daily_meals_hr.jpg", "/assets/images/cooking.png"],
      reviews: [{ id: "rev_1", name: "Vikas Aggarwal", date: "Yesterday", rating: 5, comment: "Always on time and meals are hot, low on oil, and super tasty." }]
    },
    {
      id: "srv_ac_service",
      serviceId: "srv_ac_service",
      title: "AC Service",
      category: "Appliance Repair",
      price: "₹800",
      numericPrice: 800,
      rating: "4.8",
      reviewsCount: "520",
      distance: "1.8 km away",
      location: "Sector 62, Noida",
      experience: "3 yrs experience",
      image: "/assets/images/ac_service_hr.jpg",
      description: "Comprehensive split & window AC deep jet cleaning, gas level inspection, filter sanitization, and cooling check.",
      servicesOffered: ["High Pressure Jet Foam Wash", "Refrigerant Gas Check", "Indoor Cooling Coil Descaling"],
      gallery: ["/assets/images/ac_service_hr.jpg"],
      reviews: [{ id: "rev_2", name: "Sanjay Verma", date: "3 days ago", rating: 5, comment: "Super cooling now! The technician was very polite and skilled." }]
    },
    {
      id: "srv_office_boy",
      serviceId: "srv_office_boy",
      title: "Office Boy Services",
      category: "Office Support",
      price: "₹8,000",
      numericPrice: 8000,
      rating: "4.8",
      reviewsCount: "115",
      distance: "3.0 km away",
      location: "Delhi NCR",
      experience: "3 yrs experience",
      image: "/assets/images/office_support_hr.jpg",
      description: "Trained and verified office attendant for pantry management, filing, document dispatch, and meeting setups.",
      servicesOffered: ["Pantry Beverage Setup", "Filing & Document Dispatch", "Conference Room Turnaround"],
      gallery: ["/assets/images/office_support_hr.jpg"],
      reviews: []
    },
    {
      id: "srv_night_care",
      serviceId: "srv_night_care",
      title: "Night Care",
      category: "Babysitting",
      price: "₹1,350",
      numericPrice: 1350,
      rating: "5.0",
      reviewsCount: "160",
      distance: "1.1 km away",
      location: "Delhi",
      experience: "8 yrs experience",
      image: "/assets/images/night_care_hr.jpg",
      description: "Gentle, overnight newborn and infant care by background-verified nannies with infant CPR training.",
      servicesOffered: ["Overnight Bottle Feeding", "Diaper Routine & Hygiene", "Sleep Routine Soothing"],
      gallery: ["/assets/images/night_care_hr.jpg"],
      reviews: []
    }
  ],
  activeBookings: [
    {
      id: "COL12345",
      serviceId: "srv_corp_lunch",
      title: "Corporate Lunch",
      price: "₹200",
      totalAmount: "₹400",
      location: "Gurugram, Cyber City",
      date: "Today, 1:00 PM",
      time: "1:00 PM - 2:00 PM",
      status: "Confirmed",
      imageUrl: "/assets/images/daily_meals_hr.jpg"
    }
  ],
  pastBookings: [
    {
      id: "COL11223",
      serviceId: "srv_night_care",
      title: "Night Care",
      price: "₹1,350",
      totalAmount: "₹1,350",
      location: "Delhi NCR",
      date: "Dec 14, 2024",
      time: "8:00 PM - 6:00 AM",
      status: "Completed",
      imageUrl: "/assets/images/night_care_hr.jpg"
    }
  ],
  wallet: {
    balance: "₹1,250",
    numericBalance: 1250,
    currency: "INR",
    transactions: [
      { id: "tx_1", title: "Cashback Added", type: "credit", amount: "+₹250", date: "Today, 2:30 PM", status: "Success" },
      { id: "tx_2", title: "Elite Photography Studio", type: "debit", amount: "-₹2,500", date: "Yesterday", status: "Success" },
      { id: "tx_3", title: "Referral Bonus", type: "credit", amount: "+₹500", date: "12 Dec 2024", status: "Success" },
      { id: "tx_4", title: "Wallet Top-up", type: "credit", amount: "+₹2,000", date: "10 Dec 2024", status: "Success" }
    ]
  }
};

async function request(endpoint, options = {}) {
  const url = `${API_BASE}${endpoint}`;
  const defaultHeaders = {
    'Content-Type': 'application/json',
  };

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || 'API request failed');
    }
    return data;
  } catch (err) {
    // Graceful offline fallback
    console.warn(`[Collably API] Network call to ${endpoint} failed, utilizing live memory state:`, err.message);
    return getOfflineFallback(endpoint, options);
  }
}

function getOfflineFallback(endpoint, options) {
  const method = (options.method || 'GET').toUpperCase();
  const body = options.body ? JSON.parse(options.body) : {};

  if (endpoint.startsWith('/auth/send-otp')) {
    return { success: true, message: 'OTP sent successfully', otp: '1234' };
  }
  if (endpoint.startsWith('/auth/verify-otp') || endpoint.startsWith('/auth/google')) {
    fallbackStore.user.isLoggedIn = true;
    return { success: true, user: fallbackStore.user, token: 'mock_jwt_token' };
  }
  if (endpoint.startsWith('/auth/me')) {
    return { success: true, user: fallbackStore.user };
  }
  if (endpoint.startsWith('/auth/logout')) {
    fallbackStore.user.isLoggedIn = false;
    return { success: true, message: 'Logged out successfully' };
  }
  if (endpoint.startsWith('/addresses/confirm')) {
    fallbackStore.activeAddress.title = body.title || fallbackStore.activeAddress.title;
    fallbackStore.activeAddress.fullAddress = body.subtitle || fallbackStore.activeAddress.fullAddress;
    return { success: true, activeAddress: fallbackStore.activeAddress };
  }
  if (endpoint.startsWith('/addresses')) {
    return { success: true, addresses: fallbackStore.addresses, activeAddress: fallbackStore.activeAddress };
  }
  if (endpoint.startsWith('/categories')) {
    return { success: true, categories: fallbackStore.categories };
  }
  if (endpoint.startsWith('/services/')) {
    const srvId = endpoint.split('/services/')[1].split('?')[0];
    const srv = fallbackStore.services.find(s => s.id === srvId) || fallbackStore.services[0];
    return { success: true, service: srv };
  }
  if (endpoint.startsWith('/services')) {
    return { success: true, services: fallbackStore.services };
  }
  if (endpoint.startsWith('/bookings') && method === 'POST') {
    const newBooking = {
      id: `COL${Math.floor(10000 + Math.random() * 90000)}`,
      serviceId: body.serviceId || 'srv_photo',
      title: body.title || 'Elite Photography Studio',
      price: '₹2,500/hr',
      location: 'Koramangala, Bangalore',
      date: body.date || 'Today',
      time: body.time || '11:00 AM',
      duration: body.duration || '2 Hour Session',
      status: 'Confirmed',
      totalAmount: '₹4,550',
      imageUrl: '/assets/images/elite_photography.png'
    };
    fallbackStore.activeBookings.unshift(newBooking);
    return { success: true, booking: newBooking };
  }
  if (endpoint.startsWith('/bookings')) {
    return { success: true, activeBookings: fallbackStore.activeBookings, pastBookings: fallbackStore.pastBookings };
  }
  if (endpoint.startsWith('/wallet/add-money') && method === 'POST') {
    fallbackStore.wallet.numericBalance += Number(body.amount || 0);
    fallbackStore.wallet.balance = `₹${fallbackStore.wallet.numericBalance.toLocaleString('en-IN')}`;
    const newTx = {
      id: `tx_${Date.now()}`,
      title: 'Money added via UPI',
      type: 'credit',
      amount: `+₹${body.amount}`,
      numericAmount: Number(body.amount || 0),
      positive: true,
      date: 'Just now',
      status: 'Success'
    };
    fallbackStore.wallet.transactions.unshift(newTx);
    return { success: true, balance: fallbackStore.wallet.balance, transaction: newTx, wallet: fallbackStore.wallet };
  }
  if (endpoint.startsWith('/wallet/send-money') && method === 'POST') {
    fallbackStore.wallet.numericBalance = Math.max(0, fallbackStore.wallet.numericBalance - Number(body.amount || 0));
    fallbackStore.wallet.balance = `₹${fallbackStore.wallet.numericBalance.toLocaleString('en-IN')}`;
    const newTx = {
      id: `tx_${Date.now()}`,
      title: `Transfer to ${body.recipient || 'friend'}`,
      type: 'debit',
      amount: `-₹${body.amount}`,
      numericAmount: -Number(body.amount || 0),
      positive: false,
      date: 'Just now',
      status: 'Success'
    };
    fallbackStore.wallet.transactions.unshift(newTx);
    return { success: true, balance: fallbackStore.wallet.balance, transaction: newTx, wallet: fallbackStore.wallet };
  }
  if (endpoint.startsWith('/wallet')) {
    return { success: true, wallet: fallbackStore.wallet };
  }
  if (endpoint.startsWith('/profile/redeem') && method === 'POST') {
    return { success: true, message: `Promo code ${body.code} redeemed! ₹200 added to wallet.` };
  }
  if (endpoint.startsWith('/profile/referral') && method === 'POST') {
    return { success: true, message: `Referral invite sent to ${body.friendEmail}!` };
  }
  if (endpoint.startsWith('/profile')) {
    return { success: true, profile: fallbackStore.user };
  }
  if (endpoint.startsWith('/requests')) {
    return { success: true, message: 'Request created successfully', id: `req_${Date.now()}` };
  }

  return { success: true };
}

export const api = {
  auth: {
    sendOtp: (phone) => request('/auth/send-otp', { method: 'POST', body: JSON.stringify({ phone }) }),
    verifyOtp: (phone, otp) => request('/auth/verify-otp', { method: 'POST', body: JSON.stringify({ phone, otp }) }),
    google: (payload = {}) => request('/auth/google', { method: 'POST', body: JSON.stringify(payload) }),
    me: () => request('/auth/me'),
    logout: () => request('/auth/logout', { method: 'POST' }),
  },
  addresses: {
    list: (search = '') => request(`/addresses${search ? `?search=${encodeURIComponent(search)}` : ''}`),
    confirm: (title, subtitle) => request('/addresses/confirm', { method: 'POST', body: JSON.stringify({ title, subtitle }) }),
    create: (data) => request('/addresses', { method: 'POST', body: JSON.stringify(data) }),
  },
  categories: {
    list: () => request('/categories'),
  },
  services: {
    list: (params = {}) => {
      const q = new URLSearchParams();
      if (params.q) q.append('q', params.q);
      if (params.category) q.append('category', params.category);
      const queryStr = q.toString() ? `?${q.toString()}` : '';
      return request(`/services${queryStr}`);
    },
    recentlyBooked: () => request('/services/recently-booked'),
    popular: () => request('/services/popular'),
    get: (id) => request(`/services/${id}`),
  },
  bookings: {
    list: () => request('/bookings'),
    get: (id) => request(`/bookings/${id}`),
    create: (data) => request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
    reschedule: (id, data) => request(`/bookings/${id}/reschedule`, { method: 'PUT', body: JSON.stringify(data) }),
    review: (id, data) => request(`/bookings/${id}/review`, { method: 'POST', body: JSON.stringify(data) }),
  },
  requests: {
    list: () => request('/requests'),
    create: (data) => request('/requests', { method: 'POST', body: JSON.stringify(data) }),
    urgent: (description) => request('/requests/urgent', { method: 'POST', body: JSON.stringify({ description }) }),
    helpBooking: (data) => request('/requests/help-booking', { method: 'POST', body: JSON.stringify(data) }),
    notListed: (data) => request('/requests/not-listed', { method: 'POST', body: JSON.stringify(data) }),
  },
  wallet: {
    get: () => request('/wallet'),
    transactions: () => request('/wallet/transactions'),
    addMoney: (amount) => request('/wallet/add-money', { method: 'POST', body: JSON.stringify({ amount }) }),
    sendMoney: (recipient, amount) => request('/wallet/send-money', { method: 'POST', body: JSON.stringify({ recipient, amount }) }),
  },
  profile: {
    get: () => request('/profile'),
    update: (data) => request('/profile', { method: 'PUT', body: JSON.stringify(data) }),
    referral: (friendEmail) => request('/profile/referral', { method: 'POST', body: JSON.stringify({ friendEmail }) }),
    redeem: (code) => request('/profile/redeem', { method: 'POST', body: JSON.stringify({ code }) }),
  },
  shopping: {
    categories: () => request('/shopping/categories'),
    products: (params = {}) => {
      const q = new URLSearchParams();
      if (params.search) q.append('search', params.search);
      if (params.category) q.append('category', params.category);
      const queryStr = q.toString() ? `?${q.toString()}` : '';
      return request(`/shopping/products${queryStr}`);
    },
    get: (id) => request(`/shopping/products/${id}`),
    cart: () => request('/shopping/cart'),
    addToCart: (productId, quantity = 1) => request('/shopping/cart', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),
    checkout: (paymentMethod = 'UPI') => request('/shopping/checkout', { method: 'POST', body: JSON.stringify({ paymentMethod }) }),
  },
};
