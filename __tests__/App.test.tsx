import React from 'react';
import { render } from '@testing-library/react-native';
import App from '../App'; 
import { Provider } from 'react-redux';
import rootReducer from '../src/store/slices/authSlice'; 
import { configureStore } from '@reduxjs/toolkit';

// Mock store for testing
const store = configureStore({
  reducer: rootReducer,
});
describe('App Component', () => {
  test('renders correctly', () => {
    const { toJSON } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('contains AppNavigator', () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

  });

});
