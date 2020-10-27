import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import Details from '../screens/Details';
import Favorites from '../screens/Favorites';
import Repos from '../screens/Repos';

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

const AppNavigator: React.FC = () => (
  <NavigationContainer>
    <Stack.Navigator mode="modal">
      <Stack.Screen name="GitHub Repo Browser">
        {(props) => (
          <Tab.Navigator {...props}>
            <Tab.Screen name="Repos" component={Repos} />
            <Tab.Screen name="Favorites" component={Favorites} />
          </Tab.Navigator>
        )}
      </Stack.Screen>
      <Stack.Screen name="GitHub Repo Details" component={Details} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
