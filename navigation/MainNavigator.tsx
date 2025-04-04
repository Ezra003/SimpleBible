// navigation/MainNavigator.tsx

import React from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  Theme,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import ChapterScreen from '../screens/ChapterScreen';
import VersesScreen from '../screens/VersesScreen';

// Navigation parameter types
export type RootStackParamList = {
  Home: undefined;
  Chapter: { chapterId: string }; // chapterId = Book name
  Verses: { chapterId: string; verseId?: string }; // verseId = Chapter number as string
};

// Create stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Optional custom theme
const MyTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
  },
};

const MainNavigator: React.FC = () => {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: true,
          headerStyle: {
            backgroundColor: '#f5f5f5',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 18,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Chapter"
          component={ChapterScreen}
          options={{ title: 'Chapters' }}
        />
        <Stack.Screen
          name="Verses"
          component={VersesScreen}
          options={{ title: 'Verses' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
