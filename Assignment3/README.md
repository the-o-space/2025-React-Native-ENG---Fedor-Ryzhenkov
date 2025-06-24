# Assignment 3: Event Manager App

An event management React Native application featuring multi-step forms, Redux Toolkit for state management, form validation with react-hook-form and yup.

## Features

- View list of all events with details
- Multi-step form for adding events:
  - Step 1: Basic Information (title, date)
  - Step 2: Additional Information (location, description)
- Form validation with error messages
- Future date restriction for event dates
- Redux Toolkit for global state management
- Progress indicator for multi-step form
- Form data preservation when navigating between steps

## Project Structure

```
EventManager/
├── App.js                    # Main app with Redux Provider and Navigation
├── store/
│   ├── store.js             # Redux store configuration
│   └── eventsSlice.js       # Events state management
├── screens/
│   ├── EventListScreen.js   # Main screen displaying all events
│   ├── EventFormStep1Screen.js  # Step 1: Title and Date
│   └── EventFormStep2Screen.js  # Step 2: Location and Description
└── package.json
```

## Technical Stack

- **State Management**: Redux Toolkit
- **Navigation**: React Navigation (Stack Navigator)
- **Form Handling**: react-hook-form
- **Validation**: yup
- **Date Picker**: @react-native-community/datetimepicker
- **UI Components**: React Native core components
- **Icons**: @expo/vector-icons

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd Assignment3/EventManager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on your preferred platform:
   - Press `i` for iOS
   - Press `a` for Android
   - Press `w` for web

## Implementation Details

### Redux Store Structure
```javascript
{
  events: {
    events: [
      {
        id: "timestamp",
        title: "Event Title",
        date: "ISO date string",
        location: "Optional location",
        description: "Optional description",
        createdAt: "ISO timestamp"
      }
    ]
  }
}
```

### Form Validation Rules

#### Step 1 - Basic Information:
- **Title**: Required field
- **Date**: Required, must be a future date

#### Step 2 - Additional Information:
- **Location**: Optional
- **Description**: Optional, but if provided must be at least 10 characters

### Navigation Flow
1. Event List Screen (with + button in header)
2. Tap + → Event Form Step 1
3. Fill form and tap Next → Event Form Step 2
4. Can tap Back to return to Step 1 (preserves data)
5. Submit → Creates event and returns to Event List

### Key Features Implementation

- **Multi-step Form**: Data is passed between screens via navigation params
- **Form Persistence**: Form data is preserved when navigating back
- **Validation**: Real-time validation with error messages
- **Date Picker**: Native date picker with future date restriction
- **Redux Integration**: Events are stored globally and persist during app session 