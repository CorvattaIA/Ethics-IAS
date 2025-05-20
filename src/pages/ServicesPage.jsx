import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';

const ServicesPage = () => {
  const services = [
    {
      title: "Diagnóstico de Riesgos Éticos",
      description: "Realizamos una evaluación exhaustiva de tus sistemas de IA existentes o planificados para identificar posibles riesgos éticos, sesgos algorítmicos, problemas de privacidad y cumplimiento normativo. Entregamos un informe detallado con hallazgos y recomendaciones priorizadas."
    },
    {
      title: "Diseño de Estrategias Éticas Personalizadas",
      description: "Desarrollamos marcos y estrategias éticas a medida, alineados con los valores de tu organización y las particularidades de tu sector. Esto incluye la definición de principios éticos, guías de gobernanza de IA y hojas de ruta para la implementación."
    },
    {
      title: "Análisis Ético Profundo de Sistemas de IA",
      description: "Llevamos a cabo análisis técnicos y contextuales de tus modelos de IA para evaluar su equidad, transparencia, explicabilidad y robustez. Utilizamos herramientas y metodologías avanzadas para detectar y mitigar sesgos no deseados."
    },
    {
      title: "Capacitación y Talleres en Ética para IA",
      description: "Ofrecemos programas de formación y talleres interactivos para tus equipos (técnicos, legales, de negocio) sobre los principios fundamentales de la ética en IA, su aplicación práctica, y las últimas tendencias y regulaciones en el campo."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-deep-indigo via-slate-900 to-brand-deep-indigo text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-brand-vibrant-red mb-4">
            Nuestros Servicios
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto">
            En Horizon Ética, ofrecemos una gama completa de servicios de consultoría en ética de IA.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-brand-deep-indigo/60 p-6 rounded-xl border border-brand-orange-red/40 hover:border-brand-warm-orange/60 transition-all duration-300 hover:shadow-lg hover:shadow-brand-vibrant-red/10"
            >
              <h2 className="text-xl font-semibold text-brand-warm-orange mb-4">
                {service.title}
              </h2>
              <p className="text-gray-300">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <Link 
            to="/chat" 
            className="inline-flex items-center justify-center bg-brand-vibrant-red hover:bg-brand-orange-red text-white px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:shadow-lg hover:shadow-brand-vibrant-red/30"
          >
            <MessageCircle className="mr-2 h-6 w-6" />
            ¿Tienes preguntas? Hablemos
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;