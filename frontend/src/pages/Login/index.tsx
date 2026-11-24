import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/authContext';
import { Navigate } from 'react-router-dom';

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  flex-direction: column;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const MainContent = styled.main`
  flex: 1;
  display: flex;
  justify-content: center; 
  align-items: center;     
  padding: 2rem;
  width: 100%;
`;

const LoginCard = styled.form`
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

const ErrorMessage = styled.p`
  color: #ff4d4f;
  font-size: 0.85rem;
  text-align: center;
  margin: 0;
`;

export function Login() {
  const { login, isLoading, isAuthenticated } = useAuth()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to="/home" replace />
  }

  async function handleLogin(e: React.SyntheticEvent) {
    e.preventDefault()
    setError('')

    try {
      await login({ email, password })
    } catch (err: any) {
      console.error(err)
      const message = err.response?.data?.message || 'Erro ao conectar com o servidor.'
      setError(Array.isArray(message) ? message[0] : message)
      }
  }

  return (
    <div>
      {isLoading ? (
        <Container>
          <MainContent>
            <Title style={{marginTop: '5rem'}}>Carregando...</Title>  
          </MainContent>
      </Container>
      ) : (
        <Container>
          <MainContent>
            <LoginCard onSubmit={handleLogin}>
              <Title>Acesso Administrativo</Title>
              
              <InputGroup>
                <label>E-mail</label>
                <input 
                  type="email" 
                  placeholder="admin@finman.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </InputGroup>

              <InputGroup>
                <label>Senha</label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>

              {error && <ErrorMessage>{error}</ErrorMessage>}

              <SubmitButton type="submit">Entrar</SubmitButton>
            </LoginCard>
          </MainContent>
        </Container>
      )}
    </div>
  )
}