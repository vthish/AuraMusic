import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../theme/colors';
import { GlobalStyles } from '../theme/styles';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Track } from '../types';

const MOCK_TRACK: Track = {
  id: '1',
  title: 'Sample Track',
  artist: 'Aura Artist',
  albumArt: 'https://via.placeholder.com/150',
  uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
  duration: 300000,
};

const HomeScreen = () => {
  const { playTrack, playerStatus } = useAudioPlayer();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={{ padding: 20, paddingTop: 40 }}>
        <Text style={GlobalStyles.heading}>AuraMusic</Text>
        <View style={GlobalStyles.glassCard}>
          <Text style={{ color: Colors.textPrimary, fontWeight: 'bold' }}>{MOCK_TRACK.title}</Text>
          <Text style={{ color: Colors.textSecondary }}>{MOCK_TRACK.artist}</Text>
          <TouchableOpacity 
            style={{ backgroundColor: Colors.primary, padding: 15, borderRadius: 30, marginTop: 20, alignItems: 'center' }} 
            onPress={() => playTrack(MOCK_TRACK)}
          >
            <Text style={{ color: 'white', fontWeight: 'bold' }}>
              {playerStatus.isPlaying ? 'PLAYING...' : 'PLAY NOW'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;