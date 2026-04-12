import React from 'react';
import { View, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FloatingPlayer from '../components/FloatingPlayer'; // Import the player
import { Colors } from '../theme/colors';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: Colors.surface,
            borderTopColor: 'transparent',
            height: 65,
          },
          tabBarActiveTintColor: Colors.primary,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>

      {/* Floating Player sits on top of the tab bar */}
      <FloatingPlayer />
    </View>
  );
};

export default MainTabNavigator;