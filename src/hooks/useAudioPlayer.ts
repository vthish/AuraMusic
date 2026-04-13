import { Audio } from 'expo-av';
import { usePlayerContext } from '../context/PlayerContext';
import { Track } from '../types';

export const useAudioPlayer = () => {
  const { sound, setSound, playerStatus, setPlayerStatus } = usePlayerContext();

  async function playTrack(track: Track) {
    try {
      if (playerStatus.currentTrack?.id === track.id && sound) {
        await togglePlayback();
        return;
      }
      if (sound) await sound.unloadAsync();

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.uri }, { shouldPlay: true }
      );
      setSound(newSound);
      setPlayerStatus(prev => ({ ...prev, currentTrack: track, isPlaying: true }));

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPlayerStatus(prev => ({
            ...prev,
            isPlaying: status.isPlaying,
            position: status.positionMillis,
            duration: status.durationMillis || 0,
          }));
        }
      });
    } catch (error) {
      console.error("Playback System Error:", error);
    }
  }

  async function togglePlayback() {
    if (!sound) return;
    const status = await sound.getStatusAsync();
    if (status.isLoaded) {
      status.isPlaying ? await sound.pauseAsync() : await sound.playAsync();
    }
  }

  return { playTrack, togglePlayback };
};