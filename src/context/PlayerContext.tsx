import { Audio } from 'expo-av';
import React, { createContext, useContext, useState } from 'react';
import { PlayerState } from '../types';

interface PlayerContextType {
  playerStatus: PlayerState;
  setPlayerStatus: React.Dispatch<React.SetStateAction<PlayerState>>;
  sound: Audio.Sound | null;
  setSound: (sound: Audio.Sound | null) => void;
  isPlayerVisible: boolean;
  setPlayerVisible: (visible: boolean) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initial state strictly following the interface
  const [playerStatus, setPlayerStatus] = useState<PlayerState>({
    currentTrack: null,
    isPlaying: false,
    position: 0,
    duration: 0,
  });
  
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlayerVisible, setPlayerVisible] = useState(false);

  return (
    <PlayerContext.Provider value={{ 
      playerStatus, setPlayerStatus, 
      sound, setSound, 
      isPlayerVisible, setPlayerVisible 
    }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};