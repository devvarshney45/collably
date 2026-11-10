import React, { useState, useEffect } from 'react';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import VerificationScreen from './screens/VerificationScreen';
import SelectAddressScreen from './screens/SelectAddressScreen';
import MapScreen from './screens/MapScreen';
import HomeScreen from './screens/HomeScreen';
import BookingsScreen from './screens/BookingsScreen';
import RequestsScreen from './screens/RequestsScreen';
import ProfileScreen from './screens/ProfileScreen';
import QuickBookingScreen from './screens/QuickBookingScreen';
import SearchScreen from './screens/SearchScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import ServiceBookingScreen from './screens/ServiceBookingScreen';
import RequestServiceScreen from './screens/RequestServiceScreen';
import ServiceNotListedScreen from './screens/ServiceNotListedScreen';
import HelpWithBookingScreen from './screens/HelpWithBookingScreen';
import UrgentRequestScreen from './screens/UrgentRequestScreen';
import WalletScreen from './screens/WalletScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import WebNavbar from './components/WebNavbar';
import WebFooter from './components/WebFooter';
import './index.css';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [dashboardTab, setDashboardTab] = useState('home');
  const [history, setHistory] = useState([]);
  const [phoneForOtp, setPhoneForOtp] = useState('12345 67890');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchCategory, setSearchCategory] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [cartCount, setCartCount] = useState(2);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  const navigateTo = (screenName, extra = {}) => {
    if (extra.category) {
      setSearchCategory(extra.category);
    } else if (screenName === 'search' && !extra.category) {
      setSearchCategory('');
    }

    if (screenName.startsWith('dashboard_')) {
      const tab = screenName.replace('dashboard_', '');
      setDashboardTab(tab);
      if (currentScreen !== 'dashboard') {
        setHistory((prev) => [...prev, currentScreen]);
        setCurrentScreen('dashboard');
      }
      return;
    }

    if (screenName === 'dashboard') {
      if (extra.tab) setDashboardTab(extra.tab);
    }

    setHistory((prev) => [...prev, currentScreen]);
    setCurrentScreen(screenName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((h) => h.slice(0, -1));
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('dashboard');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetFlow = () => {
    setHistory([]);
    setCurrentScreen('splash');
    setDashboardTab('home');
    setIsLoggedIn(false);
    showToast('Reset to Splash Screen');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setHistory([]);
    setCurrentScreen('login');
    showToast('Logged out successfully');
  };

  // Screen directory list for the top navbar quick selector
  const screenList = [
    { id: 'dashboard_home', label: '1. Home Dashboard' },
    { id: 'dashboard_bookings', label: '2. My Bookings' },
    { id: 'dashboard_requests', label: '3. Requests Hub' },
    { id: 'shopping', label: '4. Collably Shop' },
    { id: 'wallet', label: '5. Wallet & Points' },
    { id: 'dashboard_profile', label: '6. User Profile' },
    { id: 'serviceDetail', label: '7. Service Detail' },
    { id: 'serviceBooking', label: '8. Service Booking' },
    { id: 'quickBookings', label: '9. Quick Bookings' },
    { id: 'search', label: '10. Search Services' },
    { id: 'requestService', label: '11. Request Service' },
    { id: 'serviceNotListed', label: '12. Service Not Listed' },
    { id: 'helpWithBooking', label: '13. Help with Booking' },
    { id: 'urgentRequest', label: '14. Urgent Request' },
    { id: 'selectAddress', label: '15. Select Address' },
    { id: 'map', label: '16. Map Location' },
    { id: 'login', label: '17. Login / Sign In' },
    { id: 'verification', label: '18. OTP Verification' },
    { id: 'onboarding', label: '19. Onboarding' },
    { id: 'splash', label: '20. Splash Screen' }
  ];

  // Render the active screen content
  const renderScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen onNavigate={navigateTo} isLoggedIn={isLoggedIn} />;

      case 'onboarding':
        return <OnboardingScreen onNavigate={navigateTo} />;

      case 'login':
        return (
          <LoginScreen
            onNavigate={navigateTo}
            setPhoneForOtp={setPhoneForOtp}
            setIsLoggedIn={setIsLoggedIn}
            onBack={handleBack}
          />
        );

      case 'verification':
        return (
          <VerificationScreen
            onNavigate={navigateTo}
            phone={phoneForOtp}
            setIsLoggedIn={setIsLoggedIn}
            onBack={handleBack}
          />
        );

      case 'selectAddress':
        return (
          <SelectAddressScreen
            onNavigate={navigateTo}
            setSelectedAddress={setSelectedAddress}
            onBack={handleBack}
          />
        );

      case 'map':
        return (
          <MapScreen
            onNavigate={navigateTo}
            selectedAddress={selectedAddress}
            setIsLoggedIn={setIsLoggedIn}
            onBack={handleBack}
          />
        );

      case 'dashboard':
        return (
          <div className="web-dashboard-view">
            {dashboardTab === 'home' && (
              <HomeScreen
                onNavigate={navigateTo}
                onSelectService={setSelectedService}
              />
            )}
            {dashboardTab === 'bookings' && (
              <BookingsScreen
                onNavigate={navigateTo}
                onSelectService={setSelectedService}
              />
            )}
            {dashboardTab === 'requests' && (
              <RequestsScreen onNavigate={navigateTo} />
            )}
            {dashboardTab === 'profile' && (
              <ProfileScreen
                onNavigate={navigateTo}
                onLogout={handleLogout}
              />
            )}
            {dashboardTab === 'shopping' && (
              <ShoppingScreen
                onNavigate={navigateTo}
                onBack={() => setDashboardTab('home')}
              />
            )}
          </div>
        );

      case 'quickBookings':
        return (
          <QuickBookingScreen
            onNavigate={navigateTo}
            onSelectService={setSelectedService}
            onBack={handleBack}
          />
        );

      case 'search':
        return (
          <SearchScreen
            onNavigate={navigateTo}
            onSelectService={setSelectedService}
            onBack={handleBack}
            initialCategory={searchCategory}
          />
        );

      case 'serviceDetail':
        return (
          <ServiceDetailScreen
            onNavigate={navigateTo}
            selectedService={selectedService}
            onBack={handleBack}
          />
        );

      case 'serviceBooking':
        return (
          <ServiceBookingScreen
            onNavigate={navigateTo}
            selectedService={selectedService}
            onBack={handleBack}
          />
        );

      case 'requestService':
        return (
          <RequestServiceScreen
            onNavigate={navigateTo}
            onBack={handleBack}
          />
        );

      case 'serviceNotListed':
        return (
          <ServiceNotListedScreen
            onNavigate={navigateTo}
            onBack={handleBack}
          />
        );

      case 'helpWithBooking':
        return (
          <HelpWithBookingScreen
            onNavigate={navigateTo}
            onBack={handleBack}
          />
        );

      case 'urgentRequest':
        return (
          <UrgentRequestScreen
            onNavigate={navigateTo}
            onBack={handleBack}
          />
        );

      case 'wallet':
        return (
          <WalletScreen
            onNavigate={navigateTo}
            onBack={handleBack}
          />
        );

      case 'shopping':
        return (
          <ShoppingScreen
            onNavigate={navigateTo}
            onBack={handleBack}
          />
        );

      default:
        return (
          <HomeScreen
            onNavigate={navigateTo}
            onSelectService={setSelectedService}
          />
        );
    }
  };

  return (
    <div className="app-wrapper">
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

      {/* Sticky Desktop Web Navbar */}
      <WebNavbar
        currentScreen={currentScreen}
        dashboardTab={dashboardTab}
        onNavigate={navigateTo}
        onReset={handleResetFlow}
        screenList={screenList}
        activeAddress={selectedAddress ? (selectedAddress.title ? `${selectedAddress.title} • ${selectedAddress.subtitle || selectedAddress.fullAddress}` : selectedAddress.fullAddress) : 'Home • Ghaziabad, Uttar Pradesh'}
        cartCount={cartCount}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />

      {/* Main Full-Width Responsive Web Viewport */}
      <main className="web-main-container">
        {renderScreen()}
      </main>

      {/* Modern Desktop Web Footer */}
      <WebFooter onNavigate={navigateTo} />
    </div>
  );
}
