import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const HistoryContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%);
  padding: 2rem;
`;

const HistoryCard = styled.div`
  background: ${theme.colors.background};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`;

const Title = styled.h1`
  text-align: center;
  color: ${theme.colors.text};
  margin-bottom: 2rem;
`;

const HistoryPage = () => {
  return (
    <HistoryContainer>
      <HistoryCard>
        <Title>Translation History</Title>
        <p style={{ textAlign: 'center', color: theme.colors.textSecondary }}>
          History functionality coming soon...
        </p>
      </HistoryCard>
    </HistoryContainer>
  );
};

export default HistoryPage;
