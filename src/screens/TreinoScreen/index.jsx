/* eslint-disable prettier/prettier */
/* eslint-disable react/no-unstable-nested-components */
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  TouchableOpacity,
  Image,
} from 'react-native';
import {List, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createAxios} from '../../utils/axios-helper';
import ModalObservacao from './components/ModalObservacao';
import {getUsuarioLogado} from '../../utils/async-storage-helper';

const TreinoScreen = () => {
  const [loading, setLoading] = useState(false);

  const [planejamento, setPlanejamento] = useState({});

  const [selectedExercicio, setSelectedExercicio] = useState(null);

  const [usuarioLogado, setUsuarioLogado] = useState(null);

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
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 500) {
          setPlanejamento({treinos: []});
        }
      })
      .finally(() => setLoading(false));
  }, [axios]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUsuarioLogado();
      setUsuarioLogado(user);
      await requestData();
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRefresh = useCallback(() => {
    requestData();
  }, [requestData]);

  const openModal = useCallback(exercicio => {
    setSelectedExercicio(exercicio);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedExercicio(null);
  }, []);

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
        {item?.metricasExercicios?.map((metricaExercicio, metricasIndex) => (
          <TouchableOpacity
            key={metricasIndex}
            style={styles.exercicioContainer}
            onPress={() => openModal(metricaExercicio)}
            disabled={!metricaExercicio?.observacao}>
            <Text style={styles.exercicioDescricao}>
              {`${metricaExercicio?.exercicio?.nomeExercicio} - ${metricaExercicio?.series} x ${metricaExercicio?.repeticoes}`}
            </Text>
            {metricaExercicio?.observacao ? (
              <Icon
                name="eye"
                size={20}
                color="white"
                style={styles.observacaoIcon}
              />
            ) : null}
          </TouchableOpacity>
        ))}
      </List.Accordion>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerText}>{usuarioLogado?.nome} - Treinos</Text>
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
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.content}
        ListEmptyComponent={
          <View style={styles.contentSemPlanejamento}>
            <Image
              source={require('../../assets/sem-dados.png')}
              style={styles.logo}
            />
            <Text style={styles.semPlanejamentoText}>
              O aluno não possui planejamento de treino.
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl onRefresh={handleRefresh} refreshing={loading} />
        }
      />
      <ModalObservacao exercicio={selectedExercicio} onClose={closeModal} />
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
  cardContainer: {
    backgroundColor: '#181A20',
    paddingVertical: 20,
    marginBottom: 30,
    borderRadius: 25,
  },
  cardContent: {
    backgroundColor: '#181A20',
  },
  exercicioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  exercicioDescricao: {
    color: 'white',
    fontSize: 16,
    marginLeft: -20,
    marginBottom: 10,
  },
  observacaoIcon: {
    marginLeft: 10,
    marginBottom: 12,
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
  contentSemPlanejamento: {
    flexGrow: 1,
    backgroundColor: '#1F222A',
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  logo: {
    marginTop: 80,
    width: 300,
    height: 300,
    alignSelf: 'center',
  },
  semPlanejamentoText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'white',
    fontSize: 26,
    marginTop: -200,
  },
});

export default TreinoScreen;
