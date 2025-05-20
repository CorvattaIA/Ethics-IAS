import React from 'react';
    import { Loader2 } from 'lucide-react';

    const DiagnosticProcessingScreen = ({ answersCount }) => {
      return (
        <div className="flex flex-col items-center justify-center h-[400px] text-center">
          <Loader2 className="h-16 w-16 text-brand-vibrant-red animate-spin mb-element-margin-v" />
          <p className="text-xl text-brand-light-text/90">Finalizando análisis de {answersCount} respuestas...</p>
          <p className="text-sm text-brand-light-text/70">Esto tomará solo un momento.</p>
        </div>
      );
    };
    export default DiagnosticProcessingScreen;