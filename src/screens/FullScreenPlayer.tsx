import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React from 'react';
import { Dimensions, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { usePlayerContext } from '../context/PlayerContext';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');

interface FullScreenPlayerProps {
  onClose: () => void;
}

const FullScreenPlayer: React.FC<FullScreenPlayerProps> = ({ onClose }) => {
  const { playerStatus } = usePlayerContext();
  const { togglePlayback } = useAudioPlayer();

  if (!playerStatus.currentTrack) return null;

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${Number(seconds) < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <Ionicons name="chevron-down" size={32} color={Colors.textPrimary} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Now Playing</Text>
        <View style={{ width: 32 }} />
      </View>

      <View style={styles.artworkContainer}>
        <Image source={{ uri: playerStatus.currentTrack.albumArt }} style={styles.artwork} />
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{playerStatus.currentTrack.title}</Text>
        <Text style={styles.artist}>{playerStatus.currentTrack.artist}</Text>
      </View>

      <View style={styles.progressContainer}>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={playerStatus.duration}
          value={playerStatus.position}
          minimumTrackTintColor={Colors.primary}
          maximumTrackTintColor="rgba(255,255,255,0.2)"
          thumbTintColor={Colors.primary}
        />
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>{formatTime(playerStatus.position)}</Text>
          <Text style={styles.timeText}>{formatTime(playerStatus.duration)}</Text>
        </View>
      </View>

      <View style={styles.controls}>
        <Ionicons name="play-skip-back" size={36} color="white" />
        <TouchableOpacity style={styles.playButton} onPress={togglePlayback}>
          <Ionicons name={playerStatus.isPlaying ? "pause" : "play"} size={40} color="black" />
        </TouchableOpacity>
        <Ionicons name="play-skip-forward" size={36} color="white" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background, paddingHorizontal: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 20 },
  headerText: { color: Colors.textSecondary, fontSize: 12, textTransform: 'uppercase' },
  artworkContainer: { alignItems: 'center', marginVertical: 30 },
  artwork: { width: width * 0.8, height: width * 0.8, borderRadius: 20 },
  infoContainer: { marginBottom: 20 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold' },
  artist: { color: Colors.textSecondary, fontSize: 18 },
  progressContainer: { marginBottom: 20 },
  timeInfo: { flexDirection: 'row', justifyContent: 'space-between' },
  timeText: { color: Colors.textSecondary, fontSize: 12 },
  controls: { flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' },
  playButton: { backgroundColor: Colors.primary, width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center' }
});

export default FullScreenPlayer;