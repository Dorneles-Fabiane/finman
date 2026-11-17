import { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { themes, type ThemeName } from './styles/themes';
import { GlobalStyle } from './styles/global'; // ajuste o caminho se necessário
import { Home } from './pages/Home';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('dark');

  const toggleTheme = () => {
    setCurrentTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyle />
      <Home toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}