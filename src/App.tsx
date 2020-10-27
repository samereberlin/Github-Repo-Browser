import 'react-native-gesture-handler';
import React from 'react';

import AppNavigator from './navigation/AppNavigator';
import {StoreProvider} from './store/StoreContext';

const App: React.FC = () => (
  <StoreProvider>
    <AppNavigator />
  </StoreProvider>
);

export default App;
