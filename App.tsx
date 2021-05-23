import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Init from './src/screens/Init'


const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Init" component={Init} options={{title: 'Plants Geo Locator'}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
