import { useCallback } from 'react';
    import { useToast } from '@/components/ui/use-toast';
    import { supabase } from '@/lib/supabaseClient';

    const callSupabaseEdgeFunction = async (functionName, payload) => {
      console.log(`Invoking Edge Function: ${functionName} with payload:`, JSON.stringify(payload));
      const { data, error: invokeError } = await supabase.functions.invoke(functionName, {
        body: JSON.stringify(payload),
      });

      if (invokeError) {
        console.error(`Error invoking Supabase Edge Function ${functionName}:`, invokeError);
        let detailedErrorMessage = invokeError.message;
        if (invokeError.context && invokeError.context.status) {
            detailedErrorMessage += ` (Status: ${invokeError.context.status})`;
        }
        if (invokeError.context && invokeError.context.responseText) {
            console.error("Edge function response text:", invokeError.context.responseText);
        }
        throw new Error(`Error del servidor: ${detailedErrorMessage}`);
      }
      
      let parsedData;
      if (data === null || data === undefined) {
        console.error('Respuesta vacía de la Edge Function:', data);
        throw new Error('Respuesta vacía o inesperada del asistente.');
      }

      if (typeof data === 'string') {
        try {
          parsedData = JSON.parse(data);
        } catch (e) {
          console.error('Error parsing JSON response from Edge Function (string):', data, e);
          console.error('Original response string:', data);
          throw new Error('Respuesta inválida del asistente (no es JSON).');
        }
      } else if (typeof data === 'object') {
        parsedData = data; 
      } else {
        console.error('Respuesta inesperada de la Edge Function (tipo desconocido):', typeof data, data);
        throw new Error('Respuesta inesperada del asistente (tipo desconocido).');
      }

      if (parsedData && parsedData.reply) {
        return parsedData.reply;
      } else if (parsedData && parsedData.error) {
        console.error('Error devuelto por la Edge Function:', parsedData.error);
        throw new Error(`Error del asistente: ${parsedData.error}`);
      }
      else {
        console.error('Respuesta JSON no contiene "reply" o es inválida:', parsedData);
        throw new Error('Respuesta del asistente no tiene el formato esperado.');
      }
    };
    
    export const useMessageHandling = (
      messages, setMessages, inputValue, setInputValue,
      userId, sessionId, userName, userEmail, diagnosticAnswers,
      setIsTyping, setIsConsultingAI, playSound, triggerVibration
    ) => {
      const { toast } = useToast();
    
      const addMessageToState = useCallback((text, sender, type = 'text', status = 'sent', dbId = null) => {
        const newMessage = { 
          text, 
          sender, 
          timestamp: new Date(), 
          type, 
          id: dbId || Date.now() + Math.random(), 
          status 
        };
        setMessages(prev => {
          const newMessagesArray = [...prev];
          const existingSendingMessageIndex = newMessagesArray.findIndex(m => m.sender === 'user' && m.status === 'sending');
          
          if (sender === 'user' && status === 'sending') {
            if (existingSendingMessageIndex !== -1) {
              newMessagesArray.splice(existingSendingMessageIndex, 1);
            }
          }
          newMessagesArray.push(newMessage);
          return newMessagesArray;
        });
        return newMessage.id;
      }, [setMessages]);

      const updateMessageStatusInState = useCallback((tempId, newStatus, dbId = null) => {
        setMessages(prev => prev.map(msg => 
          msg.id === tempId ? {...msg, status: newStatus, id: dbId || msg.id } : msg
        ));
      }, [setMessages]);
    
      const saveMessageToSupabase = async (messageData) => {
        try {
          const { data, error } = await supabase
            .from('chat_messages')
            .insert([messageData])
            .select()
            .single();
    
          if (error) {
            console.error('Error saving message to Supabase:', error);
            throw error;
          }
          return data; 
        } catch (error) {
          toast({
            title: "Error de Conexión DB",
            description: "No se pudo guardar el mensaje en la base de datos. Revisa tu conexión.",
            variant: "destructive",
          });
          return null;
        }
      };
    
      const handleSendMessage = async () => {
        if (inputValue.trim() === '' || !userId) {
          if(!userId) {
            toast({ title: "Error de Usuario", description: "No se pudo identificar al usuario. Por favor, recarga la página o ingresa tus datos.", variant: "destructive" });
          }
          return;
        }
      
        const userMessageText = inputValue;
        setInputValue(''); 
        setIsTyping(false); 
        
        const tempId = addMessageToState(userMessageText, 'user', 'text', 'sending');
        playSound('sent');
        triggerVibration(20);
      
        const userMessageForDb = {
          user_id: userId,
          session_id: sessionId,
          sender: 'user',
          content: userMessageText,
          status: 'delivered', 
          diagnostic_answers: diagnosticAnswers || null,
        };
        
        const savedUserMessage = await saveMessageToSupabase(userMessageForDb);
        if (savedUserMessage) {
          updateMessageStatusInState(tempId, 'delivered', savedUserMessage.id);
        } else {
          updateMessageStatusInState(tempId, 'failed');
          return; 
        }

        setIsConsultingAI(true);
      
        try {
          const chatHistoryForContext = messages
            .filter(msg => msg.status === 'delivered' || (msg.sender === 'user' && msg.id === savedUserMessage.id)) // Include current sent user message
            .slice(-6) 
            .map(msg => ({
              role: msg.sender === 'user' ? 'user' : 'assistant',
              content: msg.text
            }));

          const botResponseText = await callSupabaseEdgeFunction('chat-openai', { 
            message: userMessageText, 
            history: chatHistoryForContext 
          });
          
          const botMessageForDb = {
            user_id: userId,
            session_id: sessionId,
            sender: 'bot',
            content: botResponseText,
            status: 'delivered',
          };
          const savedBotMessage = await saveMessageToSupabase(botMessageForDb);
          if (savedBotMessage) {
            addMessageToState(botResponseText, 'bot', 'text', 'delivered', savedBotMessage.id);
          } else {
             addMessageToState(botResponseText, 'bot', 'text', 'failed-to-save'); 
          }
          playSound('received');
        } catch (error) {
          console.error("Error getting AI response from Edge Function:", error);
          addMessageToState(`Error al conectar con el asistente: ${error.message}. Inténtalo de nuevo.`, 'bot', 'text', 'failed');
          toast({
            title: "Error de Asistente IA",
            description: `No se pudo obtener respuesta del asistente: ${error.message}`,
            variant: "destructive",
          });
        } finally {
          setIsConsultingAI(false);
        }
      };

      return {
        handleSendMessage,
        addMessageToState,
      };
    };