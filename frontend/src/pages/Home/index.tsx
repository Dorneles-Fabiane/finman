import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1.5rem 5rem;
  box-sizing: border-box;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
`;

const Logo = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.accent};
  letter-spacing: -0.5px;
`;

const ThemeButton = styled.button`
  background-color: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  border: 1px solid ${({ theme }) => theme.colors.border};
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center; 
  align-items: center;     
  padding: 2rem;
  width: 100%;
`;

const LoginCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  margin-top: 5rem;
  padding: 2.5rem;
  border-radius: 12px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
  margin-bottom: 0.5rem;
  color: ${({ theme }) => theme.colors.text};
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.85rem;
    font-weight: 500;
    opacity: 0.9;
  }

  input {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    border: 1px solid ${({ theme }) => theme.colors.border};
    padding: 0.75rem 1rem;
    border-radius: 6px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.accent};
  color: #ffffff;
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
  transition: opacity 0.2s;
  margin-top: 0.5rem;

  &:hover {
    opacity: 0.9;
  }
`;

interface HomeProps {
  toggleTheme: () => void;
}

export function Home({ toggleTheme }: HomeProps) {
  return (
    <Container>
      <Header>
        <Logo>FinMan</Logo>
        <ThemeButton onClick={toggleTheme}>Alternar Tema</ThemeButton>
      </Header>

      <MainContent>
        <LoginCard>
          <Title>Acesso Administrativo</Title>
          
          <InputGroup>
            <label>E-mail</label>
            <input type="email5" placeholder="admin@finman.com" />
          </InputGroup>

          <InputGroup>
            <label>Senha</label>
            <input type="password" placeholder="••••••••" />
          </InputGroup>

          <SubmitButton>Entrar</SubmitButton>
        </LoginCard>
      </MainContent>
    </Container>
  );
}