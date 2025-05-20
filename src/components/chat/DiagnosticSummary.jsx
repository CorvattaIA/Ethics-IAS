import React, { useState } from 'react';
    import { Link } from 'react-router-dom';
    import { ChevronDown, ChevronUp } from 'lucide-react';

    const DiagnosticSummary = ({ diagnosticAnswers, questions }) => {
      const [isOpen, setIsOpen] = useState(true);

      if (!diagnosticAnswers) return null;

      return (
        <div className="p-element-padding border-b border-brand-orange-red/30 bg-brand-deep-indigo/40">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="flex justify-between items-center w-full text-left text-brand-warm-orange hover:text-brand-vibrant-red transition-colors"
            aria-expanded={isOpen}
            aria-controls="diagnostic-summary-content"
          >
            <span className="font-semibold text-sm">Resumen del Diagnóstico</span>
            {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          {isOpen && (
            <div id="diagnostic-summary-content" className="mt-2 text-xs text-brand-light-text/80 space-y-1 max-h-24 overflow-y-auto pr-2">
              {Object.entries(diagnosticAnswers).map(([key, value]) => {
                const question = questions.find(q => q.id === key);
                const questionText = question ? question.text : key;
                // Find the label for radio/select options if available
                let displayValue = value;
                if (question && (question.type === 'radio' || question.type === 'select')) {
                    const selectedOption = question.options.find(opt => opt.value === value);
                    if (selectedOption) displayValue = selectedOption.label;
                }

                return (
                  <p key={key} className="truncate">
                    <strong className="font-medium">{questionText.length > 25 ? `${questionText.substring(0, 25)}...` : questionText}:</strong> {typeof displayValue === 'string' ? (displayValue.length > 30 ? `${displayValue.substring(0,30)}...` : displayValue) : JSON.stringify(displayValue)}
                  </p>
                );
              })}
               <Link to="/test" className="text-brand-warm-orange hover:underline block mt-2 text-xs font-medium">Ver diagnóstico completo</Link>
            </div>
          )}
        </div>
      );
    };
    export default DiagnosticSummary;