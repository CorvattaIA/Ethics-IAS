import { useToast } from '@/components/ui/use-toast';

    export const useChatActions = (addMessageToState, userName, userEmail, messages, setInputValue, triggerVibration) => {
      const { toast } = useToast();

      const handleScheduleMeeting = () => {
        const meetingInfo = "Para agendar una reunión, por favor envíanos un correo a ssolucionesdeia@gmail.com con tu disponibilidad. También puedes llamar al (310) 868-8648.";
        addMessageToState(meetingInfo, 'bot', 'action');
        toast({
          title: "Agendar Reunión",
          description: "Se ha proporcionado información para agendar una reunión.",
          className: "bg-brand-deep-teal text-brand-light-text border-brand-warm-orange",
        });
        triggerVibration([40, 60, 40]);
      };
    
      const handleExportChat = (format = 'txt') => {
        let content = `Historial de Chat - ${userName} (${userEmail}) - ${new Date().toLocaleString()}\n\n`;
        messages.forEach(msg => {
          content += `[${new Date(msg.timestamp).toLocaleTimeString()}] ${msg.sender === 'user' ? userName : 'Asistente IA Ética'}: ${msg.text}\n`;
        });
        const blob = new Blob([content], { type: `text/${format}` });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `historial_chat_${userName.replace(/\s+/g, '_')}.${format}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        toast({ title: "Historial Descargado", description: `El chat se ha exportado como ${format.toUpperCase()}.`});
        triggerVibration([40, 60, 40]);
      };
    
      const quickReplies = [
        "¿Qué es la ética en IA?",
        "Explica el diagnóstico de riesgos.",
        "Necesito ayuda con mi estrategia.",
      ];
    
      const handleQuickReplySelect = (reply) => {
        setInputValue(reply);
      };

      return {
        handleScheduleMeeting,
        handleExportChat,
        quickReplies,
        handleQuickReplySelect,
      };
    };