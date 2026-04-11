import { StyleSheet } from 'react-native';
import { Colors } from './colors';

/**
 * Reusable global styles for consistent UI
 */
export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  glassCard: {
    backgroundColor: Colors.surface,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
  }
});