import React from 'react';
    import { motion, AnimatePresence } from 'framer-motion';
    import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
    import { Label } from '@/components/ui/label';
    import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
    import { CheckCircle } from 'lucide-react';

    const DiagnosticQuestionDisplay = ({ currentQuestion, answers, handleAnswerChange }) => {
      if (!currentQuestion) return null;

      return (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="min-h-[200px]"
          >
            <h2 id="question-title" className="text-xl md:text-2xl font-semibold text-brand-light-text mb-element-margin-v">{currentQuestion.text}</h2>
            {currentQuestion.type === 'radio' && (
              <RadioGroup
                value={answers[currentQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                className="space-y-element-margin-v/2"
                aria-labelledby="question-title"
              >
                {currentQuestion.options.map(option => (
                  <motion.div 
                    key={option.value} 
                    className={`flex items-center space-x-3 p-element-padding rounded-md border-2 transition-all duration-200 cursor-pointer
                      ${answers[currentQuestion.id] === option.value ? 'bg-brand-vibrant-red/20 border-brand-vibrant-red shadow-lg' : 'bg-brand-deep-indigo/50 border-brand-light-text/20 hover:border-brand-warm-orange/70'}`}
                    onClick={() => handleAnswerChange(currentQuestion.id, option.value)}
                    whileTap={{ scale: 0.98 }}
                  >
                    <RadioGroupItem value={option.value} id={`${currentQuestion.id}-${option.value}`} className="border-brand-light-text text-brand-vibrant-red focus:ring-brand-vibrant-red" />
                    <Label htmlFor={`${currentQuestion.id}-${option.value}`} className={`flex-1 text-base-mobile md:text-base-desktop cursor-pointer ${answers[currentQuestion.id] === option.value ? 'text-brand-warm-orange font-semibold' : 'text-brand-light-text/90'}`}>
                      {option.label}
                    </Label>
                    {answers[currentQuestion.id] === option.value && <CheckCircle className="h-5 w-5 text-brand-vibrant-red" />}
                  </motion.div>
                ))}
              </RadioGroup>
            )}
            {currentQuestion.type === 'select' && (
              <Select
                value={answers[currentQuestion.id] || ''}
                onValueChange={(value) => handleAnswerChange(currentQuestion.id, value)}
                aria-labelledby="question-title"
              >
                <SelectTrigger className="w-full bg-brand-deep-indigo border-brand-light-text/30 text-brand-light-text focus:ring-brand-vibrant-red text-base-mobile md:text-base-desktop min-h-button-mobile md:min-h-button-desktop">
                  <SelectValue placeholder="Selecciona una opción..." />
                </SelectTrigger>
                <SelectContent className="bg-brand-deep-indigo border-brand-warm-orange text-brand-light-text">
                  {currentQuestion.options.map(option => (
                    <SelectItem key={option.value} value={option.value} className="hover:bg-brand-orange-red/80 focus:bg-brand-orange-red/80">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </motion.div>
        </AnimatePresence>
      );
    };

    export default DiagnosticQuestionDisplay;