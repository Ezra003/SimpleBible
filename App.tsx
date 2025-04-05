import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import MainNavigator from './navigation/MainNavigator';
import { BookmarkProvider } from './context/BookmarkContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
    return (
        <ThemeProvider>
            <BookmarkProvider>
                <StatusBar style="auto" />
                <MainNavigator />
            </BookmarkProvider>
        </ThemeProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
