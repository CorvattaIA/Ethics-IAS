import React from 'react';
    import { Button } from '@/components/ui/button';
    import PrivacyPolicyModal from '@/components/PrivacyPolicyModal';

    const DiagnosticConsentPrompt = ({ isPrivacyModalOpen, setIsPrivacyModalOpen, handlePrivacyAccept, locationStateFrom }) => {
      if (isPrivacyModalOpen) {
        return (
          <PrivacyPolicyModal 
            isOpen={isPrivacyModalOpen} 
            setIsOpen={setIsPrivacyModalOpen}
            onAccept={handlePrivacyAccept}
            redirectOnClose={locationStateFrom || '/'}
          />
        );
      }
      
      return (
        <div className="flex flex-col items-center justify-center h-full text-center p-element-padding">
            <h1 className="text-2xl font-semibold text-brand-vibrant-red mb-element-margin-v">Consentimiento Requerido</h1>
            <p className="text-brand-light-text mb-element-margin-v">
                Para realizar el test de diagnóstico, es necesario aceptar nuestra política de privacidad.
            </p>
            <Button onClick={() => setIsPrivacyModalOpen(true)} className="bg-brand-warm-orange hover:bg-brand-orange-red">
                Ver Política de Privacidad
            </Button>
        </div>
      );
    };

    export default DiagnosticConsentPrompt;