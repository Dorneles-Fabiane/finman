import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Login } from '../pages/Login';
import { Dashboard } from '../pages/Dashboard';
import type { JSX } from 'react/jsx-runtime';

function PrivateRoute({ children }: { children: JSX.Element }) {
  const token = localStorage.getItem('@finman:token');
  return token ? children : <Navigate to="/" replace />;
}

interface AppRoutesProps {
  toggleTheme: () => void;
}
export function AppRoutes({toggleTheme}: AppRoutesProps) {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout toggleTheme={toggleTheme} />}>
          
          {/* Rota pública de login */}
          <Route path="/" element={<Login />} />

          {/* Rota protegida da Home */}
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