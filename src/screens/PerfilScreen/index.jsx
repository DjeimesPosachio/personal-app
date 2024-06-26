/* eslint-disable prettier/prettier */
import React, {useContext, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Keyboard,
} from 'react-native';
import {Text, Button} from 'react-native-paper';
import {AuthContext} from '../../context/AuthContext';
import { getUsuarioLogado } from '../../utils/async-storage-helper';

const PerfilScreen = ({navigation}) => {
  const {logout} = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const flatListRef = useRef(null);

  const handleLogout = async () => {
    setLoading(true);
    await logout();
    setLoading(false);
    Keyboard.dismiss();
    navigation.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUsuarioLogado();
      setUsuarioLogado(user);
    };
    fetchData();

  }, []);

  const handleAlterarSenha = () => {
    navigation.navigate('AlterarSenha');
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>Meus dados</Text>
      <View style={styles.line} />
      <View style={styles.userInfoContainer}>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Nome: </Text>
          <Text style={styles.userInfoText}>{usuarioLogado?.nome}</Text>
        </View>
        <View style={styles.userInfoRow}>
          <Text style={styles.userInfoLabel}>Email:</Text>
          <Text style={styles.userInfoText}>{usuarioLogado?.email}</Text>
        </View>
      </View>
      <Button
        mode="contained"
        style={styles.alterarSenhaButton}
        labelStyle={styles.alterarSenhaButtonText}
        loading={loading}
        disabled={loading}
        onPress={handleAlterarSenha}>
        ALTERAR SENHA
      </Button>
      <Button
        mode="text"
        labelStyle={styles.sairButton}
        loading={loading}
        disabled={loading}
        onPress={handleLogout}>
        SAIR
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
  userInfoContainer: {
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  userInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfoLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginRight: 5,
  },
  userInfoText: {
    color: 'white',
    fontSize: 18,
  },
  alterarSenhaButton: {
    padding: 5,
    marginTop: 115,
    backgroundColor: '#F7D100',
    marginBottom: 20,
    width: '90%',
  },
  alterarSenhaButtonText: {
    color: 'black',
    fontSize: 16,
  },
  sairButton: {
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

export default PerfilScreen;
