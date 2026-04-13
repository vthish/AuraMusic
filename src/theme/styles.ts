import { StyleSheet } from 'react-native';
import { Colors } from './colors';

/**
 * Shared global styles
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
  },
  heading: {
    color: Colors.textPrimary,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});