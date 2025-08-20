import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from 'react-error-boundary';
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorFallback from './components/ErrorFallback';

// Pages
import HomePage from './pages/HomePage';
import TranslationPage from './pages/TranslationPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';
import HistoryPage from './pages/HistoryPage';

// Context and Hooks
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { TranslationProvider } from './contexts/TranslationContext';

// Theme
import { theme } from './styles/theme';

// Global Styles
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }

  html {
    scroll-behavior: smooth;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    background: none;
    cursor: pointer;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
  }

  ::selection {
    background-color: ${props => props.theme.colors.primary};
    color: white;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.primary};
  }
`;

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 80px; // Account for fixed header
`;

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <LoadingSpinner />;
  }
  
  return user ? children : <Navigate to="/login" replace />;
};

// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Router>
              <AuthProvider>
                <TranslationProvider>
                  <AppContainer>
                    <Header />
                    <MainContent>
                      <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/translate" element={<TranslationPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route 
                          path="/profile" 
                          element={
                            <ProtectedRoute>
                              <ProfilePage />
                            </ProtectedRoute>
                          } 
                        />
                        <Route 
                          path="/history" 
                          element={
                            <ProtectedRoute>
                              <HistoryPage />
                            </ProtectedRoute>
                          } 
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                      </Routes>
                    </MainContent>
                    <Footer />
                    <Toaster
                      position="top-right"
                      toastOptions={{
                        duration: 4000,
                        style: {
                          background: '#363636',
                          color: '#fff',
                        },
                        success: {
                          duration: 3000,
                          iconTheme: {
                            primary: '#4ade80',
                            secondary: '#fff',
                          },
                        },
                        error: {
                          duration: 5000,
                          iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                          },
                        },
                      }}
                    />
                  </AppContainer>
                </TranslationProvider>
              </AuthProvider>
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
}

export default App;
