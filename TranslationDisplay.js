import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: 1rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primaryDark};
  }
  
  &:disabled {
    background: ${theme.colors.border};
    cursor: not-allowed;
  }
`;

const TranslationDisplay = ({
  originalText,
  translatedText,
  onTextChange,
  onTranslate,
  onSpeak,
  isTranslating,
  sourceLanguage,
  targetLanguage,
  medicalContext
}) => {
  return (
    <Container>
      <div>
        <h3>Original Text ({sourceLanguage})</h3>
        <TextArea
          value={originalText}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter text to translate or use voice recording..."
        />
      </div>
      
      <Button onClick={onTranslate} disabled={isTranslating || !originalText.trim()}>
        {isTranslating ? 'Translating...' : 'Translate'}
      </Button>
      
      <div>
        <h3>Translation ({targetLanguage})</h3>
        <TextArea
          value={translatedText}
          readOnly
          placeholder="Translation will appear here..."
        />
        {translatedText && (
          <Button onClick={() => onSpeak(translatedText)} style={{ marginTop: '0.5rem' }}>
            Speak Translation
          </Button>
        )}
      </div>
    </Container>
  );
};

export default TranslationDisplay;
