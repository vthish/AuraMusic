/**
 * Core data structures for the music player
 */
export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  uri: string;
  duration: number;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  position: number;
  duration: number;
}