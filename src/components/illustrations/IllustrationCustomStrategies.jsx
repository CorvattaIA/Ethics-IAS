import React from 'react';
    import { motion } from 'framer-motion';

    export const IllustrationCustomStrategies = ({ className }) => (
      <svg viewBox="0 0 800 800" className={className} aria-labelledby="illustrationStrategiesTitle" role="img">
        <title id="illustrationStrategiesTitle">Ilustración de estrategias a medida</title>
        {/* Fondo */}
        <rect width="800" height="800" fill="#141b2d" />

        {/* Pieza 1 (Rectángulo grande) - Amarillo ocre */}
        <motion.rect 
          x="150" y="200" width="300" height="200" 
          fill="#dda032" 
          rx="20"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay:0.1 }}
          transform="translate(150 200)" 
        />

        {/* Pieza 2 (Círculo que encaja) - Turquesa verdoso */}
        <motion.circle 
          cx="550" cy="300" r="100" 
          fill="#368f8b"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay:0.2 }}
          transform="translate(0 0)" 
        />
        
        {/* Pieza 3 (Rectángulo pequeño que encaja con el círculo) - Rojo oscuro */}
        <motion.rect 
          x="400" y="450" width="200" height="150" 
          fill="#c13a3a" 
          rx="20"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay:0.3 }}
          transform="translate(0 0)" 
        />

        {/* Espacio negativo sutil (si es necesario, puede ser un corte en una de las piezas) */}
        {/* Por ejemplo, un semicírculo cortado de la pieza 1 */}
        <path d="M300,400 A100,100 0 0 0 300,200" fill="#141b2d" transform="translate(150 200)" />

      </svg>
    );