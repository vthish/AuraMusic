// Important: This must be at the very top!
import 'react-native-gesture-handler'; 
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

// Internal Imports
import MainTabNavigator from './src/navigation/MainTabNavigator';
import { PlayerProvider } from './src/context/PlayerContext';

export default function App() {
  return (
    // 1. GestureHandler is required for the Slider and Swipe gestures to work
    <GestureHandlerRootView style={{ flex: 1 }}>
      {/* 2. SafeAreaProvider handles the notches and bottom bars on modern phones */}
      <SafeAreaProvider>
        {/* 3. PlayerProvider wraps everything so every screen can access the music player */}
        <PlayerProvider>
          <NavigationContainer>
            <StatusBar style="light" />
            <MainTabNavigator />
          </NavigationContainer>
        </PlayerProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}