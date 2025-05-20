import React, { useRef, useEffect } from 'react';
    import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
    import { Button } from '@/components/ui/button';
    import { Textarea } from '@/components/ui/textarea';
    import ChatMessage from '@/components/chat/ChatMessage';
    import TypingIndicator from '@/components/chat/TypingIndicator';
    import DiagnosticSummary from '@/components/chat/DiagnosticSummary';
    import ChatQuickReplies from '@/components/chat/ChatQuickReplies';
    import { Download, Volume2, VolumeX, Send, CalendarPlus, MessageSquare } from 'lucide-react';

    const ChatWindow = ({
      messages,
      inputValue,
      onInputChange,
      onSendMessage,
      userName,
      isTyping,
      isConsultingAI,
      diagnosticAnswers,
      questions, 
      notificationsMuted,
      onToggleMute,
      onExportChat,
      onScheduleMeeting,
      quickReplies,
      onQuickReplySelect,
    }) => {
      const messagesEndRef = useRef(null);
      const inputRef = useRef(null);

      useEffect(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, []);

      useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages, isTyping, isConsultingAI]);

      return (
        <Card className="h-full flex flex-col bg-brand-deep-indigo/90 border-2 border-brand-orange-red/50 shadow-2xl overflow-hidden rounded-xl max-w-full sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto w-full">
          <CardHeader className="flex-row justify-between items-center p-3 sm:p-element-padding border-b border-brand-orange-red/30">
            <div className="flex items-center">
              <MessageSquare className="h-6 w-6 sm:h-7 sm:w-7 mr-2 sm:mr-3 text-brand-vibrant-red"/>
              <CardTitle id="chat-window-title" className="text-brand-vibrant-red text-lg sm:text-xl md:text-2xl font-semibold">Chat Inteligente</CardTitle>
            </div>
            <div className="flex items-center gap-0 sm:gap-1">
              <Button variant="ghost" size="icon" onClick={onToggleMute} aria-label={notificationsMuted ? "Activar sonido" : "Silenciar sonido"} className="p-1.5 sm:p-2">
                {notificationsMuted ? <VolumeX className="h-4 w-4 sm:h-5 sm:w-5 text-brand-light-text/70 hover:text-brand-warm-orange" /> : <Volume2 className="h-4 w-4 sm:h-5 sm:w-5 text-brand-light-text/70 hover:text-brand-warm-orange" />}
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onExportChat('txt')} aria-label="Descargar historial del chat" className="p-1.5 sm:p-2">
                <Download className="h-4 w-4 sm:h-5 sm:w-5 text-brand-light-text/70 hover:text-brand-warm-orange" />
              </Button>
            </div>
          </CardHeader>

          {diagnosticAnswers && questions && (
            <DiagnosticSummary diagnosticAnswers={diagnosticAnswers} questions={questions} />
          )}
          
          <CardContent className="flex-grow overflow-y-auto p-3 sm:p-element-padding space-y-2 sm:space-y-element-margin-v/2 bg-brand-deep-indigo/70">
            {messages.map((msg, index) => (
              <ChatMessage key={msg.id || index} message={msg} userName={userName} />
            ))}
            {isTyping && !isConsultingAI && <TypingIndicator variant="user" />}
            {isConsultingAI && <TypingIndicator variant="ai" text="Consultando IA..." />}
            <div ref={messagesEndRef} />
          </CardContent>

          <CardFooter className="p-3 sm:p-element-padding border-t border-brand-orange-red/30 bg-brand-deep-indigo/95 flex flex-col items-start">
            <ChatQuickReplies quickReplies={quickReplies} onSelect={onQuickReplySelect} />
            <div className="flex space-x-2 sm:space-x-element-margin-h items-end w-full mt-2">
              <Textarea
                ref={inputRef}
                value={inputValue}
                onChange={onInputChange}
                onKeyPress={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); onSendMessage(); }}}
                placeholder={diagnosticAnswers ? "Pregunta sobre tu diagnóstico..." : "Escribe tu mensaje..."}
                className="flex-grow resize-none bg-brand-deep-indigo border-brand-orange-red text-brand-light-text focus:ring-brand-vibrant-red min-h-[48px] sm:min-h-[56px] max-h-[120px] sm:max-h-[150px] p-2.5 sm:p-3 text-sm sm:text-base-mobile rounded-lg placeholder-brand-light-text/50"
                rows={1}
                aria-label="Mensaje para el chat"
                disabled={isConsultingAI}
              />
              <Button 
                onClick={onSendMessage} 
                className="bg-brand-vibrant-red hover:bg-brand-orange-red text-brand-light-text min-h-[48px] sm:min-h-[56px] px-3 sm:px-4 self-end rounded-lg transition-all duration-200 transform active:scale-95" 
                aria-label="Enviar mensaje"
                disabled={isConsultingAI || (inputValue.trim() === '' && !isTyping)}
              >
                <Send className="h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>
             <Button variant="link" onClick={onScheduleMeeting} className="text-brand-warm-orange hover:text-brand-vibrant-red text-xs sm:text-sm mt-1.5 sm:mt-2 p-0 h-auto self-start transition-colors">
                <CalendarPlus className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" /> ¿Necesitas agendar una reunión?
             </Button>
          </CardFooter>
        </Card>
      );
    };

    export default ChatWindow;