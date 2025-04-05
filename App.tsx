import React from 'react';
import { SafeAreaView, StatusBar, View, StyleSheet, Platform } from 'react-native';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
        backgroundColor="#121212"
      />
      <View style={styles.container}>
        <MainNavigator />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark mode background for better readability
  },
  container: {
    flex: 1,
    backgroundColor: '#fdfdfd', // Light inner container background
  },
});
