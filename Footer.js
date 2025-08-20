import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const FooterContainer = styled.footer`
  background: ${theme.colors.surface};
  border-top: 1px solid ${theme.colors.border};
  padding: 2rem;
  margin-top: auto;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

const FooterText = styled.p`
  color: ${theme.colors.textSecondary};
  font-size: 0.875rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>
          © 2024 Healthcare Translation App. Built with React and Flask.
        </FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
