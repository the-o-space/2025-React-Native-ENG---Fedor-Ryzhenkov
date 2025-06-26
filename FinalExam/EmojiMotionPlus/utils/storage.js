import AsyncStorage from '@react-native-async-storage/async-storage';

const MOOD_HISTORY_KEY = 'mood_history';

export const saveMoodDetection = async (moodData) => {
  try {
    // Get existing history
    const existingHistory = await getMoodHistory();
    
    // Add new mood detection with timestamp
    const newMoodEntry = {
      ...moodData,
      timestamp: new Date().toISOString(),
      id: Date.now().toString(),
    };
    
    // Add to beginning of array (most recent first)
    const updatedHistory = [newMoodEntry, ...existingHistory];
    
    // Save updated history
    await AsyncStorage.setItem(MOOD_HISTORY_KEY, JSON.stringify(updatedHistory));
    
    return true;
  } catch (error) {
    console.error('Error saving mood detection:', error);
    return false;
  }
};

export const getMoodHistory = async () => {
  try {
    const historyJson = await AsyncStorage.getItem(MOOD_HISTORY_KEY);
    if (historyJson) {
      return JSON.parse(historyJson);
    }
    return [];
  } catch (error) {
    console.error('Error getting mood history:', error);
    return [];
  }
};

export const clearMoodHistory = async () => {
  try {
    await AsyncStorage.removeItem(MOOD_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing mood history:', error);
    return false;
  }
}; 