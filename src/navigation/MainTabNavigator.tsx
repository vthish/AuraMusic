import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import FloatingPlayer from '../components/FloatingPlayer';
import { Colors } from '../theme/colors';
import { usePlayerContext } from '../context/PlayerContext';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { setPlayerVisible } = usePlayerContext();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.surface, borderTopColor: 'transparent', height: 65 },
          tabBarActiveTintColor: Colors.primary,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>
      <FloatingPlayer onPress={() => setPlayerVisible(true)} />
    </View>
  );
};

export default MainTabNavigator;