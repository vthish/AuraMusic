import React from 'react';
import { View, Modal } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FullScreenPlayer from '../screens/FullScreenPlayer';
import FloatingPlayer from '../components/FloatingPlayer';
import { Colors } from '../theme/colors';
import { usePlayerContext } from '../context/PlayerContext';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
  const { isPlayerVisible, setPlayerVisible } = usePlayerContext();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { backgroundColor: Colors.surface, height: 65, borderTopWidth: 0 },
          tabBarActiveTintColor: Colors.primary,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={route.name === 'Home' ? 'home' : 'search'} size={size} color={color} />
          ),
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>

      <FloatingPlayer onPress={() => setPlayerVisible(true)} />

      <Modal visible={isPlayerVisible} animationType="slide" transparent={false}>
        <FullScreenPlayer onClose={() => setPlayerVisible(false)} />
      </Modal>
    </View>
  );
};

export default MainTabNavigator;