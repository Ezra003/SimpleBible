import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import ChapterScreen from '../screens/ChapterScreen';
import VersesScreen from '../screens/VersesScreen';

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Chapter" component={ChapterScreen} />
        <Stack.Screen name="Verses" component={VersesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;