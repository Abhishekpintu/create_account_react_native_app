import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/Splashscreen';
import SignUpScreen from '../screens/SignUpScreen';
import SignUpSuccessScreen from '../screens/SignUpSuccessScreen';


export type RootStackParamList = {
    SplashScreen: undefined; //No Params expected
    SignUpScreen: undefined; //No Params expected
    SignUpSuccessScreen: undefined; //No Params expected
  };

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="SignUpSuccessScreen" component={SignUpSuccessScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default AppNavigator;
