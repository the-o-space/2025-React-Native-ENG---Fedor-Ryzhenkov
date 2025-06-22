# Assignment 1 - Todo List App

## Description
A Todo List application built with React Native and Expo that manages tasks across two lists:
- **In Progress Tasks** - Tasks that are currently being worked on
- **Completed Tasks** - Tasks that have been finished

## Features
✅ Two tabs at the top: "In Progress" and "Completed"  
✅ Switch between task lists by tapping tabs  
✅ "In Progress" tab is active by default when app launches  
✅ Double-tap on any task to move it between lists:
  - Double-tap tasks in "In Progress" to move them to "Completed"
  - Double-tap tasks in "Completed" to move them back to "In Progress"
✅ Clean, modern UI with visual feedback  
✅ Instructions displayed at the bottom of the screen

## Getting Started

### Prerequisites
- Node.js (v18.18 or newer)
- Expo CLI
- iOS Simulator (for macOS) or Android Emulator

### Installation

1. Navigate to the project directory:
```bash
cd Assignment1/TodoListApp
```

2. Install dependencies:
```bash
npm install
```

### Running the App

1. Start the Expo development server:
```bash
npx expo start
```

2. Choose your platform:
   - Press `i` to open in iOS Simulator
   - Press `a` to open in Android Emulator
   - Scan the QR code with Expo Go app on your physical device

## Usage

1. The app opens with the "In Progress" tab active
2. View your current tasks in the list
3. To move a task to the other list, double-tap on it
4. Switch between tabs to view "In Progress" or "Completed" tasks
5. Tasks maintain their state when switching between tabs

## Technical Implementation

- Built with React Native and Expo
- Uses React Hooks (useState) for state management
- FlatList for efficient rendering of task lists
- TouchableOpacity for interactive task items
- Double-tap detection using timestamp comparison
- Responsive design that works on various screen sizes

## Project Structure
```
TodoListApp/
├── App.js           # Main application component
├── app.json         # Expo configuration
├── package.json     # Dependencies
└── assets/          # App assets (icons, images)
``` 