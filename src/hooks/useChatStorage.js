import { useEffect } from 'react';
    import { supabase } from '@/lib/supabaseClient';
    import { v4 as uuidv4 } from 'uuid';

    const getSessionId = () => {
      let sessionId = localStorage.getItem('chatSessionId');
      if (!sessionId) {
        sessionId = uuidv4();
        localStorage.setItem('chatSessionId', sessionId);
      }
      return sessionId;
    };
    
    export const useChatStorage = (userName, userEmail, diagnosticAnswers, userId, setUserId, setSessionIdInternal) => {
      useEffect(() => {
        const currentSessionId = getSessionId();
        setSessionIdInternal(currentSessionId); 

        const upsertUser = async () => {
          if (userEmail) { 
            let localUserId = userId;
            if (!localUserId) { 
                const storedUser = JSON.parse(localStorage.getItem('chatUser'));
                if (storedUser && storedUser.email === userEmail && storedUser.id) {
                    localUserId = storedUser.id;
                    setUserId(localUserId); 
                }
            }

            if (!localUserId) { 
                const { data, error } = await supabase
                    .from('chat_users')
                    .upsert({ email: userEmail, name: userName || null, session_id: currentSessionId }, { onConflict: 'email' })
                    .select('id, name, email, session_id')
                    .single();

                if (error) {
                    console.error('Error upserting user in Supabase:', error);
                } else if (data) {
                    localStorage.setItem('chatUser', JSON.stringify(data));
                    setUserId(data.id); 
                }
            } else if (userName) { 
                const storedUser = JSON.parse(localStorage.getItem('chatUser'));
                if (!storedUser || storedUser.name !== userName || storedUser.session_id !== currentSessionId) {
                    const { data, error } = await supabase
                        .from('chat_users')
                        .update({ name: userName, session_id: currentSessionId })
                        .eq('id', localUserId)
                        .select('id, name, email, session_id')
                        .single();
                    if (error) console.error('Error updating user name/session:', error);
                    else if (data) localStorage.setItem('chatUser', JSON.stringify(data));
                }
            }
          }
        };
        upsertUser();
      }, [userEmail, userName, userId, setUserId, setSessionIdInternal]);
    
      useEffect(() => {
        if (diagnosticAnswers) {
            localStorage.setItem('diagnosticAnswersForChat', JSON.stringify(diagnosticAnswers));
        }
      }, [diagnosticAnswers]);
    };
    
    export const loadInitialChatData = async () => {
        const currentSessionId = getSessionId();
        const storedUser = JSON.parse(localStorage.getItem('chatUser'));
        const storedDiagnosticAnswers = JSON.parse(localStorage.getItem('diagnosticAnswersForChat'));

        let userIdToUse = storedUser?.id || null;

        if (storedUser && !storedUser.id && storedUser.email) { 
            const { data: foundUser, error: findError } = await supabase
                .from('chat_users')
                .select('id')
                .eq('email', storedUser.email)
                .single();
            if (foundUser) {
                userIdToUse = foundUser.id;
                localStorage.setItem('chatUser', JSON.stringify({...storedUser, id: userIdToUse, session_id: currentSessionId}));
            }
        } else if (userIdToUse && storedUser) {
            // Ensure session_id in localStorage is up-to-date
            if (storedUser.session_id !== currentSessionId) {
                localStorage.setItem('chatUser', JSON.stringify({...storedUser, session_id: currentSessionId}));
            }
        }
        
        return {
            initialUserName: storedUser?.name || '',
            initialUserEmail: storedUser?.email || '',
            initialUserId: userIdToUse,
            initialSessionId: currentSessionId,
            initialMessages: [], // Start with empty messages
            initialDiagnosticAnswers: storedDiagnosticAnswers,
        };
    };