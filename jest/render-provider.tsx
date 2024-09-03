import React from 'react';
import { render, RenderOptions } from '@testing-library/react-native';
import { Provider } from 'react-redux';
import  store  from '../src/store/store'; 
import { NavigationContainer } from '@react-navigation/native';

// Custom render function that includes Redux and Navigation providers
const renderWithProviders = (
  ui: React.ReactElement,
  options?: RenderOptions
) => {
  return render(
    <Provider store={store}>
      <NavigationContainer>
        {ui}
      </NavigationContainer>
    </Provider>,
    options
  );
};

export * from '@testing-library/react-native';
export { renderWithProviders };
