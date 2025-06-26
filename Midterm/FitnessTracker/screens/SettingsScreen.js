import React from 'react';
import { 
  View, 
  Text, 
  Switch, 
  TouchableOpacity, 
  StyleSheet, 
  SafeAreaView,
  Alert 
} from 'react-native';
import { useDispatch } from 'react-redux';
import { clearAllWorkouts } from '../store/workoutsSlice';
import { useTheme } from '../context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = () => {
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const styles = createStyles(theme);

  const handleResetData = () => {
    Alert.alert(
      'Reset All Data',
      'Are you sure you want to delete all your workout data? This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            dispatch(clearAllWorkouts());
            Alert.alert('Success', 'All workout data has been cleared.');
          },
        },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Ionicons name="settings-outline" size={60} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>Settings</Text>
          <Text style={styles.headerSubtitle}>Customize your app experience</Text>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Ionicons 
                name={theme.isDarkMode ? 'moon' : 'sunny'} 
                size={24} 
                color={theme.colors.primary} 
              />
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>Dark Mode</Text>
                <Text style={styles.settingDescription}>
                  {theme.isDarkMode ? 'Dark theme is active' : 'Light theme is active'}
                </Text>
              </View>
            </View>
            <Switch
              value={theme.isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ 
                false: theme.colors.border, 
                true: theme.colors.primaryVariant 
              }}
              thumbColor={theme.isDarkMode ? theme.colors.primary : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.settingsSection}>
          <Text style={styles.sectionTitle}>Data Management</Text>
          
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetData}
          >
            <Ionicons name="trash-outline" size={24} color="#fff" />
            <Text style={styles.resetButtonText}>Reset All Workout Data</Text>
          </TouchableOpacity>
          
          <Text style={styles.warningText}>
            This will permanently delete all your logged workouts
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Personal Fitness Tracker</Text>
          <Text style={styles.versionText}>Version 1.0.0</Text>
        </View>
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
  header: {
    alignItems: 'center',
    paddingVertical: 30,
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
  settingsSection: {
    marginTop: 32,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 16,
  },
  settingItem: {
    backgroundColor: theme.colors.surface,
    padding: 16,
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: theme.isDarkMode ? 0.3 : 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingText: {
    marginLeft: 16,
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.text,
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  resetButton: {
    backgroundColor: '#f44336',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  warningText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  footer: {
    marginTop: 'auto',
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  versionText: {
    fontSize: 12,
    color: theme.colors.textSecondary,
  },
});

export default SettingsScreen; 