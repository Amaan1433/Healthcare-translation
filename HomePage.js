import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { theme } from '../styles/theme';

const HomeContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%);
  padding: 2rem;
`;

const Hero = styled.div`
  text-align: center;
  padding: 4rem 0;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.25rem;
  color: ${theme.colors.textSecondary};
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  display: inline-block;
  background: ${theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const Features = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 4rem 0;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const FeatureCard = styled.div`
  background: ${theme.colors.background};
  padding: 2rem;
  border-radius: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${theme.colors.text};
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Healthcare Translation - AI-Powered Medical Translation</title>
        <meta name="description" content="Real-time healthcare translation with AI-powered speech recognition and medical context awareness" />
      </Helmet>

      <HomeContainer>
        <Hero>
          <Title>Healthcare Translation</Title>
          <Subtitle>
            Break down language barriers in healthcare with AI-powered real-time translation. 
            Connect healthcare professionals and patients across languages with confidence.
          </Subtitle>
          <CTAButton to="/translate">Start Translating</CTAButton>
        </Hero>

        <Features>
          <FeatureCard>
            <FeatureIcon>🎤</FeatureIcon>
            <FeatureTitle>Voice-to-Text</FeatureTitle>
            <FeatureDescription>
              Convert spoken words to text with high accuracy, especially optimized for medical terminology.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🌍</FeatureIcon>
            <FeatureTitle>Multi-Language Support</FeatureTitle>
            <FeatureDescription>
              Support for 20+ languages with specialized medical context awareness.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔊</FeatureIcon>
            <FeatureTitle>Text-to-Speech</FeatureTitle>
            <FeatureDescription>
              Hear translations spoken aloud with natural-sounding voice synthesis.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🏥</FeatureIcon>
            <FeatureTitle>Medical Context</FeatureTitle>
            <FeatureDescription>
              Specialized translation for symptoms, diagnosis, treatment, and medication.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>📱</FeatureIcon>
            <FeatureTitle>Mobile-First</FeatureTitle>
            <FeatureDescription>
              Responsive design optimized for mobile devices and desktop use.
            </FeatureDescription>
          </FeatureCard>

          <FeatureCard>
            <FeatureIcon>🔒</FeatureIcon>
            <FeatureTitle>Secure & Private</FeatureTitle>
            <FeatureDescription>
              HIPAA-compliant data handling with secure authentication and encryption.
            </FeatureDescription>
          </FeatureCard>
        </Features>
      </HomeContainer>
    </>
  );
};

export default HomePage;
