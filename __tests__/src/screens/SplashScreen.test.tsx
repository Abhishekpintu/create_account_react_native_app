import React from 'react';
import configureStore from 'redux-mock-store';
import SplashScreen from '../../../src/screens/SplashScreen';
import { RootStackParamList } from '../../../src/navigation/AppNavigator';
import { StackNavigationProp } from '@react-navigation/stack';
import { renderWithProviders } from '../../../jest/render-provider';

const createMockNavigation = (): StackNavigationProp<RootStackParamList, 'SplashScreen'> => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
    replace: jest.fn(),
    push: jest.fn(),
    setParams: jest.fn(),
    canGoBack: jest.fn(),
    reset: jest.fn(),
    getParent: jest.fn(),
    dispatch: jest.fn(),
    addListener: jest.fn(),
    isFocused: jest.fn(),
    getId: jest.fn(),
    getState: jest.fn(),
} as unknown as StackNavigationProp<RootStackParamList, 'SplashScreen'>);

const mockStore = configureStore([]);

describe('SplashScreen', () => {
    let store: ReturnType<typeof mockStore>;

    beforeEach(() => {
        const mockNavigation = createMockNavigation();
        const { getByText, getByPlaceholderText } = renderWithProviders(
            <SplashScreen navigation={mockNavigation} />
        );
    });

    it('renders correctly', () => {

        const mockNavigation = createMockNavigation();
        const { getByTestId } = renderWithProviders(
            <SplashScreen navigation={mockNavigation} />
        );

        // Check if the container is rendered
        expect(getByTestId('splashScreenContainer')).toBeTruthy();

    });

    it('navigates to SignUpScreen after 2 seconds', async () => {

        jest.useFakeTimers();
        const mockNavigation = createMockNavigation();
        const { getByTestId } = renderWithProviders(
            <SplashScreen navigation={mockNavigation} />
        );
        // Fast-forward time
        jest.advanceTimersByTime(2000);

        // Check if replace was called with 'SignUpScreen'
        expect(mockNavigation.replace).toHaveBeenCalledWith('SignUpScreen');

        // Clean up
        jest.useRealTimers();
    });
});
