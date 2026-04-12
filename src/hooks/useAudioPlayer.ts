import { Audio } from 'expo-av';
import { useEffect, useState } from 'react';
import { PlayerState, Track } from '../types';

/**
 * Custom hook to manage music playback using expo-av
 */
export const useAudioPlayer = () => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [playerStatus, setPlayerStatus] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    position: 0,
    duration: 0,
  });

  /**
   * Loads and plays a specific track
   * @param track - The track object to play
   */
  async function playTrack(track: Track) {
    try {
      // Unload any existing sound from memory
      if (sound) {
        await sound.unloadAsync();
      }

      // Load the new track and play it immediately
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: track.uri },
        { shouldPlay: true }
      );

      setSound(newSound);
      
      // Update our global player state
      setPlayerStatus({
        currentTrack: track,
        isPlaying: true,
        position: 0,
        duration: track.duration,
      });

      // Monitor playback updates (position, finish, etc.)
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
      console.error("Error loading track:", error);
    }
  }

  // Cleanup: unload sound when component unmounts
  useEffect(() => {
    return sound ? () => { sound.unloadAsync(); } : undefined;
  }, [sound]);

  return { playTrack, playerStatus };
};