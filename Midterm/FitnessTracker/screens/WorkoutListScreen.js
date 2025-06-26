import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectAllWorkouts } from '../store/workoutsSlice';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';

const WorkoutListScreen = () => {
  const workouts = useSelector(selectAllWorkouts);
  const { theme } = useTheme();
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const styles = createStyles(theme);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const renderWorkoutItem = ({ item }) => (
    <TouchableOpacity
      style={styles.workoutItem}
      onPress={() => {
        setSelectedWorkout(item);
        setModalVisible(true);
      }}
    >
      <View style={styles.workoutHeader}>
        <Text style={styles.workoutName}>{item.name}</Text>
        <Text style={styles.workoutDuration}>{item.duration} min</Text>
      </View>
      <Text style={styles.workoutDate}>{formatDate(item.date)}</Text>
    </TouchableOpacity>
  );

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Ionicons name="barbell-outline" size={80} color={theme.colors.textSecondary} />
      <Text style={styles.emptyText}>No workouts yet</Text>
      <Text style={styles.emptySubtext}>Start tracking your fitness journey!</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        renderItem={renderWorkoutItem}
        contentContainerStyle={[
          styles.listContainer,
          workouts.length === 0 && styles.emptyListContainer,
        ]}
        ListEmptyComponent={renderEmptyList}
      />

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Workout Details</Text>
          
          {selectedWorkout && (
            <>
              <View style={styles.detailRow}>
                <Ionicons name="fitness" size={20} color={theme.colors.primary} />
                <Text style={styles.detailLabel}>Exercise:</Text>
                <Text style={styles.detailValue}>{selectedWorkout.name}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="time" size={20} color={theme.colors.primary} />
                <Text style={styles.detailLabel}>Duration:</Text>
                <Text style={styles.detailValue}>{selectedWorkout.duration} minutes</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="calendar" size={20} color={theme.colors.primary} />
                <Text style={styles.detailLabel}>Date:</Text>
                <Text style={styles.detailValue}>{formatDate(selectedWorkout.date)}</Text>
              </View>

              <View style={styles.detailRow}>
                <Ionicons name="create" size={20} color={theme.colors.primary} />
                <Text style={styles.detailLabel}>Logged:</Text>
                <Text style={styles.detailValue}>
                  {new Date(selectedWorkout.createdAt).toLocaleString()}
                </Text>
              </View>
            </>
          )}

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  listContainer: {
    padding: 16,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  workoutItem: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  workoutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    flex: 1,
  },
  workoutDuration: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.primary,
  },
  workoutDate: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  modal: {
    margin: 20,
  },
  modalContent: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: theme.colors.text,
    marginBottom: 24,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 16,
    color: theme.colors.textSecondary,
    marginLeft: 12,
    marginRight: 8,
  },
  detailValue: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.text,
    flex: 1,
  },
  closeButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 24,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default WorkoutListScreen; 