import type { DefaultTheme } from 'styled-components';

export const lightTheme: DefaultTheme = {
 name: 'light',
  colors: {
    background: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    border: '#e2e8f0',
    accent: '#2563eb',
  },   
}

export const darkTheme: DefaultTheme = {
    name: 'dark',
    colors: {
    background: '#0e0e11',
    surface: '#18181b',
    text: '#fafafa',
    border: '#27272a',
    accent: '#3b82f6',
  },
}


export const themes = {
    light: lightTheme,
    dark: darkTheme
}

export type ThemeName = 'light' | 'dark';