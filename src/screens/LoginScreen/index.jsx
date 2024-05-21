/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Button, Text} from 'react-native-paper';
import PasswordInput from '../../components/PasswordInput';
import {AuthContext} from '../../context/AuthContext';
import EmailInput from '../../components/TelefoneInput';

const LoginScreen = ({navigation}) => {
  const {login} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const handleLogin = () => {
    login(email, password);
  };

  return (
    <TouchableWithoutFeedback
      touchSoundDisabled
      onPress={() => Keyboard.dismiss()}>
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
            onPress={handleLogin}>
            Login
          </Button>
        </View>
        <Text style={styles.esqueceuSenhaText}>
          Esqueceu sua senha?{' '}
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={styles.recuperarSenhaText}>RECUPERAR</Text>
          </TouchableOpacity>
        </Text>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    color: 'white',
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
