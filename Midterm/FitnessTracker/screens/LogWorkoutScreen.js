import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  Platform,
  Alert
} from 'react-native';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../store/workoutsSlice';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';

const LogWorkoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const [workoutName, setWorkoutName] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const styles = createStyles(theme);

  const handleSubmit = () => {
    // Validation
    if (!workoutName.trim()) {
      Alert.alert('Validation Error', 'Please enter a workout name');
      return;
    }

    const durationNum = parseInt(duration);
    if (!duration || isNaN(durationNum) || durationNum <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid duration in minutes');
      return;
    }

    // Dispatch workout
    dispatch(addWorkout({
      name: workoutName.trim(),
      duration: durationNum,
      date: date.toISOString(),
    }));

    // Navigate to Workout List
    navigation.navigate('WorkoutList');
  };

  const formatDate = () => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="add-circle-outline" size={60} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>Log New Workout</Text>
          <Text style={styles.headerSubtitle}>Track your fitness progress</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Workout Name</Text>
            <TextInput
              style={styles.input}
              value={workoutName}
              onChangeText={setWorkoutName}
              placeholder="e.g., Morning Run, Gym Session"
              placeholderTextColor={theme.colors.textSecondary}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Duration (minutes)</Text>
            <TextInput
              style={styles.input}
              value={duration}
              onChangeText={setDuration}
              placeholder="Enter duration in minutes"
              placeholderTextColor={theme.colors.textSecondary}
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons name="calendar" size={20} color={theme.colors.primary} />
              <Text style={styles.dateText}>{formatDate()}</Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              onChange={(event, selectedDate) => {
                setShowDatePicker(Platform.OS === 'ios');
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
              maximumDate={new Date()}
            />
          )}

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
          >
            <Text style={styles.submitButtonText}>Log Workout</Text>
            <Ionicons name="checkmark-circle" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: theme.colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: theme.colors.textSecondary,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: theme.colors.text,
  },
  dateButton: {
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateText: {
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: 12,
  },
  submitButton: {
    backgroundColor: theme.colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
});

export default LogWorkoutScreen; 