import React from 'react';
import { Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <Button
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            onPress={toggleTheme}
        />
    );
};

export default ThemeToggle;