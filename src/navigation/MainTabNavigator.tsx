import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import { Colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { 
          backgroundColor: Colors.background, 
          borderTopColor: 'rgba(255,255,255,0.05)',
          paddingBottom: 5,
          height: 60
        },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Ionicons name="home-sharp" size={24} color={color} /> 
        }} 
      />
      <Tab.Screen 
        name="Search" 
        component={SearchScreen} 
        options={{ 
          tabBarIcon: ({ color }) => <Ionicons name="search-sharp" size={24} color={color} /> 
        }} 
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;