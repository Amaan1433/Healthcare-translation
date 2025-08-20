import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Container = styled.div`
  background: ${theme.colors.background};
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
`;

const Title = styled.h3`
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const HistoryItem = styled.div`
  border: 1px solid ${theme.colors.border};
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const OriginalText = styled.p`
  color: ${theme.colors.text};
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const TranslatedText = styled.p`
  color: ${theme.colors.textSecondary};
  margin-bottom: 0.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: ${theme.colors.textTertiary};
`;

const SpeakButton = styled.button`
  background: ${theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 0.75rem;
  cursor: pointer;
  
  &:hover {
    background: ${theme.colors.secondaryDark};
  }
`;

const SessionHistory = ({ translations, onSpeak, onDelete }) => {
  if (!translations || translations.length === 0) {
    return (
      <Container>
        <Title>Translation History</Title>
        <p style={{ color: theme.colors.textSecondary, textAlign: 'center' }}>
          No translations yet. Start translating to see your history here.
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Title>Translation History ({translations.length})</Title>
      {translations.map((translation) => (
        <HistoryItem key={translation.id}>
          <OriginalText>
            <strong>Original:</strong> {translation.original}
          </OriginalText>
          <TranslatedText>
            <strong>Translation:</strong> {translation.translated}
          </TranslatedText>
          <MetaInfo>
            <span>
              {translation.sourceLanguage} → {translation.targetLanguage}
              {translation.medicalContext && ` • ${translation.medicalContext}`}
            </span>
            <div>
              <SpeakButton onClick={() => onSpeak(translation.translated)}>
                Speak
              </SpeakButton>
            </div>
          </MetaInfo>
        </HistoryItem>
      ))}
    </Container>
  );
};

export default SessionHistory;
