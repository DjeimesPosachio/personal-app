/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  View,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {Button, Text} from 'react-native-paper';
import PasswordInput from '../../components/PasswordInput';
import {AuthContext} from '../../context/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_URL_PADRAO} from '../../consts';
import Config from 'react-native-config';
import EmailInput from '../../components/EmailInput';

const LoginScreen = ({navigation}) => {
  const {login, loading} = useContext(AuthContext);

  const [email, setEmail] = useState('cariani@gmail.com');
  const [password, setPassword] = useState('123456');
  const [showPassword, setShowPassword] = useState(true);

  useEffect(() => {
    const recuperarItem = async () => {
      try {
        const valor = await AsyncStorage.getItem(KEY_URL_PADRAO);

        if (valor !== null) {
          Config.URL_API = JSON.parse(valor).url;
        }
      } catch (erro) {
        console.error('Erro ao recuperar o item do AsyncStorage:', erro);
      }
    };

    recuperarItem();
  }, []);

  const handleLogin = async () => {
    const response = await login(email, password);

    if (response.status === 200) {
      Keyboard.dismiss();
      navigation.reset({
        index: 0,
        routes: [{name: 'Principal'}],
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.login}>
        <Text style={styles.loginText}>Login</Text>

        <EmailInput value={email} setValue={setEmail} />

        <PasswordInput
          value={password}
          setValue={setPassword}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
        />

        <Button
          mode="contained"
          style={styles.loginButton}
          labelStyle={styles.loginButtonText}
          loading={loading}
          disabled={loading}
          onPress={handleLogin}>
          ENTRAR
        </Button>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={styles.esqueceuSenhaText}>
          Esqueceu sua senha?{' '}
          <Text style={styles.recuperarSenhaText}>RECUPERAR</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChangeUrl');
        }}>
        <Text style={styles.esqueceuSenhaText}>
          <Text style={styles.recuperarSenhaText}>Alterar URL</Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'center',
    width: '100%',
    backgroundColor: '#181A20',
  },
  logo: {
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  login: {
    marginBottom: 10,
    marginHorizontal: 30,
  },
  loginText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  loginButton: {
    padding: 5,
    marginTop: 20,
    backgroundColor: '#F7D100',
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
  },
  esqueceuSenhaText: {
    fontSize: 16,
    marginHorizontal: 30,
    color: 'white',
  },
  recuperarSenhaText: {
    marginTop: 200,
    fontWeight: 'bold',
    color: '#F7D100',
  },
});

export default LoginScreen;
