# Assignment 2: Food Delivery App

A React Native food delivery application featuring navigation with Stack and Tab navigators, and state management using React's Context API.

## Features

- Browse food categories with colorful cards
- View meals by category with images and prices
- Detailed meal view with ingredients
- Order meals with confirmation screen
- View order history with timestamps
- Bottom tab navigation between Home and Orders
- Global state management for orders using Context API

## Project Structure

```
FoodDeliveryApp/
├── App.js                    # Main app component with navigation setup
├── context/
│   └── OrderContext.js       # Context for managing global order state
├── data/
│   └── data.js              # Food categories and meals data
├── screens/
│   ├── HomeScreen.js        # Displays food categories
│   ├── CategoryMealsScreen.js  # Shows meals in selected category
│   ├── MealDetailsScreen.js    # Detailed meal view with order button
│   ├── OrderConfirmationScreen.js  # Order success confirmation
│   └── OrdersScreen.js      # List of all ordered meals
└── package.json
```

## Navigation Structure

### Stack Navigator
- Home → Category Meals → Meal Details → Order Confirmation

### Bottom Tab Navigator
- Tab 1: Home (with stack navigation)
- Tab 2: Orders (order history)

## Getting Started

1. Navigate to the project directory:
   ```bash
   cd Assignment2/FoodDeliveryApp
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

## Key Technologies

- React Native & Expo
- React Navigation (Stack & Tab navigators)
- React Context API
- React Native Safe Area Context
- Expo Vector Icons

## Implementation Details

### Context API Usage
The app uses React's Context API to manage the global state of ordered meals:
- `OrderProvider` wraps the entire app
- `useOrderContext` hook provides access to orders and actions
- Orders persist throughout the app session

### Navigation Flow
1. Users start at the Home screen with food categories
2. Selecting a category navigates to meals in that category
3. Tapping a meal shows detailed view with order option
4. Ordering navigates to confirmation screen
5. Users can view all orders in the Orders tab

### Styling
- Modern, clean UI with consistent color scheme
- Primary color: #f54242 (red)
- Card-based layouts with shadows
- Responsive design for various screen sizes 