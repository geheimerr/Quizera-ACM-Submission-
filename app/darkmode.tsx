import React, { createContext, useState, useContext, ReactNode } from 'react';

type ThemeContextType = {
    isDarkMode: boolean;
    toggleTheme: () => void;
    theme: ThemeColors;
};

interface ThemeColors {
    background: string;
    headerBackground: string;
    headerText: string;
    headerSubtitle: string;
    cardBackground: string;
    primaryText: string;
    secondaryText: string;
    accentColor: string;
}

export const lightTheme: ThemeColors = {
    background: '#B257D1',
    headerBackground: '#1A1A1A',
    headerText: '#FFFFFF',
    headerSubtitle: '#CCCCCC',
    cardBackground: '#FFFFFF',
    primaryText: '#000000',
    secondaryText: '#666666',
    accentColor: '#6EE49B',
};

export const darkTheme: ThemeColors = {
    background: '#121212',
    headerBackground: '#000000',
    headerText: '#FFFFFF',
    headerSubtitle: '#AAAAAA',
    cardBackground: '#232323',
    primaryText: '#FFFFFF',
    secondaryText: '#BBBBBB',
    accentColor: '#4CAF78',
};

const ThemeContext = createContext<ThemeContextType>({
    isDarkMode: false,
    toggleTheme: () => {},
    theme: lightTheme,
});

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const theme = isDarkMode ? darkTheme : lightTheme;

    const toggleTheme = () => {
        setIsDarkMode(prevMode => !prevMode);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);