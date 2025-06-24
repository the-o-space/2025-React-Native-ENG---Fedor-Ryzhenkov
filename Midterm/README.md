# Personal Fitness Tracker - Midterm Project

A React Native fitness tracking app built with Expo that allows users to log workouts, view their fitness history, and customize the app appearance with light/dark themes.

## Features

- **Home Screen**: Welcome message with workout summary statistics
- **Workout List**: Scrollable list of all logged workouts with detailed modal view
- **Log Workout**: Form to add new workouts with name, duration, and date
- **Settings**: Theme toggle (light/dark mode) and data reset functionality
- **State Management**: Redux Toolkit for workout data, Context API for theme
- **Navigation**: Bottom tab navigation for easy access to all screens

## Tech Stack

- React Native with Expo
- Redux Toolkit for state management
- Context API for theme management
- React Navigation (Bottom Tabs)
- React Native Modal for workout details
- React Native DateTimePicker for date selection
- React Hook Form for form handling

## Installation

1. Navigate to the project directory:
```bash
cd Midterm/FitnessTracker
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npx expo start
```

## Architecture

### State Management
- **Redux**: Manages workout data with actions for adding workouts and clearing all data
- **Context API**: Manages theme state (light/dark mode) across the entire app

### Screens
- **HomeScreen**: Displays total workouts count and cumulative duration
- **WorkoutListScreen**: Shows all workouts with tap-to-view details in modal
- **LogWorkoutScreen**: Form with validation for creating new workouts
- **SettingsScreen**: Theme toggle and data management options

### Styling
- Dynamic theming system with light and dark modes
- Consistent color palette and responsive design
- Modern UI with shadows and rounded corners

## Usage

1. **Add Workout**: Navigate to the Log tab, fill in workout details, and submit
2. **View Workouts**: Go to the Workouts tab to see all logged activities
3. **View Details**: Tap any workout to see detailed information in a modal
4. **Change Theme**: Toggle between light and dark modes in Settings
5. **Reset Data**: Clear all workout history from the Settings screen

## Data Structure

Workout object:
```javascript
{
  id: string,          // Unique identifier
  name: string,        // Workout name
  duration: number,    // Duration in minutes
  date: string,        // ISO date string
 