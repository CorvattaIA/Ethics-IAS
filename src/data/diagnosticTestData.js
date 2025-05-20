import React from 'react';
    export const economicSectors = [
      { value: 'salud', label: 'Salud' }, { value: 'finanzas', label: 'Finanzas' }, 
      { value: 'educacion', label: 'Educación' }, { value: 'retail', label: 'Retail' },
      { value: 'tecnologia', label: 'Tecnología' }, { value: 'sector_publico', label: 'Sector Público' },
      { value: 'otro', label: 'Otro' },
    ];

    export const questions = [
      { id: 'sector', text: '¿En qué sector económico opera tu organización?', type: 'select', options: economicSectors, category: "Contexto Organizacional" },
      { id: 'iaUsage', text: '¿Tu empresa ya utiliza sistemas de IA en producción?', type: 'radio', options: [{value: 'si', label: 'Sí'}, {value: 'no', label: 'No'}, {value: 'planeando', label: 'Estamos planeando'}], category: "Uso de IA" },
      { id: 'concerns', text: '¿Te preocupa el impacto social o legal de tus sistemas de IA?', type: 'radio', options: [{value: 'mucho', label: 'Mucho'}, {value: 'algo', label: 'Algo'}, {value: 'poco', label: 'Poco/Nada'}], category: "Preocupaciones Éticas" },
      { id: 'training', text: '¿Tu equipo ha recibido formación en ética de IA?', type: 'radio', options: [{value: 'si', label: 'Sí, extensiva'}, {value: 'parcial', label: 'Sí, parcial'}, {value: 'no', label: 'No'}], category: "Capacitación" },
      { id: 'maturity', text: '¿Qué nivel de madurez tiene tu estrategia de IA?', type: 'radio', options: [{value: 'alta', label: 'Alta (definida e implementada)'}, {value: 'media', label: 'Media (en desarrollo)'}, {value: 'baja', label: 'Baja (exploratoria)'}], category: "Madurez Estratégica" },
    ];

    export const services = [
      { id: 'riesgos', title: 'Diagnóstico de Riesgos Éticos', description: 'Evaluación de riesgos éticos en IA con recomendaciones específicas.', illustrationType: 'precise-diagnosis' },
      { id: 'estrategias', title: 'Diseño de Estrategias Éticas', description: 'Desarrollo de estrategias personalizadas para integrar principios éticos en el ciclo de vida de la IA.', illustrationType: 'custom-strategies' },
      { id: 'analisis', title: 'Análisis Ético de la IA', description: 'Evaluación integral de sistemas de IA para identificar y abordar problemas éticos.', illustrationType: 'secure-implementation' },
      { id: 'capacitacion', title: 'Capacitación en Ética para IA', description: 'Programas de formación sobre principios éticos y su aplicación práctica.', illustrationType: 'header' },
    ];