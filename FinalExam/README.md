# EmojiMotion+ - Final Exam Project

A React Native app that detects device gestures to determine user mood, displays corresponding emojis, and fetches motivational quotes based on the detected mood.

## Features

- **Gesture-Based Mood Detection**:
  - 🤳 Shake → 😠 Angry
  - ⬅️ Tilt left → 🤔 Curious
  - ➡️ Tilt right → 😄 Happy
  - ⬆️ Tilt forward → 😢 Sad
  - 👆👆 Double-tap screen → 🤩 Excited

- **Real-time Mood Display**: Shows emoji, mood label, and animated motivational quote
- **Haptic Feedback**: Vibration on mood detection
- **Quote API**: Fetches quotes from local JSON server based on mood
- **Mood History**: Stores all detections in AsyncStorage with timestamp
- **History View**: Browse past moods with quotes in a beautiful list

## Prerequisites

- Node.js and npm
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator or Android Emulator (or Expo Go app on physical device)

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   cd FinalExam/EmojiMotionPlus
   npm install
   ```

2. **Start the JSON Server**:
   
   First, find your local IP address:
   - Mac: `ifconfig | grep "inet " | grep -v 127.0.0.1`
   - Windows: `ipconfig`
   
   Then update the IP in `utils/api.js`:
   ```javascript
   const API_BASE_URL = 'http://YOUR_IP_ADDRESS:8080';
   ```
   
   Start the server:
   ```bash
   cd json-server
   npx http-server . -p 8080 --cors
   ```

3. **Run the App**:
   ```bash
   # In a new terminal, from EmojiMotionPlus directory
   npx expo start
   ```

4. **Test on Device**:
   - Scan QR code with Expo Go app
   - Or press `i` for iOS simulator / `a` for Android emulator

## Project Structure

```
EmojiMotionPlus/
├── screens/
│   ├── HomeScreen.js      # Main gesture detection screen
│   └── HistoryScreen.js   # Mood history display
├── utils/
│   ├── api.js            # Quote fetching service
│   └── storage.js        # AsyncStorage operations
├── json-server/
│   └── mood_quotes_100_with_authors.json
└── App.js                # Navigation setup
```

## Technologies Used

- **React Native** with Expo
- **expo-sensors** for accelerometer and gyroscope
- **expo-haptics** for vibration feedback
- **AsyncStorage** for local data persistence
- **react-native-animatable** for animations
- **React Navigation** for screen navigation
- **http-server** for local JSON API

## Key Implementation Details

### Gesture Detection
- Uses accelerometer for shake detection (acceleration > 2.5)
- Uses gyroscope for tilt detection (rotation rates)
- Touch event handling for double-tap detection

### Quote Filtering
- Fetches all quotes from JSON server
- Filters by mood category
- Returns random quote from filtered results
- Fallback quotes for error handling

### Data Persistence
- Saves mood, emoji, quote, author, and timestamp
- Retrieves history sorted by most recent
- Clear all functionality with confirmation

## Testing Tips

- **Shake**: Move device rapidly back and forth
- **Tilt**: Rotate device slowly in different directions
- **Double-tap**: Tap screen twice quickly
- Mood detection pauses for 3 seconds after each detection
- Pull to refresh on History screen

## Troubleshooting

1. **Cannot fetch quotes**: 
   - Ensure http-server is running
   - Verify IP address in `utils/api.js`
   - Check device is on same network

2. **Gestures not detecting**:
   - Ensure app has sensor permissions
   - Try more pronounced movements
   - Check console for sensor data

3. **No vibration**:
   - Vibration only works on physical devices
   - Not available in simulators 