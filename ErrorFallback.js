import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 2rem;
  text-align: center;
  background: ${theme.colors.background};
`;

const ErrorTitle = styled.h1`
  color: ${theme.colors.error};
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 1.1rem;
  margin-bottom: 2rem;
  max-width: 600px;
`;

const RetryButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <ErrorContainer>
      <ErrorTitle>Something went wrong</ErrorTitle>
      <ErrorMessage>
        We're sorry, but something unexpected happened. Please try refreshing the page or contact support if the problem persists.
      </ErrorMessage>
      {process.env.NODE_ENV === 'development' && (
        <details style={{ marginBottom: '1rem', textAlign: 'left' }}>
          <summary>Error Details</summary>
          <pre style={{ color: theme.colors.error, fontSize: '0.875rem' }}>
            {error.message}
          </pre>
        </details>
      )}
      <RetryButton onClick={resetErrorBoundary}>
        Try Again
      </RetryButton>
    </ErrorContainer>
  );
};

export default ErrorFallback;
