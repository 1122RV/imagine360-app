import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider, useCart } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthModal } from './components/AuthModal';
import { CartDrawer } from './components/CartDrawer';

// Pages
import { Home } from './pages/Home';
import { Services } from './pages/Services';
import { Portfolio } from './pages/Portfolio';
import { ThreeDVisualization } from './pages/ThreeDVisualization';
import { DroneOperations } from './pages/DroneOperations';
import { GstBillingSaas } from './pages/GstBillingSaas';
import { HospitalityCrs } from './pages/HospitalityCrs';
import { BookOnline } from './pages/BookOnline';
import { ClientDashboard } from './pages/ClientDashboard';
import { ContactUs } from './pages/ContactUs';

const ToastContainer: React.FC = () => {
  const { toastMessage } = useCart();
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl bg-surface-container-highest/95 backdrop-blur-xl text-on-surface shadow-2xl border border-primary/40 animate-fade-in font-label-md text-xs">
      <span className="material-symbols-outlined text-primary text-base">info</span>
      <span>{toastMessage}</span>
    </div>
  );
};

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Scroll to top on page switch
  const handlePageChange = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={handlePageChange} />;
      case 'services':
        return <Services setCurrentPage={handlePageChange} />;
      case 'portfolio':
        return <Portfolio setCurrentPage={handlePageChange} />;
      case '3d-visualization':
        return <ThreeDVisualization setCurrentPage={handlePageChange} />;
      case 'drone-operations':
        return <DroneOperations setCurrentPage={handlePageChange} />;
      case 'gst-billing':
        return <GstBillingSaas setCurrentPage={handlePageChange} />;
      case 'hospitality-crs':
        return <HospitalityCrs setCurrentPage={handlePageChange} />;
      case 'book-online':
        return <BookOnline setCurrentPage={handlePageChange} />;
      case 'client-dashboard':
        return <ClientDashboard setCurrentPage={handlePageChange} />;
      case 'contact-us':
        return <ContactUs setCurrentPage={handlePageChange} />;
      default:
        return <Home setCurrentPage={handlePageChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-primary/30 selection:text-primary">
      {/* Global Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer setCurrentPage={handlePageChange} />

      {/* Modals & Drawers */}
      <AuthModal />
      <CartDrawer
        onCheckoutSuccess={() => handlePageChange('client-dashboard')}
      />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainApp />
      </CartProvider>
    </AuthProvider>
  );
}
