import React, { useState, useEffect } from 'react';
    import { useLocation } from 'react-router-dom';
    import { useToast } from '@/components/ui/use-toast';
    import { useChatLogic } from '@/hooks/useChatLogic';
    import { useChatStorage, loadInitialChatData } from '@/hooks/useChatStorage';
    import ChatInterface from '@/components/chat/ChatInterface';
    import { supabase } from '@/lib/supabaseClient';

    const ChatPage = () => {
      const location = useLocation();
      const { toast } = useToast();
      
      const [initialData, setInitialData] = useState(null);
      const [isLoading, setIsLoading] = useState(true);
      const [isUserInfoModalOpen, setIsUserInfoModalOpen] = useState(false);

      // Cargar datos iniciales
      useEffect(() => {
        const fetchData = async () => {
          const data = await loadInitialChatData();
          setInitialData(data);
          setIsLoading(false);
        };
        fetchData();
      }, []);

      // Inicializar chatLogic
      const chatLogicInstance = useChatLogic(
        initialData?.initialUserName || '', 
        initialData?.initialUserEmail || '',
        location.state?.diagnosticAnswers !== undefined ? location.state.diagnosticAnswers : initialData?.initialDiagnosticAnswers,
        initialData?.initialUserId || null,
        initialData?.initialSessionId || null
      );

      // Extraer valores necesarios de chatLogic
      const {
        messages,
        userName,
        userEmail,
        diagnosticAnswers,
        addBotMessage,
        setDiagnosticAnswers,
        userId,
        setUserId,
        setSessionId,
        setUserNameState,
        setUserEmailState,
        setMessages,
        handleSendMessage,
        handleScheduleMeeting,
        handleExportChat,
        quickReplies,
        handleQuickReplySelect,
        triggerVibration,
        playSound
      } = chatLogicInstance;

      // Manejar almacenamiento de chat
      useChatStorage(userName, userEmail, diagnosticAnswers, userId, setUserId, setSessionId);

      // Manejar modal de información del usuario
      useEffect(() => {
        if (!isLoading && !isUserInfoModalOpen) {
          if (!userName || !userEmail) {
            setIsUserInfoModalOpen(true);
          } else {
            setIsUserInfoModalOpen(false);
          }
        }
      }, [isLoading, userName, userEmail]);

      // Manejar diagnóstico
      useEffect(() => {
        if (location.state?.diagnosticAnswers && !diagnosticAnswers && setDiagnosticAnswers) {
          setDiagnosticAnswers(location.state.diagnosticAnswers);
        }
      }, [location.state, diagnosticAnswers, setDiagnosticAnswers]);

      // Manejar mensajes iniciales
      useEffect(() => {
        if (userName && messages.length === 0 && addBotMessage && !isUserInfoModalOpen && !isLoading) {
          addBotMessage(`¡Hola ${userName}! Bienvenido al chat de ÉticaIA. ¿Cómo puedo ayudarte hoy?`);
          if (location.state?.interestedService) {
            addBotMessage(`Veo que te interesa nuestro servicio de "${location.state.interestedService}". ¿Qué te gustaría saber al respecto?`);
          } else if (diagnosticAnswers) {
            addBotMessage("He cargado tu diagnóstico. ¿Tienes alguna pregunta específica sobre los resultados o los servicios recomendados?");
          } else {
            addBotMessage("Puedes preguntarme sobre nuestros servicios de consultoría, el diagnóstico ético que realizaste o cualquier otra duda sobre la aplicación de la ética en sistemas de inteligencia artificial.");
          }
        }
      }, [userName, messages, location.state, diagnosticAnswers, addBotMessage, isUserInfoModalOpen, isLoading]);

      // Función para manejar el envío de información del usuario
      const handleUserInfoSubmit = async (e) => {
        e.preventDefault();
        const trimmedName = userName?.trim() || '';
        const trimmedEmail = userEmail?.trim() || '';
        
        if (!trimmedName || !trimmedEmail) {
          toast({
            title: "Datos incompletos",
            description: "Por favor, ingresa tu nombre y correo electrónico para continuar.",
            variant: "destructive",
          });
          return;
        }

        try {
          const { data: user, error } = await supabase
            .from('chat_users')
            .upsert({ 
              email: trimmedEmail, 
              name: trimmedName,
              updated_at: new Date().toISOString()
            }, { 
              onConflict: 'email',
              ignoreDuplicates: false
            })
            .select('id, name, email, session_id')
            .single();

          if (error) {
            console.error("Error de Supabase:", error);
            throw new Error(error.message || 'Error al guardar en la base de datos');
          }
          
          if (!user) {
            throw new Error('No se recibieron datos del usuario');
          }
          
          // Actualizar estados locales
          const userId = user.id || Date.now().toString();
          const sessionId = user.session_id || crypto.randomUUID();
          
          setUserId(userId);
          setSessionId(sessionId);
          setUserNameState(trimmedName);
          setUserEmailState(trimmedEmail);
          
          // Guardar en localStorage
          localStorage.setItem('chatUser', JSON.stringify({
            id: userId,
            name: trimmedName,
            email: trimmedEmail,
            session_id: sessionId
          }));
          
          // Cerrar el modal
          setIsUserInfoModalOpen(false);
          
          // Mostrar mensaje de éxito
          toast({
            title: "¡Listo!",
            description: "Información guardada correctamente.",
            className: "bg-brand-deep-teal text-brand-light-text border-brand-warm-orange",
          });
          
          // Opcional: activar vibración si está disponible
          if (triggerVibration) triggerVibration([40, 60, 40]);
          
          // Forzar actualización del chat
          if (messages.length === 0 && addBotMessage) {
            addBotMessage(`¡Hola ${trimmedName}! Bienvenido al chat de ÉticaIA. ¿En qué puedo ayudarte hoy?`);
          }
          
          return true;
          
        } catch (error) {
          console.error("Error al guardar la información del usuario:", error);
          
          // Mensaje de error más específico
          let errorMessage = "No se pudo guardar tu información. Por favor, inténtalo de nuevo.";
          
          if (error.message?.includes('duplicate key')) {
            errorMessage = "Este correo electrónico ya está registrado. Por favor, usa otro correo.";
          } else if (error.message) {
            errorMessage = error.message;
          }
          
          toast({ 
            title: "Error", 
            description: errorMessage, 
            variant: "destructive"
          });
          
          return false;
        }
      };

      if (isLoading || !chatLogicInstance) {
        return (
          <div className="flex items-center justify-center h-full">
            <p className="text-xl text-brand-light-text">Cargando chat...</p>
          </div>
        );
      }

      return (
        <ChatInterface 
          chatLogic={chatLogicInstance}
          isUserInfoModalOpen={isUserInfoModalOpen}
          setIsUserInfoModalOpen={setIsUserInfoModalOpen}
          handleUserInfoSubmit={handleUserInfoSubmit}
        />
      );
    };

    export default ChatPage;