import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';
import QuickViewModal from '../components/QuickViewModal';

export const QuickViewContext = React.createContext();

const RootLayout = () => {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const openQuickView = (product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  return (
    <QuickViewContext.Provider value={{ openQuickView, closeQuickView }}>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ScrollToTop />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3500,
            style: {
              background: '#0f172a',
              color: '#ffffff',
              borderRadius: '12px',
              fontSize: '0.9rem',
              fontWeight: 500,
              padding: '12px 18px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#10b981',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ef4444',
                secondary: '#ffffff',
              },
            },
          }}
        />

        <Navbar />

        <main style={{ flex: 1, backgroundColor: 'var(--bg-main)' }}>
          <Outlet />
        </main>

        <Footer />

        <QuickViewModal
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={closeQuickView}
        />
      </div>
    </QuickViewContext.Provider>
  );
};

export default RootLayout;
