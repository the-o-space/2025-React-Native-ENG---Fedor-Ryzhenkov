import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CameraScreen from './screens/CameraScreen';
import PhotoConfirmationScreen from './screens/PhotoConfirmationScreen';
import ContactSelectionScreen from './screens/ContactSelectionScreen';
import SummaryScreen from './screens/SummaryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#3498db',
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
          options={{
            title: 'Document Scanner',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="Camera" 
          component={CameraScreen}
          options={{
            title: 'Capture Photo',
            headerShown: false,
          }}
        />
        <Stack.Screen 
          name="PhotoConfirmation" 
          component={PhotoConfirmationScreen}
          options={{
            title: 'Review Photo',
            headerBackTitle: 'Retake',
          }}
        />
        <Stack.Screen 
          name="ContactSelection" 
          component={ContactSelectionScreen}
          options={{
            title: 'Emergency Contacts',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen 
          name="Summary" 
          component={SummaryScreen}
          options={{
            title: 'Summary',
            headerLeft: null,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
