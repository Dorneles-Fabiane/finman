import { Outlet, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { api } from '../../services/api';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
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

const Actions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Button = styled.button`
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

const LogoutButton = styled(Button)`
  border-color: #ff4d4f;
  color: #ff4d4f;

  &:hover {
    background-color: #ff4d4f;
    color: #ffffff;
  }
`;

interface LayoutProps {
  toggleTheme: () => void;
}

export function Layout({ toggleTheme }: LayoutProps) {
  const navigate = useNavigate();
  const token = localStorage.getItem('@finman:token');

  const handleLogout = () => {
    const refreshToken = localStorage.getItem('@finman:refreshToken')
    api.post('auth/logout', {refreshToken: refreshToken})

    localStorage.removeItem('@finman:token');
    localStorage.removeItem('@finman:refreshToken');
    navigate('/', { replace: true });
  };

  return (
    <Container>
      <Header>
        <Logo>FinMan</Logo>
        
        <Actions>
          <Button onClick={toggleTheme}>Alternar Tema</Button>
          
          {token && (
            <LogoutButton onClick={handleLogout}>Sair</LogoutButton>
          )}
        </Actions>
      </Header>

      {/* O Outlet injeta a página atual (Login ou Home) mantendo o Header fixo */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>
    </Container>
  );
}