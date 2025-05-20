import { useState, useEffect, useCallback } from 'react';

    export const useChatState = (initialUserName, initialUserEmail, initialDiagnosticAnswers, initialUserId, initialSessionId) => {
      const [messages, setMessages] = useState([]);
      const [inputValue, setInputValue] = useState('');
      const [userName, setUserNameState] = useState(initialUserName);
      const [userEmail, setUserEmailState] = useState(initialUserEmail);
      const [userId, setUserId] = useState(initialUserId);
      const [sessionId, setSessionId] = useState(initialSessionId);
      const [isTyping, setIsTyping] = useState(false);
      const [isConsultingAI, setIsConsultingAI] = useState(false);
      const [diagnosticAnswers, setDiagnosticAnswers] = useState(initialDiagnosticAnswers);
      const [notificationsMuted, setNotificationsMuted] = useState(false);

      const handleInputChange = (e) => {
        const value = e.target.value;
        setInputValue(value);
        if (value.trim() !== '' && !isTyping) {
          setIsTyping(true);
        } else if (value.trim() === '' && isTyping) {
          setIsTyping(false);
        }
      };
    
      useEffect(() => {
        if (inputValue.trim() === '' && isTyping) {
            setIsTyping(false);
        }
      }, [inputValue, isTyping]);

      const playSound = useCallback((type) => {
        if (notificationsMuted) return;
        // console.log(`Sound played: ${type}`);
      }, [notificationsMuted]);
    
      const triggerVibration = useCallback((pattern) => {
        if (notificationsMuted || !window.navigator.vibrate) return;
        window.navigator.vibrate(pattern);
      }, [notificationsMuted]);

      return {
        messages, setMessages,
        inputValue, setInputValue, handleInputChange,
        userName, setUserNameState,
        userEmail, setUserEmailState,
        userId, setUserId,
        sessionId, setSessionId,
        isTyping, setIsTyping,
        isConsultingAI, setIsConsultingAI,
        diagnosticAnswers, setDiagnosticAnswers,
        notificationsMuted, setNotificationsMuted,
        playSound,
        triggerVibration,
      };
    };