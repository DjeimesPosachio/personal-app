/* eslint-disable prettier/prettier */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StyleSheet, View, FlatList, RefreshControl} from 'react-native';
import {List, Text} from 'react-native-paper';
import {createAxios} from '../../utils/axios-helper';

const TreinoScreen = () => {
  const [loading, setLoading] = useState(false);
  const [planejamento, setPlanejamento] = useState({});
  const flatListRef = useRef(null);

  const axios = createAxios();

  const requestData = useCallback(() => {
    setLoading(true);
    axios
      .get('/planejamento-treino')
      .then(response => {
        setPlanejamento(response?.data);
        flatListRef.current.scrollToEnd({animated: false});
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false));
  }, [axios]);

  useEffect(() => {
    requestData();
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
        style={styles.cardContent}
        titleStyle={styles.descricaoText}
        left={() => (
          <Text style={styles.sequenciaTreino}>{item.sequenciaTreino}</Text>
        )}>
        {item.metricasExercicio.map((exercicio, metricasIndex) => (
          <View key={metricasIndex} style={styles.exercicioContainer}>
            <Text style={styles.exercicioDescricao}>
              {`${exercicio.nomeExercicio} - ${exercicio.series} x ${exercicio.repeticoes}`}
            </Text>
          </View>
        ))}
      </List.Accordion>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>User u. - Treinos</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={planejamento?.treinos}
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
    flex: 1,
    backgroundColor: '#181A20',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  content: {
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
  cardContainer: {
    backgroundColor: '#181A20',
    paddingVertical: 20,
    marginBottom: 30,
    borderRadius: 25,
  },
  cardContent: {
    backgroundColor: '#181A20',
  },
  exercicioDescricao: {
    color: 'white',
    fontSize: 16,
    marginLeft: -20,
    marginBottom: 10,
  },
  sequenciaTreino: {
    marginLeft: 20,
    fontSize: 30,
    color: '#F7D100',
    marginTop: -3,
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

export default TreinoScreen;
