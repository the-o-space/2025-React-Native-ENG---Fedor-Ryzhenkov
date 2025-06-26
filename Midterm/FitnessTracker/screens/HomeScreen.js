import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { selectTotalWorkouts, selectTotalDuration } from '../store/workoutsSlice';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const totalWorkouts = useSelector(selectTotalWorkouts);
  const totalDuration = useSelector(selectTotalDuration);
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.welcomeText}>Welcome to Fitness Tracker!</Text>
        
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryTitle}>Your Progress</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <Ionicons name="fitness" size={30} color={theme.colors.primary} />
              <Text style={styles.statNumber}>{totalWorkouts}</Text>
              <Text style={styles.statLabel}>Total Workouts</Text>
            </View>
            
            <View style={styles.statCard}>
              <Ionicons name="time" size={30} color={theme.colors.primary} />
              <Text style={styles.statNumber}>{totalDuration}</Text>
              <Text style={styles.statLabel}>Total Minutes</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('LogWorkout')}
        >
          <Ionicons name="add-circle" size={24} color="#fff" />
          <Text style={styles.addButtonText}>Add Workout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  summaryContainer: {
    backgroundColor: theme.colors.surface,
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  summaryTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statCard: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: '700',
    color: theme.colors.primary,
    marginTop: 10,
  },
  statLabel: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginTop: 5,
  },
  addButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default HomeScreen; 