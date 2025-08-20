import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: ${theme.colors.text};
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

const MedicalContextSelector = ({ value, onChange, contexts }) => {
  return (
    <Container>
      <Label>Medical Context (Optional):</Label>
      <Select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">Select context...</option>
        {Object.entries(contexts).map(([key, description]) => (
          <option key={key} value={key}>{description}</option>
        ))}
      </Select>
    </Container>
  );
};

export default MedicalContextSelector;
