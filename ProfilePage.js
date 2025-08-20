import React from 'react';
import styled from 'styled-components';
import { theme } from '../styles/theme';

const ProfileContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${theme.colors.background} 0%, ${theme.colors.surface} 100%);
  padding: 2rem;
`;

const ProfileCard = styled.div`
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

const ProfilePage = () => {
  return (
    <ProfileContainer>
      <ProfileCard>
        <Title>Profile</Title>
        <p style={{ textAlign: 'center', color: theme.colors.textSecondary }}>
          Profile functionality coming soon...
        </p>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default ProfilePage;
