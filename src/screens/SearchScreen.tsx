import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Keyboard,
  ActivityIndicator
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../theme/colors';
import { YOUTUBE_API_KEY } from '../constants/Config';
import { useAudioPlayer } from '../hooks/useAudioPlayer';

interface YouTubeVideo {
  id: { videoId: string };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: { medium: { url: string } };
  };
}

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { playTrack } = useAudioPlayer();

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    Keyboard.dismiss();
    setIsLoading(true);

    try {
      const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(searchQuery)}&type=video&key=${YOUTUBE_API_KEY}`;
      const res = await fetch(url);
      const data = await res.json();
      setResults(data.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: YouTubeVideo) => {
    // Temporary direct MP3 to ensure no playback errors during testing
    const streamUri = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    
    playTrack({
      id: item.id.videoId,
      title: item.snippet.title,
      artist: item.snippet.channelTitle,
      albumArt: item.snippet.thumbnails.medium.url,
      uri: streamUri
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.input}
          placeholder="Search for music..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>

      {isLoading ? (
        <ActivityIndicator color="white" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.videoId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.item} onPress={() => handleSelect(item)}>
              <Image source={{ uri: item.snippet.thumbnails.medium.url }} style={styles.img} />
              <View style={styles.info}>
                <Text style={styles.txtMain} numberOfLines={1}>{item.snippet.title}</Text>
                <Text style={styles.txtSub}>{item.snippet.channelTitle}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', paddingHorizontal: 15 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#151515',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 60,
    height: 52,
    marginBottom: 20
  },
  input: { flex: 1, color: 'white', marginLeft: 10, fontSize: 16 },
  item: { flexDirection: 'row', marginBottom: 18, alignItems: 'center' },
  img: { width: 100, height: 60, borderRadius: 8, backgroundColor: '#222' },
  info: { flex: 1, marginLeft: 15 },
  txtMain: { color: 'white', fontSize: 14, fontWeight: '600' },
  txtSub: { color: '#888', fontSize: 12, marginTop: 4 }
});

export default SearchScreen;