import React from 'react';
import { render } from '@testing-library/react-native';
import AppNavigator from '../../../src/navigation/AppNavigator'; 


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


});