import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../../../src/navigation/AppNavigator'; 
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

describe('AppNavigator', () => {
    test('renders correctly', () => {
        const { toJSON } = render(
                <AppNavigator />
        );
        expect(toJSON()).toMatchSnapshot();
    });

    test('navigates to SplashScreen initially', () => {
        const { getByTestId } = render(
                <AppNavigator />
        );

        // Check if SplashScreen is rendered by its testID
        expect(getByTestId('splashScreenContainer')).toBeTruthy();
    });

    // test('navigates to SignUpScreen and SignUpSuccessScreen', () => {
    //     const { getByTestId } = render(
    //         <NavigationContainer>
    //             <Stack.Navigator initialRouteName="SignUpScreen" screenOptions={{ headerShown: false }}>
    //                 <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    //                 <Stack.Screen name="SignUpSuccessScreen" component={SignUpSuccessScreen} />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     );

    //     // Check if SignUpScreen is rendered by its testID
    //     expect(getByTestId('signUpScreenContainer')).toBeTruthy(); 
        
    //     const { getByTestId: getByTestIdSuccess } = render(
    //         <NavigationContainer>
    //             <Stack.Navigator initialRouteName="SignUpSuccessScreen" screenOptions={{ headerShown: false }}>
    //                 <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    //                 <Stack.Screen name="SignUpSuccessScreen" component={SignUpSuccessScreen} />
    //             </Stack.Navigator>
    //         </NavigationContainer>
    //     );

    //     // Check if SignUpSuccessScreen is rendered by its testID
    //     expect(getByTestIdSuccess('signUpSuccessScreenContainer')).toBeTruthy(); // Adjust based on SignUpSuccessScreen content
    // });
});