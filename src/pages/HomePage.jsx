import React, { useState } from 'react';
    import { Link, useNavigate } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { motion } from 'framer-motion';
    import NomaBarIllustration from '@/components/NomaBarIllustration';
    import PrivacyPolicyModal from '@/components/PrivacyPolicyModal';
    import { ArrowRightCircle, CheckCircle, ShieldCheck, HelpCircle, Briefcase } from 'lucide-react';

    const HomePage = ({ onStartTest, privacyConsentGiven }) => {
      const [showConfirmation, setShowConfirmation] = useState(false);
      const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
      const navigate = useNavigate();

      const handleDiagnosticButtonClick = (e) => {
        e.preventDefault(); 
        setShowConfirmation(true);
        setTimeout(() => setShowConfirmation(false), 1200); 

        if (!privacyConsentGiven) {
          setIsPrivacyModalOpen(true);
        } else {
          navigate('/test'); 
        }
      };

      const handlePrivacyAccept = () => {
        localStorage.setItem('privacyConsentForTest', 'true'); 
        setIsPrivacyModalOpen(false);
        navigate('/test'); 
      };


      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center text-center py-element-margin-v"
        >
          <NomaBarIllustration 
            alt="Simbiosis entre humanidad y tecnología." 
            className="mb-element-margin-v"
            illustrationType="header"
            size="large"
          />
          
          <div className="relative mb-10 md:mb-14">
            <div className="absolute inset-x-0 -top-3 -bottom-3 md:-top-5 md:-bottom-5 bg-brand-deep-indigo/70 backdrop-blur-sm rounded-lg transform skew-y-[-0.5deg] z-0 shadow-xl"></div>
            <motion.h1 
              className="relative z-10 text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-brand-vibrant-red via-brand-orange-red to-brand-warm-orange py-3 px-6"
              style={{ 
                textShadow: '2px 2px 8px rgba(0,0,0,0.6), 0 0 15px rgba(255,255,255,0.2)',
                WebkitTextStroke: '1px rgba(255,255,255,0.1)'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
            >
              Consultoría en ética para inteligencia artificial
            </motion.h1>
          </div>
          
          <motion.p 
            className="text-lg md:text-xl lg:text-2xl text-brand-light-text/90 max-w-3xl mx-auto mb-element-margin-v leading-relaxed md:leading-loose"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Ofrecemos soluciones integrales para la implementación ética de la IA, adaptadas a las necesidades de cada sector. Descubre cómo podemos ayudarte a garantizar el uso responsable y seguro de la inteligencia artificial en tu organización.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 150 }}
            className="relative flex flex-col sm:flex-row items-center gap-element-margin-h"
          >
            <Button 
              onClick={handleDiagnosticButtonClick}
              size="lg" 
              className="bg-brand-vibrant-red hover:bg-brand-orange-red text-brand-light-text text-lg px-8 py-4 rounded-lg shadow-xl hover:shadow-brand-vibrant-red/50 transition-all duration-300 transform hover:scale-105 group min-h-button-mobile md:min-h-button-desktop"
              aria-label="Realiza tu diagnóstico de ética en IA"
            >
                Realiza tu diagnóstico
                {showConfirmation ? <CheckCircle className="ml-2 h-5 w-5 animate-pulse" /> : <ArrowRightCircle className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
            <Button 
              asChild
              variant="outline"
              size="lg" 
              className="border-brand-warm-orange text-brand-warm-orange hover:bg-brand-warm-orange hover:text-brand-deep-indigo text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-brand-warm-orange/40 transition-all duration-300 transform hover:scale-105 group min-h-button-mobile md:min-h-button-desktop"
              aria-label="Ver nuestros servicios de consultoría"
            >
              <Link to="/services">
                Ver Servicios
                <Briefcase className="ml-2 h-5 w-5 group-hover:rotate-[5deg] transition-transform" />
              </Link>
            </Button>
          </motion.div>
          <div className="flex items-center justify-center mt-element-margin-v/2 text-xs text-brand-light-text/70">
              <ShieldCheck className="h-4 w-4 mr-1.5 text-brand-deep-teal" />
              <span>Tus datos están protegidos. Consulta nuestra <Link to="/privacy-policy" className="underline hover:text-brand-warm-orange">Política de Privacidad</Link>.</span>
          </div>


          <div className="mt-16 w-full max-w-5xl mx-auto space-y-element-margin-v md:space-y-0 md:grid md:grid-cols-3 md:gap-element-margin-h">
            {[
              { title: "Diagnóstico Preciso", description: "Identifica tus necesidades éticas con nuestro test especializado.", altText:"Símbolo de medición o análisis.", illustrationType: "precise-diagnosis", size: "medium"},
              { title: "Estrategias a Medida", description: "Desarrollamos planes éticos adaptados a tu sector y tecnología.", altText:"Formas que encajan perfectamente, sugiriendo adaptabilidad.", illustrationType: "custom-strategies", size: "medium"},
              { title: "Implementación Segura", description: "Te guiamos para integrar la ética en todo el ciclo de vida de la IA.", altText:"Símbolo de protección y progreso.", illustrationType: "secure-implementation", size: "medium"}
            ].map((item, index) => (
              <motion.div 
                key={item.title}
                className="p-element-padding bg-brand-deep-indigo/50 rounded-xl border border-brand-orange-red/30 shadow-lg hover:shadow-brand-orange-red/40 transition-shadow duration-300 flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.15 }}
              >
                <NomaBarIllustration alt={item.altText} illustrationType={item.illustrationType} size={item.size} className="aspect-square"/>
                <h2 className="text-xl font-semibold text-brand-warm-orange mt-element-margin-v/2 mb-element-margin-v/3" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>{item.title}</h2>
                <p className="text-sm text-brand-light-text/80 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
          <motion.div 
            className="mt-16 w-full max-w-2xl p-element-padding bg-brand-deep-teal/20 rounded-xl border border-brand-deep-teal/50 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            <h2 className="text-2xl font-semibold text-brand-warm-orange mb-element-margin-v/2" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.4)' }}>¿Cómo podemos ayudarte?</h2>
            <p className="text-brand-light-text/90 mb-element-margin-v leading-relaxed">
              Nuestro equipo de expertos está listo para asesorarte en la creación e implementación de soluciones de IA éticas y responsables. Contáctanos para una consulta gratuita y descubre cómo la ética puede ser un motor de innovación y confianza para tu organización.
            </p>
            <Button asChild size="lg" className="bg-brand-orange-red hover:bg-brand-vibrant-red text-brand-light-text group">
              <Link to="/chat">
                Hablemos de tu Proyecto
                <HelpCircle className="ml-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              </Link>
            </Button>
          </motion.div>

          <PrivacyPolicyModal 
            isOpen={isPrivacyModalOpen} 
            setIsOpen={setIsPrivacyModalOpen}
            onAccept={handlePrivacyAccept}
          />
        </motion.div>
      );
    };

    export default HomePage;