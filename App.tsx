import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Toast from 'react-native-toast-message'; // Importe o Toast
import { Provider } from 'react-redux';

import RootNavigator from './src/navigation/RootNavigator';
import { store } from './src/store/store';

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
        <Toast />
      </NavigationContainer>
    </Provider>
  );
}
