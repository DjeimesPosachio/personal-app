/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React, {useRef, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {createAxios} from '../../utils/axios-helper';
import PasswordInput from '../../components/PasswordInput';

const AlterarSenhaScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [confirmarNovaSenha, setConfirmarNovaSenha] = useState('');

  const flatListRef = useRef(null);

  const axios = createAxios();

  const updatePassword = async () => {
    setLoading(true);

    try {
      if (novaSenha !== confirmarNovaSenha) {
        throw new Error('As senhas não coincidem.');
      }

      const response = await axios.put('/perfil/atualizar-senha', {
        senhaAtual: senhaAtual,
        senha: novaSenha,
        novaSenha: confirmarNovaSenha,
      });

      console.log('Senha atualizada com sucesso!', response.data);
    } catch (error) {
      console.error('Erro ao atualizar senha!', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigation.goBack();
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Alterar Senha</Text>
      <View style={styles.line} />
      <View style={styles.inputContainer}>
        <View style={styles.inputRow}>
          <PasswordInput
            label="Senha Atual"
            value={senhaAtual}
            setValue={setSenhaAtual}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            mode="flat"
            textColor="#F7D100"
            secureTextEntry
          />
        </View>
        <View style={styles.inputRow}>
          <PasswordInput
            label="Nova Senha"
            value={novaSenha}
            setValue={setNovaSenha}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            mode="flat"
            textColor="#F7D100"
            secureTextEntry
          />
        </View>
        <PasswordInput
          label="Confirmar Nova Senha"
          value={confirmarNovaSenha}
          setValue={setConfirmarNovaSenha}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          mode="flat"
          textColor="#F7D100"
          secureTextEntry
        />
      </View>
      <Button
        mode="contained"
        style={styles.salvarButton}
        labelStyle={styles.salvarButtonText}
        loading={loading}
        disabled={loading}
        onPress={updatePassword}>
        SALVAR
      </Button>
      <Button
          mode="text"
          labelStyle={styles.cancelButton}
          loading={loading}
          disabled={loading}
          onPress={handleCancel}
        >
          CANCELAR
        </Button>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        ListHeaderComponent={renderHeader}
        refreshing={loading}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        refreshControl={<RefreshControl refreshing={loading} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  content: {
    flex: 1,
    backgroundColor: '#1F222A',
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  header: {
    backgroundColor: '#1F222A',
    paddingVertical: 10,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 10,
  },
  inputContainer: {
    marginTop: 20,
    marginBottom: 60,
    width: '100%',
  },
  inputRow: {
    marginBottom: 15,
  },
  salvarButton: {
    padding: 5,
    backgroundColor: '#F7D100',
    marginBottom: 20,
    width: '90%',
  },
  salvarButtonText: {
    color: 'black',
    fontSize: 16,
  },
  cancelButton: {
    color: '#F7D100',
    fontSize: 18,
  },
  line: {
    height: 2,
    backgroundColor: '#F7D100',
    width: '80%',
    marginBottom: 60,
  },
});

export default AlterarSenhaScreen;
