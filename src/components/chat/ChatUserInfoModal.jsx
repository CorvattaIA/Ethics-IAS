import React, { useState, useEffect } from 'react';
    import { Button } from '@/components/ui/button';
    import { Input } from '@/components/ui/input';
    import { Label } from '@/components/ui/label';
    import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
    import { Info, Loader2 } from 'lucide-react';

    const ChatUserInfoModal = ({
      isOpen,
      onOpenChange,
      userName: propUserName,
      onUserNameChange,
      userEmail: propUserEmail,
      onUserEmailChange,
      onSubmit,
    }) => {
      const [localUserName, setLocalUserName] = useState(propUserName);
      const [localUserEmail, setLocalUserEmail] = useState(propUserEmail);
      const [isSubmitting, setIsSubmitting] = useState(false);

      // Sincronizar con props
      useEffect(() => {
        setLocalUserName(propUserName);
        setLocalUserEmail(propUserEmail);
      }, [propUserName, propUserEmail]);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!localUserName?.trim() || !localUserEmail?.trim()) return;
        
        try {
          setIsSubmitting(true);
          await onSubmit(e);
        } finally {
          setIsSubmitting(false);
        }
      };
      return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
          <DialogContent className="bg-brand-deep-indigo text-brand-light-text border-brand-vibrant-red w-[90vw] max-w-md p-element-padding rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-brand-vibrant-red text-xl sm:text-2xl flex items-center"><Info className="mr-2 h-5 w-5 sm:h-6 sm:w-6"/>Antes de Empezar</DialogTitle>
              <DialogDescription className="text-brand-light-text/80 mt-1 sm:mt-2 text-sm sm:text-base">
                Necesitamos algunos datos para personalizar tu experiencia de chat.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-element-margin-v mt-element-margin-v">
              <div>
                <Label htmlFor="userNameModal" className="text-brand-warm-orange text-sm sm:text-base">Nombre</Label>
                <Input 
                  id="userNameModal" 
                  value={localUserName || ''} 
                  onChange={(e) => {
                    const value = e.target.value;
                    setLocalUserName(value);
                    onUserNameChange?.({ target: { value } });
                  }}
                  placeholder="Tu nombre"
                  className="bg-brand-deep-indigo/50 border-brand-orange-red text-brand-light-text mt-1 rounded-lg text-sm sm:text-base"
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <Label htmlFor="userEmailModal" className="text-brand-warm-orange text-sm sm:text-base">Correo Electrónico</Label>
                <Input 
                  id="userEmailModal" 
                  type="email" 
                  value={localUserEmail || ''} 
                  onChange={(e) => {
                    const value = e.target.value;
                    setLocalUserEmail(value);
                    onUserEmailChange?.({ target: { value } });
                  }}
                  placeholder="tu@correo.com"
                  className="bg-brand-deep-indigo/50 border-brand-orange-red text-brand-light-text mt-1 rounded-lg text-sm sm:text-base"
                  aria-required="true"
                  disabled={isSubmitting}
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-brand-vibrant-red hover:bg-brand-orange-red text-brand-light-text min-h-button-mobile md:min-h-button-desktop rounded-lg text-sm sm:text-base flex items-center justify-center gap-2"
                disabled={isSubmitting || !localUserName?.trim() || !localUserEmail?.trim()}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Procesando...
                  </>
                ) : (
                  'Comenzar Chat'
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      );
    };

    export default ChatUserInfoModal;