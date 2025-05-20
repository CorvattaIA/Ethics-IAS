import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const IllustrationHeader = ({ className }) => {
  const [isHovered, setIsHovered] = useState(false);
  const controls = useAnimation();

  const handleHoverStart = () => {
    setIsHovered(true);
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 1.5, repeat: Infinity, repeatType: 'reverse' }
    });
  };

  const handleHoverEnd = () => {
    setIsHovered(false);
    controls.stop();
  };

  return (
    <motion.div 
      className="relative w-full h-full"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      animate={controls}
    >
      <svg 
        viewBox="0 0 800 400" 
        className={className} 
        aria-labelledby="illustrationHeaderTitle" 
        role="img"
      >
        <title id="illustrationHeaderTitle">Ilustración de simbiosis entre humanidad y tecnología</title>
        <defs>
          <clipPath id="humanProfileClip">
            <path d="M200,300 A100,100 0 0 1 200,100 L300,100 L300,150 A50,50 0 0 0 250,200 L300,200 L300,300 Z" />
          </clipPath>
          <linearGradient id="techGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#368f8b" />
            <stop offset="100%" stopColor="#4abab5" />
          </linearGradient>
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        
        {/* Fondo azul oscuro con efecto de profundidad */}
        <rect width="800" height="400" fill="#141b2d" />

        {/* Elemento tecnológico (circulo turquesa) */}
        <motion.circle 
          cx="550" 
          cy="200" 
          r="180" 
          fill="url(#techGradient)"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: 1, 
            opacity: 1,
            rotate: isHovered ? [0, 2, -2, 0] : 0,
          }}
          transition={{ 
            scale: { duration: 0.7, delay: 0.2, ease: "easeOut" },
            opacity: { duration: 0.7, delay: 0.2 },
            rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" }
          }}
          filter={isHovered ? 'url(#glow)' : 'none'}
        />

        {/* Perfil humano abstracto */}
        <motion.g
          initial={{ x: -100, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            y: isHovered ? [0, -5, 0] : 0,
          }}
          transition={{ 
            x: { duration: 0.6, ease: "easeOut" },
            y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <path 
            d="M150,100 A150,150 0 0 0 150,300 L50,300 L50,100 Z" 
            fill="#c13a3a"
          />
          <rect 
            x="140" 
            y="140" 
            width="80" 
            height="120" 
            fill="#c13a3a" 
            rx="10"
          />
        </motion.g>

        {/* Elemento de unión */}
        <motion.g
          initial={{ y: 50, opacity: 0 }}
          animate={{ 
            y: 0, 
            opacity: 1,
            scale: isHovered ? 1.05 : 1,
          }}
          transition={{ 
            y: { duration: 0.5, delay: 0.4, ease: "easeOut" },
            scale: { duration: 0.3 }
          }}
        >
          <rect 
            x="300" 
            y="175" 
            width="150" 
            height="50" 
            fill="#dda032" 
            rx="5"
            transform="rotate(-10 375 200)"
          />
          {/* Efecto de ondas concéntricas al hacer hover */}
          {isHovered && (
            <>
              <motion.circle
                cx="375"
                cy="200"
                r="10"
                stroke="#dda032"
                strokeWidth="2"
                fill="none"
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 3, opacity: 0 }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <motion.circle
                cx="375"
                cy="200"
                r="5"
                stroke="#dda032"
                strokeWidth="2"
                fill="none"
                initial={{ scale: 0.5, opacity: 0.8 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, delay: 0.3, repeat: Infinity }}
              />
            </>
          )}
        </motion.g>

        {/* Partículas flotantes */}
        {[...Array(15)].map((_, i) => (
          <motion.circle
            key={i}
            cx={Math.random() * 800}
            cy={Math.random() * 400}
            r={Math.random() * 2 + 1}
            fill="#ffffff"
            initial={{ opacity: 0 }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </motion.div>
  );
};