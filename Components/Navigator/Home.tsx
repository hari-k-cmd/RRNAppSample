import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './../Pages/HomeScreen';
import CreateDataScreen from '../Pages/CreateDataScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Create' component={CreateDataScreen} />

    </Stack.Navigator>
  );
}