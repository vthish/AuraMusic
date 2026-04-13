import React from 'react';
import { View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { 
            backgroundColor: Colors.surface, 
            borderTopColor: 'transparent', 
            height: 65 
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors.textSecondary,
          // Correctly assign icons for each tab
          tabBarIcon: ({ color, size }) => {
            let iconName: any;
            if (route.name === 'Home') {
              iconName = 'home';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
      </Tab.Navigator>

      {/* FloatingPlayer now has enough space below it */}
      <FloatingPlayer onPress={() => setPlayerVisible(true)} />
    </View>
  );
};

export default MainTabNavigator;