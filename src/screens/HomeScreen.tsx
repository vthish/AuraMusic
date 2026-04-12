import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Colors } from '../theme/colors';
import { GlobalStyles } from '../theme/styles';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Track } from '../types';

// Mock track data for testing playback
const MOCK_TRACK: Track = {
  id: '1',
  title: 'Sample Track',
  artist: 'Aura Artist',
  albumArt: 'https://via.placeholder.com/150',
  uri: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', // Online sample MP3
  duration: 300000,
};

const HomeScreen = () => {
  const { playTrack, playerStatus } = useAudioPlayer();

  return (
    <SafeAreaView style={GlobalStyles.container}>
      <View style={styles.content}>
        <Text style={GlobalStyles.heading}>AuraMusic</Text>
        
        <View style={GlobalStyles.glassCard}>
          <Text style={styles.trackTitle}>{MOCK_TRACK.title}</Text>
          <Text style={styles.artistName}>{MOCK_TRACK.artist}</Text>
          
          {/* Play Button */}
          <TouchableOpacity 
            style={styles.playButton} 
            onPress={() => playTrack(MOCK_TRACK)}
          >
            <Text style={styles.buttonText}>
              {playerStatus.isPlaying ? 'PLAYING...' : 'PLAY NOW'}
            </Text>
          </TouchableOpacity>
        </View>

        {playerStatus.currentTrack && (
          <Text style={styles.statusText}>
            Now Playing: {playerStatus.currentTrack.title}
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  content: { padding: 20, paddingTop: 40 },
  trackTitle: { color: Colors.textPrimary, fontSize: 18, fontWeight: 'bold' },
  artistName: { color: Colors.textSecondary, fontSize: 14, marginBottom: 20 },
  playButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
  },
  buttonText: { color: Colors.textPrimary, fontWeight: 'bold' },
  statusText: { color: Colors.primary, marginTop: 20, textAlign: 'center' }
});

export default HomeScreen;