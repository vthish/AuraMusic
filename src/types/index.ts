export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  uri: string;
}

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  position: number;
  duration: number;
}