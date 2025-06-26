# Assignment 5: Document Scanner App

A React Native application that allows users to scan identity documents and capture selfies, manage emergency contacts, and enhance the scanning experience with automatic brightness adjustments.

## Features

### 1. Smart Document Scanner
- **Dual Camera Support**: Toggle between front-facing (selfie) and back-facing (document) cameras
- **Document Alignment Guide**: Rectangular overlay to help users properly align documents
- **Photo Preview**: Review captured photos before accepting them
- **Retake Option**: Easy retake functionality if photos aren't satisfactory

### 2. Automatic Brightness Control
- **Smart Brightness**: Automatically increases screen brightness to 100% when using front camera for better selfie lighting
- **Brightness Restoration**: Restores previous brightness level when switching to back camera or leaving camera screen
- **Seamless Experience**: Brightness changes happen automatically without user intervention

### 3. Emergency Contact Selection
- **Contact Access**: Requests permission to access device contacts
- **Search Functionality**: Real-time search to quickly find contacts
- **Dual Selection**: Users must select exactly 2 emergency contacts
- **Contact Display**: Shows contact name and phone number

### 4. Submission Summary Screen
- **Complete Overview**: Displays all captured information in one place:
  - Selfie and document photos side by side
  - Selected emergency contacts with phone numbers
  - Submission timestamp (automatically generated)
- **Start Over**: Option to restart the entire process
- **Submit**: Final submission with success confirmation

## Technical Implementation

### Dependencies
- `expo-camera`: Camera functionality and photo capture
- `expo-brightness`: Screen brightness control
- `expo-contacts`: Access to device contacts
- `@react-navigation/native` & `@react-navigation/stack`: Navigation between screens
- `react-native-safe-area-context`: Safe area handling
- `@expo/vector-icons`: Icon library

### Navigation Flow
1. **Home Screen** → Shows capture status and guides user through the process
2. **Camera Screen** → Captures selfie and document photos with overlay guides
3. **Photo Confirmation** → Review and accept/retake photos
4. **Contact Selection** → Pick 2 emergency contacts from device
5. **Summary Screen** → Review all information and submit

### Key Features Implementation

#### Camera with Overlay
- Custom overlay with corner markers for document alignment
- Different instructions for selfie vs document capture
- Real-time camera type switching

#### Brightness Management
```javascript
// Automatically set brightness to 100% for front camera
if (type === CameraType.front) {
  await Brightness.setBrightnessAsync(1);
}
// Restore previous brightness for back camera
else {
  await Brightness.setBrightnessAsync(previousBrightness);
}
```

#### Contact Filtering
- Filters contacts to show only those with phone numbers
- Alphabetical sorting for easy navigation
- Real-time search filtering

#### State Management
- Local component state for managing captures and selections
- Navigation params for passing data between screens
- Proper cleanup on component unmount

## Installation & Setup

1. Navigate to the project directory:
   ```bash
   cd Assignment5/DocumentScanner
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the app:
   ```bash
   npx expo start
   ```

4. Choose your platform:
   - Press `i` for iOS
   - Press `a` for Android

## Permissions Required

The app will request the following permissions:
- **Camera**: For capturing selfie and document photos
- **Contacts**: For selecting emergency contacts
- **System Brightness**: For adjusting screen brightness (handled automatically by Expo)

## Project Structure

```
DocumentScanner/
├── App.js                          # Main app with navigation setup
├── screens/
│   ├── HomeScreen.js              # Main screen showing capture progress
│   ├── CameraScreen.js            # Camera with toggle and brightness control
│   ├── PhotoConfirmationScreen.js # Review captured photos
│   ├── ContactSelectionScreen.js  # Select emergency contacts
│   └── SummaryScreen.js           # Final summary and submission
└── components/                    # Reusable components (if needed)
```

## Security & Privacy

- Photos are stored temporarily in device memory
- No data is transmitted to external servers
- Contact information is accessed only with user permission
- All data is cleared when starting over

## User Experience Highlights

- **Progressive Flow**: Users are guided step-by-step through the process
- **Visual Feedback**: Clear indicators for completed steps
- **Error Handling**: Graceful handling of permission denials
- **Accessibility**: Clear instructions and visual guides
- **Modern UI**: Clean, professional interface with smooth transitions 