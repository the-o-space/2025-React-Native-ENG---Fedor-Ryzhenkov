import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllEvents } from '../store/eventsSlice';
import { Ionicons } from '@expo/vector-icons';

const EventListScreen = ({ navigation }) => {
  const events = useSelector(selectAllEvents);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('EventFormStep1')}
          style={styles.addButton}
        >
          <Ionicons name="add" size={28} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderEventItem = ({ item }) => {
    const eventDate = new Date(item.date);
    const formattedDate = eventDate.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

    return (
      <View style={styles.eventItem}>
        <View style={styles.eventHeader}>
          <Text style={styles.eventTitle}>{item.title}</Text>
          <Text style={styles.eventDate}>{formattedDate}</Text>
        </View>
        {item.location && (
          <View style={styles.eventDetail}>
            <Ionicons name="location-outline" size={16} color="#666" />
            <Text style={styles.eventLocation}>{item.location}</Text>
          </View>
        )}
        {item.description && (
          <Text style={styles.eventDescription} numberOfLines={2}>
            {item.description}
          </Text>
        )}
      </View>
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="calendar-outline" size={80} color="#ccc" />
      <Text style={styles.emptyText}>No events yet</Text>
      <Text style={styles.emptySubtext}>
        Tap the + button to add your first event
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEventItem}
        contentContainerStyle={[
          styles.listContainer,
          events.length === 0 && styles.emptyListContainer,
        ]}
        ListEmptyComponent={renderEmptyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  emptyListContainer: {
    flex: 1,
  },
  addButton: {
    marginRight: 16,
  },
  eventItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  eventHeader: {
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  eventDescription: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#999',
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#bbb',
    textAlign: 'center',
  },
});

export default EventListScreen; 