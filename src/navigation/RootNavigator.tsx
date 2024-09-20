import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import ArticleWebViewScreen from '../screens/ArticleWebViewScreen';
import LaunchDetailScreen from '../screens/LaunchDetailScreen';
import LaunchScreen from '../screens/LaunchListScreen';

export type RootStackParamList = {
  LaunchList: undefined;
  LaunchDetails: { launchId: string; youtubeId?: string; articleUrl?: string };
  ArticleWebViewScreen: { articleUrl: string };
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
        options={{ title: 'Detalhes do lançamento' }}
      />
      <Stack.Screen
        name="ArticleWebViewScreen"
        component={ArticleWebViewScreen}
        options={{ title: 'Leia o artigo' }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
