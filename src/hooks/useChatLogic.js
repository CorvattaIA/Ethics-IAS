import { useChatState } from './useChatState';
    import { useMessageHandling } from './useMessageHandling';
    import { useChatActions } from './useChatActions';

    export const useChatLogic = (initialUserName, initialUserEmail, initialDiagnosticAnswers, initialUserId, initialSessionId) => {
      const {
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
        playSound, triggerVibration,
      } = useChatState(initialUserName, initialUserEmail, initialDiagnosticAnswers, initialUserId, initialSessionId);

      const { 
        handleSendMessage, 
        addMessageToState 
      } = useMessageHandling(
        messages, setMessages, inputValue, setInputValue,
        userId, sessionId, userName, userEmail, diagnosticAnswers,
        setIsTyping, setIsConsultingAI, playSound, triggerVibration
      );
      
      const {
        handleScheduleMeeting,
        handleExportChat,
        quickReplies,
        handleQuickReplySelect,
      } = useChatActions(addMessageToState, userName, userEmail, messages, setInputValue, triggerVibration);

      return {
        messages, setMessages,
        inputValue, setInputValue, handleInputChange,
        userName, setUserNameState,
        userEmail, setUserEmailState,
        userId, setUserId,
        sessionId, setSessionId,
        isTyping, setIsTyping,
        isConsultingAI,
        diagnosticAnswers, setDiagnosticAnswers,
        notificationsMuted, setNotificationsMuted,
        handleSendMessage,
        addBotMessage: (text, type = 'text') => addMessageToState(text, 'bot', type),
        handleScheduleMeeting,
        handleExportChat,
        quickReplies,
        handleQuickReplySelect,
        triggerVibration,
        playSound,
      };
    };