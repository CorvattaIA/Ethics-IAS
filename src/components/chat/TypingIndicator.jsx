import React from 'react';
    import { motion } from 'framer-motion';
    import { Bot, User } from 'lucide-react';

    const TypingIndicator = ({ variant = "user", text = "Escribiendo..." }) => {
      const IconComponent = variant === 'ai' ? Bot : User;
      const bgColor = variant === 'ai' ? 'bg-brand-deep-teal/80' : 'bg-brand-vibrant-red/80';
      const textColor = 'text-brand-light-text/90';

      return (
        <div className={`flex items-center space-x-2 p-2.5 rounded-lg ${bgColor} max-w-max ${variant === 'user' ? 'ml-auto' : 'mr-auto'} my-1`}>
          <IconComponent className={`h-4 w-4 ${textColor} opacity-80`} />
          <span className={`text-xs font-medium ${textColor}`}>{text}</span>
          <motion.div 
            className={`w-1.5 h-1.5 ${textColor} opacity-60 rounded-full`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }}
          />
          <motion.div 
            className={`w-1.5 h-1.5 ${textColor} opacity-60 rounded-full`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
          />
          <motion.div 
            className={`w-1.5 h-1.5 ${textColor} opacity-60 rounded-full`}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
          />
        </div>
      );
    };
    export default TypingIndicator;