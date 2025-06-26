import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Accelerometer, Gyroscope } from 'expo-sensors';
import * as Haptics from 'expo-haptics';
import * as Animatable from 'react-native-animatable';
import { fetchQuoteByMood } from '../utils/api';
import { saveMoodDetection } from '../utils/storage';

const MOODS = {
  ANGRY: { emoji: '😠', label: 'Angry', color: '#e74c3c' },
  CURIOUS: { emoji: '🤔', label: 'Curious', color: '#f39c12' },
  HAPPY: { emoji: '😄', label: 'Happy', color: '#2ecc71' },
  SAD: { emoji: '😢', label: 'Sad', color: '#3498db' },
  EXCITED: { emoji: '🤩', label: 'Excited', color: '#e056fd' },
};

const HomeScreen = ({ navigation }) => {
  const [currentMood, setCurrentMood] = useState(null);
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [isDetecting, setIsDetecting] = useState(true);
  
  const accelerometerSubscription = useRef(null);
  const gyroscopeSubscription = useRef(null);
  const lastShakeTime = useRef(0);
  const isDetectingRef = useRef(true);

  useEffect(() => {
    startSensors();
    return () => {
      stopSensors();
    };
  }, []);

  const startSensors = () => {
    // Set update interval
    Accelerometer.setUpdateInterval(100);
    Gyroscope.setUpdateInterval(100);

    // Subscribe to accelerometer for shake detection
    accelerometerSubscription.current = Accelerometer.addListener(({ x, y, z }) => {
      if (!isDetectingRef.current) return;

      const acceleration = Math.sqrt(x * x + y * y + z * z);
      const currentTime = Date.now();
      
      // Detect shake (high acceleration)
      if (acceleration > 2.5 && currentTime - lastShakeTime.current > 1000) {
        lastShakeTime.current = currentTime;
        handleMoodDetection(MOODS.ANGRY);
      }
    });

    // Subscribe to gyroscope for tilt detection
    gyroscopeSubscription.current = Gyroscope.addListener(({ x, y, z }) => {
      if (!isDetectingRef.current) return;

      // Detect tilts based on rotation rates
      if (x > 2) { // Tilt forward
        handleMoodDetection(MOODS.SAD);
      } else if (y > 2) { // Tilt right
        handleMoodDetection(MOODS.HAPPY);
      } else if (y < -2) { // Tilt left
        handleMoodDetection(MOODS.CURIOUS);
      }
    });
  };

  const stopSensors = () => {
    if (accelerometerSubscription.current) {
      accelerometerSubscription.current.remove();
    }
    if (gyroscopeSubscription.current) {
      gyroscopeSubscription.current.remove();
    }
  };

  const handleDoubleTap = () => {
    if (!isDetectingRef.current) return;
    
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (lastTap && (now - lastTap) < DOUBLE_TAP_DELAY) {
      handleMoodDetection(MOODS.EXCITED);
    } else {
      setLastTap(now);
    }
  };

  const handleMoodDetection = async (mood) => {
    if (!isDetectingRef.current || loading) return;

    setIsDetecting(false);
    isDetectingRef.current = false;
    setLoading(true);
    
    // Haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Set the mood
    setCurrentMood(mood);
    
    // Fetch quote
    try {
      const quoteData = await fetchQuoteByMood(mood.label);
      setQuote(quoteData);
      
      // Save to storage
      await saveMoodDetection({
        emoji: mood.emoji,
        mood: mood.label,
        quote: quoteData.quote,
        author: quoteData.author,
      });
    } catch (error) {
      console.error('Error fetching quote:', error);
      setQuote({
        quote: "Every emotion is valid and part of your journey.",
        author: "Anonymous"
      });
    } finally {
      setLoading(false);
      // Don't re-enable detection automatically
      // User must press "Try Again" to detect new emotions
    }
  };

  const resetMood = () => {
    setCurrentMood(null);
    setQuote(null);
    setIsDetecting(true);
    isDetectingRef.current = true;
  };

  return (
    <TouchableWithoutFeedback onPress={handleDoubleTap}>
      <View style={[styles.container, currentMood && { backgroundColor: currentMood.color + '20' }]}>
        {!currentMood ? (
          <View style={styles.instructionsContainer}>
            <Text style={styles.title}>EmojiMotion+</Text>
            <Text style={styles.subtitle}>Detect your mood with gestures!</Text>
            
            <View style={styles.instructions}>
              <Text style={styles.instructionText}>🤳 Shake → Angry</Text>
              <Text style={styles.instructionText}>⬅️ Tilt left → Curious</Text>
              <Text style={styles.instructionText}>➡️ Tilt right → Happy</Text>
              <Text style={styles.instructionText}>⬆️ Tilt forward → Sad</Text>
              <Text style={styles.instructionText}>👆👆 Double-tap → Excited</Text>
            </View>
            
            {isDetecting && (
              <Animatable.Text 
                animation="pulse" 
                iterationCount="infinite" 
                style={styles.detectingText}
              >
                Detecting...
              </Animatable.Text>
            )}
          </View>
        ) : (
          <View style={styles.moodContainer}>
            <Animatable.Text 
              animation="bounceIn" 
              style={styles.emoji}
            >
              {currentMood.emoji}
            </Animatable.Text>
            
            <Animatable.Text 
              animation="fadeInUp" 
              delay={300} 
              style={[styles.moodLabel, { color: currentMood.color }]}
            >
              {currentMood.label}
            </Animatable.Text>
            
            {loading ? (
              <ActivityIndicator size="large" color={currentMood.color} style={styles.loader} />
            ) : quote && (
              <Animatable.View 
                animation="fadeInUp" 
                delay={600} 
                style={styles.quoteContainer}
              >
                <Text style={styles.quote}>"{quote.quote}"</Text>
                <Text style={styles.author}>- {quote.author}</Text>
              </Animatable.View>
            )}
            
            <Animatable.View animation="fadeIn" delay={900}>
              <TouchableWithoutFeedback onPress={resetMood}>
                <View style={[styles.resetButton, { backgroundColor: currentMood.color }]}>
                  <Text style={styles.resetButtonText}>Try Again</Text>
                </View>
              </TouchableWithoutFeedback>
            </Animatable.View>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  instructionsContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#7f8c8d',
    marginBottom: 30,
  },
  instructions: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
  },
  instructionText: {
    fontSize: 16,
    color: '#34495e',
    marginVertical: 5,
  },
  detectingText: {
    fontSize: 18,
    color: '#3498db',
    fontWeight: '600',
  },
  moodContainer: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 100,
    marginBottom: 20,
  },
  moodLabel: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  loader: {
    marginVertical: 20,
  },
  quoteContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 30,
    maxWidth: '90%',
  },
  quote: {
    fontSize: 18,
    color: '#2c3e50',
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
  },
  author: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'right',
    fontWeight: '600',
  },
  resetButton: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen; 