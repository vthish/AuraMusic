import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../theme/colors';
import { usePlayerContext } from '../context/PlayerContext';

interface FloatingPlayerProps {
  onPress: () => void;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ onPress }) => {
  const { playerStatus } = usePlayerContext();

  if (!playerStatus.currentTrack) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.trackInfo}>
        <Image source={{ uri: playerStatus.currentTrack.albumArt }} style={styles.albumArt} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{playerStatus.currentTrack.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{playerStatus.currentTrack.artist}</Text>
        </View>
      </View>
      <View style={styles.playButton}>
        <Text style={{ color: Colors.primary, fontWeight: 'bold' }}>
          {playerStatus.isPlaying ? 'PAUSE' : 'PLAY'}
        </Text>
      </View>
    </TouchableOpacity>
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
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    elevation: 5,
  },
  trackInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  albumArt: { width: 45, height: 45, borderRadius: 8, marginRight: 12 },
  title: { color: Colors.textPrimary, fontSize: 14, fontWeight: 'bold' },
  artist: { color: Colors.textSecondary, fontSize: 12 },
  playButton: { padding: 10 },
});

export default FloatingPlayer;