import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { themes, type ThemeName } from './styles/themes';
import { GlobalStyle } from './styles/global';
import { AppRoutes } from './routes';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('dark');

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyle />
      <AppRoutes toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}