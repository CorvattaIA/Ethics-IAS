import React from 'react';
    import { motion } from 'framer-motion';

    export const IllustrationPreciseDiagnosis = ({ className }) => (
      <svg viewBox="0 0 800 800" className={className} aria-labelledby="illustrationDiagnosisTitle" role="img">
        <title id="illustrationDiagnosisTitle">Ilustración de diagnóstico preciso</title>
        {/* Fondo */}
        <rect width="800" height="800" fill="#141b2d" />

        {/* Círculo principal (lupa) - Turquesa */}
        <motion.circle 
          cx="400" cy="350" r="250" 
          fill="#368f8b" 
          stroke="#dda032" 
          strokeWidth="20"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        
        {/* Elemento interno del círculo (espacio negativo para detalle) - Rojo oscuro */}
        <motion.circle 
          cx="400" cy="350" r="150" 
          fill="#c13a3a"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        />

        {/* Mango de la lupa (Triángulo) - Amarillo ocre */}
        <motion.path 
          d="M400,600 L350,750 L450,750 Z" 
          fill="#dda032"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
        />
      </svg>
    );