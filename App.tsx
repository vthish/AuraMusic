import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { StatusBar } from 'expo-status-bar';

// Main entry point of the AuraMusic application
export default function App() {
  return (
    <NavigationContainer>
      {/* Set status bar to light to match our dark theme */}
      <StatusBar style="light" />
      <MainTabNavigator />
    </NavigationContainer>
  );
}