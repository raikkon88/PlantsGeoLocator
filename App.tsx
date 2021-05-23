import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Map from './src/screens/Map'


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Map" component={Map} options={{title: 'Plants Geo Locator'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
