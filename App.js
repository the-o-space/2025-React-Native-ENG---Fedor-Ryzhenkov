import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import screens
import EventListScreen from './screens/EventListScreen';
import EventFormStep1Screen from './screens/EventFormStep1Screen';
import EventFormStep2Screen from './screens/EventFormStep2Screen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="EventList"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#4CAF50',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="EventList" 
        component={EventListScreen}
        options={{ title: 'My Events' }}
      />
      <Stack.Screen 
        name="EventFormStep1" 
        component={EventFormStep1Screen}
        options={{ title: 'Create Event' }}
      />
      <Stack.Screen 
        name="EventFormStep2" 
        component={EventFormStep2Screen}
        options={{ title: 'Create Event' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
} 