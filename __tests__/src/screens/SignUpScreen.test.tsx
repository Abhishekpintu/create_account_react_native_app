import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react-native';
import SignUpScreen from '../../../src/screens/SignUpScreen'; // Adjust the import path
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../src/navigation/AppNavigator'; // Adjust the import path
import { renderWithProviders } from '../../../jest/render-provider'; // Adjust the import path

// Create a mock navigation prop that adheres to the StackNavigationProp type
const createMockNavigation = (): StackNavigationProp<RootStackParamList, 'SignUpScreen'> => ({
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
} as unknown as StackNavigationProp<RootStackParamList, 'SignUpScreen'>);

describe('SignUpScreen', () => {
 

  it('should render correctly', () => {

    const mockNavigation = createMockNavigation();
    const { getByPlaceholderText, getByText, getByTestId } = renderWithProviders(
      <SignUpScreen navigation={mockNavigation} />
    );

    expect(getByText('Create Account')).toBeTruthy();
    expect(getByPlaceholderText('Full Name')).toBeTruthy();
    expect(getByPlaceholderText('Email ID')).toBeTruthy();
    expect(getByPlaceholderText('Password')).toBeTruthy();
  });

  it('should show error messages for empty input', async () => {
    const mockNavigation = createMockNavigation();
    const { getByPlaceholderText, getByText, getByTestId } = renderWithProviders(
      <SignUpScreen navigation={mockNavigation} />
    );


    fireEvent.changeText(getByPlaceholderText('Full Name'), '');
    fireEvent.changeText(getByPlaceholderText('Email ID'), '');
    fireEvent.changeText(getByPlaceholderText('Password'), '');

    fireEvent.press(getByTestId('termNcondition'));
    fireEvent.press(getByText('SIGN UP'));


    await waitFor(() => {
      expect(getByText('Full Name is required')).toBeTruthy();
      expect(getByText('Email ID is required')).toBeTruthy();
      expect(getByText('Password is required')).toBeTruthy();
    });
  });

  it('should show error messages for invalid password input', async () => {
    const mockNavigation = createMockNavigation();
    const { getByPlaceholderText, getByText, getByTestId } = renderWithProviders(
      <SignUpScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), 'Test User');
    fireEvent.changeText(getByPlaceholderText('Email ID'), 'test.user@example.com');
    fireEvent.changeText(getByPlaceholderText('Password'), 'P@ssword123');

    fireEvent.press(getByTestId('termNcondition'));
    fireEvent.press(getByText('SIGN UP'));


    await waitFor(() => {
      expect(getByText('Password should contain only letters and numbers')).toBeTruthy();
    });
  });

  it('should toggle password visibility when eye icon is pressed', async () => {
    const mockNavigation = createMockNavigation();
    const {getByTestId, getByPlaceholderText } = renderWithProviders(
      <SignUpScreen navigation={mockNavigation} />
    );
    const passwordInput = getByPlaceholderText('Password');
    const eyeIcon = getByTestId('passwordToggle');

    // Check initial state: password is hidden
    expect(passwordInput.props.secureTextEntry).toBe(true);
    
    // Press the eye icon to show password
    fireEvent.press(eyeIcon);
    expect(passwordInput.props.secureTextEntry).toBe(false);
    
    // Press the eye icon again to hide password
    fireEvent.press(eyeIcon);
    expect(passwordInput.props.secureTextEntry).toBe(true);

  });


  it('should show error messages for invalid input', async () => {
    const mockNavigation = createMockNavigation();
    const { getByPlaceholderText, getByText, getByTestId } = renderWithProviders(
      <SignUpScreen navigation={mockNavigation} />
    );

    fireEvent.changeText(getByPlaceholderText('Full Name'), '');
    fireEvent.changeText(getByPlaceholderText('Email ID'), 'invalidemail');
    fireEvent.changeText(getByPlaceholderText('Password'), 'short');

    fireEvent.press(getByTestId('termNcondition'));
    fireEvent.press(getByText('SIGN UP'));


    await waitFor(() => {
      expect(getByText('Full Name is required')).toBeTruthy();
      expect(getByText('Please enter a valid email address')).toBeTruthy();
      expect(getByText('Password must be at least 8 characters long')).toBeTruthy();
    });
  });

    it('should navigate to SignUpSuccessScreen on successful signup', async () => {
      const mockNavigation = createMockNavigation();
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: true,
        } as Response)
      );

      const { getByPlaceholderText, getByText, getByTestId } = renderWithProviders(
        <SignUpScreen navigation={mockNavigation} />
      );

      fireEvent.changeText(getByPlaceholderText('Full Name'), 'Test User');
      fireEvent.changeText(getByPlaceholderText('Email ID'), 'test.user@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
      fireEvent.press(getByTestId('termNcondition'));
      fireEvent.press(getByText('SIGN UP'));

      await waitFor(() => {
        expect(mockNavigation.replace).toHaveBeenCalledWith('SignUpSuccessScreen');
      });
    });

    it('should show error for already existing emailId', async () => {
      const mockNavigation = createMockNavigation();
      jest.spyOn(global, 'fetch').mockImplementation(() =>
        Promise.resolve({
          ok: false,
          json: () => Promise.resolve({ message: 'Email already taken' }),
        } as Response)
      );

      const { getByPlaceholderText, getByText, getByTestId } = renderWithProviders(
        <SignUpScreen navigation={mockNavigation} />
      );

      fireEvent.changeText(getByPlaceholderText('Full Name'), 'Test User');
      fireEvent.changeText(getByPlaceholderText('Email ID'), 'test.user@example.com');
      fireEvent.changeText(getByPlaceholderText('Password'), 'password123');
      fireEvent.press(getByTestId('termNcondition'));
      fireEvent.press(getByText('SIGN UP'));

      await waitFor(() => {
        expect(getByText('Email already taken')).toBeTruthy();
      });
    });

    // it('should display an error message when the server returns an error', async () => {
    //   // Mock the fetch to return a rejected promise with an error message
    //   (fetch as jest.MockedFunction<typeof fetch>).mockImplementation(() =>
    //     Promise.resolve({
    //       ok: false,
    //       json: () => Promise.resolve({ message: 'Email is already in use' }),
    //     } as Response)
    //   );
  
    //   const { getByPlaceholderText, getByText } = render(<SignUpScreen />);
  
    //   // Fill out the form
    //   fireEvent.changeText(getByPlaceholderText('Email ID'), 'test@example.com');
  
    //   // Trigger the signup
    //   fireEvent.press(getByText('Sign Up'));
  
    //   // Wait for the error message to appear
    //   await waitFor(() => {
    //     expect(getByText('Email is already in use')).toBeTruthy();
    //   });
    // });
});

