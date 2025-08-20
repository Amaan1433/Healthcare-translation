import React from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { theme } from '../styles/theme';

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: ${theme.colors.background};
  border-bottom: 1px solid ${theme.colors.border};
  z-index: 1000;
  padding: 1rem 2rem;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${theme.colors.primary};
  text-decoration: none;
  
  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

const Nav = styled.nav`
  display: flex;
  gap: 2rem;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: ${theme.colors.textSecondary};
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const AuthButton = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
  
  &:hover {
    background: ${theme.colors.primaryDark};
  }
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Username = styled.span`
  color: ${theme.colors.text};
  font-weight: 500;
`;

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">Healthcare Translation</Logo>
        
        <Nav>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/translate">Translate</NavLink>
          
          {user ? (
            <>
              <NavLink to="/history">History</NavLink>
              <UserInfo>
                <Username>Welcome, {user.username}</Username>
                <AuthButton onClick={handleLogout}>Logout</AuthButton>
              </UserInfo>
            </>
          ) : (
            <>
              <NavLink to="/login">Login</NavLink>
              <AuthButton as={Link} to="/register">Register</AuthButton>
            </>
          )}
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
