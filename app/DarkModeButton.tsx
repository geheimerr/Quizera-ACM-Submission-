import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../app/darkmode';

export function DarkModeButton() {
    const { isDarkMode, toggleTheme, theme } = useTheme();

    return (
        <TouchableOpacity
            style={styles.button}
            onPress={toggleTheme}
            accessibilityLabel="Toggle dark mode"
        >
            <Ionicons
                name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
                size={24}
                color={theme.headerText}
            />
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    button: {
        padding: 8,
    }
});