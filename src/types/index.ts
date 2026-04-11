
// Interface for a single music track object
export interface Track {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  uri: string;
  duration: number;
}


//Interface for the global player state
 
export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  position: number;
  duration: number;
}