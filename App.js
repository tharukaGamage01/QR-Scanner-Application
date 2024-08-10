import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ChangePassword } from './Screens/Profile/ChangePassword';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import UrlHistory from './Screens/URLHistory/URLHistoryScreen';
import Login from './Screens/Login/LoginScreen';
import Scanner from './Screens/Scanner/ScannerPage';
import RegisterPage from './Screens/Register/RegisterPage';
import { ProfilePage } from './Screens/Profile/ProfilePage';
import FeedbackPage from './Screens/Profile/FeedbackPage';
import SeeQuRe from './Screens/Landing/Landing';
import AboutUs from './Screens/AboutUs/AboutUsScreen';
import ScannerPage from './Screens/Scanner/ScannerPage';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ProfileStack = () => (
  <Stack.Navigator initialRouteName='profile page' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="profile page" component={ProfilePage} />
    <Stack.Screen name="changePassword" component={ChangePassword} />
    <Stack.Screen name="feedback" component={FeedbackPage} />
   
  </Stack.Navigator>
);


const App = () => {
  const [isFirstTime, setIsFirstTime] = useState(true);

  useEffect(() => {
    // Check if it's the first time opening the app
    // For example, you can use AsyncStorage to store a flag
    // indicating whether the app has been opened before
    setIsFirstTime(false);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isFirstTime ? "Landing" : "Login"} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="landing" component={SeeQuRe} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={RegisterPage} />
        <Stack.Screen name="main" component={MainTabNavigator} />
        <Stack.Screen name="About Us" component={AboutUs} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

const MainTabNavigator = () => (
  <Tab.Navigator
    initialRouteName="scanner" 
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'scanner') {
          iconName = 'line-scan';
        } else if (route.name === 'Profile') {
          iconName = 'account';
        } else if (route.name === 'URLHistory') {
          iconName = 'history';
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
    })}
  >
   
    <Tab.Screen name="URLHistory" component={UrlHistory} options={{headerShown:false}} />
    <Tab.Screen name="scanner" component={ScannerPage}  options={{headerShown:false}}  />
    <Tab.Screen name="Profile" component={ProfileStack}  options={{headerShown:false}} />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;