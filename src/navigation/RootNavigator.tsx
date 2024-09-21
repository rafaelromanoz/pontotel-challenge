import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
import { auth } from 'firebaseConfig';
import React, { useState } from 'react';
import { TouchableOpacity, View, StatusBar } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import LogoutModal from '../components/LogoutModal';
import ArticleWebViewScreen from '../screens/ArticleWebViewScreen';
import LaunchDetailScreen from '../screens/LaunchDetailScreen';
import LaunchListScreen from '../screens/LaunchListScreen';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { toggleTheme } from '../store/slices/themeSlice';
import { useAppDispatch, useAppSelector } from '../store/store';
import { lightTheme, darkTheme } from '../theme/theme';

export type RootStackParamList = {
  LaunchList: undefined;
  LaunchDetails: { launchId: string; youtubeId?: string; articleUrl?: string };
  ArticleWebViewScreen: { articleUrl: string };
  Login: undefined;
  SignUp: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const theme = isDarkMode ? darkTheme : lightTheme;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setModalVisible(false);
      navigation.navigate('Login');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  const showLogoutConfirmation = () => {
    setModalVisible(true);
  };

  const renderHeaderRight = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => dispatch(toggleTheme())} style={{ marginRight: 15 }}>
        <Ionicons
          name={isDarkMode ? 'sunny-outline' : 'moon-outline'}
          size={24}
          color={theme.text}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={showLogoutConfirmation} style={{ marginRight: 15 }}>
        <Icon name="logout" size={24} color={theme.text} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={theme.background}
      />

      <LogoutModal
        isVisible={isModalVisible}
        onConfirm={handleSignOut}
        onCancel={() => setModalVisible(false)}
      />

      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.background,
          },
          headerTintColor: theme.text,
          headerRight: () => renderHeaderRight(),
        }}>
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Cadastrar' }} />
        <Stack.Screen
          name="LaunchList"
          component={LaunchListScreen}
          options={{
            title: 'Lançamentos da SpaceX',
          }}
        />
        <Stack.Screen
          name="LaunchDetails"
          component={LaunchDetailScreen}
          options={{
            title: 'Detalhes do Lançamento',
          }}
        />
        <Stack.Screen
          name="ArticleWebViewScreen"
          component={ArticleWebViewScreen}
          options={{ title: 'Leia o artigo' }}
        />
      </Stack.Navigator>
    </>
  );
};

export default RootNavigator;
