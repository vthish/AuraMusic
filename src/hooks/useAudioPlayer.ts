import { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { usePlayerContext } from '../context/PlayerContext';
import { Track } from '../types';

/**
 * Hook to manage audio playback synced with global context
 */
export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const { playerStatus, setPlayerStatus } = usePlayerContext();

  async function playTrack(track: Track) {
    try {
      if (sound) {
        await sound.unloadAsync();
      }

      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true }
      );

      setSound(newSound);
      
      setPlayerStatus({
        currentTrack: track,
        isPlaying: true,
        position: 0,
        duration: track.duration,
      });

      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded) {
          setPlayerStatus(prev => ({
            ...prev,
            isPlaying: status.isPlaying,
            position: status.positionMillis,
          }));
        }
      });
    } catch (error) {
      console.error("Playback Error:", error);
    }
  }

  return { playTrack, playerStatus };
};