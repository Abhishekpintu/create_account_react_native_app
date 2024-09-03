import React from 'react';
import { render, screen } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import SignUpSuccessScreen from '../../../src/screens/SignUpSuccessScreen';
import { RootStackParamList } from '../../../src/navigation/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { renderWithProviders } from '../../../jest/render-provider'; 

const createMockNavigation = (): StackNavigationProp<RootStackParamList, 'SignUpSuccessScreen'> => ({
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
  } as unknown as StackNavigationProp<RootStackParamList, 'SignUpSuccessScreen'>);

const mockStore = configureStore([]);

describe('SignUpSuccessScreen', () => {

    const mockNavigation = createMockNavigation();
    const { getByText, getByPlaceholderText } = renderWithProviders(
      <SignUpSuccessScreen navigation={mockNavigation} />
    );  

  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          fullName: 'Test User',
          emailId: 'test.user@example.com',
        },
      },
    });
  });

  it('renders correctly', () => {
    render(
      <Provider store={store}>
        <NavigationContainer>
          <SignUpSuccessScreen navigation={{} as any} />
        </NavigationContainer>
      </Provider>
    );

    // Ensure the container is rendered
    expect(screen.getByTestId('SignUpSuccessScreenContainer')).toBeTruthy();

    // Check if the Lottie animation is rendered
    const lottieComponent = screen.getByTestId('lottie-animation');
    expect(lottieComponent).toBeTruthy();

    // Check if the user info from Redux store is displayed correctly
    expect(screen.getByText(/Test User/)).toBeTruthy();
    expect(screen.getByText(/test.user@example.com/)).toBeTruthy();
  });
});
