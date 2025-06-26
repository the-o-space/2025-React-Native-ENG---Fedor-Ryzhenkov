# React Native ENG 2025

This repository contains React Native assignments for the ENG 2025 course.

## Repository Structure

```
ReactNativeENG2025/
├── Assignment0/         # React Native setup with Expo
├── Assignment1/         # Todo List application
├── Assignment2/         # Food Delivery App
├── Assignment3/         # Event Manager App
├── Midterm/            # Personal Fitness Tracker
└── README.md           # This file
```

## Assignments

### Assignment 0 - Environment Setup
Initial setup of React Native with Expo on macOS (Apple Silicon). Includes all necessary configurations and dependencies.

### Assignment 1 - Todo List App
A functional Todo List application with:
- Two task lists: "In Progress" and "Completed"
- Tab navigation between lists
- Double-tap functionality to move tasks between lists
- Clean, modern UI design

### Assignment 2 - Food Delivery App
A restaurant food delivery application featuring:
- Restaurant and meal browsing
- Category-based filtering
- Order management with Context API
- Multi-screen navigation
- Order confirmation and history

### Assignment 3 - Event Manager
A Redux-powered event management app with:
- Multi-step form for event creation
- Form validation with React Hook Form
- Event list with CRUD operations
- Redux Toolkit for state management
- Date/time picker integration

### Midterm - Personal Fitness Tracker
A comprehensive fitness tracking application with:
- Redux for workout data management
- Context API for theme management (light/dark mode)
- 4 main screens with bottom tab navigation
- Workout logging with form validation
- Workout history with detailed modal views
- Settings with theme toggle and data reset

### Assignment 4 - Product Catalog App
An e-commerce product catalog application with:
- Product grid display (2-column layout)
- Real-time search filtering by product name
- Product detail pages with image carousel
- API integration with DummyJSON
- Price display with discount calculations
- Stock status indicators
- Pull-to-refresh functionality

### Assignment 5 - Document Scanner App
A document and identity scanning application with:
- Smart camera with front/back toggle
- Document alignment overlay guides
- Automatic brightness boost for selfies
- Emergency contact selection from device
- Photo preview and retake options
- Submission summary with timestamp
- Permission handling for camera and contacts
### Assignment 6: TBD
### Assignment 7: TBD
### Assignment 8: TBD

## Getting Started

Each assignment is in its own folder. Navigate to the specific assignment directory and follow the README instructions to run the app.

# ReactNativeENG2025

## Assignment 0 - React Native with Expo Setup

This repository contains a React Native project using Expo, configured for macOS with Apple Silicon (M1/M2).

### Prerequisites

- Node.js v18.18+ (installed: v23.11.0)
- Watchman (installed via Homebrew)
- Xcode (for iOS development)
- Android Studio (for Android development)
- CocoaPods (for iOS dependencies)

### Environment Setup

The following environment variables have been configured in `~/.zshrc`:

```bash
export ANDROID_HOME=$HOME/Library/Android/sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/platform-tools
export JAVA_HOME=/Library/Java/JavaVirtualMachines/temurin-22.jdk/Contents/Home
```

### Project Structure

```
ReactNativeENG2025/
├── Assignment0/
│   └── ReactNativeENG2025App/    # Expo React Native app
│       ├── App.js                # Main app component
│       ├── app.json              # Expo configuration
│       ├── package.json          # Dependencies
│       └── assets/               # Images and other assets
└── README.md                     # This file
```

### Running the Project

1. Navigate to the project directory:
   ```bash
   cd Assignment0/ReactNativeENG2025App
   ```

2. Install dependencies (if not already installed):
   ```bash
   npm install
   ```

3. Start the Expo development server:
   ```bash
   npx expo start
   ```

4. Run on iOS Simulator:
   - Press `i` in the terminal
   - Or scan the QR code with Expo Go app on your iPhone

5. Run on Android Emulator:
   - Press `a` in the terminal
   - Or scan the QR code with Expo Go app on your Android device

### Why Expo?

We chose Expo for this project because:
- Simplified development workflow
- No need for manual native configuration
- Built-in development tools and debugging
- Easy deployment and testing
- Access to many pre-built components and APIs
- Perfect for learning React Native

### Troubleshooting

If you encounter any issues:
1. Clear the Metro bundler cache: `npx expo start --clear`
2. Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
3. For iOS issues, ensure Xcode is properly configured: `sudo xcode-select --switch /Applications/Xcode.app`

### Development Notes

This project uses:
- Expo SDK (latest)
- React Native (via Expo)
- JavaScript (can be converted to TypeScript if needed)