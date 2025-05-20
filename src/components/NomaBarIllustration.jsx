import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IllustrationPreciseDiagnosis } from '@/components/illustrations/IllustrationPreciseDiagnosis';
import { IllustrationCustomStrategies } from '@/components/illustrations/IllustrationCustomStrategies';
import { IllustrationSecureImplementation } from '@/components/illustrations/IllustrationSecureImplementation';
import { IllustrationHeader } from '@/components/illustrations/IllustrationHeader';

const NomaBarIllustration = ({ alt, className, illustrationType, size = "default" }) => {
  const [isVisible, setIsVisible] = useState(false);
  const controls = useAnimation();
  
  const sizeClasses = {
    default: "w-full h-48 md:h-64", // General default for placeholders or less critical spots
    large: "w-full h-[288px] md:h-[370px]", // Main hero illustration
    medium: "w-full h-48 md:h-56", // For service cards or secondary features
    small: "w-full h-32 md:h-40"  // For smaller cards or repeated elements
  };
  
  const selectedSizeClass = sizeClasses[size] || sizeClasses.default;

  // Efecto para animación de entrada
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      controls.start({
        opacity: 1,
        y: 0,
        transition: { 
          duration: 0.6, 
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1 * (['header', 'precise-diagnosis', 'custom-strategies', 'secure-implementation'].indexOf(illustrationType) || 0)
        }
      });
    }, 100);
    
    return () => clearTimeout(timer);
  }, [controls, illustrationType]);

  const renderIllustration = () => {
    const commonProps = {
      className: cn("w-full h-full", className),
      isAnimated: true
    };

    switch (illustrationType) {
      case 'header':
        return <IllustrationHeader {...commonProps} />;
      case 'precise-diagnosis':
        return <IllustrationPreciseDiagnosis {...commonProps} />;
      case 'custom-strategies':
        return <IllustrationCustomStrategies {...commonProps} />;
      case 'secure-implementation':
        return <IllustrationSecureImplementation {...commonProps} />;
      default:
        return (
          <div className={`flex items-center justify-center bg-brand-deep-indigo/50 p-4 rounded-lg ${selectedSizeClass}`}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ 
                duration: 0.7, 
                ease: [0.16, 1, 0.3, 1],
                scale: { type: 'spring', damping: 10, stiffness: 100 }
              }}
              className="w-4/5 h-4/5 relative"
            >
              <motion.div 
                className="absolute top-0 left-0 w-2/3 h-2/3 bg-brand-vibrant-red rounded-full"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                }}
              />
              <motion.div 
                className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-brand-warm-orange rounded-tl-full rounded-br-full"
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 0.5
                }}
              />
              <motion.div 
                className="absolute inset-[15%] w-1/2 h-1/2 bg-brand-deep-teal m-auto rounded-sm"
                animate={{
                  rotate: [45, 50, 45],
                  opacity: [0.5, 0.7, 0.5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut',
                  delay: 1
                }}
              />
            </motion.div>
          </div>
        );
    }
  };

  return (
    <motion.div 
      className={cn(
        "relative group overflow-hidden rounded-xl border-2 border-brand-vibrant-red/20",
        "bg-brand-deep-indigo/30 shadow-xl transition-all duration-300",
        "hover:border-brand-vibrant-red/50 hover:shadow-brand-vibrant-red/10",
        selectedSizeClass,
        className
      )}
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={controls}
      whileHover={{
        y: -5,
        scale: 1.01,
        transition: { 
          type: 'spring',
          stiffness: 300,
          damping: 15
        }
      }}
      whileTap={{ 
        scale: 0.99,
        transition: { duration: 0.2 }
      }}
      aria-label={alt || `Ilustración tipo ${illustrationType}`}
    >
      {/* Efecto de brillo al hacer hover */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-brand-vibrant-red/5 via-transparent to-brand-deep-teal/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Efecto de partículas sutiles */}
      {isVisible && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white/10"
              style={{
                width: Math.random() * 6 + 2 + 'px',
                height: Math.random() * 6 + 2 + 'px',
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 2
              }}
            />
          ))}
        </>
      )}
      
      <div className="relative z-10 h-full w-full">
        {renderIllustration()}
      </div>
      
      {alt && <p className="sr-only">{alt}</p>}
      
      {/* Borde sutil al hacer hover */}
      <motion.div 
        className="absolute inset-0 border-2 border-transparent group-hover:border-brand-warm-orange/20 rounded-xl transition-all duration-300 pointer-events-none"
      />
    </motion.div>
  );
};

export default NomaBarIllustration;