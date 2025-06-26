import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getMoodHistory, clearMoodHistory } from '../utils/storage';

const MOOD_COLORS = {
  Angry: '#e74c3c',
  Curious: '#f39c12',
  Happy: '#2ecc71',
  Sad: '#3498db',
  Excited: '#e056fd',
};

const HistoryScreen = () => {
  const [history, setHistory] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    const moodHistory = await getMoodHistory();
    setHistory(moodHistory);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadHistory();
    setRefreshing(false);
  };

  const handleClearHistory = () => {
    Alert.alert(
      'Clear History',
      'Are you sure you want to clear all mood history?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Clear',
          style: 'destructive',
          onPress: async () => {
            const success = await clearMoodHistory();
            if (success) {
              setHistory([]);
              Alert.alert('Success', 'Mood history cleared');
            }
          },
        },
      ]
    );
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return date.toLocaleDateString('en-US', options);
  };

  const renderMoodItem = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      style={[styles.moodItem, { borderLeftColor: MOOD_COLORS[item.mood] }]}
    >
      <View style={styles.moodHeader}>
        <Text style={styles.emoji}>{item.emoji}</Text>
        <View style={styles.moodInfo}>
          <Text style={[styles.moodLabel, { color: MOOD_COLORS[item.mood] }]}>
            {item.mood}
          </Text>
          <Text style={styles.timestamp}>{formatDate(item.timestamp)}</Text>
        </View>
      </View>
      
      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>"{item.quote}"</Text>
        <Text style={styles.author}>- {item.author}</Text>
      </View>
    </Animatable.View>
  );

  const ListEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🤷‍♂️</Text>
      <Text style={styles.emptyText}>No mood history yet!</Text>
      <Text style={styles.emptySubtext}>
        Go back and detect some moods with gestures
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mood History</Text>
        {history.length > 0 && (
          <TouchableOpacity onPress={handleClearHistory}>
            <Text style={styles.clearButton}>Clear All</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id}
        renderItem={renderMoodItem}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={ListEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  clearButton: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '600',
  },
  listContent: {
    padding: 20,
    paddingBottom: 100,
  },
  moodItem: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  moodHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  emoji: {
    fontSize: 40,
    marginRight: 15,
  },
  moodInfo: {
    flex: 1,
  },
  moodLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 2,
  },
  quoteContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
  },
  quote: {
    fontSize: 16,
    color: '#2c3e50',
    fontStyle: 'italic',
    lineHeight: 22,
    marginBottom: 8,
  },
  author: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'right',
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  emptyEmoji: {
    fontSize: 60,
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 20,
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: 10,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});

export default HistoryScreen; 