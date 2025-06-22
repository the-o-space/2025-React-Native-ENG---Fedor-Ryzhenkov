import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { OrderProvider } from './context/OrderContext';

// Import screens
import HomeScreen from './screens/HomeScreen';
import CategoryMealsScreen from './screens/CategoryMealsScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import OrderConfirmationScreen from './screens/OrderConfirmationScreen';
import OrdersScreen from './screens/OrdersScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for the Home tab flow
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f54242',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ title: 'Food Categories' }}
      />
      <Stack.Screen 
        name="CategoryMeals" 
        component={CategoryMealsScreen}
      />
      <Stack.Screen 
        name="MealDetails" 
        component={MealDetailsScreen}
      />
      <Stack.Screen 
        name="OrderConfirmation" 
        component={OrderConfirmationScreen}
        options={{ 
          title: 'Order Confirmation',
          headerLeft: null,
          gestureEnabled: false
        }}
      />
    </Stack.Navigator>
  );
}

// Stack Navigator for the Orders tab
function OrdersStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#f54242',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="OrdersList" 
        component={OrdersScreen}
        options={{ title: 'My Orders' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'OrdersTab') {
            iconName = focused ? 'receipt' : 'receipt-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#f54242',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackNavigator}
        options={{ title: 'Home' }}
      />
      <Tab.Screen 
        name="OrdersTab" 
        component={OrdersStackNavigator}
        options={{ title: 'Orders' }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <OrderProvider>
      <NavigationContainer>
        <TabNavigator />
      </NavigationContainer>
    </OrderProvider>
  );
} 