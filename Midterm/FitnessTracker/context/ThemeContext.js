import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const theme = {
    isDarkMode,
    colors: {
      background: isDarkMode ? '#121212' : '#f5f5f5',
      surface: isDarkMode ? '#1e1e1e' : '#ffffff',
      primary: '#6200ee',
      primaryVariant: isDarkMode ? '#9c47ff' : '#3700b3',
      text: isDarkMode ? '#ffffff' : '#000000',
      textSecondary: isDarkMode ? '#b3b3b3' : '#666666',
      border: isDarkMode ? '#333333' : '#e0e0e0',
      tabBar: isDarkMode ? '#1e1e1e' : '#ffffff',
      error: '#cf6679',
    },
  };

  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 