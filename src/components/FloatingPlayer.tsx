import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../theme/colors';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

/**
 * Floating mini-player component shown across all tabs
 */
const FloatingPlayer = () => {
  const { playerStatus } = useAudioPlayer();

  // Return null if no track is currently selected to play
  if (!playerStatus.currentTrack) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.trackInfo}>
        <Image 
          source={{ uri: playerStatus.currentTrack.albumArt }} 
          style={styles.albumArt} 
        />
        <View>
          <Text style={styles.title} numberOfLines={1}>
            {playerStatus.currentTrack.title}
          </Text>
          <Text style={styles.artist} numberOfLines={1}>
            {playerStatus.currentTrack.artist}
          </Text>
        </View>
      </View>
      
      <TouchableOpacity style={styles.playButton}>
        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
          {playerStatus.isPlaying ? 'PAUSE' : 'PLAY'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0, 
    width: '100%',
    height: 70,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  trackInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  albumArt: {
    width: 45,
    height: 45,
    borderRadius: 8,
    marginRight: 12,
  },
  title: {
    color: Colors.textPrimary,
    fontSize: 14,
    fontWeight: 'bold',
  },
  artist: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  playButton: {
    padding: 10,
    marginLeft: 10,
  }
});

export default FloatingPlayer;