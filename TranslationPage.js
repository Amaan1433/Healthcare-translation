import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useQuery } from 'react-query';
import toast from 'react-hot-toast';

// Components
import SpeechRecorder from '../components/SpeechRecorder';
import TranslationDisplay from '../components/TranslationDisplay';
import LanguageSelector from '../components/LanguageSelector';
import MedicalContextSelector from '../components/MedicalContextSelector';
import SessionHistory from '../components/SessionHistory';
import LoadingSpinner from '../components/LoadingSpinner';

// Services
import { translationAPI, speechAPI, apiUtils } from '../services/api';

// Theme
import { theme, media } from '../styles/theme';

const TranslationPage = () => {
  // State
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [medicalContext, setMedicalContext] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [currentTranslation, setCurrentTranslation] = useState('');

  // Refs
  const audioRef = useRef(null);

  // Fetch supported languages
  const { data: languages, isLoading: languagesLoading } = useQuery(
    'languages',
    () => translationAPI.getLanguages(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Fetch medical contexts
  const { data: medicalContexts, isLoading: contextsLoading } = useQuery(
    'medicalContexts',
    () => translationAPI.getMedicalContexts(),
    {
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  // Handle speech recording start
  const handleRecordingStart = () => {
    setIsRecording(true);
    setCurrentTranscript('');
    setCurrentTranslation('');
  };

  // Handle speech recording stop
  const handleRecordingStop = async (audioBlob) => {
    setIsRecording(false);
    
    if (!audioBlob) {
      toast.error('No audio recorded');
      return;
    }

    try {
      // Convert blob to file
      const audioFile = new File([audioBlob], 'recording.wav', {
        type: 'audio/wav',
      });

      // Speech to text
      const sttResponse = await speechAPI.speechToText(audioFile, sourceLanguage);
      
      if (sttResponse.data.success) {
        const transcript = sttResponse.data.text;
        setCurrentTranscript(transcript);
        
        // Auto-translate if transcript is not empty
        if (transcript.trim()) {
          await translateText(transcript);
        }
      } else {
        toast.error(sttResponse.data.error || 'Speech recognition failed');
      }
    } catch (error) {
      console.error('Speech processing error:', error);
      toast.error('Failed to process speech');
    }
  };

  // Translate text
  const translateText = async (text) => {
    if (!text.trim()) {
      toast.error('Please enter text to translate');
      return;
    }

    setIsTranslating(true);

    try {
      const response = await translationAPI.translate({
        text: text.trim(),
        source_language: sourceLanguage,
        target_language: targetLanguage,
        medical_context: medicalContext || undefined,
        session_id: sessionId,
      });

      if (response.data.success) {
        const translation = response.data.translated_text;
        setCurrentTranslation(translation);
        
        // Update session ID if it's a new session
        if (response.data.session_id && !sessionId) {
          setSessionId(response.data.session_id);
        }

        // Add to history
        const newTranslation = {
          id: Date.now(),
          original: text,
          translated: translation,
          sourceLanguage,
          targetLanguage,
          medicalContext,
          timestamp: new Date().toISOString(),
          confidence: response.data.confidence_score,
          processingTime: response.data.processing_time,
        };

        setTranslationHistory(prev => [newTranslation, ...prev]);

        toast.success('Translation completed!');
      } else {
        toast.error(response.data.error || 'Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      toast.error('Translation failed');
    } finally {
      setIsTranslating(false);
    }
  };

  // Handle text input change
  const handleTextChange = (text) => {
    setCurrentTranscript(text);
  };

  // Handle manual translation
  const handleManualTranslate = () => {
    if (currentTranscript.trim()) {
      translateText(currentTranscript);
    }
  };

  // Handle text-to-speech
  const handleSpeak = async (text) => {
    if (!text.trim()) {
      toast.error('No text to speak');
      return;
    }

    try {
      const response = await speechAPI.textToSpeech({
        text: text.trim(),
        language: targetLanguage,
      });

      if (response.data.success) {
        await apiUtils.playAudio(response.data.audio_data);
      } else {
        toast.error(response.data.error || 'Text-to-speech failed');
      }
    } catch (error) {
      console.error('Text-to-speech error:', error);
      toast.error('Failed to play audio');
    }
  };

  // Handle language swap
  const handleLanguageSwap = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setCurrentTranscript('');
    setCurrentTranslation('');
  };

  // Handle session clear
  const handleClearSession = () => {
    setSessionId(null);
    setTranslationHistory([]);
    setCurrentTranscript('');
    setCurrentTranslation('');
    toast.success('Session cleared');
  };

  // Handle session delete
  const handleDeleteSession = async () => {
    if (!sessionId) return;

    try {
      await translationAPI.deleteSession(sessionId);
      handleClearSession();
      toast.success('Session deleted');
    } catch (error) {
      console.error('Delete session error:', error);
      toast.error('Failed to delete session');
    }
  };

  if (languagesLoading || contextsLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Helmet>
        <title>Healthcare Translation - Real-time Medical Translation</title>
        <meta name="description" content="Real-time healthcare translation with AI-powered speech recognition and medical context awareness" />
      </Helmet>

      <PageContainer>
        <PageHeader>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Healthcare Translation
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Real-time multilingual translation for healthcare professionals and patients
          </motion.p>
        </PageHeader>

        <MainContent>
          <TranslationSection>
            <ControlsPanel>
              <LanguageSelector
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                onSourceChange={setSourceLanguage}
                onTargetChange={setTargetLanguage}
                onSwap={handleLanguageSwap}
                languages={languages?.data?.languages || {}}
              />

              <MedicalContextSelector
                value={medicalContext}
                onChange={setMedicalContext}
                contexts={medicalContexts?.data?.medical_contexts || {}}
              />

              <SessionControls>
                <ClearButton onClick={handleClearSession}>
                  Clear Session
                </ClearButton>
                {sessionId && (
                  <DeleteButton onClick={handleDeleteSession}>
                    Delete Session
                  </DeleteButton>
                )}
              </SessionControls>
            </ControlsPanel>

            <TranslationInterface>
              <SpeechRecorder
                isRecording={isRecording}
                onRecordingStart={handleRecordingStart}
                onRecordingStop={handleRecordingStop}
                disabled={isTranslating}
              />

              <TranslationDisplay
                originalText={currentTranscript}
                translatedText={currentTranslation}
                onTextChange={handleTextChange}
                onTranslate={handleManualTranslate}
                onSpeak={handleSpeak}
                isTranslating={isTranslating}
                sourceLanguage={sourceLanguage}
                targetLanguage={targetLanguage}
                medicalContext={medicalContext}
              />
            </TranslationInterface>
          </TranslationSection>

          <SessionHistory
            translations={translationHistory}
            onSpeak={handleSpeak}
            onDelete={(id) => {
              setTranslationHistory(prev => prev.filter(t => t.id !== id));
            }}
          />
        </MainContent>
      </PageContainer>
    </>
  );
};

// Styled Components
const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%);
  padding: ${theme.spacing.lg};
  
  ${media.md} {
    padding: ${theme.spacing.xl};
  }
`;

const PageHeader = styled.div`
  text-align: center;
  margin-bottom: ${theme.spacing.xl};
  
  h1 {
    font-size: ${theme.typography.fontSize['4xl']};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.text};
    margin-bottom: ${theme.spacing.md};
    
    ${media.md} {
      font-size: ${theme.typography.fontSize['5xl']};
    }
  }
  
  p {
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.textSecondary};
    max-width: 600px;
    margin: 0 auto;
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const TranslationSection = styled.div`
  background: ${theme.colors.background};
  border-radius: ${theme.borderRadius.xl};
  box-shadow: ${theme.shadows.lg};
  overflow: hidden;
  margin-bottom: ${theme.spacing.xl};
`;

const ControlsPanel = styled.div`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
  background: ${theme.colors.surface};
  
  ${media.md} {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: ${theme.spacing.lg};
    align-items: center;
  }
`;

const SessionControls = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  justify-content: center;
  
  ${media.md} {
    justify-content: flex-end;
  }
`;

const ClearButton = styled.button`
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  color: ${theme.colors.textSecondary};
  font-size: ${theme.typography.fontSize.sm};
  font-weight: ${theme.typography.fontWeight.medium};
  transition: all ${theme.transitions.base};
  
  &:hover {
    background: ${theme.colors.surfaceHover};
    border-color: ${theme.colors.primary};
    color: ${theme.colors.primary};
  }
`;

const DeleteButton = styled(ClearButton)`
  background: ${theme.colors.error};
  border-color: ${theme.colors.error};
  color: ${theme.colors.textInverse};
  
  &:hover {
    background: ${theme.colors.error};
    border-color: ${theme.colors.error};
    color: ${theme.colors.textInverse};
    opacity: 0.8;
  }
`;

const TranslationInterface = styled.div`
  padding: ${theme.spacing.xl};
  
  ${media.md} {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: ${theme.spacing.xl};
    align-items: start;
  }
`;

export default TranslationPage;
