import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { TextInput, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Toast from 'react-native-toast-message';

import { auth } from '../../firebaseConfig';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<any>();

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Toast.show({
        type: 'success',
        text1: 'Conta criada com sucesso',
        text2: 'Você foi autenticado com sucesso!',
      });
      navigation.navigate('LaunchList');
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Erro ao criar conta',
        text2: (error as Error).message,
      });
    }
  };

  const goToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: 'https://gestao.pontotel.com.br/img/logo-pontotel.5d343a24.png' }}
        style={styles.logo}
        resizeMode="contain"
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={goToLogin}>
        Já tem login? <Text style={styles.linkHighlight}>Faça login</Text>
      </Text>

      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/SpaceX-Logo.svg/2560px-SpaceX-Logo.svg.png',
        }}
        style={styles.spacexLogo}
        resizeMode="contain"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: '80%',
    height: 150,
    marginBottom: 30,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#FCCC31',
    paddingVertical: 15,
    borderRadius: 25,
    width: '90%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 20,
    fontSize: 14,
    color: '#79397D',
  },
  linkHighlight: {
    color: '#FCCC31',
    fontWeight: 'bold',
  },
  spacexLogo: {
    width: '80%',
    height: 100,
    marginTop: 50,
  },
});

export default SignUpScreen;
