import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext';
import { Layout } from '../components/Layout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';

function PrivateRoute({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/" replace />;
}

interface AppRoutesProps {
  toggleTheme: () => void;
}

export function AppRoutes({toggleTheme}: AppRoutesProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout toggleTheme={toggleTheme} />}>
          
          <Route path="/" element={<Login />} />

          <Route 
            path="/home" 
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            } 
          />

        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}