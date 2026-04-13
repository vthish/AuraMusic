import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { YOUTUBE_API_KEY } from '../constants/Config';
import { Colors } from '../theme/colors';

/**
 * Interface defining the structure of a YouTube API search result item.
 * This prevents the "type never" error in TypeScript.
 */
interface YouTubeVideo {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
    thumbnails: {
      medium: {
        url: string;
      };
    };
  };
}

/**
 * Animated placeholder shown during data fetching to improve UX.
 */
const SkeletonItem = () => (
  <View style={styles.skeletonContainer}>
    <View style={styles.skeletonArt} />
    <View style={styles.skeletonTextContainer}>
      <View style={styles.skeletonTitle} />
      <View style={styles.skeletonArtist} />
    </View>
  </View>
);

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<YouTubeVideo[]>([]); // Typed as YouTubeVideo array
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Performs a request to the YouTube Data API v3.
   * Encodes the query to handle special characters and spaces.
   */
  const searchYouTube = async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    try {
      const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=15&q=${encodeURIComponent(query)}&type=video&key=${YOUTUBE_API_KEY}`;
      
      const response = await fetch(apiUrl);
      const data = await response.json();
      
      setResults(data.items || []);
    } catch (error) {
      console.error("YouTube API Fetch Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Header Section */}
      <View style={styles.searchHeader}>
        <Ionicons name="search" size={20} color={Colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search songs on YouTube..."
          placeholderTextColor={Colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
          onSubmitEditing={() => searchYouTube(searchQuery)}
          returnKeyType="search"
          autoCorrect={false}
        />
      </View>

      {/* Conditional Rendering based on state */}
      {isLoading ? (
        <FlatList
          data={[1, 2, 3, 4, 5, 6]} 
          renderItem={() => <SkeletonItem />}
          keyExtractor={(item) => item.toString()}
        />
      ) : results.length > 0 ? (
        <FlatList
          data={results}
          keyExtractor={(item) => item.id.videoId}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity 
              style={styles.resultItem}
              activeOpacity={0.7}
              onPress={() => {
                // Future implementation: Audio streaming logic
                console.log("Selected Video ID:", item.id.videoId);
              }}
            >
              <Image 
                source={{ uri: item.snippet.thumbnails.medium.url }} 
                style={styles.thumbnail} 
              />
              <View style={styles.resultInfo}>
                <Text style={styles.title} numberOfLines={2}>
                  {item.snippet.title}
                </Text>
                <Text style={styles.channelName}>
                  {item.snippet.channelTitle}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="musical-notes-outline" size={80} color="rgba(255,255,255,0.05)" />
          <Text style={styles.emptyText}>Search for your favorite tracks...</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.background, 
    paddingHorizontal: 15 
  },
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginTop: 60,
    marginBottom: 20,
    height: 52,
  },
  searchInput: { 
    flex: 1, 
    color: 'white', 
    marginLeft: 10, 
    fontSize: 16 
  },
  resultItem: { 
    flexDirection: 'row', 
    marginBottom: 18, 
    alignItems: 'center' 
  },
  thumbnail: { 
    width: 110, 
    height: 65, 
    borderRadius: 8, 
    backgroundColor: '#333' 
  },
  resultInfo: { 
    flex: 1, 
    marginLeft: 12 
  },
  title: { 
    color: 'white', 
    fontSize: 14, 
    fontWeight: '600', 
    lineHeight: 20 
  },
  channelName: { 
    color: Colors.textSecondary, 
    fontSize: 12, 
    marginTop: 4 
  },
  emptyContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  emptyText: { 
    color: Colors.textSecondary, 
    marginTop: 15, 
    fontSize: 15 
  },
  
  /* Skeleton Loading Styles */
  skeletonContainer: { 
    flexDirection: 'row', 
    marginBottom: 20, 
    alignItems: 'center' 
  },
  skeletonArt: { 
    width: 110, 
    height: 65, 
    borderRadius: 8, 
    backgroundColor: 'rgba(255,255,255,0.03)' 
  },
  skeletonTextContainer: { 
    marginLeft: 15, 
    flex: 1 
  },
  skeletonTitle: { 
    width: '85%', 
    height: 12, 
    backgroundColor: 'rgba(255,255,255,0.03)', 
    borderRadius: 4, 
    marginBottom: 10 
  },
  skeletonArtist: { 
    width: '45%', 
    height: 10, 
    backgroundColor: 'rgba(255,255,255,0.02)', 
    borderRadius: 4 
  },
});

export default SearchScreen;