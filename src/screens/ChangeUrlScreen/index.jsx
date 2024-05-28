/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useState} from 'react';
import {StyleSheet, Image, View, KeyboardAvoidingView} from 'react-native';
import {Button, Text, TextInput} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {KEY_URL_PADRAO} from '../../consts';
import Config from 'react-native-config';

const ChangeUrlScreen = ({navigation}) => {
  const [url, setUrl] = useState('');

  useEffect(() => {
    const recuperarItem = async () => {
      try {
        const valor = await AsyncStorage.getItem(KEY_URL_PADRAO);

        if (valor !== null) {
          setUrl(JSON.parse(valor).url || Config.URL_API);
        } else {
          setUrl(Config.URL_API);
        }
      } catch (erro) {
        console.error('Erro ao recuperar o item do AsyncStorage:', erro);
      }
    };

    recuperarItem();
  }, []);

  const onSaveUrl = useCallback(() => {
    const objeto = {
      url: url || Config.URL_API,
    };

    AsyncStorage.setItem(KEY_URL_PADRAO, JSON.stringify(objeto));

    navigation.goBack();
  }, [navigation, url]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={true}
      style={styles.container}>
      <Image source={require('../../assets/logo.png')} style={styles.logo} />

      <View style={styles.alterarUrl}>
        <Text style={styles.alterarUrlText}>Alterar url padrão</Text>

        <TextInput
          style={styles.input}
          label="URL"
          mode="flat"
          textColor="#F7D100"
          left={<TextInput.Icon name="at" size={25} color="black" />}
          value={url}
          onChangeText={text => setUrl(text)}
          theme={{
            colors: {
              text: 'white',
              primary: '#F7D100',
              inversePrimary: 'green',
            },
          }}
        />
        <Button
          mode="contained"
          style={styles.alterarUrlButton}
          onPress={onSaveUrl}>
          ENTRAR
        </Button>
      </View>
    </KeyboardAvoidingView>
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
  alterarUrl: {
    marginBottom: 10,
    marginHorizontal: 30,
  },
  alterarUrlText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  alterarUrlButton: {
    padding: 5,
    marginTop: 20,
    backgroundColor: '#F7D100',
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: 'transparent',
    borderBottomColor: '#F7D100',
    borderBottomWidth: 2,
  },
});

export default ChangeUrlScreen;
