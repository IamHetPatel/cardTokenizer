import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import UpdateProfile from "./UpdateProfile.js";
import UserProfile from "./UserProfile";
import Card from "./Card.js";
import DashboardScreen from './Dashboard';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import welcome from "./components/Welcome";
import Signup from "./components/signup";
import Login from "./components/login";
import Listing from "./components/Listing";

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
        <Stack.Screen
          name="welcome"
          component={welcome}
          options={{
            title: 'Tokenizer', //Set Header Title
            headerStyle: {
              backgroundColor: '#307ecc', //Set Header color
            },
            headerTintColor: '#fff', //Set Header text color
            headerTitleStyle: {
              fontWeight: 'bold', //Set Header text style
            },
          }}
        />
        <Stack.Screen
          name="signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        {/* Navigation Drawer as a landing page */}
        <Stack.Screen
          name="login"
          component={Login}
          // Hiding header for Navigation Drawer
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          
        />
        <Stack.Screen name="UserProfile" component={UserProfile}
         />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile}
       />
        <Stack.Screen name="Card" component={Card} 
        />
        <Stack.Screen name="Listing" component={Listing}
         />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 

export default MyStack


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff800b',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
