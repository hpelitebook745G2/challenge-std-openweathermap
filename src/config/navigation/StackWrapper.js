import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as screens from '../../containers';

const DashboardStack = createNativeStackNavigator();

const App = () => (
  <NavigationContainer>
    <DashboardStack.Navigator>
      <DashboardStack.Screen
        name="MapScreen"
        options={{ title: 'MyOpenWeatherMap' }}
        component={screens.MapScreen}
      />
      <DashboardStack.Screen
        name="CitiesScreen"
        options={{ title: 'Cities List' }}
        component={screens.CitiesScreen}
      />
    </DashboardStack.Navigator>
  </NavigationContainer>
);

export default App;
