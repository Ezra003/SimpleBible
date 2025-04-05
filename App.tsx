import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import MainNavigator from './navigation/MainNavigator';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <MainNavigator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Darker background color for the entire app
  },
});
