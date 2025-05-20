import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import HomePage from '@/pages/HomePage';
import DiagnosticTestPage from '@/pages/DiagnosticTestPage';
import ChatPage from '@/pages/ChatPage';
import ServicesPage from '@/pages/ServicesPage';
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Breadcrumbs from '@/components/layout/Breadcrumbs';
import { Toaster } from '@/components/ui/toaster';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import Seo from '@/components/seo/Seo';

const pageVariants = {
  initial: {
    opacity: 0,
    y: 10,
  },
  in: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.3,
      ease: 'easeInOut',
      when: 'beforeChildren',
      staggerChildren: 0.1
    }
  },
  out: {
    opacity: 0,
    y: -10,
    transition: { 
      duration: 0.2,
      ease: 'easeInOut'
    }
  }
};

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [privacyConsentGiven, setPrivacyConsentGiven] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('privacyConsentForTest');
    if (consent === 'true') {
      setPrivacyConsentGiven(true);
    }
  }, []);

  const handleStartTest = useCallback((e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    navigate('/test', { state: { from: location.pathname } });
  }, [navigate, location.pathname]);

  // Efecto para manejar el cambio de ruta
  useEffect(() => {
    const handleRouteChange = () => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    };

    // Usar un pequeño timeout para asegurar que la animación de salida se complete
    const timer = setTimeout(handleRouteChange, 50);
    return () => clearTimeout(timer);
  }, [location]);
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-brand-deep-indigo via-slate-900 to-brand-deep-indigo text-brand-light-text">
      <Seo />
      <Header onStartTest={handleStartTest} />
      
      <main className="flex-grow">
        <Breadcrumbs />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            className="w-full min-h-[calc(100vh-200px)]"
          >
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-vibrant-red"></div>
              </div>
            ) : (
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                  <HomePage 
                    onStartTest={handleStartTest} 
                    privacyConsentGiven={privacyConsentGiven} 
                  />
                } />
                <Route path="/test" element={<DiagnosticTestPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="*" element={
                  <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-4xl font-bold mb-4">404</h1>
                      <p className="text-xl mb-6">Página no encontrada</p>
                      <a 
                        href="/" 
                        className="px-6 py-3 bg-brand-vibrant-red text-white rounded-md hover:bg-opacity-90 transition-colors inline-block"
                      >
                        Volver al inicio
                      </a>
                    </div>
                  </div>
                } />
              </Routes>
            )}
          </motion.div>
        </AnimatePresence>
      </main>
      
      <Footer />
      <Toaster />
      <CookieConsentBanner />
    </div>
  );
}

export default function App() {
  return <AppContent />;
}