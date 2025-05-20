import React from 'react';
    import { motion } from 'framer-motion';

    const PrivacyPolicyPage = () => (
      <motion.div 
        initial={{opacity: 0}} animate={{opacity:1}} exit={{opacity:0}}
        className="p-element-padding bg-brand-deep-indigo/40 rounded-xl shadow-2xl border border-brand-light-text/10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-brand-vibrant-red mb-element-margin-v">Política de Privacidad</h1>
        <p className="mb-element-margin-v/2 text-brand-light-text/90 text-sm">Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <div className="space-y-element-margin-v text-brand-light-text/80 leading-relaxed">
          <p>En Consultoría en Ética para IA (en adelante, "nosotros", "nuestro"), valoramos tu privacidad y nos comprometemos a proteger tu información personal. Esta política de privacidad explica cómo recopilamos, usamos y protegemos tus datos cuando utilizas nuestro sitio web y servicios (en adelante, el "Servicio").</p>
          
          <section>
            <h2 className="text-2xl font-semibold text-brand-warm-orange mt-element-margin-v mb-element-margin-v/2">1. Información que Recopilamos</h2>
            <p>Recopilamos información para proporcionar y mejorar nuestro Servicio. Los tipos de información que podemos recopilar incluyen:</p>
            <ul className="list-disc list-outside pl-6 mt-2 space-y-1">
              <li><strong>Información proporcionada directamente:</strong> Nombre, dirección de correo electrónico, sector económico, respuestas al test de diagnóstico, y cualquier otra información que nos proporciones al utilizar formularios o interactuar con el chat.</li>
              <li><strong>Información recopilada automáticamente:</strong> A través de cookies y tecnologías similares, podemos recopilar información sobre tu dispositivo, navegador, dirección IP, páginas visitadas, y tiempo de permanencia en nuestro sitio. Esto nos ayuda a entender cómo utilizas nuestro Servicio y a mejorarlo.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-warm-orange mt-element-margin-v mb-element-margin-v/2">2. Cómo Usamos tu Información</h2>
            <p>Utilizamos la información recopilada para los siguientes propósitos:</p>
            <ul className="list-disc list-outside pl-6 mt-2 space-y-1">
              <li>Proporcionar, operar y mantener nuestro Servicio.</li>
              <li>Personalizar tu experiencia y ofrecerte recomendaciones de servicios basadas en tus respuestas.</li>
              <li>Comunicarnos contigo, responder a tus consultas y enviarte información sobre nuestros servicios si lo solicitas.</li>
              <li>Analizar el uso del Servicio para mejorar su funcionalidad y desarrollar nuevos productos o características.</li>
              <li>Prevenir fraudes, garantizar la seguridad de nuestro sitio y cumplir con obligaciones legales.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-warm-orange mt-element-margin-v mb-element-margin-v/2">3. Cómo Compartimos tu Información</h2>
            <p>No vendemos ni alquilamos tu información personal a terceros. Podemos compartir tu información en las siguientes circunstancias limitadas:</p>
            <ul className="list-disc list-outside pl-6 mt-2 space-y-1">
              <li><strong>Proveedores de servicios:</strong> Con empresas de confianza que nos ayudan a operar nuestro Servicio (ej. alojamiento web, análisis de datos), siempre bajo acuerdos de confidencialidad.</li>
              <li><strong>Cumplimiento legal:</strong> Si es requerido por ley, regulación, proceso legal o solicitud gubernamental.</li>
              <li><strong>Protección de derechos:</strong> Para proteger nuestros derechos, propiedad o seguridad, o los de nuestros usuarios u otros.</li>
              <li><strong>Con tu consentimiento:</strong> Para cualquier otro propósito, con tu consentimiento explícito.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-warm-orange mt-element-margin-v mb-element-margin-v/2">4. Seguridad de tus Datos</h2>
            <p>Implementamos medidas técnicas y organizativas razonables para proteger tu información personal contra el acceso no autorizado, la alteración, la divulgación o la destrucción. Sin embargo, ningún método de transmisión por Internet o almacenamiento electrónico es 100% seguro, por lo que no podemos garantizar su seguridad absoluta.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-warm-orange mt-element-margin-v mb-element-margin-v/2">5. Tus Derechos</h2>
            <p>De acuerdo con la legislación aplicable, puedes tener los siguientes derechos sobre tu información personal:</p>
            <ul className="list-disc list-outside pl-6 mt-2 space-y-1">
              <li>Acceder a la información que tenemos sobre ti.</li>
              <li>Solicitar la corrección de información inexacta o incompleta.</li>
              <li>Solicitar la eliminación de tu información personal, sujeto a ciertas excepciones.</li>
              <li>Oponerte al procesamiento de tus datos para fines específicos.</li>
              <li>Solicitar la limitación del procesamiento de tus datos.</li>
              <li>Solicitar la portabilidad de tus datos.</li>
            </ul>
            <p className="mt-2">Para ejercer estos derechos, por favor contáctanos utilizando la información proporcionada al final de esta política.</p>
          </section>
           <section>
            <h2 className="text-2xl font-semibold text-brand-warm-orange mt-element-margin-v mb-element-margin-v/2">6. Cookies</h2>
            <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Una cookie es un pequeño archivo de texto que se almacena en tu dispositivo. Puedes controlar el uso de cookies a través de la configuración de tu navegador. Ten en cuenta que deshabilitar cookies puede afectar la funcionalidad de algunas partes de nuestro Servicio.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-warm-orange mt-element-margin-v mb-element-margin-v/2">7. Cambios a esta Política</h2>
            <p>Podemos actualizar esta política de privacidad ocasionalmente. Te notificaremos cualquier cambio material publicando la nueva política en nuestro sitio web y actualizando la fecha de "Última actualización". Te recomendamos revisar esta política periódicamente.</p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-brand-warm-orange mt-element-margin-v mb-element-margin-v/2">8. Contacto</h2>
            <p>Si tienes alguna pregunta, comentario o inquietud sobre esta política de privacidad o nuestras prácticas de datos, por favor contáctanos en:</p>
            <p className="mt-2">
              <strong>Correo Electrónico:</strong> <a href="mailto:ssolucionesdeia@gmail.com" className="text-brand-warm-orange hover:underline hover:text-brand-vibrant-red transition-colors">ssolucionesdeia@gmail.com</a><br/>
              <strong>Teléfono:</strong> <a href="tel:+573108688648" className="text-brand-warm-orange hover:underline hover:text-brand-vibrant-red transition-colors">(310) 868-8648</a>
            </p>
          </section>
        </div>
      </motion.div>
    );

    export default PrivacyPolicyPage;