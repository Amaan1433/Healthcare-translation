import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid ${theme.colors.border};
  border-radius: 0.5rem;
  font-size: 1rem;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const SwapButton = styled.button`
  background: ${theme.colors.secondary};
  color: white;
  border: none;
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${theme.colors.secondaryDark};
  }
`;

const LanguageSelector = ({
  sourceLanguage,
  targetLanguage,
  onSourceChange,
  onTargetChange,
  onSwap,
  languages
}) => {
  return (
    <Container>
      <div>
        <label>From:</label>
        <Select value={sourceLanguage} onChange={(e) => onSourceChange(e.target.value)}>
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </Select>
      </div>
      
      <SwapButton onClick={onSwap}>⇄</SwapButton>
      
      <div>
        <label>To:</label>
        <Select value={targetLanguage} onChange={(e) => onTargetChange(e.target.value)}>
          {Object.entries(languages).map(([code, name]) => (
            <option key={code} value={code}>{name}</option>
          ))}
        </Select>
      </div>
    </Container>
  );
};

export default LanguageSelector;
