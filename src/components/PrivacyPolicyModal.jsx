import React from 'react';
    import { Button } from '@/components/ui/button';
    import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
    import { ShieldCheck, FileText, Download } from 'lucide-react';

    const PrivacyPolicyModal = ({ isOpen, setIsOpen, onAccept }) => {
      if (!isOpen) return null;

      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent className="bg-brand-deep-indigo text-brand-light-text border-brand-vibrant-red max-w-lg p-element-padding">
            <DialogHeader>
              <DialogTitle className="text-2xl text-brand-vibrant-red flex items-center">
                <ShieldCheck className="mr-2 h-6 w-6" /> Uso de tus Datos
              </DialogTitle>
              <DialogDescription className="text-brand-light-text/80 mt-2">
                Para ofrecerte un diagnóstico preciso y una experiencia personalizada, necesitamos procesar la información que nos proporcionas.
              </DialogDescription>
            </DialogHeader>
            <div className="my-element-margin-v space-y-element-margin-v text-sm">
              <p>Tu información se utilizará para:</p>
              <ul className="list-disc list-inside space-y-2 pl-4 text-brand-light-text/90">
                <li>Generar recomendaciones de servicios personalizadas basadas en tus respuestas al test.</li>
                <li>Mejorar la precisión de nuestro sistema de diagnóstico y chat inteligente.</li>
                <li>Permitir a nuestros consultores entender tus necesidades si decides contactarnos.</li>
              </ul>
              <p className="mt-element-margin-v">
                Nos tomamos tu privacidad muy en serio. Tus datos se almacenan de forma segura y no se compartirán con terceros sin tu consentimiento explícito.
              </p>
            </div>
            <DialogFooter className="mt-element-margin-v gap-element-margin-h">
              <DialogClose asChild>
                <Button variant="outline" className="border-brand-light-text/50 text-brand-light-text/80 hover:bg-brand-light-text/10">Cancelar</Button>
              </DialogClose>
              <Button 
                onClick={() => {
                  onAccept();
                  setIsOpen(false);
                }} 
                className="bg-brand-vibrant-red hover:bg-brand-orange-red text-brand-light-text"
              >
                Entendido, Continuar
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    };

    export default PrivacyPolicyModal;