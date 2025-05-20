import React from 'react';
    import { services } from '@/data/diagnosticTestData';

    export const getRecommendedServices = (answers) => {
      const recommendations = new Set();
      if (!answers || Object.keys(answers).length === 0) {
        // Default if no answers
        recommendations.add(services.find(s => s.id === 'riesgos'));
        recommendations.add(services.find(s => s.id === 'capacitacion'));
        return Array.from(recommendations);
      }

      if (answers.iaUsage === 'si' || answers.iaUsage === 'planeando') {
        recommendations.add(services.find(s => s.id === 'riesgos'));
      }
      if (answers.concerns === 'mucho' || answers.concerns === 'algo') {
        recommendations.add(services.find(s => s.id === 'analisis'));
      }
      if (answers.training !== 'si') {
        recommendations.add(services.find(s => s.id === 'capacitacion'));
      }
      if (answers.maturity !== 'alta') {
        recommendations.add(services.find(s => s.id === 'estrategias'));
      }
      if (recommendations.size === 0) { 
        recommendations.add(services.find(s => s.id === 'riesgos'));
        recommendations.add(services.find(s => s.id === 'capacitacion'));
      }
      return Array.from(recommendations);
    };