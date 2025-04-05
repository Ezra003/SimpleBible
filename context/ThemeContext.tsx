import React, { createContext, useState, useContext } from 'react';

interface ThemeContextType {
    isDarkMode: boolean;
    toggleTheme: () => void;
    colors: { background: string; text: string };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    const toggleTheme = () => setIsDarkMode(prev => !prev);

    const colors = isDarkMode
        ? { background: '#121212', text: '#ffffff' }
        : { background: '#ffffff', text: '#000000' };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, colors }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within a ThemeProvider');
    return context;
};