import React from 'react';
    import { useNavigate } from 'react-router-dom';
    import { motion } from 'framer-motion';
    import { Button } from '@/components/ui/button';
    import NomaBarIllustration from '@/components/NomaBarIllustration';
    import { Send, ArrowRight } from 'lucide-react';

    const DiagnosticResultsDisplay = ({ recommendedServices, answers }) => {
      const navigate = useNavigate();

      const handleRequestInfo = (serviceTitle) => {
        navigate('/chat', { state: { interestedService: serviceTitle, diagnosticAnswers: answers } });
      };

      if (!recommendedServices || recommendedServices.length === 0) {
        return (
            <div className="text-center p-element-padding">
                <p className="text-lg text-brand-light-text/90">No se pudieron determinar recomendaciones. Por favor, intenta el diagnóstico de nuevo.</p>
                <Button onClick={() => navigate('/test', {replace: true})} className="mt-element-margin-v">
                    Reintentar Diagnóstico
                </Button>
            </div>
        );
      }

      return (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-element-padding bg-brand-deep-indigo/80 rounded-xl shadow-2xl border border-brand-orange-red/30"
        >
          <h1 className="text-3xl font-bold text-brand-vibrant-red mb-element-margin-v text-center">Resultados del Diagnóstico</h1>
          <p className="text-lg text-brand-light-text/90 mb-element-margin-v text-center">
            Basado en tus respuestas, estos son los servicios que podrían ser más beneficiosos para tu organización:
          </p>
          <div className="grid md:grid-cols-2 gap-element-margin-h mb-element-margin-v">
            {recommendedServices.map(service => (
              <motion.div 
                key={service.id}
                className="bg-brand-deep-indigo p-element-padding rounded-lg shadow-lg border border-brand-warm-orange/50 flex flex-col items-center text-center"
                whileHover={{ scale: 1.03, boxShadow: "0px 0px 15px rgba(251, 175, 24, 0.5)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <NomaBarIllustration illustrationType={service.illustrationType} size="medium" className="mb-element-margin-v/2 w-32 h-32" alt={service.title} />
                <h2 className="text-xl font-semibold text-brand-warm-orange mb-element-margin-v/3">{service.title}</h2>
                <p className="text-sm text-brand-light-text/80 mb-element-margin-v/2 flex-grow">{service.description}</p>
                <Button onClick={() => handleRequestInfo(service.title)} className="w-full bg-brand-orange-red hover:bg-brand-vibrant-red group">
                  Solicitar Información <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-element-margin-v">
            <Button onClick={() => navigate('/chat', { state: { diagnosticAnswers: answers } })} size="lg" className="bg-brand-deep-teal hover:bg-brand-vibrant-red">
              Continuar al Chat Inteligente <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </motion.div>
      );
    };

    export default DiagnosticResultsDisplay;