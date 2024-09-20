import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import LaunchDetailScreen from '../screens/LaunchDetailScreen';
import LaunchScreen from '../screens/LaunchListScreen';

export type RootStackParamList = {
  LaunchList: undefined;
  LaunchDetails: { launchId: string; youtubeId?: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="LaunchList">
      <Stack.Screen
        name="LaunchList"
        component={LaunchScreen}
        options={{ title: 'Lançamentos da SpaceX' }}
      />
      <Stack.Screen
        name="LaunchDetails"
        component={LaunchDetailScreen}
        options={{ title: 'Detalhes do' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
