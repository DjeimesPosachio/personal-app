/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {List, Text} from 'react-native-paper';
import {createAxios} from '../../utils/axios-helper';
import {getLabelEnumByKeyAndDomain} from '../../utils/enums';
import { getUsuarioLogado } from '../../utils/async-storage-helper';

const DietaScreen = () => {
  const [loading, setLoading] = useState(false);

  const [planejamento, setPlanejamento] = useState({});

  const [usuarioLogado, setUsuarioLogado] = useState(null);

  const flatListRef = useRef(null);

  const axios = createAxios();

  const requestData = useCallback(() => {
    setLoading(true);
    axios
      .get('/planejamento-dieta')
      .then(response => {
        setPlanejamento(response?.data);
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [axios]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUsuarioLogado();
        await requestData();
        setUsuarioLogado(user);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  const handleRefresh = useCallback(() => {
    requestData();
  }, [requestData]);

  const renderItem = ({item, index}) => (
    <View style={[styles.cardContainer, index === 0 && {marginTop: 30}]}>
      <List.Accordion
        key={item.id}
        title={item.descricao}
        description={getLabelEnumByKeyAndDomain(
          'TipoRefeicao',
          item.tipoRefeicao,
        )}
        style={styles.cardContent}
        titleStyle={styles.descricaoText}
        descriptionStyle={styles.tipoRefeicaoText}
        left={() => (
          <Text style={styles.horaRefeicao}>{item.horaRefeicao}</Text>
        )}>
        {item?.itensRefeicao?.map(itemRefeicao => (
          <Text style={styles.exercicioDescricao}>
            {`${itemRefeicao?.descricao} - ${
              itemRefeicao?.quantidade
            } ${getLabelEnumByKeyAndDomain(
              'UnidadeMedida',
              itemRefeicao?.unidadeMedida,
            )}`}
          </Text>
        ))}
      </List.Accordion>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{usuarioLogado?.nome} - Dietas</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={planejamento?.refeicoes}
        renderItem={renderItem}
        ListHeaderComponent={renderHeader}
        refreshing={loading}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={loading} />
        }
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
  descricaoText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  tipoRefeicaoText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: 5,
  },
  exercicioDescricao: {
    color: 'white',
    fontSize: 16,
    marginLeft: -20,
    marginBottom: 10,
  },
  cardContainer: {
    backgroundColor: '#181A20',
    paddingVertical: 20,
    marginBottom: 30,
    borderRadius: 25,
  },
  cardContent: {
    backgroundColor: '#181A20',
  },
  alimentoDescricao: {
    color: 'white',
    fontSize: 16,
    marginLeft: -20,
    marginBottom: 10,
  },
  horaRefeicao: {
    justifyContent: 'center',
    marginLeft: 20,
    marginTop: 16,
    fontSize: 16,
    color: '#F7D100',
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
    marginTop: 20,
  },
});

export default DietaScreen;
