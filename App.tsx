import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import FloatingPlayer from './src/components/FloatingPlayer';
import { PlayerProvider } from './src/context/PlayerContext';
import MainTabNavigator from './src/navigation/MainTabNavigator';

export default function App() {
  const handlePlayerPress = () => {
    // Logic for opening full screen player
    console.log('Floating Player Pressed');
  };

  return (
    <PlayerProvider>
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <NavigationContainer>
          <MainTabNavigator />
        </NavigationContainer>
        
        {/* Floating player stays visible globally */}
        <FloatingPlayer onPress={handlePlayerPress} />
      </View>
    </PlayerProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});