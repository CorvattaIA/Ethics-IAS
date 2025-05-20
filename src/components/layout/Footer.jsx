import React from 'react';
    import { Link } from 'react-router-dom';
    import { Lock, FileText } from 'lucide-react';

    const Footer = () => {
      return (
        <footer className="bg-brand-deep-indigo/70 border-t-2 border-brand-vibrant-red/50 py-element-margin-v text-center backdrop-blur-md">
          <div className="container mx-auto px-element-padding">
            <div className="mb-element-margin-v/2">
              <span className="text-sm text-brand-light-text/80">Contacto: </span>
              <a href="mailto:ssolucionesdeia@gmail.com" className="text-sm text-brand-warm-orange hover:underline hover:text-brand-vibrant-red transition-colors">ssolucionesdeia@gmail.com</a>
              <span className="text-sm text-brand-light-text/70 mx-2">|</span>
              <a href="tel:+573108688648" className="text-sm text-brand-warm-orange hover:underline hover:text-brand-vibrant-red transition-colors">Cel: (310) 868-8648</a>
            </div>
            <div className="flex justify-center items-center space-x-element-margin-h mb-element-margin-v/2">
              <Link to="/privacy-policy" className="text-xs text-brand-light-text/70 hover:text-brand-warm-orange underline transition-colors flex items-center">
                <FileText className="h-3.5 w-3.5 mr-1"/> Política de Privacidad
              </Link>
              <span className="text-xs text-brand-light-text/50">|</span>
              <span className="flex items-center text-xs text-brand-light-text/70">
                <Lock className="h-3.5 w-3.5 mr-1 text-brand-deep-teal" /> Conexión Segura (HTTPS)
              </span>
            </div>
            <p className="text-xs text-brand-light-text/70">
              &copy; {new Date().getFullYear()} Consultoría en Ética para IA. Todos los derechos reservados.
            </p>
          </div>
        </footer>
      );
    };

    export default Footer;