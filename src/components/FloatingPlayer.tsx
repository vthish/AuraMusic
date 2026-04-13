import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePlayerContext } from '../context/PlayerContext';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Colors } from '../theme/colors';

interface FloatingPlayerProps {
  onPress: () => void;
}

const FloatingPlayer: React.FC<FloatingPlayerProps> = ({ onPress }) => {
  const { playerStatus } = usePlayerContext();
  const { togglePlayback } = useAudioPlayer();

  // If no track, don't show the player bar
  if (!playerStatus?.currentTrack) return null;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.9}>
      <View style={styles.trackInfo}>
        <Image source={{ uri: playerStatus.currentTrack.albumArt }} style={styles.albumArt} />
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{playerStatus.currentTrack.title}</Text>
          <Text style={styles.artist} numberOfLines={1}>{playerStatus.currentTrack.artist}</Text>
        </View>
      </View>
      
      <TouchableOpacity onPress={togglePlayback} style={styles.playButton}>
        <Ionicons 
          name={playerStatus?.isPlaying ? "pause" : "play"} 
          size={28} 
          color={Colors.primary} 
        />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 65,
    width: '100%',
    height: 70,
    backgroundColor: Colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  trackInfo: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  albumArt: { width: 45, height: 45, borderRadius: 8, marginRight: 12 },
  title: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  artist: { color: Colors.textSecondary, fontSize: 12 },
  playButton: { padding: 10 },
});

export default FloatingPlayer;