import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import type { RouteProp } from '@react-navigation/native'; // Correct type import
import HomeScreen from '../screens/HomeScreen';
import ChapterScreen from '../screens/ChapterScreen';
import VersesScreen from '../screens/VersesScreen';
import SearchScreen from '../screens/SearchScreen';
import { useTheme } from '../context/ThemeContext';
import Icon from 'react-native-vector-icons/MaterialIcons';


const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#6200ee' }, headerTintColor: '#fff' }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Chapter" component={ChapterScreen} />
    <Stack.Screen name="Verses" component={VersesScreen} />
  </Stack.Navigator>
);

const MainNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <NavigationContainer theme={{ colors: { background: isDarkMode ? '#121212' : '#fff' } }}>
      <Tab.Navigator
        screenOptions={({ route }: { route: RouteProp<Record<string, object | undefined>, string> }) => ({
          tabBarIcon: ({ color, size }: { color: string; size: number }) => {
            let iconName: string = '';
            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Search') iconName = 'search';
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarStyle: { backgroundColor: isDarkMode ? '#121212' : '#fff' },
          tabBarActiveTintColor: '#6200ee',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
        <Tab.Screen name="Search" component={SearchScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;