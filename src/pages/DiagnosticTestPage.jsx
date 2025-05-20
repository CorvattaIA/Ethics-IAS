import React, { useState, useEffect, useCallback } from 'react';
    import { useNavigate, useLocation } from 'react-router-dom';
    import { Button } from '@/components/ui/button';
    import { Progress } from '@/components/ui/progress'; 
    import { toast } from '@/components/ui/use-toast';
    import { ArrowLeft, ArrowRight } from 'lucide-react';
    import { supabase } from '@/lib/supabaseClient';

    import { questions } from '@/data/diagnosticTestData';
    import { getRecommendedServices } from '@/lib/diagnosticUtils';

    import DiagnosticQuestionDisplay from '@/components/diagnostic/DiagnosticQuestionDisplay';
    import DiagnosticResultsDisplay from '@/components/diagnostic/DiagnosticResultsDisplay';
    import DiagnosticProcessingScreen from '@/components/diagnostic/DiagnosticProcessingScreen';
    import DiagnosticConsentPrompt from '@/components/diagnostic/DiagnosticConsentPrompt';

    const DiagnosticTestPage = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
      const [answers, setAnswers] = useState({});
      const [showResults, setShowResults] = useState(false);
      const [recommendedServices, setRecommendedServices] = useState([]);
      const [isProcessing, setIsProcessing] = useState(false);
      const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
      const [privacyConsentGiven, setPrivacyConsentGiven] = useState(false);

      useEffect(() => {
        const consent = localStorage.getItem('privacyConsentForTest');
        if (consent === 'true') {
          setPrivacyConsentGiven(true);
        } else if (location.state?.from !== '/privacy-policy') {
          setIsPrivacyModalOpen(true);
        }
      }, [location.state]);

      const handlePrivacyAccept = useCallback(() => {
        localStorage.setItem('privacyConsentForTest', 'true');
        setPrivacyConsentGiven(true);
        setIsPrivacyModalOpen(false);
      }, []);

      const handleAnswerChange = useCallback((questionId, value) => {
        setAnswers(prev => ({ ...prev, [questionId]: value }));
        if (window.navigator.vibrate) window.navigator.vibrate(20);
      }, []);

      const handleSubmit = useCallback(async () => {
        setIsProcessing(true);
        const recommendations = getRecommendedServices(answers);
        setRecommendedServices(recommendations);

        const storedUser = JSON.parse(localStorage.getItem('chatUser'));
        const sessionId = localStorage.getItem('chatSessionId');
        
        const { error } = await supabase
          .from('diagnostic_responses')
          .insert([{ 
            user_id: storedUser?.id || null, 
            session_id: sessionId,
            answers: answers, 
            recommended_services: recommendations.map(s => s.id) 
          }]);

        if (error) {
          console.error('Error saving diagnostic answers:', error);
          toast({ title: "Error al guardar", description: "No se pudieron guardar tus respuestas. Inténtalo de nuevo.", variant: "destructive" });
        } else {
          toast({ title: "Diagnóstico completado", description: "Tus respuestas han sido guardadas." });
        }
        
        localStorage.setItem('diagnosticAnswers', JSON.stringify(answers));
        localStorage.setItem('recommendedServices', JSON.stringify(recommendations.map(s => s.id)));

        setTimeout(() => {
          setShowResults(true);
          setIsProcessing(false);
        }, 2500);
      }, [answers]);

      const nextQuestion = useCallback(() => {
        if (!answers[questions[currentQuestionIndex].id]) {
          toast({ title: "Respuesta requerida", description: "Por favor, selecciona una opción.", variant: "destructive" });
          return;
        }
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex(prev => prev + 1);
        } else {
          handleSubmit();
        }
      }, [answers, currentQuestionIndex, handleSubmit]);

      const prevQuestion = useCallback(() => {
        if (currentQuestionIndex > 0) {
          setCurrentQuestionIndex(prev => prev - 1);
        }
      }, [currentQuestionIndex]);

      useEffect(() => {
        const handleKeyDown = (event) => {
          if (!privacyConsentGiven || isProcessing || showResults) return;
          if (event.key === 'ArrowRight') nextQuestion();
          else if (event.key === 'ArrowLeft') prevQuestion();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
      }, [nextQuestion, prevQuestion, privacyConsentGiven, isProcessing, showResults]);

      if (!privacyConsentGiven) {
        return (
          <DiagnosticConsentPrompt 
            isPrivacyModalOpen={isPrivacyModalOpen}
            setIsPrivacyModalOpen={setIsPrivacyModalOpen}
            handlePrivacyAccept={handlePrivacyAccept}
            locationStateFrom={location.state?.from}
          />
        );
      }

      if (isProcessing) {
        return <DiagnosticProcessingScreen answersCount={Object.keys(answers).length} />;
      }

      if (showResults) {
        return <DiagnosticResultsDisplay recommendedServices={recommendedServices} answers={answers} />;
      }

      const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100;
      const currentQuestionData = questions[currentQuestionIndex];

      return (
        <div className="max-w-2xl mx-auto p-element-padding bg-brand-deep-indigo/80 rounded-xl shadow-2xl border-2 border-brand-orange-red/50">
          <div className="mb-element-margin-v">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-brand-light-text/80">Pregunta {currentQuestionIndex + 1} de {questions.length}</p>
              <p className="text-sm font-semibold text-brand-warm-orange">{currentQuestionData.category}</p>
            </div>
            <Progress value={progressValue} className="w-full h-3 [&>*]:bg-gradient-to-r [&>*]:from-progress-start [&>*]:to-progress-end transition-all duration-300 ease-out" />
          </div>

          <DiagnosticQuestionDisplay
            currentQuestion={currentQuestionData}
            answers={answers}
            handleAnswerChange={handleAnswerChange}
          />

          <div className="mt-element-margin-v pt-element-margin-v border-t border-brand-light-text/20 flex justify-between items-center">
            <Button 
              onClick={prevQuestion} 
              disabled={currentQuestionIndex === 0}
              variant="outline"
              className="border-brand-warm-orange text-brand-warm-orange hover:bg-brand-warm-orange hover:text-brand-deep-indigo min-h-button-mobile md:min-h-button-desktop group"
            >
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" /> Anterior
            </Button>
            <Button 
              onClick={nextQuestion}
              className="bg-brand-vibrant-red hover:bg-brand-orange-red text-brand-light-text min-h-button-mobile md:min-h-button-desktop group"
            >
              {currentQuestionIndex === questions.length - 1 ? 'Finalizar' : 'Siguiente'} 
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      );
    };

    export default DiagnosticTestPage;