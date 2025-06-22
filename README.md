# React Native Course Repository

This repository contains assignments for the React Native course.

## Assignments

### Assignment 1: Todo List App ✓
A Todo List application with task management features:
- Two lists: In Progress and Completed tasks
- Tab navigation between lists
- Double-tap to move tasks between lists
- Add new tasks functionality

### Assignment 2: TBD
### Assignment 3: TBD
### Assignment 4: TBD
### Assignment 5: TBD
### Assignment 6: TBD
### Assignment 7: TBD
### Assignment 8: TBD

### Midterm: TBD

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