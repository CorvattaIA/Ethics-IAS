import React from 'react';
    import { motion } from 'framer-motion';

    export const IllustrationSecureImplementation = ({ className }) => (
      <svg viewBox="0 0 800 800" className={className} aria-labelledby="illustrationSecureTitle" role="img">
        <title id="illustrationSecureTitle">Ilustración de implementación segura</title>
        {/* Fondo */}
        <rect width="800" height="800" fill="#141b2d" />

        {/* Elemento de escudo principal (Semicírculo) - Rojo oscuro */}
        <motion.path 
          d="M200,600 A200,200 0 0 1 600,600 L600,300 L200,300 Z" 
          fill="#c13a3a"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        />

        {/* Elemento de progreso o apertura (Triángulo) - Turquesa verdoso */}
        {/* Este triángulo formará una especie de "puerta" o "camino" en el espacio negativo */}
        <motion.path 
          d="M400,200 L300,450 L500,450 Z" 
          fill="#368f8b"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "circOut" }}
        />
        
        {/* Detalle o núcleo protegido (Círculo pequeño) - Amarillo ocre */}
        <motion.circle 
          cx="400" cy="500" r="50" 
          fill="#dda032"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
        />
      </svg>
    );