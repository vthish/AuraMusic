import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import { Colors } from '../theme/colors';

// Initialize the bottom tab navigator
const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.surface, // Use premium surface color
          borderTopColor: 'transparent',
          height: 65,
          paddingBottom: 10,
        },
        tabBarActiveTintColor: Colors.primary, // Spotify-like green
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Home' }}
      />
      {/* Search and Library tabs can be added here later */}
    </Tab.Navigator>
  );
};

export default MainTabNavigator;