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
    { id: "cat_studio", title: "Studio", icon: "/assets/icons/studio.png", color: "#FFFFEEE8" },
    { id: "cat_cooking", title: "Cooking", icon: "/assets/images/cooking.png", color: "#FFFFF6E1" },
    { id: "cat_video", title: "Video Editing", icon: "/assets/images/video_editing.png", color: "#FFFEE8E8" },
    { id: "cat_daycare", title: "Day Care", icon: "/assets/icons/day_care.png", color: "#FFE8F4FF" },
    { id: "cat_carwash", title: "Car Wash", icon: "/assets/icons/car_wash.png", color: "#FFF1E8FF" },
    { id: "cat_cleaning", title: "House cleaning", icon: "/assets/icons/house_cleaning.png", color: "#E8F8EF" }
  ],
  services: [
    {
      id: "srv_photo",
      title: "Elite Photography Studio",
      category: "Studio",
      price: "₹2,500/hr",
      numericPrice: 2500,
      rating: "4.8",
      reviewsCount: "124",
      distance: "2.3 km away",
      location: "Koramangala, Bangalore",
      experience: "5+ Years Of Experience",
      image: "/assets/images/elite_photography.png",
      description: "Professional photography studio with state-of-the-art equipment and experienced team. Specializing in portraits, weddings, and commercial photography.",
      servicesOffered: ["Portrait Photography", "Wedding Photography", "Commercial Shoots", "Product Photography"],
      gallery: [
        "/assets/images/Rectangle 4249.png",
        "/assets/images/Rectangle 4250.png",
        "/assets/images/Rectangle 4251.png"
      ],
      reviews: [
        { id: "rev_1", name: "Priya Sharma", date: "2 days ago", rating: 5, comment: "Amazing service! The team was professional and the photos turned out perfect." },
        { id: "rev_2", name: "Rajesh Kumar", date: "1 week ago", rating: 4, comment: "Excellent studio with great equipment. Highly recommend for professional shoots." }
      ]
    },
    {
      id: "srv_clean",
      title: "Premium House Cleaning",
      category: "House cleaning",
      price: "₹1,500/hr",
      numericPrice: 1500,
      rating: "4.9",
      reviewsCount: "98",
      distance: "3.1 km away",
      location: "Indiranagar, Bangalore",
      experience: "4+ Years Of Experience",
      image: "/assets/images/house_cleaning.png",
      description: "Comprehensive deep cleaning services for apartments, villas, and workspaces using eco-friendly solutions.",
      servicesOffered: ["Deep Cleaning", "Kitchen Sanitization", "Bathroom Disinfection", "Sofa Shampooing"],
      gallery: [
        "/assets/images/Rectangle 4249.png",
        "/assets/images/Rectangle 4250.png"
      ],
      reviews: [
        { id: "rev_3", name: "Ananya Roy", date: "3 days ago", rating: 5, comment: "Spotless cleaning! On time and very polite crew." }
      ]
    },
    {
      id: "srv_cook",
      title: "Gourmet Home Chef",
      category: "Cooking",
      price: "₹1,800/meal",
      numericPrice: 1800,
      rating: "4.7",
      reviewsCount: "64",
      distance: "1.5 km away",
      location: "HSR Layout, Bangalore",
      experience: "7+ Years Of Experience",
      image: "/assets/images/cooking.png",
      description: "Trained chef offering tailored multi-course meals at your home. North Indian, South Indian, Italian and Asian cuisines.",
      servicesOffered: ["Dinner Parties", "Weekly Meal Prep", "Custom Diet Plans", "Special Occasions"],
      gallery: [
        "/assets/images/Rectangle 4250.png",
        "/assets/images/Rectangle 4251.png"
      ],
      reviews: [
        { id: "rev_4", name: "Vikram Malhotra", date: "5 days ago", rating: 5, comment: "Delicious food, left kitchen spotless!" }
      ]
    },
    {
      id: "srv_car",
      title: "Eco Steam Car Wash",
      category: "Car Wash",
      price: "₹899",
      numericPrice: 899,
      rating: "4.8",
      reviewsCount: "210",
      distance: "0.8 km away",
      location: "Whitefield, Bangalore",
      experience: "3+ Years Of Experience",
      image: "/assets/images/car_wash.png",
      description: "Doorstep high-pressure steam wash, interior vacuuming and polymer dashboard polish.",
      servicesOffered: ["Exterior Foam Wash", "Interior Detailing", "Engine Bay Steam Clean", "Ceramic Wax"],
      gallery: [
        "/assets/images/Rectangle 4249.png",
        "/assets/images/Rectangle 4251.png"
      ],
      reviews: [
        { id: "rev_5", name: "Kunal Shah", date: "Yesterday", rating: 5, comment: "Looks brand new straight out of the showroom." }
      ]
    }
  ],
  activeBookings: [
    {
      id: "COL95751",
      serviceId: "srv_photo",
      title: "Elite Photography Studio",
      price: "₹2,500/hr",
      location: "Koramangala, Bangalore",
      date: "Today, December 16",
      time: "2:00 PM - 4:00 PM",
      status: "Confirmed",
      imageUrl: "/assets/images/elite_photography.png"
    },
    {
      id: "COL95752",
      serviceId: "srv_clean",
      title: "Premium House Cleaning",
      price: "₹1,500/hr",
      location: "Koramangala, Bangalore",
      date: "Tomorrow, December 17",
      time: "10:00 AM - 1:00 PM",
      status: "Confirmed",
      imageUrl: "/assets/images/house_cleaning.png"
    }
  ],
  pastBookings: [
    {
      id: "COL95750",
      serviceId: "srv_photo",
      title: "Elite Photography Studio",
      price: "₹2,500/hr",
      location: "Koramangala, Bangalore",
      date: "Dec 14, 2024",
      time: "11:00 AM",
      status: "Completed",
      rating: 5.0,
      imageUrl: "/assets/images/elite_photography.png"
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
      title: 'Wallet Top-up',
      type: 'credit',
      amount: `+₹${body.amount}`,
      date: 'Just now',
      status: 'Success'
    };
    fallbackStore.wallet.transactions.unshift(newTx);
    return { success: true, balance: fallbackStore.wallet.balance, transaction: newTx };
  }
  if (endpoint.startsWith('/wallet/send-money') && method === 'POST') {
    fallbackStore.wallet.numericBalance = Math.max(0, fallbackStore.wallet.numericBalance - Number(body.amount || 0));
    fallbackStore.wallet.balance = `₹${fallbackStore.wallet.numericBalance.toLocaleString('en-IN')}`;
    const newTx = {
      id: `tx_${Date.now()}`,
      title: `Transfer to ${body.recipient || 'friend'}`,
      type: 'debit',
      amount: `-₹${body.amount}`,
      date: 'Just now',
      status: 'Success'
    };
    fallbackStore.wallet.transactions.unshift(newTx);
    return { success: true, balance: fallbackStore.wallet.balance, transaction: newTx };
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
