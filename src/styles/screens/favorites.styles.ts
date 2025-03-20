import { StyleSheet } from 'react-native';
import { shadows } from '@/styles/themes';

export const s = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
    color: '#333',
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#888',
    marginTop: 20,
  },
  list: {
    marginTop: 8,
  },
  card: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    ...shadows,
  },
  wordText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
});
