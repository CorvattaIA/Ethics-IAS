import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { motion, AnimatePresence } from 'framer-motion';
    import { Cookie, X } from 'lucide-react';

    const CookieConsentBanner = () => {
      const [isVisible, setIsVisible] = useState(false);

      useEffect(() => {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          setIsVisible(true);
        }
      }, []);

      const handleAccept = () => {
        localStorage.setItem('cookieConsent', 'accepted');
        setIsVisible(false);
      };

      const handleDecline = () => {
        localStorage.setItem('cookieConsent', 'declined');
        setIsVisible(false);
      };

      return (
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: '0%' }}
              exit={{ y: '100%' }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="fixed bottom-0 left-0 right-0 bg-brand-deep-indigo/90 backdrop-blur-md p-element-padding shadow-2xl z-[100] border-t-2 border-brand-vibrant-red"
              role="dialog"
              aria-labelledby="cookie-consent-title"
              aria-describedby="cookie-consent-description"
            >
              <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-element-margin-h">
                <div className="flex items-start">
                  <Cookie className="h-8 w-8 text-brand-warm-orange mr-element-margin-h flex-shrink-0 mt-1" />
                  <div>
                    <h2 id="cookie-consent-title" className="text-lg font-semibold text-brand-light-text">Tu Privacidad es Importante</h2>
                    <p id="cookie-consent-description" className="text-sm text-brand-light-text/80 mt-1">
                      Utilizamos cookies para mejorar tu experiencia en nuestro sitio. Al continuar, aceptas nuestro uso de cookies.
                      Puedes leer más en nuestra <a href="/privacy-policy" className="underline hover:text-brand-warm-orange">Política de Privacidad</a>.
                    </p>
                  </div>
                </div>
                <div className="flex gap-element-margin-h mt-element-margin-v md:mt-0 flex-shrink-0">
                  <Button onClick={handleAccept} variant="secondary" size="sm" className="bg-brand-deep-teal hover:bg-brand-deep-teal/80 text-brand-light-text">
                    Aceptar
                  </Button>
                  <Button onClick={handleDecline} variant="outline" size="sm" className="border-brand-light-text/50 text-brand-light-text/80 hover:bg-brand-light-text/10">
                    Rechazar
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      );
    };

    export default CookieConsentBanner;