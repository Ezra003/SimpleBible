import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ChapterScreen from '../screens/ChapterScreen';
import VersesScreen from '../screens/VersesScreen';
import { COLORS } from '../theme';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Books' }} />
        <Stack.Screen name="Chapter" component={ChapterScreen} options={{ title: 'Chapters' }} />
        <Stack.Screen name="Verses" component={VersesScreen} options={{ title: 'Verses' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;