import React from 'react';
    import { motion } from 'framer-motion';
    import { User, Bot } from 'lucide-react';

    const ChatMessage = ({ message, userName }) => {
      const { text, sender, timestamp, status } = message;
      const isUser = sender === 'user';

      let statusIndicator = null;
      if (isUser && status) {
        if (status === 'sending') {
          statusIndicator = <span className="text-xs opacity-50 ml-1">Enviando...</span>;
        } else if (status === 'sent') {
          statusIndicator = <span className="text-xs opacity-70 ml-1">✓</span>;
        } else if (status === 'delivered') {
           statusIndicator = <span className="text-xs opacity-70 ml-1">✓✓</span>;
        }
      }

      return (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className={`flex mb-element-margin-v/2 ${isUser ? 'justify-end' : 'justify-start'}`}
        >
          <div className={`max-w-[80%] md:max-w-[70%] p-3 rounded-xl shadow-md ${
            isUser 
              ? 'bg-brand-vibrant-red text-white rounded-br-none' 
              : 'bg-brand-deep-teal text-white rounded-bl-none' 
          }`}>
            <div className="flex items-center mb-1">
              {isUser ? <User className="h-4 w-4 mr-2 flex-shrink-0 text-white/80" /> : <Bot className="h-4 w-4 mr-2 flex-shrink-0 text-white/80" />}
              <span className="text-xs opacity-80 font-semibold text-white/90">{isUser ? userName : 'Asistente IA Ética'}</span>
            </div>
            <p className="text-sm whitespace-pre-wrap break-words text-white">{text}</p>
            <div className="text-xs opacity-70 mt-1.5 text-right text-white/80 flex items-center justify-end">
              {new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {statusIndicator}
            </div>
          </div>
        </motion.div>
      );
    };

    export default ChatMessage;